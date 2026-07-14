import api from "@/lib/api"

// =====================================
// TYPES
// =====================================

export interface Appointment {

  id: number

  patient_name: string

  patient_email: string

  patient_phone: string

  symptoms: string

  appointment_date: string

  appointment_time: string

  doctor_id: number

  hospital_id: number

  queue_number: number

  status: string

  doctor?: {
    id: number
    full_name: string
    specialty: string
  }

  hospital?: {
    id: number
    name: string
    hospital_type: string
  }
}

export interface CreateAppointmentPayload {

  patient_name: string

  patient_email: string

  patient_phone: string

  symptoms: string

  appointment_date: string

  appointment_time: string

  doctor_id: number

  hospital_id: number
}


// =====================================
// TOKEN HEADER
// =====================================

const authHeader = () => {

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
// CREATE APPOINTMENT
// =====================================

export async function createAppointment(
  payload: CreateAppointmentPayload
) {

  const response = await api.post(

    "/api/v1/appointments",

    payload
  )

  return response.data
}


// =====================================
// GET ALL APPOINTMENTS
// =====================================

export async function getAppointments() {

  const response = await api.get(

    "/api/v1/appointments",

    authHeader()
  )

  return response.data
}


// =====================================
// GET SINGLE APPOINTMENT
// =====================================

export async function getAppointment(
  appointmentId: number
) {

  const response = await api.get(

    `/api/v1/appointments/${appointmentId}`,

    authHeader()
  )

  return response.data
}


// =====================================
// GET APPOINTMENTS BY HOSPITAL
// =====================================

export async function getHospitalAppointments(
  hospitalId: number
) {

  const response = await api.get(

    `/api/v1/appointments?hospital_id=${hospitalId}`,

    authHeader()
  )

  return response.data
}


// =====================================
// GET APPOINTMENTS BY DOCTOR
// =====================================

export async function getDoctorAppointments(
  doctorId: number
) {

  const response = await api.get(

    `/api/v1/appointments?doctor_id=${doctorId}`,

    authHeader()
  )

  return response.data
}


// =====================================
// UPDATE STATUS
// =====================================

export async function updateAppointmentStatus(

  appointmentId: number,

  status: string
) {

  const response = await api.patch(

    `/api/v1/appointments/${appointmentId}/status`,

    {
      status,
    },

    authHeader()
  )

  return response.data
}


// =====================================
// DELETE APPOINTMENT
// =====================================

export async function deleteAppointment(
  appointmentId: number
) {

  const response = await api.delete(

    `/api/v1/appointments/${appointmentId}`,

    authHeader()
  )

  return response.data
}