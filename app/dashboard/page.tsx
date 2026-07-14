"use client"

import { useEffect, useState } from "react"

import AIAssistantCard from "@/components/dashboard/ai-assistant-card"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {

  Building2,

  Users,

  Calendar,

  Activity,

  TrendingUp,

  Ambulance,

  HeartPulse,

  ShieldCheck,

  Loader2,

  Wallet,

  UserRound,

  LogOut,

  Clock3,

  ArrowRight,

} from "lucide-react"

import Link from "next/link"

import {

  getDashboardAnalytics,

  DashboardAnalytics,

} from "@/services/analytics-service"

import { logoutUser } from "@/lib/api"

import { toast } from "sonner"


export default function DashboardPage() {

  const [analytics, setAnalytics] =
    useState<DashboardAnalytics | null>(
      null
    )

  const [loading, setLoading] =
    useState(true)


  // =====================================
  // FETCH ANALYTICS
  // =====================================

  const fetchAnalytics = async () => {

    try {

      const data =
        await getDashboardAnalytics()

      setAnalytics(data)

    } catch (error) {

      toast.error(
        "Failed to load dashboard analytics"
      )

    } finally {

      setLoading(false)
    }
  }


  useEffect(() => {

    fetchAnalytics()

  }, [])


  // =====================================
  // STATS
  // =====================================

  const stats = [

    {
      title: "Hospitals",
      value:
        analytics?.hospitals || 0,
      change: "+12%",
      icon: Building2,
      color:
        "bg-blue-100 text-blue-700",
    },

    {
      title: "Doctors",
      value:
        analytics?.doctors || 0,
      change: "+8%",
      icon: Users,
      color:
        "bg-emerald-100 text-emerald-700",
    },

    {
      title: "Patients",
      value:
        analytics?.patients || 0,
      change: "+18%",
      icon: UserRound,
      color:
        "bg-cyan-100 text-cyan-700",
    },

    {
      title: "Appointments",
      value:
        analytics?.appointments || 0,
      change: "+5%",
      icon: Calendar,
      color:
        "bg-orange-100 text-orange-700",
    },

    {
      title: "Emergency Cases",
      value:
        analytics?.emergency_cases || 0,
      change: "-3%",
      icon: Ambulance,
      color:
        "bg-red-100 text-red-700",
    },

    {
      title: "Invoices",
      value:
        analytics?.invoices || 0,
      change: "+14%",
      icon: Wallet,
      color:
        "bg-purple-100 text-purple-700",
    },
  ]


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <DashboardLayout>

        <div className="min-h-[70vh] flex items-center justify-center">

          <Loader2 className="h-12 w-12 animate-spin text-slate-500" />

        </div>

      </DashboardLayout>
    )
  }


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* =====================================
        TOP HEADER
        ===================================== */}

        <div className="rounded-[36px] bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 overflow-hidden text-white shadow-2xl">

          <div className="p-10">

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

              {/* LEFT */}

              <div>

                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">

                  <ShieldCheck className="h-4 w-4 text-emerald-400" />

                  Enterprise Healthcare Infrastructure

                </div>

                <h1 className="text-5xl font-black tracking-tight leading-tight">

                  KSHMB Smart Dashboard

                </h1>

                <p className="text-slate-300 text-lg mt-5 max-w-3xl">

                  Real-time healthcare analytics, emergency monitoring,
                  AI hospital intelligence, queue systems,
                  appointments, laboratory, pharmacy,
                  and enterprise healthcare automation.

                </p>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-wrap gap-4">

                <Link href="/dashboard/queue">

                  <Button className="h-14 px-8 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-semibold">

                    <Clock3 className="mr-2 h-5 w-5" />

                    Queue System

                  </Button>

                </Link>

                <Button
                  onClick={logoutUser}
                  className="h-14 px-8 rounded-2xl bg-red-600 hover:bg-red-700 font-semibold"
                >

                  <LogOut className="mr-2 h-5 w-5" />

                  Logout

                </Button>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================
        STATS
        ===================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            stats.map((item) => {

              const Icon = item.icon

              return (

                <Card
                  key={item.title}
                  className="border border-slate-200 shadow-sm rounded-[30px] bg-white hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >

                  <div className="p-7">

                    <div className="flex items-center justify-between">

                      <div className="space-y-3">

                        <p className="text-sm text-slate-500 font-medium">

                          {item.title}

                        </p>

                        <h2 className="text-5xl font-black text-slate-900">

                          {item.value}

                        </h2>

                      </div>

                      <div
                        className={`h-16 w-16 rounded-3xl flex items-center justify-center ${item.color}`}
                      >

                        <Icon className="h-8 w-8" />

                      </div>

                    </div>

                    <div className="mt-8 flex items-center gap-2">

                      <TrendingUp className="h-4 w-4 text-emerald-600" />

                      <span className="text-sm text-emerald-600 font-semibold">

                        {item.change}

                      </span>

                      <span className="text-sm text-slate-500">

                        this month

                      </span>

                    </div>

                  </div>

                </Card>
              )
            })
          }

        </div>


        {/* =====================================
        MAIN GRID
        ===================================== */}

        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">

          {/* =====================================
          ANALYTICS
          ===================================== */}

          <Card className="2xl:col-span-2 border border-slate-200 rounded-[36px] shadow-sm overflow-hidden">

            <div className="p-8">

              <div className="flex items-center justify-between mb-10">

                <div>

                  <h2 className="text-3xl font-black text-slate-900">

                    Healthcare Analytics

                  </h2>

                  <p className="text-slate-500 mt-2">

                    Enterprise healthcare performance overview

                  </p>

                </div>

                <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold">

                  Live Analytics

                </div>

              </div>

              {/* ANALYTICS GRID */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="rounded-3xl bg-blue-50 border border-blue-100 p-8">

                  <Building2 className="h-12 w-12 text-blue-700 mb-6" />

                  <h3 className="text-5xl font-black text-slate-900">

                    {analytics?.hospitals || 0}

                  </h3>

                  <p className="text-slate-500 mt-3 text-lg">

                    Connected Hospitals

                  </p>

                </div>

                <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-8">

                  <Users className="h-12 w-12 text-emerald-700 mb-6" />

                  <h3 className="text-5xl font-black text-slate-900">

                    {analytics?.doctors || 0}

                  </h3>

                  <p className="text-slate-500 mt-3 text-lg">

                    Active Doctors

                  </p>

                </div>

                <div className="rounded-3xl bg-orange-50 border border-orange-100 p-8">

                  <Calendar className="h-12 w-12 text-orange-700 mb-6" />

                  <h3 className="text-5xl font-black text-slate-900">

                    {analytics?.appointments || 0}

                  </h3>

                  <p className="text-slate-500 mt-3 text-lg">

                    Total Appointments

                  </p>

                </div>

                <div className="rounded-3xl bg-red-50 border border-red-100 p-8">

                  <Ambulance className="h-12 w-12 text-red-700 mb-6" />

                  <h3 className="text-5xl font-black text-slate-900">

                    {analytics?.emergency_cases || 0}

                  </h3>

                  <p className="text-slate-500 mt-3 text-lg">

                    Emergency Requests

                  </p>

                </div>

              </div>

            </div>

          </Card>


          {/* =====================================
          SIDE PANEL
          ===================================== */}

          <div className="space-y-6">

            {/* EMERGENCY */}

            <Card className="border border-slate-200 rounded-[32px] shadow-sm overflow-hidden">

              <div className="h-2 bg-gradient-to-r from-red-600 to-orange-500" />

              <div className="p-7">

                <h2 className="text-2xl font-black mb-6">

                  Emergency Status

                </h2>

                <div className="space-y-5">

                  <div className="flex items-center justify-between p-5 rounded-2xl bg-red-50">

                    <div className="flex items-center gap-3">

                      <Ambulance className="h-6 w-6 text-red-600" />

                      <span className="font-semibold">

                        Emergency Cases

                      </span>

                    </div>

                    <span className="text-red-600 font-black text-xl">

                      {
                        analytics?.emergency_cases || 0
                      }

                    </span>

                  </div>

                  <div className="flex items-center justify-between p-5 rounded-2xl bg-emerald-50">

                    <div className="flex items-center gap-3">

                      <ShieldCheck className="h-6 w-6 text-emerald-600" />

                      <span className="font-semibold">

                        System Security

                      </span>

                    </div>

                    <span className="text-emerald-600 font-black">

                      Secure

                    </span>

                  </div>

                </div>

              </div>

            </Card>


            {/* QUEUE */}

            <Card className="rounded-[32px] border border-slate-200 overflow-hidden bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-sm">

              <div className="p-7">

                <Clock3 className="h-12 w-12 mb-6" />

                <h2 className="text-3xl font-black">

                  Smart Queue System

                </h2>

                <p className="text-cyan-100 mt-4 leading-relaxed">

                  Real-time queue monitoring and patient management system.

                </p>

                <Link href="/dashboard/queue">

                  <Button className="mt-8 h-12 rounded-2xl bg-white text-slate-900 hover:bg-slate-100">

                    Open Queue Dashboard

                    <ArrowRight className="ml-2 h-4 w-4" />

                  </Button>

                </Link>

              </div>

            </Card>


            {/* AI */}

            <Card className="border-0 rounded-[32px] bg-slate-900 text-white shadow-sm overflow-hidden">

              <div className="p-7">

                <div className="flex items-center gap-4">

                  <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center">

                    <Activity className="h-7 w-7 text-cyan-400" />

                  </div>

                  <div>

                    <h3 className="text-2xl font-black">

                      AI Healthcare

                    </h3>

                    <p className="text-slate-400 text-sm mt-1">

                      Smart AI healthcare automation

                    </p>

                  </div>

                </div>

                <button className="mt-8 w-full bg-white text-slate-900 py-4 rounded-2xl font-semibold hover:bg-slate-200 transition">

                  Launch AI Assistant

                </button>

              </div>

            </Card>

          </div>

        </div>

      </div>

    </DashboardLayout>
  )
}