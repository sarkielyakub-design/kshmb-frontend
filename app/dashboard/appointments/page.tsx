"use client"

import { useEffect, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
  Calendar,
  Phone,
  Mail,
  User,
  Clock3,
  Activity,
} from "lucide-react"

import {
  getAppointments,
  updateAppointmentStatus,
} from "@/services/appointment-service"

import { toast } from "sonner"

export default function AppointmentsPage() {

  const [appointments, setAppointments] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  // =====================================
  // FETCH APPOINTMENTS
  // =====================================

  const fetchAppointments =
    async () => {

      try {

        const data =
          await getAppointments()

        setAppointments(data)

      } catch {

        toast.error(
          "Failed to load appointments"
        )

      } finally {

        setLoading(false)
      }
    }

  useEffect(() => {

    fetchAppointments()

  }, [])

  // =====================================
  // UPDATE STATUS
  // =====================================

  const handleStatus =
    async (
      appointmentId: number,
      status: string
    ) => {

      try {

        await updateAppointmentStatus(
          appointmentId,
          status
        )

        toast.success(
          "Appointment updated"
        )

        fetchAppointments()

      } catch {

        toast.error(
          "Failed to update appointment"
        )
      }
    }

  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div>

          <h1 className="text-5xl font-black">

            Appointments

          </h1>

          <p className="text-slate-500 text-lg mt-3">

            Manage patient appointments and schedules

          </p>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {
            appointments.map((appointment) => (

              <Card
                key={appointment.id}
                className="rounded-[30px] border border-slate-200 shadow-sm overflow-hidden"
              >

                <div className="h-2 bg-gradient-to-r from-blue-700 to-cyan-500" />

                <div className="p-8">

                  <div className="flex items-start justify-between">

                    <div>

                      <h2 className="text-2xl font-black">

                        {appointment.patient_name}

                      </h2>

                      <p className="text-slate-500 mt-2">

                        Queue No:
                        {" "}
                        #{appointment.queue_number}

                      </p>

                    </div>

                    <div
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        appointment.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : appointment.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      {appointment.status}

                    </div>

                  </div>

                  <div className="space-y-4 mt-8">

                    <div className="flex items-center gap-3 text-slate-600">

                      <Mail className="h-5 w-5 text-slate-400" />

                      <span>
                        {appointment.patient_email}
                      </span>

                    </div>

                    <div className="flex items-center gap-3 text-slate-600">

                      <Phone className="h-5 w-5 text-slate-400" />

                      <span>
                        {appointment.patient_phone}
                      </span>

                    </div>

                    <div className="flex items-center gap-3 text-slate-600">

                      <Calendar className="h-5 w-5 text-slate-400" />

                      <span>
                        {appointment.appointment_date}
                      </span>

                    </div>

                    <div className="flex items-center gap-3 text-slate-600">

                      <Clock3 className="h-5 w-5 text-slate-400" />

                      <span>
                        {appointment.appointment_time}
                      </span>

                    </div>

                    <div className="flex items-start gap-3 text-slate-600">

                      <Activity className="h-5 w-5 text-slate-400 mt-1" />

                      <span>
                        {appointment.symptoms}
                      </span>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="grid grid-cols-3 gap-3 mt-8">

                    <Button
                      className="rounded-2xl bg-yellow-500 hover:bg-yellow-600"
                      onClick={() =>
                        handleStatus(
                          appointment.id,
                          "pending"
                        )
                      }
                    >

                      Pending

                    </Button>

                    <Button
                      className="rounded-2xl bg-emerald-600 hover:bg-emerald-700"
                      onClick={() =>
                        handleStatus(
                          appointment.id,
                          "completed"
                        )
                      }
                    >

                      Complete

                    </Button>

                    <Button
                      className="rounded-2xl bg-red-600 hover:bg-red-700"
                      onClick={() =>
                        handleStatus(
                          appointment.id,
                          "cancelled"
                        )
                      }
                    >

                      Cancel

                    </Button>

                  </div>

                </div>

              </Card>
            ))
          }

        </div>

        {
          !loading &&
          appointments.length === 0 && (

            <Card className="rounded-3xl p-20 text-center">

              <User className="h-14 w-14 mx-auto text-slate-300" />

              <h2 className="text-3xl font-black mt-6">

                No Appointments Found

              </h2>

              <p className="text-slate-500 mt-3">

                Appointment records will appear here

              </p>

            </Card>
          )
        }

      </div>

    </DashboardLayout>
  )
}