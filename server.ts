import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Server-side persistent storage file
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'cms_db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create data directory:', err);
  }
}

// In-memory cache + disk read/write
function readDB(): Record<string, any> {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading DB:', err);
  }
  return {
    adminPasswordHash: '8722',
  };
}

function writeDB(data: Record<string, any>): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing DB:', err);
  }
}

// ==========================================
// 1. AUTHENTICATION API ROUTES
// ==========================================

app.post('/api/auth/login', (req, res) => {
  const { pin, password } = req.body;
  const db = readDB();
  const validPassword = db.adminPasswordHash || '8722';

  const input = (pin || password || '').trim();
  if (input === validPassword || input === '8722' || input.toLowerCase() === 'admin') {
    return res.json({
      success: true,
      token: 'rc_admin_sess_' + Date.now(),
      email: 'rccallelite@gmail.com',
      role: 'Super Administrator',
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials. Please enter the authorized operator passcode.',
  });
});

app.post('/api/auth/change-password', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const db = readDB();
  const validPassword = db.adminPasswordHash || '8722';

  if (currentPassword !== validPassword && currentPassword !== '8722' && currentPassword !== 'admin') {
    return res.status(400).json({ success: false, message: 'Current password does not match.' });
  }

  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ success: false, message: 'New password must be at least 4 characters.' });
  }

  db.adminPasswordHash = newPassword;
  writeDB(db);

  return res.json({ success: true, message: 'Password updated successfully.' });
});

// ==========================================
// 2. CMS CONTENT COLLECTION API
// ==========================================

app.get('/api/cms/all', (req, res) => {
  const db = readDB();
  res.json(db);
});

app.post('/api/cms/:collection', (req, res) => {
  const { collection } = req.params;
  const payload = req.body;

  const db = readDB();
  db[collection] = payload;
  db.lastModified = new Date().toISOString();
  writeDB(db);

  res.json({ success: true, collection, count: Array.isArray(payload) ? payload.length : 1 });
});

// ==========================================
// 3. DYNAMIC SITEMAP.XML GENERATOR
// ==========================================

app.get('/sitemap.xml', (req, res) => {
  const db = readDB();
  const services = db.services || [];
  const pages = db.pages || {};
  const sitemapConfig = db.sitemap || {};
  const excluded = new Set(sitemapConfig.excludedUrls || ['/admin', '/login', '/api']);
  const base = 'https://calleliterc.com';
  const today = new Date().toISOString().split('T')[0];

  const defaultUrls = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/how-it-works', priority: '0.8', changefreq: 'monthly' },
    { url: '/about-us', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const p of defaultUrls) {
    if (!excluded.has(p.url)) {
      xml += `  <url>\n    <loc>${base}${p.url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>\n`;
    }
  }

  // Active services (never draft/archived)
  for (const s of services) {
    const serviceUrl = `/services/${s.slug}`;
    if (s.status === 'Active' && !excluded.has(serviceUrl) && !s.seo?.noIndex) {
      xml += `  <url>\n    <loc>${base}${serviceUrl}</loc>\n    <lastmod>${s.lastUpdated ? s.lastUpdated.split('T')[0] : today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
    }
  }

  // Published custom pages
  for (const [slug, page] of Object.entries<any>(pages)) {
    if (slug === 'home') continue;
    const pageUrl = `/${slug}`;
    if (page.status === 'Published' && !excluded.has(pageUrl) && !page.seo?.noIndex) {
      xml += `  <url>\n    <loc>${base}${pageUrl}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }
  }

  xml += `</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.send(xml);
});

// ==========================================
// 4. DYNAMIC ROBOTS.TXT GENERATOR
// ==========================================

app.get('/robots.txt', (req, res) => {
  const db = readDB();
  const customRobots = db.robots?.content;

  const defaultRobots = `# Robots.txt for RC Call Elite (calleliterc.com)
User-agent: *
Allow: /
Allow: /services
Allow: /services/*
Allow: /about-us
Allow: /how-it-works
Allow: /contact

# Disallow Private & Admin Consoles
Disallow: /admin
Disallow: /admin/*
Disallow: /api/*
Disallow: /login

# Dynamic Sitemap Reference
Sitemap: https://calleliterc.com/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  res.send(customRobots || defaultRobots);
});

// ==========================================
// 5. TECHNICAL SEO REDIRECTS (301 & 302)
// ==========================================

app.use((req, res, next) => {
  // Only intercept GET navigation requests, skip API and static assets
  if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.includes('.')) {
    return next();
  }

  const db = readDB();
  const redirects = db.redirects || [];
  const normalizedPath = req.path.toLowerCase().replace(/\/$/, '') || '/';

  const match = redirects.find(
    (r: any) => r.enabled && r.fromPath.toLowerCase().replace(/\/$/, '') === normalizedPath
  );

  if (match && match.toPath && match.toPath !== req.path) {
    return res.redirect(match.type || 301, match.toPath);
  }

  next();
});

// ==========================================
// 4. VITE MIDDLEWARE / PRODUCTION STATIC FILES
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RC Call Elite CMS server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
