"use client"

import { useState } from "react"

import {

  BrainCircuit,

  Send,

  Loader2,

  Sparkles,

  Activity,

  ShieldAlert,

} from "lucide-react"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Card } from "@/components/ui/card"

import { toast } from "sonner"


export default function AIAssistantCard() {

  const [question, setQuestion] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [response, setResponse] =
    useState("")


  // =====================================
  // AI ASK
  // =====================================

  const handleAskAI = async () => {

    if (!question.trim()) {

      toast.error(
        "Please enter a question"
      )

      return
    }

    try {

      setLoading(true)

      // =================================
      // FUTURE API
      // =================================

      // const response = await api.post(
      //   "/ai/ask",
      //   {
      //     question
      //   }
      // )

      // setResponse(response.data.answer)

      // MOCK RESPONSE

      setTimeout(() => {

        setResponse(

          "AI Insight: Emergency cases increased by 12% this week. Cardiology appointments show higher patient demand. Pharmacy stock for antibiotics is running low."

        )

        setLoading(false)

      }, 1500)

    } catch (error) {

      toast.error(
        "AI request failed"
      )

      setLoading(false)
    }
  }


  return (

    <Card className="border-0 rounded-3xl bg-slate-900 text-white shadow-sm overflow-hidden">

      <div className="p-6">

        {/* HEADER */}

        <div className="flex items-center gap-4">

          <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center">

            <BrainCircuit className="h-7 w-7 text-cyan-400" />

          </div>


          <div>

            <h3 className="text-xl font-semibold">

              AI Healthcare Assistant

            </h3>

            <p className="text-slate-400 text-sm mt-1">

              Smart healthcare intelligence and analytics

            </p>

          </div>

        </div>


        {/* AI INSIGHTS */}

        <div className="mt-6 space-y-3">

          <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4">

            <Activity className="h-5 w-5 text-emerald-400 mt-1" />

            <div>

              <p className="font-medium">

                Live Healthcare Insight

              </p>

              <p className="text-slate-400 text-sm mt-1">

                Emergency admissions increased today.

              </p>

            </div>

          </div>


          <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4">

            <ShieldAlert className="h-5 w-5 text-orange-400 mt-1" />

            <div>

              <p className="font-medium">

                System Recommendation

              </p>

              <p className="text-slate-400 text-sm mt-1">

                Review pharmacy stock for critical medications.

              </p>

            </div>

          </div>

        </div>


        {/* ASK AI */}

        <div className="mt-8">

          <div className="flex gap-3">

            <Input
              placeholder="Ask AI about healthcare analytics..."
              className="bg-white/10 border-white/10 text-white placeholder:text-slate-400 rounded-2xl h-12"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
            />


            <Button
              className="rounded-2xl h-12 px-5"
              onClick={handleAskAI}
              disabled={loading}
            >

              {
                loading
                ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                )
                : (
                  <Send className="h-5 w-5" />
                )
              }

            </Button>

          </div>

        </div>


        {/* AI RESPONSE */}

        {
          response && (

            <div className="mt-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-5">

              <div className="flex items-center gap-2 mb-3">

                <Sparkles className="h-5 w-5 text-cyan-400" />

                <p className="font-medium text-cyan-300">

                  AI Response

                </p>

              </div>

              <p className="text-slate-200 leading-relaxed">

                {response}

              </p>

            </div>
          )
        }

      </div>

    </Card>
  )
}