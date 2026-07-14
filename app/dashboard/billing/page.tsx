"use client"

import { useEffect, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {

  CreditCard,

  BadgeDollarSign,

  Search,

  Loader2,

  Plus,

  Receipt,

  Wallet,

  Activity,

} from "lucide-react"

import {

  getInvoices,

  Invoice,

} from "@/services/billing-service"

import { toast } from "sonner"


export default function BillingPage() {

  const [invoices, setInvoices] =
    useState<Invoice[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")


  // =====================================
  // FETCH INVOICES
  // =====================================

  const fetchInvoices = async () => {

    try {

      const data =
        await getInvoices()

      setInvoices(data)

    } catch (error) {

      toast.error(
        "Failed to load invoices"
      )

    } finally {

      setLoading(false)
    }
  }


  useEffect(() => {

    fetchInvoices()

  }, [])


  // =====================================
  // FILTERED INVOICES
  // =====================================

  const filteredInvoices =
    invoices.filter((invoice) =>

      invoice.patient_name
        .toLowerCase()
        .includes(search.toLowerCase())
    )


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          <div>

            <div className="flex items-center gap-4">

              <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center">

                <CreditCard className="h-8 w-8 text-emerald-700" />

              </div>

              <div>

                <h1 className="text-4xl font-bold">

                  Billing Management

                </h1>

                <p className="text-muted-foreground mt-2">

                  Enterprise healthcare billing and financial operations

                </p>

              </div>

            </div>

          </div>


          <Button className="rounded-xl h-12 px-6">

            <Plus className="mr-2 h-5 w-5" />

            Create Invoice

          </Button>

        </div>


        {/* ANALYTICS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">

                  Total Revenue

                </p>

                <h2 className="text-4xl font-bold mt-3">

                  ₦48.2M

                </h2>

              </div>

              <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                <BadgeDollarSign className="h-7 w-7 text-emerald-700" />

              </div>

            </div>

          </Card>


          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">

                  Pending Payments

                </p>

                <h2 className="text-4xl font-bold mt-3">

                  ₦6.8M

                </h2>

              </div>

              <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center">

                <Wallet className="h-7 w-7 text-orange-700" />

              </div>

            </div>

          </Card>


          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">

                  Invoices

                </p>

                <h2 className="text-4xl font-bold mt-3">

                  1,284

                </h2>

              </div>

              <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                <Receipt className="h-7 w-7 text-blue-700" />

              </div>

            </div>

          </Card>


          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">

                  Transactions Today

                </p>

                <h2 className="text-4xl font-bold mt-3">

                  142

                </h2>

              </div>

              <div className="h-14 w-14 rounded-2xl bg-purple-100 flex items-center justify-center">

                <Activity className="h-7 w-7 text-purple-700" />

              </div>

            </div>

          </Card>

        </div>


        {/* SEARCH */}

        <Card className="p-6 rounded-3xl border-0 shadow-sm">

          <div className="relative">

            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

            <Input
              placeholder="Search invoices..."
              className="pl-12 h-12 rounded-xl"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </Card>


        {/* LOADING */}

        {
          loading && (

            <div className="flex items-center justify-center py-20">

              <Loader2 className="h-10 w-10 animate-spin text-slate-500" />

            </div>
          )
        }


        {/* INVOICES */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {
            filteredInvoices.map((invoice) => (

              <Card
                key={invoice.id}
                className="p-8 rounded-3xl border-0 shadow-sm hover:shadow-xl transition"
              >

                <div className="flex items-start justify-between gap-6">

                  <div>

                    <h2 className="text-2xl font-semibold">

                      {invoice.patient_name}

                    </h2>

                    <p className="text-emerald-600 mt-2 font-medium">

                      #{invoice.invoice_number}

                    </p>

                  </div>


                  <div
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      invoice.payment_status === "Paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >

                    {invoice.payment_status}

                  </div>

                </div>


                <div className="mt-8 space-y-4 text-muted-foreground">

                  <div className="flex items-center justify-between">

                    <span>
                      Amount
                    </span>

                    <span className="font-medium text-foreground">

                      ₦{invoice.amount}

                    </span>

                  </div>


                  <div className="flex items-center justify-between">

                    <span>
                      Payment Method
                    </span>

                    <span className="font-medium text-foreground">

                      {
                        invoice.payment_method ||
                        "N/A"
                      }

                    </span>

                  </div>


                  <div className="flex items-center justify-between">

                    <span>
                      Insurance
                    </span>

                    <span className="font-medium text-foreground">

                      {
                        invoice.insurance_provider ||
                        "None"
                      }

                    </span>

                  </div>

                </div>


                <div className="mt-10 flex gap-3">

                  <Button
                    variant="outline"
                    className="rounded-xl"
                  >

                    View Invoice

                  </Button>


                  <Button className="rounded-xl ml-auto">

                    Manage Payment

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