import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

app.get('/', (c) => {
  return c.json({
    message: 'Hello World!',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (c) => {
  return c.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const port = process.env.PORT || 3000;

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(`Server running at http://localhost:${port}`);
  serve({
    fetch: app.fetch,
    port
  });
}

export default app;