"use client"

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {

  Phone,

  Mail,

  HeartPulse,

  ShieldPlus,

  Calendar,

  User,

  FileText,

  Loader2,

} from "lucide-react"

import {

  getPatientById,

  getPatientRecords,

} from "@/services/patient-service"

import { toast } from "sonner"


export default function PatientDetailsPage() {

  const params = useParams()

  const [patient, setPatient] =
    useState<any>(null)

  const [records, setRecords] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)


  // =====================================
  // FETCH
  // =====================================

  useEffect(() => {

    const fetchData = async () => {

      try {

        const patientData =
          await getPatientById(
            Number(params.id)
          )

        setPatient(patientData)

        const recordData =
          await getPatientRecords(
            Number(params.id)
          )

        setRecords(
          recordData.records || []
        )

      } catch (error) {

        toast.error(
          "Failed to load patient"
        )

      } finally {

        setLoading(false)
      }
    }

    fetchData()

  }, [params.id])


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex items-center justify-center py-20">

          <Loader2 className="h-10 w-10 animate-spin text-slate-500" />

        </div>

      </DashboardLayout>
    )
  }


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* PROFILE */}

        <Card className="p-8 rounded-3xl border-0 shadow-sm">

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

            <div>

              <h1 className="text-4xl font-bold">

                {patient?.full_name}

              </h1>

              <p className="text-blue-600 mt-2 font-medium">

                {patient?.patient_number}

              </p>

            </div>


            <Button className="rounded-xl">

              Create Medical Record

            </Button>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

            <div className="flex items-center gap-3">

              <Phone className="h-5 w-5 text-muted-foreground" />

              <span>{patient?.phone}</span>

            </div>


            <div className="flex items-center gap-3">

              <Mail className="h-5 w-5 text-muted-foreground" />

              <span>{patient?.email}</span>

            </div>


            <div className="flex items-center gap-3">

              <HeartPulse className="h-5 w-5 text-red-500" />

              <span>

                Blood Group:
                {" "}
                {patient?.blood_group}

              </span>

            </div>


            <div className="flex items-center gap-3">

              <Calendar className="h-5 w-5 text-muted-foreground" />

              <span>

                Age:
                {" "}
                {patient?.age}

              </span>

            </div>


            <div className="flex items-center gap-3">

              <ShieldPlus className="h-5 w-5 text-muted-foreground" />

              <span>

                {patient?.gender}

              </span>

            </div>


            <div className="flex items-center gap-3">

              <User className="h-5 w-5 text-muted-foreground" />

              <span>

                {patient?.emergency_contact}

              </span>

            </div>

          </div>

        </Card>


        {/* MEDICAL RECORDS */}

        <div className="space-y-6">

          <h2 className="text-3xl font-bold">

            Medical Records

          </h2>


          {
            records.map((record) => (

              <Card
                key={record.id}
                className="p-6 rounded-3xl border-0 shadow-sm"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="text-2xl font-semibold">

                      {record.diagnosis}

                    </h2>

                    <p className="text-muted-foreground mt-2">

                      {record.symptoms}

                    </p>

                  </div>


                  <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center">

                    <FileText className="h-7 w-7 text-blue-600" />

                  </div>

                </div>


                <div className="mt-6 space-y-3">

                  <p>

                    <strong>
                      Prescription:
                    </strong>
                    {" "}
                    {record.prescription}

                  </p>

                  <p>

                    <strong>
                      Doctor Notes:
                    </strong>
                    {" "}
                    {record.doctor_notes}

                  </p>

                  <p>

                    <strong>
                      Lab Results:
                    </strong>
                    {" "}
                    {record.lab_results}

                  </p>

                </div>

              </Card>
            ))
          }

        </div>

      </div>

    </DashboardLayout>
  )
}