"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import {
  Building2,
  Users,
  Calendar,
  Ambulance,
  HeartPulse,
  ShieldCheck,
  ChevronRight,
  Activity,
  FlaskConical,
  BriefcaseBusiness,
  ArrowRight,
  Newspaper,
  Menu,
  Building,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import {
  getNews,
  getHeadlines,
} from "@/services/news-service"

/* =========================================
STATS
========================================= */

const stats = [
  {
    title: "Hospitals",
    value: "24+",
    icon: Building2,
  },

  {
    title: "Doctors",
    value: "320+",
    icon: Users,
  },

  {
    title: "Patients",
    value: "120K+",
    icon: HeartPulse,
  },

  {
    title: "Appointments",
    value: "50K+",
    icon: Calendar,
  },
]

/* =========================================
SERVICES
========================================= */

const services = [
  {
    title: "Emergency Services",

    description:
      "24/7 emergency healthcare response and ambulance coordination system.",

    icon: Ambulance,
  },

  {
    title: "Laboratory Services",

    description:
      "Advanced laboratory diagnostics and medical testing services.",

    icon: FlaskConical,
  },

  {
    title: "Hospital Management",

    description:
      "Integrated hospital administration and patient care management.",

    icon: Building,
  },

  {
    title: "Healthcare Careers",

    description:
      "Medical recruitment and healthcare career opportunities.",

    icon: BriefcaseBusiness,
  },
]

/* =========================================
HERO SLIDES
SAVE THESE IMAGES INSIDE /public/images
========================================= */

const heroSlides = [
  {
    title: "Dr. Mansur Mudi Nagoda",

    subtitle:
      "Executive Secretary, Kano State Hospitals Management Board",

    description:
      "Providing strategic healthcare leadership, hospital administration, emergency coordination, and public healthcare transformation across Kano State.",

    image: "/images/es.jpg",
  },

  {
    title:
      "Murtala Muhammad Specialist Hospital",

    subtitle:
      "Advanced Emergency & Specialist Care",

    description:
      "One of Kano State’s leading specialist hospitals delivering emergency healthcare, surgery, diagnostics, and critical patient care services.",

    image: "/images/murtala.jpg",
  },

  {
    title:
      "Muhammadu Wase Teaching Hospital",

    subtitle:
      "Clinical Excellence & Healthcare Innovation",

    description:
      "Strengthening healthcare delivery through advanced patient care systems, laboratory services, and clinical excellence.",

    image: "/images/wase.jpg",
  },

  {
    title:
      "Kano State Healthcare Infrastructure",

    subtitle:
      "Modern Public Healthcare Administration",

    description:
      "KSHMB continues to modernize healthcare delivery systems, hospitals, emergency services, and medical operations statewide.",

    image: "/images/hospital.jpg",
  },
]

export default function HomePage() {

  const [news, setNews] =
    useState<any[]>([])

  const [headlines, setHeadlines] =
    useState<any[]>([])

  const [currentSlide, setCurrentSlide] =
    useState(0)

  const [mobileMenu, setMobileMenu] =
    useState(false)

  /* =========================================
  AUTO SLIDER
  ========================================= */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrentSlide((prev) =>
          prev === heroSlides.length - 1
            ? 0
            : prev + 1
        )

      }, 6000)

    return () =>
      clearInterval(interval)

  }, [])

  /* =========================================
  FETCH NEWS
  ========================================= */

  useEffect(() => {

    const fetchNews =
      async () => {

        try {

          const newsData =
            await getNews()

          const headlineData =
            await getHeadlines()

          setNews(newsData)

          setHeadlines(headlineData)

        } catch (error) {

          console.log(error)
        }
      }

    fetchNews()

  }, [])

  return (

    <div className="bg-white overflow-hidden">

      {/* =========================================
      HEADER
      ========================================= */}

      <header className="sticky top-0 z-50 bg-white shadow-sm">

        {/* TOP BAR */}

        <div className="hidden md:block bg-blue-800 text-white">

          <div className="max-w-7xl mx-auto px-6 h-11 flex items-center justify-between text-sm">

            <div className="flex items-center gap-2">

              <ShieldCheck className="h-4 w-4 text-cyan-300" />

              Kano State Hospitals Management Board

            </div>

            <div className="flex items-center gap-6">

              <div className="flex items-center gap-2">

                <Ambulance className="h-4 w-4 text-red-300" />

                Emergency: 0800-KSHMB-247

              </div>

            </div>

          </div>

        </div>

        {/* MAIN NAV */}

        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-4"
          >

            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-700 to-cyan-600 flex items-center justify-center shadow-lg">

              <HeartPulse className="h-7 w-7 text-white" />

            </div>

            <div>

              <h1 className="text-xl md:text-2xl font-black text-slate-900">

                KSHMB

              </h1>

              <p className="text-xs md:text-sm text-slate-500">

                Healthcare Administration Portal

              </p>

            </div>

          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden lg:flex items-center gap-8">

            <Link
              href="/"
              className="font-semibold text-blue-700"
            >
              Home
            </Link>

            <Link
              href="/hospitals"
              className="font-semibold text-slate-700 hover:text-blue-700"
            >
              Hospitals
            </Link>

            <Link
              href="/appointments"
              className="font-semibold text-slate-700 hover:text-blue-700"
            >
              Appointments
            </Link>

            <Link
              href="/emergency"
              className="font-semibold text-slate-700 hover:text-blue-700"
            >
              Emergency
            </Link>

            <Link
              href="/careers"
              className="font-semibold text-slate-700 hover:text-blue-700"
            >
              Careers
            </Link>

            <Link
              href="/news"
              className="font-semibold text-slate-700 hover:text-blue-700"
            >
              News
            </Link>

          </nav>

          {/* ACTIONS */}

          <div className="hidden lg:flex items-center gap-3">

            <Link href="/login">

              <Button
                variant="outline"
                className="rounded-2xl"
              >

                Login

              </Button>

            </Link>

            <Link href="/appointments">

              <Button className="rounded-2xl bg-blue-700 hover:bg-blue-800">

                Book Appointment

                <ChevronRight className="ml-2 h-4 w-4" />

              </Button>

            </Link>

          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="lg:hidden h-12 w-12 rounded-2xl border flex items-center justify-center"
          >

            {
              mobileMenu
                ? <X className="h-6 w-6" />
                : <Menu className="h-6 w-6" />
            }

          </button>

        </div>

        {/* MOBILE MENU */}

        {
          mobileMenu && (

            <div className="lg:hidden border-t bg-white">

              <div className="px-6 py-6 flex flex-col gap-5">

                <Link href="/">Home</Link>

                <Link href="/hospitals">Hospitals</Link>

                <Link href="/appointments">Appointments</Link>

                <Link href="/emergency">Emergency</Link>

                <Link href="/careers">Careers</Link>

                <Link href="/news">News</Link>

                <Link href="/login">

                  <Button className="w-full rounded-2xl">

                    Login

                  </Button>

                </Link>

              </div>

            </div>
          )
        }

      </header>

      {/* =========================================
      BREAKING NEWS
      ========================================= */}

      <div className="bg-red-600 text-white overflow-hidden">

        <div className="max-w-7xl mx-auto flex items-center h-12">

          <div className="bg-white text-red-700 h-full px-5 flex items-center font-black text-sm shrink-0">

            BREAKING NEWS

          </div>

          <div className="flex-1 overflow-hidden">

            <div className="animate-marquee whitespace-nowrap flex items-center gap-12 px-6">

              {
                headlines.map((item) => (

                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="font-medium hover:underline"
                  >

                    📰 {item.title}

                  </Link>
                ))
              }

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
      HERO SECTION
      ========================================= */}

      <section className="relative overflow-hidden">

        <div className="relative h-[92vh] min-h-[700px]">

          {/* IMAGE */}

          <img
            src={
              heroSlides[currentSlide].image
            }
            alt={
              heroSlides[currentSlide].title
            }
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
          />

          {/* OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-black/30" />

          {/* CONTENT */}

          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">

            <div className="max-w-3xl text-white">

              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-full text-sm font-semibold mb-8">

                <ShieldCheck className="h-4 w-4 text-cyan-300" />

                Official Government Healthcare Portal

              </div>

              <h1 className="text-4xl md:text-6xl xl:text-7xl font-black leading-tight">

                {
                  heroSlides[currentSlide]
                    .title
                }

              </h1>

              <h2 className="text-cyan-300 text-xl md:text-2xl font-semibold mt-6">

                {
                  heroSlides[currentSlide]
                    .subtitle
                }

              </h2>

              <p className="text-slate-200 text-lg leading-relaxed mt-8 max-w-2xl">

                {
                  heroSlides[currentSlide]
                    .description
                }

              </p>

              <div className="flex flex-wrap gap-4 mt-10">

                <Link href="/hospitals">

                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700"
                  >

                    Explore Hospitals

                  </Button>

                </Link>

                <Link href="/appointments">

                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 rounded-2xl border-white text-white hover:bg-white hover:text-slate-900"
                  >

                    Book Appointment

                  </Button>

                </Link>

              </div>

              {/* SLIDER INDICATORS */}

              <div className="flex items-center gap-3 mt-12">

                {
                  heroSlides.map(
                    (_, index) => (

                      <button
                        key={index}
                        onClick={() =>
                          setCurrentSlide(index)
                        }
                        className={`transition-all duration-300 rounded-full ${
                          currentSlide ===
                          index
                            ? "w-10 h-3 bg-white"
                            : "w-3 h-3 bg-white/40"
                        }`}
                      />

                    )
                  )
                }

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================
      STATS
      ========================================= */}

      <section className="py-20 bg-white border-b">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {
              stats.map((item) => {

                const Icon = item.icon

                return (

                  <Card
                    key={item.title}
                    className="rounded-3xl border border-slate-200 p-8 shadow-sm"
                  >

                    <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">

                      <Icon className="h-7 w-7 text-blue-700" />

                    </div>

                    <h2 className="text-4xl font-black text-slate-900">

                      {item.value}

                    </h2>

                    <p className="text-slate-500 mt-2">

                      {item.title}

                    </p>

                  </Card>
                )
              })
            }

          </div>

        </div>

      </section>

      {/* =========================================
      SERVICES
      ========================================= */}

      <section className="py-28 bg-slate-50 border-b">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto">

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">

              Healthcare Services

            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">

              Public Healthcare Administration

            </h2>

            <p className="text-slate-600 text-lg mt-6 leading-relaxed">

              Modern healthcare services and hospital management infrastructure across Kano State.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">

            {
              services.map((service) => {

                const Icon =
                  service.icon

                return (

                  <Link
                    key={service.title}
                    href={`/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >

                    <Card className="rounded-[30px] border border-slate-200 bg-white hover:shadow-2xl transition-all duration-300 p-8 h-full">

                      <div className="h-16 w-16 rounded-3xl bg-blue-50 flex items-center justify-center">

                        <Icon className="h-8 w-8 text-blue-700" />

                      </div>

                      <h3 className="text-2xl font-bold mt-8 text-slate-900">

                        {service.title}

                      </h3>

                      <p className="text-slate-500 mt-5 leading-relaxed">

                        {service.description}

                      </p>

                      <div className="mt-8 text-blue-700 font-semibold flex items-center gap-2">

                        Explore Service

                        <ArrowRight className="h-4 w-4" />

                      </div>

                    </Card>

                  </Link>
                )
              })
            }

          </div>

        </div>

      </section>

      {/* =========================================
      NEWS
      ========================================= */}

      <section className="py-28 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            <div>

              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">

                <Newspaper className="h-4 w-4" />

                Official Announcements

              </div>

              <h2 className="text-4xl md:text-5xl font-black text-slate-900">

                KSHMB News & Updates

              </h2>

            </div>

            <Link href="/news">

              <Button
                variant="outline"
                className="rounded-2xl"
              >

                View All News

              </Button>

            </Link>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">

            {
              news.slice(0, 3).map((item) => (

                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                >

                  <Card className="rounded-[32px] overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 h-full">

                    <img
                      src={
                        item.image ||
                        "/images/hospital.jpg"
                      }
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />

                    <div className="p-8">

                      <div className="flex items-center justify-between text-sm text-slate-500">

                        <span>

                          KSHMB Official

                        </span>

                        <span>

                          {
                            new Date(
                              item.created_at
                            ).toLocaleDateString()
                          }

                        </span>

                      </div>

                      <h3 className="text-2xl font-black text-slate-900 mt-5 leading-snug">

                        {item.title}

                      </h3>

                      <p className="text-slate-600 mt-4 leading-relaxed line-clamp-3">

                        {item.summary}

                      </p>

                      <div className="mt-8 flex items-center gap-2 text-blue-700 font-semibold">

                        Read Full News

                        <ArrowRight className="h-4 w-4" />

                      </div>

                    </div>

                  </Card>

                </Link>
              ))
            }

          </div>

        </div>

      </section>

    </div>
  )
}