'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SalesRecord } from '@/types/business'
import { formatCurrency } from '@/lib/utils'

interface SalesChartProps {
  data: SalesRecord[]
}

export function SalesChart({ data }: SalesChartProps) {
  // Preparar datos para gráfico temporal (por mes)
  const monthlyData = data.reduce((acc: any, record) => {
    const month = record.fecha.substring(0, 7) // YYYY-MM
    if (!acc[month]) {
      acc[month] = { month, revenue: 0, orders: 0 }
    }
    acc[month].revenue += record.total
    acc[month].orders += 1
    return acc
  }, {})

  const timeSeriesData = Object.values(monthlyData).sort((a: any, b: any) => a.month.localeCompare(b.month))

  // Preparar datos para gráfico de productos
  const productData = data.reduce((acc: any, record) => {
    if (!acc[record.producto]) {
      acc[record.producto] = { producto: record.producto, revenue: 0, quantity: 0 }
    }
    acc[record.producto].revenue += record.total
    acc[record.producto].quantity += record.cantidad
    return acc
  }, {})

  const topProducts = Object.values(productData)
    .sort((a: any, b: any) => b.revenue - a.revenue)
    .slice(0, 10)

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Tendencia de Ingresos</CardTitle>
          <CardDescription>Evolución mensual de los ingresos</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value + '-01')
                  return date.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' })
                }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Ingresos']}
                labelFormatter={(label) => {
                  const date = new Date(label + '-01')
                  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Productos</CardTitle>
          <CardDescription>Productos con mayor facturación</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
              />
              <YAxis 
                type="category"
                dataKey="producto" 
                tick={{ fontSize: 10 }}
                width={80}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Ingresos']}
              />
              <Bar 
                dataKey="revenue" 
                fill="#059669"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
