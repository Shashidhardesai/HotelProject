import React, { useEffect, useState } from 'react';
import './Setting.css';
import Navbar from './Navbar';
import Navbar1 from './Navbar1';
import axios from 'axios';

const Setting = () => {
  const [dataId, setDataId] = useState(null);
  const [toggl,settoggl]=useState(true)
  const [details, setDetails] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:''
      });

  
   const handlechange=(e)=>{
    const {name,value}=e.target;
    setDetails({
      ...details,[name]:value
    })
   }
  useEffect(() => {
    const user = localStorage.getItem('userId');
    if (user) {
      setDataId(user);
    }
    if (dataId) {
      updatedata();
    }
  }, [dataId]);

  const updatedata = async () => {
    try {
      const dat = await axios.get(`http://localhost:5000/hotelmanage/${dataId}`);
      setDetails(dat.data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const handleupdate=async()=>{
    try {
         const updat=await axios.put(`http://localhost:5000/hotelmanage/${dataId}`,details);
         console.log("update data:",updat)
    } catch (error) {
        console.log("error in updating",error)
    }
    settoggl(false)
  }
  

  return (
    <div>
      <Navbar />
      <Navbar1 />
      <div className="settings-container">
        <div className="setting-card ">
          <h2>Profile Setting</h2>
          <p>Manage your profile information and settings.</p>
        </div>
      </div>
      <div className='signup-containers'>
      <form onSubmit={handleupdate}>
        <div className="inputt">
          <label htmlFor="firstname" className="labe">Firstname:</label><br />
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={details.firstname}
            onChange={handlechange}
            placeholder="Enter first name"
          />
        </div>
        <div className="inputt">
          <label htmlFor="lastname" className="labe">Lastname:</label><br />
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={details.lastname}
            onChange={handlechange}
            placeholder="Enter last name"
          />
        </div>
        <div className="inputt">
          <label htmlFor="email" className="labe">E-mail:</label><br />
          <input
            type="text"
            id="email"
            name="email"
            value={details.email}
            onChange={handlechange}
            placeholder="Enter email"
          />
        </div>
        <div className="inputt">
          <label htmlFor="password" className="labe">Password:</label><br />
          <input
            type="password"
            id="password"
            name="password"
            value={details.password}
            onChange={handlechange}
          />
        </div>
        { toggl?
          <button type="submit" className="Button1" >update</button>:
          <button type="submit" className="Button1" >updated</button>
        }
        
      </form>
    </div>
    </div>
  );
};

export default Setting;
