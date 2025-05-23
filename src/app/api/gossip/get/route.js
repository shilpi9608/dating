// File: app/api/gossip/get/route.js
import { NextResponse } from 'next/server';
import DB from '@/lib/mongodb';
import Gossip from '@/models/gossip.models';

DB();

export async function POST(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Gossip ID is required' },
        { status: 400 }
      );
    }

    const gossip = await Gossip.findById(id);
    if (!gossip) {
      return NextResponse.json({ error: 'Gossip not found' }, { status: 404 });
    }

    return NextResponse.json({ gossip }, { status: 200 });
  } catch (error) {
    console.error('Error fetching gossip by ID:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve gossip' },
      { status: 500 }
    );
  }
}
