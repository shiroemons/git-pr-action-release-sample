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

app.get('/api/users', (c) => {
  return c.json({
    users: [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' }
    ]
  });
});

app.get('/api/version', (c) => {
  return c.json({
    version: '1.1.0',
    features: ['user-api', 'health-check']
  });
});

app.get('/api/metrics', (c) => {
  return c.json({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/config', (c) => {
  return c.json({
    app_name: 'git-pr-action-release-sample',
    environment: process.env.NODE_ENV || 'development',
    debug: process.env.DEBUG === 'true',
    features: {
      metrics: true,
      users: true,
      health: true
    }
  });
});

app.get('/api/status', (c) => {
  return c.json({
    status: 'operational',
    services: {
      api: 'up',
      database: 'up',
      cache: 'up'
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/ping', (c) => {
  return c.text('pong');
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