// services/admin-service.ts

import api from "@/lib/api"

export async function getAnalytics() {

  const response = await api.get(
    "/api/v1/admin/analytics"
  )

  return response.data
}