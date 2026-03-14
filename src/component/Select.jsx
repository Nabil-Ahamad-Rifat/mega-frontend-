import React, { useId } from "react";

function Select({ options, lable, className = "", ...props }, ref) {
  const ID = useId();
  return (
    <div className="w-full">
      {lable && <label htmlFor={ID} className=""></label>}
      <select
        {...props}
        id={ID}
        ref={ref}
        className={`px-3 py-2 rounded-lg text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      />
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </div>
  );
}

export default React.forwardRef(Select);
