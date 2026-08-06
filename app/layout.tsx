import React from 'react';
import '@/app/globals.css';
import Sidebar from '@/components/Sidebar';
import { Search, Bell } from 'lucide-react';

export const metadata = {
  title: 'Concourse — Event Operations Platform',
  description: 'Event operations and guest management platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-zinc-100 font-sans antialiased flex h-screen overflow-hidden">
        <Sidebar />

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
