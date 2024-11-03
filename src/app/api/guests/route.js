// api/guests/route.js
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Manejo de solicitud GET
export const dynamic = "force-dynamic";
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

