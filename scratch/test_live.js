import { createClient } from '@supabase/supabase-js';

const url = 'https://dulafewrpyrxallvtpiw.supabase.co';
const key = 'sb_publishable_3islWtjL9XBH5FvbDj4Wjg_wirVu6tw';

console.log('Testing Supabase client with:');
console.log('URL:', url);
console.log('KEY prefix:', key.substring(0, 20));

const supabase = createClient(url, key);

async function test() {
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log('GET SESSION RESULT:');
    console.log('Error:', error);
    console.log('Session:', data?.session ? 'Active' : 'Null (No session yet)');
  } catch (e) {
    console.error('CATCH ERROR:', e.message);
  }
}

test();
