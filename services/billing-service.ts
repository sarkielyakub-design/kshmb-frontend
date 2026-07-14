import { api } from "@/lib/api"


// =====================================
// TYPES
// =====================================

export interface Invoice {

  id: number

  patient_name: string

  invoice_number: string

  amount: number

  payment_status: string

  payment_method?: string

  insurance_provider?: string

  created_at?: string
}


export interface CreateInvoicePayload {

  patient_name: string

  amount: number

  payment_method?: string

  insurance_provider?: string
}


// =====================================
// GET INVOICES
// =====================================

export async function getInvoices()
: Promise<Invoice[]> {

  const response = await api.get(
    "/billing/invoices"
  )

  return response.data
}


// =====================================
// CREATE INVOICE
// =====================================

export async function createInvoice(

  payload: CreateInvoicePayload

): Promise<Invoice> {

  const response = await api.post(

    "/billing/invoices",

    payload
  )

  return response.data
}