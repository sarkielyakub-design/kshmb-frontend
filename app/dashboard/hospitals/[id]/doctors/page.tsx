"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { useParams } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
  Plus,
  Stethoscope,
  Phone,
  Mail,
  Building2,
  Search,
} from "lucide-react"

import { Input } from "@/components/ui/input"

import {
  getDoctors,
} from "@/services/hospital-service"

export default function DoctorsPage() {

  const params = useParams()

  const [doctors, setDoctors] =
    useState<any[]>([])

  const [search, setSearch] =
    useState("")

  useEffect(() => {

    const fetchDoctors =
      async () => {

        const data =
          await getDoctors(
            Number(params.id)
          )

        setDoctors(data)
      }

    fetchDoctors()

  }, [params.id])

  const filteredDoctors =
    doctors.filter((doctor) =>
      doctor.full_name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )

  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* =====================================
        HEADER
        ===================================== */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <h1 className="text-5xl font-black tracking-tight text-slate-900">

              Hospital Doctors

            </h1>

            <p className="text-slate-500 mt-3 text-lg">

              Manage doctors and medical professionals

            </p>

          </div>

          <Link
            href={`/dashboard/hospitals/${params.id}/doctors/create`}
          >

            <Button className="rounded-2xl h-12 px-6 bg-blue-700 hover:bg-blue-800">

              <Plus className="mr-2 h-4 w-4" />

              Create Doctor

            </Button>

          </Link>

        </div>

        {/* =====================================
        SEARCH
        ===================================== */}

        <Card className="rounded-3xl p-6 border border-slate-200 shadow-sm">

          <div className="relative">

            <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

            <Input
              placeholder="Search doctors..."
              className="pl-12 h-14 rounded-2xl"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </Card>

        {/* =====================================
        DOCTORS GRID
        ===================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            filteredDoctors.map((doctor) => (

              <Card
                key={doctor.id}
                className="rounded-[30px] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >

                <div className="h-2 bg-gradient-to-r from-blue-700 to-cyan-500" />

                <div className="p-8">

                  <div className="h-16 w-16 rounded-3xl bg-blue-50 flex items-center justify-center mb-6">

                    <Stethoscope className="h-8 w-8 text-blue-700" />

                  </div>

                  <h2 className="text-2xl font-black text-slate-900">

                    {doctor.full_name}

                  </h2>

                  <p className="text-blue-700 font-semibold mt-2">

                    {doctor.specialty}

                  </p>

                  <div className="space-y-4 mt-8">

                    <div className="flex items-center gap-3 text-slate-600">

                      <Phone className="h-5 w-5 text-slate-400" />

                      <span>
                        {doctor.phone}
                      </span>

                    </div>

                    <div className="flex items-center gap-3 text-slate-600">

                      <Mail className="h-5 w-5 text-slate-400" />

                      <span>
                        {doctor.email}
                      </span>

                    </div>

                    <div className="flex items-center gap-3 text-slate-600">

                      <Building2 className="h-5 w-5 text-slate-400" />

                      <span>
                        Department #{doctor.department_id}
                      </span>

                    </div>

                  </div>

                  <div className="flex items-center gap-3 mt-8">

                    <Button
                      variant="outline"
                      className="flex-1 rounded-2xl"
                    >

                      View

                    </Button>

                    <Button className="flex-1 rounded-2xl bg-slate-900 hover:bg-slate-800">

                      Manage

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