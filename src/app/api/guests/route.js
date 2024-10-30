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
    const { id, newMaxInvGuests, confirmation, guestsConfirmed } = await request.json();

    // Validar que los datos necesarios están presentes
    if (!id || (newMaxInvGuests == null && guestsConfirmed == null && confirmation == null)) {
      return NextResponse.json({ error: 'ID y al menos un campo para actualizar son requeridos' }, { status: 400 });
    }

    // Construir consulta SQL dinámicamente según los campos presentes
    const fieldsToUpdate = [];
    if (newMaxInvGuests != null) {
      fieldsToUpdate.push(sql`maxInvGuests = ${newMaxInvGuests}`);
    }
    if (confirmation != null) {
      fieldsToUpdate.push(sql`Confirmation = ${confirmation}`);
    }
    if (guestsConfirmed != null) {
      fieldsToUpdate.push(sql`guestsConfirmed = ${guestsConfirmed}`);
    }

    if (fieldsToUpdate.length === 0) {
      return NextResponse.json({ error: 'No hay campos válidos para actualizar' }, { status: 400 });
    }

    // Unir los campos en la consulta SQL
    const { rowCount } = await sql`
      UPDATE guests
      SET ${sql.join(fieldsToUpdate, sql`, `)}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (rowCount === 0) {
      return NextResponse.json({ error: 'Registro no encontrado' }, { status: 404 });
    }

    // Respuesta exitosa
    return NextResponse.json({ message: 'Registro actualizado correctamente', status: 200 });
  } catch (error) {
    console.error('Error actualizando el registro:', error);
    return NextResponse.json({ error: 'Error actualizando el registro' }, { status: 500 });
  }
}
