// File: app/api/user/me/route.js

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import DB from '@/lib/mongodb';
import User from '@/models/user.models';

DB();

export async function GET(request) {
  try {
    // Extract the authorization token from headers
    const authHeader = request.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token missing or malformed.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database based on the decoded token id
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Return the user's information
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Get User Information Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
