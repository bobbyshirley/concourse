import React from 'react';
import { Users, UserCheck, Plane, AlertTriangle, Bus, CheckCircle2, Clock } from 'lucide-react';
import { MOCK_GUESTS } from '@/lib/mock-data';
import GuestOperations from '@/components/GuestOperations';

export default function CommandDashboard() {
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
        {/* Guest Table + Drawer (shared with /guests) */}
        <div className="lg:col-span-2 flex flex-col">
          <GuestOperations />
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
    </div>
  );
}
