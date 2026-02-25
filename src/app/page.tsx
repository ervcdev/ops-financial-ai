import Link from 'next/link'
import { BarChart3, Shield, Zap, Brain, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-900/20 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <BarChart3 className="h-16 w-16 text-indigo-500 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6">
              Resiliencia Ops
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Transforma tus datos de ventas en insights accionables con análisis financiero inteligente
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/upload" 
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
              <span className="relative">Subir Datos</span>
              <ArrowRight className="h-5 w-5 relative" />
            </Link>
            <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors duration-200"
            >
              Ver Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              ¿Por qué elegir Resiliencia Ops?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Potencia tu negocio con análisis financiero de última generación
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-lg text-center hover:border-slate-700 transition-colors duration-300">
              <Shield className="h-12 w-12 text-indigo-500 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-200 mb-4">Seguridad Total</h3>
              <p className="text-slate-400">
                Tus datos están protegidos con encriptación de nivel empresarial y políticas de seguridad estrictas
              </p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-lg text-center hover:border-slate-700 transition-colors duration-300">
              <Brain className="h-12 w-12 text-indigo-500 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-200 mb-4">Análisis IA</h3>
              <p className="text-slate-400">
                Inteligencia artificial avanzada que identifica patrones y genera recomendaciones personalizadas
              </p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-lg text-center hover:border-slate-700 transition-colors duration-300">
              <Zap className="h-12 w-12 text-indigo-500 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-200 mb-4">Rapidez</h3>
              <p className="text-slate-400">
                Procesa miles de registros en segundos y obtén insights inmediatos para decisiones rápidas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Cómo funciona
            </h2>
            <p className="text-xl text-slate-400">
              Tres pasos simples para obtener insights poderosos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">Sube tu CSV</h3>
              <p className="text-slate-400">Carga tus datos de ventas en formato CSV con las columnas requeridas</p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">Análisis Automático</h3>
              <p className="text-slate-400">Nuestra IA procesa y analiza tus datos identificando tendencias y oportunidades</p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">Insights Accionables</h3>
              <p className="text-slate-400">Recibe recomendaciones específicas y visualizaciones para mejorar tu negocio</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">
            Comienza tu análisis financiero hoy
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Únete a empresas que ya están tomando decisiones más inteligentes
          </p>
          <Link 
            href="/upload" 
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
            <span className="relative">Empezar Ahora</span>
            <ArrowRight className="h-5 w-5 relative" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="h-8 w-8 text-indigo-500" />
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                  Resiliencia Ops
                </span>
              </div>
              <p className="text-slate-400 mb-4">
                Análisis financiero inteligente para empresas que buscan crecer de manera sostenible y resiliente.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-200 mb-4">Empresa</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-slate-300 transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Carreras</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-200 mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-slate-300 transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
            <p>&copy; 2024 Resiliencia Ops. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
