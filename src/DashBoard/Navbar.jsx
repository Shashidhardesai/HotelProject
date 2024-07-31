import React, { useState, useRef, useEffect } from 'react';
import "./Navbar.css";
import { FaRegBell } from "react-icons/fa";
import Navbar1 from './Navbar1';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";
import { useLocation,Link } from 'react-router-dom';


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("admin.png");
  const fileInputRef = useRef(null);
  const location = useLocation();
  const [isupload, setIsupload] = useState(true);
  const [details, setDetails] = useState({});

  const userId = location.state?.userId || localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/getUserImage/${userId}`);
        if (res.data.url) {
          setImageSrc(res.data.url);
        }
      } catch (err) {
        console.error('Error fetching user image:', err);
      }
    };

    const fetchData = async () => {
      try {
        const fdata = await axios.get(`http://localhost:5000/hotelmanage/${userId}`);
        setDetails(fdata.data);
      } catch (error) {
        console.log("Error in fetching data:", error);
      }
    };

    if (userId) {
      fetchUserImage();
      
      fetchData();
      localStorage.setItem('userId', userId);
    }
  }, [userId]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageSrc', fileInputRef.current.files[0]);
    formData.append('userId', userId);

    try {
      const res = await axios.post('http://localhost:5000/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully', res.data);
    } catch (err) {
      console.error('Error uploading file', err);
    }
    setIsupload(false);
  };

  return (
    <div className='navbar-container'>
      <div className='top-navbar'>
        <p><FaRegBell /></p>
        <img src={imageSrc} alt="Admin" />
        <h2>{details.firstname}</h2>
        <button onClick={toggleDropdown} className='dropdownn-button'>
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>
      <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
        <form onSubmit={handleSubmit}>
          <img src={imageSrc} alt="Profile" onClick={handleImageClick} className='dropdown-image' />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          /><br />
          <h2>{`${details.firstname} ${details.lastname}`}</h2>
          <p>{details.email}</p>
          {
            isupload ? <button type="submit">Upload Photo</button> :
              <button type="submit">Uploaded</button>
          }
          <Link to="/Login"><button style={{margin:"5px"}}>Logout</button></Link>
        </form>
      </div>
      <hr />
      <Navbar1 />
    </div>
  );
}

export default Navbar;
