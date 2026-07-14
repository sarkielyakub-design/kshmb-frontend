"use client"

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {

  BriefcaseBusiness,

  MapPin,

  Clock3,

  Building2,

  Wallet,

  CalendarDays,

  Loader2,

  BadgeCheck,

  FileText,

  Users,

  ChevronRight,

} from "lucide-react"

import Link from "next/link"

import {

  getJobById,

  Job,

} from "@/services/recruitment-service"

import { toast } from "sonner"


export default function RecruitmentDetailsPage() {

  const params = useParams()

  const [job, setJob] =
    useState<Job | null>(null)

  const [loading, setLoading] =
    useState(true)


  // =====================================
  // FETCH JOB
  // =====================================

  const fetchJob = async () => {

    try {

      const data =
        await getJobById(
          Number(params.id)
        )

      setJob(data)

    } catch (error) {

      toast.error(
        "Failed to load recruitment job"
      )

    } finally {

      setLoading(false)
    }
  }


  useEffect(() => {

    if (params.id) {

      fetchJob()
    }

  }, [params.id])


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex items-center justify-center py-32">

          <Loader2 className="h-12 w-12 animate-spin text-slate-500" />

        </div>

      </DashboardLayout>
    )
  }


  // =====================================
  // NO JOB
  // =====================================

  if (!job) {

    return (

      <DashboardLayout>

        <Card className="rounded-3xl border-0 shadow-sm p-20 text-center">

          <BriefcaseBusiness className="h-20 w-20 text-slate-300 mx-auto" />

          <h2 className="text-3xl font-bold mt-8">

            Recruitment Job Not Found

          </h2>

        </Card>

      </DashboardLayout>
    )
  }


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* =====================================
            HERO
        ===================================== */}

        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 p-10 text-white">

          <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]" />

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-start xl:justify-between gap-10">

            {/* LEFT */}

            <div className="max-w-4xl">

              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 px-5 py-3 rounded-full text-sm font-medium">

                <BadgeCheck className="h-4 w-4 text-cyan-300" />

                Healthcare Career Opportunity

              </div>


              <h1 className="text-5xl font-black tracking-tight mt-8 leading-tight">

                {job.title}

              </h1>


              <p className="text-cyan-300 text-xl font-semibold mt-5">

                {job.department}

              </p>


              <p className="text-slate-300 text-lg mt-8 leading-relaxed">

                {job.description}

              </p>


              {/* DETAILS */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">

                <div className="flex items-center gap-4">

                  <MapPin className="h-5 w-5 text-cyan-300" />

                  <span>

                    {job.location}

                  </span>

                </div>


                <div className="flex items-center gap-4">

                  <Clock3 className="h-5 w-5 text-cyan-300" />

                  <span>

                    {job.employment_type}

                  </span>

                </div>


                {
                  job.hospital_name && (

                    <div className="flex items-center gap-4">

                      <Building2 className="h-5 w-5 text-cyan-300" />

                      <span>

                        {job.hospital_name}

                      </span>

                    </div>
                  )
                }


                {
                  job.salary_range && (

                    <div className="flex items-center gap-4">

                      <Wallet className="h-5 w-5 text-cyan-300" />

                      <span>

                        {job.salary_range}

                      </span>

                    </div>
                  )
                }



              </div>


              {/* ACTIONS */}

              <div className="flex flex-wrap gap-4 mt-12">

                <Link
                  href={`/dashboard/recruitment/${job.id}/applications`}
                >

                  <Button className="rounded-2xl h-12 px-6 bg-white text-slate-900 hover:bg-slate-200">

                    <Users className="mr-2 h-5 w-5" />

                    Applications

                  </Button>

                </Link>


                <Button
                  variant="outline"
                  className="rounded-2xl h-12 px-6 border-white/20 bg-white/10 text-white hover:bg-white/20"
                >

                  Edit Job

                </Button>


                <Button
                  variant="secondary"
                  className="rounded-2xl h-12 px-6"
                >

                  Close Job

                </Button>

              </div>

            </div>


            {/* RIGHT */}

            <div className="grid grid-cols-1 gap-5 min-w-[320px]">

              <Card className="rounded-3xl border-0 bg-white/10 backdrop-blur-xl text-white p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-300">

                      Status

                    </p>

                    <h2 className="text-3xl font-black mt-3">

                      {job.status}

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

                      Employment

                    </p>

                    <h2 className="text-2xl font-black mt-3 leading-tight">

                      {job.employment_type}

                    </h2>

                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">

                    <Clock3 className="h-7 w-7 text-emerald-300" />

                  </div>

                </div>

              </Card>

            </div>

          </div>

        </div>


        {/* =====================================
            REQUIREMENTS
        ===================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* REQUIREMENTS */}

          <Card className="rounded-[32px] border-0 shadow-sm p-10">

            <div className="flex items-center gap-4">

              <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                <FileText className="h-7 w-7 text-blue-700" />

              </div>

              <div>

                <h2 className="text-3xl font-bold">

                  Requirements

                </h2>

                <p className="text-muted-foreground mt-1">

                  Required qualifications and skills

                </p>

              </div>

            </div>


            <div className="mt-10 whitespace-pre-wrap leading-relaxed text-muted-foreground">

              {job.requirements}

            </div>

          </Card>


          {/* RESPONSIBILITIES */}

          <Card className="rounded-[32px] border-0 shadow-sm p-10">

            <div className="flex items-center gap-4">

              <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                <ChevronRight className="h-7 w-7 text-emerald-700" />

              </div>

              <div>

                <h2 className="text-3xl font-bold">

                  Responsibilities

                </h2>

                <p className="text-muted-foreground mt-1">

                  Role responsibilities and expectations

                </p>

              </div>

            </div>


            <div className="mt-10 whitespace-pre-wrap leading-relaxed text-muted-foreground">

              {"Healthcare operations, patient support, departmental collaboration, and medical service delivery."}

            </div>

          </Card>

        </div>

      </div>

    </DashboardLayout>
  )
}