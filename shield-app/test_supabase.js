import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jueeozsdzsjwujadoqly.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1ZWVvenNkenNqd3VqYWRvcWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NTAzMzMsImV4cCI6MjA5MzIyNjMzM30.gEeruDKLF0OCUNRysfO9fRCKjrS3IgqPJ9u5jj-9YUc'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  try {
    const { data, error } = await supabase.from('reports').select('*').limit(1)
    if (error) {
      console.error('Error:', error.message)
    } else {
      console.log('Success! Data:', data)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

test()
