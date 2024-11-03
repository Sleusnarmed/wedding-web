// src/components/GuestsTable.jsx
'use client'
import { useEffect, useState } from 'react';
import styles from './admin-page.module.css'

function GuestsTable() {
  const [guests, setGuests] = useState([]);
  const [totalGuestsConfirmed, setTotalGuestsConfirmed] = useState(0);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch('/api/guests');
        const data = await response.json();
        setGuests(data);

        // Suma guestsconfirmed solo si confirmation es true
        const total = data.reduce((sum, guest) => {
          return guest.confirmation ? sum + guest.guestsconfirmed : sum;
        }, 0);
        setTotalGuestsConfirmed(total);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };
    fetchGuests();
  }, []);

  return (
    <div className={styles.guestsTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Password</th>
            <th>Max Invited Guests</th>
            <th>Confirmation</th>
            <th>Guests Confirmed</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.id}</td>
              <td>{guest.name}</td>
              <td>{guest.password}</td>
              <td>{guest.maxinvguests}</td>
              <td>{guest.confirmation ? 'Yes' : 'No'}</td>
              <td>{guest.guestsconfirmed}</td>
            </tr>
          ))}
          {/* Fila de total de invitados confirmados */}
          <tr>
            <td colSpan="5" style={{ fontWeight: 'bold', textAlign: 'center' }}>Total Confirmed Guests:</td>
            <td style={{ fontWeight: 'bold' }}>{totalGuestsConfirmed}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GuestsTable;
