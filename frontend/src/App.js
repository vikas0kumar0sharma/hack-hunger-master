import React from 'react'
import Home from './screens/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Login from './screens/Login'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup.jsx'
import { ContextReducer } from './components/ContextReducer.jsx'
import MyOrders from './screens/MyOrders.jsx'

const App = () => {
  return (
    <ContextReducer>
    <Router>

    <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/Signup' element={<Signup/>} />
        <Route exact path='/MyOrders' element={<MyOrders/>} />
    </Routes>

    </Router>
    </ContextReducer>
  )
}

export default App