"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface IPCAData {
  D1C: string
  D1N: string
  D2C: string
  D2N: string
  D3C: string
  D3N: string
  V: string
}

interface IPCAChartProps {
  data: IPCAData[]
}

export function IPCAChart({ data }: IPCAChartProps) {
  const processChartData = () => {
    if (!data.length) return []

    const periods = [...new Set(data.map((item) => item.D2N))].sort()

    const groupMap = new Map()
    data.forEach((item) => {
      const key = item.D1N
      if (!groupMap.has(key) || item.D2C > groupMap.get(key).D2C) {
        groupMap.set(key, Math.abs(Number.parseFloat(item.V)))
      }
    })

    const topGroups = Array.from(groupMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name)

    return periods.map((period) => {
      const periodData: any = { period }

      topGroups.forEach((group) => {
        const item = data.find((d) => d.D2N === period && d.D1N === group)
        periodData[group] = item ? Number.parseFloat(item.V) : 0
      })

      return periodData
    })
  }

  const chartData = processChartData()
  const topGroups = chartData.length > 0 ? Object.keys(chartData[0]).filter((key) => key !== "period") : []

  const colors = ["#2563eb", "#f59e0b", "#dc2626", "#10b981", "#8b5cf6"]

  if (!chartData.length) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        Dados insuficientes para gerar o gráfico
      </div>
    )
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip formatter={(value: number) => [`${value}%`, ""]} labelFormatter={(label) => `Período: ${label}`} />
          <Legend />
          {topGroups.map((group, index) => (
            <Line
              key={group}
              type="monotone"
              dataKey={group}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              name={group.length > 20 ? group.substring(0, 20) + "..." : group}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
