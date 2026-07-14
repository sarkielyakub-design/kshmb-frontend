"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"

import {

  createDoctor

} from "@/services/doctor-service"

import {

  getHospitals,

  getDepartments

} from "@/services/hospital-service"

import { toast } from "sonner"


export default function CreateDoctorPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [hospitals, setHospitals] =
    useState<any[]>([])

  const [departments, setDepartments] =
    useState<any[]>([])

  const [formData, setFormData] =
    useState({

      full_name: "",

      specialty: "",

      phone: "",

      email: "",

      hospital_id: "",

      department_id: "",

      qualification: "",

      experience: "",

      availability: "",
    })

  useEffect(() => {

    fetchHospitals()

  }, [])

  const fetchHospitals =
    async () => {

      const data =
        await getHospitals()

      setHospitals(data)
    }

  const handleHospitalChange =
    async (e: any) => {

      const hospitalId =
        e.target.value

      setFormData({

        ...formData,

        hospital_id: hospitalId,
      })

      const data =
        await getDepartments(
          Number(hospitalId)
        )

      setDepartments(data)
    }

  const handleSubmit =
    async () => {

      try {

        setLoading(true)

        await createDoctor({

          ...formData,

          hospital_id:
            Number(formData.hospital_id),

          department_id:
            Number(formData.department_id),
        })

        toast.success(
          "Doctor created successfully"
        )

        router.push(
          "/dashboard/doctors"
        )

      } catch {

        toast.error(
          "Failed to create doctor"
        )

      } finally {

        setLoading(false)
      }
    }

  return (

    <DashboardLayout>

      <Card className="rounded-3xl p-10 max-w-4xl">

        <h1 className="text-4xl font-black">

          Create Doctor

        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          <div>

            <Label>

              Full Name

            </Label>

            <Input
              className="mt-2 h-14 rounded-2xl"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  full_name:
                    e.target.value,
                })
              }
            />

          </div>

          <div>

            <Label>

              Specialty

            </Label>

            <Input
              className="mt-2 h-14 rounded-2xl"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specialty:
                    e.target.value,
                })
              }
            />

          </div>

          <div>

            <Label>

              Phone

            </Label>

            <Input
              className="mt-2 h-14 rounded-2xl"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone:
                    e.target.value,
                })
              }
            />

          </div>

          <div>

            <Label>

              Email

            </Label>

            <Input
              className="mt-2 h-14 rounded-2xl"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
            />

          </div>

          <div>

            <Label>

              Hospital

            </Label>

            <select
              className="w-full h-14 rounded-2xl border px-4 mt-2"
              onChange={
                handleHospitalChange
              }
            >

              <option>

                Select Hospital

              </option>

              {
                hospitals.map(
                  (hospital) => (

                    <option
                      key={hospital.id}
                      value={hospital.id}
                    >

                      {hospital.name}

                    </option>
                  )
                )
              }

            </select>

          </div>

          <div>

            <Label>

              Department

            </Label>

            <select
              className="w-full h-14 rounded-2xl border px-4 mt-2"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department_id:
                    e.target.value,
                })
              }
            >

              <option>

                Select Department

              </option>

              {
                departments.map(
                  (department) => (

                    <option
                      key={department.id}
                      value={department.id}
                    >

                      {department.name}

                    </option>
                  )
                )
              }

            </select>

          </div>

        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-10 h-14 rounded-2xl px-8"
        >

          Create Doctor

        </Button>

      </Card>

    </DashboardLayout>
  )
}