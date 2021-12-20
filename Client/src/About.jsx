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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <Footer />
    </div>
  );
}
