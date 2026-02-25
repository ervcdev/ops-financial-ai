# Resiliencia Ops - Análisis Financiero con IA

Una plataforma de análisis financiero inteligente que ayuda a las empresas a ser más resilientes mediante insights accionables generados por IA.
[![Platzi Challenge](https://img.shields.io/badge/Reto-Platzi-green?style=for-the-badge&logo=platzi)](https://platzi.com)
[![Windsurf](https://img.shields.io/badge/Built%20with-Windsurf%20AI-blue?style=for-the-badge)](https://codeium.com/windsurf)

## 🚀 Características

- **Carga de CSV**: Sube archivos CSV con datos de ventas
- **Análisis con IA**: Procesamiento automático con OpenAI GPT-4
- **Dashboard Interactivo**: Visualización completa de métricas y tendencias
- **Recomendaciones**: Consejos específicos para mejorar el rendimiento
- **Visualizaciones**: Gráficos interactivos con Recharts
- **Detección de Riesgos**: Identificación automática de riesgos financieros

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de Datos**: Supabase (PostgreSQL)
- **IA**: OpenAI GPT-4
- **Visualizaciones**: Recharts
- **UI Components**: Lucide React, Custom UI Components

## 📋 Requisitos Previos

- Node.js 20.x o superior
- Cuenta de Supabase
- API Key de OpenAI
- npm o yarn

## ⚙️ Configuración

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd ops-financial-ai
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# OpenAI
OPENAI_API_KEY=tu_openai_api_key
```

### 4. Configurar la base de datos

Ejecuta el siguiente SQL en tu consola de Supabase:

```sql
-- Crear tabla sales_data
CREATE TABLE IF NOT EXISTS sales_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data JSONB NOT NULL,
  analysis_result JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_sales_data_user_id ON sales_data(user_id);
CREATE INDEX IF NOT EXISTS idx_sales_data_upload_date ON sales_data(upload_date);

-- Habilitar RLS
ALTER TABLE sales_data ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad (para demo)
CREATE POLICY "Users can view own sales data" ON sales_data FOR SELECT USING (true);
CREATE POLICY "Users can insert own sales data" ON sales_data FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own sales data" ON sales_data FOR UPDATE USING (true);
```

### 5. Ejecutar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📊 Formato de CSV

Tu archivo CSV debe contener las siguientes columnas obligatorias:

- `fecha`: Fecha de la venta (YYYY-MM-DD)
- `producto`: Nombre del producto
- `cantidad`: Cantidad vendida (número)
- `precio_unitario`: Precio por unidad (número)
- `total`: Total de la venta (número)

Columnas opcionales:
- `cliente`: Nombre del cliente
- `categoria`: Categoría del producto

### Ejemplo de CSV:

```csv
fecha,producto,cantidad,precio_unitario,total,cliente,categoria
2024-01-15,Laptop Dell XPS 13,2,1200.00,2400.00,Empresa ABC,Tecnología
2024-01-16,Mouse Inalámbrico,5,25.99,129.95,Oficina Central,Accesorios
```

## 🎯 Cómo usar la plataforma

### 1. Página Principal
- Visita la página principal para conocer las características
- Haz clic en "Comenzar Análisis" para subir datos

### 2. Subir CSV
- Arrastra y suelta tu archivo CSV o haz clic para seleccionar
- La plataforma validará automáticamente el formato
- Verás una vista previa de los primeros registros

### 3. Análisis Automático
- Los datos se guardan en Supabase
- La IA analiza automáticamente los datos
- Se generan insights, recomendaciones y métricas

### 4. Dashboard de Resultados
- **Métricas Clave**: Ingresos totales, número de transacciones, valor promedio
- **Salud Financiera**: Puntuación del 1-100
- **Tendencias**: Análisis de crecimiento y patrones estacionales
- **Insights**: Descubrimientos importantes sobre el negocio
- **Recomendaciones**: Acciones específicas para mejorar
- **Riesgos y Oportunidades**: Factores críticos identificados
- **Visualizaciones**: Gráficos de tendencias y productos top

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/upload/        # API endpoint para subir CSV
│   ├── dashboard/         # Página del dashboard
│   ├── upload/           # Página de carga
│   └── page.tsx          # Página principal
├── components/           # Componentes React
│   ├── ui/              # Componentes UI base
│   ├── analysis-dashboard.tsx
│   ├── csv-upload.tsx
│   └── sales-chart.tsx
├── lib/                 # Utilidades
│   ├── supabase.ts     # Cliente de Supabase
│   └── utils.ts        # Funciones auxiliares
└── types/              # Tipos TypeScript
    └── business.ts     # Tipos de negocio
```

## 🔧 API Endpoints

### POST /api/upload
Procesa y guarda datos CSV, inicia análisis con IA.

**Body:**
```json
{
  "data": [...], // Array de registros de ventas
  "fileName": "ventas.csv",
  "userId": "demo-user"
}
```

**Response:**
```json
{
  "success": true,
  "fileId": "uuid",
  "summary": {
    "recordsCount": 100,
    "totalRevenue": 50000,
    "dateRange": {...},
    "fileName": "ventas.csv"
  }
}
```

## 🤖 Análisis con IA

La plataforma utiliza OpenAI GPT-4 para generar:

- **Resumen Ejecutivo**: Análisis general del rendimiento
- **Insights Clave**: Patrones y tendencias importantes
- **Recomendaciones**: Acciones específicas para mejorar
- **Puntuación de Salud**: Evaluación del 1-100
- **Análisis de Tendencias**: Crecimiento y patrones estacionales
- **Identificación de Riesgos**: Factores que podrían afectar el negocio
- **Oportunidades**: Áreas de crecimiento potencial

## 📈 Visualizaciones

- **Gráfico de Tendencias**: Evolución mensual de ingresos
- **Top Productos**: Productos con mayor facturación
- **Métricas en Tiempo Real**: KPIs principales
- **Indicadores de Salud**: Puntuaciones visuales

## 🔒 Seguridad

- Row Level Security (RLS) habilitado en Supabase
- Validación de datos en frontend y backend
- Variables de entorno para credenciales sensibles
- Sanitización de datos CSV

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Otras plataformas
- Netlify
- Railway
- DigitalOcean App Platform

## 🐛 Solución de Problemas

### Error de conexión a Supabase
- Verifica las URLs y keys en `.env.local`
- Asegúrate de que las políticas RLS estén configuradas

### Error de OpenAI
- Verifica tu API key de OpenAI
- Revisa los límites de tu cuenta

### Problemas con CSV
- Asegúrate de que el CSV tenga las columnas requeridas
- Verifica que los datos numéricos sean válidos

## 📝 Licencia

MIT License - Ver archivo LICENSE para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas, abre un issue en el repositorio.

---

**Resiliencia Ops** - Fortaleciendo empresas con inteligencia artificial 🚀