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
  // Preparar datos para gráfico temporal (por día/semana)
  const dailyData = data.reduce((acc: any, record) => {
    const date = record.fecha // Usar fecha completa
    if (!acc[date]) {
      acc[date] = { date, revenue: 0, orders: 0 }
    }
    acc[date].revenue += Number(record.total) || 0
    acc[date].orders += 1
    return acc
  }, {})

  const timeSeriesData = Object.values(dailyData)
    .sort((a: any, b: any) => a.date.localeCompare(b.date))
    .map((item: any) => ({
      ...item,
      formattedDate: new Date(item.date).toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: 'short' 
      })
    }))

  // Preparar datos para gráfico de productos
  const productData = data.reduce((acc: any, record) => {
    if (!acc[record.producto]) {
      acc[record.producto] = { producto: record.producto, revenue: 0, quantity: 0 }
    }
    acc[record.producto].revenue += Number(record.total) || 0
    acc[record.producto].quantity += Number(record.cantidad) || 0
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
                dataKey="formattedDate" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number | undefined) => [formatCurrency(value || 0), 'Ingresos']}
                labelFormatter={(label) => label}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#6366f1" 
                strokeWidth={2}
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
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
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
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
                width={100}
              />
              <Tooltip 
                formatter={(value: number | undefined) => [formatCurrency(value || 0), 'Ingresos']}
              />
              <Bar 
                dataKey="revenue" 
                fill="url(#colorGradient)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
