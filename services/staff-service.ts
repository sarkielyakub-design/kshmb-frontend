import { api } from "@/lib/api"

// =====================================
// TYPES
// =====================================

export interface Staff {

  id: number

  hospital_id: number

  full_name: string

  email?: string

  phone: string

  role: string

  department?: string

  shift?: string

  status?: string

  created_at?: string
}


export interface CreateStaffPayload {

  hospital_id: number

  full_name: string

  email?: string

  phone: string

  role: string

  department?: string

  shift?: string
}


// =====================================
// GET ALL STAFF
// =====================================

export async function getStaff()
: Promise<Staff[]> {

  const response = await api.get(
    "/api/v1/staff"
  )

  return response.data
}


// =====================================
// GET HOSPITAL STAFF
// =====================================

export async function getHospitalStaff(

  hospitalId: number

): Promise<Staff[]> {

  const response = await api.get(

    `/api/v1/staff/hospital/${hospitalId}`

  )

  return response.data
}


// =====================================
// CREATE STAFF
// =====================================

export async function createStaff(

  payload: CreateStaffPayload

): Promise<Staff> {

  const response = await api.post(

    "/api/v1/staff",

    payload
  )

  return response.data
}


// =====================================
// DELETE STAFF
// =====================================

export async function deleteStaff(

  staffId: number

) {

  const response = await api.delete(

    `/api/v1/staff/${staffId}`

  )

  return response.data
}