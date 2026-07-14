import api from "@/lib/api"

// =====================================
// TYPES
// =====================================

export interface Ambulance {

  id: number

  vehicle_number: string

  driver_name: string

  driver_phone: string

  current_location: string

  latitude: number

  longitude: number

  status: string
}

export interface EmergencyRequest {

  id: number

  patient_name: string

  phone: string

  emergency_type: string

  pickup_location: string

  status: string

  ambulance_id?: number
}

// =====================================
// CREATE AMBULANCE
// =====================================

export async function createAmbulance(
  payload: {

    vehicle_number: string

    driver_name: string

    driver_phone: string

    current_location: string

    latitude: number

    longitude: number
  }
) {

  const response =
    await api.post(
      "/api/v1/emergency/ambulances",
      payload
    )

  return response.data
}

// =====================================
// GET AMBULANCES
// =====================================

export async function getAmbulances() {

  const response =
    await api.get(
      "/api/v1/emergency/ambulances"
    )

  return response.data
}

// =====================================
// CREATE EMERGENCY REQUEST
// =====================================

export async function createEmergencyRequest(
  payload: {

    patient_name: string

    phone: string

    emergency_type: string

    pickup_location: string
  }
) {

  const response =
    await api.post(
      "/api/v1/emergency/requests",
      payload
    )

  return response.data
}

// =====================================
// GET EMERGENCY REQUESTS
// =====================================

export async function getEmergencyRequests() {

  const response =
    await api.get(
      "/api/v1/emergency/requests"
    )

  return response.data
}

// =====================================
// DISPATCH AMBULANCE
// =====================================

export async function dispatchAmbulance(

  requestId: number,

  payload: {

    ambulance_id: number

    status: string
  }
) {

  const response =
    await api.patch(

      `/api/v1/emergency/requests/${requestId}/dispatch`,

      payload
    )

  return response.data
}