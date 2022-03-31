const { body } = require("express-validator");
const {
    SIGNUP,
    LOGIN,

} = require("../constant/validator/user");

const validate = (method) => {
    let error = [];
    switch (method) {
        case SIGNUP: {
            error = [
                body("name", "Please enter name").not().isEmpty(),
                body("email", "Please enter email").not().isEmpty(),
                body("phone", "Please enter phone")
                    .not()
                    .isEmpty(),
                body("age", "Please enter age")
                    .not()
                    .isEmpty(),
                body("gender", "Please enter gender").not().isEmpty(),
                body("password", "Please enter password").not().isEmpty(),
            ];
            break;
        }
        case LOGIN: {
            error = [
                body("email", "Please enter email").not().isEmpty(),
                body("password", "Please enter password").not().isEmpty()
            ];
            break;
        }
    }
    return error;
};

module.exports = validate;