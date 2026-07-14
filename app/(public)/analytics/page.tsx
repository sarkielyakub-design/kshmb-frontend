"use client"

import {

  Activity,

  TrendingUp,

  HeartPulse,

  Ambulance,

  BrainCircuit,

  ShieldCheck,

  Building2,

  Users,

  Calendar,

  Database,

} from "lucide-react"

import { Card } from "@/components/ui/card"


const analyticsCards = [

  {
    title: "Healthcare Facilities",
    value: "24+",
    description: "Connected hospitals and healthcare centers",
    icon: Building2,
  },

  {
    title: "Medical Professionals",
    value: "320+",
    description: "Certified doctors and specialists",
    icon: Users,
  },

  {
    title: "Appointments",
    value: "50K+",
    description: "Digital healthcare appointments",
    icon: Calendar,
  },

  {
    title: "Emergency Response",
    value: "98%",
    description: "Emergency healthcare response rate",
    icon: Ambulance,
  },
]


const systemMetrics = [

  {
    title: "AI Healthcare Intelligence",
    value: "Active",
    icon: BrainCircuit,
  },

  {
    title: "Healthcare Monitoring",
    value: "24/7",
    icon: Activity,
  },

  {
    title: "Security Infrastructure",
    value: "Secure",
    icon: ShieldCheck,
  },

  {
    title: "Healthcare Database",
    value: "Live",
    icon: Database,
  },
]


export default function AnalyticsPage() {

  return (

    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden border-b bg-gradient-to-br from-blue-50 via-white to-cyan-50">

        <div className="max-w-7xl mx-auto px-6 py-28">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-3 bg-cyan-100 text-cyan-700 px-5 py-3 rounded-full text-sm font-medium mb-8">

              <TrendingUp className="h-4 w-4" />

              Real-time Healthcare Intelligence

            </div>


            <h1 className="text-6xl font-black tracking-tight leading-tight">

              Healthcare

              <span className="text-cyan-600">

                {" "}Analytics{" "}

              </span>

              Infrastructure

            </h1>


            <p className="text-xl text-muted-foreground mt-8 leading-relaxed max-w-3xl">

              Enterprise healthcare analytics platform delivering
              intelligent insights, real-time healthcare monitoring,
              medical infrastructure analytics, and AI-powered reporting.

            </p>

          </div>

        </div>

      </section>


      {/* MAIN ANALYTICS */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

            {
              analyticsCards.map((card) => {

                const Icon = card.icon

                return (

                  <Card
                    key={card.title}
                    className="rounded-[32px] border-0 shadow-sm hover:shadow-2xl transition-all duration-300"
                  >

                    <div className="p-8">

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-muted-foreground">

                            {card.title}

                          </p>

                          <h2 className="text-5xl font-black mt-4">

                            {card.value}

                          </h2>

                        </div>


                        <div className="h-16 w-16 rounded-3xl bg-cyan-100 flex items-center justify-center">

                          <Icon className="h-8 w-8 text-cyan-700" />

                        </div>

                      </div>


                      <p className="text-muted-foreground mt-6 leading-relaxed">

                        {card.description}

                      </p>

                    </div>

                  </Card>
                )
              })
            }

          </div>

        </div>

      </section>


      {/* HEALTHCARE OVERVIEW */}

      <section className="pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* MAIN CHART */}

            <Card className="xl:col-span-2 rounded-[32px] border-0 shadow-sm overflow-hidden">

              <div className="p-10">

                <div className="flex items-center justify-between mb-10">

                  <div>

                    <h2 className="text-4xl font-black tracking-tight">

                      Healthcare Performance

                    </h2>

                    <p className="text-muted-foreground mt-3">

                      Real-time healthcare infrastructure analytics

                    </p>

                  </div>


                  <div className="bg-emerald-100 text-emerald-700 px-5 py-3 rounded-full text-sm font-medium">

                    Live Analytics

                  </div>

                </div>


                <div className="h-[400px] rounded-[32px] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">

                  <div className="text-center">

                    <Activity className="h-20 w-20 mx-auto text-slate-500 mb-6" />

                    <h3 className="text-3xl font-bold">

                      Analytics Visualization

                    </h3>

                    <p className="text-muted-foreground mt-4 text-lg">

                      Recharts & AI analytics integration ready

                    </p>

                  </div>

                </div>

              </div>

            </Card>


            {/* SIDE METRICS */}

            <div className="space-y-8">

              {
                systemMetrics.map((metric) => {

                  const Icon = metric.icon

                  return (

                    <Card
                      key={metric.title}
                      className="rounded-[32px] border-0 shadow-sm"
                    >

                      <div className="p-8">

                        <div className="flex items-center justify-between">

                          <div>

                            <p className="text-muted-foreground">

                              {metric.title}

                            </p>

                            <h2 className="text-4xl font-black mt-4">

                              {metric.value}

                            </h2>

                          </div>


                          <div className="h-16 w-16 rounded-3xl bg-slate-100 flex items-center justify-center">

                            <Icon className="h-8 w-8 text-slate-700" />

                          </div>

                        </div>

                      </div>

                    </Card>
                  )
                })
              }

            </div>

          </div>

        </div>

      </section>


      {/* AI HEALTHCARE */}

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <Card className="rounded-[40px] border-0 shadow-2xl overflow-hidden bg-slate-900 text-white">

            <div className="grid grid-cols-1 xl:grid-cols-2">

              <div className="p-14">

                <div className="h-16 w-16 rounded-3xl bg-white/10 flex items-center justify-center">

                  <BrainCircuit className="h-8 w-8 text-cyan-400" />

                </div>


                <h2 className="text-5xl font-black mt-10 leading-tight">

                  AI-Powered Healthcare Intelligence

                </h2>


                <p className="text-slate-400 text-xl mt-8 leading-relaxed">

                  Advanced medical analytics, predictive healthcare,
                  real-time monitoring, and AI healthcare infrastructure.

                </p>

              </div>


              <div className="bg-gradient-to-br from-cyan-500 to-blue-700 min-h-[400px]" />

            </div>

          </Card>

        </div>

      </section>

    </main>
  )
}