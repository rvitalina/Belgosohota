import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab
} from '@mui/material';

import HunterProfileForm from '../components/HunterProfileForm';
import WeaponPermissionTab from '../components/WeaponPermissionTab';
import CertificateTab from '../components/CertificateTab';

const HunterProfile = () => {
  

  // Состояния для табов
  const [tabValue, setTabValue] = useState(0);

  // Состояния для разрешений на оружие
  const [showWeaponPermissionForm, setShowWeaponPermissionForm] = useState(false);
  const [newWeaponPermission, setNewWeaponPermission] = useState({
    issueDate: '',
    expiryDate: '',
    weaponBrand: '',
    weaponCaliber: '',
    weaponType: ''
  });
  const [weaponPermissions, setWeaponPermissions] = useState([]);

  // Состояния для удостоверений
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    number: '',
    issueDate: '',
    expiryDate: ''
  });
  const [certificates, setCertificates] = useState([]);

  // Обработчик изменений в форме удостоверения
  const handleCertificateChange = (e) => {
    const { name, value } = e.target;
    setNewCertificate(prev => ({ ...prev, [name]: value }));
  };

  // Добавление нового разрешения на оружие
  const handleAddWeaponPermission = async () => {
    try {
      setWeaponPermissions([...weaponPermissions, newWeaponPermission]);
      setNewWeaponPermission({
        issueDate: '',
        expiryDate: '',
        weaponBrand: '',
        weaponCaliber: '',
        weaponType: ''
      });
      setShowWeaponPermissionForm(false);
      console.log('Разрешение на оружие добавлено:', newWeaponPermission);
    } catch (error) {
      console.error('Ошибка при добавлении разрешения:', error);
    }
  };

  // Добавление нового удостоверения
  const handleAddCertificate = async () => {
    try {
      setCertificates([...certificates, newCertificate]);
      setNewCertificate({
        number: '',
        issueDate: '',
        expiryDate: ''
      });
      setShowCertificateForm(false);
      console.log('Удостоверение добавлено:', newCertificate);
    } catch (error) {
      console.error('Ошибка при добавлении удостоверения:', error);
    }
  };

  // Отправка формы профиля
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Данные профиля:', hunter);
    alert('Данные профиля сохранены!');
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
          <Stack spacing={3}>

            <HunterProfileForm hunterId={1} />

            <Divider sx={{ my: 2 }} />

            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
              <Tab label="Разрешения на оружие" />
              <Tab label="Удостоверения" />
            </Tabs>

            {tabValue === 0 && <WeaponPermissionTab hunterId={1} />}

            {tabValue === 1 && <CertificateTab hunterId={1} />}


            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
            sx={{backgroundColor: "#878532", mt: 2 }} 
            >
              Сохранить профиль
            </Button>
          </Stack>
      </Paper>
    </Box>
  );
};

export default HunterProfile;