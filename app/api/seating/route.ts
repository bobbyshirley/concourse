import { NextRequest, NextResponse } from 'next/server';
import { getSeatAssignments, setSeatAssignments } from '@/lib/kv-store';
import { MOCK_GUESTS } from '@/lib/mock-data';

// Never statically cache this route — every poll needs the live assignment map.
export const dynamic = 'force-dynamic';

// One-time seed: on first read (empty store), pre-populate assignments from
// whatever venue/section/row/seat each mock guest already has on their
// record. After this point, the KV store is the single source of truth —
// editing a guest's seat fields elsewhere will NOT move them on this chart.
function seedFromGuests(): Record<string, string> {
  const seed: Record<string, string> = {};
  for (const g of MOCK_GUESTS) {
    if (g.venue && g.section && g.row && g.seat) {
      seed[`${g.section}-${g.row}-${g.seat}`] = g.id;
    }
  }
  return seed;
}

export async function GET() {
  let assignments = await getSeatAssignments();
  if (Object.keys(assignments).length === 0) {
    assignments = seedFromGuests();
    await setSeatAssignments(assignments);
  }
  return NextResponse.json({ assignments });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.seatId !== 'string') {
    return NextResponse.json({ error: 'seatId is required' }, { status: 400 });
  }

  const { seatId, guestId } = body as { seatId: string; guestId: string | null };
  const assignments = await getSeatAssignments();

  // A guest can only occupy one seat at a time — clear any seat they
  // currently hold before assigning the new one.
  if (guestId) {
    for (const key of Object.keys(assignments)) {
      if (assignments[key] === guestId) delete assignments[key];
    }
    assignments[seatId] = guestId;
  } else {
    delete assignments[seatId];
  }

  await setSeatAssignments(assignments);
  return NextResponse.json({ assignments });
}
