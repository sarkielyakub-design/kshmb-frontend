"use client"

import Link from "next/link"

import { useParams } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
  Building2,
  Stethoscope,
  Users,
  ArrowRight,
} from "lucide-react"

export default function ManageHospitalPage() {

  const params = useParams()

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-5xl font-black">

            Hospital Management

          </h1>

          <p className="text-slate-500 mt-3 text-lg">

            Manage departments and doctors

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Card className="rounded-3xl p-10">

            <Building2 className="h-12 w-12 text-blue-700 mb-6" />

            <h2 className="text-3xl font-black">

              Departments

            </h2>

            <p className="text-slate-500 mt-4">

              Manage hospital departments

            </p>

            <Link
              href={`/dashboard/hospitals/${params.id}/departments`}
            >

              <Button className="mt-8 rounded-2xl">

                Open Departments

                <ArrowRight className="ml-2 h-4 w-4" />

              </Button>

            </Link>

          </Card>

          <Card className="rounded-3xl p-10">

            <Stethoscope className="h-12 w-12 text-cyan-700 mb-6" />

            <h2 className="text-3xl font-black">

              Doctors

            </h2>

            <p className="text-slate-500 mt-4">

              Manage hospital doctors

            </p>

            <Link
              href={`/dashboard/hospitals/${params.id}/doctors`}
            >

              <Button className="mt-8 rounded-2xl">

                Open Doctors

                <ArrowRight className="ml-2 h-4 w-4" />

              </Button>

            </Link>

          </Card>

        </div>

      </div>

    </DashboardLayout>
  )
}