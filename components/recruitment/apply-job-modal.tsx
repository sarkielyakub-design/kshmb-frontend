"use client"

import { useState } from "react"

import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import { Loader2 } from "lucide-react"

import {
  applyForJob
} from "@/services/job-application-service"


interface Props {

  position: string
}


export default function ApplyJobModal({
  position
}: Props) {

  const [open, setOpen] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [cv, setCv] =
    useState<File | null>(null)

  const [form, setForm] = useState({

    full_name: "",

    email: "",

    phone: "",

    cover_letter: "",
  })


  const handleSubmit = async () => {

    try {

      if (!cv) {

        toast.error(
          "Please upload your CV"
        )

        return
      }

      setLoading(true)

      await applyForJob({

        ...form,

        position,

        cv,
      })

      toast.success(
        "Application submitted successfully"
      )

      setOpen(false)

    } catch (error: any) {

      toast.error(

        error?.response?.data?.detail ||

        "Application failed"
      )

    } finally {

      setLoading(false)
    }
  }


  return (

    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>

        <Button
          className="rounded-xl h-12 px-8"
        >

          Apply Now

        </Button>

      </DialogTrigger>


      <DialogContent className="rounded-3xl">

        <DialogHeader>

          <DialogTitle className="text-2xl">

            Apply for Position

          </DialogTitle>

        </DialogHeader>


        <div className="space-y-5 mt-6">

          <div>

            <Label>
              Full Name
            </Label>

            <Input
              className="h-12 rounded-xl mt-2"
              value={form.full_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  full_name: e.target.value,
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
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

          </div>


          <div>

            <Label>
              Phone Number
            </Label>

            <Input
              className="h-12 rounded-xl mt-2"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />

          </div>


          <div>

            <Label>
              Cover Letter
            </Label>

            <Textarea
              className="rounded-xl mt-2"
              rows={5}
              value={form.cover_letter}
              onChange={(e) =>
                setForm({
                  ...form,
                  cover_letter:
                    e.target.value,
                })
              }
            />

          </div>


          <div>

            <Label>
              Upload CV
            </Label>

            <Input
              type="file"
              className="mt-2"
              onChange={(e) => {

                if (
                  e.target.files?.[0]
                ) {

                  setCv(
                    e.target.files[0]
                  )
                }
              }}
            />

          </div>


          <Button
            className="w-full h-12 rounded-xl"
            disabled={loading}
            onClick={handleSubmit}
          >

            {
              loading ? (

                <div className="flex items-center gap-2">

                  <Loader2 className="h-5 w-5 animate-spin" />

                  Submitting...

                </div>

              ) : (

                "Submit Application"
              )
            }

          </Button>

        </div>

      </DialogContent>

    </Dialog>
  )
}