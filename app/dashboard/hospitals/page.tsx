"use client"

import Link from "next/link"

import { useEffect, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import {
  Building2,
  Search,
  Plus,
  MapPin,
  Phone,
  Activity,
  Loader2,
  ArrowRight,
  Hospital,
} from "lucide-react"

import {
  getHospitals,
  deleteHospital,
} from "@/services/hospital-service"

import { toast } from "sonner"

interface HospitalType {

  id: number

  name: string

  address: string

  phone: string

  lga: string

  hospital_type: string
}

export default function HospitalsPage() {

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")

  const [hospitals, setHospitals] =
    useState<HospitalType[]>([])

  // =====================================
  // FETCH HOSPITALS
  // =====================================

  const fetchHospitals = async () => {

    try {

      setLoading(true)

      const response =
        await getHospitals(search)

      setHospitals(response)

    } catch (error) {

      console.error(error)

      toast.error(
        "Failed to load hospitals"
      )

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    fetchHospitals()

  }, [])

  // =====================================
  // SEARCH
  // =====================================

  useEffect(() => {

    const timeout =
      setTimeout(() => {

        fetchHospitals()

      }, 400)

    return () =>
      clearTimeout(timeout)

  }, [search])

  // =====================================
  // DELETE
  // =====================================

  const handleDelete =
    async (hospitalId: number) => {

      try {

        await deleteHospital(
          hospitalId
        )

        toast.success(
          "Hospital deleted"
        )

        fetchHospitals()

      } catch (error) {

        toast.error(
          "Delete failed"
        )
      }
    }

  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* =====================================
        HEADER
        ===================================== */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

          <div>

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">

              <Hospital className="h-4 w-4" />

              Hospital Infrastructure

            </div>

            <h1 className="text-5xl font-black tracking-tight text-slate-900">

              Hospitals Management

            </h1>

            <p className="text-slate-500 text-lg mt-4">

              Manage healthcare facilities across Kano State

            </p>

          </div>

          <Link
            href="/dashboard/hospitals/create"
          >

            <Button className="rounded-2xl h-14 px-8 bg-blue-700 hover:bg-blue-800 text-base">

              <Plus className="mr-2 h-5 w-5" />

              Create Hospital

            </Button>

          </Link>

        </div>

        {/* =====================================
        STATS
        ===================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Card className="rounded-3xl border border-slate-200 shadow-sm p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">

                  Total Hospitals

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {hospitals.length}

                </h2>

              </div>

              <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center">

                <Building2 className="h-8 w-8 text-blue-700" />

              </div>

            </div>

          </Card>

          <Card className="rounded-3xl border border-slate-200 shadow-sm p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">

                  Active Facilities

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {hospitals.length}

                </h2>

              </div>

              <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center">

                <Activity className="h-8 w-8 text-emerald-700" />

              </div>

            </div>

          </Card>

          <Card className="rounded-3xl border border-slate-200 shadow-sm p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">

                  LGAs Covered

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {
                    new Set(
                      hospitals.map(
                        (h) => h.lga
                      )
                    ).size
                  }

                </h2>

              </div>

              <div className="h-16 w-16 rounded-3xl bg-cyan-100 flex items-center justify-center">

                <MapPin className="h-8 w-8 text-cyan-700" />

              </div>

            </div>

          </Card>

        </div>

        {/* =====================================
        SEARCH
        ===================================== */}

        <Card className="rounded-3xl border border-slate-200 shadow-sm p-6">

          <div className="relative">

            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

            <Input
              placeholder="Search hospitals..."
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

        {/* =====================================
        LOADING
        ===================================== */}

        {
          loading && (

            <div className="flex items-center justify-center py-20">

              <Loader2 className="h-10 w-10 animate-spin text-blue-700" />

            </div>
          )
        }

        {/* =====================================
        EMPTY
        ===================================== */}

        {
          !loading &&
          hospitals.length === 0 && (

            <Card className="rounded-3xl border border-dashed p-16 text-center">

              <Building2 className="h-16 w-16 mx-auto text-slate-300" />

              <h2 className="text-3xl font-bold mt-6">

                No Hospitals Found

              </h2>

              <p className="text-slate-500 mt-3">

                No hospitals available in the system

              </p>

            </Card>
          )
        }

        {/* =====================================
        HOSPITALS GRID
        ===================================== */}

        {
          !loading && (

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

              {
                hospitals.map((hospital) => (

                  <Card
                    key={hospital.id}
                    className="rounded-[32px] border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >

                    <div className="h-2 bg-gradient-to-r from-blue-700 to-cyan-500" />

                    <div className="p-8">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h2 className="text-2xl font-black text-slate-900 leading-tight">

                            {hospital.name}

                          </h2>

                          <p className="text-slate-500 mt-2">

                            {hospital.hospital_type}
                          </p>

                        </div>

                        <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">

                          Active

                        </div>

                      </div>

                      <div className="space-y-4 mt-8">

                        <div className="flex items-center gap-3 text-slate-600">

                          <MapPin className="h-5 w-5 text-blue-700" />

                          <span>
                            {hospital.lga}
                          </span>

                        </div>

                        <div className="flex items-center gap-3 text-slate-600">

                          <Phone className="h-5 w-5 text-blue-700" />

                          <span>
                            {hospital.phone}
                          </span>

                        </div>

                      </div>

                      <div className="mt-10 grid grid-cols-2 gap-3">

                        <Link
                          href={`/dashboard/hospitals/${hospital.id}`}
                        >

                          <Button
                            variant="outline"
                            className="w-full rounded-2xl"
                          >

                            View

                          </Button>

                        </Link>

                        <Link
                          href={`/dashboard/hospitals/${hospital.id}/manage`}
                        >

                          <Button className="w-full rounded-2xl bg-blue-700 hover:bg-blue-800">

                            Manage

                            <ArrowRight className="ml-2 h-4 w-4" />

                          </Button>

                        </Link>

                      </div>

                      <Button
                        variant="destructive"
                        className="w-full mt-3 rounded-2xl"
                        onClick={() =>
                          handleDelete(
                            hospital.id
                          )
                        }
                      >

                        Delete Hospital

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