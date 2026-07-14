"use client"

import { useEffect, useMemo, useState } from "react"

import Link from "next/link"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {

  BriefcaseBusiness,

  Plus,

  FileText,

  CircleCheckBig,

  Search,

  MapPin,

  Clock3,

  ChevronRight,

  TrendingUp,

  Loader2,

  Filter,

  Building2,

  BadgeCheck,

  CalendarDays,

  Wallet,

} from "lucide-react"

import {

  getJobs,

  Job,

} from "@/services/recruitment-service"

import { toast } from "sonner"


export default function RecruitmentPage() {

  const [jobs, setJobs] =
    useState<Job[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")

  const [statusFilter, setStatusFilter] =
    useState("ALL")


  // =====================================
  // FETCH JOBS
  // =====================================

  const fetchJobs = async () => {

    try {

      const data = await getJobs()

      setJobs(data)

    } catch (error) {

      toast.error(
        "Failed to load recruitment jobs"
      )

    } finally {

      setLoading(false)
    }
  }


  useEffect(() => {

    fetchJobs()

  }, [])


  // =====================================
  // FILTERED JOBS
  // =====================================

  const filteredJobs = useMemo(() => {

    return jobs.filter((job) => {

      const matchesSearch =

        job.title
          ?.toLowerCase()
          .includes(search.toLowerCase())

      const matchesStatus =

        statusFilter === "ALL"

          ? true

          : job.status === statusFilter


      return (
        matchesSearch &&
        matchesStatus
      )
    })

  }, [jobs, search, statusFilter])


  // =====================================
  // ANALYTICS
  // =====================================

  const analytics = useMemo(() => {

    const activeJobs =
      jobs.filter(
        (job) => job.status === "OPEN"
      ).length

    const closedJobs =
      jobs.filter(
        (job) => job.status === "CLOSED"
      ).length

    return {

      activeJobs,

      closedJobs,

      totalJobs: jobs.length,
    }

  }, [jobs])


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* =====================================
            HERO
        ===================================== */}

        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 p-10 text-white">

          <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]" />

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 px-5 py-3 rounded-full text-sm font-medium">

                <BadgeCheck className="h-4 w-4 text-cyan-300" />

                Healthcare Recruitment Platform

              </div>


              <h1 className="text-5xl font-black tracking-tight mt-8 leading-tight">

                Recruitment & Career Management

              </h1>


              <p className="text-slate-300 text-lg mt-6 leading-relaxed">

                Manage healthcare recruitment, staffing,
                employment opportunities, and medical
                workforce expansion across hospitals and
                healthcare departments.

              </p>


              <div className="flex flex-wrap gap-4 mt-10">

                <Link
                  href="/dashboard/recruitment/create"
                >

                  <Button className="h-12 rounded-2xl bg-white text-slate-900 hover:bg-slate-200">

                    <Plus className="mr-2 h-5 w-5" />

                    Create Job

                  </Button>

                </Link>


                <Link
                  href="/dashboard/recruitment/applications"
                >

                  <Button
                    variant="outline"
                    className="h-12 rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/20"
                  >

                    <FileText className="mr-2 h-5 w-5" />

                    View Applications

                  </Button>

                </Link>

              </div>

            </div>


            {/* STATS */}

            <div className="grid grid-cols-2 gap-5 min-w-[320px]">

              <Card className="rounded-3xl border-0 bg-white/10 backdrop-blur-xl text-white p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-300">

                      Open Jobs

                    </p>

                    <h2 className="text-4xl font-black mt-2">

                      {analytics.activeJobs}

                    </h2>

                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">

                    <BriefcaseBusiness className="h-7 w-7 text-cyan-300" />

                  </div>

                </div>

              </Card>


              <Card className="rounded-3xl border-0 bg-white/10 backdrop-blur-xl text-white p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-300">

                      Total Jobs

                    </p>

                    <h2 className="text-4xl font-black mt-2">

                      {analytics.totalJobs}

                    </h2>

                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">

                    <Building2 className="h-7 w-7 text-emerald-300" />

                  </div>

                </div>

              </Card>


              <Card className="rounded-3xl border-0 bg-white/10 backdrop-blur-xl text-white p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-300">

                      Closed Jobs

                    </p>

                    <h2 className="text-4xl font-black mt-2">

                      {analytics.closedJobs}

                    </h2>

                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">

                    <CircleCheckBig className="h-7 w-7 text-purple-300" />

                  </div>

                </div>

              </Card>


              <Card className="rounded-3xl border-0 bg-white/10 backdrop-blur-xl text-white p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-300">

                      Hiring Growth

                    </p>

                    <h2 className="text-4xl font-black mt-2">

                      +18%

                    </h2>

                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-orange-500/20 flex items-center justify-center">

                    <TrendingUp className="h-7 w-7 text-orange-300" />

                  </div>

                </div>

              </Card>

            </div>

          </div>

        </div>


        {/* =====================================
            FILTERS
        ===================================== */}

        <Card className="p-6 rounded-3xl border-0 shadow-sm">

          <div className="flex flex-col lg:flex-row gap-4">

            <div className="relative flex-1">

              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

              <Input
                placeholder="Search jobs..."
                className="pl-12 h-12 rounded-2xl"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            <div className="flex items-center gap-3">

              <Filter className="h-5 w-5 text-muted-foreground" />

              <select
                className="h-12 rounded-2xl border px-4 bg-background min-w-[180px]"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >

                <option value="ALL">
                  All Status
                </option>

                <option value="OPEN">
                  Open
                </option>

                <option value="CLOSED">
                  Closed
                </option>

              </select>

            </div>

          </div>

        </Card>


        {/* =====================================
            LOADING
        ===================================== */}

        {
          loading && (

            <div className="flex items-center justify-center py-24">

              <Loader2 className="h-12 w-12 animate-spin text-slate-500" />

            </div>
          )
        }


        {/* =====================================
            EMPTY
        ===================================== */}

        {
          !loading &&
          filteredJobs.length === 0 && (

            <Card className="rounded-3xl border-0 shadow-sm p-20 text-center">

              <BriefcaseBusiness className="h-20 w-20 text-slate-300 mx-auto" />

              <h2 className="text-3xl font-bold mt-8">

                No Recruitment Jobs Found

              </h2>

              <p className="text-muted-foreground mt-3">

                There are currently no active recruitment opportunities.

              </p>

            </Card>
          )
        }


        {/* =====================================
            JOB LIST
        ===================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {
            filteredJobs.map((job) => (

              <Card
                key={job.id}
                className="rounded-[32px] border-0 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >

                <div className="p-8">

                  <div className="flex items-start justify-between gap-5">

                    <div>

                      <h2 className="text-3xl font-bold tracking-tight">

                        {job.title}

                      </h2>

                      <p className="text-blue-600 font-semibold mt-3">

                        {job.department}

                      </p>

                    </div>


                    <div
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        job.status === "OPEN"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >

                      {job.status}

                    </div>

                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">

                    <div className="flex items-center gap-3 text-muted-foreground">

                      <MapPin className="h-5 w-5" />

                      <span>

                        {job.location}

                      </span>

                    </div>


                    <div className="flex items-center gap-3 text-muted-foreground">

                      <Clock3 className="h-5 w-5" />

                      <span>

                        {job.employment_type}

                      </span>

                    </div>


                    {
                      job.salary_range && (

                        <div className="flex items-center gap-3 text-muted-foreground">

                          <Wallet className="h-5 w-5" />

                          <span>

                            {job.salary_range}

                          </span>

                        </div>
                      )
                    }



                  </div>


                  <p className="text-muted-foreground leading-relaxed mt-8 line-clamp-3">

                    {job.description}

                  </p>


                  <div className="flex flex-wrap gap-3 mt-10">

                    <Link
                      href={`/dashboard/recruitment/${job.id}`}
                    >

                      <Button
                        variant="outline"
                        className="rounded-2xl"
                      >

                        View Details

                      </Button>

                    </Link>


                    <Link
                      href={`/dashboard/recruitment/${job.id}/applications`}
                    >

                      <Button
                        variant="secondary"
                        className="rounded-2xl"
                      >

                        <FileText className="mr-2 h-4 w-4" />

                        Applications

                      </Button>

                    </Link>


                    <Button className="rounded-2xl ml-auto">

                      Manage Job

                      <ChevronRight className="ml-2 h-4 w-4" />

                    </Button>

                  </div>

                </div>

              </Card>
            ))
          }

        </div>

      </div>

    </DashboardLayout>
  )
}