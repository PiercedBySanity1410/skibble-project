from supabase import create_client, Client

SUPABASE_URL = "https://lusilukhsqgkclojkzqx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1c2lsdWtoc3Fna2Nsb2prenF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mjk5MDQ4NiwiZXhwIjoyMDY4NTY2NDg2fQ.vfE4NpZ97ypLfncMnVzaqwlvKKFhdfng4dyT_tfO-Ow"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)