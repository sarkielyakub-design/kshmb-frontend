"use client"

import { useState } from "react"

import Link from "next/link"

import { useRouter } from "next/navigation"

import {

  Loader2,

  HeartPulse,

  ShieldCheck,

} from "lucide-react"

import { toast } from "sonner"

import { registerUser } from "@/services/auth-service"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"

export default function RegisterPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({

      full_name: "",

      email: "",

      password: "",

      role: "hospital_admin",
    })

  // =====================================
  // REGISTER
  // =====================================

  const handleRegister =
    async () => {

      try {

        setLoading(true)

        await registerUser(formData)

        toast.success(
          "Account created successfully"
        )

        router.push("/login")

      } catch (error: any) {

        toast.error(

          error?.response?.data?.detail ||

          "Registration failed"
        )

      } finally {

        setLoading(false)
      }
    }

  return (

    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">

      {/* LEFT */}

      <div className="hidden lg:flex bg-slate-900 text-white p-16 flex-col justify-between">

        <div className="flex items-center gap-4">

          <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center">

            <HeartPulse className="h-8 w-8 text-cyan-400" />

          </div>

          <div>

            <h1 className="text-4xl font-black">

              KSHMB

            </h1>

            <p className="text-slate-400">

              Enterprise Healthcare Platform

            </p>

          </div>

        </div>

        <div>

          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">

            <ShieldCheck className="h-4 w-4 text-emerald-400" />

            Secure Registration

          </div>

          <h2 className="text-5xl font-black leading-tight">

            Create Healthcare Admin Account

          </h2>

          <p className="text-slate-400 mt-6 text-lg leading-relaxed">

            Manage hospitals, appointments,
            emergency response, analytics,
            pharmacy, AI systems and healthcare infrastructure.

          </p>

        </div>

        <div className="text-slate-500 text-sm">

          Kano State Hospital Management Board

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center justify-center p-6">

        <Card className="w-full max-w-xl rounded-[36px] border-0 shadow-2xl p-10">

          <div className="mb-8">

            <h2 className="text-4xl font-black">

              Register

            </h2>

            <p className="text-slate-500 mt-2">

              Create enterprise healthcare account

            </p>

          </div>

          <div className="space-y-5">

            <div>

              <Label>
                Full Name
              </Label>

              <Input
                className="h-12 rounded-xl mt-2"
                placeholder="Enter full name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    full_name:
                      e.target.value,
                  })
                }
              />

            </div>

            <div>

              <Label>
                Email Address
              </Label>

              <Input
                type="email"
                className="h-12 rounded-xl mt-2"
                placeholder="admin@kshmb.gov.ng"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target.value,
                  })
                }
              />

            </div>

            <div>

              <Label>
                Password
              </Label>

              <Input
                type="password"
                className="h-12 rounded-xl mt-2"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password:
                      e.target.value,
                  })
                }
              />

            </div>

            <div>

              <Label>
                Account Role
              </Label>

              <select
                className="w-full h-12 rounded-xl border border-slate-300 px-4 mt-2"
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role:
                      e.target.value,
                  })
                }
              >

                <option value="hospital_admin">
                  Hospital Admin
                </option>

                <option value="doctor">
                  Doctor
                </option>

                <option value="hr_admin">
                  HR Admin
                </option>

                <option value="super_admin">
                  Super Admin
                </option>

              </select>

            </div>

            <Button
              onClick={handleRegister}
              disabled={loading}
              className="w-full h-12 rounded-xl text-base"
            >

              {
                loading ? (
                  <div className="flex items-center gap-2">

                    <Loader2 className="h-5 w-5 animate-spin" />

                    Creating Account...

                  </div>
                ) : (
                  "Create Account"
                )
              }

            </Button>

            <div className="text-center text-sm text-slate-500">

              Already have an account?

              <Link
                href="/login"
                className="text-blue-700 font-semibold ml-2"
              >

                Login

              </Link>

            </div>

          </div>

        </Card>

      </div>

    </div>
  )
}