import React, { useState } from 'react';
import './SignUp.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [signData, setSignData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const navigate=useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignData({
      ...signData,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!signData.firstname.match(/^[a-zA-Z]+$/)) {
      errors.firstname = 'should contain only alphabets';
      isValid = false;
    }
    if (!signData.lastname.match(/^[a-zA-Z]+$/)) {
      errors.lastname = 'should contain only alphabets';
      isValid = false;
    }
   
    if (!signData.email.toLowerCase().endsWith('@gmail.com')) {
      errors.email = 'Invalid email (must end with @gmail.com)';
      isValid = false;
    }

    if (!signData.password.match(/[A-Z]/)) {
      errors.password = 'Password should contain at least one uppercase letter';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/hotelmanage', signData);
        if (response.status === 201) {
          setSignData({
            firstname: '',
            lastname: '',
            email: '',
            password: ''
          });
          console.log('Signup successful!');
          
        } else {
          console.error('Signup failed:', response.statusText);
        }
        navigate('/')
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className='signup-body'>
    <div className='signup-container'>
      <form onSubmit={handleSubmit}>
        <h1 className='head'>Signup Form</h1>
        <div className="inputt">
          <label for="firstname" className="labe">Firstname:</label><br />
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={signData.firstname}
            onChange={handleChange}
            placeholder="Enter the mail"
          />
          {errors.firstname && <p className="error">{errors.firstname}</p>}
        </div>
        <div className="inputt">
          <label for="lastname" className="labe">Lastname:</label><br />
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={signData.lastname}
            onChange={handleChange}
            placeholder="Enter lname"
          />
          {errors.lastname && <p className="error">{errors.lastname}</p>}
        </div>
        <div className="inputt">
          <label for="email" className="labe">E-mail:</label><br />
          <input
            type="text"
            id="email"
            name="email"
            value={signData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="inputt">
          <label for="password" className="labe">Password:</label><br />
          <input
            type="password"
            id="password"
            name="password"
            value={signData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
       <button type="submit" className="Button">Sign up</button>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
