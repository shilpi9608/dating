// app\api\gossip\create\route.js
import { NextResponse } from 'next/server';
import DB from '@/lib/mongodb';
import User from '@/models/user.models';
import Gossip from '@/models/gossip.models';

DB();

export async function POST(request) {
  try {
    const body = await request.json();
    const { person1, person2 } = body;

    const isValidPerson = (p) => (p?.name && p?.year) || p?.ID;

    if (!isValidPerson(person1) || !isValidPerson(person2)) {
      return NextResponse.json(
        { error: 'Each person must have either an ID or both name and year.' },
        { status: 406 }
      );
    }

    const resolvePerson = async (person) => {
      let resolved = {
        name: person.name || '',
        year: person.year || null,
        ID: person.ID || null,
      };

      if (resolved.ID) {
        // Find user by ID and overwrite name/year
        const user = await User.findById(resolved.ID);
        if (user) {
          resolved.name = user.personalInformation.name;
          resolved.year = user.collegeInformation.year;
        }
      } else if (resolved.name && resolved.year) {
        // Try to find user by name and year to get ID
        const user = await User.findOne({
          'personalInformation.name': resolved.name,
          'collegeInformation.year': resolved.year,
        });

        if (user) {
          resolved.ID = user._id;
        }
        // If not found, keep name & year as provided, and ID remains null
      }

      return resolved;
    };

    const resolvedPerson1 = await resolvePerson(person1);
    const resolvedPerson2 = await resolvePerson(person2);

    const newGossip = new Gossip({
      person1: resolvedPerson1,
      person2: resolvedPerson2,
      likes: [],
      comments: [],
    });

    await newGossip.save();

    return NextResponse.json(
      { message: 'Gossip created successfully!', gossip: newGossip },
      { status: 201 }
    );
  } catch (error) {
    console.error('Gossip creation error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
