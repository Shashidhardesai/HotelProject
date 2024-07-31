import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "./Calender.css";
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Navbar1 from './Navbar1';

const Calender = () => {
  const [dates, setDates] = useState(null); 
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [events, setEvents] = useState([
    { id: "16/07/2024", time: "9:50am", hall: "Room Type", des: "Delux Room" },
    { id: "16/07/2024", time: "11:00am", hall: "Room Type", des: "Suite Room" },
    { id: "17/07/2024", time: "10:00am", hall: "Room Type", des: "Single Room" },
    { id: "17/07/2024", time: "4:00pm", hall: "Room Type", des: "Cabana Room" },
    { id: "18/07/2024", time: "10:00am", hall: "Room Type", des: "Double room" },
    { id: "18/07/2024", time: "10:00am", hall: "Room Type", des: "Quad room" },
    { id: "18/07/2024", time: "10:00am", hall: "Room Type", des: "Pool view Room" },
    { id: "16/07/2024", time: "10:00am", hall: "Room Type", des: "Villa Room" },
    { id: "17/07/2024", time: "10:00am", hall: "Room Type", des: "Quadruple Room" },
  ]);

  const handleDateChange = (date) => {
    setDates(date);
    if (date) {
      const selectedDateString = date.toLocaleDateString("en-GB");
      const filtered = events.filter(event => {
        const eventDate = new Date(event.id.split('/').reverse().join('-'));
        return eventDate.toLocaleDateString("en-GB") === selectedDateString;
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  return (
    <div className='main-cal-div'>
        <Navbar/>
        <Navbar1/>
      <h1>Hotel Available Rooms</h1>
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
        {(dates ? filteredEvents : events).map((dat, index) => (
          <div className='eventss' key={index}>
            <p className='p1s'>{dat.id}</p>
            <div className='eves'>
              <div>
                <p className='p2s'>{dat.time}</p>
              </div>
              <hr style={{ border: "2px solid darkgrey" }} />
              <div>
                <p className='p3s'>{dat.hall}</p>
                <p className='p4s'>{dat.des}</p>
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
