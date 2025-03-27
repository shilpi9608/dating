// app/api/register/route.js

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import run from '@/lib/mongodb';
import User from '@/models/user.models';

export async function POST(request) {
  try {
    // Connect to MongoDB
    await run();

    // Parse the incoming JSON data
    const body = await request.json();
    const {
      personalInformation,
      gossipUserName,
      collegeInformation,
      preferences,
      email,
      password,
    } = body;

    // Basic validation for required fields
    if (!email || !password || !personalInformation?.name || !personalInformation?.age) {
      return NextResponse.json(
        { error: 'Missing required fields: email, password, name, or age.' },
        { status: 400 }
      );
    }

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with empty values for about, interests, preferences, photos, and likes.
    const newUser = new User({
      personalInformation,
      gossipUserName,
      collegeInformation,
      email,
      password: hashedPassword,
      about: '',
      interests: [],
      preferences,
      photos: [],
      likes: [],
    });

    // Save the new user to the database
    await newUser.save();

    return NextResponse.json(
      { message: 'User registered successfully.', newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
