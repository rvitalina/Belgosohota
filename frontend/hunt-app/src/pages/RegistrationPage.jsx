import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Registration.css';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    firstname: '',
    lastname: '',
    patronymic: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = 'Email обязателен';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Некорректный формат email';

    if (!formData.password) newErrors.password = 'Пароль обязателен';
    else if (formData.password.length < 6) newErrors.password = 'Пароль должен быть не менее 6 символов';

    if (!formData.role) newErrors.role = 'Роль обязательна';
    if (!formData.firstname) newErrors.firstname = 'Имя обязательно';
    if (!formData.lastname) newErrors.lastname = 'Фамилия обязательна';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/users/registration`, formData);
      
      if (response.status === 201) {
        setRegistrationSuccess(true);
        setFormData({
          email: '',
          password: '',
          role: '',
          firstname: '',
          lastname: '',
          patronymic: ''
        });
      }
    } catch (error) {
      if (error.response) {
        const serverErrors = error.response.data.errors || {};
        setErrors(prev => ({
          ...prev,
          ...serverErrors
        }));
        
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      } else {
        alert('Произошла ошибка при отправке данных');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="success-message">
        <h2>Регистрация успешно завершена!</h2>
        <p>Вы будете перенаправлены на страницу входа...</p>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <h2>Регистрация пользователя</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error-input' : ''}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Роль:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={errors.role ? 'error-input' : ''}
          >
            <option value="">Выберите роль</option>
            <option value="hunter">Охотник</option>
            <option value="ranger">Егерь</option>
            <option value="employee">Сотрудник</option>
            <option value="admin">Администратор</option>
          </select>
          {errors.role && <span className="error">{errors.role}</span>}
        </div>

        <div className="form-group">
          <label>Имя:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className={errors.firstname ? 'error-input' : ''}
          />
          {errors.firstname && <span className="error">{errors.firstname}</span>}
        </div>

        <div className="form-group">
          <label>Фамилия:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className={errors.lastname ? 'error-input' : ''}
          />
          {errors.lastname && <span className="error">{errors.lastname}</span>}
        </div>

        <div className="form-group">
          <label>Отчество:</label>
          <input
            type="text"
            name="patronymic"
            value={formData.patronymic}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;