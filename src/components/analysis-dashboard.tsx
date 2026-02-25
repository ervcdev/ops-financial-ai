'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnalysisResult, SalesRecord } from '@/types/business'
import { formatCurrency, formatDate } from '@/lib/utils'
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Target, Shield } from 'lucide-react'
import { SalesChart } from './sales-chart'

interface AnalysisDashboardProps {
  analysis: AnalysisResult
  summary: {
    recordsCount: number
    totalRevenue: number
    dateRange: { start: string; end: string }
    fileName: string
  }
  salesData?: SalesRecord[]
}

export function AnalysisDashboard({ analysis, summary, salesData }: AnalysisDashboardProps) {
  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-green-600" />
      case 'down':
        return <TrendingDown className="h-5 w-5 text-red-600" />
      default:
        return <div className="h-5 w-5 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Análisis Financiero - {summary.fileName}
        </h1>
        <p className="text-gray-600">
          Período: {formatDate(summary.dateRange.start)} - {formatDate(summary.dateRange.end)}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ingresos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.totalRevenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.recordsCount.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Valor Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.totalRevenue / summary.recordsCount)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Salud Financiera</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold px-3 py-1 rounded-full inline-block ${getHealthScoreColor(analysis.financial_health_score)}`}>
              {analysis.financial_health_score}/100
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Resumen Ejecutivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
        </CardContent>
      </Card>

      {/* Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getTrendIcon(analysis.trends.revenue_trend)}
            Tendencias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">Tendencia de Ingresos</span>
            <div className="flex items-center gap-2">
              {getTrendIcon(analysis.trends.revenue_trend)}
              <span className="font-semibold">
                {analysis.trends.growth_rate > 0 ? '+' : ''}{analysis.trends.growth_rate.toFixed(1)}%
              </span>
            </div>
          </div>
          
          {analysis.trends.seasonal_patterns.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Patrones Estacionales</h4>
              <ul className="space-y-1">
                {analysis.trends.seasonal_patterns.map((pattern, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    {pattern}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Insights and Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Insights Clave
            </CardTitle>
            <CardDescription>
              Descubrimientos importantes sobre tu negocio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-sm text-gray-700">{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              Recomendaciones
            </CardTitle>
            <CardDescription>
              Acciones sugeridas para mejorar el rendimiento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-sm text-gray-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Risks and Opportunities */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Riesgos Identificados
            </CardTitle>
            <CardDescription>
              Factores que podrían afectar el rendimiento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.risks.map((risk, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700">{risk}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Oportunidades
            </CardTitle>
            <CardDescription>
              Áreas de crecimiento potencial
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.opportunities.map((opportunity, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Shield className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700">{opportunity}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Data Visualizations */}
      {salesData && salesData.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Visualización de Datos</h2>
          <SalesChart data={salesData} />
        </div>
      )}
    </div>
  )
}
