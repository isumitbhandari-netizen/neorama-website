import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use Express body-parser with a high limit to support syncing JSON data
  app.use(express.json({ limit: '50mb' }));

  // API endpoint for syncing modified villas back to the file
  app.post('/api/sync-villas', (req, res) => {
    try {
      const data = req.body;
      const filePath = path.resolve(process.cwd(), './src/components/stayvista_villas_saved.json');
      
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      res.json({ status: 'success' });
    } catch (err) {
      console.error('[Server Sync API Error]', err);
      res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
  });

  // Health check API endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('[Dev-Server] Vite middleware integrated successfully.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // Serve index.html for all React router fallbacks
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('[Prod-Server] Production static server configured.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Web application running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server Bootstrap Failed]', err);
  process.exit(1);
});
