"use client"

import { useState } from "react"

import { useParams, useRouter } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"

import {
  createDepartment,
} from "@/services/hospital-service"

import { toast } from "sonner"

export default function CreateDepartmentPage() {

  const params = useParams()

  const router = useRouter()

  const [name, setName] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const handleCreate =
    async () => {

      try {

        setLoading(true)

        await createDepartment({

          name,

          hospital_id:
            Number(params.id),
        })

        toast.success(
          "Department created"
        )

        router.push(
          `/dashboard/hospitals/${params.id}/departments`
        )

      } catch {

        toast.error(
          "Failed to create department"
        )

      } finally {

        setLoading(false)
      }
    }

  return (

    <DashboardLayout>

      <div className="max-w-2xl">

        <Card className="rounded-3xl p-10">

          <h1 className="text-4xl font-black">

            Create Department

          </h1>

          <div className="space-y-6 mt-10">

            <div>

              <Label>
                Department Name
              </Label>

              <Input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Cardiology"
                className="mt-2 h-12 rounded-2xl"
              />

            </div>

            <Button
              onClick={handleCreate}
              disabled={loading}
              className="rounded-2xl h-12"
            >

              Create Department

            </Button>

          </div>

        </Card>

      </div>

    </DashboardLayout>
  )
}