'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Papa from 'papaparse'
import { supabase } from '@/lib/supabase'
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface SalesRecord {
  fecha: string
  producto: string
  cantidad: number
  precio_unitario: number
  total: number
}

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [previewData, setPreviewData] = useState<SalesRecord[]>([])
  const router = useRouter()

  const validateCSVHeaders = (headers: string[]): boolean => {
    const requiredHeaders = ['fecha', 'producto', 'cantidad', 'precio_unitario', 'total']
    return requiredHeaders.every(header => 
      headers.some(h => h.toLowerCase().trim() === header.toLowerCase())
    )
  }

  const handleFileUpload = useCallback(async (file: File) => {
    setIsUploading(true)
    setUploadStatus('processing')
    setErrorMessage('')
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          if (results.errors.length > 0) {
            throw new Error('Error al procesar el archivo CSV')
          }

          const headers = Object.keys(results.data[0] as object)
          if (!validateCSVHeaders(headers)) {
            throw new Error('El CSV debe contener las columnas: fecha, producto, cantidad, precio_unitario, total')
          }

          // Procesar y validar datos
          const salesData = results.data.map((row: any) => ({
            fecha: row.fecha || row.Fecha,
            producto: row.producto || row.Producto,
            cantidad: Number(row.cantidad || row.Cantidad) || 0,
            precio_unitario: Number(row.precio_unitario || row['Precio Unitario']) || 0,
            total: Number(row.total || row.Total) || 0,
          })) as SalesRecord[]

          // Validar datos numéricos
          const invalidRows = salesData.filter(row => 
            isNaN(row.cantidad) || isNaN(row.precio_unitario) || isNaN(row.total) ||
            row.cantidad <= 0 || row.precio_unitario <= 0 || row.total <= 0
          )

          if (invalidRows.length > 0) {
            throw new Error(`Se encontraron ${invalidRows.length} filas con datos numéricos inválidos`)
          }

          setPreviewData(salesData.slice(0, 5))


          // Insertar datos en Supabase
          const { data, error } = await supabase
            .from('ventas')
            .insert(salesData.map(record => ({
              fecha: record.fecha,
              producto: record.producto,
              cantidad: record.cantidad,
              precio_unitario: record.precio_unitario,
              total: record.total
            })))
            .select()

          if (error) {
            throw new Error('Error al guardar los datos: ' + error.message)
          }

          setUploadStatus('success')
          toast.success(`¡Éxito! Se cargaron ${salesData.length} registros de ventas`)
          
          // Redirigir al dashboard después de un breve delay (sin fileId)
          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)

        } catch (error) {
          setUploadStatus('error')
          const errorMsg = error instanceof Error ? error.message : 'Error desconocido'
          setErrorMessage(errorMsg)
          toast.error(`Error: ${errorMsg}`)
        } finally {
          setIsUploading(false)
        }
      },
      error: (error) => {
        setUploadStatus('error')
        setErrorMessage('Error al leer el archivo: ' + error.message)
        setIsUploading(false)
      }
    })
  }, [router])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'))
    
    if (csvFile) {
      handleFileUpload(csvFile)
    } else {
      setErrorMessage('Por favor, sube un archivo CSV válido')
      setUploadStatus('error')
    }
  }, [handleFileUpload])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }, [handleFileUpload])

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">
            Subir Datos de Ventas
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Carga tu archivo CSV para análisis financiero inteligente
          </p>
          <p className="text-slate-400">
            Formato requerido: fecha, producto, cantidad, precio_unitario, total
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-lg p-8 mb-8">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${uploadStatus === 'processing' ? 'border-indigo-400 bg-indigo-950/30' : 'border-slate-700 hover:border-slate-600'}
              ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              id="csv-upload"
              disabled={isUploading}
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-300 mb-2">
                Arrastra y suelta tu archivo CSV aquí, o haz clic para seleccionar
              </p>
              <p className="text-sm text-slate-500">
                Columnas requeridas: fecha, producto, cantidad, precio_unitario, total
              </p>
            </label>
          </div>

          {/* Status Messages */}
          {uploadStatus === 'processing' && (
            <div className="flex items-center gap-2 text-indigo-400 mt-4">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-400"></div>
              Procesando archivo y guardando en base de datos...
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-400 bg-red-950/30 border border-red-800 p-3 rounded-lg mt-4">
              <AlertCircle className="h-4 w-4" />
              {errorMessage}
            </div>
          )}

          {uploadStatus === 'success' && (
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2 text-green-400 bg-green-950/30 border border-green-800 p-3 rounded-lg">
                <CheckCircle className="h-4 w-4" />
                ¡Datos guardados exitosamente! Redirigiendo al dashboard...
              </div>
              
              {previewData.length > 0 && (
                <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-slate-200">Vista previa de los datos procesados:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left p-2 text-slate-300">Fecha</th>
                          <th className="text-left p-2 text-slate-300">Producto</th>
                          <th className="text-left p-2 text-slate-300">Cantidad</th>
                          <th className="text-left p-2 text-slate-300">Precio</th>
                          <th className="text-left p-2 text-slate-300">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, index) => (
                          <tr key={index} className="border-b border-slate-700">
                            <td className="p-2 text-slate-400">{row.fecha}</td>
                            <td className="p-2 text-slate-400">{row.producto}</td>
                            <td className="p-2 text-slate-400">{row.cantidad}</td>
                            <td className="p-2 text-slate-400">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(row.precio_unitario)}</td>
                            <td className="p-2 text-slate-400">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(row.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-lg">
            <FileText className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2 text-slate-200">Formato CSV</h3>
            <p className="text-sm text-slate-400">
              Asegúrate de que tu archivo tenga las columnas requeridas
            </p>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2 text-slate-200">Validación</h3>
            <p className="text-sm text-slate-400">
              Validamos automáticamente la estructura y los datos
            </p>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-lg">
            <Upload className="h-8 w-8 text-indigo-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2 text-slate-200">Base de Datos</h3>
            <p className="text-sm text-slate-400">
              Los datos se guardan de forma segura en Supabase
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}