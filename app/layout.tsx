import type { Metadata } from "next"

import "./globals.css"

import { Toaster } from "sonner"


export const metadata: Metadata = {

  title:
    "KSHMB Enterprise Healthcare Platform",

  description:
    "Enterprise healthcare management system with AI analytics, hospitals, appointments, emergency services, recruitment, and healthcare infrastructure.",

}


export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en">

      <body className="bg-slate-50 text-slate-900 antialiased">

        {children}

        <Toaster
          richColors
          position="top-right"
        />

      </body>

    </html>
  )
}