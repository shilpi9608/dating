import { NextResponse } from 'next/server';
import DB from '@/lib/mongodb';
import User from '@/models/user.models';
import mongoose from 'mongoose';

DB();

export async function POST(request) {
  try {
    const { id } = await request.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Valid user ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(id, {
      personalInformation: 1,
      collegeInformation: 1,
      gossipUserName: 1,
      about: 1,
      interests: 1,
      photos: 1,
      preferences: 1,
      likes: 1,
      createdAt: 1,
    });

    if (!user) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Detailed Profile Fetch Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
