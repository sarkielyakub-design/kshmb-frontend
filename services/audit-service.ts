import { api } from "@/lib/api"


// =====================================
// TYPES
// =====================================

export interface AuditLog {

  id: number

  user_email: string

  action: string

  module: string

  ip_address: string

  description: string

  created_at?: string
}


// =====================================
// GET AUDIT LOGS
// =====================================

export async function getAuditLogs()
: Promise<AuditLog[]> {

  const response = await api.get(
    "/audit"
  )

  return response.data
}