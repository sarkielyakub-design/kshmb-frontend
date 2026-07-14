"use client"

import Link from "next/link"

import { useEffect, useState } from "react"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
  FlaskConical,
  ArrowRight,
} from "lucide-react"

import {
  getLabTests,
} from "@/services/laboratory-service"

export default function PublicLaboratoryPage() {

  const [tests, setTests] =
    useState<any[]>([])

  useEffect(() => {

    fetchTests()

  }, [])

  const fetchTests = async () => {

    try {

      const data =
        await getLabTests()

      setTests(data)

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div className="min-h-screen bg-slate-50">

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto">

            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-5 py-3 rounded-full font-semibold mb-8">

              <FlaskConical className="h-5 w-5" />

              Laboratory Services

            </div>

            <h1 className="text-6xl font-black">

              KSHMB Laboratory System

            </h1>

            <p className="text-slate-500 text-xl mt-8 leading-relaxed">

              Advanced medical diagnostics,
              AI healthcare laboratory testing,
              and intelligent healthcare analysis.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">

            {
              tests.map((test) => (

                <Card
                  key={test.id}
                  className="rounded-[32px] p-8"
                >

                  <div className="h-16 w-16 rounded-3xl bg-cyan-100 flex items-center justify-center">

                    <FlaskConical className="h-8 w-8 text-cyan-700" />

                  </div>

                  <h2 className="text-3xl font-black mt-8">

                    {test.test_name}

                  </h2>

                  <p className="text-slate-500 mt-4">

                    {test.category}

                  </p>

                  <p className="text-slate-600 mt-6 leading-relaxed">

                    {test.description}

                  </p>

                  <div className="mt-10 flex items-center justify-between">

                    <span className="text-4xl font-black">

                      ₦{test.price}

                    </span>

                    <Link href="/appointments">

                      <Button className="rounded-2xl">

                        Book Test

                        <ArrowRight className="ml-2 h-4 w-4" />

                      </Button>

                    </Link>

                  </div>

                </Card>
              ))
            }

          </div>

        </div>

      </section>

    </div>
  )
}