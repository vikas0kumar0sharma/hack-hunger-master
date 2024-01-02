import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

const formatDate = (date) => {
  const isoDateString = date.toString()
  const isoDate = new Date(isoDateString);

  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  // Format the date
  const formattedDate = isoDate.toLocaleDateString("en-US", options);
  return formattedDate
}

const MyOrders = () => {

  const [Orders, setOrders] = useState([])
  const [orderTime, setOrderTime] = useState([])

  const fetchData = async () => {

    const userEmail = localStorage.getItem('useremail')

    const orders = await fetch("http://localhost:5000/api/Order/MyOrders", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userEmail })
    })

    const response = await orders.json()

    const arr = []

    if (response.empty === false) {
      response.orders.forEach(element => {
        arr.push(element)
      });
      setOrders(arr.reverse())
    }
  }

  useEffect(() => {
    let ordTimeSet = new Set()

    Orders.map((order) => {
      ordTimeSet.add(formatDate(order.date))
    })

    let ordTime = []

    ordTimeSet.forEach(element => {
      ordTime.push(element)
    });

    setOrderTime(ordTime)

    console.log(Orders)
  }, [Orders]);


  useEffect(() => {

    console.log(orderTime)

  }, [orderTime])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div><Navbar MyOrders={false} /></div>
      <div>
        {(Orders.length === 0 ?
          <div>No Orders Yet</div> :
          <div>
            
              {
                orderTime.map((oT, index) => {
                  return (
                    <div key={index} >
                    <div className='fs-5' key={index}> <span><QueryBuilderIcon/></span> {oT}</div>

                      <ul key={index+1}>

                      {
                        Orders.map((order,ind)=>{
                          return (
                            (oT===formatDate(order.date)) && <li key={ind+index}>{order.name}</li>
                          )
                        })
                      }

                      </ul>
                    </div>

                  )
                })
              }
            
          </div>)
        }
      </div>
      <div><Footer /></div>
    </>
  )
}

export default MyOrders