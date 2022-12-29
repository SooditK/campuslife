import Link from 'next/link';
import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

const Header = () => {
  return (
    <div>
      <Link
        href="/admin"
        className="text-base font-medium text-indigo-600 hover:text-indigo-500"
      >
        <IoArrowBack
          className="text-5xl"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            cursor: 'pointer',
            color: '#6366F1',
          }}
        />
      </Link>
    </div>
  );
};

export default Header;
