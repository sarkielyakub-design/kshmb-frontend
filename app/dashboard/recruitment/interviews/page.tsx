"use client"

import { useEffect, useMemo, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {

  Calendar,

  Clock3,

  Video,

  Plus,

  Search,

  Mail,

  User,

  Loader2,

  MapPin,

  CircleCheckBig,

  Building2,

  BriefcaseBusiness,

} from "lucide-react"

import { toast } from "sonner"

import {

  getApplications,

} from "@/services/recruitment-service"


export default function InterviewsPage() {

  const [applications, setApplications] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")


  // =====================================
  // FETCH APPLICATIONS
  // =====================================

  const fetchApplications =
    async () => {

      try {

        const data =
          await getApplications()

        // =====================================
        // ONLY APPROVED APPLICATIONS
        // =====================================

        const approvedApplications =
          data.filter(
            (application: any) =>

              application.status ===
              "APPROVED"
          )

        setApplications(
          approvedApplications
        )

      } catch (error) {

        toast.error(
          "Failed to load interviews"
        )

      } finally {

        setLoading(false)
      }
    }


  useEffect(() => {

    fetchApplications()

  }, [])


  // =====================================
  // FILTER
  // =====================================

  const filteredApplications =
    useMemo(() => {

      return applications.filter(
        (application) =>

          application.full_name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      )

    }, [applications, search])


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* ===================================== */}
        {/* HEADER */}
        {/* ===================================== */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          <div>

            <div className="flex items-center gap-4">

              <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center">

                <Video className="h-8 w-8 text-blue-700" />

              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight">

                  Interview Management

                </h1>

                <p className="text-muted-foreground mt-2">

                  Schedule and manage healthcare recruitment interviews

                </p>

              </div>

            </div>

          </div>


          <Button className="rounded-xl h-12 px-6">

            <Plus className="mr-2 h-5 w-5" />

            Schedule Interview

          </Button>

        </div>


        {/* ===================================== */}
        {/* SEARCH */}
        {/* ===================================== */}

        <Card className="p-6 rounded-3xl border-0 shadow-sm">

          <div className="relative">

            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

            <Input
              placeholder="Search candidates..."
              className="pl-12 h-12 rounded-xl"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

        </Card>


        {/* ===================================== */}
        {/* LOADING */}
        {/* ===================================== */}

        {
          loading && (

            <div className="flex items-center justify-center py-20">

              <Loader2 className="h-10 w-10 animate-spin text-slate-500" />

            </div>
          )
        }


        {/* ===================================== */}
        {/* EMPTY */}
        {/* ===================================== */}

        {
          !loading &&
          filteredApplications.length === 0 && (

            <Card className="p-16 rounded-3xl border-0 shadow-sm text-center">

              <Video className="h-16 w-16 mx-auto text-slate-300" />

              <h2 className="text-2xl font-semibold mt-6">

                No Interviews Scheduled

              </h2>

              <p className="text-muted-foreground mt-2">

                Approved applications will appear here

              </p>

            </Card>
          )
        }


        {/* ===================================== */}
        {/* INTERVIEWS */}
        {/* ===================================== */}

        <div className="space-y-6">

          {
            filteredApplications.map(
              (application: any) => (

                <Card
                  key={application.id}
                  className="p-8 rounded-3xl border-0 shadow-sm hover:shadow-lg transition"
                >

                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

                    {/* LEFT */}

                    <div className="space-y-6 flex-1">

                      <div>

                        <div className="flex items-center gap-4">

                          <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                            <User className="h-7 w-7 text-blue-700" />

                          </div>

                          <div>

                            <h2 className="text-2xl font-semibold">

                              {application.full_name}

                            </h2>

                            <p className="text-blue-600 mt-1 font-medium">

                              {
                                application.job
                                  ?.title
                              }

                            </p>

                          </div>

                        </div>

                      </div>


                      {/* DETAILS */}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-muted-foreground">

                        <div className="flex items-center gap-3">

                          <Mail className="h-5 w-5" />

                          <span>

                            {application.email}

                          </span>

                        </div>


                        <div className="flex items-center gap-3">

                          <Clock3 className="h-5 w-5" />

                          <span>

                            Pending Interview Schedule

                          </span>

                        </div>


                        <div className="flex items-center gap-3">

                          <Building2 className="h-5 w-5" />

                          <span>

                            {
                              application.job
                                ?.department
                            }

                          </span>

                        </div>


                        <div className="flex items-center gap-3">

                          <MapPin className="h-5 w-5" />

                          <span>

                            {
                              application.job
                                ?.location
                            }

                          </span>

                        </div>


                        <div className="flex items-center gap-3">

                          <BriefcaseBusiness className="h-5 w-5" />

                          <span>

                            {
                              application.job
                                ?.employment_type
                            }

                          </span>

                        </div>


                        <div className="flex items-center gap-3">

                          <Video className="h-5 w-5" />

                          <span>

                            Virtual / Physical

                          </span>

                        </div>

                      </div>

                    </div>


                    {/* RIGHT */}

                    <div className="flex flex-wrap items-center gap-4">

                      {/* STATUS */}

                      <div className="px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">

                        APPROVED

                      </div>


                      {/* CV */}

                      <a
                        href={
                          application.cv_url
                        }
                        target="_blank"
                      >

                        <Button
                          variant="outline"
                          className="rounded-xl"
                        >

                          View CV

                        </Button>

                      </a>


                      {/* SCHEDULE */}

                      <Button className="rounded-xl">

                        <Calendar className="mr-2 h-4 w-4" />

                        Schedule

                      </Button>


                      {/* JOIN */}

                      <Button
                        variant="secondary"
                        className="rounded-xl"
                      >

                        <Video className="mr-2 h-4 w-4" />

                        Join

                      </Button>


                      {/* COMPLETE */}

                      <Button
                        variant="outline"
                        className="rounded-xl border-emerald-200 text-emerald-700"
                      >

                        <CircleCheckBig className="mr-2 h-4 w-4" />

                        Complete

                      </Button>

                    </div>

                  </div>

                </Card>
              )
            )
          }

        </div>

      </div>

    </DashboardLayout>
  )
}