"use client";

import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventInput } from "@fullcalendar/core";

interface CalendarProps {
  events?: EventInput[];
}

export default function Calendar({ events: initialEvents = [] }: CalendarProps) {
  const [events, setEvents] = useState<EventInput[]>(initialEvents);

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        editable={true}
        selectable={true}
        height="auto"
      />
    </div>
  );
}
