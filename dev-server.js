const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath) && !process.env.GEMINI_API_KEY) {
  const envText = fs.readFileSync(envPath, 'utf8');
  const keyLine = envText.split(/\r?\n/).find(line => line.startsWith('GEMINI_API_KEY='));
  if (keyLine) process.env.GEMINI_API_KEY = keyLine.slice('GEMINI_API_KEY='.length).trim();
}

const analyzeMedia = require('./api/analyze-media.js');
const MAX_BODY_BYTES = 4.2 * 1024 * 1024;
const PORT = Number(process.env.PORT) || 4173;

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
  if (pathname === '/api/analyze-media') {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return sendJson(res, 405, { error: 'Use POST for image analysis.' });
    }

    let size = 0;
    const chunks = [];
    for await (const chunk of req) {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) return sendJson(res, 413, { error: 'Evidence is too large. Choose a file smaller than 3 MB.' });
      chunks.push(chunk);
    }

    let body;
    try {
      body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      return sendJson(res, 400, { error: 'Request body must be valid JSON.' });
    }

    let statusCode = 200;
    const apiResponse = {
      setHeader(name, value) { res.setHeader(name, value); },
      status(code) { statusCode = code; return this; },
      json(payload) { sendJson(res, statusCode, payload); return this; }
    };
    return analyzeMedia({ ...req, body }, apiResponse);
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  if (pathname === '/' || pathname === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    if (req.method === 'HEAD') return res.end();
    return fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  }

  return sendJson(res, 404, { error: 'Not found.' });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Campus AI ready at http://localhost:${PORT}`);
  if (!process.env.GEMINI_API_KEY) console.log('Gemini key missing: media analysis will use text-based scoring.');
});
