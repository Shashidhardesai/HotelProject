import React from 'react'
import "./HomePage.css"
import {Link} from "react-router-dom"

const HomePage = () => {
  return (
    <div className='homepage-body'>
    <div className='homepage-container'>

        <h1>Welcome to Hotel Management</h1>
        <div className="hcontainer">
          <Link to="/MiddlePage"><button className="btn login">Login</button></Link> 
          <Link to="/SignUp"><button className="btn signup">Signup</button></Link> 
        </div>
    </div>
    </div>
  )
}

export default HomePage