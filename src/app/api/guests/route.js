// api/guests/route.js
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const { rows } = await sql`SELECT * FROM guests`;
    return new NextResponse(JSON.stringify(rows), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',  // Desactiva la caché y obliga a revalidar
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error fetching guests:', error);
    return NextResponse.json({ error: 'Error fetching guests' }, { status: 500 });
  }
}
