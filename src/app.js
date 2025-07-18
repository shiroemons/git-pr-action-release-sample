import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';

const app = new Hono();

// Add logging middleware
app.use('*', logger());

// Global error handler
app.onError((err, c) => {
  console.error(`Error: ${err.message}`);
  return c.json({
    error: {
      message: err.message || 'Internal Server Error',
      timestamp: new Date().toISOString()
    }
  }, 500);
});

// Not found handler
app.notFound((c) => {
  return c.json({
    error: {
      message: 'Route not found',
      path: c.req.url,
      timestamp: new Date().toISOString()
    }
  }, 404);
});

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

app.post('/echo', async (c) => {
  const body = await c.req.json();
  return c.json({ echo: body, timestamp: new Date().toISOString() });
});

app.get('/uptime', (c) => {
  return c.json({
    uptime_seconds: process.uptime(),
    uptime_human: new Date(process.uptime() * 1000).toISOString().substr(11, 8),
    start_time: new Date(Date.now() - process.uptime() * 1000).toISOString()
  });
});

app.get('/system-info', (c) => {
  return c.json({
    node_version: process.version,
    platform: process.platform,
    arch: process.arch,
    pid: process.pid,
    environment: process.env.NODE_ENV || 'development',
    memory_usage: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

app.get('/debug', (c) => {
  const debug = process.env.DEBUG === 'true';
  return c.json({
    debug_enabled: debug,
    request_headers: Object.fromEntries(c.req.header()),
    request_url: c.req.url,
    request_method: c.req.method,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/posts', (c) => {
  return c.json({
    posts: [
      { id: 1, title: 'First Post', author: 'Alice', created_at: '2025-01-01T00:00:00Z' },
      { id: 2, title: 'Second Post', author: 'Bob', created_at: '2025-01-02T00:00:00Z' },
      { id: 3, title: 'Third Post', author: 'Charlie', created_at: '2025-01-03T00:00:00Z' }
    ],
    total: 3,
    page: 1,
    per_page: 10
  });
});

app.get('/api/comments', (c) => {
  return c.json({
    comments: [
      { id: 1, post_id: 1, author: 'Dave', content: 'Great post!', created_at: '2025-01-01T12:00:00Z' },
      { id: 2, post_id: 1, author: 'Eve', content: 'Thanks for sharing', created_at: '2025-01-01T13:00:00Z' }
    ],
    total: 2
  });
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