import express from 'express';
import cors from 'cors';
import { templatesRouter } from './routes/templates';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Health check
app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'ui-template-api',
    version: '1.0.0',
    uptime: process.uptime()
  });
});

// Routes
app.use('/api/templates', templatesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Error]', err);
  res.status(500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`[UI Template API] Running on port ${PORT}`);
  console.log(`[Health] http://localhost:${PORT}/health`);
  console.log(`[Templates] http://localhost:${PORT}/api/templates`);
});
