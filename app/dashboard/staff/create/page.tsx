"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {

  Users,

  Save,

  Loader2,

} from "lucide-react"

import { toast } from "sonner"

import {

  createStaff,

} from "@/services/staff-service"


export default function CreateStaffPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({

      hospital_id: 0,

      full_name: "",

      email: "",

      phone: "",

      role: "",

      department: "",

      shift: "",
    })


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    setLoading(true)

    try {

      await createStaff(formData)

      toast.success(
        "Staff created successfully"
      )

      router.push("/dashboard/staff")

    } catch (error) {

      toast.error(
        "Failed to create staff"
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

          <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center">

            <Users className="h-8 w-8 text-blue-700" />

          </div>

          <div>

            <h1 className="text-4xl font-bold">

              Create Staff

            </h1>

            <p className="text-muted-foreground mt-2">

              Add new hospital staff

            </p>

          </div>

        </div>


        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <Card className="p-8 rounded-3xl border-0 shadow-sm space-y-6">

            <Input
              required
              type="number"
              placeholder="Hospital ID"
              className="h-12 rounded-xl"
              value={formData.hospital_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hospital_id: parseInt(e.target.value) || 0,
                })
              }
            />


            <Input
              required
              placeholder="Full Name"
              className="h-12 rounded-xl"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  full_name: e.target.value,
                })
              }
            />


            <Input
              type="email"
              placeholder="Email"
              className="h-12 rounded-xl"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />


            <Input
              required
              placeholder="Phone"
              className="h-12 rounded-xl"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />


            <Input
              required
              placeholder="Role"
              className="h-12 rounded-xl"
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value,
                })
              }
            />


            <Input
              placeholder="Department"
              className="h-12 rounded-xl"
              value={formData.department}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department: e.target.value,
                })
              }
            />


            <Input
              placeholder="Shift"
              className="h-12 rounded-xl"
              value={formData.shift}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shift: e.target.value,
                })
              }
            />


            <Button
              type="submit"
              disabled={loading}
              className="h-12 rounded-xl"
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

              Save Staff

            </Button>

          </Card>

        </form>

      </div>

    </DashboardLayout>
  )
}