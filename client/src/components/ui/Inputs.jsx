import React from "react";

const Inputs = ({ label, type, placeholder, value, name, error, onChange }) => {
  return (
    <div className="w-full">
      {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"}`}
      />
    </div>
  );
};

export default Inputs;
