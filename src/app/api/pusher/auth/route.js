import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher-server';
import { getUserIdFromRequest } from '@/lib/auth';
import Match from '@/models/match.models';
import DB from '@/lib/mongodb';
import mongoose from 'mongoose';

DB();

export async function POST(request) {
  const { userId, error } = getUserIdFromRequest(request);
  if (error) return error;

  const formData = await request.formData(); // 👈 Use formData for x-www-form-urlencoded
  const socket_id = formData.get('socket_id');
  const channel_name = formData.get('channel_name');

  if (!socket_id || !channel_name) {
    return NextResponse.json(
      { error: 'socket_id and channel_name required' },
      { status: 408 }
    );
  }

  const prefix = 'private-match-';
  if (!channel_name.startsWith(prefix)) {
    return NextResponse.json({ error: 'Invalid channel' }, { status: 407 });
  }

  const matchId = channel_name.substring(prefix.length);
  if (!mongoose.Types.ObjectId.isValid(matchId)) {
    return NextResponse.json({ error: 'Invalid matchId' }, { status: 406 });
  }

  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }
    const uid = userId.toString();
    if (match.person1.toString() !== uid && match.person2.toString() !== uid) {
      return NextResponse.json(
        { error: 'Not authorized for this channel' },
        { status: 403 }
      );
    }

    const authResponse = pusherServer.authenticate(socket_id, channel_name);
    return NextResponse.json(authResponse);
  } catch (err) {
    console.error('Pusher auth error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
