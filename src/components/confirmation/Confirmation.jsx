import React, { useState, useCallback } from "react";
import styles from './confirmation.module.css';

const Confirmation = ({ guestId, initialConfirmation, data }) => {
  const [confirmation, setConfirmation] = useState(initialConfirmation);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [guestsConfirmed, setGuestsConfirmed] = useState(1); // Empieza en 1 como mínimo

  const handleConfirmation = useCallback(async (confirm) => {
    setLoading(true);
    setError("");

    try {
      const body = JSON.stringify({ confirmation: confirm, guestsConfirmed });
      const res = await fetch(`/api/guests/${guestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (!res.ok) {
        throw new Error("Error al confirmar asistencia. Inténtalo nuevamente.");
      }

      setConfirmation(confirm);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [guestId, guestsConfirmed]);

  const handleGuestChange = useCallback((e) => {
    const value = parseInt(e.target.value, 10);
    setGuestsConfirmed(value);
  }, []);

  if (confirmation) {
    return (
      <div className={styles.confirmedContainer}>
        <h1>Asistencia confirmada</h1>
        <button onClick={() => handleConfirmation(false)} disabled={loading} className={styles.cancelConfirmationButton}>
          Cancelar asistencia
        </button>
        {loading && <p></p>}
      </div>
    );
  }

  return (
    <div className={styles.confirmationContainer}>
      <h1>Confirmar tu asistencia</h1>
      <p className={styles.invAvalaible}>¡Hola {data.name}! <br />Tienes {data.maxinvguests} invitados </p>
      <select
        id="guestsConfirmed"
        name="guestsConfirmed"
        className={styles.customSelect}
        value={guestsConfirmed}
        onChange={handleGuestChange}
        disabled={loading}
      >
        {/* Genera las opciones según el número máximo de invitados */}
        {[...Array(data.maxinvguests)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <button onClick={() => handleConfirmation(true)} disabled={loading || guestsConfirmed < 1} className={styles.confirmationButton} >
        Confirmar asistencia
      </button>
      {error && <p className={styles.errorText}>{error}</p>}
      {loading && <p></p>}
    </div>
  );
};

export default Confirmation;
