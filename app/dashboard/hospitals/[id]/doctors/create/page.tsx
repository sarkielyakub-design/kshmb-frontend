"use client"

import { useEffect, useState } from "react"

import { useParams, useRouter } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"

import {
  createDoctor,
  getDepartments,
} from "@/services/hospital-service"

import { toast } from "sonner"

export default function CreateDoctorPage() {

  const params = useParams()

  const router = useRouter()

  const [departments, setDepartments] =
    useState<any[]>([])

  const [formData, setFormData] =
    useState({

      full_name: "",

      specialty: "",

      phone: "",

      email: "",

      department_id: "",
    })

  useEffect(() => {

    const fetchDepartments =
      async () => {

        const data =
          await getDepartments(
            Number(params.id)
          )

        setDepartments(data)
      }

    fetchDepartments()

  }, [params.id])

  const handleCreate =
    async () => {

      try {

        await createDoctor({

          ...formData,

          hospital_id:
            Number(params.id),

          department_id:
            Number(
              formData.department_id
            ),
        })

        toast.success(
          "Doctor created"
        )

        router.push(
          `/dashboard/hospitals/${params.id}/doctors`
        )

      } catch {

        toast.error(
          "Failed to create doctor"
        )
      }
    }

  return (

    <DashboardLayout>

      <div className="max-w-3xl">

        <Card className="rounded-3xl p-10">

          <h1 className="text-4xl font-black">

            Create Doctor

          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            <div>

              <Label>
                Full Name
              </Label>

              <Input
                className="mt-2 h-12 rounded-2xl"
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
                className="mt-2 h-12 rounded-2xl"
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
                className="mt-2 h-12 rounded-2xl"
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
                className="mt-2 h-12 rounded-2xl"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target.value,
                  })
                }
              />

            </div>

          </div>

          <div className="mt-6">

            <Label>
              Department ID
            </Label>

            <select
              className="w-full h-12 rounded-2xl border mt-2 px-4"
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

          <Button
            onClick={handleCreate}
            className="mt-10 rounded-2xl h-12 px-8"
          >

            Create Doctor

          </Button>

        </Card>

      </div>

    </DashboardLayout>
  )
}