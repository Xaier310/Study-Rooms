import React, { Component, useContext, useEffect, useState } from 'react';
import "./css/Home.css";
import AOS from "aos";


function Navbar(){
    useEffect(() => {
        AOS.init({duration : 1300});
        AOS.refresh();
        }, []);
        {/* <header className="header"> */}
return(
<div className="navbar">
    <div className="navbar-child-1">
        <div className="navbar-logo">
        <span className="navbar-logo-dot"></span>
        <h4 className="navbar-logo-text" data-aos="fade-zoom-in">StudyRooms</h4>
        </div>
        <ul className="navbar-items">
           <li className="navbar-item-1 navbar-item-cc"><a href="#">Home</a></li> 
           <li className="navbar-item-2 navbar-item-cc"><a href="#">Rooms</a></li> 
           <li className="navbar-item-3 navbar-item-cc"><a href="#">About Us</a></li>    
           <li className="navbar-item-4 navbar-item-cc"><a href="#">Contact us</a></li> 
        </ul>   
    </div>
    <div className="navbar-child-2">
    <button className="navbar-button">Create Account</button>
    </div>
</div>
    );
    // </header>


}

export default Navbar;