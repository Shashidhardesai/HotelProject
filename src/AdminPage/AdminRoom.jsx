import React, { useState } from 'react';
import "./AdminRoom.css";
import Adnav from './Adnav';
import axios from 'axios';

const AdminRoom = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        roomType: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/postrooms', formData);
            console.log('Room posted successfully:', response.data);
            setFormData({
              date:'',
              time:'',
              roomType:''
            })
        } catch (error) {
            console.error('Error posting room:', error);
        }
    };

    return (
        <div>
            <Adnav />
            <div className="booking-form">
                <h2>Available Room Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="date">Select Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="time">Select Time:</label>
                        <input
                            type="text"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="roomType">Room Type:</label>
                        <select
                            id="roomType"
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Room Type</option>
                            <option value="single room">Single Room</option>
                            <option value="double room">Double Room</option>
                            <option value="cabana room">Cabana Room</option>
                            <option value="quad room">Quad room</option>
                            <option value="poolview room">Pool view Room</option>
                            <option value="villa room">Villa Room</option>
                            <option value="quadruple room">Quadruple Room</option>
                        </select>
                    </div>

                    <button type="submit">Post Room</button>
                </form>
            </div>
        </div>
    );
};

export default AdminRoom;
