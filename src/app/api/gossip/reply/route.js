// File: app/api/gossip/reply/route.js

import { NextResponse } from 'next/server';
import DB from '@/lib/mongodb';
import Gossip from '@/models/gossip.models';
import User from '@/models/user.models';
import jwt from 'jsonwebtoken';

DB();

export async function POST(request) {
  try {
    // 1. Extract token
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

    // 3. Fetch user
    const user = await User.findById(payload.id);
    if (!user || !user.gossipUserName) {
      return NextResponse.json(
        { error: 'You must be a registered user with a gossipUserName.' },
        { status: 403 }
      );
    }

    // 4. Extract body data
    const { gossipId, commentIndex, content } = await request.json();

    if (!gossipId || commentIndex === undefined || content === '') {
      return NextResponse.json(
        { error: 'gossipId, commentIndex, and content are required.' },
        { status: 400 }
      );
    }

    // 5. Find the gossip
    const gossip = await Gossip.findById(gossipId);
    if (!gossip) {
      return NextResponse.json({ error: 'Gossip not found.' }, { status: 404 });
    }

    // 6. Validate comment index
    const comment = gossip.comments[commentIndex];
    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found.' },
        { status: 404 }
      );
    }

    // 7. Push reply
    const reply = {
      username: user.gossipUserName,
      content,
      time: new Date(),
    };

    comment.reply.push(reply);
    await gossip.save();

    return NextResponse.json(
      { message: 'Reply added successfully.', reply },
      { status: 201 }
    );
  } catch (error) {
    console.error('Reply Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
