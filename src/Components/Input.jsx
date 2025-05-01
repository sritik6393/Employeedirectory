import React from 'react';

function Input({ setSearch }) {
  // Define the handler function outside the JSX
  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value); // Update the search state
  };

  return (
    <div className="flex justify-center mt-6">
      <input
        className="h-10 w-64 border-2 rounded-full px-4"
        placeholder="Search Name"
        onChange={handleChange}
      />
    </div>
  );
}

export default Input;
