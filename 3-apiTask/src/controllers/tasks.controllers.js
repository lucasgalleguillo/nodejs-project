const store = require('../data/tasks.memory');

// helpers de validación
function parseId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return next({ status: 400, code: 'BAD_REQUEST', message: 'id must be a positive integer' });
  }
  req.id = id;
  next();
}

function validateTitle(title) {
  return typeof title === 'string' && title.trim().length >= 1 && title.trim().length <= 100;
}

// GET /api/tasks
exports.list = (req, res) => {
  const { done } = req.query;
  let data = store.tasks;
  if (done === 'true') data = data.filter(t => t.done === true);
  if (done === 'false') data = data.filter(t => t.done === false);
  res.json(data);
};

// GET /api/tasks/:id
exports.getOne = [parseId, (req, res, next) => {
  const task = store.findById(req.id);
  if (!task) return next({ status: 404, code: 'NOT_FOUND', message: 'task not found' });
  res.json(task);
}];

// POST /api/tasks
exports.create = (req, res, next) => {
  const { title } = req.body || {};
  if (!validateTitle(title)) {
    return next({ status: 400, code: 'BAD_REQUEST', message: 'title is required (1-100 chars)' });
  }
  const task = store.create({ title: title.trim() });
  res.status(201).json(task);
};

// PUT /api/tasks/:id
exports.update = [parseId, (req, res, next) => {
  const { title, done } = req.body || {};

  if (!validateTitle(title) || typeof done !== 'boolean') {
    return next({
      status: 400,
      code: 'BAD_REQUEST',
      message: 'title (1-100 chars) and done (boolean) are required',
    });
  }

  const updated = store.update(req.id, { title: title.trim(), done });
  if (!updated) return next({ status: 404, code: 'NOT_FOUND', message: 'task not found' });
  res.json(updated);
}];

// PATCH /api/tasks/:id/done
exports.markDone = [parseId, (req, res, next) => {
  // si viene body con done, respetarlo; si no, por defecto true
  const bodyDone =
    typeof req.body?.done === 'boolean' ? req.body.done : true;

  const updated = store.patch(req.id, { done: bodyDone });
  if (!updated) return next({ status: 404, code: 'NOT_FOUND', message: 'task not found' });
  res.json(updated);
}];

// DELETE /api/tasks/:id
exports.remove = [parseId, (req, res, next) => {
  const removed = store.remove(req.id);
  if (!removed) return next({ status: 404, code: 'NOT_FOUND', message: 'task not found' });
  res.status(204).end();
}];
