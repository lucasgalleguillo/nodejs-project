const { Router } = require('express');
const ctrl = require('../controllers/tasks.controller');

const router = Router();

// /api/tasks
router.get('/', ctrl.list);
router.post('/', ctrl.create);

// /api/tasks/:id
router.get('/:id', ctrl.getOne);
router.put('/:id', ctrl.update);
router.patch('/:id/done', ctrl.markDone);
router.delete('/:id', ctrl.remove);

module.exports = router;
