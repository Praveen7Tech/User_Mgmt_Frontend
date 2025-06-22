import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-2 text-gray-700">Oops! Page Not Found</p>
      <p className="text-sm text-gray-500 mt-1">The page you're looking for doesn't exist or was moved.</p>
      <button className='m-2 p-2 text-lg underline'><Link to={"/Home"}>Back to Home</Link></button>
    </div>
  );
};

export default NotFound;
