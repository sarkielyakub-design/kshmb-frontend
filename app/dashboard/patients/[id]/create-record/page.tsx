"use client"

import { useEffect, useState } from "react"

import {

  useParams,

  useRouter,

} from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"

import {

  FileHeart,

  Save,

  Loader2,

  ArrowLeft,

} from "lucide-react"

import Link from "next/link"

import {

  createMedicalRecord,

} from "@/services/medical-record-service"

import {

  getPatientById,

} from "@/services/patient-service"

import { toast } from "sonner"


export default function CreateMedicalRecordPage() {

  const params = useParams()

  const router = useRouter()


  const [patient, setPatient] =
    useState<any>(null)

  const [pageLoading, setPageLoading] =
    useState(true)

  const [loading, setLoading] =
    useState(false)


  // =====================================
  // FORM DATA
  // =====================================

  const [formData, setFormData] =
    useState({

      diagnosis: "",

      symptoms: "",

      prescription: "",

      doctor_notes: "",

      lab_results: "",

      doctor_id: 1,
    })


  // =====================================
  // FETCH PATIENT
  // =====================================

  useEffect(() => {

    const fetchPatient = async () => {

      try {

        setPageLoading(true)

        const data =
          await getPatientById(
            Number(params.id)
          )

        setPatient(data)

      } catch (error: any) {

        toast.error(
          error?.response?.data?.detail ||
          "Failed to load patient"
        )

      } finally {

        setPageLoading(false)
      }
    }

    if (params?.id) {

      fetchPatient()
    }

  }, [params.id])


  // =====================================
  // HANDLE INPUT CHANGE
  // =====================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    })
  }


  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      setLoading(true)

      await createMedicalRecord({

        patient_id:
          Number(params.id),

        doctor_id:
          Number(
            formData.doctor_id
          ),

        diagnosis:
          formData.diagnosis,

        symptoms:
          formData.symptoms,

        prescription:
          formData.prescription,

        doctor_notes:
          formData.doctor_notes,

        lab_results:
          formData.lab_results,
      })

      toast.success(
        "Medical record created successfully"
      )

      router.push(
        `/dashboard/patients/${params.id}`
      )

    } catch (error: any) {

      console.error(error)

      toast.error(
        error?.response?.data?.detail ||
        "Failed to create medical record"
      )

    } finally {

      setLoading(false)
    }
  }


  // =====================================
  // LOADING
  // =====================================

  if (pageLoading) {

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

      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div className="flex items-center gap-4">

            <div className="h-16 w-16 rounded-3xl bg-rose-100 flex items-center justify-center">

              <FileHeart className="h-8 w-8 text-rose-700" />

            </div>

            <div>

              <h1 className="text-4xl font-bold">

                Create Medical Record

              </h1>

              <p className="text-muted-foreground mt-2">

                Patient:
                {" "}
                {
                  patient?.full_name ||
                  "Unknown Patient"
                }

              </p>

            </div>

          </div>


          <Link
            href={`/dashboard/patients/${params.id}`}
          >

            <Button
              variant="outline"
              className="rounded-xl"
            >

              <ArrowLeft className="mr-2 h-4 w-4" />

              Back to Patient

            </Button>

          </Link>

        </div>


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
        >

          <Card className="p-8 rounded-3xl border-0 shadow-sm space-y-6">

            {/* DIAGNOSIS */}

            <div>

              <label className="text-sm font-medium">

                Diagnosis

              </label>

              <Textarea
                required
                name="diagnosis"
                placeholder="Enter diagnosis..."
                className="mt-2 rounded-xl min-h-[120px]"
                value={formData.diagnosis}
                onChange={handleChange}
              />

            </div>


            {/* SYMPTOMS */}

            <div>

              <label className="text-sm font-medium">

                Symptoms

              </label>

              <Textarea
                name="symptoms"
                placeholder="Enter symptoms..."
                className="mt-2 rounded-xl min-h-[120px]"
                value={formData.symptoms}
                onChange={handleChange}
              />

            </div>


            {/* PRESCRIPTION */}

            <div>

              <label className="text-sm font-medium">

                Prescription

              </label>

              <Textarea
                name="prescription"
                placeholder="Enter prescription..."
                className="mt-2 rounded-xl min-h-[120px]"
                value={formData.prescription}
                onChange={handleChange}
              />

            </div>


            {/* LAB RESULTS */}

            <div>

              <label className="text-sm font-medium">

                Lab Results

              </label>

              <Textarea
                name="lab_results"
                placeholder="Enter lab results..."
                className="mt-2 rounded-xl min-h-[120px]"
                value={formData.lab_results}
                onChange={handleChange}
              />

            </div>


            {/* DOCTOR NOTES */}

            <div>

              <label className="text-sm font-medium">

                Doctor Notes

              </label>

              <Textarea
                name="doctor_notes"
                placeholder="Enter doctor notes..."
                className="mt-2 rounded-xl min-h-[120px]"
                value={formData.doctor_notes}
                onChange={handleChange}
              />

            </div>


            {/* DOCTOR ID */}

            <div>

              <label className="text-sm font-medium">

                Doctor ID

              </label>

              <Input
                required
                type="number"
                name="doctor_id"
                className="mt-2 rounded-xl h-12"
                value={formData.doctor_id}
                onChange={handleChange}
              />

            </div>


            {/* BUTTON */}

            <div className="pt-4">

              <Button
                type="submit"
                disabled={loading}
                className="rounded-xl h-12 px-8"
              >

                {
                  loading
                    ? (
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    )
                    : (
                      <Save className="h-5 w-5 mr-2" />
                    )
                }

                Save Medical Record

              </Button>

            </div>

          </Card>

        </form>

      </div>

    </DashboardLayout>
  )
}