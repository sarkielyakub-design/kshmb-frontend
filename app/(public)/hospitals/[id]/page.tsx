"use client"

import Link from "next/link"

import {
  Building2,
  MapPin,
  Phone,
  Clock3,
  Ambulance,
  ChevronRight,
  HeartPulse,
  Users,
  Calendar,
  ShieldCheck,
  Loader2,
  BedDouble,
  Activity,
} from "lucide-react"

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
  getHospitalById,
  getDepartments,
  getDoctors,
} from "@/services/hospital-service"

import { toast } from "sonner"


export default function HospitalDetailsPage() {

  const params = useParams()

  const hospitalId =
    Number(params.id)

  const [loading, setLoading] =
    useState(true)

  const [hospital, setHospital] =
    useState<any>(null)

  const [departments, setDepartments] =
    useState<any[]>([])

  const [doctors, setDoctors] =
    useState<any[]>([])


  // =====================================
  // FETCH DATA
  // =====================================

  useEffect(() => {

    const fetchHospital =
      async () => {

        try {

          const hospitalData =
            await getHospitalById(
              hospitalId
            )

          const departmentData =
            await getDepartments(
              hospitalId
            )

          const doctorData =
            await getDoctors(
              hospitalId
            )

          setHospital(hospitalData)

          setDepartments(departmentData)

          setDoctors(doctorData)

        } catch {

          toast.error(
            "Failed to load hospital"
          )

        } finally {

          setLoading(false)
        }
      }

    if (hospitalId) {

      fetchHospital()
    }

  }, [hospitalId])


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-50">

        <Loader2 className="h-14 w-14 animate-spin text-cyan-600" />

      </div>
    )
  }


  // =====================================
  // NO HOSPITAL
  // =====================================

  if (!hospital) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold">

          Hospital Not Found

        </h1>

      </div>
    )
  }


  return (

    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden border-b bg-gradient-to-br from-cyan-50 via-white to-blue-50">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-3 bg-cyan-100 text-cyan-700 px-5 py-3 rounded-full text-sm font-medium mb-8">

                <ShieldCheck className="h-4 w-4" />

                Enterprise Healthcare Facility

              </div>


              <div className="flex items-start gap-5">

                <div className="h-20 w-20 rounded-[28px] bg-cyan-100 flex items-center justify-center shrink-0">

                  <Building2 className="h-10 w-10 text-cyan-700" />

                </div>


                <div>

                  <h1 className="text-5xl font-black tracking-tight leading-tight">

                    {hospital.name}

                  </h1>


                  <p className="text-cyan-600 font-semibold mt-4 text-lg">

                    {hospital.hospital_type}

                  </p>

                </div>

              </div>


              <p className="text-xl text-muted-foreground mt-8 leading-relaxed">

                Advanced healthcare facility delivering
                specialist care, emergency services,
                diagnostics, surgery, intensive care,
                and enterprise healthcare solutions
                across Kano State.

              </p>


              <div className="space-y-5 mt-10">

                <div className="flex items-center gap-4">

                  <MapPin className="h-6 w-6 text-cyan-600" />

                  <span className="text-lg">

                    {hospital.address}

                  </span>

                </div>


                <div className="flex items-center gap-4">

                  <Phone className="h-6 w-6 text-cyan-600" />

                  <span className="text-lg">

                    {hospital.phone}

                  </span>

                </div>


                <div className="flex items-center gap-4">

                  <Clock3 className="h-6 w-6 text-cyan-600" />

                  <span className="text-lg">

                    24/7 Healthcare Operations

                  </span>

                </div>

              </div>


              <div className="flex flex-wrap gap-4 mt-12">

                <Link
                  href="/appointments"
                >

                  <Button
                    size="lg"
                    className="rounded-2xl h-14 px-8"
                  >

                    Book Appointment

                    <ChevronRight className="ml-2 h-5 w-5" />

                  </Button>

                </Link>


                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl h-14 px-8"
                >

                  Contact Hospital

                </Button>

              </div>

            </div>


            {/* RIGHT */}

            <div className="grid grid-cols-2 gap-6">

              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center mb-6">

                  <Users className="h-8 w-8 text-blue-700" />

                </div>

                <h2 className="text-5xl font-black">

                  {doctors.length}

                </h2>

                <p className="text-muted-foreground mt-3">

                  Medical Professionals

                </p>

              </Card>


              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center mb-6">

                  <HeartPulse className="h-8 w-8 text-emerald-700" />

                </div>

                <h2 className="text-5xl font-black">

                  {hospital.annual_patients}

                </h2>

                <p className="text-muted-foreground mt-3">

                  Annual Patients

                </p>

              </Card>


              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-red-100 flex items-center justify-center mb-6">

                  <Ambulance className="h-8 w-8 text-red-700" />

                </div>

                <h2 className="text-5xl font-black">

                  24/7

                </h2>

                <p className="text-muted-foreground mt-3">

                  Emergency Units

                </p>

              </Card>


              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-purple-100 flex items-center justify-center mb-6">

                  <BedDouble className="h-8 w-8 text-purple-700" />

                </div>

                <h2 className="text-5xl font-black">

                  {hospital.bed_space}

                </h2>

                <p className="text-muted-foreground mt-3">

                  Hospital Beds

                </p>

              </Card>

            </div>

          </div>

        </div>

      </section>


      {/* HOSPITAL ANALYTICS */}

      <section className="py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Card className="rounded-[28px] border-0 shadow-sm p-8">

              <div className="flex items-center gap-5">

                <div className="h-16 w-16 rounded-3xl bg-cyan-100 flex items-center justify-center">

                  <Users className="h-8 w-8 text-cyan-700" />

                </div>

                <div>

                  <h3 className="text-4xl font-black">

                    {hospital.total_staff}

                  </h3>

                  <p className="text-muted-foreground mt-2">

                    Total Staff

                  </p>

                </div>

              </div>

            </Card>


            <Card className="rounded-[28px] border-0 shadow-sm p-8">

              <div className="flex items-center gap-5">

                <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center">

                  <Activity className="h-8 w-8 text-emerald-700" />

                </div>

                <div>

                  <h3 className="text-4xl font-black">

                    {departments.length}

                  </h3>

                  <p className="text-muted-foreground mt-2">

                    Departments

                  </p>

                </div>

              </div>

            </Card>


            <Card className="rounded-[28px] border-0 shadow-sm p-8">

              <div className="flex items-center gap-5">

                <div className="h-16 w-16 rounded-3xl bg-orange-100 flex items-center justify-center">

                  <Calendar className="h-8 w-8 text-orange-700" />

                </div>

                <div>

                  <h3 className="text-4xl font-black">

                    {hospital.lga}

                  </h3>

                  <p className="text-muted-foreground mt-2">

                    Local Government Area

                  </p>

                </div>

              </div>

            </Card>

          </div>

        </div>

      </section>


      {/* DEPARTMENTS */}

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl">

            <h2 className="text-5xl font-black tracking-tight">

              Medical Departments

            </h2>

            <p className="text-muted-foreground text-xl mt-5">

              Advanced healthcare specialties
              and medical departments.

            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">

            {
              departments.map((department) => (

                <Card
                  key={department.id}
                  className="rounded-[28px] border-0 shadow-sm p-8 hover:shadow-xl transition-all duration-300"
                >

                  <div className="h-14 w-14 rounded-3xl bg-slate-100 flex items-center justify-center mb-6">

                    <HeartPulse className="h-7 w-7 text-slate-700" />

                  </div>


                  <h3 className="text-2xl font-bold">

                    {department.name}

                  </h3>


                  <p className="text-muted-foreground mt-4 leading-relaxed">

                    Specialized healthcare services
                    and advanced medical care infrastructure.

                  </p>


                  <Button
                    variant="ghost"
                    className="mt-6 p-0 hover:bg-transparent"
                  >

                    Explore Department

                    <ChevronRight className="ml-2 h-4 w-4" />

                  </Button>

                </Card>
              ))
            }

          </div>

        </div>

      </section>


      {/* DOCTORS */}

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl">

            <h2 className="text-5xl font-black tracking-tight">

              Medical Doctors

            </h2>

            <p className="text-muted-foreground text-xl mt-5">

              Meet our certified healthcare professionals.

            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">

            {
              doctors.map((doctor) => (

                <Card
                  key={doctor.id}
                  className="rounded-[28px] border-0 shadow-sm p-8"
                >

                  <div className="flex items-center gap-5">

                    <div className="h-16 w-16 rounded-3xl bg-cyan-100 flex items-center justify-center">

                      <Users className="h-8 w-8 text-cyan-700" />

                    </div>

                    <div>

                      <h3 className="text-2xl font-bold">

                        {doctor.full_name}

                      </h3>

                      <p className="text-cyan-600 mt-1">

                        {doctor.specialty}

                      </p>

                    </div>

                  </div>


                  <div className="space-y-4 mt-8">

                    <div className="flex items-center gap-3 text-muted-foreground">

                      <Phone className="h-5 w-5" />

                      <span>

                        {doctor.phone}

                      </span>

                    </div>


                    <div className="flex items-center gap-3 text-muted-foreground">

                      <Building2 className="h-5 w-5" />

                      <span>

                        {hospital.name}

                      </span>

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