"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"

import { Button } from "@/components/ui/button"

import {

  Newspaper,

  Loader2,

  Save

} from "lucide-react"

import { toast } from "sonner"

import {

  createNews

} from "@/services/news-service"


export default function CreateNewsPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({

      title: "",

      summary: "",

      content: "",

      image: "",

      author: "",

      headline: false
    })


  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault()

      setLoading(true)

      try {

        await createNews(
          formData
        )

        toast.success(
          "News created successfully"
        )

        router.push(
          "/dashboard/news"
        )

      } catch (error) {

        console.log(error)

        toast.error(
          "Failed to create news"
        )

      } finally {

        setLoading(false)
      }
    }


  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}

        <div className="flex items-center gap-5">

          <div className="h-20 w-20 rounded-[30px] bg-blue-100 flex items-center justify-center">

            <Newspaper className="h-10 w-10 text-blue-700" />

          </div>

          <div>

            <h1 className="text-5xl font-black">

              Create News

            </h1>

            <p className="text-slate-500 mt-2">

              Publish latest public announcements and headlines

            </p>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
        >

          <Card className="rounded-[32px] p-10 border-0 shadow-sm space-y-8">

            {/* TITLE */}

            <div className="space-y-3">

              <label className="font-semibold">

                News Title

              </label>

              <Input
                required
                placeholder="Enter news title"
                className="h-14 rounded-2xl"
                value={formData.title}
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    title:
                      e.target.value
                  })
                }
              />

            </div>

            {/* SUMMARY */}

            <div className="space-y-3">

              <label className="font-semibold">

                Summary

              </label>

              <Textarea
                placeholder="Short summary..."
                className="rounded-2xl min-h-[120px]"
                value={formData.summary}
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    summary:
                      e.target.value
                  })
                }
              />

            </div>

            {/* CONTENT */}

            <div className="space-y-3">

              <label className="font-semibold">

                Full News Content

              </label>

              <Textarea
                required
                placeholder="Write full news..."
                className="rounded-2xl min-h-[300px]"
                value={formData.content}
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    content:
                      e.target.value
                  })
                }
              />

            </div>

            {/* IMAGE */}

            <div className="space-y-3">

              <label className="font-semibold">

                News Image URL

              </label>

              <Input
                placeholder="https://..."
                className="h-14 rounded-2xl"
                value={formData.image}
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    image:
                      e.target.value
                  })
                }
              />

            </div>

            {/* AUTHOR */}

            <div className="space-y-3">

              <label className="font-semibold">

                Author

              </label>

              <Input
                placeholder="News author"
                className="h-14 rounded-2xl"
                value={formData.author}
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    author:
                      e.target.value
                  })
                }
              />

            </div>

            {/* HEADLINE */}

            <div className="flex items-center gap-4">

              <input
                type="checkbox"
                checked={
                  formData.headline
                }
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    headline:
                      e.target.checked
                  })
                }
                className="h-5 w-5"
              />

              <p className="font-medium">

                Show as headline breaking news

              </p>

            </div>

            {/* BUTTON */}

            <Button
              type="submit"
              disabled={loading}
              className="h-14 rounded-2xl px-8"
            >

              {
                loading
                  ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  )
                  : (
                    <Save className="h-5 w-5 mr-2" />
                  )
              }

              Publish News

            </Button>

          </Card>

        </form>

      </div>

    </DashboardLayout>
  )
}