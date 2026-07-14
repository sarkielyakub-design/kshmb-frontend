"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { useRouter } from "next/navigation"

import { jwtDecode } from "jwt-decode"

import {
  Loader2,
  ShieldCheck,
  HeartPulse,
  ArrowRight,
  LockKeyhole,
  UserRoundPlus,
} from "lucide-react"

import api from "@/lib/api"

import { useAuthStore } from "@/store/auth-store"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"

import { toast } from "sonner"


export default function LoginPage() {

  const router = useRouter()

  const setAuth = useAuthStore(
    (state) => state.setAuth
  )

  const token = useAuthStore(
    (state) => state.token
  )

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)


  // =====================================
  // REDIRECT IF LOGGED IN
  // =====================================

  useEffect(() => {

    if (token) {

      router.replace("/dashboard")
    }

  }, [token, router])


  // =====================================
  // LOGIN
  // =====================================

  const handleLogin = async () => {

    try {

      setLoading(true)

      const formData =
        new URLSearchParams()

      formData.append(
        "username",
        email
      )

      formData.append(
        "password",
        password
      )

      const response =
      await api.post(
  "/auth/login",

          formData,

          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded",
            },
          }
        )

      const token =
        response.data.access_token

      const user =
        response.data.user

      const decoded: any =
        jwtDecode(token)

      setAuth(token, decoded)

      localStorage.setItem(
        "token",
        token
      )

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      )

      toast.success(
        "Authentication successful"
      )

      router.replace(
        "/dashboard"
      )

    } catch (error: any) {

      toast.error(

        error?.response?.data?.detail ||

        "Invalid credentials"
      )

    } finally {

      setLoading(false)
    }
  }


  return (

    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">

      {/* =====================================
      LEFT SIDE
      ===================================== */}

      <div className="hidden lg:flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-16 flex-col justify-between relative overflow-hidden">

        <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-cyan-500/10 blur-3xl rounded-full" />

        {/* LOGO */}

        <div className="relative z-10">

          <div className="flex items-center gap-4">

            <div className="h-16 w-16 rounded-3xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/10">

              <HeartPulse className="h-8 w-8 text-cyan-400" />

            </div>

            <div>

              <h1 className="text-4xl font-black tracking-tight">

                KSHMB

              </h1>

              <p className="text-slate-400 text-sm">

                Enterprise Healthcare ERP

              </p>

            </div>

          </div>

        </div>


        {/* CONTENT */}

        <div className="relative z-10 space-y-10">

          <div>

            <h2 className="text-6xl font-black leading-tight tracking-tight">

              Smart AI Healthcare
              Management Platform

            </h2>

            <p className="text-slate-400 mt-8 text-lg leading-relaxed max-w-xl">

              Enterprise-grade healthcare management system
              powering hospitals, appointments,
              emergency response, pharmacy,
              laboratory, analytics,
              queue systems, and AI healthcare infrastructure.

            </p>

          </div>


          {/* FEATURES */}

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur">

              <ShieldCheck className="h-9 w-9 text-emerald-400 mb-5" />

              <h3 className="font-semibold text-lg">

                Secure Authentication

              </h3>

              <p className="text-slate-400 text-sm mt-2 leading-relaxed">

                JWT-based enterprise security
                and protected healthcare access.

              </p>

            </div>


            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur">

              <HeartPulse className="h-9 w-9 text-red-400 mb-5" />

              <h3 className="font-semibold text-lg">

                Real-time Monitoring

              </h3>

              <p className="text-slate-400 text-sm mt-2 leading-relaxed">

                AI-powered analytics and
                live hospital operations tracking.

              </p>

            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="relative z-10 flex items-center justify-between text-sm text-slate-500">

          <span>
            Kano State Hospital Management Board
          </span>

          <span>
            Enterprise ERP System
          </span>

        </div>

      </div>


      {/* =====================================
      RIGHT SIDE
      ===================================== */}

      <div className="flex items-center justify-center p-6">

        <Card className="w-full max-w-md rounded-[32px] border-0 shadow-2xl bg-white overflow-hidden">

          {/* TOP BAR */}

          <div className="h-2 bg-gradient-to-r from-blue-700 via-cyan-500 to-emerald-500" />

          <div className="p-10">

            {/* HEADER */}

            <div className="space-y-3 mb-10">

              <div className="h-16 w-16 rounded-3xl bg-slate-100 flex items-center justify-center">

                <LockKeyhole className="h-8 w-8 text-slate-700" />

              </div>

              <h2 className="text-4xl font-black tracking-tight text-slate-900">

                Sign In

              </h2>

              <p className="text-slate-500 leading-relaxed">

                Access the KSHMB enterprise healthcare dashboard
                and management platform.

              </p>

            </div>


            {/* FORM */}

            <div className="space-y-6">

              {/* EMAIL */}

              <div className="space-y-2">

                <Label className="text-sm font-semibold">

                  Email Address

                </Label>

                <Input
                  type="email"
                  placeholder="admin@kshmb.gov.ng"
                  className="h-14 rounded-2xl border-slate-300"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* PASSWORD */}

              <div className="space-y-2">

                <div className="flex items-center justify-between">

                  <Label className="text-sm font-semibold">

                    Password

                  </Label>

                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-700 hover:text-blue-800 font-medium"
                  >

                    Forgot Password?

                  </Link>

                </div>

                <Input
                  type="password"
                  placeholder="Enter password"
                  className="h-14 rounded-2xl border-slate-300"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* LOGIN BUTTON */}

              <Button
                className="w-full h-14 rounded-2xl text-base font-semibold bg-slate-900 hover:bg-slate-800"
                disabled={loading}
                onClick={handleLogin}
              >

                {
                  loading ? (

                    <div className="flex items-center gap-3">

                      <Loader2 className="h-5 w-5 animate-spin" />

                      Authenticating...

                    </div>

                  ) : (

                    <div className="flex items-center gap-2">

                      Login to Dashboard

                      <ArrowRight className="h-5 w-5" />

                    </div>

                  )
                }

              </Button>

            </div>


            {/* DIVIDER */}

            <div className="relative my-8">

              <div className="absolute inset-0 flex items-center">

                <div className="w-full border-t border-slate-200" />

              </div>

              <div className="relative flex justify-center text-sm">

                <span className="bg-white px-4 text-slate-500">

                  New to KSHMB?

                </span>

              </div>

            </div>


            {/* REGISTER */}

            <Link href="/register">

              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl border-slate-300 text-base font-semibold"
              >

                <UserRoundPlus className="mr-2 h-5 w-5" />

                Create New Account

              </Button>

            </Link>


            {/* FOOTER */}

            <div className="mt-8 text-center text-sm text-slate-500 leading-relaxed">

              By continuing, you agree to the
              KSHMB healthcare system policies
              and enterprise security standards.

            </div>

          </div>

        </Card>

      </div>

    </div>
  )
}