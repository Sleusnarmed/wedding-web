import React, { useState } from "react";
import styles from './confirmation.module.css'

const Confirmation = ({ guestId, initialConfirmation }) => {
  const [confirmation, setConfirmation] = useState(initialConfirmation);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmation = async (confirm) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/guests/${guestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmation: confirm }),
      });

      if (!res.ok) {
        throw new Error("Error al confirmar asistencia");
      }

      setConfirmation(confirm);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Confirma tu asistencia:</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={() => handleConfirmation(true)}
        disabled={loading || confirmation === true}
      >
        Confirmar asistencia
      </button>
      <button
        onClick={() => handleConfirmation(false)}
        disabled={loading || confirmation === false}
      >
        Cancelar asistencia
      </button>
      {loading && <p>Cargando...</p>}
      {confirmation !== null && (
        <p>
          {confirmation
            ? "Has confirmado tu asistencia."
            : "Has cancelado tu asistencia."}
        </p>
      )}
    </div>
  );
};

export default Confirmation;
