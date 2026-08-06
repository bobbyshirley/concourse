'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_HOSTS } from '@/lib/mock-data';
import { UserCircle2 } from 'lucide-react';

export default function HostSwitcher() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-1.5">
      <UserCircle2 className="h-3.5 w-3.5 text-zinc-500" />
      <select
        defaultValue=""
        onChange={(e) => {
          if (e.target.value) router.push(`/hosts/${e.target.value}`);
        }}
        className="bg-zinc-900 border border-zinc-800 rounded-md px-2 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-700 cursor-pointer"
      >
        <option value="" disabled>
          View as host...
        </option>
        {MOCK_HOSTS.map((host) => (
          <option key={host.id} value={host.id}>
            {host.name}
          </option>
        ))}
      </select>
    </div>
  );
}
