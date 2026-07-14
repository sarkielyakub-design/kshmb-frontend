"use client"

import { useEffect, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {
  Pill,
  AlertTriangle,
  ShoppingCart,
  Activity,
  Search,
  Plus,
} from "lucide-react"

import Link from "next/link"

import {
  getMedicines,
  getLowStockMedicines,
  getPharmacyAnalytics,
} from "@/services/pharmacy-service"

export default function PharmacyPage() {

  const [medicines, setMedicines] =
    useState<any[]>([])

  const [lowStock, setLowStock] =
    useState<any[]>([])

  const [analytics, setAnalytics] =
    useState<any>(null)

  const [search, setSearch] =
    useState("")

  useEffect(() => {

    fetchData()

  }, [])

  const fetchData = async () => {

    try {

      const medicinesData =
        await getMedicines()

      const lowStockData =
        await getLowStockMedicines()

      const analyticsData =
        await getPharmacyAnalytics()

      setMedicines(medicinesData)

      setLowStock(lowStockData)

      setAnalytics(analyticsData)

    } catch (error) {

      console.log(error)
    }
  }

  const filteredMedicines =
    medicines.filter((medicine) =>
      medicine.name
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

              Pharmacy System

            </h1>

            <p className="text-slate-500 mt-3">

              Enterprise medicine inventory and pharmacy sales

            </p>

          </div>

          <Link href="/dashboard/pharmacy/create">

            <Button className="rounded-2xl h-12">

              <Plus className="mr-2 h-5 w-5" />

              Add Medicine

            </Button>

          </Link>

        </div>

        {/* ANALYTICS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Card className="p-8 rounded-[30px]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">

                  Medicines

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {analytics?.total_medicines || 0}

                </h2>

              </div>

              <Pill className="h-12 w-12 text-cyan-600" />

            </div>

          </Card>

          <Card className="p-8 rounded-[30px]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">

                  Total Sales

                </p>

                <h2 className="text-5xl font-black mt-3">

                  ₦{analytics?.total_sales || 0}

                </h2>

              </div>

              <ShoppingCart className="h-12 w-12 text-emerald-600" />

            </div>

          </Card>

          <Card className="p-8 rounded-[30px]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">

                  Inventory Value

                </p>

                <h2 className="text-5xl font-black mt-3">

                  ₦{analytics?.inventory_value || 0}

                </h2>

              </div>

              <Activity className="h-12 w-12 text-blue-600" />

            </div>

          </Card>

        </div>

        {/* SEARCH */}

        <Card className="p-6 rounded-[30px]">

          <div className="relative">

            <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

            <Input
              placeholder="Search medicines..."
              className="pl-12 h-14 rounded-2xl"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </Card>

        {/* LOW STOCK */}

        {
          lowStock.length > 0 && (

            <Card className="p-8 rounded-[30px] border-red-200 bg-red-50">

              <div className="flex items-center gap-3 mb-6">

                <AlertTriangle className="h-7 w-7 text-red-600" />

                <h2 className="text-3xl font-black text-red-700">

                  Low Stock Alerts

                </h2>

              </div>

              <div className="space-y-4">

                {
                  lowStock.map((medicine) => (

                    <div
                      key={medicine.id}
                      className="flex items-center justify-between bg-white rounded-2xl p-5"
                    >

                      <div>

                        <h3 className="font-bold text-lg">

                          {medicine.name}

                        </h3>

                        <p className="text-slate-500">

                          {medicine.category}

                        </p>

                      </div>

                      <span className="text-red-600 font-black text-xl">

                        {medicine.quantity} Left

                      </span>

                    </div>
                  ))
                }

              </div>

            </Card>
          )
        }

        {/* MEDICINES */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            filteredMedicines.map((medicine) => (

              <Card
                key={medicine.id}
                className="rounded-[30px] p-8"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-black">

                      {medicine.name}

                    </h2>

                    <p className="text-slate-500 mt-2">

                      {medicine.category}

                    </p>

                  </div>

                  <Pill className="h-10 w-10 text-cyan-600" />

                </div>

                <div className="space-y-3 mt-8">

                  <p>

                    <span className="font-semibold">

                      Manufacturer:
                    </span>

                    {" "}
                    {medicine.manufacturer}

                  </p>

                  <p>

                    <span className="font-semibold">

                      Supplier:
                    </span>

                    {" "}
                    {medicine.supplier}

                  </p>

                  <p>

                    <span className="font-semibold">

                      Quantity:
                    </span>

                    {" "}
                    {medicine.quantity}

                  </p>

                </div>

                <div className="mt-8 flex items-center justify-between">

                  <span className="text-3xl font-black">

                    ₦{medicine.unit_price}

                  </span>

                  <Link
                    href={`/dashboard/pharmacy/${medicine.id}`}
                  >

                    <Button className="rounded-xl">

                      Manage

                    </Button>

                  </Link>

                </div>

              </Card>
            ))
          }

        </div>

      </div>

    </DashboardLayout>
  )
}