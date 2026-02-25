export interface SalesRecord {
  fecha: string
  producto: string
  cantidad: number
  precio_unitario: number
  total: number
  cliente?: string
  categoria?: string
}

export interface AnalysisResult {
  id: string
  summary: string
  insights: string[]
  recommendations: string[]
  financial_health_score: number
  trends: {
    revenue_trend: 'up' | 'down' | 'stable'
    growth_rate: number
    seasonal_patterns: string[]
  }
  risks: string[]
  opportunities: string[]
  created_at: string
}

export interface UploadedFile {
  id: string
  file_name: string
  upload_date: string
  records_count: number
  total_revenue: number
  date_range: {
    start: string
    end: string
  }
  status: 'processing' | 'completed' | 'error'
  analysis?: AnalysisResult
}