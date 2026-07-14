import { api } from "@/lib/api"


// =====================================
// TYPES
// =====================================

export interface MedicalRecord {

  id: number

  patient_id: number

  doctor_id: number

  patient_name?: string

  doctor_name?: string

  diagnosis: string

  symptoms?: string

  prescription?: string

  doctor_notes?: string

  lab_results?: string

  visit_date?: string
}


export interface CreateMedicalRecordPayload {

  patient_id: number

  doctor_id: number

  diagnosis: string

  symptoms?: string

  prescription?: string

  doctor_notes?: string

  lab_results?: string
}


export interface UpdateMedicalRecordPayload {

  diagnosis?: string

  symptoms?: string

  prescription?: string

  doctor_notes?: string

  lab_results?: string
}


// =====================================
// GET ALL MEDICAL RECORDS
// =====================================

export async function getMedicalRecords()
: Promise<MedicalRecord[]> {

  const response = await api.get(

    "/api/v1/medical-records"

  )

  return response.data
}


// =====================================
// GET SINGLE MEDICAL RECORD
// =====================================

export async function getMedicalRecordById(
  recordId: number
): Promise<MedicalRecord> {

  const response = await api.get(

    `/api/v1/medical-records/${recordId}`

  )

  return response.data
}


// =====================================
// GET PATIENT MEDICAL RECORDS
// =====================================

export async function getPatientMedicalRecords(

  patientId: number

): Promise<MedicalRecord[]> {

  const response = await api.get(

    `/api/v1/patients/${patientId}/records`

  )

  return response.data
}


// =====================================
// CREATE MEDICAL RECORD
// =====================================

export async function createMedicalRecord(

  payload: CreateMedicalRecordPayload

): Promise<any> {

  const response = await api.post(

    "/api/v1/medical-records",

    payload

  )

  return response.data
}


// =====================================
// UPDATE MEDICAL RECORD
// =====================================

export async function updateMedicalRecord(

  recordId: number,

  payload: UpdateMedicalRecordPayload

): Promise<any> {

  const response = await api.put(

    `/api/v1/medical-records/${recordId}`,

    payload

  )

  return response.data
}


// =====================================
// DELETE MEDICAL RECORD
// =====================================

export async function deleteMedicalRecord(
  recordId: number
): Promise<any> {

  const response = await api.delete(

    `/api/v1/medical-records/${recordId}`

  )

  return response.data
}