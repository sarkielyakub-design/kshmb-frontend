"use client"

import { useEffect, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import {
  Ambulance,
  Phone,
  MapPin,
  User,
  Plus,
  Loader2,
  Activity,
} from "lucide-react"

import {
  getAmbulances,
  createAmbulance,
} from "@/services/emergency-service"

import { toast } from "sonner"

export default function AmbulancesPage() {

  const [ambulances, setAmbulances] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(false)

  const [creating, setCreating] =
    useState(false)

  const [formData, setFormData] =
    useState({

      vehicle_number: "",

      driver_name: "",

      driver_phone: "",

      current_location: "",

      latitude: 0,

      longitude: 0,
    })

  // =====================================
  // FETCH
  // =====================================

  const fetchAmbulances =
    async () => {

      try {

        setLoading(true)

        const data =
          await getAmbulances()

        setAmbulances(data)

      } catch {

        toast.error(
          "Failed to load ambulances"
        )

      } finally {

        setLoading(false)
      }
    }

  useEffect(() => {

    fetchAmbulances()

  }, [])

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
  // CREATE
  // =====================================

  const handleCreate =
    async () => {

      try {

        setCreating(true)

        await createAmbulance({

          ...formData,

          latitude:
            Number(formData.latitude),

          longitude:
            Number(formData.longitude),
        })

        toast.success(
          "Ambulance created successfully"
        )

        setFormData({

          vehicle_number: "",

          driver_name: "",

          driver_phone: "",

          current_location: "",

          latitude: 0,

          longitude: 0,
        })

        fetchAmbulances()

      } catch (error: any) {

        toast.error(

          error?.response?.data?.detail ||

          "Failed to create ambulance"
        )

      } finally {

        setCreating(false)
      }
    }

  return (

    <DashboardLayout>

      <div className="space-y-10">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-black">

              Ambulance Management

            </h1>

            <p className="text-slate-500 text-lg mt-3">

              Manage emergency response vehicles
              across Kano State.
            </p>

          </div>

          <div className="h-16 w-16 rounded-3xl bg-red-100 flex items-center justify-center">

            <Ambulance className="h-8 w-8 text-red-600" />

          </div>

        </div>

        {/* CREATE */}

        <Card className="rounded-[32px] border border-slate-200 p-10">

          <div className="flex items-center gap-3 mb-8">

            <Plus className="h-6 w-6 text-blue-700" />

            <h2 className="text-3xl font-black">

              Create Ambulance
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-3">

              <Label>
                Vehicle Number
              </Label>

              <Input
                name="vehicle_number"
                placeholder="AMB-001"
                className="h-14 rounded-2xl"
                value={formData.vehicle_number}
                onChange={handleChange}
              />

            </div>

            <div className="space-y-3">

              <Label>
                Driver Name
              </Label>

              <Input
                name="driver_name"
                placeholder="Driver full name"
                className="h-14 rounded-2xl"
                value={formData.driver_name}
                onChange={handleChange}
              />

            </div>

            <div className="space-y-3">

              <Label>
                Driver Phone
              </Label>

              <Input
                name="driver_phone"
                placeholder="08012345678"
                className="h-14 rounded-2xl"
                value={formData.driver_phone}
                onChange={handleChange}
              />

            </div>

            <div className="space-y-3">

              <Label>
                Current Location
              </Label>

              <Input
                name="current_location"
                placeholder="Kano Central"
                className="h-14 rounded-2xl"
                value={formData.current_location}
                onChange={handleChange}
              />

            </div>

            <div className="space-y-3">

              <Label>
                Latitude
              </Label>

              <Input
                type="number"
                name="latitude"
                className="h-14 rounded-2xl"
                value={formData.latitude}
                onChange={handleChange}
              />

            </div>

            <div className="space-y-3">

              <Label>
                Longitude
              </Label>

              <Input
                type="number"
                name="longitude"
                className="h-14 rounded-2xl"
                value={formData.longitude}
                onChange={handleChange}
              />

            </div>

          </div>

          <Button
            onClick={handleCreate}
            disabled={creating}
            className="mt-8 h-14 px-8 rounded-2xl"
          >

            {
              creating ? (

                <div className="flex items-center gap-3">

                  <Loader2 className="h-5 w-5 animate-spin" />

                  Creating...

                </div>

              ) : (

                "Create Ambulance"
              )
            }

          </Button>

        </Card>

        {/* LIST */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            loading ? (

              <div>
                Loading...
              </div>

            ) : (

              ambulances.map((ambulance) => (

                <Card
                  key={ambulance.id}
                  className="rounded-[30px] border border-slate-200 p-8"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h2 className="text-2xl font-black">

                        {ambulance.vehicle_number}

                      </h2>

                      <p className="text-slate-500 mt-2">

                        {ambulance.driver_name}
                      </p>

                    </div>

                    <Ambulance className="h-12 w-12 text-red-600" />

                  </div>

                  <div className="space-y-4 mt-8">

                    <div className="flex items-center gap-3">

                      <Phone className="h-5 w-5 text-slate-400" />

                      <span>
                        {ambulance.driver_phone}
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <MapPin className="h-5 w-5 text-slate-400" />

                      <span>
                        {ambulance.current_location}
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <Activity className="h-5 w-5 text-red-500" />

                      <span className="font-semibold text-red-600">

                        {ambulance.status}

                      </span>

                    </div>

                  </div>

                </Card>
              ))
            )
          }

        </div>

      </div>

    </DashboardLayout>
  )
}