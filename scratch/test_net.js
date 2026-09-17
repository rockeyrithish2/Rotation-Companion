import https from 'https';

const url = 'https://dulafewrpyrxalltvpiw.supabase.co/auth/v1/health';

console.log('Testing HTTPS GET to:', url);

const req = https.get(url, (res) => {
  console.log('STATUS CODE:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('RESPONSE BODY:', data));
});

req.on('error', (e) => {
  console.error('HTTPS ERROR:', e.message);
});
