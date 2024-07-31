import React, { useState } from 'react';
import './BookDetails.css'; 
import axios from 'axios';


const BookDetails = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    nationality: '',
    idtype: '',
    phone: '',
    dob: '',
    category: '',
    checkin:'',
    checkout:'',
    status:'',
    nights:'',
    extrabed:'',
    releaseddate:'',
    purpose:'',
    billto:'',
    paymenttype:"",
    paymentmethod:'',
    advance:'',
    pnote:''
  });

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData({
      ...formData,
      [name]:  value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData)
    try {
    const response = await axios.post('http://localhost:5000/bookdetailss',formData);
    console.log(response);
    setFormData({
        firstname: '',
    lastname: '',
    email: '',
    gender: '',
    nationality: '',
    idtype: '',
    phone: '',
    dob: '',
    category: '',
    checkin:'',
    checkout:'',
    status:'',
    nights:'',
    extrabed:'',
    releaseddate:'',
    purpose:'',
    billto:'',
    paymenttype:"",
    paymentmethod:'',
    advance:'',
    pnote:''
    })
    } catch (error) {
       console.log("error in sending data",error)
    }

   
  };

  return (
    <div>
    <div className='main-container'>
        <form onSubmit={handleSubmit}>

           <h1 className='book-head'>Booking Information</h1>

    <div className='bookdetails-container'>

    <div className="form-container">

      <div className="form-column">

        <div className="form-row">
          <label>First Name:</label>
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>Last Name:</label>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-row">
          <label>Nationality:</label>
          <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>ID Type:</label>
          <input type="text" name="idtype" value={formData.idtype} onChange={handleChange} required />
        </div>

      </div>

      <div className="form-column">

        <div className="form-row">
          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">--select--</option>
            <option value="general">General</option>
            <option value="vip">VIP</option>
          </select>
        </div>

      </div>

    </div>

    <div className='stay-container'>
        <div className='stay-col'>
          <div className="stay-row">
            <label>Check In:</label>
            <input type="date" name="checkin" 
            value={formData.checkin} onChange={handleChange}
            required />
           </div>
           <div className="stay-row">
            <label>Check Out:</label>
            <input type="date" name="checkout"
            value={formData.checkout} onChange={handleChange}
            required />
           </div>
           <div className="stay-row">
                <label>Status:</label>
                 <select name="status"  
                 value={formData.status} onChange={handleChange}
                 required>
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="couple">Couple</option>
                 </select>
           </div>
           <div className="stay-row">
                <label>Nights:</label>
                <input type="number" name="nights"
                value={formData.nights} onChange={handleChange}
                required />
           </div>
           <div className="stay-row">
                <label>Extra bed:</label>
                <input type="number" name="extrabed" 
                value={formData.extrabed} onChange={handleChange}
                required />
           </div>
           <div className="stay-row">
            <label>Released date:</label>
            <input type="date" name="releaseddate"
            value={formData.releaseddate} onChange={handleChange} required />
           </div>
        </div>
    </div>
    </div>

    <div className='paymain-container'>
       <div className='ppay'>
    <div className='pay-container'>
        <div className='pay-col'>
          <div className="pay-row">
            <label>Purpose:</label>
            <input type="text" name="purpose" 
            value={formData.purpose} onChange={handleChange}required />
           </div>
           <div className="pay-row">
                <label>Bill to:</label>
                  <select name="billto" 
                  value={formData.billto} onChange={handleChange} required>
                  <option value="">select</option>
                  <option value="single">Hotel</option>
                  <option value="couple">Guest</option>
                 </select>
           </div>
           <div className="pay-row">
                <label>Payment type:</label>
                  <select name="paymenttype" 
                  value={formData.paymenttype} onChange={handleChange} required>
                  <option value="">select</option>
                  <option value="single">Online</option>
                  <option value="couple">Cash</option>
                 </select>
           </div>
           <div className="pay-row">
                <label>Payment method:</label>
                  <select name="paymentmethod" 
                  value={formData.paymentmethod} onChange={handleChange} required>
                  <option value="">select</option>
                  <option value="single">Cash</option>
                  <option value="couple">Card</option>
                 </select>
           </div>
           <div className="pay-row">
                <label>Advance:</label>
                <input type="number" name="advance"
                value={formData.advance} onChange={handleChange} required />
           </div>
           <div className="pay-row">
                <label>Payment note:</label>
                <input type="text" name="pnote" 
                value={formData.pnote} onChange={handleChange}required />
           </div>
           </div>
        </div>
    </div>
    <div className='speInstruct'>
        <h2>Special Instruction</h2><hr/>
        <ul className='styled-list'>
         <li>Don’t steal the bathrobes, bed linen irons, etc. That’s called theft.</li>
         <li>Do take the toiletries and give them to a homeless shelter or someone who might need them.</li>
         <li>Don’t shove all the food from breakfast into your bag so you can save on paying for lunch.</li>
         <li>Do shop around when booking a hotel. Hotel prices will vary depending upon which internet browser you use,</li>
         <li>Don’t threaten hotels with a bad review on TripAdvisor just as you are registering.</li>
         </ul>
    </div>
    <div className='paySummary'>
        <h2>Payment Summary</h2><hr/>
        <table>
          <tbody>
            <tr>
                <td>Room charges</td>
                <td>{3500*formData.nights}</td>
            </tr>
            <tr>
               <td>Discount</td>
               <td>10%</td>
            </tr>
            <tr>
                <td>Tax</td>
                <td>12%</td>
            </tr>
            <tr>
               <td>Extra charges</td>
               <td>{1000*formData.extrabed}</td>
            </tr>
            <tr>
               <td>total Amount</td>
               <td className='total'>{3500*formData.nights+1000*formData.extrabed}</td>
            </tr>
            <tr>
               <td>Amount paid</td>
               <td style={{color:'green',fontWeight:'bold'}}>{formData.advance}</td>
            </tr>
            <tr>
               <td>Balance amount</td>
               <td style={{color:'red',fontWeight:'bold'}}>{(3500*formData.nights+1000*formData.extrabed)-formData.advance}</td>
            </tr>
            
            </tbody>
        </table>
   <button type='submit'>Book</button>
    </div>
    </div>
    </form>

    </div>
    
    </div>
  );
};

export default BookDetails;
