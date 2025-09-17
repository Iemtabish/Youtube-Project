import React from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  if (!isMenuOpen) return null;

  return (
    <div className="p-5 shadow-lg w-48">
      <ul>
        <li className="px-2 py-2 flex items-center bg-gray-200 rounded-md">
          <span className="mr-2">🏠</span> Home
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2"></span> Shorts
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">▶️</span> Subscriptions
        </li>
      </ul>
      <hr className="my-4" />

      <ul>  
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">👤</span> You
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">⏲️</span> History
        </li>
      </ul>
      <hr className="my-4" />

      <div className="p-2">
        <p className="text-sm">
          Sign in to like videos, comment, and subscribe.
        </p>
        <button className="flex items-center text-blue-500 border border-blue-500 rounded-full px-4 py-1 mt-2">
          <span className="mr-2">👤</span> Sign in
        </button>
      </div>
      <hr className="my-4" />

      <h1 className="font-bold">Explore</h1>
      <ul>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">🛍️</span> Shopping
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">🎵</span> Music
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">🎬</span> Movies
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">🔴</span> Live
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">🎮</span> Gaming
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">📰</span> News
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">🏆</span> Sports
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">🎓</span> Courses
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">💅</span> Fashion & Beauty
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">🎧</span> Podcasts
        </li>
      </ul>
      <hr className="my-4" />

      <h1 className="font-bold">More from YouTube</h1>
      <ul>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">▶️</span> YouTube Premium
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">▶️</span> YouTube Music
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">▶️</span> YouTube Kids
        </li>
      </ul>
      <hr className="my-4" />

      <ul>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">⚙️</span> Settings
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">🚩</span> Report history
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">❓</span> Help
        </li>
        <li className="px-2 py-2 flex items-center">
          <span className="mr-2">💬</span> Send feedback
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
