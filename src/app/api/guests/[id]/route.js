// api/guests/[id]/route.js
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  console.log('PUT request received for ID:', params.id);
  const { id } = params;

  try {
    const body = await request.json(); // Leer el cuerpo aquí
    const { confirmation, guestsConfirmed } = body; // Obtener la confirmación y la cantidad de invitados confirmados

    // Validar que el ID, la confirmación y la cantidad de invitados estén presentes
    if (!id || confirmation == null || guestsConfirmed == null) {
      return NextResponse.json({ error: 'ID, confirmación y cantidad de invitados son requeridos' }, { status: 400 });
    }

    // Actualizar el estado de confirmación y la cantidad de invitados confirmados
    const { rowCount } = await sql`
      UPDATE guests
      SET confirmation = ${confirmation}, guestsConfirmed = ${guestsConfirmed}
      WHERE id = ${id}
    `;

    if (rowCount === 0) {
      return NextResponse.json({ error: 'Registro no encontrado' }, { status: 404 });
    }

    // Respuesta exitosa
    return NextResponse.json({ message: 'Confirmación actualizada correctamente' }, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar la confirmación:', error);
    return NextResponse.json({ error: 'Error al actualizar la confirmación', details: error.message }, { status: 500 });
  }
}
