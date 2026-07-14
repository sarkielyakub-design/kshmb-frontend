"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { useParams } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
  Building2,
  Plus,
} from "lucide-react"

import {
  getDepartments,
} from "@/services/hospital-service"

export default function DepartmentsPage() {

  const params = useParams()

  const [departments, setDepartments] =
    useState<any[]>([])

  useEffect(() => {

    const fetchDepartments =
      async () => {

        const data =
          await getDepartments(
            Number(params.id)
          )

        setDepartments(data)
      }

    fetchDepartments()

  }, [params.id])

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-black">

              Departments

            </h1>

          </div>

          <Link
            href={`/dashboard/hospitals/${params.id}/departments/create`}
          >

            <Button className="rounded-2xl">

              <Plus className="mr-2 h-4 w-4" />

              Create Department

            </Button>

          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {
            departments.map((department) => (

              <Card
                key={department.id}
                className="rounded-3xl p-8"
              >

                <Building2 className="h-10 w-10 text-blue-700 mb-5" />

                <h2 className="text-2xl font-black">

                  {department.name}

                </h2>

              </Card>
            ))
          }

        </div>

      </div>

    </DashboardLayout>
  )
}