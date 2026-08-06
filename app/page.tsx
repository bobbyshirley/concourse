'use client';

import React from 'react';
import { MOCK_HOSTS, MOCK_GUESTS } from '@/lib/mock-data';
import { Phone, Users, Clock } from 'lucide-react';
import { HostCurrentStatus } from '@/types/concourse';

const statusStyles: Record<HostCurrentStatus, string> = {
  'On Duty': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Active': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'Off Duty': 'bg-zinc-800 text-zinc-400 border-zinc-700',
  'Unavailable': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export default function HostsPage() {
  const availableToday = MOCK_HOSTS.filter(
    (h) => h.status === 'On Duty' || h.status === 'Active'
  ).length;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-100">Hosts</h1>
          <p className="text-xs text-zinc-400 mt-1">
            {MOCK_HOSTS.length} hosts on record · {availableToday} available today
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
          + Add Host
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_HOSTS.map((host) => {
          const assignedGuests = MOCK_GUESTS.filter((g) => host.assignedGuestIds.includes(g.id));
          const initials = host.name
            .split(' ')
            .map((n) => n[0])
            .join('');

          return (
            <div
              key={host.id}
              className="bg-[#0c0c0e] border border-zinc-800/80 rounded-lg p-4 space-y-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {host.photoUrl ? (
                  <img
                    src={host.photoUrl}
                    alt={host.name}
                    className="h-10 w-10 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-300 shrink-0">
                    {initials}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-zinc-100 truncate">{host.name}</div>
                  <div className="text-[11px] text-zinc-500 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {host.phone}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusStyles[host.status]}`}
                >
                  {host.status}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-800 text-zinc-300 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {host.availability}
                </span>
              </div>

              <div className="border-t border-zinc-800/60 pt-2.5 text-xs">
                <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> Assigned Guests
                  </span>
                  <span className="font-mono text-zinc-500">{assignedGuests.length}</span>
                </div>
                {assignedGuests.length === 0 ? (
                  <div className="text-zinc-500 italic text-[11px]">No guests assigned.</div>
                ) : (
                  <ul className="space-y-1">
                    {assignedGuests.map((g) => (
                      <li key={g.id} className="text-zinc-300 text-[11px]">
                        {g.familyName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
