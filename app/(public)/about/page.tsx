"use client"

import {

  HeartPulse,

  ShieldCheck,

  BrainCircuit,

  Building2,

  Users,

  Ambulance,

  Activity,

  ChevronRight,

} from "lucide-react"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import Link from "next/link"


const values = [

  {
    title: "Healthcare Innovation",
    description:
      "Advanced healthcare technology infrastructure and digital healthcare transformation.",
    icon: BrainCircuit,
  },

  {
    title: "Patient Care",
    description:
      "Enterprise healthcare systems focused on quality patient experience and healthcare delivery.",
    icon: HeartPulse,
  },

  {
    title: "Emergency Response",
    description:
      "24/7 emergency healthcare coordination and ambulance response infrastructure.",
    icon: Ambulance,
  },

  {
    title: "Healthcare Security",
    description:
      "Secure enterprise healthcare infrastructure and protected medical systems.",
    icon: ShieldCheck,
  },
]


export default function AboutPage() {

  return (

    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden border-b bg-gradient-to-br from-cyan-50 via-white to-blue-50">

        <div className="max-w-7xl mx-auto px-6 py-28">

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-center">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-3 bg-cyan-100 text-cyan-700 px-5 py-3 rounded-full text-sm font-medium mb-8">

                <ShieldCheck className="h-4 w-4" />

                Enterprise Healthcare Infrastructure

              </div>


              <h1 className="text-6xl font-black tracking-tight leading-tight">

                Transforming

                <span className="text-cyan-600">

                  {" "}Healthcare{" "}

                </span>

                Through Technology

              </h1>


              <p className="text-xl text-muted-foreground mt-8 leading-relaxed max-w-3xl">

                KSHMB Enterprise Healthcare Platform delivers
                intelligent healthcare systems, AI-powered medical analytics,
                emergency healthcare coordination, patient management,
                and digital healthcare innovation.

              </p>


              <div className="flex flex-wrap gap-4 mt-12">

                <Link href="/appointments">

                  <Button
                    size="lg"
                    className="h-16 rounded-2xl px-10"
                  >

                    Book Appointment

                    <ChevronRight className="ml-2 h-5 w-5" />

                  </Button>

                </Link>


                <Link href="/hospitals">

                  <Button
                    size="lg"
                    variant="outline"
                    className="h-16 rounded-2xl px-10"
                  >

                    Explore Hospitals

                  </Button>

                </Link>

              </div>

            </div>


            {/* RIGHT */}

            <div className="grid grid-cols-2 gap-6">

              <Card className="rounded-[32px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-cyan-100 flex items-center justify-center mb-6">

                  <Building2 className="h-8 w-8 text-cyan-700" />

                </div>

                <h2 className="text-5xl font-black">

                  24+

                </h2>

                <p className="text-muted-foreground mt-3">

                  Healthcare Facilities

                </p>

              </Card>


              <Card className="rounded-[32px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center mb-6">

                  <Users className="h-8 w-8 text-emerald-700" />

                </div>

                <h2 className="text-5xl font-black">

                  320+

                </h2>

                <p className="text-muted-foreground mt-3">

                  Medical Professionals

                </p>

              </Card>


              <Card className="rounded-[32px] border-0 shadow-sm p-8">

                <div className="h-16 w-16 rounded-3xl bg-red-100 flex items-center justify-center mb-6">

                  <Ambulance className="h-8 w-8 text-red-700" />

                </div>

                <h2 className="text-5xl font-black">

                  24/7

                </h2>

                <p className="text-muted-foreground mt-3">

                  Emergency Response

                </p>

              </Card>


              <Card className="rounded-[32px] border-0 shadow-sm p-8 bg-slate-900 text-white">

                <div className="h-16 w-16 rounded-3xl bg-white/10 flex items-center justify-center mb-6">

                  <Activity className="h-8 w-8 text-cyan-400" />

                </div>

                <h2 className="text-3xl font-black">

                  AI Analytics

                </h2>

                <p className="text-slate-400 mt-4 leading-relaxed">

                  Intelligent healthcare infrastructure and analytics.

                </p>

              </Card>

            </div>

          </div>

        </div>

      </section>


      {/* MISSION */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">

            <div>

              <h2 className="text-5xl font-black tracking-tight">

                Healthcare Mission

              </h2>


              <p className="text-xl text-muted-foreground mt-8 leading-relaxed">

                Delivering intelligent healthcare infrastructure
                powered by digital healthcare transformation,
                enterprise healthcare systems, emergency healthcare support,
                and AI-powered medical innovation.

              </p>


              <p className="text-lg text-muted-foreground mt-6 leading-relaxed">

                KSHMB healthcare ecosystem integrates hospitals,
                healthcare professionals, emergency services,
                medical analytics, recruitment, and AI healthcare operations
                into one secure enterprise platform.

              </p>

            </div>


            <Card className="rounded-[40px] border-0 shadow-2xl overflow-hidden bg-slate-900 text-white">

              <div className="p-14">

                <div className="h-20 w-20 rounded-[32px] bg-white/10 flex items-center justify-center">

                  <HeartPulse className="h-10 w-10 text-cyan-400" />

                </div>


                <h3 className="text-4xl font-black mt-10 leading-tight">

                  Smart Healthcare Ecosystem

                </h3>


                <p className="text-slate-400 text-lg mt-8 leading-relaxed">

                  Enterprise healthcare intelligence platform delivering
                  modern patient care, healthcare coordination,
                  AI analytics, and healthcare innovation.

                </p>

              </div>

            </Card>

          </div>

        </div>

      </section>


      {/* VALUES */}

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl">

            <h2 className="text-5xl font-black tracking-tight">

              Healthcare Core Values

            </h2>


            <p className="text-xl text-muted-foreground mt-6 leading-relaxed">

              Enterprise healthcare principles driving
              healthcare transformation and medical innovation.

            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">

            {
              values.map((value) => {

                const Icon = value.icon

                return (

                  <Card
                    key={value.title}
                    className="rounded-[32px] border-0 shadow-sm hover:shadow-2xl transition-all duration-300"
                  >

                    <div className="p-8">

                      <div className="h-16 w-16 rounded-3xl bg-slate-100 flex items-center justify-center mb-8">

                        <Icon className="h-8 w-8 text-slate-700" />

                      </div>


                      <h3 className="text-2xl font-bold">

                        {value.title}

                      </h3>


                      <p className="text-muted-foreground mt-5 leading-relaxed">

                        {value.description}

                      </p>

                    </div>

                  </Card>
                )
              })
            }

          </div>

        </div>

      </section>

    </main>
  )
}