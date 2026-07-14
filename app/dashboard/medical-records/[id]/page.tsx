"use client"

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {

  FileHeart,

  Loader2,

  User,

  Stethoscope,

  Pill,

  FlaskConical,

  FileText,

  Calendar,

  Edit,

} from "lucide-react"

import Link from "next/link"

import {

  getMedicalRecordById,

} from "@/services/medical-record-service"

import { toast } from "sonner"


export default function MedicalRecordDetailsPage() {

  const params = useParams()

  const [record, setRecord] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)


  useEffect(() => {

    const fetchRecord = async () => {

      try {

        const data =
          await getMedicalRecordById(
            Number(params.id)
          )

        setRecord(data)

      } catch (error) {

        toast.error(
          "Failed to load record"
        )

      } finally {

        setLoading(false)
      }
    }

    fetchRecord()

  }, [params.id])


  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex items-center justify-center py-32">

          <Loader2 className="h-10 w-10 animate-spin text-slate-500" />

        </div>

      </DashboardLayout>
    )
  }


  return (

    <DashboardLayout>

      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div className="flex items-center gap-4">

            <div className="h-16 w-16 rounded-3xl bg-rose-100 flex items-center justify-center">

              <FileHeart className="h-8 w-8 text-rose-700" />

            </div>

            <div>

              <h1 className="text-4xl font-bold">

                Medical Record

              </h1>

              <p className="text-muted-foreground mt-2">

                Record ID #{record?.id}

              </p>

            </div>

          </div>


          <Link
            href={`/dashboard/medical-records/${record?.id}/edit`}
          >

            <Button className="rounded-xl">

              <Edit className="mr-2 h-4 w-4" />

              Edit Record

            </Button>

          </Link>

        </div>


        {/* DETAILS */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center gap-3">

              <User className="h-6 w-6 text-blue-600" />

              <h2 className="text-xl font-semibold">

                Patient

              </h2>

            </div>

            <p className="mt-4 text-lg font-medium">

              {record?.patient_name || "N/A"}

            </p>

          </Card>


          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center gap-3">

              <Stethoscope className="h-6 w-6 text-emerald-600" />

              <h2 className="text-xl font-semibold">

                Doctor

              </h2>

            </div>

            <p className="mt-4 text-lg font-medium">

              {record?.doctor_name || "N/A"}

            </p>

          </Card>


          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center gap-3">

              <Calendar className="h-6 w-6 text-amber-600" />

              <h2 className="text-xl font-semibold">

                Visit Date

              </h2>

            </div>

            <p className="mt-4 text-lg font-medium">

              {
                record?.visit_date
                  ? new Date(
                      record.visit_date
                    ).toLocaleDateString()
                  : "N/A"
              }

            </p>

          </Card>

        </div>


        {/* CONTENT */}

        <div className="space-y-6">

          <Card className="p-8 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center gap-3">

              <FileText className="h-6 w-6 text-rose-600" />

              <h2 className="text-2xl font-semibold">

                Diagnosis

              </h2>

            </div>

            <p className="mt-5 leading-relaxed">

              {record?.diagnosis || "N/A"}

            </p>

          </Card>


          <Card className="p-8 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center gap-3">

              <Stethoscope className="h-6 w-6 text-blue-600" />

              <h2 className="text-2xl font-semibold">

                Symptoms

              </h2>

            </div>

            <p className="mt-5 leading-relaxed">

              {record?.symptoms || "N/A"}

            </p>

          </Card>


          <Card className="p-8 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center gap-3">

              <Pill className="h-6 w-6 text-emerald-600" />

              <h2 className="text-2xl font-semibold">

                Prescription

              </h2>

            </div>

            <p className="mt-5 leading-relaxed">

              {record?.prescription || "N/A"}

            </p>

          </Card>


          <Card className="p-8 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center gap-3">

              <FlaskConical className="h-6 w-6 text-violet-600" />

              <h2 className="text-2xl font-semibold">

                Lab Results

              </h2>

            </div>

            <p className="mt-5 leading-relaxed">

              {record?.lab_results || "N/A"}

            </p>

          </Card>


          <Card className="p-8 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center gap-3">

              <FileText className="h-6 w-6 text-orange-600" />

              <h2 className="text-2xl font-semibold">

                Doctor Notes

              </h2>

            </div>

            <p className="mt-5 leading-relaxed">

              {record?.doctor_notes || "N/A"}

            </p>

          </Card>

        </div>

      </div>

    </DashboardLayout>
  )
}