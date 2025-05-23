import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import DB from '@/lib/mongodb';
import User from '@/models/user.models';
import Match from '@/models/match.models';

DB();

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { likedUserId } = await request.json();
    if (!likedUserId) {
      return NextResponse.json(
        { error: 'Liked user ID is required' },
        { status: 400 }
      );
    }

    const currentUser = await User.findById(userId);
    const likedUser = await User.findById(likedUserId);

    if (!likedUser) {
      return NextResponse.json(
        { error: 'Liked user not found' },
        { status: 404 }
      );
    }

    // Avoid liking yourself
    if (userId === likedUserId) {
      return NextResponse.json(
        { error: 'You cannot like yourself' },
        { status: 400 }
      );
    }

    // If already liked, do nothing
    if (currentUser.likes.includes(likedUserId)) {
      return NextResponse.json(
        { message: 'Already liked this user' },
        { status: 200 }
      );
    }

    // Add like
    currentUser.likes.push(likedUserId);
    await currentUser.save();

    // Check if mutual like exists
    const isMutual = likedUser.likes.includes(userId);

    if (isMutual) {
      // Check if match already exists to avoid duplicate matches
      const existingMatch = await Match.findOne({
        $or: [
          { person1: userId, person2: likedUserId },
          { person1: likedUserId, person2: userId },
        ],
      });

      if (!existingMatch) {
        const match = new Match({
          person1: userId,
          person2: likedUserId,
          messages: [],
        });

        await match.save();

        return NextResponse.json(
          {
            message: 'It’s a match!',
            match,
          },
          { status: 201 }
        );
      }
    }

    return NextResponse.json(
      { message: 'Liked user successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Like Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
