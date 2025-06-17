import { NextResponse } from 'next/server';
import DB from '@/lib/mongodb';
import Gossip from '@/models/gossip.models';

DB();

export async function GET() {
  try {
    const allGossips = await Gossip.find().sort({ createdAt: -1 }); // newest first
    return NextResponse.json({ gossips: allGossips }, { status: 200 });
  } catch (error) {
    console.error('Error fetching all gossips:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve gossips' },
      { status: 500 }
    );
  }
}
