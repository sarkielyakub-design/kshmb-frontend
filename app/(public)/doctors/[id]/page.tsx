"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { useParams } from "next/navigation"

import {

  Users,

  HeartPulse,

  Calendar,

  Clock3,

  MapPin,

  Building2,

  ChevronRight,

  BrainCircuit,

  Award,

  ShieldCheck,

  Loader2,

  Phone,

  Mail,

  Stethoscope,

} from "lucide-react"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {

  getDoctorById,

} from "@/services/doctor-service"

import {

  getHospitalById,

} from "@/services/hospital-service"


export default function DoctorProfilePage() {

  const params = useParams()

  const [doctor, setDoctor] =
    useState<any>(null)

  const [hospital, setHospital] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)


  // =====================================
  // FETCH DATA
  // =====================================

  useEffect(() => {

    const fetchDoctor =
      async () => {

        try {

          const doctorData =
            await getDoctorById(
              Number(params.id)
            )

          setDoctor(doctorData)

          // =========================
          // FETCH HOSPITAL
          // =========================

          if (doctorData?.hospital_id) {

            const hospitalData =
              await getHospitalById(
                doctorData.hospital_id
              )

            setHospital(hospitalData)
          }

        } catch (error) {

          console.error(error)

        } finally {

          setLoading(false)
        }
      }

    if (params.id) {

      fetchDoctor()
    }

  }, [params.id])


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


  // =====================================
  // NO DOCTOR
  // =====================================

  if (!doctor) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-50">

        <div className="text-center">

          <h1 className="text-4xl font-black">

            Doctor not found

          </h1>

          <p className="text-slate-500 mt-4">

            The requested doctor profile does not exist.

          </p>

        </div>

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

                Certified Healthcare Professional

              </div>


              <div className="flex items-start gap-6">

                {/* IMAGE */}

                <div className="h-24 w-24 rounded-[32px] overflow-hidden bg-cyan-100 flex items-center justify-center shrink-0">

                  {
                    doctor.image ? (

                      <img
                        src={doctor.image}
                        alt={doctor.full_name}
                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <Users className="h-12 w-12 text-cyan-700" />

                    )
                  }

                </div>


                <div>

                  <h1 className="text-5xl font-black tracking-tight leading-tight">

                    {doctor.full_name}

                  </h1>


                  <p className="text-cyan-600 text-xl font-semibold mt-4">

                    {doctor.specialty}

                  </p>

                </div>

              </div>


              {/* BIO */}

              <p className="text-xl text-muted-foreground mt-8 leading-relaxed">

                {
                  doctor.bio ||

                  "Experienced healthcare specialist delivering advanced diagnostics, consultation, patient care, and modern treatment services across Kano State healthcare infrastructure."
                }

              </p>


              {/* INFO */}

              <div className="space-y-5 mt-10">

                <div className="flex items-center gap-4">

                  <Building2 className="h-6 w-6 text-cyan-600" />

                  <span className="text-lg">

                    {hospital?.name || "Hospital"}

                  </span>

                </div>


                <div className="flex items-center gap-4">

                  <MapPin className="h-6 w-6 text-cyan-600" />

                  <span className="text-lg">

                    {hospital?.lga || "Kano"},
                    {" "}
                    Kano State

                  </span>

                </div>


                <div className="flex items-center gap-4">

                  <Clock3 className="h-6 w-6 text-cyan-600" />

                  <span className="text-lg">

                    {
                      doctor.availability ||
                      "Monday - Friday"
                    }

                  </span>

                </div>


                <div className="flex items-center gap-4">

                  <Phone className="h-6 w-6 text-cyan-600" />

                  <span className="text-lg">

                    {doctor.phone}

                  </span>

                </div>


                <div className="flex items-center gap-4">

                  <Mail className="h-6 w-6 text-cyan-600" />

                  <span className="text-lg">

                    {doctor.email}

                  </span>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="flex flex-wrap gap-4 mt-12">

                <Link
                  href={`/appointments?doctor=${doctor.id}`}
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

                  Contact Doctor

                </Button>

              </div>

            </div>


            {/* RIGHT */}

            <div className="grid grid-cols-2 gap-6">

              {/* EXPERIENCE */}

              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-cyan-100 flex items-center justify-center mb-6">

                  <Calendar className="h-8 w-8 text-cyan-700" />

                </div>

                <h2 className="text-5xl font-black">

                  {
                    doctor.experience || "5+"
                  }

                </h2>

                <p className="text-muted-foreground mt-3">

                  Clinical Experience

                </p>

              </Card>


              {/* PATIENTS */}

              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center mb-6">

                  <HeartPulse className="h-8 w-8 text-emerald-700" />

                </div>

                <h2 className="text-5xl font-black">

                  {
                    doctor.attended_patients || 0
                  }

                </h2>

                <p className="text-muted-foreground mt-3">

                  Attended Patients

                </p>

              </Card>


              {/* QUALIFICATION */}

              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-purple-100 flex items-center justify-center mb-6">

                  <Award className="h-8 w-8 text-purple-700" />

                </div>

                <h2 className="text-2xl font-black leading-tight">

                  Certified

                </h2>

                <p className="text-muted-foreground mt-3">

                  Healthcare Professional

                </p>

              </Card>


              {/* AI */}

              <Card className="rounded-[28px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center mb-6">

                  <BrainCircuit className="h-8 w-8 text-blue-700" />

                </div>

                <h2 className="text-2xl font-black leading-tight">

                  AI Support

                </h2>

                <p className="text-muted-foreground mt-3">

                  Smart Healthcare Integration

                </p>

              </Card>

            </div>

          </div>

        </div>

      </section>


      {/* DETAILS */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

            {/* QUALIFICATIONS */}

            <Card className="rounded-[32px] border-0 shadow-sm p-10">

              <h2 className="text-4xl font-black tracking-tight">

                Qualifications

              </h2>


              <div className="space-y-5 mt-10">

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-100">

                  <Award className="h-6 w-6 text-cyan-700" />

                  <span className="font-medium">

                    {
                      doctor.qualification ||
                      "Medical Certification"
                    }

                  </span>

                </div>


                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-100">

                  <Award className="h-6 w-6 text-cyan-700" />

                  <span className="font-medium">

                    {doctor.specialty}

                  </span>

                </div>

              </div>

            </Card>


            {/* SERVICES */}

            <Card className="rounded-[32px] border-0 shadow-sm p-10">

              <h2 className="text-4xl font-black tracking-tight">

                Healthcare Services

              </h2>


              <div className="grid grid-cols-1 gap-5 mt-10">

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-100">

                  <HeartPulse className="h-6 w-6 text-emerald-700" />

                  <span className="font-medium">

                    Medical Consultation

                  </span>

                </div>


                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-100">

                  <HeartPulse className="h-6 w-6 text-emerald-700" />

                  <span className="font-medium">

                    Diagnostics & Treatment

                  </span>

                </div>


                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-100">

                  <HeartPulse className="h-6 w-6 text-emerald-700" />

                  <span className="font-medium">

                    Emergency Healthcare

                  </span>

                </div>


                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-100">

                  <Stethoscope className="h-6 w-6 text-cyan-700" />

                  <span className="font-medium">

                    {doctor.specialty}

                  </span>

                </div>

              </div>

            </Card>

          </div>

        </div>

      </section>

    </main>
  )
}