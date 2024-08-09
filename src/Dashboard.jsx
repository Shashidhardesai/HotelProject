import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import Navbar from './DashBoard/Navbar';
import Navbar1 from './DashBoard/Navbar1';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dashboard = () => {
  const [detail, setDetail] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const [dates, setDates] = useState(null);
  const [count, setCount] = useState('');
  const [ocount, setOcount] = useState('');
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const currentDate = new Date();

  const [events, setEvents] = useState([
    { id:"1", datee:"16/07/2024", time: "9:50am", hall: "Kings court hall", des: "WonderFest" },
    { id: "2",datee:"16/07/2024", time: "11:00am", hall: "court hall", des: "Innovation Ignited" },
    { id:"3",datee:"17/07/2024", time: "10:00am", hall: "Garden Center", des: "Fitness Frenzy" },
    { id: "4",datee:"17/07/2024", time: "4:00pm", hall: "Function hall", des: "Melody Mania " },
    { id: "5",datee:"18/07/2024", time: "10:00am", hall: "Kings court hall", des: "Garden Area" },
  ]);


  useEffect(() => {
    displayTable();
  }, []);

  useEffect(() => {
    dateCheckin();
    dateCheckout();
    calculateConfirmedCount();
  }, [detail]);

  useEffect(() => {
    handleDateChange(dates);
  }, [dates]);

  const displayTable = async () => {
    try {
      const res = await axios.get("http://localhost:5000/bookdetailss");
      setDetail(res.data);
    } catch (error) {
      console.log("error in finding bookdetails", error);
    }
  };

  const dateCheckin = () => {
    let countCheckin = 0;
    detail.forEach((dat) => {
      const checkinDate = new Date(dat.checkin);
      if (checkinDate.toDateString() === currentDate.toDateString()) {
        countCheckin += 1;
      }
    });
    setCount(countCheckin);
  };

  const dateCheckout = () => {
    let countCheckout = 0;
    detail.forEach((dat) => {
      const checkoutDate = new Date(dat.checkout);
      if (checkoutDate.toDateString() === currentDate.toDateString()) {
        countCheckout += 1;
      }
    });
    setOcount(countCheckout);
  };

  const calculateConfirmedCount = () => {
    let countConfirmed = 0;
    detail.forEach((dat) => {
      const checkoutDate = new Date(dat.checkout);
      if (checkoutDate.toDateString() !== currentDate.toDateString()) {
        countConfirmed += 1;
      }
    });
    setConfirmedCount(countConfirmed);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = detail.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(detail.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPageCount = Math.ceil(detail.length / rowsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPageCount; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(currentPage + 1, totalPageCount);

    const visiblePages = pageNumbers.slice(startPage - 1, endPage);

    return visiblePages.map(number => (
      <button
        key={number}
        onClick={() => handlePageChange(number)}
        className={number === currentPage ? 'active' : ''}
      >
        {number}
      </button>
    ));
  };

  const checkStatus = (checkoutDate) => {
    const checkout = new Date(checkoutDate);
    return checkout.toDateString() === currentDate.toDateString() ? 'completed' : 'confirmed';
  };

  const handleDateChange = (date) => {
    setDates(date);
    if(date){
    const selectedDateString = date ? date.toLocaleDateString("en-GB") : '';
    const filtered = events.filter(event => event.datee === selectedDateString);
    setFilteredEvents(filtered);
    }else{
      setFilteredEvents(events)
    }
  };
  
  return (
    <div className='dashboard-main-div'>
      <Navbar />
      <Navbar1 />
      <h2 className='dashhead'>Dashboard</h2>
      <div className='dashmain-div'>
        <div>
          <div className='first-div'>
            <h3>Reservation Summary</h3>
            <div className='resever-div'>
              <div className='rdiv'>
                Todays CheckIn &gt;<p>{count}</p>
              </div>
              <div className='rdiv'>
                Todays CheckOut &gt;<p>{ocount}</p>
              </div>
              <div className='rdiv'>
                Confirmed Reserved &gt;<p>{confirmedCount}</p>
              </div>
            </div>
          </div>

          <div className='table-container'>
            <table className='dtable'>
              <thead>
                <tr className='tablerow'>
                  <th>Customer Name</th>
                  <th>Mobile Number</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map(dat => (
                  <tr className='trow' key={dat._id}>
                    <td>{dat.firstname}</td>
                    <td>{dat.phone}</td>
                    <td>{formatDate(dat.checkin)}</td>
                    <td>{formatDate(dat.checkout)}</td>
                    <td style={{ color: checkStatus(dat.checkout) === 'completed' ? 'red' : 'green', fontWeight: 'bold' }}>
                      {checkStatus(dat.checkout)}
                    </td>
                    <td><Link to={`/BookedDetails/${dat._id}`}><button className='trowb'>&gt;</button></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={handlePreviousPage}>&lt;</button>
              {renderPageNumbers()}
              <button onClick={handleNextPage}>&gt;</button>
            </div>
          </div>
        </div>

        <div className='calender-container'>
          <div className='calender-div'>
            <DatePicker
              selected={dates}
              onChange={handleDateChange}
              inline
              calendarClassName="custom-calendar"
            />
          </div>
         
          <h4 style={{ textAlign: "center" }}>Upcoming Events</h4>
          <div className='events-container'>
            {filteredEvents.map((dat) => (
              <div className='events' key={dat.id}>
                <p className='p1'>{dat.datee}</p>
                <div className='eve'>
                  <div>
                    <p className='p2'>{dat.time}</p>
                  </div>
                  <hr style={{ border: "2px solid darkgrey" }} />
                  <div>
                    <p className='p3'>{dat.hall}</p>
                    <p className='p4'>{dat.des}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
