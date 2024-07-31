import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [details, setDetails] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!loginData.email.toLowerCase().endsWith('@gmail.com')) {
      errors.email = 'Invalid email id';
      isValid = false;
    }

    if (!loginData.password.match(/[A-Z]/)) {
      errors.password = 'Password should contain at least one uppercase letter';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  useEffect(() => {
    findAccount();
  }, []);

  const findAccount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/hotelmanage');
      setDetails(response.data);
    } catch (err) {
      console.error('Error fetching account details:', err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const account = details.find(
        (detail) => detail.email === loginData.email && detail.password === loginData.password
      );
      if (account) {
        setUserId(account._id);
        localStorage.setItem('userId', account._id);  
        console.log(`Logged in as user with ID: ${account._id}`);
        navigate('/Dashboard', { state: { userId: account._id } });
      } else {
        setErrors({ login: 'Invalid email or password' });
      }
      setLoginData({
        email: '',
        password: ''
      });
    }
  };

  return (
    <div className='login-body'>
      <div className='login-container'>
        <form onSubmit={handleLogin}>
          <h1 className='headd'>Login Form</h1>
          <div className="inputt">
            <label for="email" className="labe">Email:</label><br />
            <input
              type="text"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter the mail"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="inputt">
            <label for="password" className="labe">Password:</label><br />
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          {errors.login && <p className="error">{errors.login}</p>}
          <button type="submit" className="Button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
