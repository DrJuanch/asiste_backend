const express = require('express');
const router = express.Router();
const controller = require('../../controller/instructorController');

router.post('/', controller.postInstructor);
router.get('/', controller.getInstructor);
router.put('/:id', controller.putInstructor);
router.delete('/:id', controller.deleteInstructor);


module.exports = router;
