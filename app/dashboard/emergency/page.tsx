"use client"

import { useEffect, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import {
  Ambulance,
  MapPin,
  Phone,
  Activity,
  Plus,
  AlertTriangle,
} from "lucide-react"

import {
  getEmergencyRequests,
  getAmbulances,
  dispatchAmbulance,
  createEmergencyRequest,
  createAmbulance,
} from "@/services/emergency-service"

import { toast } from "sonner"

export default function EmergencyDashboardPage() {

  const [requests, setRequests] =
    useState<any[]>([])

  const [ambulances, setAmbulances] =
    useState<any[]>([])

  // =====================================
  // EMERGENCY FORM
  // =====================================

  const [patientName, setPatientName] =
    useState("")

  const [phone, setPhone] =
    useState("")

  const [emergencyType, setEmergencyType] =
    useState("")

  const [pickupLocation, setPickupLocation] =
    useState("")

  // =====================================
  // AMBULANCE FORM
  // =====================================

  const [vehicleNumber, setVehicleNumber] =
    useState("")

  const [driverName, setDriverName] =
    useState("")

  const [driverPhone, setDriverPhone] =
    useState("")

  const [currentLocation, setCurrentLocation] =
    useState("")

  // =====================================
  // FETCH DATA
  // =====================================

  const fetchData =
    async () => {

      try {

        const emergencyData =
          await getEmergencyRequests()

        const ambulanceData =
          await getAmbulances()

        setRequests(emergencyData)

        setAmbulances(ambulanceData)

      } catch {

        toast.error(
          "Failed to fetch emergency data"
        )
      }
    }

  // =====================================
  // WEBSOCKET
  // =====================================

  useEffect(() => {

    fetchData()

    const socket =
      new WebSocket(
        "ws://127.0.0.1:8000/ws/emergency"
      )

    socket.onmessage = (
      event
    ) => {

      toast.success(
        event.data
      )

      fetchData()
    }

    return () => {

      socket.close()
    }

  }, [])

  // =====================================
  // CREATE EMERGENCY
  // =====================================

  const handleCreateEmergency =
    async () => {

      try {

        await createEmergencyRequest({

          patient_name:
            patientName,

          phone,

          emergency_type:
            emergencyType,

          pickup_location:
            pickupLocation,
        })

        toast.success(
          "Emergency request created"
        )

        setPatientName("")
        setPhone("")
        setEmergencyType("")
        setPickupLocation("")

        fetchData()

      } catch {

        toast.error(
          "Failed to create emergency"
        )
      }
    }

  // =====================================
  // CREATE AMBULANCE
  // =====================================

  const handleCreateAmbulance =
    async () => {

      try {

        await createAmbulance({

          vehicle_number:
            vehicleNumber,

          driver_name:
            driverName,

          driver_phone:
            driverPhone,

          current_location:
            currentLocation,

          latitude: 0,

          longitude: 0,
        })

        toast.success(
          "Ambulance created"
        )

        setVehicleNumber("")
        setDriverName("")
        setDriverPhone("")
        setCurrentLocation("")

        fetchData()

      } catch {

        toast.error(
          "Failed to create ambulance"
        )
      }
    }

  // =====================================
  // DISPATCH
  // =====================================

  const handleDispatch =
    async (
      requestId: number,
      ambulanceId: number
    ) => {

      try {

        await dispatchAmbulance(

          requestId,

          {
            ambulance_id:
              ambulanceId,

            status:
              "DISPATCHED",
          }
        )

        toast.success(
          "Ambulance dispatched"
        )

        fetchData()

      } catch {

        toast.error(
          "Dispatch failed"
        )
      }
    }

  return (

    <DashboardLayout>

      <div className="space-y-10">

        {/* HEADER */}

        <div>

          <h1 className="text-5xl font-black">

            Emergency Response

          </h1>

          <p className="text-slate-500 mt-3 text-lg">

            Real-time ambulance and emergency coordination
          </p>

        </div>

        {/* CREATE SECTION */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* CREATE EMERGENCY */}

          <Card className="rounded-[32px] border border-slate-200 p-8">

            <div className="flex items-center gap-3 mb-8">

              <AlertTriangle className="h-7 w-7 text-red-600" />

              <h2 className="text-3xl font-black">

                Create Emergency
              </h2>

            </div>

            <div className="space-y-5">

              <div>

                <Label>
                  Patient Name
                </Label>

                <Input
                  className="h-12 rounded-2xl mt-2"
                  value={patientName}
                  onChange={(e) =>
                    setPatientName(e.target.value)
                  }
                />

              </div>

              <div>

                <Label>
                  Phone
                </Label>

                <Input
                  className="h-12 rounded-2xl mt-2"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                />

              </div>

              <div>

                <Label>
                  Emergency Type
                </Label>

                <Input
                  className="h-12 rounded-2xl mt-2"
                  value={emergencyType}
                  onChange={(e) =>
                    setEmergencyType(e.target.value)
                  }
                />

              </div>

              <div>

                <Label>
                  Pickup Location
                </Label>

                <Input
                  className="h-12 rounded-2xl mt-2"
                  value={pickupLocation}
                  onChange={(e) =>
                    setPickupLocation(e.target.value)
                  }
                />

              </div>

              <Button
                onClick={
                  handleCreateEmergency
                }
                className="w-full h-12 rounded-2xl bg-red-600 hover:bg-red-700"
              >

                <Plus className="mr-2 h-5 w-5" />

                Create Emergency

              </Button>

            </div>

          </Card>

          {/* CREATE AMBULANCE */}

          <Card className="rounded-[32px] border border-slate-200 p-8">

            <div className="flex items-center gap-3 mb-8">

              <Ambulance className="h-7 w-7 text-blue-700" />

              <h2 className="text-3xl font-black">

                Create Ambulance
              </h2>

            </div>

            <div className="space-y-5">

              <div>

                <Label>
                  Vehicle Number
                </Label>

                <Input
                  className="h-12 rounded-2xl mt-2"
                  value={vehicleNumber}
                  onChange={(e) =>
                    setVehicleNumber(e.target.value)
                  }
                />

              </div>

              <div>

                <Label>
                  Driver Name
                </Label>

                <Input
                  className="h-12 rounded-2xl mt-2"
                  value={driverName}
                  onChange={(e) =>
                    setDriverName(e.target.value)
                  }
                />

              </div>

              <div>

                <Label>
                  Driver Phone
                </Label>

                <Input
                  className="h-12 rounded-2xl mt-2"
                  value={driverPhone}
                  onChange={(e) =>
                    setDriverPhone(e.target.value)
                  }
                />

              </div>

              <div>

                <Label>
                  Current Location
                </Label>

                <Input
                  className="h-12 rounded-2xl mt-2"
                  value={currentLocation}
                  onChange={(e) =>
                    setCurrentLocation(e.target.value)
                  }
                />

              </div>

              <Button
                onClick={
                  handleCreateAmbulance
                }
                className="w-full h-12 rounded-2xl"
              >

                <Plus className="mr-2 h-5 w-5" />

                Create Ambulance

              </Button>

            </div>

          </Card>

        </div>

        {/* REQUESTS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {
            requests.map((request) => (

              <Card
                key={request.id}
                className="rounded-[32px] border border-slate-200 overflow-hidden shadow-sm"
              >

                <div className="h-2 bg-gradient-to-r from-red-600 to-orange-500" />

                <div className="p-8">

                  <div className="flex items-center justify-between">

                    <div>

                      <h2 className="text-2xl font-black">

                        {request.patient_name}

                      </h2>

                      <p className="text-red-600 font-semibold mt-2">

                        {request.emergency_type}

                      </p>

                    </div>

                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">

                      {request.status}
                    </div>

                  </div>

                  <div className="space-y-4 mt-8">

                    <div className="flex items-center gap-3 text-slate-600">

                      <Phone className="h-5 w-5 text-slate-400" />

                      <span>
                        {request.phone}
                      </span>

                    </div>

                    <div className="flex items-center gap-3 text-slate-600">

                      <MapPin className="h-5 w-5 text-slate-400" />

                      <span>
                        {request.pickup_location}
                      </span>

                    </div>

                  </div>

                  <div className="mt-8">

                    <select
                      className="w-full h-14 rounded-2xl border border-slate-300 px-4"
                      onChange={(e) =>
                        handleDispatch(
                          request.id,
                          Number(e.target.value)
                        )
                      }
                    >

                      <option>
                        Dispatch Ambulance
                      </option>

                      {
                        ambulances.map(
                          (ambulance) => (

                            <option
                              key={ambulance.id}
                              value={ambulance.id}
                            >

                              {ambulance.vehicle_number}
                              {" - "}
                              {ambulance.driver_name}

                            </option>
                          )
                        )
                      }

                    </select>

                  </div>

                </div>

              </Card>
            ))
          }

        </div>

      </div>

    </DashboardLayout>
  )
}