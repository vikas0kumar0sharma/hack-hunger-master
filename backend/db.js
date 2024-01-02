const mongoose=require('mongoose')

const mongoURI='mongodb+srv://svikaskumar23:vikas123@cluster0.ie0lktu.mongodb.net/gofoodmern?retryWrites=true&w=majority'

const mongoDb=async()=>{
    await mongoose.connect(mongoURI,async(err,result)=>{
      if(err){
        console.log('there is some error')
      }
      else{
        console.log('connected')

        const fetched_data=await mongoose.connection.db.collection("food_items")
        fetched_data.find({}).toArray((err,data)=>{
          if(err) console.log('error in converting data to array')
          else{
            global.food_items=data
          }
        })

        const foodCategory=await mongoose.connection.db.collection("foodCategory")
        foodCategory.find({}).toArray((err,data)=>{
          if(err) console.log('error in converting data to array')
          else{
            global.foodCategory=data
          }
        })
      }
    })
}

module.exports=mongoDb