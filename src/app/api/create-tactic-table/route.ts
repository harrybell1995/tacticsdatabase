import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Corrected SQL command
    const result = await sql`
      CREATE TABLE IF NOT EXISTS tacticDB (
        id SERIAL PRIMARY KEY,                       -- Unique identifier for each tactic
        tactic_name VARCHAR(255) NOT NULL,          -- Name of the tactic
        description TEXT,                           -- Description of the tactic
        formation VARCHAR(255) NOT NULL,            -- Formation used (e.g., 4-4-2, 3-5-2)
        owner VARCHAR(255) NOT NULL,                -- Owner or creator of the tactic
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of creation
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of last update
        positions JSONB,                            -- JSON column for storing position data
        roles JSONB,                                -- JSON column for storing role data
        strategies JSONB,                           -- JSON column for storing strategy data
        player_attributes JSONB                     -- JSON column for storing player attributes
      );
    `;
    return NextResponse.json({ message: 'Table created successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error creating table:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
