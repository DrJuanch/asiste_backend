const express = require('express');
const router = express.Router();
const controller = require('../../controller/apprenticeController');

router.post('/', controller.postApprentice);
router.get('/', controller.getApprentice);
router.put('/:id', controller.putApprentice);
router.delete('/:id', controller.deleteApprentice);
router.put('/addAttendance/:id', controller.addAttendance);


module.exports = router;
