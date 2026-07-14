"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {

  FileHeart,

  Search,

  Loader2,

  Plus,

  Activity,

  HeartPulse,

  Pill,

  ClipboardList,

} from "lucide-react"

import {

  getMedicalRecords,

  MedicalRecord,

} from "@/services/medical-record-service"

import { toast } from "sonner"


export default function MedicalRecordsPage() {

  const [records, setRecords] =
    useState<MedicalRecord[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")


  // =====================================
  // FETCH RECORDS
  // =====================================

  const fetchRecords = async () => {

    try {

      setLoading(true)

      const data =
        await getMedicalRecords()

      setRecords(data)

    } catch (error: any) {

      console.error(error)

      toast.error(
        error?.response?.data?.detail ||
        "Failed to load medical records"
      )

    } finally {

      setLoading(false)
    }
  }


  useEffect(() => {

    fetchRecords()

  }, [])


  // =====================================
  // FILTER RECORDS
  // =====================================

  const filteredRecords =
    records.filter((record) =>

      record.patient_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      record.diagnosis
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      record.doctor_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          <div>

            <div className="flex items-center gap-4">

              <div className="h-16 w-16 rounded-3xl bg-rose-100 flex items-center justify-center">

                <FileHeart className="h-8 w-8 text-rose-700" />

              </div>

              <div>

                <h1 className="text-4xl font-bold">

                  Medical Records

                </h1>

                <p className="text-muted-foreground mt-2">

                  Enterprise electronic medical records system

                </p>

              </div>

            </div>

          </div>


          <Link
            href="/dashboard/medical-records/create"
          >

            <Button className="rounded-xl h-12 px-6">

              <Plus className="mr-2 h-5 w-5" />

              New Medical Record

            </Button>

          </Link>

        </div>


        {/* ANALYTICS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">

                  Total Records

                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {records.length}

                </h2>

              </div>

              <div className="h-14 w-14 rounded-2xl bg-rose-100 flex items-center justify-center">

                <ClipboardList className="h-7 w-7 text-rose-700" />

              </div>

            </div>

          </Card>


          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">

                  Diagnosed Patients

                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {
                    new Set(
                      records.map(
                        (record) =>
                          record.patient_id
                      )
                    ).size
                  }

                </h2>

              </div>

              <div className="h-14 w-14 rounded-2xl bg-red-100 flex items-center justify-center">

                <HeartPulse className="h-7 w-7 text-red-700" />

              </div>

            </div>

          </Card>


          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">

                  Prescriptions

                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {
                    records.filter(
                      (record) =>
                        record.prescription
                    ).length
                  }

                </h2>

              </div>

              <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                <Pill className="h-7 w-7 text-emerald-700" />

              </div>

            </div>

          </Card>


          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">

                  Consultations

                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {records.length}

                </h2>

              </div>

              <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                <Activity className="h-7 w-7 text-blue-700" />

              </div>

            </div>

          </Card>

        </div>


        {/* SEARCH */}

        <Card className="p-6 rounded-3xl border-0 shadow-sm">

          <div className="relative">

            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

            <Input
              placeholder="Search medical records..."
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
          filteredRecords.length === 0 && (

            <Card className="p-16 rounded-3xl border-0 shadow-sm text-center">

              <FileHeart className="h-16 w-16 mx-auto text-slate-300" />

              <h2 className="text-2xl font-semibold mt-6">

                No Medical Records Found

              </h2>

              <p className="text-muted-foreground mt-2">

                No patient records available

              </p>

            </Card>
          )
        }


        {/* RECORDS */}

        {
          !loading && (

            <div className="space-y-6">

              {
                filteredRecords.map((record) => (

                  <Card
                    key={record.id}
                    className="p-8 rounded-3xl border-0 shadow-sm hover:shadow-lg transition"
                  >

                    <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">

                      {/* LEFT */}

                      <div className="space-y-6 flex-1">

                        <div>

                          <h2 className="text-2xl font-semibold">

                            {
                              record.patient_name ||
                              "Unknown Patient"
                            }

                          </h2>

                          <p className="text-rose-600 mt-2 font-medium">

                            Diagnosis:
                            {" "}
                            {record.diagnosis}

                          </p>

                        </div>


                        {/* RECORD DETAILS */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">

                          <div className="rounded-2xl bg-slate-50 p-5">

                            <p className="text-muted-foreground">

                              Symptoms

                            </p>

                            <p className="font-medium mt-2">

                              {
                                record.symptoms ||
                                "N/A"
                              }

                            </p>

                          </div>


                          <div className="rounded-2xl bg-slate-50 p-5">

                            <p className="text-muted-foreground">

                              Prescription

                            </p>

                            <p className="font-medium mt-2">

                              {
                                record.prescription ||
                                "N/A"
                              }

                            </p>

                          </div>


                          <div className="rounded-2xl bg-slate-50 p-5">

                            <p className="text-muted-foreground">

                              Lab Results

                            </p>

                            <p className="font-medium mt-2">

                              {
                                record.lab_results ||
                                "N/A"
                              }

                            </p>

                          </div>


                          <div className="rounded-2xl bg-slate-50 p-5">

                            <p className="text-muted-foreground">

                              Visit Date

                            </p>

                            <p className="font-medium mt-2">

                              {
                                record.visit_date
                                  ? new Date(
                                      record.visit_date
                                    ).toLocaleDateString()
                                  : "N/A"
                              }

                            </p>

                          </div>

                        </div>


                        {/* NOTES */}

                        <div className="rounded-2xl bg-rose-50 p-5">

                          <p className="text-muted-foreground">

                            Doctor Notes

                          </p>

                          <p className="mt-2 leading-relaxed">

                            {
                              record.doctor_notes ||
                              "No notes available"
                            }

                          </p>

                        </div>

                      </div>


                      {/* RIGHT */}

                      <div className="w-full xl:w-[220px] space-y-4">

                        <div className="rounded-2xl bg-slate-100 p-5">

                          <p className="text-sm text-muted-foreground">

                            Doctor

                          </p>

                          <p className="font-semibold mt-2">

                            {
                              record.doctor_name ||
                              "N/A"
                            }

                          </p>

                        </div>


                        <div className="rounded-2xl bg-slate-100 p-5">

                          <p className="text-sm text-muted-foreground">

                            Record ID

                          </p>

                          <p className="font-semibold mt-2">

                            #{record.id}

                          </p>

                        </div>


                        <div className="rounded-2xl bg-slate-100 p-5">

                          <p className="text-sm text-muted-foreground">

                            Patient ID

                          </p>

                          <p className="font-semibold mt-2">

                            #{record.patient_id}

                          </p>

                        </div>


                        <Link
                          href={`/dashboard/medical-records/${record.id}`}
                        >

                          <Button
                            className="w-full rounded-2xl"
                          >

                            View Full Record

                          </Button>

                        </Link>

                      </div>

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