// app/api/matches/[matchId]/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import DB from '@/lib/mongodb';
import Match from '@/models/match.models';
import { getUserIdFromRequest } from '@/lib/auth';

DB();

export async function GET(request, { params }) {
  const { matchId } = await params;
  // 1. Auth
  const { userId, error } = getUserIdFromRequest(request);
  if (error) return error;

  // 2. Validate IDs
  if (!mongoose.Types.ObjectId.isValid(matchId)) {
    return NextResponse.json({ error: 'Invalid match ID' }, { status: 400 });
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      { error: 'Invalid user ID in token' },
      { status: 400 }
    );
  }

  try {
    // 3. Find match
    const match = await Match.findById(matchId)
      .populate('person1', 'name email')
      .populate('person2', 'name email');
    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }
    // 4. Authorization: user must be one of the participants
    const uid = userId.toString();
    if (
      match.person1._id.toString() !== uid &&
      match.person2._id.toString() !== uid
    ) {
      return NextResponse.json(
        { error: 'Not authorized to view this match' },
        { status: 403 }
      );
    }
    // 5. Return the match (including messages)
    return NextResponse.json({ match }, { status: 200 });
  } catch (err) {
    console.error('Error fetching match:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
