'use client';

import React, { useState } from 'react';
import { MOCK_GUESTS } from '@/lib/mock-data';
import { Guest } from '@/types/concourse';
import {
  Users, UserCheck, Plane, AlertTriangle,
  Bus, CheckCircle2, Clock, Phone, X, Paperclip,
  MapPin, Utensils, Armchair, MessageSquare, StickyNote,
} from 'lucide-react';

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-zinc-500 shrink-0">{label}</span>
      <span className="text-zinc-200 text-right">{value}</span>
    </div>
  );
}

function DetailSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-900/50 p-3 rounded-md border border-zinc-800 space-y-2 text-xs">
      <div className="font-semibold text-zinc-300 border-b border-zinc-800/60 pb-1 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-indigo-400" /> {title}
      </div>
      {children}
    </div>
  );
}

export default function CommandDashboard() {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-100">Event Operations Command Center</h1>
          <p className="text-xs text-zinc-400 mt-1">Real-time status overview across all event logistics teams.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
          + Add Guest Record
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total Guests', value: '412', icon: Users },
          { label: 'Hosts Assigned', value: '388/412', icon: UserCheck },
          { label: 'Traveling Today', value: '84', icon: Plane },
          { label: 'Flight Delays', value: '3', icon: AlertTriangle, alert: true },
          { label: 'Transp. Pending', value: '12', icon: Bus },
          { label: 'Check-ins Complete', value: '64%', icon: CheckCircle2 },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-[#0c0c0e] border border-zinc-800/80 p-3.5 rounded-lg shadow-sm">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[11px] font-medium uppercase tracking-wider">{kpi.label}</span>
              <kpi.icon className={`h-4 w-4 ${kpi.alert ? 'text-amber-500' : 'text-zinc-500'}`} />
            </div>
            <div className={`text-xl font-bold tracking-tight ${kpi.alert ? 'text-amber-400' : 'text-zinc-100'}`}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* Primary Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Master Table (Guests Module View) */}
        <div className="lg:col-span-2 bg-[#0c0c0e] border border-zinc-800/80 rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-200">Active Guest Operations</h2>
            <span className="text-xs text-zinc-500">Showing {MOCK_GUESTS.length} primary records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/50 text-zinc-400 font-mono text-[11px] border-b border-zinc-800/80">
                <tr>
                  <th className="p-3">GUEST / FAMILY</th>
                  <th className="p-3">TYPE</th>
                  <th className="p-3">FLIGHT</th>
                  <th className="p-3">HOST</th>
                  <th className="p-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {MOCK_GUESTS.map((guest) => (
                  <tr
                    key={guest.id}
                    onClick={() => setSelectedGuest(guest)}
                    className="hover:bg-zinc-900/60 cursor-pointer transition-colors"
                  >
                    <td className="p-3 font-medium text-zinc-200">
                      <div>{guest.familyName}</div>
                      <div className="text-[10px] text-zinc-500 font-normal">{guest.primaryContact} ({guest.partySize})</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        guest.guestType === 'VIP' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {guest.guestType}
                      </span>
                    </td>
                    <td className="p-3 font-mono">
                      <div>{guest.airline} {guest.flightNumber}</div>
                      <div className={`text-[10px] ${guest.flightStatus === 'Delayed' ? 'text-amber-400' : 'text-zinc-500'}`}>
                        {guest.flightStatus} ({guest.arrivalTime})
                      </div>
                    </td>
                    <td className="p-3 text-zinc-300">{guest.assignedHost}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        guest.checkInStatus === 'Checked In'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {guest.checkInStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-lg p-4 flex flex-col">
          <h2 className="text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-indigo-400" /> Global Activity Stream
          </h2>
          <div className="space-y-4 text-xs">
            {MOCK_GUESTS.flatMap(g => g.timeline.map(evt => ({ ...evt, guestId: g.id }))).map((evt) => (
              <div key={`${evt.guestId}-${evt.id}`} className="flex gap-3 border-l-2 border-zinc-800 pl-3 py-1">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-300">{evt.action}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">{evt.timestamp}</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] mt-0.5">{evt.notes}</p>
                  <span className="text-[10px] text-zinc-500 mt-1 inline-block">By {evt.user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guest Master Record Drawer / Flyout Details */}
      {selectedGuest && (
        <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0c0c0e] border-l border-zinc-800 shadow-2xl z-50 overflow-y-auto flex flex-col">
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-zinc-800 sticky top-0 bg-[#0c0c0e] z-10">
            <span className="text-xs font-mono text-zinc-500">{selectedGuest.id}</span>
            <button onClick={() => setSelectedGuest(null)} className="text-zinc-400 hover:text-zinc-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-6 py-4 space-y-5 flex-1">
            <div>
              <h3 className="text-lg font-bold text-zinc-100">{selectedGuest.familyName}</h3>
              <p className="text-xs text-zinc-400">{selectedGuest.primaryContact} — {selectedGuest.organization}</p>
              <div className="flex gap-1.5 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  selectedGuest.guestType === 'VIP' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-zinc-800 text-zinc-300'
                }`}>
                  {selectedGuest.guestType}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-300">
                  Party of {selectedGuest.partySize}
                </span>
              </div>
            </div>

            <DetailSection title="Travel" icon={Plane}>
              <DetailRow label="Arrival" value={`${selectedGuest.arrivalDate} · ${selectedGuest.arrivalTime}`} />
              <DetailRow label="Flight" value={`${selectedGuest.airline} ${selectedGuest.flightNumber} (${selectedGuest.airport})`} />
              <DetailRow label="Flight Status" value={selectedGuest.flightStatus} />
              <DetailRow label="Departure" value={`${selectedGuest.departureDate} · ${selectedGuest.departureFlight}`} />
              {selectedGuest.travelNotes && <DetailRow label="Notes" value={selectedGuest.travelNotes} />}
            </DetailSection>

            <DetailSection title="Hosting" icon={UserCheck}>
              <DetailRow label="Host" value={selectedGuest.assignedHost} />
              <DetailRow label="Backup Host" value={selectedGuest.backupHost} />
              <DetailRow label="Contact" value={<span className="flex items-center gap-1 justify-end"><Phone className="h-3 w-3" /> {selectedGuest.hostPhone}</span>} />
              <DetailRow label="Host Status" value={selectedGuest.hostStatus} />
            </DetailSection>

            <DetailSection title="Hotel" icon={MapPin}>
              <DetailRow label="Hotel" value={selectedGuest.hotel} />
              <DetailRow label="Room" value={selectedGuest.roomNumber} />
              <DetailRow label="Check-In" value={selectedGuest.checkInStatus} />
              <DetailRow label="Check-Out" value={selectedGuest.checkOutDate} />
            </DetailSection>

            <DetailSection title="Transportation" icon={Bus}>
              <DetailRow label="Needed" value={selectedGuest.transportationNeeded ? 'Yes' : 'No'} />
              <DetailRow label="Driver" value={selectedGuest.driver} />
              <DetailRow label="Vehicle" value={selectedGuest.vehicle} />
              <DetailRow label="Pickup" value={`${selectedGuest.pickupLocation} @ ${selectedGuest.pickupTime}`} />
              <DetailRow label="Status" value={selectedGuest.transportationStatus} />
            </DetailSection>

            <DetailSection title="Meals & Accessibility" icon={Utensils}>
              <div className="flex gap-1.5 flex-wrap">
                {selectedGuest.dietaryRestrictions.map((req, i) => (
                  <span key={`d-${i}`} className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded text-[10px]">
                    {req}
                  </span>
                ))}
                {selectedGuest.allergies.map((a, i) => (
                  <span key={`a-${i}`} className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px]">
                    {a}
                  </span>
                ))}
                {selectedGuest.accessibilityRequirements.map((r, i) => (
                  <span key={`r-${i}`} className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px]">
                    {r}
                  </span>
                ))}
                {selectedGuest.dietaryRestrictions.length === 0 &&
                  selectedGuest.allergies.length === 0 &&
                  selectedGuest.accessibilityRequirements.length === 0 && (
                    <span className="text-zinc-500 italic text-[11px]">None recorded.</span>
                )}
              </div>
            </DetailSection>

            <DetailSection title="Conference" icon={Users}>
              <DetailRow label="Session" value={selectedGuest.session} />
              <DetailRow label="Breakout" value={selectedGuest.breakout} />
              <DetailRow label="VIP Events" value={selectedGuest.vipEvents.length ? selectedGuest.vipEvents.join(', ') : 'None'} />
            </DetailSection>

            <DetailSection title="Seating" icon={Armchair}>
              <DetailRow label="Venue" value={selectedGuest.venue} />
              <DetailRow label="Section / Row / Seat" value={`${selectedGuest.section} / ${selectedGuest.row} / ${selectedGuest.seat}`} />
              <DetailRow label="Status" value={selectedGuest.seatStatus} />
            </DetailSection>

            <DetailSection title="Communication" icon={MessageSquare}>
              <DetailRow label="Last Contact" value={selectedGuest.lastContact} />
              <DetailRow label="Email Sent" value={selectedGuest.emailSent ? 'Yes' : 'No'} />
              <DetailRow label="Text Sent" value={selectedGuest.textSent ? 'Yes' : 'No'} />
            </DetailSection>

            {selectedGuest.notes && (
              <DetailSection title="Notes" icon={StickyNote}>
                <p className="text-zinc-300">{selectedGuest.notes}</p>
              </DetailSection>
            )}

            {/* Activity Timeline */}
            <div className="space-y-3 text-xs">
              <div className="font-semibold text-zinc-400 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-indigo-400" /> Record Timeline
              </div>
              {selectedGuest.timeline.length === 0 ? (
                <div className="text-zinc-500 italic text-[11px]">No events recorded for this guest yet.</div>
              ) : (
                selectedGuest.timeline.map((evt) => (
                  <div key={evt.id} className="bg-zinc-900/30 border border-zinc-800/50 p-2.5 rounded space-y-1">
                    <div className="flex justify-between font-mono text-[10px] text-zinc-500">
                      <span>{evt.timestamp}</span>
                      <span>{evt.user}</span>
                    </div>
                    <div className="text-zinc-200 font-medium text-[11px]">{evt.action}</div>
                    <div className="text-zinc-400 text-[10px]">{evt.notes}</div>
                  </div>
                ))
              )}
            </div>

            {/* Attachments */}
            <div className="space-y-3 text-xs">
              <div className="font-semibold text-zinc-400 flex items-center gap-1.5">
                <Paperclip className="h-3.5 w-3.5 text-indigo-400" /> Attachments
              </div>
              {selectedGuest.attachments.length === 0 ? (
                <div className="text-zinc-500 italic text-[11px]">No attachments.</div>
              ) : (
                selectedGuest.attachments.map((att) => (
                  <div key={att.id} className="flex items-center justify-between bg-zinc-900/30 border border-zinc-800/50 p-2.5 rounded">
                    <div>
                      <div className="text-zinc-200 text-[11px] font-medium">{att.name}</div>
                      <div className="text-zinc-500 text-[10px]">Uploaded {att.uploadedAt} by {att.uploadedBy}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-zinc-800 flex gap-2 sticky bottom-0 bg-[#0c0c0e]">
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs py-2 rounded font-medium transition-colors">
              Edit Master Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
