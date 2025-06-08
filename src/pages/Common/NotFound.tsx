import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../../utils/svg/not-found.svg";
import BackgroundImage from "/mainbackground.jpg";

const NotFound: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(211, 211, 211, 0.95), rgba(211, 211, 211, 0.85)), url(${BackgroundImage})`,
      }}
      className="flex flex-col items-center bg-cover justify-center h-screen gap-5 bg-gray-100 text-gray-800"
    >
      <div className="w-72 rounded-md overflow-hidden shadow-md">
        <img src={PageNotFound} alt="Page not found" />
      </div>

      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-6">
        The page you are looking for does not exist.
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

export default NotFound;
