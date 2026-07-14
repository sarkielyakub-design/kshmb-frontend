"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { useParams } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {

  ArrowLeft,

  Mail,

  Phone,

  FileText,

  BriefcaseBusiness,

  MapPin,

  Clock3,

  Loader2,

  CircleCheckBig,

  CircleX,

  Download,

  Building2,

  Calendar,

  User,

} from "lucide-react"

import {

  getApplications,

  updateApplicationStatus,

} from "@/services/recruitment-service"

import { toast } from "sonner"


export default function RecruitmentApplicationDetailsPage() {

  const params = useParams()

  const [application, setApplication] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  const [updating, setUpdating] =
    useState(false)


  // =====================================
  // FETCH APPLICATION
  // =====================================

  const fetchApplication =
    async () => {

      try {

        const applications =
          await getApplications()

        const foundApplication =
          applications.find(
            (item: any) =>

              item.id ===
              Number(params.id)
          )

        setApplication(
          foundApplication
        )

      } catch (error) {

        toast.error(
          "Failed to load application"
        )

      } finally {

        setLoading(false)
      }
    }


  useEffect(() => {

    fetchApplication()

  }, [params.id])


  // =====================================
  // UPDATE STATUS
  // =====================================

  const handleStatusUpdate =
    async (
      status: string
    ) => {

      try {

        setUpdating(true)

        await updateApplicationStatus(

          Number(params.id),

          { status }
        )

        toast.success(
          `Application ${status}`
        )

        fetchApplication()

      } catch (error) {

        toast.error(
          "Failed to update application"
        )

      } finally {

        setUpdating(false)
      }
    }


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
  // NOT FOUND
  // =====================================

  if (!application) {

    return (

      <DashboardLayout>

        <Card className="p-16 rounded-3xl border-0 shadow-sm text-center">

          <FileText className="h-16 w-16 mx-auto text-slate-300" />

          <h2 className="text-3xl font-bold mt-6">

            Application Not Found

          </h2>

          <p className="text-muted-foreground mt-2">

            Recruitment application does not exist

          </p>

        </Card>

      </DashboardLayout>
    )
  }


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* ===================================== */}
        {/* HEADER */}
        {/* ===================================== */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          <div className="flex items-center gap-5">

            <Link
              href="/dashboard/recruitment/applications"
            >

              <Button
                variant="outline"
                size="icon"
                className="rounded-2xl h-14 w-14"
              >

                <ArrowLeft className="h-5 w-5" />

              </Button>

            </Link>


            <div>

              <h1 className="text-4xl font-bold tracking-tight">

                Application Details

              </h1>

              <p className="text-muted-foreground mt-2">

                Review healthcare recruitment application

              </p>

            </div>

          </div>


          <div
            className={`px-5 py-3 rounded-full text-sm font-semibold w-fit ${
              application.status === "APPROVED"

                ? "bg-emerald-100 text-emerald-700"

                : application.status === "REJECTED"

                ? "bg-red-100 text-red-700"

                : "bg-yellow-100 text-yellow-700"
            }`}
          >

            {application.status}

          </div>

        </div>


        {/* ===================================== */}
        {/* GRID */}
        {/* ===================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* ===================================== */}
          {/* LEFT */}
          {/* ===================================== */}

          <div className="xl:col-span-2 space-y-8">

            {/* CANDIDATE */}

            <Card className="rounded-[32px] border-0 shadow-sm p-8">

              <div className="flex items-center gap-5">

                <div className="h-20 w-20 rounded-3xl bg-blue-100 flex items-center justify-center">

                  <User className="h-10 w-10 text-blue-700" />

                </div>

                <div>

                  <h2 className="text-3xl font-bold">

                    {application.full_name}

                  </h2>

                  <p className="text-blue-600 mt-2 font-medium">

                    {
                      application.job
                        ?.title
                    }

                  </p>

                </div>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50">

                  <Mail className="h-6 w-6 text-slate-600" />

                  <div>

                    <p className="text-sm text-muted-foreground">

                      Email

                    </p>

                    <p className="font-medium">

                      {application.email}

                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50">

                  <Phone className="h-6 w-6 text-slate-600" />

                  <div>

                    <p className="text-sm text-muted-foreground">

                      Phone

                    </p>

                    <p className="font-medium">

                      {application.phone}

                    </p>

                  </div>

                </div>

              </div>

            </Card>


            {/* JOB */}

            <Card className="rounded-[32px] border-0 shadow-sm p-8">

              <h2 className="text-2xl font-bold">

                Recruitment Position

              </h2>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50">

                  <BriefcaseBusiness className="h-6 w-6 text-blue-700" />

                  <div>

                    <p className="text-sm text-muted-foreground">

                      Position

                    </p>

                    <p className="font-medium">

                      {
                        application.job
                          ?.title
                      }

                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50">

                  <Building2 className="h-6 w-6 text-emerald-700" />

                  <div>

                    <p className="text-sm text-muted-foreground">

                      Department

                    </p>

                    <p className="font-medium">

                      {
                        application.job
                          ?.department
                      }

                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50">

                  <MapPin className="h-6 w-6 text-orange-700" />

                  <div>

                    <p className="text-sm text-muted-foreground">

                      Location

                    </p>

                    <p className="font-medium">

                      {
                        application.job
                          ?.location
                      }

                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50">

                  <Clock3 className="h-6 w-6 text-purple-700" />

                  <div>

                    <p className="text-sm text-muted-foreground">

                      Employment

                    </p>

                    <p className="font-medium">

                      {
                        application.job
                          ?.employment_type
                      }

                    </p>

                  </div>

                </div>

              </div>

            </Card>

          </div>


          {/* ===================================== */}
          {/* RIGHT */}
          {/* ===================================== */}

          <div className="space-y-8">

            {/* CV */}

            <Card className="rounded-[32px] border-0 shadow-sm p-8">

              <h2 className="text-2xl font-bold">

                Candidate CV

              </h2>

              <p className="text-muted-foreground mt-2">

                Review applicant resume and qualifications

              </p>


              <a
                href={application.cv_url}
                target="_blank"
              >

                <Button className="w-full mt-8 rounded-xl h-12">

                  <Download className="mr-2 h-5 w-5" />

                  Download CV

                </Button>

              </a>

            </Card>


            {/* ACTIONS */}

            <Card className="rounded-[32px] border-0 shadow-sm p-8">

              <h2 className="text-2xl font-bold">

                Recruitment Actions

              </h2>

              <p className="text-muted-foreground mt-2">

                Approve or reject application

              </p>


              <div className="space-y-4 mt-8">

                <Button
                  disabled={updating}
                  onClick={() =>
                    handleStatusUpdate(
                      "APPROVED"
                    )
                  }
                  className="w-full rounded-xl h-12 bg-emerald-600 hover:bg-emerald-700"
                >

                  {
                    updating ? (

                      <Loader2 className="h-5 w-5 animate-spin" />

                    ) : (

                      <>
                        <CircleCheckBig className="mr-2 h-5 w-5" />

                        Approve Candidate
                      </>
                    )
                  }

                </Button>


                <Button
                  disabled={updating}
                  onClick={() =>
                    handleStatusUpdate(
                      "REJECTED"
                    )
                  }
                  variant="destructive"
                  className="w-full rounded-xl h-12"
                >

                  <CircleX className="mr-2 h-5 w-5" />

                  Reject Candidate

                </Button>


                <Button
                  variant="outline"
                  className="w-full rounded-xl h-12"
                >

                  <Calendar className="mr-2 h-5 w-5" />

                  Schedule Interview

                </Button>

              </div>

            </Card>

          </div>

        </div>

      </div>

    </DashboardLayout>
  )
}