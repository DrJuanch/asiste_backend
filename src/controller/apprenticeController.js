const validator = require('../validators/apprenticeValidator')
const response = require('../helpers/response')
const error = require('../constants')

function getApprentice(req, res) {
    const filterApprentice = req.query.apprentice_id || null
    validator.getApprentice(filterApprentice)
        .then((apprenticeFound) => {
            response.success(req, res, apprenticeFound, 200);
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.unexpected, 500, err)
        });
};

function postApprentice(req, res) {
    const { apprentice_name, document, document_type, last_name_apprentice, phone, gender } = req.body
    validator.addApprentice(apprentice_name, document, document_type, last_name_apprentice, phone, gender)
        .then((apprentice) => {
            response.success(req, res, apprentice, 201)
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.invalid, 400, err);
        });
};

function putApprentice(req, res) {
    const { apprentice_name, document, document_type, last_name_apprentice, phone, gender } = req.body
    validator.updateApprentice(req.params.id, apprentice_name,  document, document_type, last_name_apprentice, phone, gender)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.intern, 500, err)
        });
};

function deleteApprentice(req, res) {
    let id = req.params.id
    validator.deleteApprentice(id)
        .then(() => {
            response.success(req, res, `Apprentice ${id} deleted`, 200);
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.check, 404, err);
        });
};

function addAttendance(req, res){
    const { date, attendance_state, news_report} = req.body
    validator.addAttendance(req.params.id, date, attendance_state, news_report)
        .then((data) => {
            response.success(req, res, { data }, 200);
        })
        .catch(err => {
            response.error(req, res, error.ERROR_RESPONSES.intern, 500, err)
        });
}
module.exports = {
    getApprentice,
    postApprentice,
    putApprentice,
    deleteApprentice,
    addAttendance
}
