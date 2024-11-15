import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="container">
      <h1 className="text-2xl">Dashboard</h1>
      <p className="mt-4">Welcome to your dashboard! Here you can manage your profile and access different features of the application.</p>

      <div className="mt-6">
        <button onClick={() => navigate('/multi-step-form')} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Go to Multi-Step Form
        </button>
        <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition ml-4">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
