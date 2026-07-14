"use client"

import { useEffect, useMemo, useState } from "react"

import Link from "next/link"

import {

  BriefcaseBusiness,

  MapPin,

  Clock3,

  Search,

  ChevronRight,

  Loader2,

  Building2,

  HeartPulse,

  ShieldCheck,

  Users,

  Stethoscope,

} from "lucide-react"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Card } from "@/components/ui/card"

import {

  getJobs,

} from "@/services/recruitment-service"

import { toast } from "sonner"


export default function CareersPage() {

  const [jobs, setJobs] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")


  // =====================================
  // FETCH JOBS
  // =====================================

  const fetchJobs =
    async () => {

      try {

        const data =
          await getJobs()

        setJobs(data)

      } catch (error) {

        toast.error(
          "Failed to load careers"
        )

      } finally {

        setLoading(false)
      }
    }


  useEffect(() => {

    fetchJobs()

  }, [])


  // =====================================
  // FILTER
  // =====================================

  const filteredJobs =
    useMemo(() => {

      return jobs.filter((job) =>

        job.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      )

    }, [jobs, search])


  return (

    <main className="min-h-screen bg-slate-50">

      {/* ===================================== */}
      {/* HERO */}
      {/* ===================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-b">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-5 py-3 rounded-full text-sm font-medium mb-8">

                <ShieldCheck className="h-4 w-4" />

                Kano State Healthcare Recruitment Portal

              </div>


              <h1 className="text-6xl font-black tracking-tight leading-tight">

                Build Your Career In Healthcare

              </h1>


              <p className="text-xl text-muted-foreground mt-8 leading-relaxed">

                Join the Kano State Hospital Management Board
                and become part of the next generation of
                healthcare professionals delivering advanced
                medical services, innovation, and patient care.

              </p>


              <div className="flex flex-wrap gap-4 mt-10">

                <Button
                  size="lg"
                  className="rounded-2xl h-14 px-8"
                >

                  Explore Careers

                  <ChevronRight className="ml-2 h-5 w-5" />

                </Button>


                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl h-14 px-8"
                >

                  Healthcare Opportunities

                </Button>

              </div>

            </div>


            {/* RIGHT */}

            <div className="grid grid-cols-2 gap-6">

              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center mb-6">

                  <BriefcaseBusiness className="h-8 w-8 text-blue-700" />

                </div>

                <h2 className="text-5xl font-black">

                  {jobs.length}+

                </h2>

                <p className="text-muted-foreground mt-3">

                  Open Positions

                </p>

              </Card>


              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center mb-6">

                  <Users className="h-8 w-8 text-emerald-700" />

                </div>

                <h2 className="text-5xl font-black">

                  5K+

                </h2>

                <p className="text-muted-foreground mt-3">

                  Healthcare Staff

                </p>

              </Card>


              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-purple-100 flex items-center justify-center mb-6">

                  <HeartPulse className="h-8 w-8 text-purple-700" />

                </div>

                <h2 className="text-2xl font-black leading-tight">

                  Modern Healthcare

                </h2>

                <p className="text-muted-foreground mt-3">

                  Advanced Medical Infrastructure

                </p>

              </Card>


              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-orange-100 flex items-center justify-center mb-6">

                  <Stethoscope className="h-8 w-8 text-orange-700" />

                </div>

                <h2 className="text-2xl font-black leading-tight">

                  Smart Recruitment

                </h2>

                <p className="text-muted-foreground mt-3">

                  AI Powered Healthcare Hiring

                </p>

              </Card>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================== */}
      {/* SEARCH */}
      {/* ===================================== */}

      <section className="py-12">

        <div className="max-w-7xl mx-auto px-6">

          <Card className="p-6 rounded-[32px] border-0 shadow-sm">

            <div className="relative">

              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

              <Input
                placeholder="Search healthcare careers..."
                className="pl-12 h-14 rounded-2xl text-lg"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

          </Card>

        </div>

      </section>


      {/* ===================================== */}
      {/* LOADING */}
      {/* ===================================== */}

      {
        loading && (

          <div className="flex items-center justify-center py-24">

            <Loader2 className="h-12 w-12 animate-spin text-slate-500" />

          </div>
        )
      }


      {/* ===================================== */}
      {/* EMPTY */}
      {/* ===================================== */}

      {
        !loading &&
        filteredJobs.length === 0 && (

          <div className="max-w-7xl mx-auto px-6 pb-24">

            <Card className="p-20 rounded-[32px] border-0 shadow-sm text-center">

              <BriefcaseBusiness className="h-20 w-20 mx-auto text-slate-300" />

              <h2 className="text-4xl font-bold mt-8">

                No Careers Available

              </h2>

              <p className="text-muted-foreground mt-4 text-lg">

                No healthcare opportunities available at the moment

              </p>

            </Card>

          </div>
        )
      }


      {/* ===================================== */}
      {/* JOBS */}
      {/* ===================================== */}

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {
              filteredJobs.map((job) => (

                <Card
                  key={job.id}
                  className="p-8 rounded-[32px] border-0 shadow-sm hover:shadow-xl transition-all duration-300"
                >

                  <div className="flex items-start justify-between gap-6">

                    <div>

                      <h2 className="text-3xl font-bold tracking-tight">

                        {job.title}

                      </h2>

                      <p className="text-blue-600 mt-3 font-medium text-lg">

                        {job.department}

                      </p>

                    </div>


                    <div
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        job.status === "OPEN"

                          ? "bg-emerald-100 text-emerald-700"

                          : "bg-slate-200 text-slate-700"
                      }`}
                    >

                      {job.status}

                    </div>

                  </div>


                  {/* DETAILS */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 text-muted-foreground">

                    <div className="flex items-center gap-3">

                      <MapPin className="h-5 w-5" />

                      <span>

                        {job.location}

                      </span>

                    </div>


                    <div className="flex items-center gap-3">

                      <Clock3 className="h-5 w-5" />

                      <span>

                        {job.employment_type}

                      </span>

                    </div>


                    <div className="flex items-center gap-3">

                      <Building2 className="h-5 w-5" />

                      <span>

                        Kano State Hospitals

                      </span>

                    </div>

                  </div>


                  {/* DESCRIPTION */}

                  <p className="text-muted-foreground mt-8 leading-relaxed line-clamp-4">

                    {job.description}

                  </p>


                  {/* ACTIONS */}

                  <div className="flex flex-wrap gap-4 mt-10">

                    <Link
                      href={`/careers/${job.id}`}
                    >

                      <Button className="rounded-2xl h-12 px-6">

                        View Details

                        <ChevronRight className="ml-2 h-4 w-4" />

                      </Button>

                    </Link>


                    <Link
                      href={`/careers/${job.id}/apply`}
                    >

                      <Button
                        variant="outline"
                        className="rounded-2xl h-12 px-6"
                      >

                        Apply Now

                      </Button>

                    </Link>

                  </div>

                </Card>
              ))
            }

          </div>

        </div>

      </section>

    </main>
  )
}