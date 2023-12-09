const { compare } = require('../helpers/handleBcrypt');
const response = require('../helpers/response');
const instructorModel = require('../models/instructorModel');
const error = require('../constants');

const loginController = async (req, res) => {
    try {

        const { instructor_email, instructor_password } = req.body;
        const user = await instructorModel.findOne({ institutional_email: instructor_email });

        if (!user) {
            return response(req, res, error.ERROR_RESPONSES.not_found, 401);
        }

        const comparing = await compare(instructor_password, user.password);

        if (comparing) {
            response.success(req, res, { data: user }, 200);
            return;
        } else if (!comparing) {
            response.error(req, res, error.ERROR_RESPONSES.invalid);
        };
    } catch (e) {
        response.error(req, res, error.ERROR_RESPONSES.unexpected)
    };
};

module.exports = { loginController };
