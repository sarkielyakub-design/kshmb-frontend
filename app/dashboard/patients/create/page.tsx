"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {

  UserPlus,

  Loader2,

} from "lucide-react"

import {

  createPatient,

} from "@/services/patient-service"

import { toast } from "sonner"


export default function CreatePatientPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({

      full_name: "",

      email: "",

      phone: "",

      gender: "",

      blood_group: "",

      age: "",

      address: "",

      emergency_contact: "",
    })


  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (
    e: any
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
    e: any
  ) => {

    e.preventDefault()

    try {

      setLoading(true)

      await createPatient({

        ...formData,

        age: Number(formData.age),
      })

      toast.success(
        "Patient registered successfully"
      )

      router.push(
        "/dashboard/patients"
      )

    } catch (error) {

      toast.error(
        "Failed to create patient"
      )

    } finally {

      setLoading(false)
    }
  }


  return (

    <DashboardLayout>

      <div className="max-w-4xl mx-auto">

        <Card className="p-8 rounded-3xl border-0 shadow-sm">

          <div className="flex items-center gap-4 mb-8">

            <div className="h-16 w-16 rounded-3xl bg-red-100 flex items-center justify-center">

              <UserPlus className="h-8 w-8 text-red-700" />

            </div>

            <div>

              <h1 className="text-4xl font-bold">

                Register Patient

              </h1>

              <p className="text-muted-foreground mt-2">

                Add a new patient record

              </p>

            </div>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Input
                name="full_name"
                placeholder="Full Name"
                className="h-12 rounded-xl"
                onChange={handleChange}
                required
              />


              <Input
                name="email"
                placeholder="Email"
                className="h-12 rounded-xl"
                onChange={handleChange}
              />


              <Input
                name="phone"
                placeholder="Phone Number"
                className="h-12 rounded-xl"
                onChange={handleChange}
                required
              />


              <Input
                name="gender"
                placeholder="Gender"
                className="h-12 rounded-xl"
                onChange={handleChange}
                required
              />


              <Input
                name="blood_group"
                placeholder="Blood Group"
                className="h-12 rounded-xl"
                onChange={handleChange}
              />


              <Input
                name="age"
                placeholder="Age"
                type="number"
                className="h-12 rounded-xl"
                onChange={handleChange}
              />

            </div>


            <Input
              name="address"
              placeholder="Address"
              className="h-12 rounded-xl"
              onChange={handleChange}
            />


            <Input
              name="emergency_contact"
              placeholder="Emergency Contact"
              className="h-12 rounded-xl"
              onChange={handleChange}
            />


            <Button
              type="submit"
              className="w-full h-12 rounded-xl"
              disabled={loading}
            >

              {
                loading ? (

                  <Loader2 className="h-5 w-5 animate-spin" />

                ) : (

                  "Register Patient"
                )
              }

            </Button>

          </form>

        </Card>

      </div>

    </DashboardLayout>
  )
}