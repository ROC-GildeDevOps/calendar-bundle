import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4">
      <h1 className="text-4xl font-bold tracking-tight">Welcome to Next.js!</h1>
      <p className="text-muted-foreground">Get started by navigating to your calendar.</p>
      <Link href={"/calendar"}>
        <Button size="lg">
          Go to Calendar
        </Button>
      </Link>
    </div>
  )
}
