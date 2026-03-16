import React from 'react';


const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className,...props }) => {
    const inputStyles = `
    block w-full px-4 py-3 rounded-md border border-stone-200
    transition-all duration-200 outline-none text-black
    focus:outline-none
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${className} 
  `;

    return (
        <input
            className={inputStyles.trim()}
            {...props}
        />
    );
};

export default Input;