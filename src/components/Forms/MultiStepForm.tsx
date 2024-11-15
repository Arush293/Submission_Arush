import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { submitForm } from '../../api/xanoApi'; // Your API call for form submission
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
    },
    file: null,
    multipleFiles: [],
    geolocation: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <div>Please login to access this page.</div>;
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5);
      setFormData({ ...formData, multipleFiles: filesArray });
    }
  };

  const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setFormData({
        ...formData,
        geolocation: `${position.coords.latitude}, ${position.coords.longitude}`,
      });
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await submitForm(formData); // Adjust based on your API
      if (response.success) {
        setMessage('Form submitted successfully!');
      } else {
        setError('Failed to submit form.');
      }
    } catch (err) {
      setError('An error occurred while submitting the form.');
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear user state
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="container flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Multi-Step Form</h1>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${(currentStep / 5) * 100}%` }} // Update width based on current step
        />
      </div>
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-4">
          <button onClick={handlePrev} disabled={currentStep === 1} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
            Previous
          </button>
          <button onClick={handleNext} disabled={currentStep === 5} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
            Next
          </button>
        </div>

        {/* Step Contents ... */}
        {currentStep === 1 && (
          <div>
            <h2>Step 1: Basic Details</h2>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Name"
              className="border p-2 mb-4"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              className="border p-2 mb-4"
            />
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Phone Number"
              className="border p-2 mb-4"
            />
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2>Step 2: Address</h2>
            <input
              type="text"
              value={formData.address.line1}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, line1: e.target.value } })}
              placeholder="Address Line 1"
              className="border p-2 mb-4"
            />
            <input
              type="text"
              value={formData.address.line2}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, line2: e.target.value } })}
              placeholder="Address Line 2"
              className="border p-2 mb-4"
            />
            <input
              type="text"
              value={formData.address.city}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
              placeholder="City"
              className="border p-2 mb-4"
            />
            <input
              type="text"
              value={formData.address.state}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
              placeholder="State"
              className="border p-2 mb-4"
            />
            <input
              type="text"
              value={formData.address.pincode}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, pincode: e.target.value } })}
              placeholder="Pincode"
              className="border p-2 mb-4"
            />
            <input
              type="text"
              value={formData.address.country}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })}
              placeholder="Country"
              className="border p-2 mb-4"
            />
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2>Step 3: File Upload</h2>
            <input
              type="file"
              accept=".png,.pdf"
              onChange={handleFileChange}
              className="border p-2 mb-4"
            />
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2>Step 4: Multiple File Upload</h2>
            <input
              type="file"
              multiple
              accept=".png,.pdf"
              onChange={handleMultipleFileChange}
              className="border p-2 mb-4"
            />
            <button onClick={handleGeolocation} className="bg-blue-500 text-white p-2 mb-4">
              Get Geolocation
            </button>
            <p>Geolocation: {formData.geolocation}</p>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h2>Step 5: Submit</h2>
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-2">
              Submit
            </button>
          </div>
        )}

        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;
