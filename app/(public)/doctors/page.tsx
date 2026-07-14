"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import {

  Search,

  Users,

  HeartPulse,

  Calendar,

  MapPin,

  ChevronRight,

  ShieldCheck,

  BrainCircuit,

  Building2,

  Loader2,

  Stethoscope,

} from "lucide-react"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import {
  getDoctors,
} from "@/services/doctor-service"

import {
  getHospitals,
} from "@/services/hospital-service"


export default function DoctorsPage() {

  const [search, setSearch] =
    useState("")

  const [doctors, setDoctors] =
    useState<any[]>([])

  const [hospitals, setHospitals] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)


  // =====================================
  // FETCH DATA
  // =====================================

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const doctorData =
            await getDoctors()

          const hospitalData =
            await getHospitals()

          setDoctors(doctorData)

          setHospitals(hospitalData)

        } catch (error) {

          console.error(error)

        } finally {

          setLoading(false)
        }
      }

    fetchData()

  }, [])


  // =====================================
  // GET HOSPITAL NAME
  // =====================================

  const getHospitalName = (
    hospitalId: number
  ) => {

    const hospital =
      hospitals.find(
        (item) =>
          item.id === hospitalId
      )

    return hospital?.name ||
      "Unknown Hospital"
  }


  // =====================================
  // FILTER
  // =====================================

  const filteredDoctors =
    doctors.filter((doctor) =>

      doctor.full_name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      doctor.specialty
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-50">

        <Loader2 className="h-14 w-14 animate-spin text-cyan-700" />

      </div>
    )
  }


  return (

    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden border-b bg-gradient-to-br from-blue-50 via-white to-cyan-50">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-3 bg-cyan-100 text-cyan-700 px-5 py-3 rounded-full text-sm font-medium mb-8">

              <ShieldCheck className="h-4 w-4" />

              Certified Healthcare Professionals

            </div>

            <h1 className="text-6xl font-black tracking-tight leading-tight">

              Discover Trusted

              <span className="text-cyan-600">

                {" "}Medical{" "}

              </span>

              Experts

            </h1>

            <p className="text-xl text-muted-foreground mt-8 leading-relaxed max-w-3xl">

              Connect with experienced healthcare professionals,
              specialists, surgeons, and certified medical experts
              across Kano State healthcare network.

            </p>

            {/* SEARCH */}

            <div className="mt-12 bg-white rounded-3xl shadow-xl p-4 flex flex-col lg:flex-row gap-4">

              <div className="relative flex-1">

                <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />

                <Input
                  placeholder="Search doctors or specialties..."
                  className="h-14 rounded-2xl border-0 bg-slate-100 pl-12"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

              <Button className="h-14 rounded-2xl px-8">

                Search Doctors

              </Button>

            </div>

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="py-12">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Card className="rounded-3xl border-0 shadow-sm p-8">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-muted-foreground">

                    Medical Doctors

                  </p>

                  <h2 className="text-5xl font-black mt-3">

                    {doctors.length}+

                  </h2>

                </div>

                <div className="h-16 w-16 rounded-3xl bg-cyan-100 flex items-center justify-center">

                  <Users className="h-8 w-8 text-cyan-700" />

                </div>

              </div>

            </Card>

            <Card className="rounded-3xl border-0 shadow-sm p-8">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-muted-foreground">

                    Specialists

                  </p>

                  <h2 className="text-5xl font-black mt-3">

                    {
                      new Set(
                        doctors.map(
                          (doctor) =>
                            doctor.specialty
                        )
                      ).size
                    }

                  </h2>

                </div>

                <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center">

                  <HeartPulse className="h-8 w-8 text-emerald-700" />

                </div>

              </div>

            </Card>

            <Card className="rounded-3xl border-0 shadow-sm p-8">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-muted-foreground">

                    AI Healthcare Support

                  </p>

                  <h2 className="text-5xl font-black mt-3">

                    24/7

                  </h2>

                </div>

                <div className="h-16 w-16 rounded-3xl bg-purple-100 flex items-center justify-center">

                  <BrainCircuit className="h-8 w-8 text-purple-700" />

                </div>

              </div>

            </Card>

          </div>

        </div>

      </section>


      {/* DOCTORS */}

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center justify-between mb-10">

            <div>

              <h2 className="text-4xl font-black tracking-tight">

                Healthcare Specialists

              </h2>

              <p className="text-muted-foreground mt-3">

                Explore trusted healthcare professionals

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {
              filteredDoctors.map((doctor) => (

                <Card
                  key={doctor.id}
                  className="rounded-[32px] border-0 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >

                  <div className="p-8">

                    <div className="flex items-start justify-between gap-6">

                      <div className="flex gap-5">

                        <div className="h-20 w-20 rounded-[28px] bg-cyan-100 flex items-center justify-center shrink-0">

                          <Users className="h-10 w-10 text-cyan-700" />

                        </div>

                        <div>

                          <h3 className="text-2xl font-bold">

                            Dr. {doctor.full_name}

                          </h3>

                          <p className="text-cyan-600 font-semibold mt-2">

                            {doctor.specialty}

                          </p>

                          <div className="flex items-center gap-2 mt-4 text-muted-foreground">

                            <Building2 className="h-4 w-4" />

                            <span>

                              {
                                getHospitalName(
                                  doctor.hospital_id
                                )
                              }

                            </span>

                          </div>

                        </div>

                      </div>

                      <div className="px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">

                        Available

                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">

                      <div className="flex items-center gap-3 text-muted-foreground">

                        <MapPin className="h-5 w-5" />

                        <span>

                          Kano State

                        </span>

                      </div>

                      <div className="flex items-center gap-3 text-muted-foreground">

                        <Stethoscope className="h-5 w-5" />

                        <span>

                          Specialist Doctor

                        </span>

                      </div>

                    </div>

                    <div className="mt-10 flex flex-wrap gap-4">

                      <Link
                        href={`/doctors/${doctor.id}`}
                      >

                        <Button className="rounded-2xl">

                          View Profile

                          <ChevronRight className="ml-2 h-4 w-4" />

                        </Button>

                      </Link>

                      <Link
                        href="/appointments"
                      >

                        <Button
                          variant="outline"
                          className="rounded-2xl"
                        >

                          Book Appointment

                        </Button>

                      </Link>

                    </div>

                  </div>

                </Card>
              ))
            }

          </div>

        </div>

      </section>

    </main>
  )
}