import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
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

const CertificateTab = ({ hunterId }) => {
  const [showForm, setShowForm] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [newCertificate, setNewCertificate] = useState({
    number: '',
    issueDate: '',
    expiryDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Загрузка существующего удостоверения
  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}/api/hunter/${hunterId}/certificate`,
          {
            validateStatus: function (status) {
              return status === 200 || status === 404; // Разрешаем 404 статус
            }
          }
        );
        
        if (response.status === 200 && response.data) {
          setCertificates([response.data]);
        } else {
          setCertificates([]);
        }
      } catch (err) {
        console.error('Ошибка загрузки удостоверения:', err);
        setError('Ошибка загрузки удостоверения');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [hunterId, success]); // Добавляем success в зависимости

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCertificate(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCertificate = async () => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        ...newCertificate,
        hunterId: hunterId
      };

      let response;
      
      if (certificates.length > 0) {
        // Обновляем существующее удостоверение
        response = await axios.put(
          `${import.meta.env.VITE_REACT_API_URL}/api/huntingCertificate/${certificates[0].id}`,
          payload
        );
      } else {
        // Создаем новое удостоверение
        response = await axios.post(
          `${import.meta.env.VITE_REACT_API_URL}/api/huntingCertificate/`,
          payload
        );
      }

      setCertificates([response.data]);
      setNewCertificate({
        certificateId: '',
        issueDate: '',
        expiryDate: ''
      });
      setSuccess(true);
      setShowForm(false);
    } catch (error) {
      console.error('Ошибка при сохранении удостоверения:', error);
      setError(error.response?.data?.message || 
        'Ошибка при сохранении удостоверения. Проверьте данные и попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCertificate = () => {
    if (certificates.length > 0) {
      setNewCertificate({
        number: certificates[0].number,
        issueDate: certificates[0].issueDate.split('T')[0], // Форматируем дату для input[type="date"]
        expiryDate: certificates[0].expiryDate.split('T')[0]
      });
      setShowForm(true);
    }
  };

  const handleCloseAlert = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Удостоверение охотника</Typography>

      {/* Уведомления */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      
      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Удостоверение успешно сохранено!
        </Alert>
      </Snackbar>

      {!showForm && (
        <Button
          variant="contained"
          onClick={certificates.length > 0 ? handleEditCertificate : () => setShowForm(true)}
          sx={{ width: 250, mb: 2 }}
          disabled={loading}
        >
          {certificates.length > 0 ? 'Редактировать удостоверение' : 'Добавить удостоверение'}
        </Button>
      )}

      {showForm && (
        <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6">
              {certificates.length > 0 ? 'Редактирование удостоверения' : 'Новое удостоверение'}
            </Typography>
            
            <TextField
              label="Номер удостоверения"
              name="number"
              value={newCertificate.certificateId}
              onChange={handleChange}
              fullWidth
              required
              error={!!error?.includes('number')}
            />
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Дата выдачи"
                type="date"
                name="issueDate"
                value={newCertificate.issueDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                error={!!error?.includes('issueDate')}
              />
              <TextField
                label="Дата истечения"
                type="date"
                name="expiryDate"
                value={newCertificate.expiryDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                error={!!error?.includes('expiryDate')}
              />
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
                onClick={handleAddCertificate}
                disabled={
                  loading ||
                  !newCertificate.number ||
                  !newCertificate.issueDate ||
                  !newCertificate.expiryDate
                }
              >
                {loading ? <CircularProgress size={24} /> : 'Сохранить'}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}

      {loading && certificates.length === 0 ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
      ) : certificates.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Номер</TableCell>
                <TableCell>Дата выдачи</TableCell>
                <TableCell>Дата истечения</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{certificates[0].certificateId}</TableCell>
                <TableCell>{new Date(certificates[0].issueDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(certificates[0].expiryDate).toLocaleDateString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Удостоверение не добавлено
        </Typography>
      )}
    </Box>
  );
};

export default CertificateTab;