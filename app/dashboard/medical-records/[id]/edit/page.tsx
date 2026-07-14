"use client"

import { useEffect, useState } from "react"

import {

  useParams,

  useRouter,

} from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"

import {

  Loader2,

  Save,

} from "lucide-react"

import {

  getMedicalRecordById,

  updateMedicalRecord,

} from "@/services/medical-record-service"

import { toast } from "sonner"


export default function EditMedicalRecordPage() {

  const params = useParams()

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [fetching, setFetching] =
    useState(true)

  const [formData, setFormData] =
    useState({

      diagnosis: "",

      symptoms: "",

      prescription: "",

      doctor_notes: "",

      lab_results: "",
    })


  useEffect(() => {

    const fetchRecord = async () => {

      try {

        const data =
          await getMedicalRecordById(
            Number(params.id)
          )

        setFormData({

          diagnosis:
            data.diagnosis || "",

          symptoms:
            data.symptoms || "",

          prescription:
            data.prescription || "",

          doctor_notes:
            data.doctor_notes || "",

          lab_results:
            data.lab_results || "",
        })

      } catch (error) {

        toast.error(
          "Failed to load record"
        )

      } finally {

        setFetching(false)
      }
    }

    fetchRecord()

  }, [params.id])


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      setLoading(true)

      await updateMedicalRecord(

        Number(params.id),

        formData
      )

      toast.success(
        "Medical record updated"
      )

      router.push(
        `/dashboard/medical-records/${params.id}`
      )

    } catch (error) {

      toast.error(
        "Failed to update record"
      )

    } finally {

      setLoading(false)
    }
  }


  if (fetching) {

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

      <div className="max-w-5xl mx-auto">

        <Card className="p-8 rounded-3xl border-0 shadow-sm">

          <h1 className="text-4xl font-bold">

            Edit Medical Record

          </h1>


          <form
            onSubmit={handleSubmit}
            className="space-y-6 mt-8"
          >

            <Textarea
              placeholder="Diagnosis"
              value={formData.diagnosis}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  diagnosis:
                    e.target.value,
                })
              }
            />


            <Textarea
              placeholder="Symptoms"
              value={formData.symptoms}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  symptoms:
                    e.target.value,
                })
              }
            />


            <Textarea
              placeholder="Prescription"
              value={formData.prescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  prescription:
                    e.target.value,
                })
              }
            />


            <Textarea
              placeholder="Lab Results"
              value={formData.lab_results}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lab_results:
                    e.target.value,
                })
              }
            />


            <Textarea
              placeholder="Doctor Notes"
              value={formData.doctor_notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  doctor_notes:
                    e.target.value,
                })
              }
            />


            <Button
              type="submit"
              disabled={loading}
              className="rounded-xl"
            >

              {
                loading
                  ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  )
                  : (
                    <Save className="h-4 w-4 mr-2" />
                  )
              }

              Save Changes

            </Button>

          </form>

        </Card>

      </div>

    </DashboardLayout>
  )
}