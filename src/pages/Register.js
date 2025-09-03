import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Balloons from '../components/Balloons';
import VSLogo from '../components/VSLogo';
import Navigation from '../components/Navigation';
import { userService } from '../services/userService';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    phrase: '',
    preferences: {
      alcohol: false,
      spicy: false
    }
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked
      }
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Photo must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setPhotoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.contact.trim()) {
      toast.error('Name and contact are required');
      return;
    }

    // Temporary notice about Firebase setup
    toast('🔧 Mode temporaire activé: Firebase Firestore en cours d\'activation', {
      duration: 3000,
      icon: '⚠️'
    });

    setIsSubmitting(true);

    try {
      const result = await userService.register(formData, photoFile);
      
      if (result.success) {
        toast.success('Registration successful! Welcome to the battle!');
        setTimeout(() => {
          navigate('/participants');
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <Navigation />
      <Balloons />
      
      <div className="container fade-in">
        <h1 className="title-secondary">REGISTER</h1>
        
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name / Nickname</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your battle name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo" className="form-label">Profile Photo</label>
            <div className="file-upload">
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                disabled={isSubmitting}
              />
              <label htmlFor="photo" className="file-upload-label">
                {photoPreview ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img 
                      src={photoPreview} 
                      alt="Preview" 
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        objectFit: 'cover',
                        border: '2px solid var(--color-yellow)'
                      }} 
                    />
                    <span>Change Photo</span>
                  </div>
                ) : (
                  <span>📸 Choose Photo (Optional)</span>
                )}
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Battle Preferences</label>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="alcohol"
                  name="alcohol"
                  checked={formData.preferences.alcohol}
                  onChange={handlePreferenceChange}
                  disabled={isSubmitting}
                />
                <label htmlFor="alcohol">🍷 Alcohol</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="spicy"
                  name="spicy"
                  checked={formData.preferences.spicy}
                  onChange={handlePreferenceChange}
                  disabled={isSubmitting}
                />
                <label htmlFor="spicy">🌶️ Spicy Food</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phrase" className="form-label">Battle Cry (Optional)</label>
            <input
              type="text"
              id="phrase"
              name="phrase"
              value={formData.phrase}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Ready to rumble!"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact" className="form-label">Contact Information</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Email or phone number"
              required
              disabled={isSubmitting}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-large" 
            disabled={isSubmitting}
            style={{ width: '100%', marginTop: '20px' }}
          >
            {isSubmitting ? 'CREATING PROFILE...' : 'CREATE PROFILE'}
          </button>
        </form>

        <VSLogo />
      </div>
    </div>
  );
};

export default Register;
