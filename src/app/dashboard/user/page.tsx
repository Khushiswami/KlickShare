"use client";

import { useEffect, useState, ChangeEvent } from "react";

type Photo = {
  id: number;
  url: string;
  name: string;
  date: string;
  favorite: boolean;
};

type User = {
  name: string;
  mobileNumber: string;
};

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "photos" | "albums" | "shared" | "settings">("overview");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  // Mock data for demonstration
  const mockPhotos: Photo[] = [
    { id: 1, url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", name: "Sunset Beach", date: "2024-01-15", favorite: true },
    { id: 2, url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400", name: "Forest Path", date: "2024-01-14", favorite: false },
    { id: 3, url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", name: "Mountain View", date: "2024-01-13", favorite: true },
    { id: 4, url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400", name: "City Lights", date: "2024-01-12", favorite: false },
    { id: 5, url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", name: "Ocean Waves", date: "2024-01-11", favorite: false },
    { id: 6, url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400", name: "Desert Dunes", date: "2024-01-10", favorite: true }
  ];

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/users?page=1&limit=1");
        if (!res.ok) throw new Error("Failed to fetch user");

        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          // assuming json.data[0] has the shape { name: string, mobileNumber: string }
          setUser({ name: json.data[0].name, mobileNumber: json.data[0].mobileNumber });
        } else {
          // fallback
          setUser({ name: "John Doe", mobileNumber: "9876543210" });
        }
      } catch (err) {
        console.error(err);
        setUser({ name: "John Doe", mobileNumber: "9876543210" });
      }
    }

    fetchUser();
    setPhotos(mockPhotos);
  }, []);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploading(true);
      // Simulate upload process
      setTimeout(() => {
        const newPhotos: Photo[] = Array.from(files).map((file, index) => ({
          id: photos.length + index + 1,
          url: URL.createObjectURL(file),
          name: file.name.split('.')[0],
          date: new Date().toISOString().split('T')[0],
          favorite: false
        }));
        // Add new ones in front, or change order as you wish
        setPhotos([...newPhotos, ...photos]);
        setUploading(false);
        setShowUploadModal(false);
      }, 2000);
    }
  };

  const toggleFavorite = (photoId: number) => {
    setPhotos(photos.map(photo => 
      photo.id === photoId ? { ...photo, favorite: !photo.favorite } : photo
    ));
  };

  const deletePhoto = (photoId: number) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };

  if (!user) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#f7f7f7', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#1f6563',
        fontSize: '1.2rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '3px solid #d5e6ee',
            borderTop: '3px solid #1f6563',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          Loading your dashboard...
        </div>
      </div>
    );
  }

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
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        .dashboard-container {
          min-height: 100vh;
          background: #f7f7f7;
          display: flex;
        }

        .sidebar {
          width: 280px;
          background: white;
          border-right: 2px solid #d5e6ee;
          padding: 2rem 0;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
          animation: slideIn 0.5s ease;
        }

        .sidebar-header {
          padding: 0 2rem 2rem;
          border-bottom: 1px solid #e0e0e0;
          margin-bottom: 2rem;
        }

        .user-avatar {
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, #1f6563, #d5e6ee);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .user-name {
          font-size: 1.25rem;
          font-weight: bold;
          color: #1f6563;
          margin-bottom: 0.25rem;
        }

        .user-phone {
          color: #666;
          font-size: 0.9rem;
        }

        .nav-menu {
          list-style: none;
          padding: 0 1rem;
        }

        .nav-item {
          margin-bottom: 0.5rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          color: #666;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .nav-link:hover {
          background: #f0f8f7;
          color: #1f6563;
        }

        .nav-link.active {
          background: #1f6563;
          color: white;
          box-shadow: 0 4px 12px rgba(31, 101, 99, 0.3);
        }

        .main-content {
          flex: 1;
          margin-left: 280px;
          padding: 2rem;
          animation: fadeIn 0.6s ease;
        }

        .welcome-section {
          background: white;
          border: 2px solid #d5e6ee;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
        }

        .welcome-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1f6563, #d5e6ee);
        }

        .welcome-title {
          font-size: 2rem;
          font-weight: bold;
          color: #1f6563;
          margin-bottom: 0.5rem;
        }

        .welcome-subtitle {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }

        .quick-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .quick-action-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid #1f6563;
          border-radius: 9999px;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f7f7f7;
          color: #1f6563;
          box-shadow: 4px 4px 0px rgba(31, 101, 99, 1);
        }

        .quick-action-btn:hover {
          background: #1f6563;
          color: #f7f7f7;
          box-shadow: none;
          transform: translate(2px, 2px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border: 2px solid #d5e6ee;
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(31, 101, 99, 0.15);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1f6563, #d5e6ee);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          background: #d5e6ee;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          color: #1f6563;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
        }

        .content-section {
          background: white;
          border: 2px solid #d5e6ee;
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .content-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1f6563, #d5e6ee);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1f6563;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .photo-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          background: #f5f5f5;
          aspect-ratio: 1;
        }

        .photo-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .photo-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
        }

        .photo-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .photo-card:hover .photo-overlay {
          opacity: 1;
        }

        .photo-action {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .photo-action:hover {
          transform: scale(1.1);
          background: #1f6563;
          color: white;
        }

        .photo-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
          padding: 1rem;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .photo-card:hover .photo-info {
          transform: translateY(0);
        }

        .photo-name {
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .photo-date {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .upload-area {
          border: 2px dashed #d5e6ee;
          border-radius: 12px;
          padding: 3rem 2rem;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          background: #f9f9f9;
        }

        .upload-area:hover {
          border-color: #1f6563;
          background: #f0f8f7;
        }

        .upload-icon {
          font-size: 3rem;
          color: #d5e6ee;
          margin-bottom: 1rem;
        }

        .upload-text {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .upload-subtext {
          color: #999;
          font-size: 0.9rem;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          position: relative;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }

        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .loading-content {
          text-align: center;
          color: #1f6563;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid #d5e6ee;
          border-top: 3px solid #1f6563;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
            z-index: 1000;
          }

          .main-content {
            margin-left: 0;
            padding: 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .photo-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
          }

          .quick-actions {
            flex-direction: column;
          }

          .welcome-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-name">{user.name}</div>
            <div className="user-phone">+91 {user.mobileNumber}</div>
          </div>

          <ul className="nav-menu">
            <li className="nav-item">
              <div 
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <span>📊</span> Overview
              </div>
            </li>
            <li className="nav-item">
              <div 
                className={`nav-link ${activeTab === 'photos' ? 'active' : ''}`}
                onClick={() => setActiveTab('photos')}
              >
                <span>📸</span> My Photos
              </div>
            </li>
            <li className="nav-item">
              <div 
                className={`nav-link ${activeTab === 'albums' ? 'active' : ''}`}
                onClick={() => setActiveTab('albums')}
              >
                <span>📁</span> Albums
              </div>
            </li>
            <li className="nav-item">
              <div 
                className={`nav-link ${activeTab === 'shared' ? 'active' : ''}`}
                onClick={() => setActiveTab('shared')}
              >
                <span>🔗</span> Shared
              </div>
            </li>
            <li className="nav-item">
              <div 
                className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <span>⚙</span> Settings
              </div>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome back, {user.name}! 👋</h1>
            <p className="welcome-subtitle">
              Manage your photos with AI-powered organization and smart sharing features.
            </p>
            <div className="quick-actions">
              <button 
                className="quick-action-btn"
                onClick={() => setShowUploadModal(true)}
              >
                <span>📤</span> Upload Photos
              </button>
              <button className="quick-action-btn">
                <span>🤖</span> AI Organize
              </button>
              <button className="quick-action-btn">
                <span>👥</span> Face Recognition
              </button>
              <button className="quick-action-btn">
                <span>🔗</span> Share Album
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📸</div>
              <div className="stat-number">{photos.length}</div>
              <div className="stat-label">Total Photos</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">❤</div>
              <div className="stat-number">{photos.filter(p => p.favorite).length}</div>
              <div className="stat-label">Favorites</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📁</div>
              <div className="stat-number">5</div>
              <div className="stat-label">Albums</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔗</div>
              <div className="stat-number">12</div>
              <div className="stat-label">Shared Links</div>
            </div>
          </div>

          {/* Content based on active tab */}
          <div className="content-section">
            {activeTab === 'overview' && (
              <>
                <div className="section-header">
                  <h2 className="section-title">Recent Activity</h2>
                </div>
                <div style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
                  <p>Your photo activity and AI insights will appear here.</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Upload some photos to see your personalized dashboard!
                  </p>
                </div>
              </>
            )}

            {activeTab === 'photos' && (
              <>
                <div className="section-header">
                  <h2 className="section-title">My Photos ({photos.length})</h2>
                  <button 
                    className="quick-action-btn"
                    onClick={() => setShowUploadModal(true)}
                  >
                    <span>➕</span> Add Photos
                  </button>
                </div>
                
                {photos.length > 0 ? (
                  <div className="photo-grid">
                    {photos.map(photo => (
                      <div key={photo.id} className="photo-card">
                        <img 
                          src={photo.url} 
                          alt={photo.name}
                          className="photo-image"
                          onClick={() => setSelectedPhoto(photo)}
                        />
                        <div className="photo-overlay">
                          <button 
                            className="photo-action"
                            onClick={() => toggleFavorite(photo.id)}
                            title={photo.favorite ? "Remove from favorites" : "Add to favorites"}
                          >
                            {photo.favorite ? '❤' : '🤍'}
                          </button>
                          <button 
                            className="photo-action"
                            title="Share photo"
                          >
                            🔗
                          </button>
                          <button 
                            className="photo-action"
                            onClick={() => deletePhoto(photo.id)}
                            title="Delete photo"
                          >
                            🗑
                          </button>
                        </div>
                        <div className="photo-info">
                          <div className="photo-name">{photo.name}</div>
                          <div className="photo-date">{photo.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div 
                    className="upload-area"
                    onClick={() => setShowUploadModal(true)}
                  >
                    <div className="upload-icon">📸</div>
                    <div className="upload-text">No photos yet</div>
                    <div className="upload-subtext">Click here to upload your first photos</div>
                  </div>
                )}
              </>
            )}-

            {activeTab === 'albums' && (
              <>
                <div className="section-header">
                  <h2 className="section-title">Photo Albums</h2>
                  <button className="quick-action-btn">
                    <span>➕</span> Create Album
                  </button>
                </div>
                <div style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
                  <p>Organize your photos into beautiful albums.</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Create your first album to get started!
                  </p>
                </div>
              </>
            )}

            {activeTab === 'shared' && (
              <>
                <div className="section-header">
                  <h2 className="section-title">Shared Content</h2>
                </div>
                <div style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔗</div>
                  <p>Share your photos and albums with friends and family.</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Your shared links and collaborations will appear here.
                  </p>
                </div>
              </>
            )}

            {activeTab === 'settings' && (
              <>
                <div className="section-header">
                  <h2 className="section-title">Account Settings</h2>
                </div>
                <div style={{ color: '#666', padding: '1rem 0' }}>
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#1f6563', marginBottom: '1rem' }}>Profile Information</h3>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Phone:</strong> +91 {user.mobileNumber}</p>
                  </div>
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#1f6563', marginBottom: '1rem' }}>AI Features</h3>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input type="checkbox" defaultChecked /> Enable facial recognition
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input type="checkbox" defaultChecked /> Auto-organize photos
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" /> Smart album suggestions
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button 
                className="modal-close"
                onClick={() => setShowUploadModal(false)}
              >
                ×
              </button>
              <h2 style={{ color: '#1f6563', marginBottom: '1.5rem' }}>Upload Photos</h2>
              <div 
                className="upload-area"
                onClick={() => {
                  const inputEl = document.getElementById('file-input');
                  if (inputEl) {
                    inputEl.click();
                  }
                }}
              >
                <div className="upload-icon">📤</div>
                <div className="upload-text">Drag & drop photos here</div>
                <div className="upload-subtext">or click to browse files</div>
              </div>
              <input
                id="file-input"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        )}

        {/* Photo Viewer Modal */}
        {selectedPhoto && (
          <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px' }}>
              <button 
                className="modal-close"
                onClick={() => setSelectedPhoto(null)}
              >
                ×
              </button>
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.name}
                style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem' }}
              />
              <h3 style={{ color: '#1f6563', marginBottom: '0.5rem' }}>{selectedPhoto.name}</h3>
              <p style={{ color: '#666' }}>Uploaded on {selectedPhoto.date}</p>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {uploading && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <p>Uploading your photos...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}