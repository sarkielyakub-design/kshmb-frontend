"use client"

import { useEffect, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {
  FlaskConical,
  Plus,
  Search,
  TestTube,
  FileText,
  Activity,
} from "lucide-react"

import {
  getLabTests,
  getLabRequests,
} from "@/services/laboratory-service"

import Link from "next/link"

export default function LaboratoryPage() {

  const [tests, setTests] = useState<any[]>([])

  const [requests, setRequests] =
    useState<any[]>([])

  const [search, setSearch] =
    useState("")

  useEffect(() => {

    fetchData()

  }, [])

  const fetchData = async () => {

    try {

      const testsData =
        await getLabTests()

      const requestsData =
        await getLabRequests()

      setTests(testsData)

      setRequests(requestsData)

    } catch (error) {

      console.log(error)
    }
  }

  const filteredTests =
    tests.filter((test) =>
      test.test_name
        .toLowerCase()
        .includes(search.toLowerCase())
    )

  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-black">

              Laboratory System

            </h1>

            <p className="text-slate-500 mt-3">

              Manage laboratory tests and requests

            </p>

          </div>

          <Link href="/dashboard/laboratory/create">

            <Button className="h-12 rounded-2xl">

              <Plus className="mr-2 h-5 w-5" />

              Create Test

            </Button>

          </Link>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Card className="p-8 rounded-[30px]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">

                  Total Tests

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {tests.length}

                </h2>

              </div>

              <TestTube className="h-12 w-12 text-cyan-600" />

            </div>

          </Card>

          <Card className="p-8 rounded-[30px]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">

                  Requests

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {requests.length}

                </h2>

              </div>

              <FileText className="h-12 w-12 text-blue-600" />

            </div>

          </Card>

          <Card className="p-8 rounded-[30px]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">

                  Active Labs

                </p>

                <h2 className="text-5xl font-black mt-3">

                  12

                </h2>

              </div>

              <Activity className="h-12 w-12 text-emerald-600" />

            </div>

          </Card>

        </div>

        {/* SEARCH */}

        <Card className="p-6 rounded-[30px]">

          <div className="relative">

            <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

            <Input
              placeholder="Search laboratory tests..."
              className="pl-12 h-14 rounded-2xl"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </Card>

        {/* TESTS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            filteredTests.map((test) => (

              <Card
                key={test.id}
                className="rounded-[30px] p-8"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-black">

                      {test.test_name}

                    </h2>

                    <p className="text-slate-500 mt-2">

                      {test.category}

                    </p>

                  </div>

                  <FlaskConical className="h-10 w-10 text-cyan-600" />

                </div>

                <div className="mt-6">

                  <p className="text-slate-600">

                    {test.description}

                  </p>

                </div>

                <div className="mt-8 flex items-center justify-between">

                  <span className="text-3xl font-black">

                    ₦{test.price}

                  </span>

                  <Button className="rounded-xl">

                    Manage

                  </Button>

                </div>

              </Card>
            ))
          }

        </div>

      </div>

    </DashboardLayout>
  )
}