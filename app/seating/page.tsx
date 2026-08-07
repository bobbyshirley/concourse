import React from 'react';
import SeatMap from '@/components/SeatMap';
import { VENUE_NAME } from '@/lib/seating-layout';

export default function SeatingPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-100">Seating — {VENUE_NAME}</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Live seat map, synced across devices. Click any seat to view or assign a guest.
        </p>
      </div>
      <SeatMap />
    </div>
  );
}
