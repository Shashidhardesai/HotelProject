import React, { useState } from 'react';
import './FireEmer.css'; 
import Navbar from './Navbar';
import Navbar1 from './Navbar1';

const FireEmer = () => {
  const [data,setData] = useState({
    query:'',
    phone:''
  });
  const handlechange = (e) => {
    const { name, value} = e.target;
    setData({
      ...data,
      [name]:  value,
    });
  };
  const handleSubmit=()=>{
    setData({
      query:'',
      phone:''
    })
  }

  return (
    <div className='fire-contain'>
      <Navbar/>
      <Navbar1/>
    <div className="container">
      <h1>Emergency Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h2>Hotel mail</h2>
          <h3>hotel@gmail.com</h3>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handlechange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="thoughts">About Issue</label>
          <textarea  type="text" name="thoughts" 
            rows="5"
            cols="40"
            value={data.query} 
            onChange={handlechange} 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', minHeight: '100px' }}
            required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default FireEmer;
