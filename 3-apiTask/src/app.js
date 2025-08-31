const express = require('express');
const tasksRouter = require('./routes/tasks.routes');

const app = express();

/* ── Middlewares base ── */
app.use(express.json()); // parsea JSON en req.body

// Aceptar sólo JSON en métodos con body (POST/PUT/PATCH)
app.use((req, res, next) => {
  const m = req.method.toUpperCase();
  const needsBody = m === 'POST' || m === 'PUT' || m === 'PATCH';
  if (!needsBody) return next();

  const ct = req.headers['content-type'] || '';
  const isJson = /^application\/json\b/i.test(ct);
  if (!isJson) {
    return res
      .status(415)
      .json({ error: { code: 'UNSUPPORTED_MEDIA_TYPE', message: 'Content-Type must be application/json' } });
  }
  next();
});

/* ── Rutas ── */
app.use('/api/tasks', tasksRouter);

/* ── 404 ── */
app.use((req, res) => {
  res.status(404).json({
    error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.originalUrl} not found` },
  });
});

/* ── Error handler ── */
app.use((err, req, res, next) => {
  const status = Number.isInteger(err.status) ? err.status : 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'Unexpected error';
  res.status(status).json({ error: { code, message } });
});

module.exports = app;
