const validator = require('../validators/instructorValidator')
const response = require('../helpers/response')
const error = require('../constants')

function getInstructor(req, res) {
    const filterInstructor = req.query.instructor_id || null
    validator.getInstructor(filterInstructor)
        .then((instructorFound) => {
            response.success(req, res, instructorFound, 200);
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.unexpected, 500, err)
        });
};

function postInstructor(req, res) {
    const { instructor_name, instructor_document, institutional_email, password } = req.body
    validator.addInstructor(instructor_name, instructor_document, institutional_email, password)
        .then((instructor) => {
            response.success(req, res, instructor, 201)
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.invalid, 400, err);
        });
};

function putInstructor(req, res) {
    const { instructor_name, instructor_document, institutional_email, password } = req.body
    validator.updateInstructor(req.params.id, instructor_name, instructor_document, institutional_email, password)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.intern, 500, err)
        });
};

function deleteInstructor(req, res) {
    let id = req.params.id
    validator.deleteInstructor(id)
        .then(() => {
            response.success(req, res, `Instructor ${id} deleted`, 200);
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.check, 404, err);
        });
};

module.exports = {
    getInstructor,
    postInstructor,
    deleteInstructor,
    putInstructor
}
