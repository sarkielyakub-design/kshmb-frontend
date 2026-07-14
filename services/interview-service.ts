import api from "@/lib/api"


// =====================================
// TYPES
// =====================================

export interface Interview {

  id: number

  candidate_name: string

  candidate_email: string

  position: string

  interview_date: string

  interview_time: string

  interview_type: string

  meeting_link?: string

  status: string

  created_at?: string
}


export interface CreateInterviewPayload {

  candidate_name: string

  candidate_email: string

  position: string

  interview_date: string

  interview_time: string

  interview_type: string

  meeting_link?: string
}


// =====================================
// GET INTERVIEWS
// =====================================

export async function getInterviews()
: Promise<Interview[]> {

  const response = await api.get(
    "/recruitment/interviews"
  )

  return response.data
}


// =====================================
// CREATE INTERVIEW
// =====================================

export async function createInterview(

  payload: CreateInterviewPayload

): Promise<Interview> {

  const response = await api.post(

    "/recruitment/interviews",

    payload
  )

  return response.data
}