import api from "@/lib/api"


// =====================================
// API PREFIX
// =====================================

const BASE_URL = "/api/v1/patients"


// =====================================
// PATIENT TYPES
// =====================================

export interface Patient {

  id: number

  full_name: string

  email?: string

  phone: string

  gender: string

  blood_group?: string

  address?: string

  emergency_contact?: string

  age?: number

  patient_number?: string
}


export interface CreatePatientPayload {

  full_name: string

  email?: string

  phone: string

  gender: string

  blood_group?: string

  address?: string

  emergency_contact?: string

  age?: number
}


export interface UpdatePatientPayload {

  full_name?: string

  email?: string

  phone?: string

  gender?: string

  blood_group?: string

  address?: string

  emergency_contact?: string

  age?: number
}


// =====================================
// MEDICAL RECORD TYPES
// =====================================

export interface MedicalRecord {

  id: number

  diagnosis: string

  symptoms?: string

  prescription?: string

  doctor_notes?: string

  lab_results?: string

  patient_id: number

  doctor_id: number
}


export interface CreateMedicalRecordPayload {

  diagnosis: string

  symptoms?: string

  prescription?: string

  doctor_notes?: string

  lab_results?: string

  patient_id: number

  doctor_id: number
}


// =====================================
// GET PATIENTS
// =====================================

export async function getPatients()
: Promise<Patient[]> {

  const response = await api.get(
    `${BASE_URL}/`
  )

  return response.data
}


// =====================================
// GET SINGLE PATIENT
// =====================================

export async function getPatientById(
  patientId: number
): Promise<Patient> {

  const response = await api.get(
    `${BASE_URL}/${patientId}`
  )

  return response.data
}


// =====================================
// CREATE PATIENT
// =====================================

export async function createPatient(
  payload: CreatePatientPayload
): Promise<any> {

  const response = await api.post(
    `${BASE_URL}/`,
    payload
  )

  return response.data
}


// =====================================
// UPDATE PATIENT
// =====================================

export async function updatePatient(

  patientId: number,

  payload: UpdatePatientPayload

): Promise<any> {

  const response = await api.put(

    `${BASE_URL}/${patientId}`,

    payload
  )

  return response.data
}


// =====================================
// DELETE PATIENT
// =====================================

export async function deletePatient(
  patientId: number
) {

  const response = await api.delete(
    `${BASE_URL}/${patientId}`
  )

  return response.data
}


// =====================================
// GET PATIENT RECORDS
// =====================================

export async function getPatientRecords(
  patientId: number
) {

  const response = await api.get(
    `${BASE_URL}/${patientId}/records`
  )

  return response.data
}


// =====================================
// CREATE MEDICAL RECORD
// =====================================

export async function createMedicalRecord(

  payload: CreateMedicalRecordPayload

) {

  const response = await api.post(

    `${BASE_URL}/records`,

    payload
  )

  return response.data
}