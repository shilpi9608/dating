import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import DB from '@/lib/mongodb';
import Match from '@/models/match.models';
import { getUserIdFromRequest } from '@/lib/auth';
import { pusherServer } from '@/lib/pusher-server';

DB();

export async function POST(request, { params }) {
  const { matchId } = await params;
  const { userId, error } = getUserIdFromRequest(request);
  if (error) return error;
  if (!mongoose.Types.ObjectId.isValid(matchId)) {
    return NextResponse.json({ error: 'Invalid match ID' }, { status: 400 });
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      { error: 'Invalid user ID in token' },
      { status: 400 }
    );
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const { content } = body;
  if (typeof content !== 'string' || !content.trim()) {
    return NextResponse.json(
      { error: 'Message content is required' },
      { status: 400 }
    );
  }
  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }
    const uid = userId.toString();
    if (match.person1.toString() !== uid && match.person2.toString() !== uid) {
      return NextResponse.json(
        { error: 'Not authorized to post in this match' },
        { status: 403 }
      );
    }
    const messageObj = {
      sender: userId,
      content: content.trim(),
      time: new Date(),
    };
    match.messages.push(messageObj);
    await match.save();
    const savedMessage = match.messages[match.messages.length - 1];
    const payload = {
      _id: savedMessage._id,
      sender: savedMessage.sender,
      content: savedMessage.content,
      time: savedMessage.time,
    };
    const channelName = `private-match-${matchId}`;
    await pusherServer.trigger(channelName, 'new-message', {
      matchId,
      message: payload,
    });
    return NextResponse.json({ message: payload }, { status: 201 });
  } catch (err) {
    console.error('Error posting message:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
