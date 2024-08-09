import React from 'react'
import "./Adnav.css"
import { Link } from 'react-router-dom'
const Adnav = () => {
  return (
    <div>
      <nav className="admin-navbar">
                <h1 className="navbar-brand">Admin Panel</h1>
                <div className="navbar-buttons">
                  <Link to="/AdminDash"><button className="nav-button">Dashboard</button></Link>  
                   <Link  to="/AdminRoom"> <button className="nav-button">Post Rooms</button></Link>
                   <Link  to="/Arooms"> <button className="nav-button">Available Rooms</button></Link>
                   <Link  to="/Login"> <button className="nav-button">Logout</button></Link>
                </div>
            </nav>
    </div>
  )
}

export default Adnav
