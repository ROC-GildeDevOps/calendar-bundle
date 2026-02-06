"use server";

import type {CalendarEvent} from "./schema";

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: "1",
      title: "Team Meeting",
      start: "2026-02-06T10:00:00",
      end: "2026-02-06T11:00:00",
    },
    {
      id: "2",
      title: "Project Deadline",
      start: "2026-02-08T23:59:00",
    },
    {
      id: "3",
      title: "Client Call",
      start: "2026-02-07T14:00:00",
      end: "2026-02-07T15:00:00",
    },
  ];
}
