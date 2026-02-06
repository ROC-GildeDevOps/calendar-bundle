export const dynamic = "force-dynamic";

import Calendar from "@/features/calendar/Calendar";
import {getCalendarEvents} from "@/features/calendar/utils/requests";

export default async function Page() {
  const events = await getCalendarEvents();

  return <Calendar events={events} />;
}
