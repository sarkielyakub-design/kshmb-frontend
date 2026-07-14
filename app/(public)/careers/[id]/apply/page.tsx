"use client"

import { useEffect, useState } from "react"

import { useParams, useRouter } from "next/navigation"

import Link from "next/link"

import {

  BriefcaseBusiness,

  MapPin,

  Clock3,

  Building2,

  ChevronLeft,

  Loader2,

  Send,

  FileText,

  CheckCircle2,

} from "lucide-react"

import { Button } from "@/components/ui/button"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"

import {

  getJobs,

  applyForJob,

} from "@/services/recruitment-service"

import { toast } from "sonner"


export default function CareerApplyPage() {

  const params = useParams()

  const router = useRouter()

  const [job, setJob] = useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  const [submitting, setSubmitting] =
    useState(false)

  const [formData, setFormData] =
    useState({

      full_name: "",

      email: "",

      phone: "",

      cv_url: "",
    })


  // =====================================
  // FETCH JOB
  // =====================================

  useEffect(() => {

    const fetchJob = async () => {

      try {

        const jobs = await getJobs()

        const selectedJob = jobs.find(
          (item: any) =>
            item.id === Number(params.id)
        )

        setJob(selectedJob)

      } catch (error) {

        toast.error(
          "Failed to load job"
        )

      } finally {

        setLoading(false)
      }
    }

    fetchJob()

  }, [params.id])


  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (
    e: any
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

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      setSubmitting(true)

      await applyForJob(

        Number(params.id),

        formData
      )

      toast.success(
        "Application submitted successfully"
      )

      router.push("/careers")

    } catch (error) {

      toast.error(
        "Failed to submit application"
      )

    } finally {

      setSubmitting(false)
    }
  }


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-50">

        <Loader2 className="h-12 w-12 animate-spin text-blue-700" />

      </div>
    )
  }


  // =====================================
  // NO JOB
  // =====================================

  if (!job) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold">

          Job not found

        </h1>

      </div>
    )
  }


  return (

    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-b">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <Link
            href={`/careers/${job.id}`}
          >

            <Button
              variant="outline"
              className="rounded-xl mb-10"
            >

              <ChevronLeft className="mr-2 h-4 w-4" />

              Back To Job
            </Button>

          </Link>


          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-5 py-3 rounded-full text-sm font-medium mb-8">

                <CheckCircle2 className="h-4 w-4" />

                Recruitment Portal
              </div>


              <h1 className="text-5xl font-black tracking-tight leading-tight">

                Apply For
                <br />

                {job.title}

              </h1>


              <p className="text-muted-foreground text-xl mt-6 leading-relaxed">

                Join Kano State Hospital Management Board
                and become part of the future of healthcare
                innovation and patient care excellence.

              </p>


              <div className="space-y-5 mt-10">

                <div className="flex items-center gap-4">

                  <Building2 className="h-6 w-6 text-blue-700" />

                  <span className="text-lg">

                    {job.department}

                  </span>

                </div>


                <div className="flex items-center gap-4">

                  <MapPin className="h-6 w-6 text-blue-700" />

                  <span className="text-lg">

                    {job.location}

                  </span>

                </div>


                <div className="flex items-center gap-4">

                  <Clock3 className="h-6 w-6 text-blue-700" />

                  <span className="text-lg">

                    {job.employment_type}

                  </span>

                </div>

              </div>

            </div>


            {/* RIGHT */}

            <Card className="rounded-[32px] border-0 shadow-xl p-10">

              <div className="flex items-center gap-4 mb-8">

                <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center">

                  <BriefcaseBusiness className="h-8 w-8 text-blue-700" />

                </div>

                <div>

                  <h2 className="text-3xl font-bold">

                    Application Form

                  </h2>

                  <p className="text-muted-foreground mt-1">

                    Submit your application
                  </p>

                </div>

              </div>


              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* FULL NAME */}

                <div>

                  <label className="text-sm font-medium">

                    Full Name
                  </label>

                  <Input
                    name="full_name"
                    placeholder="Enter your full name"
                    className="h-12 rounded-xl mt-2"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* EMAIL */}

                <div>

                  <label className="text-sm font-medium">

                    Email Address
                  </label>

                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="h-12 rounded-xl mt-2"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* PHONE */}

                <div>

                  <label className="text-sm font-medium">

                    Phone Number
                  </label>

                  <Input
                    name="phone"
                    placeholder="Enter phone number"
                    className="h-12 rounded-xl mt-2"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* CV URL */}

                <div>

                  <label className="text-sm font-medium">

                    CV / Resume URL
                  </label>

                  <Input
                    name="cv_url"
                    placeholder="Paste CV link"
                    className="h-12 rounded-xl mt-2"
                    value={formData.cv_url}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* NOTE */}

                <div>

                  <label className="text-sm font-medium">

                    Additional Note
                  </label>

                  <Textarea
                    placeholder="Optional message..."
                    className="rounded-2xl mt-2"
                  />

                </div>


                {/* BUTTON */}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-14 rounded-2xl text-base"
                >

                  {
                    submitting ? (

                      <Loader2 className="h-5 w-5 animate-spin" />

                    ) : (

                      <>
                        <Send className="mr-2 h-5 w-5" />

                        Submit Application
                      </>
                    )
                  }

                </Button>

              </form>

            </Card>

          </div>

        </div>

      </section>


      {/* REQUIREMENTS */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

            {/* DESCRIPTION */}

            <Card className="rounded-[32px] border-0 shadow-sm p-10">

              <h2 className="text-4xl font-black">

                Job Description

              </h2>

              <p className="text-muted-foreground leading-relaxed mt-8 text-lg whitespace-pre-line">

                {job.description}

              </p>

            </Card>


            {/* REQUIREMENTS */}

            <Card className="rounded-[32px] border-0 shadow-sm p-10">

              <div className="flex items-center gap-4">

                <div className="h-16 w-16 rounded-3xl bg-cyan-100 flex items-center justify-center">

                  <FileText className="h-8 w-8 text-cyan-700" />

                </div>

                <div>

                  <h2 className="text-4xl font-black">

                    Requirements

                  </h2>

                </div>

              </div>


              <p className="text-muted-foreground leading-relaxed mt-8 text-lg whitespace-pre-line">

                {job.requirements}

              </p>

            </Card>

          </div>

        </div>

      </section>

    </main>
  )
}