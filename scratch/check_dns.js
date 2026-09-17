import dns from 'dns';
import { Resolver } from 'dns/promises';

const domain = 'dulafewrpyrxalltvpiw.supabase.co';

console.log('Resolving domain:', domain);

// System DNS
dns.resolve4(domain, (err, addresses) => {
  if (err) {
    console.error('System DNS Error:', err.code, err.message);
  } else {
    console.log('System DNS Addresses:', addresses);
  }
});

// Google DNS (8.8.8.8)
const resolverGoogle = new Resolver();
resolverGoogle.setServers(['8.8.8.8']);
resolverGoogle.resolve4(domain).then(addrs => {
  console.log('Google DNS (8.8.8.8) Addresses:', addrs);
}).catch(err => {
  console.error('Google DNS (8.8.8.8) Error:', err.code, err.message);
});

// Cloudflare DNS (1.1.1.1)
const resolverCF = new Resolver();
resolverCF.setServers(['1.1.1.1']);
resolverCF.resolve4(domain).then(addrs => {
  console.log('Cloudflare DNS (1.1.1.1) Addresses:', addrs);
}).catch(err => {
  console.error('Cloudflare DNS (1.1.1.1) Error:', err.code, err.message);
});
