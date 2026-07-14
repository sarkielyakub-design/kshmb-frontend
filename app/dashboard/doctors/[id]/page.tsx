"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

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

  Eye,

  Settings,

} from "lucide-react"

import {

  getDoctors

} from "@/services/doctor-service"


export default function DoctorsPage() {

  const [search, setSearch] =
    useState("")

  const [doctors, setDoctors] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    fetchDoctors()

  }, [])

  const fetchDoctors =
    async () => {

      try {

        const data =
          await getDoctors()

        setDoctors(data)

      } finally {

        setLoading(false)
      }
    }

  const filteredDoctors =
    doctors.filter((doctor) =>

      doctor.full_name
        .toLowerCase()
        .includes(search.toLowerCase())
    )

  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-black">

              Doctors

            </h1>

            <p className="text-slate-500 mt-2">

              Manage hospital doctors

            </p>

          </div>

          <Link
            href="/dashboard/doctors/create"
          >

            <Button className="rounded-2xl h-12">

              <Plus className="mr-2 h-5 w-5" />

              Add Doctor

            </Button>

          </Link>

        </div>

        {/* SEARCH */}

        <Card className="rounded-3xl p-6">

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

        {/* GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            filteredDoctors.map((doctor) => (

              <Card
                key={doctor.id}
                className="rounded-3xl p-8"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">

                      {doctor.full_name}

                    </h2>

                    <p className="text-blue-600 mt-2">

                      {doctor.specialty}

                    </p>

                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center">

                    <Stethoscope className="h-7 w-7 text-slate-700" />

                  </div>

                </div>

                <div className="space-y-4 mt-8">

                  <div className="flex items-center gap-3 text-slate-600">

                    <Phone className="h-5 w-5" />

                    <span>

                      {doctor.phone}

                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-slate-600">

                    <Mail className="h-5 w-5" />

                    <span>

                      {doctor.email}

                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-slate-600">

                    <Building2 className="h-5 w-5" />

                    <span>

                      {doctor.hospital?.name}

                    </span>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">

                  <Link
                    href={`/dashboard/doctors/${doctor.id}`}
                  >

                    <Button
                      variant="outline"
                      className="w-full rounded-2xl"
                    >

                      <Eye className="mr-2 h-4 w-4" />

                      View

                    </Button>

                  </Link>

                  <Link
                    href={`/dashboard/doctors/${doctor.id}/manage`}
                  >

                    <Button className="w-full rounded-2xl">

                      <Settings className="mr-2 h-4 w-4" />

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