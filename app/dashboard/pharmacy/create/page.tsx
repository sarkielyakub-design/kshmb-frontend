"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

import { toast } from "sonner"

import { createMedicine } from "@/services/pharmacy-service"

export default function CreateMedicinePage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({

      name: "",

      category: "",

      manufacturer: "",

      supplier: "",

      quantity: "",

      unit_price: "",

      expiry_date: "",
    })

  const handleChange = (
    e: any
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    })
  }

  const handleSubmit =
    async () => {

      try {

        setLoading(true)

        await createMedicine({

          ...formData,

          quantity:
            Number(formData.quantity),

          unit_price:
            Number(formData.unit_price),
        })

        toast.success(
          "Medicine created"
        )

        router.push(
          "/dashboard/pharmacy"
        )

      } catch {

        toast.error(
          "Failed to create medicine"
        )

      } finally {

        setLoading(false)
      }
    }

  return (

    <DashboardLayout>

      <div className="max-w-3xl mx-auto">

        <Card className="rounded-[32px] p-10">

          <h1 className="text-4xl font-black">

            Create Medicine

          </h1>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div>

              <Label>
                Medicine Name
              </Label>

              <Input
                name="name"
                className="h-12 rounded-xl mt-2"
                onChange={handleChange}
              />

            </div>

            <div>

              <Label>
                Category
              </Label>

              <Input
                name="category"
                className="h-12 rounded-xl mt-2"
                onChange={handleChange}
              />

            </div>

            <div>

              <Label>
                Manufacturer
              </Label>

              <Input
                name="manufacturer"
                className="h-12 rounded-xl mt-2"
                onChange={handleChange}
              />

            </div>

            <div>

              <Label>
                Supplier
              </Label>

              <Input
                name="supplier"
                className="h-12 rounded-xl mt-2"
                onChange={handleChange}
              />

            </div>

            <div>

              <Label>
                Quantity
              </Label>

              <Input
                type="number"
                name="quantity"
                className="h-12 rounded-xl mt-2"
                onChange={handleChange}
              />

            </div>

            <div>

              <Label>
                Unit Price
              </Label>

              <Input
                type="number"
                name="unit_price"
                className="h-12 rounded-xl mt-2"
                onChange={handleChange}
              />

            </div>

            <div className="md:col-span-2">

              <Label>
                Expiry Date
              </Label>

              <Input
                type="date"
                name="expiry_date"
                className="h-12 rounded-xl mt-2"
                onChange={handleChange}
              />

            </div>

          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-14 rounded-2xl mt-10"
          >

            {
              loading
                ? "Creating..."
                : "Create Medicine"
            }

          </Button>

        </Card>

      </div>

    </DashboardLayout>
  )
}