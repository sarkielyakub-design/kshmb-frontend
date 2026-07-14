"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { getNews } from "@/services/news-service"

export default function NewsPage() {

  const [news, setNews] =
    useState<any[]>([])

  useEffect(() => {

    const fetchData = async () => {

      const data =
        await getNews()

      setNews(data)
    }

    fetchData()

  }, [])

  return (

    <div className="max-w-7xl mx-auto py-16 px-6">

      <h1 className="text-5xl font-black">

        Latest News
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

        {
          news.map((item) => (

            <Link
              key={item.id}
              href={`/news/${item.slug}`}
            >

              <div className="rounded-3xl overflow-hidden border bg-white hover:shadow-xl transition-all">

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-60 w-full object-cover"
                />

                <div className="p-6">

                  <h2 className="text-2xl font-black">

                    {item.title}
                  </h2>

                  <p className="text-slate-500 mt-3">

                    {item.summary}
                  </p>

                </div>

              </div>

            </Link>
          ))
        }

      </div>

    </div>
  )
}