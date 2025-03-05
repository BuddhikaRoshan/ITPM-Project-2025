import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Income from './pages/income';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/income" element={<Income/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;