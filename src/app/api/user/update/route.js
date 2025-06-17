// File: app/api/user/update/route.js

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import DB from '@/lib/mongodb';
import User from '@/models/user.models';

DB();

export async function PATCH(request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token missing or malformed.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const updates = await request.json();

    // Handle nested or flat updates
    for (let key in updates) {
      if (
        typeof updates[key] === 'object' &&
        updates[key] !== null &&
        !Array.isArray(updates[key])
      ) {
        user[key] = {
          ...user[key],
          ...updates[key],
        };
      } else {
        user[key] = updates[key]; // Works for arrays, strings, etc.
      }
    }

    await user.save();

    return NextResponse.json(
      { message: 'User updated successfully.', user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update User Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
