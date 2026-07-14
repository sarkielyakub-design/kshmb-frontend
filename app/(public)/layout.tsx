import type { ReactNode } from "react"

import PublicNavbar from "../../components/public/public-navbar"

import PublicFooter from "../../components/public/public-footer"


export default function PublicLayout({

  children,

}: {

  children: ReactNode

}) {

  return (

    <main className="min-h-screen bg-slate-50">

      <PublicNavbar />

      {children}

      <PublicFooter />

    </main>
  )
}