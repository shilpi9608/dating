import run from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Attempt to connect to the database
    await run();
    // Return a success message if the connection is established
    return NextResponse.json(
      { message: 'Server connected successfully' },
      { status: 200 }
    );
  } catch (error) {
    // Return an error message if the connection fails
    return NextResponse.json(
      { message: 'Server connection failed', error: error.message },
      { status: 500 }
    );
  }
}
