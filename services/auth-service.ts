import axios from "axios"

// =====================================
// API BASE URL
// =====================================

const API =
  process.env.NEXT_PUBLIC_API_URL

// =====================================
// AXIOS INSTANCE
// =====================================

export const api = axios.create({

  baseURL:
    `${API}/api/v1`,

  headers: {

    "Content-Type":
      "application/json",
  },

  timeout: 15000,
})

// =====================================
// REQUEST INTERCEPTOR
// =====================================

api.interceptors.request.use(

  (config) => {

    if (
      typeof window !== "undefined"
    ) {

      const token =
        localStorage.getItem(
          "token"
        )

      if (
        token &&
        config.headers
      ) {

        config.headers.Authorization =
          `Bearer ${token}`
      }
    }

    return config
  },

  (error) => {

    return Promise.reject(error)
  }
)

// =====================================
// RESPONSE INTERCEPTOR
// =====================================

api.interceptors.response.use(

  (response) => {

    return response
  },

  (error) => {

    // UNAUTHORIZED

    if (
      error?.response?.status === 401
    ) {

      if (
        typeof window !== "undefined"
      ) {

        localStorage.removeItem(
          "token"
        )

        localStorage.removeItem(
          "user"
        )

        window.location.href =
          "/login"
      }
    }

    return Promise.reject(error)
  }
)

// =====================================
// TYPES
// =====================================

export interface LoginResponse {

  access_token: string

  token_type: string
}

export interface RegisterPayload {

  full_name: string

  email: string

  password: string

  role?: string
}

export interface ForgotPasswordPayload {

  email: string
}

// =====================================
// LOGIN USER
// =====================================

export const loginUser = async (

  email: string,

  password: string

): Promise<LoginResponse> => {

  const formData =
    new URLSearchParams()

  formData.append(
    "username",
    email
  )

  formData.append(
    "password",
    password
  )

  const response = await api.post(

    "/auth/login",

    formData,

    {
      headers: {

        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  )

  return response.data
}

// =====================================
// REGISTER USER
// =====================================

export const registerUser = async (

  payload: RegisterPayload

) => {

  const response = await api.post(

    "/auth/register",

    payload
  )

  return response.data
}

// =====================================
// FORGOT PASSWORD
// =====================================

export const forgotPassword = async (

  payload: ForgotPasswordPayload

) => {

  const response = await api.post(

    "/auth/forgot-password",

    payload
  )

  return response.data
}

// =====================================
// GET CURRENT USER
// =====================================

export const getCurrentUser =
  async () => {

    const response =
      await api.get(
        "/auth/me"
      )

    return response.data
  }

// =====================================
// TOKEN HELPERS
// =====================================

export const setToken = (
  token: string
) => {

  if (
    typeof window !== "undefined"
  ) {

    localStorage.setItem(
      "token",
      token
    )
  }
}

export const getToken = () => {

  if (
    typeof window !== "undefined"
  ) {

    return localStorage.getItem(
      "token"
    )
  }

  return null
}

// =====================================
// LOGOUT
// =====================================

export const logoutUser = () => {

  if (
    typeof window !== "undefined"
  ) {

    localStorage.removeItem(
      "token"
    )

    localStorage.removeItem(
      "user"
    )

    window.location.href =
      "/login"
  }
}

// =====================================
// DEFAULT EXPORT
// =====================================

export default api