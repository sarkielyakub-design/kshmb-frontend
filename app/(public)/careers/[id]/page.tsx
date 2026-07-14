"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { useParams } from "next/navigation"

import {

  BriefcaseBusiness,

  MapPin,

  Clock3,

  Building2,

  ChevronLeft,

  ChevronRight,

  Loader2,

  CircleCheckBig,

  ShieldCheck,

  FileText,

} from "lucide-react"

import { Button } from "@/components/ui/button"

import { Card } from "@/components/ui/card"

import {

  getJobs,

} from "@/services/recruitment-service"

import { toast } from "sonner"


export default function CareerDetailsPage() {

  const params = useParams()

  const [job, setJob] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)


  // =====================================
  // FETCH JOB
  // =====================================

  useEffect(() => {

    const fetchJob =
      async () => {

        try {

          const jobs =
            await getJobs()

          const foundJob =
            jobs.find(
              (item: any) =>

                item.id ===
                Number(params.id)
            )

          setJob(foundJob)

        } catch (error) {

          toast.error(
            "Failed to load career details"
          )

        } finally {

          setLoading(false)
        }
      }

    fetchJob()

  }, [params.id])


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <Loader2 className="h-12 w-12 animate-spin text-slate-500" />

      </div>
    )
  }


  // =====================================
  // NOT FOUND
  // =====================================

  if (!job) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-4xl font-bold">

          Career Not Found

        </h1>

      </div>
    )
  }


  return (

    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="border-b bg-gradient-to-br from-blue-50 via-white to-cyan-50">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <Link href="/careers">

            <Button
              variant="outline"
              className="rounded-2xl mb-10"
            >

              <ChevronLeft className="mr-2 h-4 w-4" />

              Back To Careers

            </Button>

          </Link>


          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-5 py-3 rounded-full text-sm font-medium mb-8">

                <ShieldCheck className="h-4 w-4" />

                Healthcare Recruitment Opportunity

              </div>


              <h1 className="text-6xl font-black tracking-tight leading-tight">

                {job.title}

              </h1>


              <p className="text-blue-600 text-2xl font-semibold mt-5">

                {job.department}

              </p>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

                <div className="flex items-center gap-3">

                  <MapPin className="h-5 w-5 text-cyan-700" />

                  <span className="text-lg">

                    {job.location}

                  </span>

                </div>


                <div className="flex items-center gap-3">

                  <Clock3 className="h-5 w-5 text-cyan-700" />

                  <span className="text-lg">

                    {job.employment_type}

                  </span>

                </div>


                <div className="flex items-center gap-3">

                  <Building2 className="h-5 w-5 text-cyan-700" />

                  <span className="text-lg">

                    Kano State Hospitals

                  </span>

                </div>


                <div className="flex items-center gap-3">

                  <BriefcaseBusiness className="h-5 w-5 text-cyan-700" />

                  <span className="text-lg">

                    {job.status}

                  </span>

                </div>

              </div>


              <div className="flex flex-wrap gap-4 mt-12">

                <Link
                  href={`/careers/${job.id}/apply`}
                >

                  <Button
                    size="lg"
                    className="rounded-2xl h-14 px-8"
                  >

                    Apply Now

                    <ChevronRight className="ml-2 h-5 w-5" />

                  </Button>

                </Link>

              </div>

            </div>


            {/* RIGHT */}

            <div className="grid grid-cols-2 gap-6">

              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center mb-6">

                  <BriefcaseBusiness className="h-8 w-8 text-blue-700" />

                </div>

                <h2 className="text-3xl font-black">

                  OPEN

                </h2>

                <p className="text-muted-foreground mt-3">

                  Recruitment Status

                </p>

              </Card>


              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center mb-6">

                  <CircleCheckBig className="h-8 w-8 text-emerald-700" />

                </div>

                <h2 className="text-3xl font-black">

                  Verified

                </h2>

                <p className="text-muted-foreground mt-3">

                  Government Healthcare Role

                </p>

              </Card>

            </div>

          </div>

        </div>

      </section>


      {/* DETAILS */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

            {/* DESCRIPTION */}

            <Card className="rounded-[32px] border-0 shadow-sm p-10">

              <div className="flex items-center gap-4 mb-8">

                <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <FileText className="h-7 w-7 text-blue-700" />

                </div>

                <div>

                  <h2 className="text-4xl font-black tracking-tight">

                    Job Description

                  </h2>

                </div>

              </div>


              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">

                {job.description}

              </p>

            </Card>


            {/* REQUIREMENTS */}

            <Card className="rounded-[32px] border-0 shadow-sm p-10">

              <div className="flex items-center gap-4 mb-8">

                <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                  <CircleCheckBig className="h-7 w-7 text-emerald-700" />

                </div>

                <div>

                  <h2 className="text-4xl font-black tracking-tight">

                    Requirements

                  </h2>

                </div>

              </div>


              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">

                {job.requirements}

              </p>

            </Card>

          </div>

        </div>

      </section>

    </main>
  )
}