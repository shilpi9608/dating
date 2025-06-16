// app/api/matches/[matchId]/messages/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import DB from '@/lib/mongodb';
import Match from '@/models/match.models';
import { getUserIdFromRequest } from '@/lib/auth';

// If you plan to emit real-time events from here, you need access to your Socket.IO server instance.
// In a Next.js environment (serverless), it’s not straightforward to keep a persistent Socket.IO instance.
// Common patterns:
//  1. Run a separate Node.js/Express + Socket.IO server alongside Next.js, and import a client here to emit events.
//  2. Use a managed real-time service (e.g., Pusher, Ably, Firebase Realtime/Firestore listeners).
//  3. If using a custom Next.js server (not serverless), you can integrate Socket.IO in that server.
// Below, we focus on the REST/Mongoose part. After saving the message, we illustrate how you might emit to a separate Socket.IO server by importing a shared `io` instance if you have one.

DB();

export async function POST(request, { params }) {
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

  // 3. Parse body
  let body;
  try {
    body = await request.json();
  } catch (err) {
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
    // 4. Find match
    const match = await Match.findById(matchId);
    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }
    // 5. Authorization: user must be participant
    const uid = userId.toString();
    if (match.person1.toString() !== uid && match.person2.toString() !== uid) {
      return NextResponse.json(
        { error: 'Not authorized to post in this match' },
        { status: 403 }
      );
    }
    // 6. Append message
    const messageObj = {
      sender: userId,
      content: content.trim(),
      time: new Date(),
    };
    match.messages.push(messageObj);
    await match.save();

    // 7. Prepare payload to return / emit
    const savedMessage = match.messages[match.messages.length - 1];
    const payload = {
      _id: savedMessage._id,
      sender: savedMessage.sender,
      content: savedMessage.content,
      time: savedMessage.time,
    };

    // 8. Real-time: emit event to other participant(s)
    // If you have a Socket.IO instance available here (e.g., imported from a shared module),
    // you can do something like:
    //   import { getIO } from '@/lib/socket'; // your own module that holds the io instance
    //   const io = getIO();
    //   io.to(matchId).emit('new_message', { matchId, message: payload });
    //
    // Or if using a separate service (Pusher, Ably), trigger a channel/event here.
    //
    // In many Next.js setups (serverless), you cannot reliably keep a persistent Socket.IO server here.
    // So often you run a separate real-time server and import/publish to it.
    //
    // For now, we just return the saved message; frontend polling or separate real-time integration needed.

    return NextResponse.json({ message: payload }, { status: 201 });
  } catch (err) {
    console.error('Error posting message:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
