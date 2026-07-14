"use client"

import { useState } from "react"

import { useForm } from "react-hook-form"

import { z } from "zod"

import { zodResolver }
from "@hookform/resolvers/zod"

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

import { createHospital }
from "@/services/hospital-service"


const schema = z.object({

  name: z.string().min(2),

  address: z.string().min(2),

  phone: z.string().min(5),

  lga: z.string().min(2),

  hospital_type: z.string().min(2),
})


type FormData = z.infer<typeof schema>


export default function CreateHospitalModal() {

  const [open, setOpen] = useState(false)

  const [loading, setLoading] = useState(false)


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })


  const onSubmit = async (
    data: FormData
  ) => {

    try {

      setLoading(true)

      await createHospital(data)

      toast.success(
        "Hospital created successfully"
      )

      reset()

      setOpen(false)

    } catch (error: any) {

      toast.error(
        error?.response?.data?.detail ||
        "Something went wrong"
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

        <Button className="rounded-xl">

          Create Hospital

        </Button>

      </DialogTrigger>


      <DialogContent className="rounded-2xl">

        <DialogHeader>

          <DialogTitle>

            Create Hospital

          </DialogTitle>

        </DialogHeader>


        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-4"
        >

          <Input
            placeholder="Hospital Name"
            {...register("name")}
          />

          <Input
            placeholder="Address"
            {...register("address")}
          />

          <Input
            placeholder="Phone"
            {...register("phone")}
          />

          <Input
            placeholder="LGA"
            {...register("lga")}
          />

          <Input
            placeholder="Hospital Type"
            {...register("hospital_type")}
          />


          <Button
            type="submit"
            className="w-full rounded-xl"
            disabled={loading}
          >

            {
              loading
                ? "Creating..."
                : "Create Hospital"
            }

          </Button>

        </form>

      </DialogContent>

    </Dialog>
  )
}