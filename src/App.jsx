
// ComingSoon.jsx
import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import logo from "./assets/logo-klickshare.png";
import emailjs from "@emailjs/browser";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

// Config 
const SERVICE_ID = "service_sf0qado";
const TEMPLATE_ID = "template_tpi9wf7";
const PUBLIC_KEY = "XcwLXx37Y_7W4Vf94";

const RECAPTCHA_SITE_KEY = "6LfbVcArAAAAAK9xxSZGbCqTG22bhZfUUz4RbCrr";


const ComingSoonForm = () => {
  const formRef = useRef();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  // Mark reCAPTCHA ready
  useEffect(() => {
    if (executeRecaptcha) setRecaptchaReady(true);
  }, [executeRecaptcha]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      setPopupMessage("⚠️ reCAPTCHA is still loading. Try again in a moment.");
      setShowPopup(true);
      return;
    }

    try {
      setLoading(true);

      // Run reCAPTCHA v3
      const token = await executeRecaptcha("formSubmit");
      if (!token) {
        setPopupMessage("⚠️ Please complete reCAPTCHA verification.");
        setShowPopup(true);
        setLoading(false);
        return;
      }

      // Debug log to check form values
      console.log("Form data:", {
        name: formRef.current.user_name.value,
        number: formRef.current.user_number.value,
        email: formRef.current.user_email.value,
      });

      // Send via EmailJS
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      console.log("EmailJS result:", result);
      setPopupMessage("Email sent successfully!");
      setShowPopup(true);
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      const errorMsg = error?.text || error?.message || "Unknown error occurred";
      setPopupMessage(`Failed to send email: ${errorMsg}`);
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="coming-soon">
      {/* Logo */}
      <img src={logo} alt="Company Logo" className="logo" />

      <p className="subtitle">AI photo sharing for photographers</p>

      <h1 className="company-name">
        <span style={{ color: "#1468e6ff" }}>KLICK</span>SHARE
      </h1>

      <p className="description">
        AI-powered photo sharing platform for photographers — fast uploads,
        private galleries and smart delivery.
        <br />
        <br />
        Stay tuned for something amazing!
      </p>

      {/* Registration Form */}
      <div className="notify">
        <p className="description">Register to get early access</p>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            name="user_name"
            placeholder="Enter your Name"
            required
          />
          <input
            type="text"
            name="user_number"
            placeholder="Enter your Number"
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Enter your Email"
            required
          />
          <button type="submit" disabled={loading || !recaptchaReady}>
            {loading ? "Sending..." : "Register"}
          </button>
        </form>
      </div>

      <div>
        <p style={{ color: "#777", fontSize: "14px" }}>
          We respect your privacy — unsubscribe anytime.
        </p>
      </div>

      {/* Platform Features */}
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

      {/* All Features */}
      <div className="all-features">
        <h2>All Features</h2>
        <ul className="features-list">
          <li>
            <strong>AI face recognition</strong> — automatic grouping and tagging.
          </li>
          <li>
            <strong>Private & group galleries</strong> — share via QR or secure
            links; set expiration.
          </li>
          <li>
            <strong>Desktop uploader</strong> — bulk imports from folders and
            camera cards.
          </li>
          <li>
            <strong>Mobile apps</strong> — instant uploads, offline access and
            per-person galleries.
          </li>
          <li>
            <strong>Client favorites</strong> — clients can pick favorites and
            order prints/downloads.
          </li>
          <li>
            <strong>Watermarks & branding</strong> — protect and white-label
            galleries for clients.
          </li>
          <li>
            <strong>Analytics & reports</strong> — views, downloads, and
            engagement per gallery.
          </li>
          <li>
            <strong>Multiple logins & team access</strong> — photographers can
            share admin access.
          </li>
          <li>
            <strong>High-speed delivery</strong> — CDN-backed galleries for fast
            global access.
          </li>
          <li>
            <strong>Integrations</strong> — export to cloud storage (S3),
            invoicing, and more.
          </li>
        </ul>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

//Wrap in ReCaptcha Provider
const ComingSoon = () => (
  <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
    <ComingSoonForm />
  </GoogleReCaptchaProvider>
);

export default ComingSoon;