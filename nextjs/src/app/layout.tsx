import {ReactNode} from 'react'
import { Toaster } from "sonner";

import "./globals.css"

export default function RootLayout({
                                     children,
                                   }: {
  children: ReactNode
}) {
  return (
    <html lang="en">
    <head>
      <title>Next.js App</title>
    </head>
    <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
