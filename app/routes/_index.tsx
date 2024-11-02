import type { MetaFunction } from '@remix-run/node';

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
      <div className="flex h-full w-full flex-col items-center justify-center gap-[25%] rounded-b-[3rem] rounded-t-2xl bg-[#EED9D3] px-4 pt-[20%] md:rounded-l-xl md:rounded-r-none">
        <h1 className="bg-gradient-to-br from-[#156A91] to-[#094F70] bg-clip-text text-center font-title text-5xl text-transparent">
          How did you find us? <span className="text-black">🫢</span>
        </h1>
        <p className="whitespace-pre-wrap text-center text-[#3F3F3F]">{`IYKYK\nReach out to me directly and I’ll hook you up with an invite.`}</p>
      </div>
    </div>
  );
}
