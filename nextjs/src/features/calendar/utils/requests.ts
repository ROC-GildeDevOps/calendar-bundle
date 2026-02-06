"use server";

import { api } from "@/lib/hydra/request";
import type { CalendarEvent } from "./schema";
import { getCollectionMembers, type HydraCollection } from "@/lib/hydra/types/collection";

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const data = await api.get<HydraCollection<CalendarEvent>>("/calendar_events");

  return getCollectionMembers(data);
}
