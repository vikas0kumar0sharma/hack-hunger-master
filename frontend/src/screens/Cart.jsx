import React from 'react'
import { useCart, useDispatch } from '../components/ContextReducer'
import Delete from '@material-ui/icons/Delete'

const Cart = () => {

  let data = useCart()
  let dispatch = useDispatch()

  if(data.length===0){
    return(
      <div>
         <div className='m-5 w-100 text-center fs-3'>No Items Yet</div>
      </div>
    )
  }

  // store the orders of user 
  const handleCheckOut=async()=>{

    const userEmail=localStorage.getItem('useremail')

    data.forEach(element => {
      element.date=new Date()
    });

    const response=await fetch("http://localhost:5000/api/Order/checkOut",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email:userEmail,data:data})
    })
    const resp=await response.json()
    console.log(resp)
    if(resp.success===false){
      alert('Something went wrong,Please try again later.')
    }
    else{
      data.forEach(async(element) => {
        await dispatch({type:'REMOVE',payload:{id:element.id}})
      });
    }
  }

  let finalPrice=data.reduce((total,food)=>total+food.price,0)

  return (
    <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
      <table className='table table-hover'>
        <thead className='fs-4 text-success'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Option</th>
            <th scope='col'>Amount</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((food, index) => {
              return (
                <tr key={index}>
                  <td scope='col'> {index+1} </td>
                  <td scope='col'> {food.name} </td>
                  <td scope='col'>{food.qty}</td>
                  <td scope='col'>{food.size}</td>
                  <td scope='col'>{food.price}</td>
                  <td scope='col'>
                    <button className='btn p-0'> <Delete onClick={async()=>{await dispatch({type:'REMOVE',payload:{id:food.id}})}} /> </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>

      </table>

      <div>
        <h1 className='fs-2'>Total Price:{finalPrice}/-</h1>
      </div>

      <div>
        <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
      </div>

    </div>
  )
}

export default Cart