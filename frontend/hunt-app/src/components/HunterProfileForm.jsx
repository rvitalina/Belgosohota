import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Stack 
} from '@mui/material';

const HunterProfileForm = ({ hunterId }) => {
  const [hunter, setHunter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHunterData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/hunter/${hunterId}`);
        setHunter(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchHunterData();
  }, [hunterId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHunter(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`${import.meta.env.VITE_REACT_API_URL}/api/hunter/${hunterId}`, hunter);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка сохранения');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !hunter) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!hunter) {
    return (
      <Box mt={2}>
        <Alert severity="warning">Данные охотника не найдены</Alert>
      </Box>
    );
  }

  return (
    <Paper 
      component="form" 
      onSubmit={handleSubmit}
      elevation={3} 
      sx={{ 
        p: 4, 
        maxWidth: 1000, 
        mx: 'auto',
        '& .MuiTextField-root': { mb: 2 }
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {hunter.lastName} {hunter.firstName} {hunter.patronymic}
      </Typography>

      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Фамилия"
            name="lastName"
            value={hunter.lastName || ''}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Имя"
            name="firstName"
            value={hunter.firstName || ''}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Отчество"
            name="patronymic"
            value={hunter.patronymic || ''}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        <TextField
          label="Дата рождения"
          type="date"
          name="birthDate"
          value={hunter.birthDate?.split('T')[0] || ''}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <Button
          sx={{ 
            backgroundColor: "#878532",
            '&:hover': {
              backgroundColor: "#6a6a28"
            }
          }} 
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Сохранить изменения'}
        </Button>
      </Stack>
    </Paper>
  );
};

export default HunterProfileForm;