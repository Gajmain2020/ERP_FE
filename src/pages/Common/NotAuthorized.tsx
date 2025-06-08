import React from "react";
import { Link } from "react-router-dom";
import NotAllowed from "../../utils/svg/not-allowed.svg";
import BackgroundImage from "/mainbackground.jpg";

const NotAuthorized: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(211, 211, 211, 0.95), rgba(211, 211, 211, 0.85)), url(${BackgroundImage})`,
      }}
      className="flex flex-col items-center bg-cover justify-center h-screen bg-gray-100 gap-5 text-gray-800"
    >
      <div className="w-72 rounded-md overflow-hidden shadow-md">
        <img src={NotAllowed} alt="Page not found" />
      </div>
      <h1 className="text-4xl font-bold mb-4">403 - Forbidden</h1>
      <p className="text-xl mb-6">
        You do not have permission to access this page.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go back to Homepage
      </Link>
    </div>
  );
};

export default NotAuthorized;
