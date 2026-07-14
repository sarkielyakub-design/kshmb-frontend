"use client"

import { useEffect, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import {

  CalendarDays,

  Clock3,

  Loader2,

  Hospital,

  Stethoscope,

  User,

  Phone,

  Mail,

  FileText,

} from "lucide-react"

import {

  createAppointment,

} from "@/services/appointment-service"

import {

  getHospitals,

  getDepartments,

} from "@/services/hospital-service"

import {

  getDoctors,

} from "@/services/doctor-service"

import { toast } from "sonner"


export default function CreateAppointmentPage() {

  // =====================================
  // STATES
  // =====================================

  const [loading, setLoading] =
    useState(false)

  const [hospitals, setHospitals] =
    useState<any[]>([])

  const [departments, setDepartments] =
    useState<any[]>([])

  const [doctors, setDoctors] =
    useState<any[]>([])

  const [formData, setFormData] =
    useState({

      patient_name: "",

      patient_email: "",

      patient_phone: "",

      symptoms: "",

      appointment_date: "",

      appointment_time: "",

      hospital_id: "",

      department_id: "",

      doctor_id: "",
    })


  // =====================================
  // FETCH HOSPITALS
  // =====================================

  useEffect(() => {

    fetchHospitals()

  }, [])


  const fetchHospitals = async () => {

    try {

      const data =
        await getHospitals()

      setHospitals(data)

    } catch {

      toast.error(
        "Failed to load hospitals"
      )
    }
  }


  // =====================================
  // FETCH DEPARTMENTS
  // =====================================

  useEffect(() => {

    if (formData.hospital_id) {

      fetchDepartments(
        Number(formData.hospital_id)
      )

      fetchDoctors(
        Number(formData.hospital_id)
      )
    }

  }, [formData.hospital_id])


  const fetchDepartments =
    async (hospitalId: number) => {

      try {

        const data =
          await getDepartments(
            hospitalId
          )

        setDepartments(data)

      } catch {

        toast.error(
          "Failed to load departments"
        )
      }
    }


  // =====================================
  // FETCH DOCTORS
  // =====================================

  const fetchDoctors =
    async (hospitalId: number) => {

      try {

        const data =
          await getDoctors(
            hospitalId
          )

        setDoctors(data)

      } catch {

        toast.error(
          "Failed to load doctors"
        )
      }
    }


  // =====================================
  // FILTER DOCTORS BY DEPARTMENT
  // =====================================

  const filteredDoctors =
    doctors.filter((doctor) => {

      if (!formData.department_id)
        return true

      return (
        doctor.department_id ===
        Number(
          formData.department_id
        )
      )
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

  const handleSubmit =
    async () => {

      try {

        setLoading(true)

        await createAppointment({

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
        })

        toast.success(
          "Appointment created successfully"
        )

        setFormData({

          patient_name: "",

          patient_email: "",

          patient_phone: "",

          symptoms: "",

          appointment_date: "",

          appointment_time: "",

          hospital_id: "",

          department_id: "",

          doctor_id: "",
        })

      } catch (error: any) {

        toast.error(

          error?.response?.data?.detail ||

          "Failed to create appointment"
        )

      } finally {

        setLoading(false)
      }
    }


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div>

          <h1 className="text-5xl font-black tracking-tight">

            Create Appointment

          </h1>

          <p className="text-slate-500 mt-3 text-lg">

            Schedule hospital appointment
            for patient consultation

          </p>

        </div>


        {/* FORM */}

        <Card className="rounded-[32px] border-0 shadow-sm p-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* PATIENT NAME */}

            <div>

              <Label>
                Patient Name
              </Label>

              <div className="relative mt-2">

                <User className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <Input
                  name="patient_name"
                  value={
                    formData.patient_name
                  }
                  onChange={handleChange}
                  placeholder="Enter patient name"
                  className="h-14 rounded-2xl pl-12"
                />

              </div>

            </div>


            {/* EMAIL */}

            <div>

              <Label>
                Patient Email
              </Label>

              <div className="relative mt-2">

                <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <Input
                  type="email"
                  name="patient_email"
                  value={
                    formData.patient_email
                  }
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="h-14 rounded-2xl pl-12"
                />

              </div>

            </div>


            {/* PHONE */}

            <div>

              <Label>
                Phone Number
              </Label>

              <div className="relative mt-2">

                <Phone className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <Input
                  name="patient_phone"
                  value={
                    formData.patient_phone
                  }
                  onChange={handleChange}
                  placeholder="08000000000"
                  className="h-14 rounded-2xl pl-12"
                />

              </div>

            </div>


            {/* HOSPITAL */}

            <div>

              <Label>
                Hospital
              </Label>

              <div className="relative mt-2">

                <Hospital className="absolute left-4 top-4 h-5 w-5 text-slate-400 z-10" />

                <select
                  name="hospital_id"
                  value={
                    formData.hospital_id
                  }
                  onChange={handleChange}
                  className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-12"
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


            {/* DEPARTMENT */}

            <div>

              <Label>
                Department
              </Label>

              <select
                name="department_id"
                value={
                  formData.department_id
                }
                onChange={handleChange}
                className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-4 mt-2"
              >

                <option value="">
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


            {/* DOCTOR */}

            <div>

              <Label>
                Doctor
              </Label>

              <div className="relative mt-2">

                <Stethoscope className="absolute left-4 top-4 h-5 w-5 text-slate-400 z-10" />

                <select
                  name="doctor_id"
                  value={
                    formData.doctor_id
                  }
                  onChange={handleChange}
                  className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-12"
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

                          {doctor.full_name}

                        </option>
                      )
                    )
                  }

                </select>

              </div>

            </div>


            {/* DATE */}

            <div>

              <Label>
                Appointment Date
              </Label>

              <div className="relative mt-2">

                <CalendarDays className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <Input
                  type="date"
                  name="appointment_date"
                  value={
                    formData.appointment_date
                  }
                  onChange={handleChange}
                  className="h-14 rounded-2xl pl-12"
                />

              </div>

            </div>


            {/* TIME */}

            <div>

              <Label>
                Appointment Time
              </Label>

              <div className="relative mt-2">

                <Clock3 className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <Input
                  type="time"
                  name="appointment_time"
                  value={
                    formData.appointment_time
                  }
                  onChange={handleChange}
                  className="h-14 rounded-2xl pl-12"
                />

              </div>

            </div>

          </div>


          {/* SYMPTOMS */}

          <div className="mt-8">

            <Label>
              Symptoms / Notes
            </Label>

            <div className="relative mt-2">

              <FileText className="absolute left-4 top-5 h-5 w-5 text-slate-400" />

              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Describe symptoms..."
                className="w-full rounded-2xl border border-slate-200 p-5 pl-12 h-40 resize-none"
              />

            </div>

          </div>


          {/* BUTTON */}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-10 h-14 rounded-2xl px-8 text-base"
          >

            {
              loading ? (

                <div className="flex items-center gap-2">

                  <Loader2 className="h-5 w-5 animate-spin" />

                  Creating Appointment...

                </div>

              ) : (

                "Create Appointment"
              )
            }

          </Button>

        </Card>

      </div>

    </DashboardLayout>
  )
}