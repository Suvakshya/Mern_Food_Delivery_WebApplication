import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaEyeSlash, FaLock, FaEye, FaArrowRight, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const url = 'http://localhost:4000';

const Login = ({ onLoginSuccess, onClose }) => {
  const [showToast, setShowToast] = useState({ visible: false, message: '', isError: false });
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  useEffect(() => {
    const stored = localStorage.getItem('loginData');
    if (stored) {
      try {
        setFormData(JSON.parse(stored));
      } catch (err) {
        console.error('Error parsing stored login data:', err);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/user/login`, {
        email: formData.email,
        password: formData.password
      });
      console.log('Axios Res:', res);

      if (res.status === 200 && res.data.success && res.data.token) {
        localStorage.setItem('authToken', res.data.token);

        // REMEMBER ME
        formData.rememberMe ? 
          localStorage.setItem('loginData', JSON.stringify(formData)) : 
          localStorage.removeItem('loginData');

        setShowToast({ visible: true, message: 'Login Successful', isError: false });
        setTimeout(() => {
          setShowToast({ visible: false, message: "", isError: false });
          onLoginSuccess(res.data.token);
        }, 1500);
      } else {
        console.warn('Unexpected Err:', res.data);
        throw new Error(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Axios error:', err);
      if (err.response) {
        console.error('Server res:', err.response.status, err.response.data);
      }
      const msg = err.response?.data?.message || err.message || 'Login Failed';
      setShowToast({ visible: true, message: msg, isError: true });
      setTimeout(() => {
        setShowToast({ visible: false, message: "", isError: false });
      }, 2000);
    }
  };

  const handleChange = ({ target: { name, value, type, checked } }) =>
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  return (
    <div className='space-y-6 relative'>
      {showToast.visible && (
        <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${showToast.visible ? 'translate-y-0 opacity-100' : "-translate-y-20 opacity-0"}`}>
          <div className={`${showToast.isError ? 'bg-red-600' : 'bg-green-600'} text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm`}>
            <FaCheckCircle className="flex-shrink-0" />
            <span>{showToast.message}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Email Field */}
        <div className='relative'>
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-amber-900/20 border-2 border-amber-800/30 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 text-white placeholder-amber-400/70 pl-10 pr-4 py-3"
            required
          />
        </div>

        {/* Password Field */}
        <div className='relative'>
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-amber-900/20 border-2 border-amber-800/30 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 text-white placeholder-amber-400/70 pl-10 pr-10 py-3"
            required
          />
          <button
            type='button'
            onClick={toggleShowPassword}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-amber-600'
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <label className='flex items-center cursor-pointer'>
            <input
              type="checkbox"
              name='rememberMe'
              checked={formData.rememberMe}
              onChange={handleChange}
              className='form-checkbox h-5 w-5 text-amber-600 bg-[#2D1B0E] border-amber-400 rounded focus:ring-amber-600'
            />
            <span className="ml-2 text-amber-100">Remember me</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[#2D1B0E] font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
        >
          Sign In<FaArrowRight />
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center">
        <Link
          to='/signup'
          onClick={onClose}
          className='inline-flex items-center gap-2 text-amber-400 hover:text-amber-600 transition-colors'
        >
          <FaUserPlus />Create New Account
        </Link>
      </div>
    </div>
  );
};

export default Login;