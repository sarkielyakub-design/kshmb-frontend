"use client"

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"

import { getSingleNews } from "@/services/news-service"

export default function SingleNewsPage() {

  const params = useParams()

  const [news, setNews] =
    useState<any>(null)

  useEffect(() => {

    const fetchData = async () => {

      const data =
        await getSingleNews(
          params.slug as string
        )

      setNews(data)
    }

    fetchData()

  }, [])

  if (!news) {

    return (
      <div className="p-20">
        Loading...
      </div>
    )
  }

  return (

    <div className="max-w-5xl mx-auto py-16 px-6">

      <img
        src={news.image}
        alt={news.title}
        className="w-full h-[500px] object-cover rounded-3xl"
      />

      <h1 className="text-6xl font-black mt-10">

        {news.title}

      </h1>

      <p className="text-slate-500 mt-4">

        By {news.author}

      </p>

      <div className="prose prose-xl max-w-none mt-10">

        {news.content}

      </div>

    </div>
  )
}