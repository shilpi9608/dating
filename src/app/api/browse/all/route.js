import { NextResponse } from 'next/server';
import DB from '@/lib/mongodb';
import User from '@/models/user.models';

DB();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Project only the fields needed for card display
    const projection = {
      personalInformation: 1,
      collegeInformation: 1,
      photos: { $slice: 1 }, // Return only the first photo
    };

    const totalProfiles = await User.countDocuments();
    const users = await User.find({}, projection).skip(skip).limit(limit);

    return NextResponse.json({
      total: totalProfiles,
      currentPage: page,
      totalPages: Math.ceil(totalProfiles / limit),
      users,
    });
  } catch (error) {
    console.error('Browse Profiles Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profiles' },
      { status: 500 }
    );
  }
}
