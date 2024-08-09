import React from "react";
import HomePage from "./HomePage";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Navbar from "./DashBoard/Navbar";
import Navbar1 from "./DashBoard/Navbar1";
import FrontPage from "./DashBoard/FrontPage";
import BookDetails from "./DashBoard/BookDetails";
import FireEmer from "./DashBoard/FireEmer";
import Dashboard from "./Dashboard";
import BookedDetails from "./DashBoard/BookedDetails";
import Calendar from "./DashBoard/Calender";
import Setting from "./DashBoard/Setting";
import Forgot from "./DashBoard/Forgot";
import MiddlePage from "./MiddlePage";
import AdminDash from "./AdminPage/AdminDash";
import AdminRoom from "./AdminPage/AdminRoom";
import Arooms from "./AdminPage/Arooms";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/middlepage" element={<MiddlePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/frontpage" element={<FrontPage/>}/>
        <Route path="/navbar" element={<Navbar/>}/>
        <Route path="/navbar1" element={<Navbar1/>}/>
        <Route path="/bookdetails" element={<BookDetails/>}/>
        <Route path="/fireemer" element={<FireEmer/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/Bookeddetails/:id" element={<BookedDetails/>}/>
        <Route path="/calender" element={<Calendar/>}/>
        <Route path="/setting" element={<Setting/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/admindash" element={<AdminDash/>}/>
        <Route path="/adminroom" element={<AdminRoom/>}/>
        <Route path="/arooms" element={<Arooms/>}/>
      </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
