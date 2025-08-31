// almacenamiento en memoria (se pierde al reiniciar)
const tasks = [
  { id: 1, title: 'Practicar Node', done: false, createdAt: new Date().toISOString() },
];

// genera ids incrementales
function nextId() {
  return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

function findById(id) {
  return tasks.find(t => t.id === id) || null;
}

function create({ title }) {
  const task = { id: nextId(), title, done: false, createdAt: new Date().toISOString() };
  tasks.push(task);
  return task;
}

function update(id, { title, done }) {
  const t = findById(id);
  if (!t) return null;
  t.title = title;
  t.done = done;
  return t;
}

function patch(id, { done }) {
  const t = findById(id);
  if (!t) return null;
  if (typeof done === 'boolean') t.done = done;
  return t;
}

function remove(id) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

module.exports = { tasks, findById, create, update, patch, remove };
