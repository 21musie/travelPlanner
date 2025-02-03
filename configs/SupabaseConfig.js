const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://ksvineimmpnvmoyrkyfo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzdmluZWltbXBudm1veXJreWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MTMwNjMsImV4cCI6MjA1NDA4OTA2M30.R0WxMF-nRGBlLzQQC7kxr9dDc8-mC8bcrzOZ5pQMRX8";

const supabase = createClient(supabaseUrl, supabaseKey);

// module.exports = { supabase }; // Or: 
export { supabase }; // if using ES modules