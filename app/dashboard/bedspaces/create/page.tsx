"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {

  Bed,

  Loader2,

  Save,

  Building2,

} from "lucide-react"

import { toast } from "sonner"

import {

  createBedSpace,

} from "@/services/bedspace-service"


export default function CreateBedSpacePage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({

      ward_name: "",

      bed_number: "",

      category: "",

      occupied: false,

      patient_name: "",

      hospital_id: "",
    })


  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    setLoading(true)

    try {

      await createBedSpace({

        ward_name:
          formData.ward_name,

        bed_number:
          formData.bed_number,

        category:
          formData.category,

        occupied:
          formData.occupied,

        patient_name:
          formData.patient_name,

        hospital_id:
          Number(formData.hospital_id),
      })

      toast.success(
        "Bed space created successfully"
      )

      router.push(
        "/dashboard/bedspaces"
      )

    } catch (error: any) {

      console.error(error)

      toast.error(
        error?.response?.data?.detail ||
        "Failed to create bed space"
      )

    } finally {

      setLoading(false)
    }
  }


  return (

    <DashboardLayout>

      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}

        <div className="flex items-center gap-4">

          <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center">

            <Bed className="h-8 w-8 text-emerald-700" />

          </div>

          <div>

            <h1 className="text-4xl font-bold">

              Create Bed Space

            </h1>

            <p className="text-slate-500 mt-2">

              Add new hospital bed allocation

            </p>

          </div>

        </div>


        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <Card className="p-8 rounded-3xl border-0 shadow-sm space-y-6">

            {/* HOSPITAL ID */}

            <div>

              <label className="text-sm font-medium">

                Hospital ID

              </label>

              <div className="relative mt-2">

                <Building2 className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <Input
                  required
                  type="number"
                  placeholder="Enter hospital ID"
                  className="h-12 rounded-xl pl-12"
                  value={formData.hospital_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hospital_id:
                        e.target.value,
                    })
                  }
                />

              </div>

            </div>


            {/* WARD */}

            <div>

              <label className="text-sm font-medium">

                Ward Name

              </label>

              <Input
                required
                placeholder="Ward Name"
                className="h-12 rounded-xl mt-2"
                value={formData.ward_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ward_name:
                      e.target.value,
                  })
                }
              />

            </div>


            {/* BED NUMBER */}

            <div>

              <label className="text-sm font-medium">

                Bed Number

              </label>

              <Input
                required
                placeholder="Bed Number"
                className="h-12 rounded-xl mt-2"
                value={formData.bed_number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bed_number:
                      e.target.value,
                  })
                }
              />

            </div>


            {/* CATEGORY */}

            <div>

              <label className="text-sm font-medium">

                Category

              </label>

              <Input
                placeholder="ICU / VIP / General"
                className="h-12 rounded-xl mt-2"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category:
                      e.target.value,
                  })
                }
              />

            </div>


            {/* BUTTON */}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 rounded-xl px-8"
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

              Save Bed Space

            </Button>

          </Card>

        </form>

      </div>

    </DashboardLayout>
  )
}