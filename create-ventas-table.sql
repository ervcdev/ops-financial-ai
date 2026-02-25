-- Crear tabla ventas en Supabase
CREATE TABLE IF NOT EXISTS ventas (
  id SERIAL PRIMARY KEY,
  fecha DATE NOT NULL,
  producto TEXT NOT NULL,
  cantidad NUMERIC NOT NULL CHECK (cantidad > 0),
  precio_unitario NUMERIC NOT NULL CHECK (precio_unitario > 0),
  total NUMERIC NOT NULL CHECK (total > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_ventas_fecha ON ventas(fecha);
CREATE INDEX IF NOT EXISTS idx_ventas_producto ON ventas(producto);
CREATE INDEX IF NOT EXISTS idx_ventas_created_at ON ventas(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE ventas ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir todas las operaciones (para demo)
-- En producción, deberías usar auth.uid() para restringir por usuario
CREATE POLICY "Allow all operations on ventas" ON ventas
  FOR ALL USING (true) WITH CHECK (true);
