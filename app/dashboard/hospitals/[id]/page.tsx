"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { useParams } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {

  Building2,

  MapPin,

  Phone,

  ArrowRight,

  Users,

  BedDouble,

  Stethoscope,

  Loader2,

  UserRound,

  Bed,

  Activity,

  Building,

  HeartPulse,

} from "lucide-react"

import {

  getHospitalById,

} from "@/services/hospital-service"

import {

  getHospitalStaff,

} from "@/services/staff-service"

import {

  getHospitalBedSpaces,

} from "@/services/bedspace-service"

import { toast } from "sonner"


export default function HospitalDetailsPage() {

  const params = useParams()

  const hospitalId =
    Number(params.id)

  const [hospital, setHospital] =
    useState<any>(null)

  const [staff, setStaff] =
    useState<any[]>([])

  const [bedSpaces, setBedSpaces] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

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

          const staffData =
            await getHospitalStaff(
              hospitalId
            )

          const bedData =
            await getHospitalBedSpaces(
              hospitalId
            )

          setHospital(hospitalData)

          setStaff(staffData)

          setBedSpaces(bedData)

        } catch (error) {

          console.log(error)

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

      <DashboardLayout>

        <div className="h-[70vh] flex items-center justify-center">

          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />

        </div>

      </DashboardLayout>
    )
  }

  // =====================================
  // NOT FOUND
  // =====================================

  if (!hospital) {

    return (

      <DashboardLayout>

        <div className="h-[70vh] flex items-center justify-center">

          <p className="text-red-500 text-xl font-semibold">

            Hospital not found

          </p>

        </div>

      </DashboardLayout>
    )
  }

  // =====================================
  // ANALYTICS
  // =====================================

  const occupiedBeds =
    bedSpaces.filter(
      (bed) => bed.occupied
    ).length

  const availableBeds =
    bedSpaces.length - occupiedBeds

  const totalDoctors =
    hospital.doctors?.length || 0

  return (

    <DashboardLayout>

      <div className="space-y-10">

        {/* =====================================
            HERO SECTION
        ===================================== */}

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-blue-700 via-cyan-600 to-sky-700 p-10 lg:p-14 text-white shadow-2xl">

          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

            {/* LEFT */}

            <div className="flex items-start gap-6">

              <div className="h-28 w-28 rounded-[32px] bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl">

                <Building2 className="h-14 w-14 text-white" />

              </div>

              <div>

                <h1 className="text-5xl xl:text-7xl font-black tracking-tight leading-none">

                  {hospital.name}

                </h1>

                <p className="mt-5 text-xl text-blue-100 capitalize font-medium">

                  {hospital.hospital_type}

                </p>

                <div className="flex flex-wrap gap-8 mt-8">

                  <div className="flex items-center gap-3 text-blue-50">

                    <MapPin className="h-5 w-5" />

                    <span className="font-medium">

                      {hospital.lga}

                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-blue-50">

                    <Phone className="h-5 w-5" />

                    <span className="font-medium">

                      {hospital.phone}

                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="flex flex-wrap gap-4">

              <Link
                href={`/dashboard/staff/create?hospital_id=${hospital.id}`}
              >

                <Button
                  className="h-14 px-8 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-semibold shadow-lg"
                >

                  Add Staff

                </Button>

              </Link>

              <Link
                href={`/dashboard/doctors/create?hospital_id=${hospital.id}`}
              >

                <Button
                  className="h-14 px-8 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold shadow-lg"
                >

                  Add Doctor

                </Button>

              </Link>

              <Link
                href={`/dashboard/bedspaces/create?hospital_id=${hospital.id}`}
              >

                <Button
                  variant="outline"
                  className="h-14 px-8 rounded-2xl border-white text-white hover:bg-white hover:text-slate-900 font-semibold"
                >

                  Add Bed Space

                </Button>

              </Link>

            </div>

          </div>

        </div>


        {/* =====================================
            STATS SECTION
        ===================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">

          {/* STAFF */}

          <Card className="rounded-[32px] border-0 shadow-sm p-8 hover:shadow-xl transition-all duration-300">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">

                  Total Staff

                </p>

                <h2 className="text-5xl font-black mt-4 text-slate-900">

                  {staff.length}

                </h2>

              </div>

              <div className="h-20 w-20 rounded-3xl bg-emerald-100 flex items-center justify-center">

                <Users className="h-10 w-10 text-emerald-700" />

              </div>

            </div>

          </Card>


          {/* DOCTORS */}

          <Card className="rounded-[32px] border-0 shadow-sm p-8 hover:shadow-xl transition-all duration-300">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">

                  Doctors

                </p>

                <h2 className="text-5xl font-black mt-4 text-slate-900">

                  {totalDoctors}

                </h2>

              </div>

              <div className="h-20 w-20 rounded-3xl bg-blue-100 flex items-center justify-center">

                <Stethoscope className="h-10 w-10 text-blue-700" />

              </div>

            </div>

          </Card>


          {/* BED SPACES */}

          <Card className="rounded-[32px] border-0 shadow-sm p-8 hover:shadow-xl transition-all duration-300">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">

                  Bed Spaces

                </p>

                <h2 className="text-5xl font-black mt-4 text-slate-900">

                  {bedSpaces.length}

                </h2>

              </div>

              <div className="h-20 w-20 rounded-3xl bg-purple-100 flex items-center justify-center">

                <BedDouble className="h-10 w-10 text-purple-700" />

              </div>

            </div>

          </Card>


          {/* AVAILABLE */}

          <Card className="rounded-[32px] border-0 shadow-sm p-8 hover:shadow-xl transition-all duration-300">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">

                  Available Beds

                </p>

                <h2 className="text-5xl font-black mt-4 text-slate-900">

                  {availableBeds}

                </h2>

              </div>

              <div className="h-20 w-20 rounded-3xl bg-cyan-100 flex items-center justify-center">

                <Bed className="h-10 w-10 text-cyan-700" />

              </div>

            </div>

          </Card>

        </div>


        {/* =====================================
            MAIN CONTENT
        ===================================== */}

        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8">

          {/* =====================================
              LEFT SIDE
          ===================================== */}

          <div className="2xl:col-span-2 space-y-8">

            {/* HOSPITAL INFO */}

            <Card className="rounded-[32px] border-0 shadow-sm p-10">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-3xl font-black tracking-tight">

                    Hospital Information

                  </h2>

                  <p className="text-slate-500 mt-2">

                    Hospital details and contact information

                  </p>

                </div>

                <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center">

                  <Activity className="h-8 w-8 text-blue-700" />

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-10">

                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">

                  <div className="flex items-start gap-4">

                    <MapPin className="h-7 w-7 text-blue-600 mt-1" />

                    <div>

                      <p className="text-sm text-slate-500 font-medium">

                        Address

                      </p>

                      <h3 className="text-lg font-bold mt-2">

                        {hospital.address}

                      </h3>

                    </div>

                  </div>

                </div>

                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">

                  <div className="flex items-start gap-4">

                    <Phone className="h-7 w-7 text-emerald-600 mt-1" />

                    <div>

                      <p className="text-sm text-slate-500 font-medium">

                        Phone Number

                      </p>

                      <h3 className="text-lg font-bold mt-2">

                        {hospital.phone}

                      </h3>

                    </div>

                  </div>

                </div>

                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">

                  <div className="flex items-start gap-4">

                    <Building className="h-7 w-7 text-cyan-600 mt-1" />

                    <div>

                      <p className="text-sm text-slate-500 font-medium">

                        LGA

                      </p>

                      <h3 className="text-lg font-bold mt-2">

                        {hospital.lga}

                      </h3>

                    </div>

                  </div>

                </div>

                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">

                  <div className="flex items-start gap-4">

                    <HeartPulse className="h-7 w-7 text-red-600 mt-1" />

                    <div>

                      <p className="text-sm text-slate-500 font-medium">

                        Hospital Type

                      </p>

                      <h3 className="text-lg font-bold mt-2 capitalize">

                        {hospital.hospital_type}

                      </h3>

                    </div>

                  </div>

                </div>

              </div>

            </Card>


            {/* STAFF */}

            <Card className="rounded-[32px] border-0 shadow-sm p-10">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-3xl font-black tracking-tight">

                    Staff Members

                  </h2>

                  <p className="text-slate-500 mt-2">

                    Hospital employees and management

                  </p>

                </div>

                <Link href={`/dashboard/staff`}>

                  <Button
                    variant="outline"
                    className="rounded-2xl"
                  >

                    View All

                  </Button>

                </Link>

              </div>

              <div className="space-y-5 mt-10">

                {
                  staff.length === 0 && (

                    <div className="rounded-3xl border border-dashed p-10 text-center">

                      <Users className="h-10 w-10 text-slate-300 mx-auto mb-4" />

                      <p className="text-slate-500">

                        No staff available

                      </p>

                    </div>
                  )
                }

                {
                  staff.slice(0, 5).map((member) => (

                    <div
                      key={member.id}
                      className="flex items-center justify-between rounded-3xl border border-slate-100 p-6 hover:bg-slate-50 transition-all"
                    >

                      <div className="flex items-center gap-5">

                        <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                          <UserRound className="h-7 w-7 text-blue-700" />

                        </div>

                        <div>

                          <h3 className="font-bold text-lg">

                            {member.full_name}

                          </h3>

                          <p className="text-sm text-slate-500 mt-1">

                            {member.role}

                          </p>

                        </div>

                      </div>

                      <span className="text-sm font-semibold text-emerald-600">

                        {member.status}

                      </span>

                    </div>
                  ))
                }

              </div>

            </Card>


            {/* DOCTORS */}

            <Card className="rounded-[32px] border-0 shadow-sm p-10">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-3xl font-black tracking-tight">

                    Doctors & Specialists

                  </h2>

                  <p className="text-slate-500 mt-2">

                    Medical specialists and consultants

                  </p>

                </div>

                <Link href={`/dashboard/doctors`}>

                  <Button
                    variant="outline"
                    className="rounded-2xl"
                  >

                    View All

                  </Button>

                </Link>

              </div>

              <div className="space-y-5 mt-10">

                {
                  hospital.doctors?.length === 0 && (

                    <div className="rounded-3xl border border-dashed p-10 text-center">

                      <Stethoscope className="h-10 w-10 text-slate-300 mx-auto mb-4" />

                      <p className="text-slate-500">

                        No doctors available

                      </p>

                    </div>
                  )
                }

                {
                  hospital.doctors?.slice(0, 5).map((doctor: any) => (

                    <div
                      key={doctor.id}
                      className="flex items-center justify-between rounded-3xl border border-slate-100 p-6 hover:bg-cyan-50 transition-all"
                    >

                      <div className="flex items-center gap-5">

                        <div className="h-14 w-14 rounded-2xl bg-cyan-100 flex items-center justify-center">

                          <Stethoscope className="h-7 w-7 text-cyan-700" />

                        </div>

                        <div>

                          <h3 className="font-bold text-lg">

                            {doctor.full_name}

                          </h3>

                          <p className="text-sm text-slate-500 mt-1 capitalize">

                            {doctor.specialty}

                          </p>

                        </div>

                      </div>

                      <span className="text-sm font-semibold text-blue-600">

                        Active

                      </span>

                    </div>
                  ))
                }

              </div>

            </Card>

          </div>


          {/* =====================================
              RIGHT SIDE
          ===================================== */}

          <div className="space-y-8">

            {/* QUICK ACTIONS */}

            <Card className="rounded-[32px] border-0 shadow-sm p-8">

              <h2 className="text-2xl font-black">

                Quick Actions

              </h2>

              <div className="space-y-4 mt-8">

                <Link
                  href={`/dashboard/staff/create?hospital_id=${hospital.id}`}
                >

                  <Button
                    variant="outline"
                    className="w-full h-14 rounded-2xl justify-between"
                  >

                    Create Staff

                    <ArrowRight className="h-4 w-4" />

                  </Button>

                </Link>

                <Link
                  href={`/dashboard/doctors/create?hospital_id=${hospital.id}`}
                >

                  <Button
                    variant="outline"
                    className="w-full h-14 rounded-2xl justify-between"
                  >

                    Create Doctor

                    <ArrowRight className="h-4 w-4" />

                  </Button>

                </Link>

                <Link
                  href={`/dashboard/bedspaces/create?hospital_id=${hospital.id}`}
                >

                  <Button
                    variant="outline"
                    className="w-full h-14 rounded-2xl justify-between"
                  >

                    Create Bed Space

                    <ArrowRight className="h-4 w-4" />

                  </Button>

                </Link>

              </div>

            </Card>


            {/* BED SPACES */}

            <Card className="rounded-[32px] border-0 shadow-sm p-8">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-black">

                    Bed Spaces

                  </h2>

                  <p className="text-slate-500 mt-2">

                    Bed occupancy overview

                  </p>

                </div>

                <BedDouble className="h-7 w-7 text-purple-700" />

              </div>

              <div className="space-y-4 mt-8">

                {
                  bedSpaces.length === 0 && (

                    <div className="rounded-3xl border border-dashed p-10 text-center">

                      <Bed className="h-10 w-10 text-slate-300 mx-auto mb-4" />

                      <p className="text-slate-500">

                        No bed spaces available

                      </p>

                    </div>
                  )
                }

                {
                  bedSpaces.slice(0, 6).map((bed) => (

                    <div
                      key={bed.id}
                      className="rounded-3xl border border-slate-100 p-5 hover:bg-slate-50 transition-all"
                    >

                      <div className="flex items-center justify-between">

                        <div>

                          <h3 className="font-bold">

                            {bed.ward_name}

                          </h3>

                          <p className="text-sm text-slate-500 mt-1">

                            Bed #{bed.bed_number}

                          </p>

                        </div>

                        <span
                          className={`text-xs font-semibold px-4 py-2 rounded-full ${
                            bed.occupied
                              ? "bg-red-100 text-red-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >

                          {
                            bed.occupied
                              ? "Occupied"
                              : "Available"
                          }

                        </span>

                      </div>

                    </div>
                  ))
                }

              </div>

            </Card>

          </div>

        </div>

      </div>

    </DashboardLayout>
  )
}