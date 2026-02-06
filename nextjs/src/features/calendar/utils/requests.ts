"use server";

import { api } from "@/lib/hydra/request";
import type { CalendarEvent } from "./schema";
import { getCollectionMembers, type HydraCollection } from "@/lib/hydra/types/collection";

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const data = await api.get<HydraCollection<CalendarEvent>>("/calendar_events");

  return getCollectionMembers(data);
}

export async function createCalendarEvent(event: {
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
}): Promise<CalendarEvent> {
  return api.post<CalendarEvent>("/calendar_events", { data: event });
}

export async function updateCalendarEvent(
  id: string,
  event: Partial<{ title: string; start: string; end: string; allDay: boolean }>,
): Promise<CalendarEvent> {
  return api.patch<CalendarEvent>(id, { data: event });
}

export async function deleteCalendarEvent(id: string): Promise<void> {
  await api.delete(id);
}
