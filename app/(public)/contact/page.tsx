"use client"

import {

  Phone,

  Mail,

  MapPin,

  Clock3,

  ShieldCheck,

  HeartPulse,

  Send,

} from "lucide-react"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

import { Button } from "@/components/ui/button"

import { toast } from "sonner"


export default function ContactPage() {

  const handleSubmit = () => {

    toast.success(
      "Message sent successfully"
    )
  }

  return (

    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden border-b bg-gradient-to-br from-cyan-50 via-white to-blue-50">

        <div className="max-w-7xl mx-auto px-6 py-28">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-3 bg-cyan-100 text-cyan-700 px-5 py-3 rounded-full text-sm font-medium mb-8">

              <ShieldCheck className="h-4 w-4" />

              Enterprise Healthcare Support

            </div>


            <h1 className="text-6xl font-black tracking-tight leading-tight">

              Contact

              <span className="text-cyan-600">

                {" "}Healthcare{" "}

              </span>

              Support

            </h1>


            <p className="text-xl text-muted-foreground mt-8 leading-relaxed max-w-3xl">

              Reach healthcare support services, emergency response,
              enterprise healthcare operations, and medical assistance teams.

            </p>

          </div>

        </div>

      </section>


      {/* CONTENT */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

            {/* CONTACT FORM */}

            <Card className="xl:col-span-2 rounded-[32px] border-0 shadow-sm p-10">

              <div>

                <h2 className="text-4xl font-black tracking-tight">

                  Send A Message

                </h2>


                <p className="text-muted-foreground mt-4 text-lg">

                  Contact healthcare support and operations team.

                </p>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

                <div className="space-y-3">

                  <Label>

                    Full Name

                  </Label>

                  <Input
                    placeholder="Enter full name"
                    className="h-12 rounded-xl"
                  />

                </div>


                <div className="space-y-3">

                  <Label>

                    Email Address

                  </Label>

                  <Input
                    type="email"
                    placeholder="example@email.com"
                    className="h-12 rounded-xl"
                  />

                </div>


                <div className="space-y-3">

                  <Label>

                    Phone Number

                  </Label>

                  <Input
                    placeholder="+234..."
                    className="h-12 rounded-xl"
                  />

                </div>


                <div className="space-y-3">

                  <Label>

                    Subject

                  </Label>

                  <Input
                    placeholder="Enter subject"
                    className="h-12 rounded-xl"
                  />

                </div>

              </div>


              <div className="space-y-3 mt-6">

                <Label>

                  Message

                </Label>

                <Textarea
                  placeholder="Write your message..."
                  className="rounded-2xl min-h-[180px]"
                />

              </div>


              <Button
                onClick={handleSubmit}
                className="mt-10 h-14 rounded-2xl px-8"
              >

                Send Message

                <Send className="ml-2 h-5 w-5" />

              </Button>

            </Card>


            {/* SIDE PANEL */}

            <div className="space-y-6">

              <Card className="rounded-[32px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-cyan-100 flex items-center justify-center mb-6">

                  <Phone className="h-8 w-8 text-cyan-700" />

                </div>

                <h2 className="text-2xl font-black">

                  Emergency Hotline

                </h2>

                <p className="text-muted-foreground mt-4">

                  +234 800 000 0000

                </p>

              </Card>


              <Card className="rounded-[32px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center mb-6">

                  <Mail className="h-8 w-8 text-emerald-700" />

                </div>

                <h2 className="text-2xl font-black">

                  Email Address

                </h2>

                <p className="text-muted-foreground mt-4">

                  support@kshmb.gov.ng

                </p>

              </Card>


              <Card className="rounded-[32px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-purple-100 flex items-center justify-center mb-6">

                  <MapPin className="h-8 w-8 text-purple-700" />

                </div>

                <h2 className="text-2xl font-black">

                  Headquarters

                </h2>

                <p className="text-muted-foreground mt-4">

                  Kano State, Nigeria

                </p>

              </Card>


              <Card className="rounded-[32px] border-0 shadow-sm p-8 bg-slate-900 text-white">

                <div className="h-16 w-16 rounded-3xl bg-white/10 flex items-center justify-center mb-6">

                  <HeartPulse className="h-8 w-8 text-cyan-400" />

                </div>

                <h2 className="text-3xl font-black">

                  24/7 Healthcare Support

                </h2>

                <p className="text-slate-400 mt-4 leading-relaxed">

                  Enterprise healthcare support and emergency response services.

                </p>

              </Card>


              <Card className="rounded-[32px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-orange-100 flex items-center justify-center mb-6">

                  <Clock3 className="h-8 w-8 text-orange-700" />

                </div>

                <h2 className="text-2xl font-black">

                  Working Hours

                </h2>

                <p className="text-muted-foreground mt-4 leading-relaxed">

                  Monday - Friday
                  <br />
                  8:00 AM - 5:00 PM

                </p>

              </Card>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}