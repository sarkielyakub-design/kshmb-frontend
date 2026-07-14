"use client"

import {

  ResponsiveContainer,

  AreaChart,

  Area,

  CartesianGrid,

  Tooltip,

  XAxis,

  YAxis,

} from "recharts"


interface Props {

  data: {

    month: string

    patients: number

    revenue: number

  }[]
}


export default function AnalyticsChart({

  data,

}: Props) {

  return (

    <div className="h-[400px] w-full">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="patients"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#2563eb"
                stopOpacity={0.4}
              />

              <stop
                offset="95%"
                stopColor="#2563eb"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>


          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="patients"
            stroke="#2563eb"
            fillOpacity={1}
            fill="url(#patients)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  )
}