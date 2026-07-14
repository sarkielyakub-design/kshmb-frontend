"use client"

import Link from "next/link"

import {

  HeartPulse,

  Phone,

  Mail,

  MapPin,

} from "lucide-react"

import {

  FaFacebookF,

  FaInstagram,

  FaLinkedinIn,

} from "react-icons/fa"

import {

  FaXTwitter,

} from "react-icons/fa6"


const quickLinks = [

  {
    title: "Hospitals",
    href: "/hospitals",
  },

  {
    title: "Doctors",
    href: "/doctors",
  },

  {
    title: "Appointments",
    href: "/appointments",
  },

  {
    title: "Careers",
    href: "/careers",
  },

  {
    title: "Analytics",
    href: "/analytics",
  },
]


const legalLinks = [

  {
    title: "Privacy Policy",
    href: "/privacy",
  },

  {
    title: "Terms & Conditions",
    href: "/terms",
  },
]


export default function PublicFooter() {

  return (

    <footer className="bg-slate-950 text-white border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-14">

          {/* BRAND */}

          <div>

            <div className="flex items-center gap-4">

              <div className="h-14 w-14 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">

                <HeartPulse className="h-7 w-7 text-cyan-400" />

              </div>


              <div>

                <h2 className="text-2xl font-black tracking-tight">

                  KSHMB

                </h2>

                <p className="text-slate-400 text-sm">

                  Enterprise Healthcare Platform

                </p>

              </div>

            </div>


            <p className="text-slate-400 mt-8 leading-relaxed">

              Advanced healthcare ecosystem powering intelligent
              hospitals, AI healthcare analytics, emergency response,
              medical operations, and digital healthcare innovation.

            </p>


            {/* SOCIALS */}

            <div className="flex items-center gap-4 mt-8">

              <a
                href="#"
                className="h-11 w-11 rounded-2xl bg-white/5 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center"
              >

                <FaFacebookF className="h-5 w-5" />

              </a>


              <a
                href="#"
                className="h-11 w-11 rounded-2xl bg-white/5 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >

                <FaXTwitter className="h-5 w-5" />

              </a>


              <a
                href="#"
                className="h-11 w-11 rounded-2xl bg-white/5 hover:bg-pink-600 transition-all duration-300 flex items-center justify-center"
              >

                <FaInstagram className="h-5 w-5" />

              </a>


              <a
                href="#"
                className="h-11 w-11 rounded-2xl bg-white/5 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
              >

                <FaLinkedinIn className="h-5 w-5" />

              </a>

            </div>

          </div>


          {/* QUICK LINKS */}

          <div>

            <h3 className="text-xl font-semibold">

              Quick Links

            </h3>


            <div className="mt-8 space-y-4">

              {
                quickLinks.map((link) => (

                  <Link
                    key={link.title}
                    href={link.href}
                    className="block text-slate-400 hover:text-cyan-400 transition"
                  >

                    {link.title}

                  </Link>
                ))
              }

            </div>

          </div>


          {/* CONTACT */}

          <div>

            <h3 className="text-xl font-semibold">

              Contact Information

            </h3>


            <div className="mt-8 space-y-6">

              <div className="flex items-start gap-4">

                <div className="h-11 w-11 rounded-2xl bg-white/5 flex items-center justify-center">

                  <Phone className="h-5 w-5 text-cyan-400" />

                </div>


                <div>

                  <p className="font-medium">

                    Emergency Hotline

                  </p>

                  <p className="text-slate-400 mt-1">

                    +234 800 000 0000

                  </p>

                </div>

              </div>


              <div className="flex items-start gap-4">

                <div className="h-11 w-11 rounded-2xl bg-white/5 flex items-center justify-center">

                  <Mail className="h-5 w-5 text-cyan-400" />

                </div>


                <div>

                  <p className="font-medium">

                    Email Address

                  </p>

                  <p className="text-slate-400 mt-1">

                    support@kshmb.gov.ng

                  </p>

                </div>

              </div>


              <div className="flex items-start gap-4">

                <div className="h-11 w-11 rounded-2xl bg-white/5 flex items-center justify-center">

                  <MapPin className="h-5 w-5 text-cyan-400" />

                </div>


                <div>

                  <p className="font-medium">

                    Headquarters

                  </p>

                  <p className="text-slate-400 mt-1">

                    Kano State, Nigeria

                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* LEGAL */}

          <div>

            <h3 className="text-xl font-semibold">

              Legal & Compliance

            </h3>


            <div className="mt-8 space-y-4">

              {
                legalLinks.map((link) => (

                  <Link
                    key={link.title}
                    href={link.href}
                    className="block text-slate-400 hover:text-cyan-400 transition"
                  >

                    {link.title}

                  </Link>
                ))
              }

            </div>


            <div className="mt-10 rounded-3xl bg-white/5 border border-white/10 p-6">

              <h4 className="font-semibold">

                AI Healthcare Platform

              </h4>

              <p className="text-slate-400 text-sm mt-3 leading-relaxed">

                Secure enterprise medical intelligence,
                analytics, and digital healthcare infrastructure.

              </p>

            </div>

          </div>

        </div>


        {/* BOTTOM */}

        <div className="border-t border-white/10 mt-20 pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <p className="text-slate-400 text-sm">

            ©️ 2026 KSHMB Enterprise Healthcare Platform.
            All rights reserved.

          </p>


          <div className="flex flex-wrap gap-6 text-sm text-slate-500">

            <span>

              AI Healthcare Infrastructure

            </span>

            <span>

              Enterprise Security

            </span>

            <span>

              Real-time Healthcare Analytics

            </span>

          </div>

        </div>

      </div>

    </footer>
  )
}