"use client"

import { useEffect, useState } from "react"

import PublicLayout from "@/components/public/public-layout"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"

import { toast } from "sonner"

import {
  Building2,
  Users,
  ArrowRight,
} from "lucide-react"

import { getHospitals } from "@/services/hospital-service"

import { getDoctors } from "@/services/doctor-service"

import { joinQueue } from "@/services/queue-service"

export default function PublicQueuePage() {

  const [hospitals, setHospitals] =
    useState<any[]>([])

  const [doctors, setDoctors] =
    useState<any[]>([])

  const [filteredDoctors, setFilteredDoctors] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({

      patient_name: "",

      hospital_id: "",

      doctor_id: "",
    })

  // =====================================
  // FETCH DATA
  // =====================================

  useEffect(() => {

    fetchData()

  }, [])

  const fetchData = async () => {

    try {

      const hospitalData =
        await getHospitals()

      const doctorData =
        await getDoctors()

      setHospitals(hospitalData)

      setDoctors(doctorData)

    } catch {

      toast.error(
        "Failed to load queue data"
      )
    }
  }

  // =====================================
  // FILTER DOCTORS
  // =====================================

  useEffect(() => {

    if (formData.hospital_id) {

      const filtered =
        doctors.filter(
          (doctor) =>
            doctor.hospital_id ===
            Number(formData.hospital_id)
        )

      setFilteredDoctors(filtered)
    }

  }, [formData.hospital_id, doctors])

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit =
    async () => {

      try {

        setLoading(true)

        const response =
          await joinQueue({

            patient_name:
              formData.patient_name,

            hospital_id:
              Number(formData.hospital_id),

            doctor_id:
              Number(formData.doctor_id),
          })

        toast.success(
          `Queue booked successfully. Ticket #${response.ticket.queue_number}`
        )

        setFormData({

          patient_name: "",

          hospital_id: "",

          doctor_id: "",
        })

      } catch {

        toast.error(
          "Failed to join queue"
        )

      } finally {

        setLoading(false)
      }
    }

  return (

    <PublicLayout>

      <section className="py-24 bg-slate-50 min-h-screen">

        <div className="max-w-4xl mx-auto px-6">

          <Card className="rounded-[36px] p-10 border-0 shadow-xl">

            <div className="mb-10">

              <h1 className="text-5xl font-black">

                Hospital Queue Booking

              </h1>

              <p className="text-slate-500 mt-4 text-lg">

                Select hospital, department doctor and book queue instantly

              </p>

            </div>

            <div className="space-y-6">

              <div>

                <Label>
                  Patient Name
                </Label>

                <Input
                  className="h-14 rounded-2xl mt-2"
                  placeholder="Enter patient name"
                  value={formData.patient_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      patient_name:
                        e.target.value,
                    })
                  }
                />

              </div>

              <div>

                <Label>
                  Select Hospital
                </Label>

                <select
                  className="w-full h-14 rounded-2xl border border-slate-300 px-4 mt-2"
                  value={formData.hospital_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hospital_id:
                        e.target.value,
                    })
                  }
                >

                  <option value="">
                    Select Hospital
                  </option>

                  {
                    hospitals.map((hospital) => (

                      <option
                        key={hospital.id}
                        value={hospital.id}
                      >

                        {hospital.name}

                      </option>
                    ))
                  }

                </select>

              </div>

              <div>

                <Label>
                  Select Doctor
                </Label>

                <select
                  className="w-full h-14 rounded-2xl border border-slate-300 px-4 mt-2"
                  value={formData.doctor_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      doctor_id:
                        e.target.value,
                    })
                  }
                >

                  <option value="">
                    Select Doctor
                  </option>

                  {
                    filteredDoctors.map((doctor) => (

                      <option
                        key={doctor.id}
                        value={doctor.id}
                      >

                        {doctor.full_name}
                        {" - "}
                        {doctor.specialty}

                      </option>
                    ))
                  }

                </select>

              </div>

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-14 rounded-2xl text-lg"
              >

                {
                  loading
                    ? "Booking Queue..."
                    : "Join Queue"
                }

                <ArrowRight className="ml-2 h-5 w-5" />

              </Button>

            </div>

          </Card>

        </div>

      </section>

    </PublicLayout>
  )
}