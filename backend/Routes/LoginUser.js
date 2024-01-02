const express=require('express')
const router=express.Router()
const USER=require('../Models/User')
const {body,validationResult}=require('express-validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const secretKey="leaveMeAlone"

router.post('/',[
  body('email').isEmail(),
  body('password').isLength({min:4})
],
async(req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array(),success:false})
    }

    try {
      
      const userData=await USER.findOne({email:req.body.email})

      if(!userData){
        return res.status(400).json({errors:'Try logging in with correct credentials'})
      }

      const passMatches=await bcrypt.compare(req.body.password,userData.password)

      if(!passMatches){
        return res.status(400).json({errors:'Try logging in with correct credentials'})
      }

      const data={
        user:{
          id:userData.id
        }
      }

      const authToken=jwt.sign(data,secretKey)

      res.json({success:true,authToken:authToken})
    } catch (error) {
      res.json({success:false})
    }
})

module.exports=router