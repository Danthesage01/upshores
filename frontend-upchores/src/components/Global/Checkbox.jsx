import React from "react";

const CheckboxInput = ({ label, checked, onChange, name }) => {
  return (
    <div className="flex items-start">
      <input
        name={name}
        type="checkbox"
        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
        checked={checked}
        onChange={onChange}
      />
      <label className="ml-2 text-sm text-gray-600">{label}</label>
    </div>
  );
};

export default CheckboxInput;
