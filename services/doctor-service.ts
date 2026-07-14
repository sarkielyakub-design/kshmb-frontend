import api from "@/lib/api"


// =====================================
// TYPES
// =====================================

export interface Hospital {

  id: number

  name: string

  address: string

  phone: string

  lga: string

  hospital_type: string

  bed_space?: number

  annual_patients?: number

  total_staff?: number

  image?: string
}


export interface Doctor {

  id: number

  full_name: string

  specialty: string

  phone: string

  email: string

  hospital_id: number

  department_id: number

  created_at?: string

  hospital?: Hospital
}


export interface CreateDoctorPayload {

  full_name: string

  specialty: string

  phone: string

  email: string

  hospital_id: number

  department_id: number
}


export interface UpdateDoctorPayload {

  full_name?: string

  specialty?: string

  phone?: string

  email?: string

  hospital_id?: number

  department_id?: number
}


// =====================================
// TOKEN
// =====================================

const authHeader = () => {

  if (typeof window === "undefined") {

    return {}
  }

  const token =
    localStorage.getItem("token")

  return {

    headers: {

      Authorization:
        `Bearer ${token}`,
    },
  }
}


// =====================================
// GET ALL HOSPITALS
// =====================================

export async function getHospitals(): Promise<Hospital[]> {

  const response = await api.get(

    "/api/v1/hospitals"
  )

  return response.data
}


// =====================================
// GET SINGLE HOSPITAL
// =====================================

export async function getHospital(
  hospitalId: number
): Promise<Hospital> {

  const response = await api.get(

    `/api/v1/hospitals/${hospitalId}`
  )

  return response.data
}


// =====================================
// GET ALL DOCTORS
// PUBLIC + DASHBOARD
// =====================================

export async function getDoctors(

  hospitalId?: number,

  departmentId?: number,

  specialty?: string

): Promise<Doctor[]> {

  const params =
    new URLSearchParams()

  // =========================
  // QUERY PARAMS
  // =========================

  if (hospitalId) {

    params.append(
      "hospital_id",
      hospitalId.toString()
    )
  }

  if (departmentId) {

    params.append(
      "department_id",
      departmentId.toString()
    )
  }

  if (specialty) {

    params.append(
      "specialty",
      specialty
    )
  }

  // =========================
  // FETCH DOCTORS
  // =========================

  const response = await api.get(

    `/api/v1/hospitals/doctors?${params.toString()}`
  )

  const doctors = response.data

  // =========================
  // FETCH HOSPITALS
  // =========================

  const hospitals =
    await getHospitals()

  // =========================
  // ATTACH HOSPITAL
  // =========================

  const enrichedDoctors =
    doctors.map((doctor: Doctor) => ({

      ...doctor,

      hospital:
        hospitals.find(
          (hospital: Hospital) =>
            hospital.id ===
            doctor.hospital_id
        ) || null,
    }))

  return enrichedDoctors
}


// =====================================
// GET SINGLE DOCTOR
// =====================================

export async function getDoctorById(
  doctorId: number
): Promise<Doctor> {

  const response = await api.get(

    `/api/v1/hospitals/doctors/${doctorId}`
  )

  const doctor =
    response.data

  // =========================
  // FETCH HOSPITAL
  // =========================

  try {

    doctor.hospital =
      await getHospital(
        doctor.hospital_id
      )

  } catch {

    doctor.hospital = null
  }

  return doctor
}


// =====================================
// CREATE DOCTOR
// DASHBOARD
// =====================================

export async function createDoctor(
  payload: CreateDoctorPayload
): Promise<Doctor> {

  const response = await api.post(

    "/api/v1/hospitals/doctors",

    payload,

    authHeader()
  )

  return response.data
}


// =====================================
// UPDATE DOCTOR
// DASHBOARD
// =====================================

export async function updateDoctor(

  doctorId: number,

  payload: UpdateDoctorPayload

): Promise<Doctor> {

  const response = await api.put(

    `/api/v1/hospitals/doctors/${doctorId}`,

    payload,

    authHeader()
  )

  return response.data
}


// =====================================
// DELETE DOCTOR
// DASHBOARD
// =====================================

export async function deleteDoctor(
  doctorId: number
) {

  const response = await api.delete(

    `/api/v1/hospitals/doctors/${doctorId}`,

    authHeader()
  )

  return response.data
}