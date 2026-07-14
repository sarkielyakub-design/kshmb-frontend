"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {

  Bed,

  Plus,

} from "lucide-react"

import {

  getBedSpaces,

  BedSpace,

} from "@/services/bedspace-service"


export default function BedSpacesPage() {

  const [beds, setBeds] =
    useState<BedSpace[]>([])


  useEffect(() => {

    fetchBeds()

  }, [])


  const fetchBeds = async () => {

    const data =
      await getBedSpaces()

    setBeds(data)
  }


  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <h1 className="text-4xl font-bold">

            Bed Spaces

          </h1>


          <Link href="/dashboard/bedspaces/create">

            <Button className="rounded-xl">

              <Plus className="mr-2 h-5 w-5" />

              Add Bed Space

            </Button>

          </Link>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            beds.map((bed) => (

              <Card
                key={bed.id}
                className="p-6 rounded-3xl border-0 shadow-sm"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-semibold">

                      {bed.ward_name}

                    </h2>

                    <p className="text-muted-foreground">

                      Bed #{bed.bed_number}

                    </p>

                  </div>


                  <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                    <Bed className="h-7 w-7 text-emerald-700" />

                  </div>

                </div>


                <div className="mt-6 space-y-3">

                  <p>

                    Category:
                    {" "}
                    <strong>
                      {bed.category}
                    </strong>

                  </p>

                  <p>

                    Status:
                    {" "}
                    <strong>

                      {
                        bed.occupied
                          ? "Occupied"
                          : "Available"
                      }

                    </strong>

                  </p>

                  <p>

                    Patient:
                    {" "}

                    {
                      bed.patient_name ||
                      "No patient assigned"
                    }

                  </p>

                </div>

              </Card>
            ))
          }

        </div>

      </div>

    </DashboardLayout>
  )
}