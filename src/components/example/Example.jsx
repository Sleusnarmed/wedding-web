import React, { useState } from 'react';

function Example() {
  const [id, setId] = useState('');
  const [newMaxInvGuests, setNewMaxInvGuests] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/guests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, newMaxInvGuests }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="ID"
      />
      <input
        type="number"
        value={newMaxInvGuests}
        onChange={(e) => setNewMaxInvGuests(e.target.value)}
        placeholder="Nuevo MaxInvGuests"
      />
      <button type="submit">Actualizar</button>
    </form>
  );
}

export default Example;
