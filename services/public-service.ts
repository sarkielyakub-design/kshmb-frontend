import { api } from "@/lib/api"


export interface PublicStats {

  hospitals: number

  doctors: number

  patients: number

  appointments: number
}


export async function getPublicStats()
: Promise<PublicStats> {

  const response = await api.get(
    "/public/stats"
  )

  return response.data
}