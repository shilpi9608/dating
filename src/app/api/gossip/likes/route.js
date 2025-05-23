// File: app/api/gossip/like/route.js

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import DB from '@/lib/mongodb';
import User from '@/models/user.models';
import Gossip from '@/models/gossip.models';

DB();

export async function POST(request) {
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
      return NextResponse.json(
        { error: 'Unauthorized user.' },
        { status: 403 }
      );
    }

    const { gossipId } = await request.json();
    if (!gossipId) {
      return NextResponse.json(
        { error: 'gossipId is required.' },
        { status: 400 }
      );
    }

    const gossip = await Gossip.findById(gossipId);
    if (!gossip) {
      return NextResponse.json({ error: 'Gossip not found.' }, { status: 404 });
    }

    // Convert ObjectId to string to avoid comparison issues
    const alreadyLiked = gossip.likes.some(
      (id) => id.toString() === user._id.toString()
    );

    if (alreadyLiked) {
      return NextResponse.json(
        { error: 'You have already liked this gossip.' },
        { status: 409 }
      );
    }

    gossip.likes.push(user._id);
    await gossip.save();

    return NextResponse.json(
      { message: 'Gossip liked successfully.', likes: gossip.likes },
      { status: 200 }
    );
  } catch (error) {
    console.error('Like Gossip Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
