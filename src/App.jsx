import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/logo-klickshare.png";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 20);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="coming-soon">
      <img src={logo} alt="Company Logo" className="logo" />

      <p className="subtitle">AI photo sharing for photographers</p>

      <h1 className="company-name"><span style={{ color: "#1468e6ff" }}>KLICK</span>SHARE</h1>

      <p className="description">AI-powered photo sharing platform for photographers — fast uploads, private galleries and smart delivery. <br /><br /> Stay tuned for something amazing!</p>



      {/* <div className="countdown">
        <div>
          <span>{timeLeft.days || 0}</span>
          <p>Days</p>
        </div>
        <div>
          <span>{timeLeft.hours || 0}</span>
          <p>Hours</p>
        </div>
        <div>
          <span>{timeLeft.minutes || 0}</span>
          <p>Minutes</p>
        </div>
        <div>
          <span>{timeLeft.seconds || 0}</span>
          <p>Seconds</p>
        </div>
      </div> */}



      <div className="notify">
        <input type="email" placeholder="Enter your email for early access" />
        <button>Notify Me</button>
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
