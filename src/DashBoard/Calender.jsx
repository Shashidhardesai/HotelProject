import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "./Calender.css";
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Navbar1 from './Navbar1';
import axios from 'axios';

const Calender = () => {
  const [dates, setDates] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [events, setEvents] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    axios.get('http://localhost:5000/postrooms')
      .then(response => {
        setEvents(response.data);
        setFilteredEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
      });
  }, []);

  // Handle date change
  const handleDateChange = (date) => {
    setDates(date);
    if (date) {
      const selectedDateString = date.toLocaleDateString("en-GB");
      const filtered = events.filter(event => {
        const eventDate = new Date(event.date).toLocaleDateString("en-GB");
        return eventDate === selectedDateString;
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  return (
    <div className='main-cal-div'>
      <Navbar />
      <Navbar1 />
      <h1 className='hr2'>Hotel Available Rooms</h1>
      <div className='calender-divv'>
        <DatePicker
          selected={dates}
          onChange={handleDateChange}
          inline
          calendarClassName="custom-calendars"
          isClearable
        />
      </div>
      <div className='events-containers'>
        {filteredEvents.map((data, index) => (
          <div className='eventss' key={index}>
            <p className='p1s'>{new Date(data.date).toLocaleDateString("en-GB")}</p>
            <div className='eves'>
              <div>
                <p className='p2s'>{data.time}</p>
              </div>
              <hr style={{ border: "2px solid darkgrey" }} />
              <div>
                <p className='p3s'>Room Type</p>
                <p className='p4s'>{data.roomType}</p>
              </div>
            </div>
            <Link to="/BookDetails"><button className='ebtn'>Book</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calender;
