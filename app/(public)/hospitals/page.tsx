"use client"

import Link from "next/link"

import {
  Building2,
  Search,
  MapPin,
  Phone,
  ChevronRight,
  Ambulance,
  HeartPulse,
  ShieldCheck,
  BedDouble,
  Users,
  Activity,
  Loader2,
} from "lucide-react"

import { useEffect, useState } from "react"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { getHospitals } from "@/services/hospital-service"

import { toast } from "sonner"


export default function HospitalsPage() {

  const [search, setSearch] =
    useState("")

  const [loading, setLoading] =
    useState(true)

  const [hospitals, setHospitals] =
    useState<any[]>([])


  // =====================================
  // FETCH HOSPITALS
  // =====================================

  useEffect(() => {

    const fetchHospitals =
      async () => {

        try {

          const data =
            await getHospitals()

          setHospitals(data)

        } catch {

          toast.error(
            "Failed to load hospitals"
          )

        } finally {

          setLoading(false)
        }
      }

    fetchHospitals()

  }, [])


  // =====================================
  // FILTER
  // =====================================

  const filteredHospitals =
    hospitals.filter((hospital) =>

      hospital.name
        .toLowerCase()
        .includes(search.toLowerCase())
    )


  // =====================================
  // TOTALS
  // =====================================

  const totalBeds =
    hospitals.reduce(
      (acc, hospital) =>
        acc + (hospital.bed_space || 0),
      0
    )

  const totalStaff =
    hospitals.reduce(
      (acc, hospital) =>
        acc + (hospital.total_staff || 0),
      0
    )


  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-50">

        <Loader2 className="h-14 w-14 animate-spin text-cyan-600" />

      </div>
    )
  }


  return (

    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden border-b bg-gradient-to-br from-cyan-50 via-white to-blue-50">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-3 bg-cyan-100 text-cyan-700 px-5 py-3 rounded-full text-sm font-medium mb-8">

              <ShieldCheck className="h-4 w-4" />

              Kano State Healthcare Infrastructure

            </div>

            <h1 className="text-6xl font-black tracking-tight leading-tight">

              Discover Modern

              <span className="text-cyan-600">

                {" "}Healthcare{" "}

              </span>

              Facilities

            </h1>

            <p className="text-xl text-muted-foreground mt-8 leading-relaxed max-w-3xl">

              Explore hospitals, emergency units,
              specialist medical centers,
              healthcare departments,
              and advanced healthcare infrastructure
              across Kano State.

            </p>

            {/* SEARCH */}

            <div className="mt-12 bg-white rounded-3xl shadow-xl p-4 flex flex-col lg:flex-row gap-4">

              <div className="relative flex-1">

                <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />

                <Input
                  placeholder="Search hospitals..."
                  className="h-14 rounded-2xl border-0 bg-slate-100 pl-12"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

              <Button className="h-14 rounded-2xl px-8">

                Search Hospitals

              </Button>

            </div>

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="py-12">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <Card className="rounded-3xl border-0 shadow-sm p-8">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-muted-foreground">

                    Total Hospitals

                  </p>

                  <h2 className="text-5xl font-black mt-3">

                    {hospitals.length}

                  </h2>

                </div>

                <div className="h-16 w-16 rounded-3xl bg-cyan-100 flex items-center justify-center">

                  <Building2 className="h-8 w-8 text-cyan-700" />

                </div>

              </div>

            </Card>


            <Card className="rounded-3xl border-0 shadow-sm p-8">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-muted-foreground">

                    Bed Spaces

                  </p>

                  <h2 className="text-5xl font-black mt-3">

                    {totalBeds}

                  </h2>

                </div>

                <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center">

                  <BedDouble className="h-8 w-8 text-blue-700" />

                </div>

              </div>

            </Card>


            <Card className="rounded-3xl border-0 shadow-sm p-8">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-muted-foreground">

                    Total Staff

                  </p>

                  <h2 className="text-5xl font-black mt-3">

                    {totalStaff}

                  </h2>

                </div>

                <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center">

                  <Users className="h-8 w-8 text-emerald-700" />

                </div>

              </div>

            </Card>


            <Card className="rounded-3xl border-0 shadow-sm p-8">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-muted-foreground">

                    Annual Patients

                  </p>

                  <h2 className="text-5xl font-black mt-3">

                    {
                      hospitals.reduce(
                        (acc, hospital) =>
                          acc + (hospital.annual_patients || 0),
                        0
                      )
                    }

                  </h2>

                </div>

                <div className="h-16 w-16 rounded-3xl bg-red-100 flex items-center justify-center">

                  <HeartPulse className="h-8 w-8 text-red-700" />

                </div>

              </div>

            </Card>

          </div>

        </div>

      </section>


      {/* HOSPITALS */}

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center justify-between mb-10">

            <div>

              <h2 className="text-4xl font-black tracking-tight">

                Healthcare Facilities

              </h2>

              <p className="text-muted-foreground mt-3">

                Government hospitals and specialist healthcare centers

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {
              filteredHospitals.map((hospital) => (

                <Card
                  key={hospital.id}
                  className="rounded-[32px] border-0 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >

                  {/* IMAGE */}

                  {
                    hospital.image && (

                      <img
                        src={hospital.image}
                        alt={hospital.name}
                        className="h-72 w-full object-cover"
                      />
                    )
                  }

                  <div className="p-8">

                    <div className="flex items-start justify-between gap-6">

                      <div>

                        <div className="flex items-center gap-3 mb-5">

                          <div className="h-14 w-14 rounded-3xl bg-cyan-100 flex items-center justify-center">

                            <Building2 className="h-7 w-7 text-cyan-700" />

                          </div>

                          <div>

                            <h3 className="text-2xl font-bold">

                              {hospital.name}

                            </h3>

                            <p className="text-cyan-600 font-medium mt-1">

                              {hospital.hospital_type}

                            </p>

                          </div>

                        </div>

                        <div className="space-y-4">

                          <div className="flex items-center gap-3 text-muted-foreground">

                            <MapPin className="h-5 w-5" />

                            <span>

                              {hospital.lga}

                            </span>

                          </div>

                          <div className="flex items-center gap-3 text-muted-foreground">

                            <Phone className="h-5 w-5" />

                            <span>

                              {hospital.phone}

                            </span>

                          </div>

                        </div>

                      </div>

                      <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">

                        Active

                      </div>

                    </div>


                    {/* ANALYTICS */}

                    <div className="grid grid-cols-3 gap-4 mt-10">

                      <div className="rounded-2xl bg-slate-100 p-4 text-center">

                        <BedDouble className="h-6 w-6 mx-auto text-blue-700 mb-2" />

                        <p className="text-sm text-muted-foreground">

                          Beds

                        </p>

                        <h4 className="text-xl font-bold">

                          {hospital.bed_space}

                        </h4>

                      </div>

                      <div className="rounded-2xl bg-slate-100 p-4 text-center">

                        <Users className="h-6 w-6 mx-auto text-emerald-700 mb-2" />

                        <p className="text-sm text-muted-foreground">

                          Staff

                        </p>

                        <h4 className="text-xl font-bold">

                          {hospital.total_staff}

                        </h4>

                      </div>

                      <div className="rounded-2xl bg-slate-100 p-4 text-center">

                        <Activity className="h-6 w-6 mx-auto text-red-700 mb-2" />

                        <p className="text-sm text-muted-foreground">

                          Patients

                        </p>

                        <h4 className="text-xl font-bold">

                          {hospital.annual_patients}

                        </h4>

                      </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="mt-10 flex flex-wrap gap-4">

                      <Link
                        href={`/hospitals/${hospital.id}`}
                      >

                        <Button className="rounded-2xl">

                          View Hospital

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