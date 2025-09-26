"use client";

import { useState, useEffect } from "react";

interface LoginProps {}

export default function LoginPage({}: LoginProps) {
  const [currentAuthMethod, setCurrentAuthMethod] = useState<'password' | 'otp'>('otp');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [showOTPVerify, setShowOTPVerify] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Demo credentials
      if ((username === 'demo@klickshare.com' || username === '9876543210') && password === 'demo123') {
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      showMessage('Invalid email/phone or password. Try demo@klickshare.com / demo123', 'error');
    } finally {
      setLoading(false);
    }
  };

  const requestOTP = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!/^[6-9]\d{9}$/.test(phone)) {
    showMessage('Please enter a valid 10-digit phone number', 'error');
    return;
  }

  setLoading(true);

  try {
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber: phone }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to send OTP');
    }

    // Assuming API sends back OTP for demo purposes
    setGeneratedOTP(data.otp || '');
    showMessage(`OTP sent to +91 ${phone}. Demo OTP: ${data.otp || '******'}`, 'success');
    setShowOTPVerify(true);
    setOtpTimer(30);
  } catch (error: any) {
    showMessage(error.message || 'Failed to send OTP. Please try again.', 'error');
  } finally {
    setLoading(false);
  }
};

  const verifyOTP = async (e: React.FormEvent) => {
  e.preventDefault();

  const enteredOTP = otpValues.join('');

  if (enteredOTP.length !== 6) {
    showMessage('Please enter complete 6-digit OTP', 'error');
    return;
  }

  setLoading(true);

  try {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber: phone, otp: enteredOTP }),
    });

    const data = await res.json();
    const userType = data.user?.userType;
 if (!userType) {
      throw new Error('User type information is missing');
    }
    if (!res.ok) {
      throw new Error(data.error || 'Invalid OTP');
    }

    showMessage('OTP verified successfully! Redirecting...', 'success');
   setTimeout(() => {
      // Redirect dynamically based on userType
      window.location.href = `/dashboard/${userType}`;
    }, 1500);
  } catch (error: any) {
    showMessage(error.message || 'Invalid OTP. Please try again.', 'error');
    setOtpValues(['', '', '', '', '', '']);
  } finally {
    setLoading(false);
  }
};

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const resendOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    showMessage(`New OTP sent to +91 ${phone}. Demo OTP: ${otp}`, 'success');
    setOtpTimer(30);
  };

  const socialLogin = (provider: string) => {
    showMessage(`${provider} login will be implemented soon!`, 'success');
  };

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f7f7f7;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
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
          animation: float 6s ease-in-out infinite;
        }

        .circle-1 {
          width: 400px;
          height: 400px;
          top: -200px;
          right: -200px;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 300px;
          height: 300px;
          bottom: -150px;
          left: -150px;
          animation-delay: 2s;
        }

        .circle-3 {
          width: 200px;
          height: 200px;
          top: 40%;
          left: -100px;
          animation-delay: 4s;
        }

        .circle-4 {
          width: 150px;
          height: 150px;
          top: 20%;
          right: 10%;
          animation-delay: 1s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .branding-section {
          flex: 1;
          background: linear-gradient(135deg, #1f6563 0%, #d5e6ee 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 3rem;
          position: relative;
          z-index: 2;
          color: white;
          text-align: center;
        }

        .brand-logo {
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .brand-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .brand-subtitle {
          font-size: 1.25rem;
          opacity: 0.9;
          margin-bottom: 2rem;
          max-width: 400px;
          line-height: 1.6;
        }

        .feature-list {
          list-style: none;
          text-align: left;
          max-width: 300px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .login-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          z-index: 2;
        }

        .login-card {
          background: white;
          border: 2px solid #d5e6ee;
          border-radius: 24px;
          padding: 3rem;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 20px 60px rgba(31, 101, 99, 0.1);
          position: relative;
          overflow: hidden;
          animation: slideInRight 0.8s ease;
        }

        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1f6563, #d5e6ee);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .login-icon {
          width: 80px;
          height: 80px;
          background: #d5e6ee;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2rem;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .login-title {
          font-size: 2rem;
          font-weight: bold;
          color: #1f6563;
          margin-bottom: 0.5rem;
        }

        .login-subtitle {
          color: #666;
          font-size: 1rem;
        }

        .auth-tabs {
          display: flex;
          background: #f5f5f5;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 2rem;
        }

        .auth-tab {
          flex: 1;
          padding: 0.75rem;
          text-align: center;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          color: #666;
        }

        .auth-tab.active {
          background: #1f6563;
          color: white;
          box-shadow: 0 2px 8px rgba(31, 101, 99, 0.3);
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
          padding: 1rem 1.25rem;
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
          transform: translateY(-2px);
        }

        .password-container {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          font-size: 1.25rem;
        }

        .forgot-password {
          text-align: right;
          margin-bottom: 2rem;
        }

        .forgot-link {
          color: #1f6563;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .login-button {
          width: 100%;
          padding: 1rem 1.5rem;
          border: 2px solid #1f6563;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 1.1rem;
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
          margin-bottom: 2rem;
        }

        .login-button:hover:not(:disabled) {
          background: #0f4f4c;
          box-shadow: none;
          transform: translate(3px, 3px);
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: 6px 6px 0px rgba(31, 101, 99, 0.3);
        }

        .divider {
          text-align: center;
          margin: 2rem 0;
          position: relative;
          color: #666;
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e0e0e0;
        }

        .divider span {
          background: white;
          padding: 0 1rem;
        }

        .social-login {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .social-button {
          flex: 1;
          padding: 0.875rem;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 500;
        }

        .social-button:hover {
          border-color: #1f6563;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .google-btn {
          color: #db4437;
        }

        .facebook-btn {
          color: #4267B2;
        }

        .signup-link {
          text-align: center;
          color: #666;
        }

        .signup-link a {
          color: #1f6563;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }

        .error-message {
          background: #fee;
          border: 1px solid #fcc;
          color: #c33;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          text-align: center;
        }

        .success-message {
          background: #efe;
          border: 1px solid #cfc;
          color: #363;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          text-align: center;
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

        .otp-inputs {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .otp-input {
          width: 50px;
          height: 50px;
          text-align: center;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1.25rem;
          font-weight: bold;
        }

        .otp-input:focus {
          border-color: #1f6563;
          outline: none;
        }

        .resend-timer {
          text-align: center;
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .resend-button {
          background: #f7f7f7;
          color: #1f6563;
          box-shadow: 6px 6px 0px rgba(31, 101, 99, 1);
        }

        .resend-button:hover {
          background: #e0e0e0;
        }

        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }

          .branding-section {
            padding: 2rem 1rem;
            min-height: 40vh;
          }

          .brand-title {
            font-size: 2rem;
          }

          .brand-subtitle {
            font-size: 1rem;
          }

          .feature-list {
            display: none;
          }

          .login-section {
            padding: 1rem;
          }

          .login-card {
            padding: 2rem 1.5rem;
          }

          .social-login {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 1.5rem 1rem;
          }

          .login-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="login-container">
        {/* Background Pattern */}
        <div className="background-pattern">
          <div className="pattern-circle circle-1"></div>
          <div className="pattern-circle circle-2"></div>
          <div className="pattern-circle circle-3"></div>
          <div className="pattern-circle circle-4"></div>
        </div>

        {/* Left Side - Branding */}
        <div className="branding-section">
          <div className="brand-logo">📸</div>
          <h1 className="brand-title">KlickShare</h1>
          <p className="brand-subtitle">
            Your memories, beautifully organized and intelligently shared with AI-powered photo management.
          </p>
          <ul className="feature-list">
            <li className="feature-item">
              <div className="feature-icon">🤖</div>
              <span>AI-Powered Organization</span>
            </li>
            <li className="feature-item">
              <div className="feature-icon">👥</div>
              <span>Smart Face Recognition</span>
            </li>
            <li className="feature-item">
              <div className="feature-icon">🔗</div>
              <span>Easy Sharing & Collaboration</span>
            </li>
            <li className="feature-item">
              <div className="feature-icon">☁️</div>
              <span>Secure Cloud Storage</span>
            </li>
          </ul>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-section">
          <div className="login-card">
            {/* Header */}
            <div className="login-header">
              <div className="login-icon">🔐</div>
              <h2 className="login-title">Welcome Back</h2>
              <p className="login-subtitle">Sign in to access your photo collection</p>
            </div>

            {/* Auth Method Tabs */}
            <div className="auth-tabs">
              {/* <div 
                className={`auth-tab ${currentAuthMethod === 'password' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentAuthMethod('password');
                  setMessage(null);
                  setShowOTPVerify(false);
                }}
              >
                Password
              </div> */}
              {/* <div 
                className={`auth-tab ${currentAuthMethod === 'otp' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentAuthMethod('otp');
                  setMessage(null);
                  setShowOTPVerify(false);
                }}
              >
                OTP
              </div> */}
            </div>

            {/* Error/Success Messages */}
            {message && (
              <div className={`${message.type}-message`}>
                {message.text}
              </div>
            )}

            {/* Password Login Form */}
            {/* {currentAuthMethod === 'password' && (
              <form onSubmit={handlePasswordLogin}>
                <div className="form-group">
                  <label className="form-label">Email or Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="Enter your email or phone number"
                    className="form-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="password-container">
                    <input 
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="form-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="forgot-password">
                  <span 
                    className="forgot-link"
                    onClick={() => showMessage('Password reset link will be sent to your email/phone', 'success')}
                  >
                    Forgot Password?
                  </span>
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
            )} */}

            {/* OTP Login Form */}
            {currentAuthMethod === 'otp' && (
              <>
                {!showOTPVerify ? (
                  <form onSubmit={requestOTP}>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="Enter your 10-digit phone number"
                        className="form-input"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                      {loading ? (
                        <>
                          <div className="loading-spinner"></div>
                          Sending OTP...
                        </>
                      ) : (
                        'Send OTP'
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={verifyOTP}>
                    <div className="form-group">
                      <label className="form-label">Enter OTP</label>
                      <div className="otp-inputs">
                        {otpValues.map((value, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            className="otp-input"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {otpTimer > 0 && (
                      <div className="resend-timer">
                        Resend OTP in {otpTimer}s
                      </div>
                    )}
                    
                    <button type="submit" className="login-button">
                      Verify OTP
                    </button>
                    
                    {otpTimer === 0 && (
                      <button 
                        type="button" 
                        className="login-button resend-button"
                        onClick={resendOTP}
                      >
                        Resend OTP
                      </button>
                    )}
                  </form>
                )}
              </>
            )}

            {/* Divider */}
            {/* <div className="divider">
              <span>or continue with</span>
            </div> */}

            {/* Social Login */}
            {/* <div className="social-login">
              <button className="social-button google-btn" onClick={() => socialLogin('Google')}>
                <span>🔴</span> Google
              </button>
              <button className="social-button facebook-btn" onClick={() => socialLogin('Facebook')}>
                <span>🔵</span> Facebook
              </button>
            </div> */}

            {/* Signup Link */}
            <div className="signup-link">
              Don't have an account? <a onClick={() => window.location.href = '/signup'}>Sign up here</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
