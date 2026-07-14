"use client"

import {

  BrainCircuit,

  ShieldCheck,

  Activity,

  HeartPulse,

  Stethoscope,

  Database,

  Ambulance,

  ChevronRight,

  Sparkles,

} from "lucide-react"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import Link from "next/link"


const aiFeatures = [

  {
    title: "AI Symptom Analysis",
    description:
      "Smart symptom evaluation and healthcare recommendations powered by AI.",
    icon: Stethoscope,
  },

  {
    title: "Predictive Healthcare",
    description:
      "Advanced analytics and predictive medical intelligence infrastructure.",
    icon: Activity,
  },

  {
    title: "Medical Intelligence",
    description:
      "Enterprise healthcare data processing and AI-driven medical insights.",
    icon: Database,
  },

  {
    title: "Emergency AI Response",
    description:
      "Intelligent emergency healthcare coordination and response support.",
    icon: Ambulance,
  },
]


export default function AIHealthcarePage() {

  return (

    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden border-b bg-gradient-to-br from-purple-50 via-white to-cyan-50">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_30%)]" />


        <div className="relative max-w-7xl mx-auto px-6 py-28">

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-center">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-3 bg-purple-100 text-purple-700 px-5 py-3 rounded-full text-sm font-medium mb-8">

                <Sparkles className="h-4 w-4" />

                AI-Powered Healthcare Intelligence

              </div>


              <h1 className="text-6xl font-black tracking-tight leading-tight">

                Future Of

                <span className="text-cyan-600">

                  {" "}AI Healthcare{" "}

                </span>

                Innovation

              </h1>


              <p className="text-xl text-muted-foreground mt-8 leading-relaxed max-w-3xl">

                Advanced artificial intelligence infrastructure
                transforming healthcare analytics, patient care,
                emergency response, diagnostics, and medical operations.

              </p>


              <div className="flex flex-wrap gap-4 mt-12">

                <Button
                  size="lg"
                  className="h-16 rounded-2xl px-10 bg-slate-900 hover:bg-slate-800 text-lg"
                >

                  Launch AI Assistant

                  <ChevronRight className="ml-2 h-5 w-5" />

                </Button>


                <Link href="/analytics">

                  <Button
                    size="lg"
                    variant="outline"
                    className="h-16 rounded-2xl px-10 text-lg"
                  >

                    View Analytics

                  </Button>

                </Link>

              </div>

            </div>


            {/* RIGHT */}

            <div className="grid grid-cols-2 gap-6">

              <Card className="rounded-[32px] border-0 shadow-sm p-8 bg-white">

                <div className="h-16 w-16 rounded-3xl bg-cyan-100 flex items-center justify-center mb-6">

                  <BrainCircuit className="h-8 w-8 text-cyan-700" />

                </div>

                <h2 className="text-5xl font-black">

                  AI

                </h2>

                <p className="text-muted-foreground mt-3">

                  Medical Intelligence

                </p>

              </Card>


              <Card className="rounded-[32px] border-0 shadow-sm p-8 bg-white">

                <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center mb-6">

                  <HeartPulse className="h-8 w-8 text-emerald-700" />

                </div>

                <h2 className="text-5xl font-black">

                  24/7

                </h2>

                <p className="text-muted-foreground mt-3">

                  AI Monitoring

                </p>

              </Card>


              <Card className="rounded-[32px] border-0 shadow-sm p-8 bg-white">

                <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center mb-6">

                  <Activity className="h-8 w-8 text-blue-700" />

                </div>

                <h2 className="text-5xl font-black">

                  Live

                </h2>

                <p className="text-muted-foreground mt-3">

                  Healthcare Analytics

                </p>

              </Card>


              <Card className="rounded-[32px] border-0 shadow-sm p-8 bg-slate-900 text-white">

                <div className="h-16 w-16 rounded-3xl bg-white/10 flex items-center justify-center mb-6">

                  <ShieldCheck className="h-8 w-8 text-cyan-400" />

                </div>

                <h2 className="text-3xl font-black">

                  Secure AI

                </h2>

                <p className="text-slate-400 mt-4 leading-relaxed">

                  Enterprise-grade healthcare security infrastructure.

                </p>

              </Card>

            </div>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-3 bg-cyan-100 text-cyan-700 px-5 py-3 rounded-full text-sm font-medium mb-8">

              <BrainCircuit className="h-4 w-4" />

              AI Healthcare Infrastructure

            </div>


            <h2 className="text-5xl font-black tracking-tight">

              AI Healthcare Capabilities

            </h2>


            <p className="text-xl text-muted-foreground mt-6 leading-relaxed">

              Enterprise healthcare artificial intelligence modules
              delivering smart medical assistance and healthcare automation.

            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">

            {
              aiFeatures.map((feature) => {

                const Icon = feature.icon

                return (

                  <Card
                    key={feature.title}
                    className="rounded-[32px] border-0 shadow-sm hover:shadow-2xl transition-all duration-300"
                  >

                    <div className="p-8">

                      <div className="h-16 w-16 rounded-3xl bg-slate-100 flex items-center justify-center mb-8">

                        <Icon className="h-8 w-8 text-slate-700" />

                      </div>


                      <h3 className="text-2xl font-bold">

                        {feature.title}

                      </h3>


                      <p className="text-muted-foreground mt-5 leading-relaxed">

                        {feature.description}

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