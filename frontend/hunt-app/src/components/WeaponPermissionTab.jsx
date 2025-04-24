import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

const WeaponPermissionTab = ({ hunterId }) => {
  const [showForm, setShowForm] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState({
    issueDate: '',
    expiryDate: '',
    weaponBrand: '',
    weaponCaliber: '',
    weaponType: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const weaponTypes = ['нарезное', 'гладкоствольное'];

  // Загрузка существующих разрешений
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/weaponPermission/${hunterId}`);
        setPermissions(response.data);
      } catch (err) {
        setError('Ошибка загрузки разрешений');
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [hunterId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPermission(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPermission = async () => {
    try {
      setLoading(true);
      setError(null);

      // Подготовка данных для отправки
      const payload = {
        ...newPermission,
        hunterId: hunterId,
        weaponCaliber: Number(newPermission.weaponCaliber) // Преобразуем в число
      };

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/api/weaponPermission/`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setPermissions([...permissions, response.data]);
      setNewPermission({
        issueDate: '',
        expiryDate: '',
        weaponBrand: '',
        weaponCaliber: '',
        weaponType: ''
      });
      setSuccess(true);
      setShowForm(false);
    } catch (error) {
      console.error('Ошибка при добавлении разрешения:', error);
      setError(error.response?.data?.message || 'Ошибка при сохранении разрешения');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Разрешения на оружие</Typography>

      {/* Уведомления */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      
      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Разрешение успешно добавлено!
        </Alert>
      </Snackbar>

      {!showForm && (
        <Button
          variant="contained"
          onClick={() => setShowForm(true)}
          sx={{ width: 250, mb: 2 }}
          disabled={loading}
        >
          Добавить разрешение
        </Button>
      )}

      {showForm && (
        <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Новое разрешение</Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Дата выдачи"
                type="date"
                name="issueDate"
                value={newPermission.issueDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
              <TextField
                label="Дата истечения"
                type="date"
                name="expiryDate"
                value={newPermission.expiryDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Stack>

            <TextField
              label="Бренд оружия"
              name="weaponBrand"
              value={newPermission.weaponBrand}
              onChange={handleChange}
              fullWidth
              required
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Калибр"
                type="number"
                name="weaponCaliber"
                value={newPermission.weaponCaliber}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 0, step: 0.1 }}
              />
              
              <FormControl fullWidth required>
                <InputLabel>Тип оружия</InputLabel>
                <Select
                  name="weaponType"
                  value={newPermission.weaponType}
                  label="Тип оружия"
                  onChange={handleChange}
                  required
                >
                  {weaponTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => {
                  setShowForm(false);
                  setError(null);
                }}
                disabled={loading}
              >
                Отмена
              </Button>
              <Button
                variant="contained"
                onClick={handleAddPermission}
                disabled={
                  loading ||
                  !newPermission.issueDate ||
                  !newPermission.expiryDate ||
                  !newPermission.weaponBrand ||
                  !newPermission.weaponCaliber ||
                  !newPermission.weaponType
                }
              >
                {loading ? <CircularProgress size={24} /> : 'Сохранить'}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}

      {loading && permissions.length === 0 ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
      ) : permissions.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Дата выдачи</TableCell>
                <TableCell>Дата истечения</TableCell>
                <TableCell>Бренд</TableCell>
                <TableCell>Калибр</TableCell>
                <TableCell>Тип</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.map((permission, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(permission.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(permission.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>{permission.weaponBrand}</TableCell>
                  <TableCell>{permission.weaponCaliber}</TableCell>
                  <TableCell>{permission.weaponType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Нет добавленных разрешений
        </Typography>
      )}
    </Box>
  );
};

export default WeaponPermissionTab;