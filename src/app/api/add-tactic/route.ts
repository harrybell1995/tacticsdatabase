import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const tactic_name = url.searchParams.get('tactic_name');
    const description = url.searchParams.get('description');
    const formation = url.searchParams.get('formation');
    const owner = url.searchParams.get('owner');

    // Check if all required parameters are provided
    if (!tactic_name || !description || !formation || !owner) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Insert the new record into the database
    const result = await sql`
      INSERT INTO tacticDB (tactic_name, description, formation, owner)
      VALUES (${tactic_name}, ${description}, ${formation}, ${owner})
      RETURNING *;
    `;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
