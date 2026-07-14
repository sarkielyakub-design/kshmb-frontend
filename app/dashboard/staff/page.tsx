"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {

  Users,

  Plus,

  Phone,

} from "lucide-react"

import {

  getStaff,

  Staff,

} from "@/services/staff-service"


export default function StaffPage() {

  const [staff, setStaff] =
    useState<Staff[]>([])


  useEffect(() => {

    fetchStaff()

  }, [])


  const fetchStaff = async () => {

    const data =
      await getStaff()

    setStaff(data)
  }


  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">

              Staff Management

            </h1>

          </div>


          <Link href="/dashboard/staff/create">

            <Button className="rounded-xl">

              <Plus className="mr-2 h-5 w-5" />

              Add Staff

            </Button>

          </Link>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            staff.map((member) => (

              <Card
                key={member.id}
                className="p-6 rounded-3xl border-0 shadow-sm"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-semibold">

                      {member.full_name}

                    </h2>

                    <p className="text-muted-foreground">

                      {member.role}

                    </p>

                  </div>


                  <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                    <Users className="h-7 w-7 text-blue-700" />

                  </div>

                </div>


                <div className="mt-6 space-y-3">

                  <p>

                    Department:
                    {" "}
                    <strong>
                      {member.department}
                    </strong>

                  </p>

                  <p>

                    Shift:
                    {" "}
                    <strong>
                      {member.shift}
                    </strong>

                  </p>

                  <div className="flex items-center gap-2">

                    <Phone className="h-4 w-4" />

                    {member.phone}

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