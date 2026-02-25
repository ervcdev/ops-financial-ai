'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Papa from 'papaparse'
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { validateCSVHeaders } from '@/lib/utils'
import { SalesRecord } from '@/types/business'

interface CSVUploadProps {
  onUploadSuccess: (data: SalesRecord[], fileName: string) => void
  isUploading?: boolean
}

export function CSVUpload({ onUploadSuccess, isUploading = false }: CSVUploadProps) {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [previewData, setPreviewData] = useState<SalesRecord[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploadStatus('validating')
    setErrorMessage('')

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          if (results.errors.length > 0) {
            throw new Error('Error al procesar el archivo CSV')
          }

          const headers = Object.keys(results.data[0] as object)
          if (!validateCSVHeaders(headers)) {
            throw new Error('El CSV debe contener las columnas: fecha, producto, cantidad, precio_unitario, total')
          }

          const salesData = results.data.map((row: any) => ({
            fecha: row.fecha || row.Fecha,
            producto: row.producto || row.Producto,
            cantidad: parseFloat(row.cantidad || row.Cantidad) || 0,
            precio_unitario: parseFloat(row.precio_unitario || row['Precio Unitario']) || 0,
            total: parseFloat(row.total || row.Total) || 0,
            cliente: row.cliente || row.Cliente || '',
            categoria: row.categoria || row.Categoria || ''
          })) as SalesRecord[]

          // Validar que los datos numéricos sean válidos
          const invalidRows = salesData.filter(row => 
            isNaN(row.cantidad) || isNaN(row.precio_unitario) || isNaN(row.total) ||
            row.cantidad <= 0 || row.precio_unitario <= 0 || row.total <= 0
          )

          if (invalidRows.length > 0) {
            throw new Error(`Se encontraron ${invalidRows.length} filas con datos numéricos inválidos`)
          }

          setPreviewData(salesData.slice(0, 5)) // Mostrar primeras 5 filas
          setUploadStatus('success')
          onUploadSuccess(salesData, file.name)
        } catch (error) {
          setUploadStatus('error')
          setErrorMessage(error instanceof Error ? error.message : 'Error desconocido')
        }
      },
      error: (error) => {
        setUploadStatus('error')
        setErrorMessage('Error al leer el archivo: ' + error.message)
      }
    })
  }, [onUploadSuccess])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
    },
    maxFiles: 1,
    disabled: isUploading
  })

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Cargar Datos de Ventas
        </CardTitle>
        <CardDescription>
          Sube un archivo CSV con tus datos de ventas para obtener análisis financiero con IA
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          {isDragActive ? (
            <p className="text-blue-600">Suelta el archivo aquí...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">
                Arrastra y suelta tu archivo CSV aquí, o haz clic para seleccionar
              </p>
              <p className="text-sm text-gray-500">
                Formato requerido: fecha, producto, cantidad, precio_unitario, total
              </p>
            </div>
          )}
        </div>

        {uploadStatus === 'validating' && (
          <div className="flex items-center gap-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Validando archivo...
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            {errorMessage}
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="h-4 w-4" />
              Archivo validado correctamente
            </div>
            
            {previewData.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Vista previa (primeras 5 filas):</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Fecha</th>
                        <th className="text-left p-2">Producto</th>
                        <th className="text-left p-2">Cantidad</th>
                        <th className="text-left p-2">Precio</th>
                        <th className="text-left p-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{row.fecha}</td>
                          <td className="p-2">{row.producto}</td>
                          <td className="p-2">{row.cantidad}</td>
                          <td className="p-2">€{row.precio_unitario}</td>
                          <td className="p-2">€{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {isUploading && (
          <div className="flex items-center gap-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Guardando datos y generando análisis...
          </div>
        )}
      </CardContent>
    </Card>
  )
}
