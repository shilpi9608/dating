// app/api/matches/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import DB from '@/lib/mongodb';
import Match from '@/models/match.models';
import { getUserIdFromRequest } from '@/lib/auth';

DB(); // initialize Mongoose connection

export async function GET(request) {
  // 1. Auth
  const { userId, error } = getUserIdFromRequest(request);
  if (error) return error;

  // 2. Validate userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      { error: 'Invalid user ID in token' },
      { status: 400 }
    );
  }

  try {
    // 3. Query matches where user is person1 or person2
    const matches = await Match.find({
      $or: [{ person1: userId }, { person2: userId }],
    })
      // Optionally populate basic info of the other user
      .populate('person1', 'name email')
      .populate('person2', 'name email')
      .sort({ updatedAt: -1 });

    // 4. Return
    return NextResponse.json({ matches }, { status: 200 });
  } catch (err) {
    console.error('Error fetching matches:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
