const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');


class TestController{

    static index=(req,res)=>{
        res.send({success:true,message: "Hello Cruel World"});
    }

    static createUser = catchAsync(async(req,res)=>{
        const user = await User.create(req.body);
        res.status(200).send({success:true,message:user});
    });

    static getUser = catchAsync(async(req,res)=>{
        let email = req.query.email;
        let user = await User.findOne({email});
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        res.send({success:true, data:user});
    });

    static updateName = catchAsync(async(req,res)=>{
        const email = req.body.email;
        const name = req.body.name;
        let user = await User.findOne({email});
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        if(name){
            user.name = name;
            await user.save();
        }
        res.send({success:true, data:user});
    });
}

module.exports = TestController;