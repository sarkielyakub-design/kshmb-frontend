import api from "@/lib/api"

// =====================================
// TYPES
// =====================================

export interface QueueTicket {

  id: number

  patient_name: string

  doctor_id: number

  hospital_id: number

  queue_number: number

  status: string
}

export interface QueuePayload {

  patient_name: string

  doctor_id: number

  hospital_id: number
}

// =====================================
// JOIN QUEUE
// =====================================

export async function joinQueue(
  payload: QueuePayload
) {

  const response = await api.post(
    "/queue",
    payload
  )

  return response.data
}

// =====================================
// GET QUEUE
// =====================================

export async function getQueue() {

  const response = await api.get(
    "/queue"
  )

  return response.data
}

// =====================================
// UPDATE STATUS
// =====================================

export async function updateQueueStatus(

  ticketId: number,

  status: string
) {

  const response = await api.patch(

    `/queue/${ticketId}/status`,

    {
      status,
    }
  )

  return response.data
}