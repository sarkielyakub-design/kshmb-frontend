"use client"

import { useEffect, useMemo, useState } from "react"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"

import {
  Calendar,
  Clock3,
  HeartPulse,
  Loader2,
  Building2,
  UserRound,
} from "lucide-react"

import {
  createAppointment,
} from "@/services/appointment-service"

import {
  getHospitals,
  getDoctors,
} from "@/services/hospital-service"

import { toast } from "sonner"


export default function PublicAppointmentPage() {

  const [hospitals, setHospitals] =
    useState<any[]>([])

  const [doctors, setDoctors] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(false)

  const [fetching, setFetching] =
    useState(true)

  const [formData, setFormData] =
    useState({

      patient_name: "",

      patient_email: "",

      patient_phone: "",

      symptoms: "",

      appointment_date: "",

      appointment_time: "",

      hospital_id: "",

      doctor_id: "",
    })


  // =====================================
  // FETCH DATA
  // =====================================

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          setFetching(true)

          const hospitalData =
            await getHospitals()

          const doctorData =
            await getDoctors()

          setHospitals(hospitalData)

          setDoctors(doctorData)

        } catch {

          toast.error(
            "Failed to load hospitals and doctors"
          )

        } finally {

          setFetching(false)
        }
      }

    fetchData()

  }, [])


  // =====================================
  // FILTER DOCTORS BY HOSPITAL
  // =====================================

  const filteredDoctors =
    useMemo(() => {

      if (!formData.hospital_id)
        return []

      return doctors.filter(
        (doctor) =>
          Number(
            doctor.hospital_id
          ) ===
          Number(
            formData.hospital_id
          )
      )

    }, [
      doctors,
      formData.hospital_id
    ])


  // =====================================
  // HANDLE INPUT
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

  const handleSubmit =
    async () => {

      // VALIDATION

      if (
        !formData.patient_name ||
        !formData.patient_email ||
        !formData.patient_phone ||
        !formData.symptoms ||
        !formData.appointment_date ||
        !formData.appointment_time ||
        !formData.hospital_id ||
        !formData.doctor_id
      ) {

        toast.error(
          "Please fill all fields"
        )

        return
      }

      try {

        setLoading(true)

        const payload = {

          patient_name:
            formData.patient_name,

          patient_email:
            formData.patient_email,

          patient_phone:
            formData.patient_phone,

          symptoms:
            formData.symptoms,

          appointment_date:
            formData.appointment_date,

          appointment_time:
            formData.appointment_time,

          hospital_id:
            Number(
              formData.hospital_id
            ),

          doctor_id:
            Number(
              formData.doctor_id
            ),
        }

        const response =
          await createAppointment(
            payload
          )

        toast.success(
          response?.message ||
          "Appointment booked successfully"
        )

        // RESET FORM

        setFormData({

          patient_name: "",

          patient_email: "",

          patient_phone: "",

          symptoms: "",

          appointment_date: "",

          appointment_time: "",

          hospital_id: "",

          doctor_id: "",
        })

      } catch (error: any) {

        toast.error(

          error?.response?.data?.detail ||

          "Failed to book appointment"
        )

      } finally {

        setLoading(false)
      }
    }


  // =====================================
  // LOADING SCREEN
  // =====================================

  if (fetching) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-50">

        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />

      </div>
    )
  }


  return (

    <div className="min-h-screen bg-slate-50 py-20 px-6">

      <div className="max-w-5xl mx-auto">

        <Card className="rounded-[40px] overflow-hidden border-0 shadow-2xl">

          {/* HEADER */}

          <div className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 p-12 text-white">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              <div className="flex items-center gap-5">

                <div className="h-20 w-20 rounded-[28px] bg-white/10 backdrop-blur flex items-center justify-center">

                  <HeartPulse className="h-10 w-10" />

                </div>

                <div>

                  <h1 className="text-5xl font-black leading-tight">

                    Book Appointment

                  </h1>

                  <p className="text-blue-100 mt-4 text-lg">

                    Kano State Hospital Management Board
                    Enterprise Healthcare Platform

                  </p>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-white/10 rounded-2xl p-5 backdrop-blur">

                  <Calendar className="h-7 w-7 mb-3" />

                  <p className="text-sm text-blue-100">

                    Digital Booking

                  </p>

                </div>

                <div className="bg-white/10 rounded-2xl p-5 backdrop-blur">

                  <Clock3 className="h-7 w-7 mb-3" />

                  <p className="text-sm text-blue-100">

                    Real-time Queue

                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* FORM */}

          <div className="p-10 lg:p-14">

            {/* PERSONAL INFO */}

            <div className="mb-10">

              <h2 className="text-2xl font-bold mb-6">

                Patient Information

              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>

                  <Label>
                    Full Name
                  </Label>

                  <Input
                    name="patient_name"
                    value={
                      formData.patient_name
                    }
                    placeholder="Enter full name"
                    className="mt-2 h-14 rounded-2xl"
                    onChange={handleChange}
                  />

                </div>

                <div>

                  <Label>
                    Email Address
                  </Label>

                  <Input
                    type="email"
                    name="patient_email"
                    value={
                      formData.patient_email
                    }
                    placeholder="patient@email.com"
                    className="mt-2 h-14 rounded-2xl"
                    onChange={handleChange}
                  />

                </div>

                <div>

                  <Label>
                    Phone Number
                  </Label>

                  <Input
                    name="patient_phone"
                    value={
                      formData.patient_phone
                    }
                    placeholder="+234..."
                    className="mt-2 h-14 rounded-2xl"
                    onChange={handleChange}
                  />

                </div>

                <div>

                  <Label>
                    Appointment Date
                  </Label>

                  <Input
                    type="date"
                    name="appointment_date"
                    value={
                      formData.appointment_date
                    }
                    className="mt-2 h-14 rounded-2xl"
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>


            {/* SYMPTOMS */}

            <div className="mb-10">

              <Label>
                Symptoms / Medical Complaint
              </Label>

              <textarea
                name="symptoms"
                value={
                  formData.symptoms
                }
                placeholder="Describe your symptoms..."
                className="w-full mt-3 rounded-3xl border border-slate-300 p-6 h-40 outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />

            </div>


            {/* HOSPITAL + DOCTOR */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div>

                <Label>
                  Select Hospital
                </Label>

                <div className="relative">

                  <Building2 className="absolute left-4 top-5 h-5 w-5 text-slate-400" />

                  <select
                    name="hospital_id"
                    value={
                      formData.hospital_id
                    }
                    className="w-full h-14 rounded-2xl border border-slate-300 px-12 mt-2"
                    onChange={(e) => {

                      setFormData({

                        ...formData,

                        hospital_id:
                          e.target.value,

                        doctor_id: "",
                      })
                    }}
                  >

                    <option value="">
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

              </div>


              <div>

                <Label>
                  Select Doctor
                </Label>

                <div className="relative">

                  <UserRound className="absolute left-4 top-5 h-5 w-5 text-slate-400" />

                  <select
                    name="doctor_id"
                    value={
                      formData.doctor_id
                    }
                    className="w-full h-14 rounded-2xl border border-slate-300 px-12 mt-2"
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Doctor
                    </option>

                    {
                      filteredDoctors.map(
                        (doctor) => (

                          <option
                            key={doctor.id}
                            value={doctor.id}
                          >

                            Dr. {doctor.full_name}
                            {" - "}
                            {doctor.specialty}

                          </option>
                        )
                      )
                    }

                  </select>

                </div>

              </div>


              <div>

                <Label>
                  Appointment Time
                </Label>

                <Input
                  type="time"
                  name="appointment_time"
                  value={
                    formData.appointment_time
                  }
                  className="mt-2 h-14 rounded-2xl"
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* BUTTON */}

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-12 h-16 rounded-2xl bg-blue-700 hover:bg-blue-800 text-lg font-semibold"
            >

              {
                loading ? (

                  <div className="flex items-center gap-3">

                    <Loader2 className="h-5 w-5 animate-spin" />

                    Booking Appointment...

                  </div>

                ) : (

                  "Book Appointment"
                )
              }

            </Button>

          </div>

        </Card>

      </div>

    </div>
  )
}