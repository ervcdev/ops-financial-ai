import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Brain, Shield, TrendingUp, Upload, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Resiliencia Ops</h1>
            </div>
            <Link href="/upload">
              <Button>Comenzar Análisis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Análisis Financiero Inteligente
            <span className="block text-blue-600">para Empresas Resilientes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transforma tus datos de ventas en insights accionables con inteligencia artificial. 
            Obtén recomendaciones personalizadas para fortalecer la salud financiera de tu empresa.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/upload">
              <Button size="lg" className="text-lg px-8">
                <Upload className="h-5 w-5 mr-2" />
                Subir Datos CSV
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Resiliencia Ops?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nuestra plataforma combina análisis de datos avanzado con inteligencia artificial 
              para ayudarte a tomar decisiones financieras más informadas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>IA Avanzada</CardTitle>
                <CardDescription>
                  Algoritmos de machine learning analizan patrones complejos en tus datos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Detección automática de tendencias</li>
                  <li>• Predicciones de crecimiento</li>
                  <li>• Identificación de riesgos</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Análisis Profundo</CardTitle>
                <CardDescription>
                  Insights detallados sobre el rendimiento financiero de tu empresa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Métricas clave de rendimiento</li>
                  <li>• Análisis de productos</li>
                  <li>• Patrones estacionales</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Recomendaciones</CardTitle>
                <CardDescription>
                  Consejos específicos y accionables para mejorar tu negocio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Estrategias de crecimiento</li>
                  <li>• Optimización de precios</li>
                  <li>• Gestión de riesgos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cómo funciona
            </h2>
            <p className="text-gray-600">
              Proceso simple en 3 pasos para obtener insights valiosos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Sube tu CSV</h3>
              <p className="text-gray-600">
                Carga tu archivo con datos de ventas. Formato: fecha, producto, cantidad, precio, total.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. IA Analiza</h3>
              <p className="text-gray-600">
                Nuestra inteligencia artificial procesa tus datos y genera insights personalizados.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Obtén Resultados</h3>
              <p className="text-gray-600">
                Recibe un dashboard completo con análisis, recomendaciones y visualizaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para fortalecer tu empresa?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Comienza tu análisis financiero gratuito y descubre oportunidades de crecimiento.
          </p>
          <Link href="/upload">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              <Upload className="h-5 w-5 mr-2" />
              Comenzar Ahora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">Resiliencia Ops</span>
          </div>
          <p className="text-gray-400">
            Análisis financiero inteligente para empresas resilientes
          </p>
        </div>
      </footer>
    </div>
  );
}
