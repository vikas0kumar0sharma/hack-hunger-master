const express=require('express')
const router=express.Router()
const USER=require('../Models/User')
const {body,validationResult}=require('express-validator')
const bcrypt=require('bcryptjs')

router.post('/',[
  body('email').isEmail(),
  body('name').isLength({min:4}),
  body('password').isLength({min:4})
],
async(req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array(),success:false})
    }

    const salt=await bcrypt.genSalt(10)
    const hashedPass=await bcrypt.hash(req.body.password,salt)

    try {
      await USER.create({
        name:req.body.name,
        location:req.body.location,
        email:req.body.email,
        password:hashedPass
      })
      res.json({success:true})
    } catch (error) {
      res.json({success:false})
    }
})

module.exports=router