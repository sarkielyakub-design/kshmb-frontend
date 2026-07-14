"use client"

import { useEffect } from "react"

import { useRouter }
from "next/navigation"

import {
  useAuthStore
} from "@/store/auth-store"

import {
  Loader2
} from "lucide-react"


interface Props {

  children: React.ReactNode

  allowedRoles?: string[]
}


export default function ProtectedRoute({

  children,

  allowedRoles,

}: Props) {

  const router = useRouter()

  const { token, user } =
    useAuthStore()


  useEffect(() => {

    // NO TOKEN
    if (!token) {

      router.push("/login")

      return
    }


    // ROLE CHECK
    if (

      allowedRoles &&
      user?.role &&
      !allowedRoles.includes(
        user.role
      )
    ) {

      router.push("/unauthorized")
    }

  }, [token, user, router])


  // LOADING
  if (!token) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <Loader2 className="h-10 w-10 animate-spin text-slate-500" />

      </div>
    )
  }

  return children
}