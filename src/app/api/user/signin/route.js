import { NextResponse } from 'next/server';
import User from '@/models/user.models';
import DB from '@/lib/mongodb';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

DB();

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Check for required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 406 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Compare the password
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Generate JWT token (you can adjust the secret and payload as needed)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Optionally exclude password from returned user data
    const { password: _, ...userWithoutPassword } = user._doc;

    return NextResponse.json(
      {
        message: 'Login successful.',
        user: userWithoutPassword,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
