import { api } from "@/lib/api"


export interface DashboardAnalytics {

  hospitals: number

  doctors: number

  patients: number

  appointments: number

  emergency_cases: number

  invoices: number

  revenue: number
}


export async function getDashboardAnalytics()
: Promise<DashboardAnalytics> {

  const response = await api.get(
    "/api/v1/analytics/"
  )

  return response.data
}