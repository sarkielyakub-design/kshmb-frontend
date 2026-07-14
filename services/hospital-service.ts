import api from "@/lib/api"

/* =====================================
   TYPES
===================================== */

export interface Hospital {

  id: number

  name: string

  address: string

  phone: string

  lga: string

  hospital_type: string

  bed_space: number

  annual_patients: number

  total_staff: number

  emergency_units: number

  image?: string

  description?: string
}

export interface Department {

  id: number

  name: string

  description?: string

  hospital_id: number
}

export interface Doctor {

  id: number

  full_name: string

  specialty: string

  phone: string

  email: string

  experience?: string

  qualification?: string

  availability?: string

  image?: string

  bio?: string

  hospital_id: number

  department_id: number
}

/* =====================================
   TOKEN
===================================== */

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

/* =====================================
   HOSPITALS
===================================== */

export const getHospitals = async (
  search = ""
) => {

  const response = await api.get(

    `/api/v1/hospitals/?search=${search}`
  )

  return response.data
}

/* =====================================
   GET SINGLE HOSPITAL
===================================== */

export const getHospitalById =
  async (hospitalId: number) => {

    const response =
      await api.get(

        `/api/v1/hospitals/${hospitalId}`
      )

    return response.data
  }

/* =====================================
   CREATE HOSPITAL
===================================== */

export const createHospital = async (
  payload: any
) => {

  const response = await api.post(

    "/api/v1/hospitals/",

    payload,

    authHeader()
  )

  return response.data
}

/* =====================================
   DELETE HOSPITAL
===================================== */

export const deleteHospital = async (
  hospitalId: number
) => {

  const response = await api.delete(

    `/api/v1/hospitals/${hospitalId}`,

    authHeader()
  )

  return response.data
}

/* =====================================
   DEPARTMENTS
===================================== */

export const createDepartment =
  async (payload: any) => {

    const response =
      await api.post(

        "/api/v1/hospitals/departments",

        payload,

        authHeader()
      )

    return response.data
  }

export const getDepartments =
  async (hospitalId: number) => {

    const response =
      await api.get(

        `/api/v1/hospitals/departments/${hospitalId}`
      )

    return response.data
  }

/* =====================================
   DOCTORS
===================================== */

export const createDoctor =
  async (payload: any) => {

    const response =
      await api.post(

        "/api/v1/hospitals/doctors",

        payload,

        authHeader()
      )

    return response.data
  }

/* =====================================
   GET DOCTORS
===================================== */

export const getDoctors =
  async (
    hospitalId?: number,
    departmentId?: number,
    specialty?: string
  ) => {

    const params =
      new URLSearchParams()

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

    const query =
      params.toString()

    const response =
      await api.get(

        `/api/v1/hospitals/doctors${query ? `?${query}` : ""}`
      )

    return response.data
  }

/* =====================================
   GET SINGLE DOCTOR
===================================== */

export const getDoctor =
  async (doctorId: number) => {

    const response =
      await api.get(

        `/api/v1/hospitals/doctors/${doctorId}`
      )

    return response.data
  }

/* =====================================
   DELETE DOCTOR
===================================== */

export const deleteDoctor =
  async (doctorId: number) => {

    const response =
      await api.delete(

        `/api/v1/hospitals/doctors/${doctorId}`,

        authHeader()
      )

    return response.data
  }

/* =====================================
   GET HOSPITAL DOCTORS
===================================== */

export const getHospitalDoctors =
  async (hospitalId: number) => {

    const response =
      await api.get(

        `/api/v1/hospitals/doctors?hospital_id=${hospitalId}`
      )

    return response.data
  }