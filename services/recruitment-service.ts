import api from "@/lib/api"

/* =====================================================
   JOB TYPES
===================================================== */

export interface Job {

  id: number

  title: string

  department: string

  location: string

  employment_type: string

  description: string

  requirements: string

  status: string
}


/* =====================================================
   CREATE JOB
===================================================== */

export interface CreateJobPayload {

  title: string

  department: string

  location: string

  employment_type: string

  description: string

  requirements: string
}


/* =====================================================
   APPLICATION TYPES
===================================================== */

export interface JobApplication {

  id: number

  full_name: string

  email: string

  phone: string

  cv_url: string

  status: string

  job_id?: number

  job?: Job
}


/* =====================================================
   APPLY FOR JOB
===================================================== */

export interface CreateApplicationPayload {

  full_name: string

  email: string

  phone: string

  cv_url: string
}


/* =====================================================
   UPDATE APPLICATION STATUS
===================================================== */

export interface UpdateApplicationStatusPayload {

  status: string
}


/* =====================================================
   TOKEN
===================================================== */

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


/* =====================================================
   CREATE JOB
===================================================== */

export const createJob = async (

  payload: CreateJobPayload

): Promise<Job> => {

  const response =
    await api.post(

      "/api/v1/recruitment/jobs",

      payload,

      authHeader()
    )

  return response.data
}


/* =====================================================
   GET JOBS
===================================================== */

export const getJobs = async ()
: Promise<Job[]> => {

  const response =
    await api.get(

      "/api/v1/recruitment/jobs"
    )

  return response.data
}


/* =====================================================
   GET SINGLE JOB
===================================================== */

export const getJobById = async (

  jobId: number

): Promise<Job> => {

  const jobs = await getJobs()

  const job = jobs.find(

    (item) => item.id === jobId
  )

  if (!job) {

    throw new Error(
      "Job not found"
    )
  }

  return job
}


/* =====================================================
   APPLY FOR JOB
===================================================== */

export const applyForJob = async (

  jobId: number,

  payload: CreateApplicationPayload

): Promise<any> => {

  const response =
    await api.post(

      `/api/v1/recruitment/jobs/${jobId}/apply`,

      payload
    )

  return response.data
}


/* =====================================================
   GET APPLICATIONS
===================================================== */

export const getApplications = async ()
: Promise<JobApplication[]> => {

  const response =
    await api.get(

      "/api/v1/recruitment/applications",

      authHeader()
    )

  return response.data
}


/* =====================================================
   UPDATE APPLICATION STATUS
===================================================== */

export const updateApplicationStatus =
  async (

    applicationId: number,

    payload: UpdateApplicationStatusPayload

  ) => {

    const response =
      await api.put(

        `/api/v1/recruitment/applications/${applicationId}`,

        payload,

        authHeader()
      )

    return response.data
  }


/* =====================================================
   DELETE JOB
===================================================== */

export const deleteJob = async (

  jobId: number

) => {

  const response =
    await api.delete(

      `/api/v1/recruitment/jobs/${jobId}`,

      authHeader()
    )

  return response.data
}