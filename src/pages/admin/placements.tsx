import React from 'react';
import Header from '../../components/globals/Header';

const Placements = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="lg:text-center my-8">
        <h2 className="text-lg font-semibold text-indigo-600">Welcome</h2>
        <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          OPEN SOURCE SELF HOSTABLE COLLEGE MANAGEMENT SYSTEM
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Welcome to the College Management System! We are excited to provide
          you with this platform to streamline and automate various processes
          related to college management.
        </p>
      </div>
    </div>
  );
};

export default Placements;
