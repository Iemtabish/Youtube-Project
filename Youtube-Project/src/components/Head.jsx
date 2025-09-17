import React from "react";
import {useDispatch} from 'react-redux'
import { toggleMenu } from "../../utils.jsx/AppSlice";

const Head = () => {
  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
    
  }
  return (
    <div className="flex justify-between items-center p-4 shadow-lg">
     
      <div className="flex items-center" onClick={() =>toggleMenuHandler()}>
        <img
          className="h-8 cursor-pointer"
          alt="menu"
          src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-5.png"
        />
        <a href="/">
          <img
            className="h-16 ml-2"
            alt="youtube logo"
            src="https://www.gstatic.com/youtube/img/promos/fa28f252e8d007f9458234a71306c659affec45a2651d58a3d9577595fea5418_244x112.webp"
          />
        </a>
      </div>

     
      <div className="flex items-center">
        <input
          className="w-96 p-2 bg-neutral-100 border border-neutral-300 rounded-l-full focus:outline-none px-4"
          type="text"
          placeholder="Search"
        />
        <button className="px-5 py-2 bg-neutral-200 border-neutral-300 rounded-r-full">
          🔍
        </button>
    
      </div>

      
      <div className="flex items-center space-x-4">
        <span className="text-2xl">⋮</span>
        <button className="flex items-center border border-neutral-300 rounded-full py-2 px-4 text-blue-500">
          <span className="mr-2">👤</span>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Head;