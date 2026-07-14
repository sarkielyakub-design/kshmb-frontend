"use client"

import { useEffect, useState } from "react"

import Sidebar from "./sidebar"

import Header from "./header"


export default function DashboardLayout({

  children,

}: {

  children: React.ReactNode

}) {

  // =====================================
  // HYDRATION FIX
  // =====================================

  const [mounted, setMounted] =
    useState(false)

  useEffect(() => {

    setMounted(true)

  }, [])


  // =====================================
  // LOADING SCREEN
  // =====================================

  if (!mounted) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <div className="h-10 w-10 rounded-full border-4 border-slate-300 border-t-slate-700 animate-spin" />

      </div>
    )
  }


  // =====================================
  // DASHBOARD
  // =====================================

  return (

    <div className="min-h-screen flex bg-slate-100">

      {/* SIDEBAR */}

      <Sidebar />


      {/* MAIN */}

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}

        <Header />


        {/* CONTENT */}

        <main className="flex-1 overflow-y-auto p-6">

          {children}

        </main>

      </div>

    </div>
  )
}