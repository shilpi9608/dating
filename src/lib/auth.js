// lib/auth.js
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function getUserIdFromRequest(request) {
  const authHeader = request.headers.get('authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    return {
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    if (!userId) {
      return {
        error: NextResponse.json(
          { error: 'Login is required' },
          { status: 401 }
        ),
      };
    }
    return { userId };
  } catch (err) {
    console.error('JWT verify error:', err);
    return {
      error: NextResponse.json({ error: 'Invalid token' }, { status: 401 }),
    };
  }
}
