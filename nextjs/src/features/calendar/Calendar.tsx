"use client";

import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  type DateClickArg,
} from "@fullcalendar/interaction";
import type { EventClickArg, EventDropArg } from "@fullcalendar/core";
import type { EventResizeDoneArg } from "@fullcalendar/interaction";

import { toast } from "sonner";
import "./calendar.css";
import CalendarEventDialog from "./components/CalendarEventDialog";
import DeleteDialog from "@/components/DeleteDialog";
import type { CalendarEvent } from "./utils/schema";
import {
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "./utils/requests";

interface CalendarProps {
  events?: CalendarEvent[];
}

function toLocalDatetime(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function Calendar({ events: initialEvents = [] }: CalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [clickedDate, setClickedDate] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  function handleDateClick(info: DateClickArg) {
    setEditingEvent(null);
    setClickedDate(toLocalDatetime(info.date));
    setModalOpen(true);
  }

  function handleEventClick(info: EventClickArg) {
    const { event } = info;
    setEditingEvent({
      "@id": event.extendedProps["@id"] ?? event.id,
      "@type": event.extendedProps["@type"] ?? "CalendarEvent",
      id: event.id,
      title: event.title,
      start: event.start ? toLocalDatetime(event.start) : "",
      end: event.end ? toLocalDatetime(event.end) : "",
      allDay: event.allDay,
    });
    setModalOpen(true);
  }

  async function handleSubmit(data: {
    title: string;
    start: string;
    end: string;
    allDay: boolean;
  }) {
    const payload = {
      ...data,
      start: new Date(data.start).toISOString(),
      end: data.end ? new Date(data.end).toISOString() : undefined,
    };

    try {
      if (editingEvent) {
        const updated = await updateCalendarEvent(editingEvent["@id"], payload);
        setEvents((prev) =>
          prev.map((e) => (e["@id"] === editingEvent["@id"] ? updated : e)),
        );
        toast.success("Event updated");
      } else {
        const created = await createCalendarEvent(payload);
        setEvents((prev) => [...prev, created]);
        toast.success("Event created");
      }
      setModalOpen(false);
      setEditingEvent(null);
    } catch (error) {
      console.error("Failed to save event:", error);
      toast.error("Failed to save event");
    }
  }

  async function handleEventDropOrResize(info: EventDropArg | EventResizeDoneArg) {
    const { event } = info;
    const iri = event.extendedProps["@id"] ?? event.id;
    const payload = {
      start: event.start ? event.start.toISOString() : undefined,
      end: event.end ? event.end.toISOString() : undefined,
      allDay: event.allDay,
    };

    try {
      const updated = await updateCalendarEvent(iri, payload);
      setEvents((prev) => prev.map((e) => (e["@id"] === iri ? updated : e)));
      toast.success("Event updated");
    } catch (error) {
      console.error("Failed to update event:", error);
      info.revert();
      toast.error("Failed to update event");
    }
  }

  async function handleDelete() {
    if (!editingEvent) return;
    try {
      await deleteCalendarEvent(editingEvent["@id"]);
      setEvents((prev) => prev.filter((e) => e["@id"] !== editingEvent["@id"]));
      setDeleteDialogOpen(false);
      setModalOpen(false);
      setEditingEvent(null);
      toast.success("Event deleted");
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast.error("Failed to delete event");
    }
  }

  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
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
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDropOrResize}
        eventResize={handleEventDropOrResize}
        height="auto"
      />
      <CalendarEventDialog
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingEvent(null);
        }}
        onSubmit={handleSubmit}
        onDelete={() => setDeleteDialogOpen(true)}
        event={editingEvent}
        defaultStart={clickedDate}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete event"
        description="This event will be permanently deleted. This action cannot be undone."
      />
    </div>
  );
}
