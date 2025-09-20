const router = require('express').Router();
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/admin');
const controller = require('../controllers/sweetsController');

router.post('/', auth, controller.create);
router.get('/', controller.list);
router.get('/search', controller.search);
router.put('/:id', auth, adminOnly, controller.update);
router.delete('/:id', auth, adminOnly, controller.delete);

module.exports = router;
