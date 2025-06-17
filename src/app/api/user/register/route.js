import { NextResponse } from 'next/server';
import User from '@/models/user.models';
import DB from '@/lib/mongodb';
import bcryptjs from 'bcryptjs';

DB();
export async function POST(request) {
  try {
    // Parse the incoming JSON data
    const body = await request.json();
    const {
      personalInformation,
      email,
      password,
      collegeInformation,
      gossipUserName,
    } = body;
    // Basic validation for required fields
    if (
      !email ||
      !password ||
      !personalInformation?.name ||
      !personalInformation?.age
    ) {
      return NextResponse.json(
        { error: 'Missing required fields: email, password, name, or age.' },
        { status: 406 }
      );
    }

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 408 }
      );
    }
    console.log(gossipUserName);
    const existingGossip = await User.findOne({ gossipUserName });
    if (existingGossip) {
      return NextResponse.json(
        { error: 'This gossipUserName already exists, please change.' },
        { status: 409 }
      );
    }

    // Hash the password before saving
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      personalInformation,
      collegeInformation,
      email,
      gossipUserName,
      password: hashedPassword,
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
