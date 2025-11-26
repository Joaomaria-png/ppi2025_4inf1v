import { createClient } from '@supabase/supabase-js'

// Tenta ler variáveis do .env, mas usa fallback se vierem undefined
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ztgtlkcgxwqvrrbxydir.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0Z3Rsa2NneHdxdnJyYnh5ZGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1ODE3MTksImV4cCI6MjA3OTE1NzcxOX0.yaxG66zFn03GtE8ErjCEfGfAh5Rx7v08fYaRe9PNkMc"

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseAnonKey ? '***KEY PRESENT***' : 'MISSING KEY')

// Validação para evitar erro silencioso
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Supabase URL e/ou Anon Key não foram carregados. ' +
    'Verifique seu arquivo .env ou use os valores fixos.'
  )
}

// Cria o cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
