'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, UserCheck, Plane, Bus,
  Hotel, Utensils, Armchair, Calendar, Activity,
  BarChart3, Settings,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Guests', href: '/', icon: Users },
  { name: 'Hosts', href: '/hosts', icon: UserCheck },
  { name: 'Travel', href: '#', icon: Plane },
  { name: 'Transportation', href: '#', icon: Bus },
  { name: 'Hotels', href: '#', icon: Hotel },
  { name: 'Meals', href: '#', icon: Utensils },
  { name: 'Seating', href: '#', icon: Armchair },
  { name: 'Schedule', href: '#', icon: Calendar },
  { name: 'Activity', href: '#', icon: Activity },
  { name: 'Reports', href: '#', icon: BarChart3 },
  { name: 'Settings', href: '#', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-800/80 bg-[#0c0c0e] flex flex-col justify-between shrink-0">
      <div>
        <div className="h-14 flex items-center px-5 border-b border-zinc-800/80 gap-3">
          <div className="h-6 w-6 rounded bg-indigo-500 flex items-center justify-center font-bold text-xs text-white">
            C
          </div>
          <span className="font-semibold tracking-wide text-sm text-zinc-100">CONCOURSE</span>
          <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-mono ml-auto">v0.5</span>
        </div>

        <nav className="p-3 space-y-0.5">
          {navigation.map((item) => {
            const active = item.href !== '#' && pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  active
                    ? 'bg-zinc-800/80 text-zinc-100 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-zinc-800/80 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-medium">
          OP
        </div>
        <div className="flex flex-col text-xs overflow-hidden">
          <span className="font-medium truncate">Event Ops Team</span>
          <span className="text-zinc-500 text-[10px] truncate">Admin Desk</span>
        </div>
      </div>
    </aside>
  );
}
