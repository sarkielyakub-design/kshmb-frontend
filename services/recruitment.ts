import api from "@/lib/api"


// =====================================
// TYPES
// =====================================

export interface Job {

  id: number

  title: string

  department: string

  location: string

  employment_type: string

  description: string

  status: string

  created_at?: string
}


export interface CreateJobPayload {

  title: string

  department: string

  location: string

  employment_type: string

  description: string
}


export interface JobApplication {

  id: number

  full_name: string

  email: string

  phone: string

  position: string

  status: string

  cv_url?: string

  created_at?: string
}


// =====================================
// GET JOBS
// =====================================

export async function getJobs()
: Promise<Job[]> {

  const response = await api.get(
    "/recruitment/jobs"
  )

  return response.data
}


// =====================================
// CREATE JOB
// =====================================

export async function createJob(
  payload: CreateJobPayload
): Promise<Job> {

  const response = await api.post(
    "/recruitment/jobs",
    payload
  )

  return response.data
}


// =====================================
// GET APPLICATIONS
// =====================================

export async function getApplications()
: Promise<JobApplication[]> {

  const response = await api.get(
    "/recruitment/applications"
  )

  return response.data
}