"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

import {
  Building2,
  MapPin,
  Phone,
  Loader2,
  ChevronLeft,
  Hospital,
} from "lucide-react"

import Link from "next/link"

import {
  createHospital,
} from "@/services/hospital-service"

import { toast } from "sonner"

export default function CreateHospitalPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({

      name: "",

      address: "",

      phone: "",

      lga: "",

      hospital_type: "",
    })

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    })
  }

  // =====================================
  // CREATE HOSPITAL
  // =====================================

  const handleCreateHospital =
    async () => {

      try {

        setLoading(true)

        await createHospital(
          formData
        )

        toast.success(
          "Hospital created successfully"
        )

        router.push(
          "/dashboard/hospitals"
        )

      } catch (error: any) {

        console.error(error)

        toast.error(

          error?.response?.data?.detail ||

          "Failed to create hospital"
        )

      } finally {

        setLoading(false)
      }
    }

  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto space-y-8">

        {/* =====================================
        HEADER
        ===================================== */}

        <div className="flex items-center justify-between">

          <div>

            <Link
              href="/dashboard/hospitals"
              className="inline-flex items-center gap-2 text-blue-700 font-medium mb-5"
            >

              <ChevronLeft className="h-4 w-4" />

              Back to Hospitals

            </Link>

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">

              <Hospital className="h-4 w-4" />

              Hospital Infrastructure

            </div>

            <h1 className="text-5xl font-black tracking-tight text-slate-900">

              Create Hospital

            </h1>

            <p className="text-slate-500 text-lg mt-4">

              Register and manage a new healthcare facility

            </p>

          </div>

        </div>

        {/* =====================================
        FORM
        ===================================== */}

        <Card className="rounded-[36px] border border-slate-200 shadow-sm overflow-hidden">

          <div className="h-2 bg-gradient-to-r from-blue-700 to-cyan-500" />

          <div className="p-10">

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              {/* =====================================
              HOSPITAL NAME
              ===================================== */}

              <div className="space-y-3">

                <Label className="text-base font-semibold">

                  Hospital Name

                </Label>

                <div className="relative">

                  <Building2 className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                  <Input
                    name="name"
                    placeholder="Murtala Muhammad Specialist Hospital"
                    className="pl-12 h-14 rounded-2xl"
                    value={formData.name}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* =====================================
              HOSPITAL TYPE
              ===================================== */}

              <div className="space-y-3">

                <Label className="text-base font-semibold">

                  Hospital Type

                </Label>

                <Input
                  name="hospital_type"
                  placeholder="Teaching Hospital"
                  className="h-14 rounded-2xl"
                  value={formData.hospital_type}
                  onChange={handleChange}
                />

              </div>

              {/* =====================================
              PHONE
              ===================================== */}

              <div className="space-y-3">

                <Label className="text-base font-semibold">

                  Phone Number

                </Label>

                <div className="relative">

                  <Phone className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                  <Input
                    name="phone"
                    placeholder="+234 800 000 0000"
                    className="pl-12 h-14 rounded-2xl"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* =====================================
              LGA
              ===================================== */}

              <div className="space-y-3">

                <Label className="text-base font-semibold">

                  Local Government Area

                </Label>

                <div className="relative">

                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                  <Input
                    name="lga"
                    placeholder="Nassarawa"
                    className="pl-12 h-14 rounded-2xl"
                    value={formData.lga}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

            {/* =====================================
            ADDRESS
            ===================================== */}

            <div className="space-y-3 mt-8">

              <Label className="text-base font-semibold">

                Hospital Address

              </Label>

              <Input
                name="address"
                placeholder="Enter hospital address"
                className="h-14 rounded-2xl"
                value={formData.address}
                onChange={handleChange}
              />

            </div>

            {/* =====================================
            ACTIONS
            ===================================== */}

            <div className="flex flex-col md:flex-row gap-4 mt-12">

              <Button
                className="h-14 px-10 rounded-2xl bg-blue-700 hover:bg-blue-800 text-base"
                disabled={loading}
                onClick={
                  handleCreateHospital
                }
              >

                {
                  loading ? (

                    <div className="flex items-center gap-2">

                      <Loader2 className="h-5 w-5 animate-spin" />

                      Creating Hospital...

                    </div>

                  ) : (

                    "Create Hospital"
                  )
                }

              </Button>

              <Link
                href="/dashboard/hospitals"
              >

                <Button
                  variant="outline"
                  className="h-14 px-10 rounded-2xl text-base"
                >

                  Cancel

                </Button>

              </Link>

            </div>

          </div>

        </Card>

      </div>

    </DashboardLayout>
  )
}