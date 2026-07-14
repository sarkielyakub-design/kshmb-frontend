"use client"

import { useEffect, useMemo, useState } from "react"

import Link from "next/link"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {

  Plus,

  Search,

  User,

  Phone,

  HeartPulse,

  Loader2,

  Eye,

  ShieldPlus,

  Calendar,

} from "lucide-react"

import {

  getPatients,

} from "@/services/patient-service"

import { toast } from "sonner"


export default function PatientsPage() {

  const [patients, setPatients] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")


  // =====================================
  // FETCH PATIENTS
  // =====================================

  const fetchPatients = async () => {

    try {

      const data =
        await getPatients()

      setPatients(data)

    } catch (error) {

      toast.error(
        "Failed to load patients"
      )

    } finally {

      setLoading(false)
    }
  }


  useEffect(() => {

    fetchPatients()

  }, [])


  // =====================================
  // FILTER PATIENTS
  // =====================================

  const filteredPatients =
    useMemo(() => {

      return patients.filter((patient) =>

        patient.full_name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      )

    }, [patients, search])


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          <div>

            <h1 className="text-4xl font-bold">

              Patients

            </h1>

            <p className="text-muted-foreground mt-2">

              Electronic Medical Records System

            </p>

          </div>


          <Link
            href="/dashboard/patients/create"
          >

            <Button className="rounded-xl h-12 px-6">

              <Plus className="mr-2 h-5 w-5" />

              Register Patient

            </Button>

          </Link>

        </div>


        {/* SEARCH */}

        <Card className="p-6 rounded-3xl border-0 shadow-sm">

          <div className="relative">

            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

            <Input
              placeholder="Search patients..."
              className="pl-12 h-12 rounded-xl"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </Card>


        {/* LOADING */}

        {
          loading && (

            <div className="flex items-center justify-center py-20">

              <Loader2 className="h-10 w-10 animate-spin text-slate-500" />

            </div>
          )
        }


        {/* EMPTY */}

        {
          !loading &&
          filteredPatients.length === 0 && (

            <Card className="p-16 rounded-3xl border-0 shadow-sm text-center">

              <HeartPulse className="h-16 w-16 mx-auto text-slate-300" />

              <h2 className="text-2xl font-semibold mt-6">

                No Patients Found

              </h2>

              <p className="text-muted-foreground mt-2">

                No patient records available

              </p>

            </Card>
          )
        }


        {/* PATIENT GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            filteredPatients.map((patient) => (

              <Card
                key={patient.id}
                className="p-6 rounded-3xl border-0 shadow-sm hover:shadow-xl transition-all duration-300"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="text-2xl font-semibold">

                      {patient.full_name}

                    </h2>

                    <p className="text-muted-foreground mt-1">

                      {patient.gender}
                    </p>

                    <p className="text-blue-600 mt-2 text-sm font-medium">

                      {patient.patient_number}
                    </p>

                  </div>


                  <div className="h-14 w-14 rounded-2xl bg-red-50 flex items-center justify-center">

                    <HeartPulse className="h-7 w-7 text-red-600" />

                  </div>

                </div>


                <div className="mt-8 space-y-4">

                  <div className="flex items-center gap-3">

                    <ShieldPlus className="h-5 w-5 text-muted-foreground" />

                    <span>

                      Blood Group:
                      {" "}
                      <strong>
                        {patient.blood_group || "N/A"}
                      </strong>

                    </span>

                  </div>


                  <div className="flex items-center gap-3">

                    <Calendar className="h-5 w-5 text-muted-foreground" />

                    <span>

                      Age:
                      {" "}
                      <strong>
                        {patient.age || "N/A"}
                      </strong>

                    </span>

                  </div>


                  <div className="flex items-center gap-3">

                    <Phone className="h-5 w-5 text-muted-foreground" />

                    <span>

                      {patient.phone}

                    </span>

                  </div>


                  <div className="flex items-center gap-3">

                    <User className="h-5 w-5 text-muted-foreground" />

                    <span>

                      {patient.emergency_contact || "No Emergency Contact"}

                    </span>

                  </div>

                </div>


                <div className="mt-8 flex gap-3">

                  <Link
                    href={`/dashboard/patients/${patient.id}`}
                    className="flex-1"
                  >

                    <Button
                      variant="outline"
                      className="w-full rounded-xl"
                    >

                      <Eye className="mr-2 h-4 w-4" />

                      View EMR

                    </Button>

                  </Link>


                  <Link
                    href={`/dashboard/patients/${patient.id}`}
                    className="flex-1"
                  >

                    <Button className="w-full rounded-xl">

                      Manage

                    </Button>

                  </Link>

                </div>

              </Card>
            ))
          }

        </div>

      </div>

    </DashboardLayout>
  )
}