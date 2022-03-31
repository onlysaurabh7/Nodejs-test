const userModel = require("../models/user")
let bcrypt = require('bcrypt');
let salt = bcrypt.genSaltSync(10);
const { validationResult } = require("express-validator");
let jwt=require("jsonwebtoken")
const signup = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            const errors = error.array()[0].msg;
            return res.status(400).send({
                message: errors,
                status: false,
            });
        }

        const {
            name,
            age,
            gender,
            phone,
            email,
            password,
        } = req.body;
        let checkUserExist = await userModel.findOne({ email: email })
        if (checkUserExist) {
            return res.status(400).send({
                message: "User already exist",
                status: false,
            });
        }
        const encyptPassword = await bcrypt.hashSync(
            password,
            salt
        );
    
        let newUser = new userModel({
            name,
            age,
            gender,
            phone,
            email,
            password:encyptPassword
        });

        let addedUser = await newUser.save();
        return res.status(200).send({
            message: "Register successfully",
            status: true,
            data: addedUser,
            
        });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Something went wrong", status: false, error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            const errors = error.array()[0].msg;
            return res.status(400).send({
                message: errors,
                status: false,
            });
        }

        const {
            email,
            password,
        } = req.body;

        userModel.findOne({ email: email }, (err, user) => {
            if (err) return res.status(400).send({
                status: false,
                message: 'Please try after some time'
            });

            if (!user) return res.status(400).send({
                status: false,
                message: 'You are not registered!',
            })
            bcrypt.compare(password, user.password, (err, data) => {
                if (!data) return res.status(400).send({
                    status: false,
                    message: 'Wrong password!'
                })
                else 
               
                return res.status(200).send({
                    message:"Login sucessfully",
                    status: true,
                    token: jwt.sign({ email: user.email, _id: user._id }, "secret", {}),
                    data: user,
                });
            })
        })
    } catch (error) {
        return res.status(500).send({
            message: "Internal server error",
            status: false
        })

    }

}

const getProfile=async(req,res)=>{
try {
    const { _id } = req.user;
    let userProfile=await userModel.findOne({_id:_id})
    if(!userProfile){
        return res.status(400).send({
            message:"Failed",
            status:false
        })
    }
    else{
        return res.status(200).send({
            message:"Sucess",
            status:true,
            data:userProfile
        })
    }
} catch (error) {
    return res.status(400).send({
        message:"Failed",
    
    })
}
}
module.exports = {
    signup,
    getProfile,
    login
};