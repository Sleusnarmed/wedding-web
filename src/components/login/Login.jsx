'use client';
import React, { useState } from 'react';
import styles from './login.module.css';
import Image from 'next/image';

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
    <div className={styles.backgroundContainer}>
      <div className={styles.imageContainer}>
        <Image
          src="/img/decoration-lights.PNG" /* Cambia la ruta a tu imagen */
          alt="Lights in X shape"
          layout="fill" /* Asegura que la imagen cubra el contenedor */
          objectFit="cover" /* Asegura que la imagen mantenga su proporción y cubra el contenedor */
        />
      </div>
      <div className={styles.palmContainer}> 
        <div className={styles.palmeraIzquierda}>
          <Image src="/img/palm1.png" alt="Palmera" width={100} height={100} className={styles.palmeraImage} />
        </div>
        <div className={styles.palmeraDerecha}>
          <Image src="/img/palm2.png" alt="Palmera" width={100} height={100} className={styles.palmeraImage} />
        </div>
      </div>
      <div className={styles.nameAndDate}>
        <h1>
          <span className={styles.namePart}>Daniel </span>
          <br />
          <span className={styles.namePart}><span className={styles.ampersand}>&</span> Saraí</span>
        </h1>
      </div>
      <div className={styles.loginContainer}>
        <form className={styles.handleLogin} onSubmit={handleLogin}>
          <label htmlFor="userPassword">Ingresa tu código</label>
          <div className={styles.inputWrapper}>
            <input
              id="userPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">ENTRAR</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.explicationText}>
        <p>Una vez ingreses, podrás explorar los detalles del evento, horario, ubicación, la lista de regalos, y mucho más.</p>
      </div>
    </div>
  );
};

export default Login;
