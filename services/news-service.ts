import api from "@/lib/api"

// =====================================
// AUTH HEADER
// =====================================

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

// =====================================
// TYPES
// =====================================

export interface NewsPayload {

  title: string

  content: string

  image?: string

  headline?: boolean
}

export interface News {

  id: number

  title: string

  content: string

  image?: string

  headline?: boolean

  slug?: string

  created_at: string
}

// =====================================
// CREATE NEWS
// =====================================

export const createNews =
  async (
    payload: NewsPayload
  ) => {

    const response =
      await api.post(

        "/api/v1/news",

        payload,

        authHeader()
      )

    return response.data
  }

// =====================================
// GET ALL NEWS
// =====================================

export const getNews =
  async (): Promise<News[]> => {

    const response =
      await api.get(
        "/api/v1/news"
      )

    return response.data
  }

// =====================================
// GET SINGLE NEWS BY ID
// =====================================

export const getNewsById =
  async (
    id: number
  ): Promise<News> => {

    const response =
      await api.get(
        `/api/v1/news/${id}`
      )

    return response.data
  }

// =====================================
// GET SINGLE NEWS BY SLUG
// =====================================

export const getSingleNews =
  async (
    slug: string
  ): Promise<News> => {

    const response =
      await api.get(
        `/api/v1/news/${slug}`
      )

    return response.data
  }

// =====================================
// GET HEADLINES
// =====================================

export const getHeadlines =
  async (): Promise<News[]> => {

    const response =
      await api.get(
        "/api/v1/news/headlines"
      )

    return response.data
  }

// =====================================
// UPDATE NEWS
// =====================================

export const updateNews =
  async (
    id: number,
    payload: NewsPayload
  ) => {

    const response =
      await api.put(

        `/api/v1/news/${id}`,

        payload,

        authHeader()
      )

    return response.data
  }

// =====================================
// DELETE NEWS
// =====================================

export const deleteNews =
  async (
    id: number
  ) => {

    const response =
      await api.delete(

        `/api/v1/news/${id}`,

        authHeader()
      )

    return response.data
  }