const validator = require('../validators/courseValidator')
const response = require('../helpers/response')
const error = require('../constants')

function getCourse(req, res) {
    const filterCourse = req.query.course_id || null
    validator.getCourse(filterCourse)
        .then((courseFound) => {
            response.success(req, res, courseFound, 200);
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.unexpected, 500, err)
        });
};

function postCourse(req, res) {
    const { course_id, education_level, journey, instructor } = req.body
    validator.addCourse(course_id, education_level, journey, instructor)
        .then((course) => {
            response.success(req, res, course, 201)
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.invalid, 400, err);
        });
};

function putCourse(req, res) {
    const { course_id, education_level, journey, instructor } = req.body
    validator.updateCourse(req.params.id, course_id, education_level, journey, instructor)
        .then((data) => {
            response.success(req, res, { data }, 200);
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.intern, 500, err)
        });
};

function deleteCourse(req, res) {
    let id = req.params.id
    validator.deleteCourse(id)
        .then(() => {
            response.success(req, res, `Course ${id} deleted`, 200);
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.check, 404, err);
        });
};

function addApprentice(req, res) {
    const { apprentice_id } = req.body
    validator.addApprentice(req.params.id, apprentice_id)
        .then((data) => {
            response.success(req, res, { data }, 200);
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.intern, 500, err)
        });
};

module.exports = {
    getCourse,
    postCourse,
    putCourse,
    deleteCourse,
    addApprentice
}
