import React from 'react'
import "./MiddlePage.css"
import {Link} from "react-router-dom"

const MiddlePage = () => {
  return (
    <div className='mhomepage-body'>
      
    <div className='mhomepage-container'>
       <div className="mhcontainer">
          <img  src="admin.png" alt="no img" />
          <Link to="/Login"><button className="btn1 login">Admin</button></Link> 
        </div>
        <div className="mhcontainer">
          <img  src="employee.jpg" alt="no img" />
          <Link to="/Login"><button className="btn1 login">Customer</button></Link> 
        </div>
    </div>

    </div>
  )
}

export default MiddlePage