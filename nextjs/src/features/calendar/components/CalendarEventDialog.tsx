"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { CalendarEvent } from "../utils/schema";
import {
  calendarEventFormSchema,
  type CalendarEventFormData,
} from "../utils/schema";

interface CalendarEventDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CalendarEventFormData) => void;
  onDelete?: () => void;
  event?: CalendarEvent | null;
  defaultStart?: string;
}

export default function CalendarEventDialog({
  open,
  onClose,
  onSubmit,
  onDelete,
  event,
  defaultStart = "",
}: CalendarEventDialogProps) {
  const isEditing = !!event;

  const form = useForm<CalendarEventFormData>({
    resolver: zodResolver(calendarEventFormSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      start: "",
      end: "",
      allDay: false,
    }
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: event?.title ?? "",
        start: event?.start?.toString() ?? defaultStart,
        end: event?.end?.toString() ?? "",
        allDay: event?.allDay ?? false,
      });
    }
  }, [open, event, defaultStart, form]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader className="pb-2">
          <DialogTitle>
            {isEditing ? "Edit Event" : "Create Event"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allDay"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>All day</FormLabel>
                </FormItem>
              )}
            />
            <DialogFooter className="flex-row justify-between sm:justify-between pt-4">
              {isEditing && onDelete ? (
                <Button type="button" variant="destructive" onClick={onDelete}>
                  Delete
                </Button>
              ) : (
                <div />
              )}
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? "Save" : "Create"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
