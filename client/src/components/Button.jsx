import React from 'react';

const Button = ({ title , color, py, handler }) => {
  let btnColor;
  color === 'dark' && (btnColor = 'bg-primary-700');
  color === 'medium' && (btnColor = 'bg-primary-500');

  const dynamicClassName = `text-white ${btnColor} hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-${py} text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mr-2 hover-zoom`;

  return (
    <>
    <button onClick={handler} type="submit" className={dynamicClassName}>
      {title}
    </button>

    </>
  );
};

export default Button;
