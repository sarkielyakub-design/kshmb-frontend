import api from "@/lib/api"


// =====================================
// TYPES
// =====================================

export interface JobApplication {

  id: number

  full_name: string

  email: string

  phone: string

  cover_letter?: string

  cv_url?: string

  position: string

  status: string

  created_at?: string
}


export interface CreateApplicationPayload {

  full_name: string

  email: string

  phone: string

  cover_letter?: string

  position: string

  cv: File
}


// =====================================
// APPLY FOR JOB
// =====================================

export async function applyForJob(

  payload: CreateApplicationPayload

): Promise<JobApplication> {

  const formData = new FormData()

  formData.append(
    "full_name",
    payload.full_name
  )

  formData.append(
    "email",
    payload.email
  )

  formData.append(
    "phone",
    payload.phone
  )

  formData.append(
    "position",
    payload.position
  )

  formData.append(
    "cover_letter",
    payload.cover_letter || ""
  )

  formData.append(
    "cv",
    payload.cv
  )


  const response = await api.post(

    "/recruitment/apply",

    formData,

    {
      headers: {

        "Content-Type":
          "multipart/form-data",
      },
    }
  )

  return response.data
}