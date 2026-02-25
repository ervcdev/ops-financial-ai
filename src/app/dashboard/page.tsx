'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { AnalysisDashboard } from '@/components/analysis-dashboard'
import { AnalysisResult } from '@/types/business'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const fileId = searchParams.get('fileId')
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analysisData, setAnalysisData] = useState<{
    analysis: AnalysisResult | null
    summary: any
    salesData?: any[]
  }>({ analysis: null, summary: null, salesData: [] })

  useEffect(() => {
    fetchAnalysisData()
  }, [])

  const fetchAnalysisData = async () => {
    try {
      setLoading(true)
      
      // Obtener los datos más recientes de ventas directamente
      const { data: ventasData, error: ventasError } = await supabase
        .from('ventas')
        .select('*')
        .order('created_at', { ascending: false })

      if (ventasError) {
        throw new Error('Error al obtener los datos de ventas: ' + ventasError.message)
      }

      if (!ventasData || ventasData.length === 0) {
        throw new Error('No se encontraron datos de ventas. Sube un archivo CSV primero.')
      }

      // Calcular resumen de los datos de ventas
      const salesData = ventasData
      const totalRevenue = salesData.reduce((sum: number, record: any) => sum + (record.total || 0), 0)
      const recordsCount = salesData.length
      
      // Obtener rango de fechas
      const dates = salesData.map((record: any) => new Date(record.fecha)).sort()
      const dateRange = dates.length > 0 ? {
        start: dates[0].toISOString().split('T')[0],
        end: dates[dates.length - 1].toISOString().split('T')[0]
      } : { start: '', end: '' }

      const summary = {
        recordsCount,
        totalRevenue,
        dateRange,
        fileName: 'Datos de Ventas'
      }

      // Por ahora, crear un análisis básico sin IA
      const analysis = {
        id: 'basic-analysis',
        summary: `Análisis de ${recordsCount} registros de ventas con ingresos totales de €${totalRevenue.toFixed(2)}`,
        insights: [
          `Total de ${recordsCount} transacciones procesadas`,
          `Ingresos totales: €${totalRevenue.toFixed(2)}`,
          `Valor promedio por transacción: €${(totalRevenue / recordsCount).toFixed(2)}`
        ],
        recommendations: [
          'Analizar productos con mayor margen de beneficio',
          'Identificar patrones de compra por fechas',
          'Optimizar inventario basado en productos más vendidos'
        ],
        financial_health_score: Math.min(100, Math.max(20, 70 + (totalRevenue / recordsCount - 50))),
        trends: {
          revenue_trend: 'stable' as const,
          growth_rate: 0,
          seasonal_patterns: ['Requiere más datos históricos para identificar patrones']
        },
        risks: ['Dependencia de productos específicos', 'Variabilidad en precios'],
        opportunities: ['Expansión de productos exitosos', 'Análisis de segmentación de clientes'],
        created_at: new Date().toISOString()
      }

      setAnalysisData({ analysis, summary, salesData })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Cargando análisis...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{error}</p>
            <div className="flex gap-2">
              <Button onClick={fetchAnalysisData} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reintentar
              </Button>
              <Link href="/upload">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!analysisData.analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Análisis en Proceso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
              <span>La IA está analizando tus datos...</span>
            </div>
            <p className="text-sm text-gray-600">
              Este proceso puede tomar unos minutos. Los resultados aparecerán automáticamente.
            </p>
            <Button onClick={fetchAnalysisData} variant="outline" className="w-full">
              Actualizar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Resiliencia Ops</h1>
            <div className="flex gap-2">
              <Button onClick={fetchAnalysisData} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Link href="/upload">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Nuevo Análisis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnalysisDashboard 
          analysis={analysisData.analysis}
          summary={analysisData.summary}
          salesData={analysisData.salesData}
        />
      </div>
    </div>
  )
}