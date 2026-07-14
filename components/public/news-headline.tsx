"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { getHeadlines } from "@/services/news-service"

export default function NewsHeadline() {

  const [headlines, setHeadlines] =
    useState<any[]>([])

  useEffect(() => {

    const fetchData = async () => {

      try {

        const data =
          await getHeadlines()

        setHeadlines(data)

      } catch (error) {

        console.log(error)
      }
    }

    fetchData()

  }, [])

  return (

    <div className="bg-red-600 text-white py-3 overflow-hidden">

      <div className="flex gap-10 animate-marquee whitespace-nowrap px-6">

        {
          headlines.map((item) => (

            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="font-semibold hover:underline"
            >

              📰 {item.title}

            </Link>
          ))
        }

      </div>

    </div>
  )
}