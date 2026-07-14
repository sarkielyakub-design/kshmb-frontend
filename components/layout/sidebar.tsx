"use client"

import Link from "next/link"

import {
  usePathname,
  useRouter,
} from "next/navigation"

import {
  LayoutDashboard,
  Building2,
  Calendar,
  CreditCard,
  FlaskConical,
  Ambulance,
  ShieldCheck,
  User,
  BriefcaseBusiness,
  FileText,
  Activity,
  ChevronRight,
  Stethoscope,
  Users,
  Bed,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Newspaper,
  BellRing,
  Settings,
  HeartPulse,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

// =====================================
// MENU
// =====================================

const menuSections = [

  {
    title: "MAIN",

    items: [

      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },

      {
        title: "News & Headlines",
        icon: Newspaper,
        href: "/dashboard/news",
      },

      {
        title: "Announcements",
        icon: BellRing,
        href: "/dashboard/announcements",
      },
    ],
  },

  {
    title: "HOSPITAL MANAGEMENT",

    items: [

      {
        title: "Hospitals",
        icon: Building2,
        href: "/dashboard/hospitals",
      },

      {
        title: "Doctors",
        icon: Stethoscope,
        href: "/dashboard/doctors",
      },

      {
        title: "Patients",
        icon: User,
        href: "/dashboard/patients",
      },

      {
        title: "Appointments",
        icon: Calendar,
        href: "/dashboard/appointments",
      },

      {
        title: "Emergency",
        icon: Ambulance,
        href: "/dashboard/emergency",
      },

      {
        title: "Queue Management",
        icon: ClipboardList,
        href: "/dashboard/queue",
      },

      {
        title: "Bed Spaces",
        icon: Bed,
        href: "/dashboard/bedspaces",
      },

      {
        title: "Staff",
        icon: Users,
        href: "/dashboard/staff",
      },
    ],
  },

  {
    title: "MEDICAL SERVICES",

    items: [

      {
        title: "Laboratory",
        icon: FlaskConical,
        href: "/dashboard/laboratory",
      },

      {
        title: "Medical Records",
        icon: FileText,
        href: "/dashboard/medical-records",
      },

      {
        title: "Health Analytics",
        icon: Activity,
        href: "/dashboard/analytics",
      },
    ],
  },

  {
    title: "ADMINISTRATION",

    items: [

      {
        title: "Recruitment",
        icon: BriefcaseBusiness,
        href: "/dashboard/recruitment",
      },

      {
        title: "Billing",
        icon: CreditCard,
        href: "/dashboard/billing",
      },

      {
        title: "Audit Logs",
        icon: ShieldCheck,
        href: "/dashboard/audit",
      },

      {
        title: "System Settings",
        icon: Settings,
        href: "/dashboard/settings",
      },
    ],
  },
]

export default function Sidebar() {

  const pathname =
    usePathname()

  const router =
    useRouter()

  const [mounted, setMounted] =
    useState(false)

  const [mobileOpen, setMobileOpen] =
    useState(false)

  useEffect(() => {

    setMounted(true)

  }, [])

  if (!mounted) {

    return null
  }

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout = () => {

    localStorage.removeItem("token")

    localStorage.removeItem("user")

    router.push("/login")
  }

  return (

    <>

      {/* =====================================
          MOBILE TOPBAR
      ===================================== */}

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4">

        <div className="flex items-center gap-3">

          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">

            <HeartPulse className="h-6 w-6 text-white" />

          </div>

          <div>

            <h1 className="text-white font-black text-lg">

              KSHMB

            </h1>

            <p className="text-slate-400 text-xs">

              Admin Portal

            </p>

          </div>

        </div>

        <button
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="text-white"
        >

          {
            mobileOpen
              ? <X className="h-7 w-7" />
              : <Menu className="h-7 w-7" />
          }

        </button>

      </div>

      {/* =====================================
          MOBILE OVERLAY
      ===================================== */}

      {
        mobileOpen && (

          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() =>
              setMobileOpen(false)
            }
          />
        )
      }

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside
        className={`fixed lg:relative top-0 left-0 z-50 lg:z-0 h-screen w-80 bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="p-6 border-b border-slate-800 mt-16 lg:mt-0">

          <div className="flex items-center gap-4">

            <div className="relative">

              <div className="absolute inset-0 blur-xl bg-blue-500/30 rounded-full" />

              <div className="relative h-16 w-16 rounded-[22px] bg-gradient-to-br from-blue-600 via-cyan-500 to-sky-500 flex items-center justify-center shadow-2xl">

                <HeartPulse className="h-8 w-8 text-white" />

              </div>

            </div>

            <div>

              <h1 className="text-2xl font-black tracking-tight text-white">

                KSHMB

              </h1>

              <p className="text-slate-400 text-sm leading-relaxed">

                Kano State Hospitals
                Management Board

              </p>

            </div>

          </div>

        </div>

        {/* =====================================
            NAVIGATION
        ===================================== */}

        <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">

          <div className="space-y-8">

            {
              menuSections.map((section) => (

                <div key={section.title}>

                  <h2 className="px-3 mb-3 text-[11px] font-bold tracking-[0.25em] text-slate-500 uppercase">

                    {section.title}

                  </h2>

                  <div className="space-y-2">

                    {
                      section.items.map((item) => {

                        const Icon =
                          item.icon

                        const active =
                          pathname === item.href ||
                          pathname.startsWith(
                            `${item.href}/`
                          )

                        return (

                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() =>
                              setMobileOpen(false)
                            }
                            className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                              active
                                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                                : "text-slate-300 hover:bg-slate-900 hover:text-white"
                            }`}
                          >

                            <div className="flex items-center gap-3">

                              <div
                                className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                                  active
                                    ? "bg-white/10"
                                    : "bg-slate-900"
                                }`}
                              >

                                <Icon className="h-5 w-5 shrink-0" />

                              </div>

                              <span className="font-medium text-sm">

                                {item.title}

                              </span>

                            </div>

                            <ChevronRight
                              className={`h-4 w-4 transition-all duration-300 ${
                                active
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                              }`}
                            />

                          </Link>
                        )
                      })
                    }

                  </div>

                </div>
              ))
            }

          </div>

        </div>

        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="p-5 border-t border-slate-800 space-y-4">

          {/* SYSTEM CARD */}

          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-5">

            <div className="flex items-start gap-4">

              <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">

                <ShieldCheck className="h-7 w-7 text-white" />

              </div>

              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">

                  Official Healthcare System

                </p>

                <h3 className="font-bold text-white mt-2 leading-snug">

                  Kano State Hospitals
                  Management Board ERP

                </h3>

                <p className="text-slate-400 text-sm mt-2">

                  Healthcare Administration Platform

                </p>

              </div>

            </div>

          </div>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-white shadow-lg shadow-red-500/20"
          >

            <LogOut className="h-5 w-5" />

            Logout

          </button>

        </div>

      </aside>

    </>
  )
}