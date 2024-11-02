import type { MetaFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

export const meta: MetaFunction = () => [
  { title: 'Leave by Nine Club' },
  {
    name: 'description',
    content: 'A super secret event network for friends',
  },
];

export default function Index() {
  return (
    <div className="flex h-dvh w-screen max-w-full overscroll-none px-2 py-4 md:px-0 md:py-0">
      {/* The "leave by nine" banner */}
      <div className="px-1 py-4 font-sans text-xl font-extralight text-[#867E7B] [writing-mode:vertical-rl]">
        Leave by Nine club
      </div>
      {/* The content slot */}
      <Outlet />
    </div>
  );
}
