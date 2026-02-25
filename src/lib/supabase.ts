import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      sales_data: {
        Row: {
          id: string
          user_id: string
          file_name: string
          upload_date: string
          data: any[]
          analysis_result?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          upload_date?: string
          data: any[]
          analysis_result?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_name?: string
          upload_date?: string
          data?: any[]
          analysis_result?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}