"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {

  Newspaper,

  Plus,

  CalendarDays,

  Eye,

  Loader2,

  ArrowRight,

  Search,

  Trash2,

  Pencil,

} from "lucide-react"

import { toast } from "sonner"

import {
  getNews,
  deleteNews,
} from "@/services/news-service"



export default function NewsPage() {

  const [news, setNews] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")


  // =====================================
  // FETCH NEWS
  // =====================================

  useEffect(() => {

    fetchNews()

  }, [])


  const fetchNews = async () => {

    try {

      const data =
        await getNews()

      setNews(data)

    } catch (error) {

      console.log(error)

      toast.error(
        "Failed to load news"
      )

    } finally {

      setLoading(false)
    }
  }


  // =====================================
  // DELETE NEWS
  // =====================================

  const handleDelete =
    async (id: number) => {

      const confirmDelete =
        confirm(
          "Are you sure you want to delete this news?"
        )

      if (!confirmDelete) return

      try {

        await deleteNews(id)

        toast.success(
          "News deleted successfully"
        )

        fetchNews()

      } catch (error) {

        console.log(error)

        toast.error(
          "Failed to delete news"
        )
      }
    }


  // =====================================
  // FILTER NEWS
  // =====================================

  const filteredNews =
    news.filter((item) =>
      item.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <DashboardLayout>

        <div className="h-[70vh] flex items-center justify-center">

          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />

        </div>

      </DashboardLayout>
    )
  }


  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-blue-700 via-cyan-600 to-sky-700 p-10 text-white">

          <div className="absolute top-0 right-0 h-72 w-72 bg-white/10 rounded-full blur-3xl" />

          <div className="absolute bottom-0 left-0 h-72 w-72 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

            <div>

              <div className="flex items-center gap-4">

                <div className="h-20 w-20 rounded-[28px] bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center">

                  <Newspaper className="h-10 w-10 text-white" />

                </div>

                <div>

                  <h1 className="text-5xl font-black tracking-tight">

                    News Management

                  </h1>

                  <p className="text-blue-100 text-lg mt-3 max-w-2xl">

                    Manage KSHMB headlines, announcements,
                    healthcare updates, and public news.

                  </p>

                </div>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="flex flex-wrap gap-4">

              <Link
                href="/dashboard/news/create"
              >

                <Button className="h-14 px-8 rounded-2xl bg-white text-slate-900 hover:bg-slate-100">

                  <Plus className="mr-2 h-5 w-5" />

                  Create News

                </Button>

              </Link>

            </div>

          </div>

        </div>


        {/* =====================================
            TOP STATS
        ===================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Card className="rounded-[30px] border-0 shadow-sm p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">

                  Total News

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {news.length}

                </h2>

              </div>

              <div className="h-16 w-16 rounded-3xl bg-blue-100 flex items-center justify-center">

                <Newspaper className="h-8 w-8 text-blue-700" />

              </div>

            </div>

          </Card>


          <Card className="rounded-[30px] border-0 shadow-sm p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">

                  Published Today

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {
                    news.filter(
                      (item) =>
                        new Date(
                          item.created_at
                        ).toDateString() ===
                        new Date().toDateString()
                    ).length
                  }

                </h2>

              </div>

              <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center">

                <CalendarDays className="h-8 w-8 text-emerald-700" />

              </div>

            </div>

          </Card>


          <Card className="rounded-[30px] border-0 shadow-sm p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">

                  Public Headlines

                </p>

                <h2 className="text-5xl font-black mt-3">

                  Active

                </h2>

              </div>

              <div className="h-16 w-16 rounded-3xl bg-cyan-100 flex items-center justify-center">

                <Eye className="h-8 w-8 text-cyan-700" />

              </div>

            </div>

          </Card>

        </div>


        {/* =====================================
            SEARCH
        ===================================== */}

        <Card className="rounded-[30px] border-0 shadow-sm p-6">

          <div className="relative">

            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full h-14 rounded-2xl border border-slate-200 pl-14 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </Card>


        {/* =====================================
            NEWS LIST
        ===================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {
            filteredNews.length === 0 && (

              <Card className="rounded-[30px] p-16 border-0 shadow-sm col-span-full text-center">

                <Newspaper className="h-16 w-16 text-slate-300 mx-auto mb-6" />

                <h2 className="text-3xl font-black text-slate-900">

                  No News Available

                </h2>

                <p className="text-slate-500 mt-3">

                  Start by creating your first news article.

                </p>

                <Link
                  href="/dashboard/news/create"
                >

                  <Button className="mt-8 rounded-2xl h-12 px-6">

                    <Plus className="mr-2 h-5 w-5" />

                    Create News

                  </Button>

                </Link>

              </Card>
            )
          }

          {
            filteredNews.map((item) => (

              <Card
                key={item.id}
                className="rounded-[32px] overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-300"
              >

                {/* IMAGE */}

                <div className="h-64 bg-gradient-to-br from-blue-700 via-cyan-600 to-sky-600 relative">

                  {
                    item.image && (

                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )
                  }

                </div>

                {/* CONTENT */}

                <div className="p-8">

                  <div className="flex items-center justify-between text-sm text-slate-500 mb-5">

                    <div className="flex items-center gap-2">

                      <CalendarDays className="h-4 w-4" />

                      {
                        new Date(
                          item.created_at
                        ).toLocaleDateString()
                      }

                    </div>

                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">

                      Published

                    </div>

                  </div>

                  <h2 className="text-3xl font-black text-slate-900 leading-tight">

                    {item.title}

                  </h2>

                  <p className="text-slate-600 mt-5 leading-relaxed line-clamp-4">

                    {item.content}

                  </p>

                  {/* ACTIONS */}

                  <div className="flex flex-wrap gap-3 mt-8">

                    <Link
                      href={`/news/${item.id}`}
                    >

                      <Button
                        variant="outline"
                        className="rounded-2xl"
                      >

                        <Eye className="mr-2 h-4 w-4" />

                        View

                      </Button>

                    </Link>

                    <Link
                      href={`/dashboard/news/${item.id}/edit`}
                    >

                      <Button
                        variant="outline"
                        className="rounded-2xl"
                      >

                        <Pencil className="mr-2 h-4 w-4" />

                        Edit

                      </Button>

                    </Link>

                    <Button
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      className="rounded-2xl bg-red-600 hover:bg-red-700"
                    >

                      <Trash2 className="mr-2 h-4 w-4" />

                      Delete

                    </Button>

                  </div>

                </div>

              </Card>
            ))
          }

        </div>

      </div>

    </DashboardLayout>
  )
}