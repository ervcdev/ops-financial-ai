import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { SalesRecord } from '@/types/business'

export async function POST(request: NextRequest) {
  try {
    const { data, fileName, userId } = await request.json()

    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: 'No se proporcionaron datos válidos' },
        { status: 400 }
      )
    }

    if (!fileName) {
      return NextResponse.json(
        { error: 'Nombre de archivo requerido' },
        { status: 400 }
      )
    }

    // Calcular estadísticas básicas
    const totalRevenue = data.reduce((sum: number, record: SalesRecord) => sum + record.total, 0)
    const recordsCount = data.length
    
    // Obtener rango de fechas
    const dates = data.map((record: SalesRecord) => new Date(record.fecha)).sort()
    const dateRange = {
      start: dates[0].toISOString().split('T')[0],
      end: dates[dates.length - 1].toISOString().split('T')[0]
    }

    // Guardar en Supabase
    const { data: savedData, error } = await supabase
      .from('sales_data')
      .insert({
        user_id: userId || 'anonymous',
        file_name: fileName,
        data: data,
        upload_date: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving to Supabase:', error)
      return NextResponse.json(
        { error: 'Error al guardar los datos' },
        { status: 500 }
      )
    }

    // Iniciar análisis con IA en segundo plano
    const analysisPromise = analyzeData(data, savedData.id)
    
    return NextResponse.json({
      success: true,
      fileId: savedData.id,
      summary: {
        recordsCount,
        totalRevenue,
        dateRange,
        fileName
      }
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

async function analyzeData(data: SalesRecord[], fileId: string) {
  try {
    // Preparar datos para análisis
    const totalRevenue = data.reduce((sum, record) => sum + record.total, 0)
    const avgOrderValue = totalRevenue / data.length
    
    // Análisis por producto
    const productAnalysis = data.reduce((acc: any, record) => {
      if (!acc[record.producto]) {
        acc[record.producto] = { quantity: 0, revenue: 0, orders: 0 }
      }
      acc[record.producto].quantity += record.cantidad
      acc[record.producto].revenue += record.total
      acc[record.producto].orders += 1
      return acc
    }, {})

    // Top productos
    const topProducts = Object.entries(productAnalysis)
      .sort(([,a]: any, [,b]: any) => b.revenue - a.revenue)
      .slice(0, 5)

    // Análisis temporal (por mes)
    const monthlyData = data.reduce((acc: any, record) => {
      const month = record.fecha.substring(0, 7) // YYYY-MM
      if (!acc[month]) {
        acc[month] = { revenue: 0, orders: 0 }
      }
      acc[month].revenue += record.total
      acc[month].orders += 1
      return acc
    }, {})

    const months = Object.keys(monthlyData).sort()
    const revenueGrowth = months.length > 1 
      ? ((monthlyData[months[months.length - 1]].revenue - monthlyData[months[0]].revenue) / monthlyData[months[0]].revenue) * 100
      : 0

    // Llamar a OpenAI para análisis más profundo
    const aiAnalysis = await generateAIInsights({
      totalRevenue,
      avgOrderValue,
      recordsCount: data.length,
      topProducts,
      revenueGrowth,
      monthlyTrend: months.map(month => ({
        month,
        revenue: monthlyData[month].revenue,
        orders: monthlyData[month].orders
      }))
    })

    // Guardar análisis en Supabase
    await supabase
      .from('sales_data')
      .update({ analysis_result: JSON.stringify(aiAnalysis) })
      .eq('id', fileId)

  } catch (error) {
    console.error('Analysis error:', error)
  }
}

async function generateAIInsights(businessData: any) {
  const prompt = `
Eres un consultor financiero experto. Analiza los siguientes datos de ventas y proporciona insights accionables:

DATOS:
- Ingresos totales: €${businessData.totalRevenue.toFixed(2)}
- Valor promedio por pedido: €${businessData.avgOrderValue.toFixed(2)}
- Número de transacciones: ${businessData.recordsCount}
- Crecimiento de ingresos: ${businessData.revenueGrowth.toFixed(1)}%
- Top 5 productos: ${businessData.topProducts.map(([name, data]: any) => `${name} (€${data.revenue.toFixed(2)})`).join(', ')}

Proporciona un análisis en formato JSON con esta estructura:
{
  "summary": "Resumen ejecutivo en 2-3 oraciones",
  "insights": ["insight 1", "insight 2", "insight 3"],
  "recommendations": ["recomendación 1", "recomendación 2", "recomendación 3"],
  "financial_health_score": número del 1-100,
  "trends": {
    "revenue_trend": "up/down/stable",
    "growth_rate": número,
    "seasonal_patterns": ["patrón 1", "patrón 2"]
  },
  "risks": ["riesgo 1", "riesgo 2"],
  "opportunities": ["oportunidad 1", "oportunidad 2"]
}

Responde SOLO con el JSON válido, sin texto adicional.
`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    const aiResponse = await response.json()
    const analysisText = aiResponse.choices[0].message.content

    return JSON.parse(analysisText)
  } catch (error) {
    console.error('OpenAI API error:', error)
    // Fallback analysis
    return {
      summary: "Análisis completado con datos básicos disponibles.",
      insights: [
        `Ingresos totales de €${businessData.totalRevenue.toFixed(2)}`,
        `Valor promedio por pedido de €${businessData.avgOrderValue.toFixed(2)}`,
        `Tendencia de crecimiento del ${businessData.revenueGrowth.toFixed(1)}%`
      ],
      recommendations: [
        "Revisar estrategias de precios para optimizar márgenes",
        "Analizar productos de bajo rendimiento",
        "Implementar programas de fidelización"
      ],
      financial_health_score: Math.min(100, Math.max(20, 50 + businessData.revenueGrowth)),
      trends: {
        revenue_trend: businessData.revenueGrowth > 5 ? "up" : businessData.revenueGrowth < -5 ? "down" : "stable",
        growth_rate: businessData.revenueGrowth,
        seasonal_patterns: ["Requiere más datos para identificar patrones estacionales"]
      },
      risks: ["Dependencia de pocos productos principales", "Fluctuaciones en el mercado"],
      opportunities: ["Expansión de productos exitosos", "Optimización de canales de venta"]
    }
  }
}
