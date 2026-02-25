import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import { Navigation } from '@/components/navigation'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Resiliencia Ops',
  description: 'Análisis Financiero Inteligente para Empresas Resilientes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-200 min-h-screen`}
      >
        <Navigation />
        {children}
        <Toaster 
          theme="dark" 
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgb(15 23 42)',
              border: '1px solid rgb(51 65 85)',
              color: 'rgb(226 232 240)',
            },
          }}
        />
      </body>
    </html>
  )
}
