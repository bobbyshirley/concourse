import React from 'react';
import GuestOperations from '@/components/GuestOperations';

export default function GuestsPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-100">Guests</h1>
        <p className="text-xs text-zinc-400 mt-1">Full guest roster and master records.</p>
      </div>

      <GuestOperations />
    </div>
  );
}
