"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserSignup() {
  const router = useRouter();

  const [step, setStep] = useState(1); // 1: phone, 2: otp, 3: details
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Simulate OTP sending
  const sendOtp = async () => {
    setLoading(true);
    setError("");
    
    // Validate phone number
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate dummy OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setSentOtp(generatedOtp);
      setOtpSent(true);
      setStep(2);
      setSuccess(`OTP sent to +91 ${mobileNumber}`);
      
      // Start resend timer
      setResendTimer(30);
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = () => {
    setError("");
    if (otp === sentOtp || otp === "123456") { // Allow demo OTP
      setSuccess("OTP verified successfully!");
      setStep(3);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), mobileNumber, otp: sentOtp }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard/user");
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        .signup-container {
          min-height: 100vh;
          background-color: #f7f7f7;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        .background-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .pattern-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, #d5e6ee, #1f6563);
          opacity: 0.1;
        }

        .circle-1 {
          width: 250px;
          height: 250px;
          top: -125px;
          right: -125px;
        }

        .circle-2 {
          width: 180px;
          height: 180px;
          bottom: -90px;
          left: -90px;
        }

        .signup-content {
          max-width: 500px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .signup-card {
          background: white;
          border: 2px solid #d5e6ee;
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 8px 32px rgba(31, 101, 99, 0.1);
          position: relative;
          overflow: hidden;
        }

        .signup-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1f6563, #d5e6ee);
        }

        .back-button {
          background: none;
          border: none;
          color: #1f6563;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .back-button:hover {
          color: #0f4f4c;
        }

        .step-indicator {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          gap: 1rem;
        }

        .step-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e0e0e0;
          transition: all 0.3s ease;
        }

        .step-dot.active {
          background: #1f6563;
          transform: scale(1.2);
        }

        .step-dot.completed {
          background: #1f6563;
        }

        .signup-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .signup-icon {
          width: 60px;
          height: 60px;
          background: #d5e6ee;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 1.5rem;
        }

        .signup-title {
          font-size: 1.75rem;
          font-weight: bold;
          color: #1f6563;
          margin-bottom: 0.5rem;
        }

        .signup-subtitle {
          color: #666;
          font-size: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          color: #333;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: #1f6563;
          box-shadow: 0 0 0 3px rgba(31, 101, 99, 0.1);
        }

        .form-input:disabled {
          background: #f5f5f5;
          color: #666;
        }

        .otp-container {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .otp-input {
          width: 50px;
          height: 50px;
          text-align: center;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1.25rem;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .otp-input:focus {
          outline: none;
          border-color: #1f6563;
          box-shadow: 0 0 0 3px rgba(31, 101, 99, 0.1);
        }

        .submit-button {
          width: 100%;
          padding: 0.875rem 1.5rem;
          border: 2px solid #1f6563;
          border-radius: 9999px;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          text-decoration: none;
          background: #1f6563;
          color: white;
          box-shadow: 6px 6px 0px rgba(31, 101, 99, 0.3);
        }

        .submit-button:hover:not(:disabled) {
          background: #0f4f4c;
          box-shadow: none;
          transform: translate(3px, 3px);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: 6px 6px 0px rgba(31, 101, 99, 0.3);
        }

        .secondary-button {
          background: #f7f7f7;
          color: #1f6563;
          box-shadow: 6px 6px 0px rgba(31, 101, 99, 1);
        }

        .secondary-button:hover:not(:disabled) {
          background: #1f6563;
          color: #f7f7f7;
          box-shadow: none;
        }

        .resend-button {
          background: none;
          border: none;
          color: #1f6563;
          cursor: pointer;
          font-weight: 500;
          text-decoration: underline;
          margin-top: 1rem;
        }

        .resend-button:disabled {
          color: #999;
          cursor: not-allowed;
          text-decoration: none;
        }

        .error-message {
          background: #fee;
          border: 1px solid #fcc;
          color: #c33;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .success-message {
          background: #efe;
          border: 1px solid #cfc;
          color: #363;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .helper-text {
          font-size: 0.875rem;
          color: #666;
          text-align: center;
          margin-top: 1rem;
        }

        .demo-note {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          color: #856404;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          text-align: center;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .signup-container {
            padding: 1rem 0.5rem;
          }

          .signup-card {
            padding: 2rem 1.5rem;
          }

          .signup-title {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .signup-card {
            padding: 1.5rem 1rem;
          }

          .otp-input {
            width: 45px;
            height: 45px;
            font-size: 1.1rem;
          }
        }
      `}</style>

      <div className="signup-container">
        {/* Background Pattern */}
        <div className="background-pattern">
          <div className="pattern-circle circle-1"></div>
          <div className="pattern-circle circle-2"></div>
        </div>

        {/* Main Content */}
        <div className="signup-content">
          <div className="signup-card">
            {/* Back Button */}
            <button 
              onClick={() => router.push("/signup")}
              className="back-button"
            >
              <span>←</span> Back to options
            </button>

            {/* Step Indicator */}
            <div className="step-indicator">
              <div className={`step-dot ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}></div>
              <div className={`step-dot ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}></div>
              <div className={`step-dot ${step >= 3 ? 'active' : ''}`}></div>
            </div>

            {/* Header */}
            <div className="signup-header">
              <div className="signup-icon">
                <span>📱</span>
              </div>
              <h1 className="signup-title">
                {step === 1 && "Enter Your Phone"}
                {step === 2 && "Verify OTP"}
                {step === 3 && "Complete Profile"}
              </h1>
              <p className="signup-subtitle">
                {step === 1 && "We'll send you a verification code"}
                {step === 2 && "Enter the 6-digit code we sent"}
                {step === 3 && "Just a few more details to get started"}
              </p>
            </div>

            {/* Demo Note */}
            <div className="demo-note">
              <strong>Demo Mode:</strong> Use OTP "123456" or the generated OTP will be displayed
            </div>

            {/* Error/Success Messages */}
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            {/* Step 1: Phone Number */}
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); sendOtp(); }}>
                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                    className="form-input"
                    maxLength={10}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || mobileNumber.length !== 10}
                  className="submit-button secondary-button"
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <div>
                <div className="form-group">
                  <label className="form-label">Enter OTP</label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="form-input"
                    maxLength={6}
                    style={{ textAlign: 'center', fontSize: '1.25rem', letterSpacing: '0.5rem' }}
                  />
                </div>
                
                {sentOtp && (
                  <div className="success-message">
                    <strong>Generated OTP:</strong> {sentOtp}
                  </div>
                )}

                <button
                  onClick={verifyOtp}
                  disabled={otp.length !== 6}
                  className="submit-button"
                >
                  Verify OTP
                </button>

                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={sendOtp}
                    disabled={resendTimer > 0 || loading}
                    className="resend-button"
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>

                <p className="helper-text">
                  Didn't receive the code? Check your messages or try resending.
                </p>
              </div>
            )}

            {/* Step 3: Complete Profile */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    value={`+91 ${mobileNumber}`}
                    disabled
                    className="form-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="submit-button"
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <p className="helper-text">
                  By creating an account, you agree to our Terms & Conditions and Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}