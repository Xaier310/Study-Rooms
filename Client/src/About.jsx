import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./css/Home.css";
export default function About() {
  return (
    <div
      className="Home"
      style={{
        backggroundImage: "none",
        paddingLeft: "0.5em",
        paddingRight: "0.5em",
        margin: "0.5em",
      }}
    >
      <Navbar />
      <h1 className="about-heading">About Us</h1>
      <p className="about-para">
        Developed by Pradeep and Amit, students of Delhi Technological
        University, Study Rooms aims at bringing various people of similar
        interests together to form a global community.
      </p>
      <Footer />
    </div>
  );
}
