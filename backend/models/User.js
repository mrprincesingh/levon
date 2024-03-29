import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
const schema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Please enter Your Name"],
  },
  email: {
    type: "string",
    required: [true, "Please enter Your Email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: "string",
    required: [true, "Please enter Your Password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  role: {
    type: "string",
    enum: ["teacher", "student"],
    default: "student",
  },
  city:{
    type:"string"
  },
  mobile:{
    type:"string"
  },

  createdAt: {
    type:Date,
    default:Date.now,
  },
  resetPasswordToken :String,
  resetPasswordExpire:String,
});

schema.pre("save" , async function(next){
  if(!this.isModified("password")) return next()
 const hashedPassword =  await bcrypt.hash(this.password , 10)
 this.password = hashedPassword
 next()
})

schema.methods.getJWTToken = function (){
  return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
    expiresIn:"15d",
  })
}
schema.methods.comparePassword = async function (password){
  console.log(this.password)
  return await bcrypt.compare(password , this.password)
}

schema.methods.getResetToken =   async function (){
 const resetToken  =  crypto.randomBytes(20).toString("hex")

 this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
this.resetPasswordExpire = Date.now() + 15 * 60 *1000

 return resetToken
}

export const User = mongoose.model("User", schema);