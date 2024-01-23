import React from "react";

const Button = ({ label,type="button", isDisabled, className }) => {
  return (
    <div>
      <button type={type} disabled={isDisabled}
        className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded
        disabled:bg-blue-300 ${className}  `}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
