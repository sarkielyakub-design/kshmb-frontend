"use client"

import { useEffect, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {

  Search,

  Plus,

  Stethoscope,

  Phone,

  Mail,

  Building2,

  Trash2,

  Loader2,

  UserRound,

} from "lucide-react"

import {

  getDoctors,

  deleteDoctor,

  Doctor,

} from "@/services/doctor-service"

import {

  getHospitals,

  Hospital,

} from "@/services/hospital-service"

import { toast } from "sonner"

import Link from "next/link"


export default function DoctorsPage() {

  const [search, setSearch] =
    useState("")

  const [loading, setLoading] =
    useState(true)

  const [doctors, setDoctors] =
    useState<Doctor[]>([])

  const [hospitals, setHospitals] =
    useState<Hospital[]>([])


  // =====================================
  // FETCH DATA
  // =====================================

  const fetchDoctors =
    async () => {

      try {

        setLoading(true)

        const doctorsData =
          await getDoctors()

        const hospitalsData =
          await getHospitals()

        setDoctors(doctorsData)

        setHospitals(hospitalsData)

      } catch {

        toast.error(
          "Failed to load doctors"
        )

      } finally {

        setLoading(false)
      }
    }


  useEffect(() => {

    fetchDoctors()

  }, [])


  // =====================================
  // DELETE DOCTOR
  // =====================================

  const handleDelete =
    async (doctorId: number) => {

      try {

        await deleteDoctor(
          doctorId
        )

        toast.success(
          "Doctor deleted successfully"
        )

        fetchDoctors()

      } catch {

        toast.error(
          "Failed to delete doctor"
        )
      }
    }


  // =====================================
  // FILTER DOCTORS
  // =====================================

  const filteredDoctors =
    doctors.filter((doctor) =>

      doctor.full_name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )


  // =====================================
  // GET HOSPITAL
  // =====================================

  const getHospitalName =
    (hospitalId: number) => {

      const hospital =
        hospitals.find(
          (item) =>
            item.id === hospitalId
        )

      return hospital?.name ||
        "Unknown Hospital"
    }


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <h1 className="text-4xl font-black tracking-tight">

              Doctors Management

            </h1>

            <p className="text-muted-foreground mt-2 text-lg">

              Manage healthcare professionals and specialists

            </p>

          </div>


          <Link
            href="/dashboard/doctors/create"
          >

            <Button className="rounded-2xl h-12 px-6">

              <Plus className="mr-2 h-5 w-5" />

              Add Doctor

            </Button>

          </Link>

        </div>


        {/* SEARCH */}

        <Card className="p-6 rounded-3xl border-0 shadow-sm">

          <div className="relative">

            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

            <Input
              placeholder="Search doctors..."
              className="pl-12 h-12 rounded-2xl"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

        </Card>


        {/* LOADING */}

        {
          loading && (

            <div className="min-h-[40vh] flex items-center justify-center">

              <Loader2 className="h-10 w-10 animate-spin text-slate-500" />

            </div>
          )
        }


        {/* EMPTY */}

        {
          !loading &&
          filteredDoctors.length === 0 && (

            <Card className="rounded-3xl border-0 shadow-sm p-16 text-center">

              <UserRound className="h-16 w-16 mx-auto text-slate-400 mb-6" />

              <h2 className="text-3xl font-bold">

                No Doctors Found

              </h2>

              <p className="text-muted-foreground mt-3">

                No doctors available in the system

              </p>

            </Card>
          )
        }


        {/* DOCTORS GRID */}

        {
          !loading && (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {
                filteredDoctors.map((doctor) => (

                  <Card
                    key={doctor.id}
                    className="p-7 rounded-[28px] border-0 shadow-sm hover:shadow-2xl transition-all duration-300"
                  >

                    {/* HEADER */}

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h2 className="text-2xl font-bold leading-tight">

                          {doctor.full_name}

                        </h2>

                        <p className="text-blue-600 mt-2 font-semibold">

                          {doctor.specialty}

                        </p>

                      </div>


                      <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">

                        <Stethoscope className="h-7 w-7 text-slate-700" />

                      </div>

                    </div>


                    {/* DETAILS */}

                    <div className="mt-8 space-y-5">

                      <div className="flex items-center gap-3 text-muted-foreground">

                        <Phone className="h-5 w-5" />

                        <span>

                          {doctor.phone}

                        </span>

                      </div>


                      <div className="flex items-center gap-3 text-muted-foreground">

                        <Mail className="h-5 w-5" />

                        <span className="truncate">

                          {doctor.email}

                        </span>

                      </div>


                      <div className="flex items-center gap-3 text-muted-foreground">

                        <Building2 className="h-5 w-5" />

                        <span>

                          {
                            getHospitalName(
                              doctor.hospital_id
                            )
                          }

                        </span>

                      </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="mt-10 flex gap-3">

                      <Link
                        href={`/dashboard/doctors/${doctor.id}`}
                        className="flex-1"
                      >

                        <Button
                          variant="outline"
                          className="w-full rounded-2xl"
                        >

                          View

                        </Button>

                      </Link>


                      <Link
                        href={`/dashboard/doctors/${doctor.id}/edit`}
                        className="flex-1"
                      >

                        <Button className="w-full rounded-2xl">

                          Manage

                        </Button>

                      </Link>


                      <Button
                        variant="destructive"
                        size="icon"
                        className="rounded-2xl"
                        onClick={() =>
                          handleDelete(
                            doctor.id
                          )
                        }
                      >

                        <Trash2 className="h-5 w-5" />

                      </Button>

                    </div>

                  </Card>
                ))
              }

            </div>
          )
        }

      </div>

    </DashboardLayout>
  )
}