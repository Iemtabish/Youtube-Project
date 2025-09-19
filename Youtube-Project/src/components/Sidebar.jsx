import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  if (!isMenuOpen) return null;

  return (
    <div className="p-5 shadow-lg w-60">
      <ul>
        <li className="px-2 py-2 flex items-center bg-gray-200 rounded-md">
          <svg
            className="w-5 h-5 mr-2 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <Link to="/">Home</Link>
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V4H20C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H19V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6H4C3.44772 6 3 5.55228 3 5C3 4.44772 3.44772 4 4 4H7Z"
            />
          </svg>
          Shorts
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 14.846 4.632 17 6.414 17H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Subscriptions
        </li>
      </ul>
      <hr className="my-4" />

      <ul>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          You
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          History
        </li>
      </ul>
      <hr className="my-4" />

      <div className="p-2">
        <p className="text-sm">
          Sign in to like videos, comment, and subscribe.
        </p>
        <button className="flex items-center text-blue-500 border border-blue-500 rounded-full px-4 py-1 mt-2">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          Sign in
        </button>
      </div>
      <hr className="my-4" />

      <h1 className="font-bold">Explore</h1>
      <ul>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 14.846 4.632 17 6.414 17H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Shopping
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v6.114a4.369 4.369 0 00-1.045-.049c-2.043.166-3.955 2.474-3.955 4.935s1.912 4.768 3.955 4.935c2.043.166 4.045-1.892 4.045-4.353V7.762l8-1.6v2.552A4.369 4.369 0 0016 8.665c-2.043.166-3.955 2.474-3.955 4.935s1.912 4.768 3.955 4.935c2.043.166 4.045-1.892 4.045-4.353V3z" />
          </svg>
          Music
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
          Movies
        </li>
        <li className="px-2 py-2 flex items-center">
          <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
          Live
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 000 1.788l4 2V9.236L11 10.618V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788L9.553 8.658a1 1 0 00.894 0l4.764-2.382zM2 9a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V9z" />
          </svg>
          Gaming
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
              clipRule="evenodd"
            />
          </svg>
          News
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Sports
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
          Courses
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
            />
          </svg>
          Fashion & Beauty
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5A2 2 0 014 3h1a1 1 0 000 2H4v.5h1a1 1 0 000 2H4v.5h1a1 1 0 000 2H4A2 2 0 012 7.5V5zM15 5a2 2 0 012-2h1a1 1 0 100 2h-1v.5h1a1 1 0 100 2h-1v.5h1a1 1 0 100 2h-1a2 2 0 01-2-2V5zM6 4a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H6z" />
          </svg>
          Podcasts
        </li>
      </ul>
      <hr className="my-4" />

      <h1 className="font-bold">More from YouTube</h1>
      <ul>
        <li className="px-2 py-2 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          YouTube Premium
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v6.114a4.369 4.369 0 00-1.045-.049c-2.043.166-3.955 2.474-3.955 4.935s1.912 4.768 3.955 4.935c2.043.166 4.045-1.892 4.045-4.353V7.762l8-1.6v2.552A4.369 4.369 0 0016 8.665c-2.043.166-3.955 2.474-3.955 4.935s1.912 4.768 3.955 4.935c2.043.166 4.045-1.892 4.045-4.353V3z" />
          </svg>
          YouTube Music
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          YouTube Kids
        </li>
      </ul>
      <hr className="my-4" />

      <ul>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          Settings
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
              clipRule="evenodd"
            />
          </svg>
          Report history
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          Help
        </li>
        <li className="px-2 py-2 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7m0 0H5a2 2 0 00-2 2v2a2 2 0 002 2h2m0 0v6a2 2 0 002 2h6a2 2 0 002-2v-6m-8 0V8"
            />
          </svg>
          Send feedback
        </li>
      </ul>
      <hr className="my-4" />

      <div className="text-xs text-gray-500">
        <p className="pb-2">About Press Copyright</p>
        <p className="pb-2">Contact us Creators Advertise</p>
        <p className="pb-2">Developers</p>
        <p className="pb-2">Terms Privacy Policy & Safety</p>
        <p className="pb-2">How YouTube works</p>
        <p>Test new features</p>
        <p className="mt-4">© 2025 Google LLC</p>
      </div>
    </div>
  );
};

export default Sidebar;


