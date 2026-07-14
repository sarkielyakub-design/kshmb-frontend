import api from "@/lib/api"

// =====================================
// MEDICINES
// =====================================

export async function getMedicines() {

  const response = await api.get(
    "/pharmacy/medicines"
  )

  return response.data
}

export async function createMedicine(
  payload: any
) {

  const response = await api.post(
    "/pharmacy/medicines",
    payload
  )

  return response.data
}

// =====================================
// SALES
// =====================================

export async function sellMedicine(
  payload: any
) {

  const response = await api.post(
    "/pharmacy/sales",
    payload
  )

  return response.data
}

// =====================================
// LOW STOCK
// =====================================

export async function getLowStockMedicines() {

  const response = await api.get(
    "/pharmacy/low-stock"
  )

  return response.data
}

// =====================================
// ANALYTICS
// =====================================

export async function getPharmacyAnalytics() {

  const response = await api.get(
    "/pharmacy/analytics"
  )

  return response.data
}