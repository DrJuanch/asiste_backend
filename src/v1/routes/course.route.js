const express = require('express');
const router = express.Router();
const controller = require('../../controller/courseController');

router.post('/', controller.postCourse);
router.get('/', controller.getCourse);
router.put('/:id', controller.putCourse);
router.delete('/:id', controller.deleteCourse);
router.put('/añadirAprendiz', controller.addApprentice);


module.exports = router;
