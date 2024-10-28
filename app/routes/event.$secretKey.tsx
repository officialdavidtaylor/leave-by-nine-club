import {
  CalendarFold,
  CalendarPlus,
  Clock,
  LoaderCircle,
  MapPinned,
  NotebookPen,
} from 'lucide-react';
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { db } from '@/db/index.server';
import { eq } from 'drizzle-orm';
import { eventsTable, invitationsTable, usersTable } from '@/db/schema';
import { redirect, useLoaderData } from '@remix-run/react';
import { useState } from 'react';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const key = params.secretKey;
  if (!key) return redirect('/');

  const invitations = await db
    .select()
    .from(invitationsTable)
    .where(eq(invitationsTable.secretKey, key));

  if (invitations.length === 0) return redirect('/');

  const dataRows = await db
    .select({
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      secretKey: invitationsTable.secretKey,
      didRsvp: invitationsTable.didRsvp,
      event: {
        title: eventsTable.title,
        dateTime: eventsTable.dateTime,
        address: eventsTable.address,
        description: eventsTable.description,
        guestLimit: eventsTable.guestLimit,
        calendarUrl: eventsTable.calendarUrl,
      },
    })
    .from(invitationsTable)
    .where(eq(invitationsTable.secretKey, key))
    .leftJoin(usersTable, eq(usersTable.id, invitationsTable.userId))
    .leftJoin(eventsTable, eq(eventsTable.id, invitationsTable.userId));

  if (dataRows.length !== 1) return redirect('/');

  const data = dataRows[0];

  return json(data);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const secretKey = formData.get('secretKey') ?? '';
  if (!secretKey) return redirect('/');

  await db
    .update(invitationsTable)
    .set({ didRsvp: true })
    .where(eq(invitationsTable.secretKey, secretKey.toString()));

  return null;
};

export default function Event() {
  const data = useLoaderData<typeof loader>();
  const [showSpinner, setShowSpinner] = useState(false);

  let date = null;
  if (data.event?.dateTime) date = new Date(data.event.dateTime);

  let dateString = null;
  let timeString = null;
  if (date) {
    dateString = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'America/Los_Angeles',
    }).format(date);

    timeString = new Intl.DateTimeFormat('en-US', {
      timeStyle: 'short',
      timeZone: 'America/Los_Angeles',
    }).format(date);
  }

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-6 rounded-b-[3rem] rounded-t-2xl bg-[#EED9D3] px-4 pb-8 pt-8 md:rounded-l-xl md:rounded-r-none">
      <h1 className="bg-gradient-to-br from-[#156A91] to-[#094F70] bg-clip-text pb-4 text-center font-title text-5xl text-transparent">
        {data.event?.title}
      </h1>

      <EventDetails
        dateString={dateString}
        timeString={timeString}
        address={data.event?.address}
      />

      <p className="whitespace-pre-wrap text-left text-lg text-[#3F3F3F]">
        {data.event?.description}
      </p>

      {data.didRsvp ? (
        <a
          href={data.event?.calendarUrl ?? ''}
          className="mt-auto flex gap-4 self-center rounded-full bg-gradient-to-br from-[#A8C6B6] to-[#90B3A1] px-6 py-2 text-center text-xl text-black"
        >
          <CalendarPlus />
          <span>Add to Calendar</span>
        </a>
      ) : (
        <form method="post" className="mt-auto self-center">
          <input
            hidden
            readOnly
            name="secretKey"
            value={data.secretKey ?? ''}
          />
          <button
            type="submit"
            onClick={() => setShowSpinner(true)}
            className="flex items-center gap-4 rounded-full bg-gradient-to-br from-[#A8C6B6] to-[#90B3A1] px-6 py-2 text-center text-xl text-black"
          >
            {showSpinner ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <NotebookPen />
            )}
            <span>RSVP</span>
          </button>
        </form>
      )}
    </div>
  );
}

const EventDetails = ({
  dateString,
  timeString,
  address,
}: {
  dateString: string | null;
  timeString: string | null;
  address?: string | null;
}) => {
  return (
    <ol className="flex flex-col gap-2 text-[#3F3F3F]">
      {dateString && (
        <li className="flex gap-2 text-lg">
          <CalendarFold stroke="#9A573F" />
          {dateString}
        </li>
      )}
      {timeString && (
        <li className="flex gap-2 text-lg">
          <Clock stroke="#9A573F" />
          {timeString}
        </li>
      )}
      {address && (
        <li className="flex gap-2 text-lg">
          <MapPinned stroke="#9A573F" />
          {address}
        </li>
      )}
    </ol>
  );
};
