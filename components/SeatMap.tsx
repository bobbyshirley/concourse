'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { MOCK_GUESTS } from '@/lib/mock-data';
import { SEAT_LAYOUT, seatId as buildSeatId } from '@/lib/seating-layout';
import { SeatStatus } from '@/types/concourse';
import { X, Wifi, WifiOff } from 'lucide-react';

const statusColor: Record<SeatStatus, string> = {
  Available: 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:border-zinc-500',
  Reserved: 'bg-sky-500/10 border-sky-500/40 text-sky-400 hover:border-sky-400',
  VIP: 'bg-amber-500/10 border-amber-500/40 text-amber-400 hover:border-amber-400',
  Wheelchair: 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400 hover:border-indigo-400',
  Occupied: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:border-emerald-400',
};

// Precedence when more than one condition applies to the same guest —
// accessibility needs surface first (ops needs to spot these fast), then
// VIP handling, then plain checked-in/not-checked-in occupancy.
function deriveStatus(guestId: string | undefined): SeatStatus {
  if (!guestId) return 'Available';
  const guest = MOCK_GUESTS.find((g) => g.id === guestId);
  if (!guest) return 'Available';
  if (guest.accessibilityRequirements.some((r) => /wheelchair/i.test(r))) return 'Wheelchair';
  if (guest.guestType === 'VIP') return 'VIP';
  if (guest.checkInStatus === 'Checked In') return 'Occupied';
  return 'Reserved';
}

const POLL_INTERVAL_MS = 3000;

export default function SeatMap() {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const fetchAssignments = useCallback(async () => {
    try {
      const res = await fetch('/api/seating', { cache: 'no-store' });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setAssignments(data.assignments ?? {});
      setOnline(true);
    } catch {
      setOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
    const interval = setInterval(fetchAssignments, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchAssignments]);

  const assignGuest = async (seat: string, guestId: string | null) => {
    // Optimistic update so the click feels instant; the next poll (or the
    // response below) reconciles with whatever the server actually saved.
    setAssignments((prev) => {
      const next = { ...prev };
      if (guestId) {
        for (const key of Object.keys(next)) {
          if (next[key] === guestId) delete next[key];
        }
        next[seat] = guestId;
      } else {
        delete next[seat];
      }
      return next;
    });
    setSelectedSeat(null);

    try {
      const res = await fetch('/api/seating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seatId: seat, guestId }),
      });
      const data = await res.json();
      setAssignments(data.assignments ?? {});
      setOnline(true);
    } catch {
      setOnline(false);
    }
  };

  const seatByGuestId: Record<string, string> = {};
  Object.entries(assignments).forEach(([seat, gid]) => {
    seatByGuestId[gid] = seat;
  });

  const selectedGuestId = selectedSeat ? assignments[selectedSeat] : undefined;
  const selectedGuest = selectedGuestId ? MOCK_GUESTS.find((g) => g.id === selectedGuestId) : undefined;
  const assignableGuests = MOCK_GUESTS.filter((g) => g.id !== selectedGuestId);

  if (loading) {
    return <div className="text-xs text-zinc-500">Loading seating chart...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Legend + sync status */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {(Object.keys(statusColor) as SeatStatus[]).map((status) => (
            <span
              key={status}
              className={`px-2 py-1 rounded text-[10px] font-medium border ${statusColor[status]}`}
            >
              {status}
            </span>
          ))}
        </div>
        <span
          className={`text-[11px] font-mono flex items-center gap-1.5 ${
            online ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {online ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
          {online ? 'Synced' : 'Offline — retrying'}
        </span>
      </div>

      {/* Sections */}
      {SEAT_LAYOUT.map((section) => (
        <div key={section.id} className="bg-[#0c0c0e] border border-zinc-800/80 rounded-lg p-4">
          <div className="text-xs font-semibold text-zinc-300 mb-3">{section.label}</div>
          <div className="space-y-1.5 overflow-x-auto">
            {Array.from({ length: section.rows }, (_, i) => i + 1).map((row) => (
              <div key={row} className="flex items-center gap-1.5">
                <span className="text-[10px] text-zinc-600 font-mono w-5 shrink-0">{row}</span>
                <div className="flex gap-1">
                  {Array.from({ length: section.seatsPerRow }, (_, i) => i + 1).map((seatNum) => {
                    const id = buildSeatId(section.id, row, seatNum);
                    const status = deriveStatus(assignments[id]);
                    return (
                      <button
                        key={id}
                        onClick={() => setSelectedSeat(id)}
                        title={`${section.label} · Row ${row} · Seat ${seatNum}`}
                        className={`h-5 w-5 rounded-[3px] border text-[8px] flex items-center justify-center transition-colors ${statusColor[status]}`}
                      >
                        {seatNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Seat detail / assignment panel */}
      {selectedSeat && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSeat(null)}
        >
          <div
            className="bg-[#0c0c0e] border border-zinc-800 rounded-lg p-5 w-full max-w-sm space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-100">Seat {selectedSeat}</h3>
              <button onClick={() => setSelectedSeat(null)} className="text-zinc-400 hover:text-zinc-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            {selectedGuest ? (
              <div className="space-y-3">
                <div className="text-xs space-y-1">
                  <div className="text-zinc-100 font-medium">{selectedGuest.familyName}</div>
                  <div className="text-zinc-500">
                    {selectedGuest.primaryContact} · {selectedGuest.guestType}
                  </div>
                  <div className="text-zinc-500">{selectedGuest.checkInStatus}</div>
                </div>
                <button
                  onClick={() => assignGuest(selectedSeat, null)}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs py-2 rounded font-medium transition-colors"
                >
                  Remove from seat
                </button>
              </div>
            ) : (
              <div className="text-xs text-zinc-500 italic">This seat is empty.</div>
            )}

            <div className="border-t border-zinc-800 pt-3 space-y-2">
              <div className="text-[11px] text-zinc-400 font-medium">
                {selectedGuest ? 'Reassign to a different guest' : 'Assign a guest'}
              </div>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {assignableGuests.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => assignGuest(selectedSeat, g.id)}
                    className="w-full text-left px-2.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-200 transition-colors"
                  >
                    {g.familyName} <span className="text-zinc-500">— {g.primaryContact}</span>
                    {seatByGuestId[g.id] && (
                      <span className="text-zinc-600"> (currently at {seatByGuestId[g.id]})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
