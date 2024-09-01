'use client';
import React, { useState } from 'react';
import styles from './login.module.css';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('guestName', data.name); // Intenta guardar el nombre
        onLogin(); // Cambia el estado a autenticado en la página principal
      } else {
        setError('Contraseña incorrecta. Inténtalo de nuevo.');
      }
    } catch (error) {
      setError('Error al iniciar sesión.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin}>
        <label htmlFor="userPassword">Inicia sesión</label>
        <input
          id="userPassword"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Login;
