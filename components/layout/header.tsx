"use client"

import { useEffect, useState }
from "react"

import { useRouter }
from "next/navigation"

import {

  Bell,

  Search,

  LogOut,

  User,

  Settings,

  ShieldCheck,

} from "lucide-react"

import {

  Avatar,

  AvatarFallback,

} from "@/components/ui/avatar"

import {

  DropdownMenu,

  DropdownMenuContent,

  DropdownMenuItem,

  DropdownMenuLabel,

  DropdownMenuSeparator,

  DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu"

import { Input }
from "@/components/ui/input"

import { useAuthStore }
from "@/store/auth-store"


export default function Header() {

  const router =
    useRouter()

  const logout =
    useAuthStore(
      (state) => state.logout
    )

  // =====================================
  // FIX HYDRATION
  // =====================================

  const [mounted, setMounted] =
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

    logout()

    router.push("/login")
  }

  return (

    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">

      {/* =====================================
          LEFT
      ===================================== */}

      <div>

        <h1 className="text-2xl font-black tracking-tight text-slate-900">

          Healthcare Dashboard

        </h1>

        <p className="text-sm text-slate-500 mt-1">

          Kano State Hospital Management Board

        </p>

      </div>


      {/* =====================================
          RIGHT
      ===================================== */}

      <div className="flex items-center gap-4">

        {/* SEARCH */}

        <div className="hidden md:flex items-center relative">

          <Search className="absolute left-3 h-4 w-4 text-slate-400" />

          <Input
            placeholder="Search..."
            className="pl-10 w-64 rounded-2xl bg-slate-100 border-0"
          />

        </div>


        {/* NOTIFICATIONS */}

        <button className="relative h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">

          <Bell className="h-5 w-5 text-slate-700" />

          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />

        </button>


        {/* PROFILE */}

        <DropdownMenu>

          <DropdownMenuTrigger className="outline-none">

            <div className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 transition px-3 py-2 rounded-2xl">

              <Avatar className="h-10 w-10">

                <AvatarFallback className="bg-blue-600 text-white font-bold">

                  A

                </AvatarFallback>

              </Avatar>

              <div className="hidden md:block text-left">

                <h3 className="text-sm font-semibold text-slate-900">

                  Administrator

                </h3>

                <p className="text-xs text-slate-500">

                  Super Admin

                </p>

              </div>

            </div>

          </DropdownMenuTrigger>


          <DropdownMenuContent
            align="end"
            className="w-64 rounded-2xl p-2"
          >

            <DropdownMenuLabel>

              <div className="flex items-center gap-3">

                <Avatar className="h-10 w-10">

                  <AvatarFallback className="bg-blue-600 text-white">

                    A

                  </AvatarFallback>

                </Avatar>

                <div>

                  <h3 className="font-semibold">

                    Administrator

                  </h3>

                  <p className="text-xs text-slate-500">

                    admin@kshmb.gov.ng

                  </p>

                </div>

              </div>

            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="rounded-xl cursor-pointer">

              <User className="mr-2 h-4 w-4" />

              Profile

            </DropdownMenuItem>

            <DropdownMenuItem className="rounded-xl cursor-pointer">

              <Settings className="mr-2 h-4 w-4" />

              Settings

            </DropdownMenuItem>

            <DropdownMenuItem className="rounded-xl cursor-pointer">

              <ShieldCheck className="mr-2 h-4 w-4" />

              Security

            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="rounded-xl cursor-pointer text-red-600 focus:text-red-600"
            >

              <LogOut className="mr-2 h-4 w-4" />

              Logout

            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </header>
  )
}