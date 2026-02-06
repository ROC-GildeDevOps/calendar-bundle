import type { EventInput } from "@fullcalendar/core";
import type { HydraItem } from "@/lib/hydra/types/item";

export interface CalendarEvent extends EventInput, HydraItem {}
