import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { verifyEmail, clearError, clearSuccessMessage } from '../redux/slices/authSlice';

const VerifyEmailPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const email = queryParams.get('email');
  const hasAttempted = useRef(false);

  const { loading, error, successMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearSuccessMessage());
    
    if (token && email && !hasAttempted.current) {
      hasAttempted.current = true;
      dispatch(verifyEmail({ email, token }));
    }
  }, [dispatch, token, email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Email Verification</h2>
        </div>
        <div className="mt-8">
          {loading && <p className="text-gray-600">Verifying your email...</p>}
          {!loading && error && (
            <div className="p-4 bg-red-50 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          {!loading && successMessage && (
            <div className="p-4 bg-green-50 rounded-md">
              <p className="text-green-700">{successMessage}</p>
            </div>
          )}
          {!token || !email ? (
            <p className="text-red-600">Invalid verification link.</p>
          ) : null}
        </div>
        <div className="mt-6">
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Go to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
