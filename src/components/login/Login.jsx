'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Usa el enrutador de next/navigation
import styles from './login.module.css';
import Image from 'next/image';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Inicializa el hook useRouter para redirigir

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
        localStorage.setItem('guestName', data.name); // Guardar el nombre del invitado
        if (password === '1t2e3a4m5o') {
          router.push('/revelacion'); // Si la contraseña es "admin123", redirige a /admin
        } else {
          router.push('/invitacion'); // Si no, redirige a /invitacion
        }
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
        <div className={styles.imageDecorationLights}></div>
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

