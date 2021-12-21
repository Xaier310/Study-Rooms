import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="r1">
        <div className="links">
          <h1> Important Links</h1>
          <ul>
            <li>wgnkegnwlkg</li>
            <li>wgnkegnwlkg</li>
            <li>wgnkegnwlkg</li>
            <li>wgnkegnwlkg</li>
          </ul>
        </div>
        <div id="contact-us-form" className="contactus-footer">
          <h1>Contact US</h1>

          <h3>Have any queries feel free to reach out</h3>
          <form className="signup">
            <br />

            <input
              name="Name"
              type="text"
              placeholder="Name*"
              class="username"
              id="input"
            />
            <textarea id="input" type="text" placeholder="Message" />

            <button class="btn">Send Message</button>
          </form>
        </div>
      </div>
      <div className="r2">
        <div>
          <p>Copyright @2021</p>
        </div>
      </div>
    </div>
  );
}
