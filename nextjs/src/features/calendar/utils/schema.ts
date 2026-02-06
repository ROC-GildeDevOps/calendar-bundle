import { z } from "zod";
import type { EventInput } from "@fullcalendar/core";
import type { HydraItem } from "@/lib/hydra/types/item";

export interface CalendarEvent extends EventInput, HydraItem {}

export const calendarEventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  start: z.string().min(1, "Start date is required"),
  end: z.string().optional(),
  allDay: z.boolean(),
});

export type CalendarEventFormData = z.infer<typeof calendarEventFormSchema>;
