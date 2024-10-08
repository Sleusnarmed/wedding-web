// api/guests/route.js
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Manejo de solicitud GET
export async function GET(request) {
  try {
    const { rows } = await sql`SELECT * FROM guests`;
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching guests:', error);
    return NextResponse.json({ error: 'Error fetching guests' }, { status: 500 });
  }
}

// Manejo de solicitud PUT
export async function PUT(request) {
  try {
    const { id, newMaxInvGuests } = await request.json();

    // Validar que los datos necesarios están presentes y son números
    if (!id || newMaxInvGuests == null || isNaN(Number(id)) || isNaN(Number(newMaxInvGuests)) || newMaxInvGuests < 0) {
      return NextResponse.json({ error: 'ID y nuevo valor de maxInvGuests son requeridos, deben ser números, y el número de invitados debe ser positivo' }, { status: 400 });
    }

    // Actualizar el valor de maxInvGuests para el registro con el ID especificado
    const { rowCount } = await sql`
      UPDATE guests
      SET maxInvGuests = ${newMaxInvGuests}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (rowCount === 0) {
      return NextResponse.json({ error: 'Registro no encontrado' }, { status: 404 });
    }

    // Respuesta exitosa
    return NextResponse.json({ message: 'maxInvGuests actualizado correctamente', status: 200 });
  } catch (error) {
    console.error('Error updating maxInvGuests:', error);
    return NextResponse.json({ error: 'Error actualizando maxInvGuests' }, { status: 500 });
  }
}
