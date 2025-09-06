import React, { useState, useRef } from "react";
import "./App.css";
import logo from "./assets/logo-klickshare.png";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';


// Keys for emailjs and recaptcha
const SERVICE_ID = 'service_rpni9ku';
const TEMPLATE_ID = 'template_ujfz0um';
const PUBLIC_KEY = 'A03upzttruBB5ZOtF';

const RECAPTCHA_SITE_KEY = '6LfbVcArAAAAAK9xxSZGbCqTG22bhZfUUz4RbCrr';


const ComingSoon = () => {

  // -----------------emailjs and recaptcha start------------
  const formRef = useRef();
  const [captchaToken, setCaptchaToken] = useState(null);


  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        (result) => {
          console.log(result.text);
          alert('Email sent successfully!');
          formRef.current.reset();
          setCaptchaToken(null); // Reset captcha token
        },
        (error) => {
          console.log(error.text);
          alert('Failed to send email.');
        }
      );
  };

  // -----------------emailjs and recaptcha end------------



  return (
    <div className="coming-soon">
      <img src={logo} alt="Company Logo" className="logo" />

      <p className="subtitle">AI photo sharing for photographers</p>

      <h1 className="company-name"> <span style={{ color: "#1468e6ff" }}>KLICK</span>SHARE</h1>

      <p className="description">AI-powered photo sharing platform for photographers — fast uploads, private galleries and smart delivery. <br /><br /> Stay tuned for something amazing!</p>


      {/* code without recaptha */}
      {/* <div className="notify">
        <p className="description">Register to get early access</p>
        <input type="text" placeholder="Enter your Name" />
        <input type="text" placeholder="Enter your Number" />
        <input type="email" placeholder="Enter your email " />
        <button>Register</button>
      </div> */}


      <div className="notify">
        <p className="description">Register to get early access</p>

        <form ref={formRef} onSubmit={handleSubmit}>
          <input type="text" name="user_name" placeholder="Enter your Name" />
          <input type="text" name="user_number" placeholder="Enter your Number" />
          <input type="email" name="user_email" placeholder="Enter your email " />

          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
          />

          <button type="submit">Register</button>
        </form>

      </div>


      <div>
        <p style={{ color: "#777", fontSize: "14px" }}>We respect your privacy — unsubscribe anytime.</p>
      </div>

      <div className="platform-features">
        <h2>Platform Features</h2>
        <div className="card-grid">
          <div className="card">
            <h3>AI Recognition</h3>
            <p>Automatic face detection & smart sorting for event photos</p>
          </div>
          <div className="card">
            <h3>Secure Sharing</h3>
            <p>Private group galleries, QR & link access control</p>
          </div>
          <div className="card">
            <h3>Cross-Platform</h3>
            <p>Web, iOS, Android and Desktop apps</p>
          </div>
          <div className="card">
            <h3>Watermark & Branding</h3>
            <p>Add logos, protect downloads, custom branding</p>
          </div>
          <div className="card">
            <h3>Analytics</h3>
            <p>Engagement, views and download tracking per gallery</p>
          </div>
          <div className="card">
            <h3>Client Favorites</h3>
            <p>Clients can mark favorites — deliver them quickly</p>
          </div>
        </div>
      </div>


      <div className="all-features">
        <h2>All Features</h2>
        <ul className="features-list">
          <li><strong>AI face recognition</strong> — automatic grouping and tagging (fast & accurate).</li>
          <li><strong>Private & group galleries</strong> — share via QR or secure links; set expiration.</li>
          <li><strong>Desktop uploader</strong> — bulk imports from folders and camera cards.</li>
          <li><strong>Mobile apps</strong> — instant uploads, offline access and per-person galleries.</li>
          <li><strong>Client favorites</strong> — clients can pick favorites and order prints/downloads.</li>
          <li><strong>Watermarks & branding</strong> — protect and white-label galleries for clients.</li>
          <li><strong>Analytics & reports</strong> — views, downloads, and engagement per gallery.</li>
          <li><strong>Multiple logins & team access</strong> — photographers can share admin access.</li>
          <li><strong>High-speed delivery</strong> — CDN-backed galleries for fast global access.</li>
          <li><strong>Integrations</strong> — export to cloud storage (S3), invoicing, and more.</li>
        </ul>
      </div>


    </div>
  );
};

export default ComingSoon;
