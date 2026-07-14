"use client"

import { useEffect, useMemo, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {

  FileText,

  Mail,

  Phone,

  CircleCheckBig,

  CircleX,

  Clock3,

  Download,

  Loader2,

  Search,

  BriefcaseBusiness,

  User2,

  BadgeCheck,

  CalendarDays,

  Filter,

} from "lucide-react"

import {

  getApplications,

  updateApplicationStatus,

  JobApplication,

} from "@/services/recruitment-service"

import { toast } from "sonner"


export default function ApplicationsPage() {

  const [applications, setApplications] =
    useState<JobApplication[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")

  const [statusFilter, setStatusFilter] =
    useState("ALL")


  // =====================================
  // FETCH APPLICATIONS
  // =====================================

  const fetchApplications = async () => {

    try {

      const data =
        await getApplications()

      setApplications(data)

    } catch (error) {

      toast.error(
        "Failed to load applications"
      )

    } finally {

      setLoading(false)
    }
  }


  useEffect(() => {

    fetchApplications()

  }, [])


  // =====================================
  // UPDATE STATUS
  // =====================================

  const handleStatusUpdate = async (

    applicationId: number,

    status: string

  ) => {

    try {

      await updateApplicationStatus(

        applicationId,

        { status }
      )

      toast.success(
        `Application ${status}`
      )

      fetchApplications()

    } catch (error) {

      toast.error(
        "Failed to update status"
      )
    }
  }


  // =====================================
  // FILTERED APPLICATIONS
  // =====================================

  const filteredApplications =
    useMemo(() => {

      return applications.filter(
        (application) => {

          const matchesSearch =

            application.full_name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

          const matchesStatus =

            statusFilter === "ALL"

              ? true

              : application.status ===
                statusFilter

          return (
            matchesSearch &&
            matchesStatus
          )
        }
      )

    }, [
      applications,
      search,
      statusFilter
    ])


  // =====================================
  // ANALYTICS
  // =====================================

  const analytics = useMemo(() => {

    return {

      total:
        applications.length,

      pending:
        applications.filter(
          (a) =>
            a.status === "PENDING"
        ).length,

      approved:
        applications.filter(
          (a) =>
            a.status === "APPROVED"
        ).length,

      rejected:
        applications.filter(
          (a) =>
            a.status === "REJECTED"
        ).length,
    }

  }, [applications])


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* =====================================
            HERO
        ===================================== */}

        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 p-10 text-white">

          <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]" />

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 px-5 py-3 rounded-full text-sm font-medium">

                <BadgeCheck className="h-4 w-4 text-cyan-300" />

                Healthcare Recruitment Applications

              </div>


              <h1 className="text-5xl font-black tracking-tight mt-8">

                Recruitment Applications

              </h1>


              <p className="text-slate-300 text-lg mt-6 leading-relaxed">

                Review applicants, approve healthcare candidates,
                schedule interviews, and manage the recruitment
                workflow for healthcare institutions.

              </p>

            </div>


            {/* ANALYTICS */}

            <div className="grid grid-cols-2 gap-5 min-w-[320px]">

              <Card className="rounded-3xl border-0 bg-white/10 backdrop-blur-xl text-white p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-300">

                      Total

                    </p>

                    <h2 className="text-4xl font-black mt-2">

                      {analytics.total}

                    </h2>

                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">

                    <FileText className="h-7 w-7 text-cyan-300" />

                  </div>

                </div>

              </Card>


              <Card className="rounded-3xl border-0 bg-white/10 backdrop-blur-xl text-white p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-300">

                      Pending

                    </p>

                    <h2 className="text-4xl font-black mt-2">

                      {analytics.pending}

                    </h2>

                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center">

                    <Clock3 className="h-7 w-7 text-yellow-300" />

                  </div>

                </div>

              </Card>


              <Card className="rounded-3xl border-0 bg-white/10 backdrop-blur-xl text-white p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-300">

                      Approved

                    </p>

                    <h2 className="text-4xl font-black mt-2">

                      {analytics.approved}

                    </h2>

                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">

                    <CircleCheckBig className="h-7 w-7 text-emerald-300" />

                  </div>

                </div>

              </Card>


              <Card className="rounded-3xl border-0 bg-white/10 backdrop-blur-xl text-white p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-300">

                      Rejected

                    </p>

                    <h2 className="text-4xl font-black mt-2">

                      {analytics.rejected}

                    </h2>

                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-red-500/20 flex items-center justify-center">

                    <CircleX className="h-7 w-7 text-red-300" />

                  </div>

                </div>

              </Card>

            </div>

          </div>

        </div>


        {/* =====================================
            SEARCH + FILTER
        ===================================== */}

        <Card className="p-6 rounded-3xl border-0 shadow-sm">

          <div className="flex flex-col lg:flex-row gap-4">

            <div className="relative flex-1">

              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

              <Input
                placeholder="Search applicants..."
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

                <option value="PENDING">

                  Pending

                </option>

                <option value="APPROVED">

                  Approved

                </option>

                <option value="REJECTED">

                  Rejected

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
          filteredApplications.length === 0 && (

            <Card className="rounded-3xl border-0 shadow-sm p-20 text-center">

              <FileText className="h-20 w-20 text-slate-300 mx-auto" />

              <h2 className="text-3xl font-bold mt-8">

                No Applications Found

              </h2>

              <p className="text-muted-foreground mt-3">

                No recruitment applications available yet.

              </p>

            </Card>
          )
        }


        {/* =====================================
            APPLICATIONS
        ===================================== */}

        <div className="space-y-6">

          {
            filteredApplications.map((application) => (

              <Card
                key={application.id}
                className="rounded-[32px] border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >

                <div className="p-8">

                  <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">

                    {/* LEFT */}

                    <div className="space-y-6">

                      <div className="flex items-start gap-5">

                        <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center shrink-0">

                          <User2 className="h-8 w-8 text-blue-700" />

                        </div>


                        <div>

                          <h2 className="text-3xl font-bold tracking-tight">

                            {application.full_name}

                          </h2>


                          <div className="flex items-center gap-2 text-blue-600 font-medium mt-3">

                            <BriefcaseBusiness className="h-4 w-4" />

                            <span>

                              {
                                application.job
                                  ?.title ||
                                "Healthcare Position"
                              }

                            </span>

                          </div>

                        </div>

                      </div>


                      {/* CONTACT */}

                      <div className="flex flex-wrap gap-6 text-muted-foreground">

                        <div className="flex items-center gap-3">

                          <Mail className="h-5 w-5" />

                          <span>

                            {application.email}

                          </span>

                        </div>


                        <div className="flex items-center gap-3">

                          <Phone className="h-5 w-5" />

                          <span>

                            {application.phone}

                          </span>

                        </div>

                      </div>


                      {/* EXTRA DETAILS */}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {
                          application.qualification && (

                            <div className="rounded-2xl bg-slate-100 p-5">

                              <p className="text-sm text-muted-foreground">

                                Qualification

                              </p>

                              <h3 className="font-semibold mt-2">

                                {application.qualification}

                              </h3>

                            </div>
                          )
                        }


                        {
                          application.years_of_experience && (

                            <div className="rounded-2xl bg-slate-100 p-5">

                              <p className="text-sm text-muted-foreground">

                                Experience

                              </p>

                              <h3 className="font-semibold mt-2">

                                {
                                  application.years_of_experience
                                }

                              </h3>

                            </div>
                          )
                        }

                      </div>

                    </div>


                    {/* RIGHT */}

                    <div className="flex flex-col gap-4 min-w-[260px]">

                      {/* STATUS */}

                      <div
                        className={`px-5 py-3 rounded-2xl text-sm font-semibold text-center ${
                          application.status === "APPROVED"
                            ? "bg-emerald-100 text-emerald-700"
                            : application.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {application.status}

                      </div>


                      {/* CV */}

                      <a
                        href={
                          application.cv_url ||
                          "#"
                        }
                        target="_blank"
                      >

                        <Button
                          variant="outline"
                          className="rounded-2xl w-full h-12"
                        >

                          <Download className="mr-2 h-4 w-4" />

                          Download CV

                        </Button>

                      </a>


                      {/* APPROVE */}

                      <Button
                        className="rounded-2xl h-12 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() =>
                          handleStatusUpdate(
                            application.id,
                            "APPROVED"
                          )
                        }
                      >

                        <CircleCheckBig className="mr-2 h-4 w-4" />

                        Approve

                      </Button>


                      {/* REJECT */}

                      <Button
                        variant="destructive"
                        className="rounded-2xl h-12"
                        onClick={() =>
                          handleStatusUpdate(
                            application.id,
                            "REJECTED"
                          )
                        }
                      >

                        <CircleX className="mr-2 h-4 w-4" />

                        Reject

                      </Button>


                      {/* INTERVIEW */}

                      <Button
                        variant="secondary"
                        className="rounded-2xl h-12"
                      >

                        <CalendarDays className="mr-2 h-4 w-4" />

                        Schedule Interview

                      </Button>

                    </div>

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