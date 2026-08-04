import React from 'react';
import '@/app/globals.css';
import { 
  LayoutDashboard, Users, UserCheck, Plane, Bus, 
  Hotel, Utensils, Armchair, Calendar, Activity, 
  BarChart3, Settings, Search, Bell 
} from 'lucide-react';

export const metadata = {
  title: 'Concourse — Event Operations Platform',
  description: 'Event operations and guest management platform',
};

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, active: true },
  { name: 'Guests', icon: Users, active: false },
  { name: 'Hosts', icon: UserCheck, active: false },
  { name: 'Travel', icon: Plane, active: false },
  { name: 'Transportation', icon: Bus, active: false },
  { name: 'Hotels', icon: Hotel, active: false },
  { name: 'Meals', icon: Utensils, active: false },
  { name: 'Seating', icon: Armchair, active: false },
  { name: 'Schedule', icon: Calendar, active: false },
  { name: 'Activity', icon: Activity, active: false },
  { name: 'Reports', icon: BarChart3, active: false },
  { name: 'Settings', icon: Settings, active: false },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-zinc-100 font-sans antialiased flex h-screen overflow-hidden">
        {/* Sidebar */}
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
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    item.active 
                      ? 'bg-zinc-800/80 text-zinc-100 font-semibold' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.name}
                </a>
              ))}
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

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-14 border-b border-zinc-800/80 bg-[#0c0c0e]/50 flex items-center justify-between px-6 shrink-0 backdrop-blur">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search guests, flights, hosts..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-md transition-colors relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              </button>
              <div className="h-4 w-[1px] bg-zinc-800" />
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> System Live
              </span>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 bg-[#09090b]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}