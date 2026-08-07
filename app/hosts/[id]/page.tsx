import React from 'react';
import Link from 'next/link';
import { MOCK_HOSTS, MOCK_GUESTS } from '@/lib/mock-data';
import { HostCurrentStatus } from '@/types/concourse';
import { ArrowLeft, Phone, Mail, Plane, Hotel, Utensils, StickyNote } from 'lucide-react';

const statusStyles: Record<HostCurrentStatus, string> = {
  'On Duty': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Active': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'Off Duty': 'bg-zinc-800 text-zinc-400 border-zinc-700',
  'Unavailable': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export default function HostGuestsPage({ params }: { params: { id: string } }) {
  const host = MOCK_HOSTS.find((h) => h.id === params.id);

  if (!host) {
    return (
      <div className="max-w-[1600px] mx-auto space-y-4">
        <Link href="/hosts" className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 w-fit">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Hosts
        </Link>
        <div className="text-sm text-zinc-400">No host found with ID {params.id}.</div>
      </div>
    );
  }

  const assignedGuests = MOCK_GUESTS.filter((g) => host.assignedGuestIds.includes(g.id));
  const initials = host.name.split(' ').map((n) => n[0]).join('');

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <Link href="/hosts" className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 w-fit">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Hosts
      </Link>

      {/* Host header */}
      <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-lg p-5 flex items-center gap-4">
        {host.photoUrl ? (
          <img src={host.photoUrl} alt={host.name} className="h-14 w-14 rounded-full object-cover shrink-0" />
        ) : (
          <div className="h-14 w-14 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-medium text-zinc-300 shrink-0">
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-zinc-100 truncate">{host.name}</h1>
          <div className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
            <Phone className="h-3 w-3" /> {host.phone}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusStyles[host.status]}`}>
              {host.status}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-800 text-zinc-300">
              {host.availability}
            </span>
          </div>
        </div>
      </div>

      {/* My Guests */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-200">My Guests</h2>
          <span className="text-xs text-zinc-500">{assignedGuests.length} assigned</span>
        </div>

        {assignedGuests.length === 0 ? (
          <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-lg p-8 text-center text-zinc-500 text-sm italic">
            No guests assigned to {host.name} yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {assignedGuests.map((guest) => (
              <div key={guest.id} className="bg-[#0c0c0e] border border-zinc-800/80 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-zinc-100">{guest.familyName}</div>
                    <div className="text-[11px] text-zinc-500">{guest.primaryContact} · Party of {guest.partySize}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    guest.guestType === 'VIP' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {guest.guestType}
                  </span>
                </div>

                {/* Contact */}
                <div className="text-xs space-y-1 border-t border-zinc-800/60 pt-2.5">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Phone className="h-3 w-3 text-zinc-500" /> {guest.guestPhone}
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Mail className="h-3 w-3 text-zinc-500" /> {guest.guestEmail}
                  </div>
                </div>

                {/* Flight / Hotel */}
                <div className="text-xs space-y-1 border-t border-zinc-800/60 pt-2.5">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Plane className="h-3 w-3 text-zinc-500" />
                    {guest.airline} {guest.flightNumber} · {guest.arrivalDate} {guest.arrivalTime}
                    <span className={guest.flightStatus === 'Delayed' ? 'text-amber-400' : 'text-zinc-500'}>
                      ({guest.flightStatus})
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Hotel className="h-3 w-3 text-zinc-500" /> {guest.hotel} · Room {guest.roomNumber}
                  </div>
                </div>

                {/* Dietary */}
                {(guest.dietaryRestrictions.length > 0 || guest.allergies.length > 0) && (
                  <div className="text-xs border-t border-zinc-800/60 pt-2.5">
                    <div className="flex items-center gap-1.5 text-zinc-400 mb-1.5">
                      <Utensils className="h-3 w-3" /> Dietary
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {guest.dietaryRestrictions.map((req, i) => (
                        <span key={`d-${i}`} className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded text-[10px]">
                          {req}
                        </span>
                      ))}
                      {guest.allergies.map((a, i) => (
                        <span key={`a-${i}`} className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px]">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {guest.notes && (
                  <div className="text-xs border-t border-zinc-800/60 pt-2.5">
                    <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                      <StickyNote className="h-3 w-3" /> Notes
                    </div>
                    <p className="text-zinc-300">{guest.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
