const { compare } = require('../helpers/handleBcrypt');
const response = require('../helpers/response');
const { tokenSign } = require('../helpers/generateToken');
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
            const tokenSession = await tokenSign(user);
            response.success(req, res, { data: user, tokenSession }, 200);
            return;
        } else if (!comparing) {
            response.error(req, res, error.ERROR_RESPONSES.invalid);
        };
    } catch (e) {
        response.error(req, res, error.ERROR_RESPONSES.unexpected)
    };
};

module.exports = { loginController };
