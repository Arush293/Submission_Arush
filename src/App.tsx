import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import MultiStepForm from './components/Forms/MultiStepForm';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/multi-step-form" element={<MultiStepForm />} />
        <Route path="/" element={<Login />}/>
      </Routes>
    </Router>
  </Provider>
);

export default App;
