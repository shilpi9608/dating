// app\api\gossip\comment\route.js
import { NextResponse } from 'next/server';
import DB from '@/lib/mongodb';
import Gossip from '@/models/gossip.models';
import User from '@/models/user.models';
import jwt from 'jsonwebtoken';

DB();

export async function POST(request) {
  try {
    // 1. Get token from Authorization header
    const authHeader = request.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token missing or malformed.' },
        { status: 401 }
      );
    }
    const token = authHeader.split(' ')[1];

    // 2. Verify token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: 'Invalid or expired token.' },
        { status: 401 }
      );
    }

    // 3. Load user and check gossipUserName
    const user = await User.findById(payload.id);
    if (!user || !user.gossipUserName) {
      return NextResponse.json(
        { error: 'You must be a registered user with a gossipUserName.' },
        { status: 403 }
      );
    }

    // 4. Parse body
    const { gossipId, content } = await request.json();
    if (!gossipId || !content) {
      return NextResponse.json(
        { error: 'gossipId and content are required.' },
        { status: 400 }
      );
    }

    // 5. Find gossip
    const gossip = await Gossip.findById(gossipId);
    if (!gossip) {
      return NextResponse.json({ error: 'Gossip not found.' }, { status: 404 });
    }

    // 6. Append comment
    const comment = {
      username: user.gossipUserName,
      content,
      // time auto‑set by schema default
    };
    gossip.comments.push(comment);
    await gossip.save();

    // 7. Return new comment
    return NextResponse.json(
      { message: 'Comment added.', comment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
