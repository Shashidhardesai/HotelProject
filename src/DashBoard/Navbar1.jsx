import React from 'react'
import { AiFillAppstore } from "react-icons/ai";
import { GrUserWorker } from "react-icons/gr";
import { TbEmergencyBed } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./Navbar1.css"

const Navbar1 = () => {
  return (
    <div>
        <div className='side-navbar'>
            <Link to="/Dashboard">  <button><AiFillAppstore /></button></Link> 
            <Link to="/BookDetails"><button><GrUserWorker /></button></Link> 
            <Link to="/FireEmer">  <button><TbEmergencyBed /></button></Link> 
            <Link to="/Calender">  <button><FaCalendarAlt /></button></Link> 
            <Link to="/Setting"> <button><IoSettings /></button></Link> 
        </div>
    </div>
  )
}

export default Navbar1