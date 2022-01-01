import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./css/Home.css";
export default function About() {
  return (
    <div className="About-page">
  <div className="Home">
    <Navbar />
    <div
      className="About"
      style={{
        backggroundImage: "none",
        paddingLeft: "1em",
        paddingRight: "1em",
      }}
    >
      <h1 className="about-heading">About Us</h1>
      <p id="set-footer-in-about" className="about-para">
        Developed by Pradeep and Amit, students of Delhi Technological
        University, Study Rooms aims at bringing various people of similar
        interests together to form a global community.
      </p>
      <div id="about-footer">
      <Footer />
      </div>
    </div>
  </div>
    </div>
  );
}
