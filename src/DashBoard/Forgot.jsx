import React, { useState } from 'react';
import axios from 'axios';
import "./Forgot.css";
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/send-email', { email });
      alert(response.data.message || 'Email sent successfully!');
    } catch (error) {
      alert('Error sending email.');
      console.error('Error sending email:', error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      alert(response.data.message || 'OTP verified successfully!');
      setOtpVerified(true);
    } catch (error) {
      alert('Error verifying OTP.');
      console.error('Error verifying OTP:', error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/reset-password', { email, newPassword });
      alert(response.data.message || 'Password reset successfully!');
      if (response.data.message.includes("successfully!")) {
        nav("/Login");
        setEmail('');
        setConfirmPassword('');
        setNewPassword("");
        setOtp("");
      }
    } catch (error) {
      alert('Error resetting password.');
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className='login-body'>
      <div className='login-containers'>
        <form onSubmit={handleEmailSubmit}>
          <h1 className='headd'>Forget Password</h1>
          <div className="inputt">
            <label htmlFor="email" className="labe">Email:</label><br />
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="Button">Send OTP</button>
        </form>
        <form onSubmit={handleOtpSubmit}>
          <div className="inputt">
            <label htmlFor="otp" className="labe">OTP:</label><br />
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
              required
            />
          </div>
          <button type="submit" className="Button">Verify OTP</button>
        </form>
        {otpVerified && (
          <form onSubmit={handlePasswordSubmit}>
            <div className="inputt">
              <label htmlFor="newPassword" className="labe">New Password:</label><br />
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <label htmlFor="confirmPassword" className="labe">Confirm New Password:</label><br />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>
            {message && <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>}
            <button type="submit" className="Button">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Forgot;
