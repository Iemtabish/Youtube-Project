import React from 'react';

const Button = ({ name }) => {
  return (
    <button className='px-4 cursor-pointer py-1 m-2 whitespace-nowrap bg-gray-200 rounded-md text-black hover:bg-black hover:text-white'>
      {name}
    </button>
  );
};

export default Button;