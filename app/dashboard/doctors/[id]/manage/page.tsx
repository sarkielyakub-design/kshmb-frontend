"use client"

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import {

  getDoctorById

} from "@/services/doctor-service"


export default function DoctorDetailsPage() {

  const params = useParams()

  const [doctor, setDoctor] =
    useState<any>(null)

  useEffect(() => {

    fetchDoctor()

  }, [])

  const fetchDoctor =
    async () => {

      const data =
        await getDoctorById(
          Number(params.id)
        )

      setDoctor(data)
    }

  if (!doctor) {

    return null
  }

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <Card className="rounded-3xl p-10">

          <h1 className="text-5xl font-black">

            {doctor.full_name}

          </h1>

          <p className="text-blue-600 mt-4 text-xl">

            {doctor.specialty}

          </p>

          <div className="space-y-4 mt-10">

            <p>

              <strong>Email:</strong>{" "}

              {doctor.email}

            </p>

            <p>

              <strong>Phone:</strong>{" "}

              {doctor.phone}

            </p>

            <p>

              <strong>Qualification:</strong>{" "}

              {doctor.qualification}

            </p>

            <p>

              <strong>Experience:</strong>{" "}

              {doctor.experience}

            </p>

            <p>

              <strong>Availability:</strong>{" "}

              {doctor.availability}

            </p>

            <p>

              <strong>Hospital:</strong>{" "}

              {doctor.hospital?.name}

            </p>

          </div>

        </Card>

      </div>

    </DashboardLayout>
  )
}