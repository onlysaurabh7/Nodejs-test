
const router = require("express").Router();
const Auth = require("../middleware/auth");

const {
    signup,
    login,
    getProfile,


} = require("../controllers/user");
const {
    SIGNUP,
    LOGIN
} = require("../constant/validator/user");
const validate = require("../validator/user");

const PATH = {
    SIGNUP: "/signup",
    ROOT: "/",
    LOGIN: "/login",
    GET_PROFILE: "/get_profile",

};

/**
 * @api {POST} /signup
 * @desc SignUp API
 * @access public
 * **/
router.post(
    PATH.SIGNUP,
    validate(SIGNUP),
    signup
);

/**
 * @api {POST} /login
 * @desc LOGIN API
 * @access private
 * **/
router.post(
    PATH.LOGIN,
    validate(LOGIN),
    login
);

/**
 * @api {GET} /get_profile
 * @desc Get Profile API
 * @access private
 * **/
router.get(PATH.GET_PROFILE, Auth.VerifyToken, getProfile);




module.exports = router;