"use client";

import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

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
          width: 300px;
          height: 300px;
          top: -150px;
          right: -150px;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          bottom: -100px;
          left: -100px;
        }

        .circle-3 {
          width: 150px;
          height: 150px;
          top: 50%;
          left: -75px;
          transform: translateY(-50%);
        }

        .signup-content {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .signup-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .icon-container {
          display: inline-block;
          width: 80px;
          height: 80px;
          background: #d5e6ee;
          border: 3px solid #1f6563;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 8px 8px 0px rgba(31, 101, 99, 0.3);
        }

        .signup-icon {
          font-size: 2rem;
        }

        .signup-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #1f6563;
          margin-bottom: 0.5rem;
        }

        .signup-subtitle {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 1rem;
        }

        .signup-question {
          font-size: 1.1rem;
          color: #333;
          font-weight: 500;
        }

        .options-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .option-card {
          background: white;
          border: 2px solid #d5e6ee;
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .option-card:hover {
          transform: translateY(-5px);
          border-color: #1f6563;
          box-shadow: 0 10px 30px rgba(31, 101, 99, 0.15);
        }

        .option-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1f6563, #d5e6ee);
        }

        .option-icon {
          width: 60px;
          height: 60px;
          background: #d5e6ee;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 1.5rem;
        }

        .option-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1f6563;
          margin-bottom: 0.75rem;
        }

        .option-description {
          color: #666;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .option-features {
          list-style: none;
          padding: 0;
          margin-bottom: 2rem;
        }

        .option-features li {
          color: #555;
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.5rem;
        }

        .option-features li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #1f6563;
          font-weight: bold;
        }

        .option-button {
          width: 100%;
          padding: 0.875rem 1.5rem;
          border: 2px solid #1f6563;
          border-radius: 9999px;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }

        .user-button {
          background: #f7f7f7;
          color: #1f6563;
          box-shadow: 6px 6px 0px rgba(31, 101, 99, 1);
        }

        .user-button:hover {
          background: #1f6563;
          color: #f7f7f7;
          box-shadow: none;
          transform: translate(3px, 3px);
        }

        .photographer-button {
          background: #1f6563;
          color: #f7f7f7;
          box-shadow: 6px 6px 0px rgba(31, 101, 99, 0.3);
        }

        .photographer-button:hover {
          background: #0f4f4c;
          box-shadow: none;
          transform: translate(3px, 3px);
        }

        .signup-footer {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid #e0e0e0;
        }

        .login-text {
          color: #666;
          font-size: 1rem;
        }

        .login-link {
          color: #1f6563;
          font-weight: 500;
          text-decoration: none;
          margin-left: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .login-link:hover {
          color: #0f4f4c;
          text-decoration: underline;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .signup-container {
            padding: 1rem 0.5rem;
          }

          .options-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .signup-title {
            font-size: 2rem;
          }

          .signup-subtitle {
            font-size: 1rem;
          }

          .option-card {
            padding: 1.5rem;
          }

          .circle-1, .circle-2, .circle-3 {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .signup-header {
            margin-bottom: 2rem;
          }

          .signup-title {
            font-size: 1.75rem;
          }

          .option-card {
            padding: 1.25rem;
          }

          .option-title {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <div className="signup-container">
        {/* Background Pattern */}
        <div className="background-pattern">
          <div className="pattern-circle circle-1"></div>
          <div className="pattern-circle circle-2"></div>
          <div className="pattern-circle circle-3"></div>
        </div>

        {/* Main Content */}
        <div className="signup-content">
          {/* Header Section */}
          <div className="signup-header">
            <div className="icon-container">
              <span className="signup-icon">👋</span>
            </div>
            <h1 className="signup-title">Welcome to KlickShare</h1>
            <p className="signup-subtitle">
              Join our intelligent photo sharing community
            </p>
            <p className="signup-question">
              How would you like to get started?
            </p>
          </div>

          {/* Options Container */}
          <div className="options-container">
            {/* User Option */}
            <div className="option-card">
              <div className="option-icon">
                <span>📸</span>
              </div>
              <div className="option-content">
                <h3 className="option-title">I'm a User</h3>
                <p className="option-description">
                  Share and organize your photos with AI-powered features
                </p>
                <ul className="option-features">
                  <li>Smart photo organization</li>
                  <li>Facial recognition</li>
                  <li>Easy sharing with friends</li>
                </ul>
              </div>
              <button
                onClick={() => router.push("/signup/user")}
                className="option-button user-button"
              >
                Get Started as User
              </button>
            </div>

            {/* Photographer Option */}
            <div className="option-card">
              <div className="option-icon">
                <span>📷</span>
              </div>
              <div className="option-content">
                <h3 className="option-title">I'm a Photographer</h3>
                <p className="option-description">
                  Showcase your work and connect with clients seamlessly
                </p>
                <ul className="option-features">
                  <li>Professional portfolio</li>
                  <li>Client management tools</li>
                  <li>Advanced sharing options</li>
                </ul>
              </div>
              <button
                onClick={() => router.push("/signup/photographer")}
                className="option-button photographer-button"
              >
                Get Started as Photographer
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="signup-footer">
            <p className="login-text">
              Already have an account? 
              <button 
                onClick={() => router.push("/login")}
                className="login-link"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}