import { api } from "@/lib/api"

// =====================================
// TYPES
// =====================================

export interface BedSpace {

  id: number

  hospital_id: number

  ward_name: string

  bed_number: string

  category?: string

  occupied?: boolean

  patient_name?: string

  created_at?: string
}


export interface CreateBedSpacePayload {

  hospital_id?: number

  ward_name: string

  bed_number: string

  category?: string

  occupied?: boolean

  patient_name?: string
}


// =====================================
// GET ALL BEDSPACES
// =====================================

export async function getBedSpaces()
: Promise<BedSpace[]> {

  const response = await api.get(
    "/api/v1/bedspaces"
  )

  return response.data
}


// =====================================
// GET HOSPITAL BEDSPACES
// =====================================

export async function getHospitalBedSpaces(

  hospitalId: number

): Promise<BedSpace[]> {

  const response = await api.get(

    `/api/v1/bedspaces/hospital/${hospitalId}`

  )

  return response.data
}


// =====================================
// CREATE BEDSPACE
// =====================================

export async function createBedSpace(

  payload: CreateBedSpacePayload

): Promise<BedSpace> {

  const response = await api.post(

    "/api/v1/bedspaces",

    payload
  )

  return response.data
}


// =====================================
// DELETE BEDSPACE
// =====================================

export async function deleteBedSpace(

  bedspaceId: number

) {

  const response = await api.delete(

    `/api/v1/bedspaces/${bedspaceId}`

  )

  return response.data
}