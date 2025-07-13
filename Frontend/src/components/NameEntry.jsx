import React, { useState } from 'react';

const NameEntry = ({ onJoin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onJoin(name);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#10151f] p-6 rounded-xl shadow-lg space-y-5 text-white"
      >
        <h2 className="text-2xl font-bold text-center text-yellow-400">
          Enter Your Full Name
        </h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#2c3e50] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 rounded-lg hover:bg-yellow-300 transition font-semibold"
        >
          Join Chat
        </button>
      </form>
    </div>
  );
};

export default NameEntry;
