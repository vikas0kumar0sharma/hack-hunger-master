const express=require('express')
const router=express.Router()
const Order=require('../Models/Order')

router.post('/checkOut',async(req,res)=>{

  const order=await Order.findOne({email:req.body.email})
  
  try {
    
    if(!order){
       await Order.create({
        email:req.body.email,
        order_data:req.body.data
      })
      return res.json({success:true})
    }

    if(order){

      let newOrderData=order.order_data

      req.body.data.forEach(element => {
        newOrderData.push(element)
      });

      await Order.findOneAndUpdate({email:req.body.email}, { "$set": { "order_data": newOrderData }})
      return res.json({success:true})
    }
    
  } catch (error) {
    console.log(error)
    res.json({success:false})
  }

})

router.post('/MyOrders',async(req,res)=>{
  const order=await Order.findOne({email:req.body.email})
  
  if(!order){
    return res.json({empty:true})
  }

  return res.json({orders:order.order_data,empty:false})
})

module.exports=router