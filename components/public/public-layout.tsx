import type { ReactNode } from "react"

import PublicNavbar from "@/components/public/public-navbar"
import PublicFooter from "@/components/public/public-footer"

export default function PublicLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      
      {/* =========================================
      GLOBAL BACKGROUND
      ========================================= */}

      <div className="fixed inset-0 -z-50 overflow-hidden">

        {/* MAIN GRADIENT */}

        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />

        {/* TOP RIGHT GLOW */}

        <div className="absolute top-0 right-0 h-[700px] w-[700px] rounded-full bg-blue-300/10 blur-3xl" />

        {/* BOTTOM LEFT GLOW */}

        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-200/20 blur-3xl" />

        {/* GRID PATTERN */}

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

      </div>

      {/* =========================================
      NAVBAR
      ========================================= */}

      <PublicNavbar />

      {/* =========================================
      PAGE CONTENT
      ========================================= */}

      <div className="relative z-10">
        {children}
      </div>

      {/* =========================================
      FOOTER
      ========================================= */}

      <PublicFooter />

    </main>
  )
}