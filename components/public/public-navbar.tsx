"use client"

import Link from "next/link"

import {
  Menu,
  X,
  HeartPulse,
  ChevronDown,
  ChevronRight,
  Building2,
  Users,
  Calendar,
  Ambulance,
  Activity,
  BrainCircuit,
  Pill,
  FlaskConical,
  BriefcaseBusiness,
  Phone,
  ShieldCheck,
  BellRing,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useState } from "react"

const navLinks = [
  {
    title: "Home",
    href: "/",
  },

  {
    title: "Hospitals",
    href: "/hospitals",
  },

  {
    title: "Doctors",
    href: "/doctors",
  },

  {
    title: "Appointments",
    href: "/appointments",
  },

  {
    title: "Emergency",
    href: "/emergency",
  },

  {
    title: "Analytics",
    href: "/analytics",
  },
]

const moreLinks = [
  {
    title: "AI Healthcare",
    href: "/ai-healthcare",
    icon: BrainCircuit,
  },

  {
    title: "Pharmacy",
    href: "/pharmacy",
    icon: Pill,
  },

  {
    title: "Laboratory",
    href: "/laboratory",
    icon: FlaskConical,
  },

  {
    title: "Careers",
    href: "/careers",
    icon: BriefcaseBusiness,
  },

  {
    title: "Contact",
    href: "/contact",
    icon: Phone,
  },
]

export default function PublicNavbar() {
  const [mobileMenu, setMobileMenu] =
    useState(false)

  return (
    <header className="sticky top-0 z-50">
      
      {/* =========================================
      TOP HEADER
      ========================================= */}

      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-cyan-700 text-white border-b border-blue-500">

        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">

          <div className="hidden lg:flex items-center gap-3 text-sm font-medium">

            <ShieldCheck className="h-4 w-4 text-cyan-300" />

            <span>
              Kano State Hospital Management Board (KSHMB)
            </span>

          </div>

          <div className="flex items-center gap-6 text-sm">

            <div className="flex items-center gap-2">

              <Ambulance className="h-4 w-4 text-red-300" />

              <span>
                Emergency: 0800-KSHMB-247
              </span>

            </div>

            <div className="hidden md:flex items-center gap-2">

              <BellRing className="h-4 w-4 text-cyan-300" />

              <span>
                AI Healthcare Infrastructure Active
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
      MAIN NAVBAR
      ========================================= */}

      <div className="border-b border-slate-200/80 bg-white/90 backdrop-blur-2xl shadow-sm">

        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-4"
          >

            <div className="relative">

              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-30 rounded-full" />

              <div className="relative h-14 w-14 rounded-[22px] bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-700 flex items-center justify-center shadow-xl">

                <HeartPulse className="h-7 w-7 text-cyan-300" />

              </div>

            </div>

            <div>

              <h1 className="text-2xl font-black tracking-tight text-slate-900">

                KSHMB

              </h1>

              <p className="text-sm text-slate-500 font-medium">

                Enterprise Healthcare Platform

              </p>

            </div>

          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden xl:flex items-center gap-8">

            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition"
              >
                {link.title}
              </Link>
            ))}

            {/* DROPDOWN */}

            <DropdownMenu>

              <DropdownMenuTrigger asChild>

                <button className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-700 transition">

                  More

                  <ChevronDown className="h-4 w-4" />

                </button>

              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-72 rounded-3xl p-3 border border-slate-200 shadow-2xl"
              >

                {moreLinks.map((item) => {
                  const Icon = item.icon as React.ComponentType<{ className: string }>

                  return (
                    <DropdownMenuItem
                      key={item.title}
                      asChild
                      className="rounded-2xl cursor-pointer p-0"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-4 px-4 py-4"
                      >

                        <div className="h-11 w-11 rounded-2xl bg-blue-50 flex items-center justify-center">

                          <Icon className="h-5 w-5 text-blue-700" />

                        </div>

                        <div>

                          <p className="font-semibold text-slate-900">

                            {item.title}

                          </p>

                          <p className="text-xs text-slate-500">

                            Enterprise Healthcare Module

                          </p>

                        </div>

                      </Link>
                    </DropdownMenuItem>
                  )
                })}

              </DropdownMenuContent>

            </DropdownMenu>

          </nav>

          {/* ACTIONS */}

          <div className="hidden xl:flex items-center gap-3">

            <Link href="/login">

              <Button
                variant="outline"
                className="rounded-2xl border-slate-300 h-11 px-6"
              >

                Login

              </Button>

            </Link>

            <Link href="/appointments">

              <Button className="rounded-2xl h-11 px-6 bg-blue-700 hover:bg-blue-800 shadow-lg shadow-blue-500/20">

                Book Appointment

                <ChevronRight className="ml-2 h-4 w-4" />

              </Button>

            </Link>

          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="xl:hidden h-12 w-12 rounded-2xl border border-slate-300 bg-white flex items-center justify-center shadow-sm"
          >

            {
              mobileMenu
                ? <X className="h-5 w-5 text-slate-700" />
                : <Menu className="h-5 w-5 text-slate-700" />
            }

          </button>

        </div>

      </div>

      {/* =========================================
      MOBILE MENU
      ========================================= */}

      {
        mobileMenu && (

          <div className="xl:hidden border-t border-slate-200 bg-white shadow-xl">

            <div className="px-6 py-6 space-y-3">

              {[...navLinks, ...moreLinks].map((link) => {

                const Icon = 'icon' in link ? (link.icon as React.ComponentType<{ className: string }>) : undefined

                return (

                  <Link
                    key={link.title}
                    href={link.href}
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition"
                  >

                    <div className="h-11 w-11 rounded-2xl bg-blue-50 flex items-center justify-center">

                      {
                          Icon
                            ? <Icon className="h-5 w-5 text-blue-700" />
                            : <HeartPulse className="h-5 w-5 text-blue-700" />
                      }

                    </div>

                    <span className="font-semibold text-slate-800">

                      {link.title}

                    </span>

                  </Link>
                )
              })}

              {/* BUTTONS */}

              <div className="pt-4 flex flex-col gap-3">

                <Link href="/login">

                  <Button
                    variant="outline"
                    className="w-full rounded-2xl h-12"
                  >

                    Login

                  </Button>

                </Link>

                <Link href="/appointments">

                  <Button className="w-full rounded-2xl h-12 bg-blue-700 hover:bg-blue-800">

                    Book Appointment

                  </Button>

                </Link>

              </div>

            </div>

          </div>
        )
      }

    </header>
  )
}