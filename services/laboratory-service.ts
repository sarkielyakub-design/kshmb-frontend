import api from "@/lib/api"

// =====================================
// LAB TESTS
// =====================================

export async function getLabTests() {

  const response = await api.get(
    "/laboratory/tests"
  )

  return response.data
}

export async function createLabTest(
  payload: any
) {

  const response = await api.post(
    "/laboratory/tests",
    payload
  )

  return response.data
}

// =====================================
// LAB REQUESTS
// =====================================

export async function getLabRequests() {

  const response = await api.get(
    "/laboratory/requests"
  )

  return response.data
}

export async function createLabRequest(
  payload: any
) {

  const response = await api.post(
    "/laboratory/requests",
    payload
  )

  return response.data
}

export async function updateLabResult(
  requestId: number,
  payload: any
) {

  const response = await api.patch(
    `/laboratory/requests/${requestId}`,
    payload
  )

  return response.data
}