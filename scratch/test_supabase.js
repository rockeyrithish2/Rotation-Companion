import fs from 'fs';
import path from 'path';

// Read .env.local if present
let envLocal = '';
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  envLocal = fs.readFileSync(envPath, 'utf8');
}

const hasUrl = envLocal.includes('VITE_SUPABASE_URL=') && !envLocal.includes('VITE_SUPABASE_URL=https://your-');
const hasKey = envLocal.includes('VITE_SUPABASE_ANON_KEY=') && !envLocal.includes('VITE_SUPABASE_ANON_KEY=your-');

console.log('ENV_LOCAL_EXISTS:', fs.existsSync(envPath));
console.log('HAS_SUPABASE_URL:', hasUrl);
console.log('HAS_SUPABASE_KEY:', hasKey);
