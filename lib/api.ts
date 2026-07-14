import axios from "axios"


// =====================================
// API CONFIG
// =====================================

export const api = axios.create({

  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||

    "http://127.0.0.1:8000/api/v1",

  headers: {

    "Content-Type":
      "application/json",
  },

  timeout: 15000,
})


// =====================================
// REQUEST INTERCEPTOR
// AUTO ADD JWT TOKEN
// =====================================

api.interceptors.request.use(

  (config) => {

    if (
      typeof window !== "undefined"
    ) {

      const token =
        localStorage.getItem("token")

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
// HANDLE GLOBAL ERRORS
// =====================================

api.interceptors.response.use(

  (response) => {

    return response
  },

  async (error) => {

    // =================================
    // UNAUTHORIZED
    // =================================

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


    // =================================
    // SERVER ERROR
    // =================================

    if (
      error?.response?.status >= 500
    ) {

      console.error(
        "Server Error:",
        error?.response?.data
      )
    }


    // =================================
    // NETWORK ERROR
    // =================================

    if (
      error?.code === "ECONNABORTED"
    ) {

      console.error(
        "Request Timeout"
      )
    }

    return Promise.reject(error)
  }
)


// =====================================
// AUTH TYPES
// =====================================

export interface LoginResponse {

  access_token: string

  token_type: string
}


// =====================================
// LOGIN USER
// =====================================

export async function loginUser(

  email: string,

  password: string

): Promise<LoginResponse> {

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
// LOGOUT USER
// =====================================

export function logoutUser() {

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
// TOKEN HELPERS
// =====================================

export function getToken() {

  if (
    typeof window !== "undefined"
  ) {

    return localStorage.getItem(
      "token"
    )
  }

  return null
}


export function setToken(
  token: string
) {

  if (
    typeof window !== "undefined"
  ) {

    localStorage.setItem(
      "token",
      token
    )
  }
}


// =====================================
// EXPORT DEFAULT
// =====================================

export default api