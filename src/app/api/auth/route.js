// api/auth/route.js
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();

    // Realiza la consulta para verificar la contraseña
    const { rows } = await sql`SELECT * FROM guests WHERE password = ${password}`;

    // Verifica si la contraseña coincide
    if (rows.length > 0) {
      const guest = rows[0]; // Toma el primer invitado que coincida con la contraseña
      return NextResponse.json(guest); // Devuelve la información completa del invitado
    } else {
      // Contraseña incorrecta
      return NextResponse.json({ success: false, message: 'Contraseña incorrecta' }, { status: 401 });
    }
  } catch (error) {
    // Manejo de errores
    return NextResponse.json({ success: false, message: 'Error al validar la contraseña' }, { status: 500 });
  }
}
