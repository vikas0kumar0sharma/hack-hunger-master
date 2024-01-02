import React,{useState} from 'react'
import {useCart,useDispatch} from './ContextReducer'

const Card = ({filterItem}) => {
  
  let data=useCart()
  let dispatch=useDispatch()
  const options=filterItem.options[0]
  let priceOptions=Object.keys(options)

  const [qty,setQty]=useState(1)
  const [size,setSize]=useState(priceOptions[0])

  const handleAddToCart=async()=>{
    await dispatch({type:'ADD',payload:{
      id:filterItem._id,
      img:filterItem.img,
      name:filterItem.name,
      price:finalPrice,
      qty:qty,
      size:size,
      date:new Date()
    }})
  }

  let finalPrice=qty*parseInt(options[size])

  return (
    <div className="card m-3" style={{ "width": "19rem", "maxHeight": "450px" }}>
      <img src={filterItem.img} className="card-img-top" alt="..." style={{"height":"12rem"}} />
      <div className="card-body">
        <h5 className="card-title">{filterItem.name}</h5>
        <p className="card-text">{filterItem.description}</p>
        <div className="container w-100">

          <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option value={i + 1} key={i + 1}>{i + 1}</option>
              )
            })}
          </select>

          <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setSize(e.target.value)}>
            {priceOptions.map((data)=>{
              return(
                <option key={data} value={data}>{data}</option>
              )
            })}
          </select>

          <div className='d-inline'>₹{finalPrice}</div>
          <hr/>
          <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Card