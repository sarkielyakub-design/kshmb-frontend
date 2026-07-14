"use client"

import { useState } from "react"

import {
  Ambulance,
  Phone,
  MapPin,
  AlertTriangle,
  Loader2,
} from "lucide-react"

import { toast } from "sonner"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"

import {
  createEmergencyRequest,
} from "@/services/emergency-service"

export default function EmergencyPage() {

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({

      patient_name: "",

      phone: "",

      emergency_type: "",

      pickup_location: "",
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
  // SUBMIT
  // =====================================

  const handleSubmit =
    async () => {

      try {

        setLoading(true)

        await createEmergencyRequest(
          formData
        )

        toast.success(
          "Emergency request submitted"
        )

        setFormData({

          patient_name: "",

          phone: "",

          emergency_type: "",

          pickup_location: "",
        })

      } catch (error: any) {

        toast.error(

          error?.response?.data?.detail ||

          "Failed to submit emergency request"
        )
      } finally {

        setLoading(false)
      }
    }

  return (

    <div className="min-h-screen bg-slate-50 py-20 px-6">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-3 bg-red-100 text-red-700 px-5 py-3 rounded-full text-sm font-semibold">

            <AlertTriangle className="h-5 w-5" />

            Emergency Healthcare Service

          </div>

          <h1 className="text-5xl font-black text-slate-900 mt-8">

            Emergency Ambulance Request

          </h1>

          <p className="text-slate-600 text-lg mt-5 leading-relaxed">

            Submit emergency requests directly to
            Kano State Hospital Management Board
            emergency response center.
          </p>

        </div>

        {/* FORM */}

        <Card className="rounded-[32px] border border-slate-200 shadow-xl p-10">

          <div className="space-y-6">

            {/* PATIENT */}

            <div className="space-y-3">

              <Label>
                Patient Name
              </Label>

              <Input
                name="patient_name"
                placeholder="Enter patient name"
                className="h-14 rounded-2xl"
                value={formData.patient_name}
                onChange={handleChange}
              />

            </div>

            {/* PHONE */}

            <div className="space-y-3">

              <Label>
                Phone Number
              </Label>

              <div className="relative">

                <Phone className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <Input
                  name="phone"
                  placeholder="08012345678"
                  className="h-14 rounded-2xl pl-12"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* EMERGENCY TYPE */}

            <div className="space-y-3">

              <Label>
                Emergency Type
              </Label>

              <Input
                name="emergency_type"
                placeholder="Accident, Cardiac Emergency..."
                className="h-14 rounded-2xl"
                value={formData.emergency_type}
                onChange={handleChange}
              />

            </div>

            {/* LOCATION */}

            <div className="space-y-3">

              <Label>
                Pickup Location
              </Label>

              <div className="relative">

                <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <Input
                  name="pickup_location"
                  placeholder="Enter emergency location"
                  className="h-14 rounded-2xl pl-12"
                  value={formData.pickup_location}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* BUTTON */}

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-lg"
            >

              {
                loading ? (

                  <div className="flex items-center gap-3">

                    <Loader2 className="h-5 w-5 animate-spin" />

                    Submitting Emergency...

                  </div>

                ) : (

                  <div className="flex items-center gap-3">

                    <Ambulance className="h-5 w-5" />

                    Request Emergency Ambulance

                  </div>
                )
              }

            </Button>

          </div>

        </Card>

      </div>

    </div>
  )
}