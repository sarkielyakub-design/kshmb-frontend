"use client"

import { useEffect, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {

  Users,

  Clock3,

  CheckCircle2,

} from "lucide-react"

import {

  getQueue,

  updateQueueStatus,

} from "@/services/queue-service"

import { toast } from "sonner"

export default function QueueDashboardPage() {

  const [queue, setQueue] =
    useState<any[]>([])

  const fetchQueue =
    async () => {

      try {

        const data =
          await getQueue()

        setQueue(data)

      } catch {

        toast.error(
          "Failed to fetch queue"
        )
      }
    }

  useEffect(() => {

    fetchQueue()

  }, [])

  const handleStatus =
    async (
      ticketId: number,
      status: string
    ) => {

      try {

        await updateQueueStatus(
          ticketId,
          status
        )

        toast.success(
          "Queue updated"
        )

        fetchQueue()

      } catch {

        toast.error(
          "Failed to update queue"
        )
      }
    }

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-5xl font-black">

            Queue Management

          </h1>

          <p className="text-slate-500 mt-3">

            Live hospital patient queue system

          </p>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {
            queue.map((ticket) => (

              <Card
                key={ticket.id}
                className="rounded-[32px] p-8"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-slate-500">

                      Queue Number

                    </p>

                    <h2 className="text-6xl font-black mt-2">

                      #{ticket.queue_number}

                    </h2>

                  </div>

                  <Users className="h-12 w-12 text-cyan-600" />

                </div>

                <div className="mt-8 space-y-3">

                  <p>

                    <span className="font-semibold">

                      Patient:
                    </span>

                    {" "}
                    {ticket.patient_name}

                  </p>

                  <p>

                    <span className="font-semibold">

                      Status:
                    </span>

                    {" "}
                    {ticket.status}

                  </p>

                </div>

                <div className="flex gap-3 mt-8">

                  <Button
                    onClick={() =>
                      handleStatus(
                        ticket.id,
                        "IN_PROGRESS"
                      )
                    }
                    className="rounded-xl"
                  >

                    <Clock3 className="mr-2 h-4 w-4" />

                    In Progress

                  </Button>

                  <Button
                    onClick={() =>
                      handleStatus(
                        ticket.id,
                        "COMPLETED"
                      )
                    }
                    className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                  >

                    <CheckCircle2 className="mr-2 h-4 w-4" />

                    Completed

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