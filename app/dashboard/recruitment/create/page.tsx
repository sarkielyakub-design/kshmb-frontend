"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"

import {

  BriefcaseBusiness,

  Building2,

  MapPin,

  Clock3,

  Wallet,

  FileText,

  Loader2,

  ChevronLeft,

  CircleCheckBig,

} from "lucide-react"

import Link from "next/link"

import {

  createJob,

} from "@/services/recruitment-service"

import {

  getHospitals,

} from "@/services/hospital-service"

import { toast } from "sonner"


export default function CreateRecruitmentPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [hospitals, setHospitals] =
    useState<any[]>([])

  const [formData, setFormData] =
    useState({

      title: "",

      department: "",

      location: "",

      employment_type: "",

      description: "",

      requirements: "",

      responsibilities: "",

      salary_range: "",

      hospital_id: "",

      deadline: "",
    })


  // =====================================
  // FETCH HOSPITALS
  // =====================================

  useEffect(() => {

    const fetchHospitals =
      async () => {

        try {

          const data =
            await getHospitals()

          setHospitals(data)

        } catch (error) {

          toast.error(
            "Failed to load hospitals"
          )
        }
      }

    fetchHospitals()

  }, [])


  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (

    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >

  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    })
  }


  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault()

      setLoading(true)

      try {

        await createJob({

          ...formData,

          hospital_id:
            Number(
              formData.hospital_id
            ),
        })

        toast.success(
          "Recruitment job created successfully"
        )

        router.push(
          "/dashboard/recruitment"
        )

      } catch (error) {

        toast.error(
          "Failed to create recruitment job"
        )

      } finally {

        setLoading(false)
      }
    }


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          <div className="flex items-center gap-5">

            <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center">

              <BriefcaseBusiness className="h-8 w-8 text-blue-700" />

            </div>

            <div>

              <h1 className="text-4xl font-bold tracking-tight">

                Create Recruitment Job

              </h1>

              <p className="text-muted-foreground mt-2">

                Create healthcare employment opportunity

              </p>

            </div>

          </div>


          <Link
            href="/dashboard/recruitment"
          >

            <Button
              variant="outline"
              className="rounded-xl h-12 px-6"
            >

              <ChevronLeft className="mr-2 h-4 w-4" />

              Back

            </Button>

          </Link>

        </div>


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
        >

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* LEFT */}

            <div className="xl:col-span-2 space-y-8">

              {/* BASIC INFO */}

              <Card className="rounded-[32px] border-0 shadow-sm p-8">

                <div className="flex items-center gap-4 mb-8">

                  <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                    <FileText className="h-7 w-7 text-blue-700" />

                  </div>

                  <div>

                    <h2 className="text-2xl font-bold">

                      Job Information

                    </h2>

                    <p className="text-muted-foreground">

                      Recruitment basic details

                    </p>

                  </div>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* TITLE */}

                  <div className="space-y-2">

                    <label className="text-sm font-medium">

                      Job Title

                    </label>

                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Senior Doctor"
                      className="h-12 rounded-xl"
                      required
                    />

                  </div>


                  {/* DEPARTMENT */}

                  <div className="space-y-2">

                    <label className="text-sm font-medium">

                      Department

                    </label>

                    <Input
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Cardiology"
                      className="h-12 rounded-xl"
                      required
                    />

                  </div>


                  {/* LOCATION */}

                  <div className="space-y-2">

                    <label className="text-sm font-medium">

                      Location

                    </label>

                    <div className="relative">

                      <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

                      <Input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Kano State"
                        className="h-12 rounded-xl pl-12"
                        required
                      />

                    </div>

                  </div>


                  {/* EMPLOYMENT */}

                  <div className="space-y-2">

                    <label className="text-sm font-medium">

                      Employment Type

                    </label>

                    <div className="relative">

                      <Clock3 className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

                      <select
                        name="employment_type"
                        value={formData.employment_type}
                        onChange={handleChange}
                        className="w-full h-12 rounded-xl border bg-background px-12"
                        required
                      >

                        <option value="">
                          Select Employment Type
                        </option>

                        <option value="Full Time">
                          Full Time
                        </option>

                        <option value="Part Time">
                          Part Time
                        </option>

                        <option value="Contract">
                          Contract
                        </option>

                      </select>

                    </div>

                  </div>


                  {/* SALARY */}

                  <div className="space-y-2">

                    <label className="text-sm font-medium">

                      Salary Range

                    </label>

                    <div className="relative">

                      <Wallet className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

                      <Input
                        name="salary_range"
                        value={formData.salary_range}
                        onChange={handleChange}
                        placeholder="₦350,000 - ₦500,000"
                        className="h-12 rounded-xl pl-12"
                      />

                    </div>

                  </div>


                  {/* DEADLINE */}

                  <div className="space-y-2">

                    <label className="text-sm font-medium">

                      Application Deadline

                    </label>

                    <Input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="h-12 rounded-xl"
                    />

                  </div>

                </div>

              </Card>


              {/* DESCRIPTION */}

              <Card className="rounded-[32px] border-0 shadow-sm p-8 space-y-6">

                <div>

                  <h2 className="text-2xl font-bold">

                    Job Description

                  </h2>

                  <p className="text-muted-foreground mt-1">

                    Explain the role and expectations

                  </p>

                </div>


                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter recruitment description..."
                  className="min-h-[180px] rounded-2xl"
                  required
                />


                <Textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Enter requirements..."
                  className="min-h-[180px] rounded-2xl"
                  required
                />


                <Textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  placeholder="Enter responsibilities..."
                  className="min-h-[180px] rounded-2xl"
                />

              </Card>

            </div>


            {/* RIGHT */}

            <div className="space-y-8">

              {/* HOSPITAL */}

              <Card className="rounded-[32px] border-0 shadow-sm p-8">

                <div className="flex items-center gap-4 mb-8">

                  <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                    <Building2 className="h-7 w-7 text-emerald-700" />

                  </div>

                  <div>

                    <h2 className="text-2xl font-bold">

                      Hospital

                    </h2>

                    <p className="text-muted-foreground">

                      Assign recruitment hospital

                    </p>

                  </div>

                </div>


                <div className="space-y-2">

                  <label className="text-sm font-medium">

                    Select Hospital

                  </label>

                  <select
                    name="hospital_id"
                    value={formData.hospital_id}
                    onChange={handleChange}
                    className="w-full h-12 rounded-xl border bg-background px-4"
                    required
                  >

                    <option value="">
                      Select Hospital
                    </option>

                    {
                      hospitals.map((hospital) => (

                        <option
                          key={hospital.id}
                          value={hospital.id}
                        >

                          {hospital.name}

                        </option>
                      ))
                    }

                  </select>

                </div>

              </Card>


              {/* ACTIONS */}

              <Card className="rounded-[32px] border-0 shadow-sm p-8">

                <div className="space-y-5">

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl"
                  >

                    {
                      loading ? (

                        <Loader2 className="h-5 w-5 animate-spin" />

                      ) : (

                        <>
                          <CircleCheckBig className="mr-2 h-5 w-5" />

                          Create Recruitment
                        </>
                      )
                    }

                  </Button>


                  <Link
                    href="/dashboard/recruitment"
                  >

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 rounded-xl"
                    >

                      Cancel

                    </Button>

                  </Link>

                </div>

              </Card>

            </div>

          </div>

        </form>

      </div>

    </DashboardLayout>
  )
}