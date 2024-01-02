import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousal from '../components/Carousal'
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import Cart from './Cart'

const Home = () => {

  const [foodCat,setFoodCat]=useState([])
  const [foodItem,setFoodItem]=useState([])
  const [search,setSearch]=useState("")

  async function loadData(req,res){
    const response=await fetch("http://localhost:5000/api/displayData",{
      method:'get'
    })
    const json=await response.json()
    //console.log(json[0],json[1])
    setFoodCat(json[1])
    setFoodItem(json[0])
  }

  useEffect(()=>{
    loadData()
  },[])

  return (
    <>
      <div> <Navbar MyOrders={true} /> </div>
      <div> <Carousal search={search} setSearch={setSearch} /> </div>
      <div className='m-3 container'>
        {
          foodCat!== []
          ? 
          foodCat.map((data)=>{
             return (
              <div className='mb-3' key={data._id}>
                <div className='fs-3 m-3'> {data.CategoryName} </div>
                <hr />

                <div className='row '>
                  {
                    foodItem!==[]?
                    foodItem.filter((item)=>(item.CategoryName===data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map((filterItem)=>{
                      return (
                        <div key={filterItem._id} className='col-md-auto'>
                          <Card filterItem={filterItem} options={filterItem.options[0]} description={filterItem.description} /> 
                        </div>
                      )
                    }):<div>No Such data found</div>
                  }
                </div>

              </div>
             )
          })
          : "" 
        }
      </div>
      <div> <Footer /> </div>
    </>
  )
}

export default Home