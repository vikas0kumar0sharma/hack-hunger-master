require('dotenv').config({ override: true })
const express=require('express')
const app=express()
const PORT=process.env.PORT
const mongoDb=require('./db')
const cors=require('cors')
const bodyParser=require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use('/api/createUser',require('./Routes/CreateUser'))
app.use('/api/loginUser',require('./Routes/LoginUser'))
app.use('/api/displayData',require('./Routes/DisplayData'))
app.use('/api/Order',require('./Routes/Order'))

mongoDb()

app.get('/',(req,res)=>{
  res.end("hello")
})

app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
