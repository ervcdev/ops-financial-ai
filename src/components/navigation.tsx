'use client'

import Link from 'next/link'
import { BarChart3 } from 'lucide-react'

export function Navigation() {
  return (
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-slate-200 hover:text-white transition-colors duration-200"
          >
            <BarChart3 className="h-8 w-8 text-indigo-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
              Resiliencia Ops
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/upload" 
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Subir Datos
            </Link>
            <Link 
              href="/dashboard" 
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
