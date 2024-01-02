const express=require('express')
const router=express.Router()

router.get('/',async(req,res)=>{
  try {
    res.json([global.food_items,global.foodCategory])
  } catch (error) {
    console.error(error)
  }
})

module.exports=router