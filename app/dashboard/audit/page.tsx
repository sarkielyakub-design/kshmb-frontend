"use client"

import { useEffect, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import {

  ShieldCheck,

  Search,

  Loader2,

  Activity,

  Globe,

  Clock3,

  UserRound,

} from "lucide-react"

import {

  getAuditLogs,

  AuditLog,

} from "@/services/audit-service"

import { toast } from "sonner"


export default function AuditLogsPage() {

  const [logs, setLogs] =
    useState<AuditLog[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")


  // =====================================
  // FETCH LOGS
  // =====================================

  const fetchLogs = async () => {

    try {

      const data =
        await getAuditLogs()

      setLogs(data)

    } catch (error) {

      toast.error(
        "Failed to load audit logs"
      )

    } finally {

      setLoading(false)
    }
  }


  useEffect(() => {

    fetchLogs()

  }, [])


  // =====================================
  // FILTER LOGS
  // =====================================

  const filteredLogs =
    logs.filter((log) =>

      log.user_email
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      log.module
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      log.action
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

                <ShieldCheck className="h-8 w-8 text-emerald-700" />

              </div>

              <div>

                <h1 className="text-4xl font-bold">

                  Audit Logs

                </h1>

                <p className="text-muted-foreground mt-2">

                  Enterprise security and activity monitoring system

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ANALYTICS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">

                  Total Logs

                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {logs.length}

                </h2>

              </div>

              <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                <Activity className="h-7 w-7 text-blue-700" />

              </div>

            </div>

          </Card>


          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">

                  Active Users

                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {
                    new Set(
                      logs.map(
                        (log) =>
                          log.user_email
                      )
                    ).size
                  }

                </h2>

              </div>

              <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                <UserRound className="h-7 w-7 text-emerald-700" />

              </div>

            </div>

          </Card>


          <Card className="p-6 rounded-3xl border-0 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">

                  Security Status

                </p>

                <h2 className="text-2xl font-bold mt-4 text-emerald-600">

                  Secure

                </h2>

              </div>

              <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center">

                <Globe className="h-7 w-7 text-orange-700" />

              </div>

            </div>

          </Card>

        </div>


        {/* SEARCH */}

        <Card className="p-6 rounded-3xl border-0 shadow-sm">

          <div className="relative">

            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

            <Input
              placeholder="Search audit logs..."
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


        {/* AUDIT LOGS */}

        <div className="space-y-5">

          {
            filteredLogs.map((log) => (

              <Card
                key={log.id}
                className="p-6 rounded-3xl border-0 shadow-sm hover:shadow-lg transition"
              >

                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                  <div className="space-y-4">

                    <div>

                      <h2 className="text-xl font-semibold">

                        {log.action}

                      </h2>

                      <p className="text-muted-foreground mt-1">

                        {log.description}

                      </p>

                    </div>


                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">

                      <div className="flex items-center gap-2">

                        <UserRound className="h-4 w-4" />

                        <span>

                          {log.user_email}

                        </span>

                      </div>


                      <div className="flex items-center gap-2">

                        <ShieldCheck className="h-4 w-4" />

                        <span>

                          {log.module}

                        </span>

                      </div>


                      <div className="flex items-center gap-2">

                        <Globe className="h-4 w-4" />

                        <span>

                          {log.ip_address}

                        </span>

                      </div>


                      <div className="flex items-center gap-2">

                        <Clock3 className="h-4 w-4" />

                        <span>

                          {log.created_at}

                        </span>

                      </div>

                    </div>

                  </div>


                  <div className="bg-slate-100 px-4 py-2 rounded-xl text-sm font-medium">

                    {log.action}

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