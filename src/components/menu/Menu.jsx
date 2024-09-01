'use client';
import React, { useEffect, useState } from 'react';
import styles from './menu.module.css';

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/guests', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const Menu = ({ onLogout }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const guestName = localStorage.getItem('guestName');
      console.log('Nombre recuperado de localStorage:', guestName);

      if (!guestName) {
        onLogout(); // Cierra sesión si no se encuentra el nombre del invitado
        return;
      }

      try {
        const guests = await getData();
        console.log('Datos recuperados de la API:', guests);

        // Usar trim() y toLowerCase() para evitar problemas de espacios y mayúsculas/minúsculas
        const authenticatedGuest = guests.find(
          (guest) => guest.name === guestName
        );

        if (authenticatedGuest) {
          setData(authenticatedGuest);
        } else {
          setError('No se encontró la información del invitado autenticado.');
          console.log(authenticatedGuest)
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setError('Error al obtener los datos.');
        setLoading(false);
      }
    };

    fetchData();
  }, [onLogout]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.prueba}>
      <div>
        <p>Hola, bienvenido {data.name}.</p>
        <p>Puedes invitar a un máximo de {data.maxinvguests} personas.</p>
        <span>Confirmación: {data.confirmation ? 'Sí' : 'No'}</span>
      </div>
      <button onClick={onLogout} className={styles.logoutButton}>
        Salir sesión
      </button>
    </div>
  );
};

export default Menu;
