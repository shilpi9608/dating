'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <header className='bg-navbar bg-opacity-80 p-4 shadow-md relative z-10'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-2xl font-bold text-white'>shiva</div>

        <nav className='hidden md:flex space-x-8'>
          <Link
            href='/'
            className='text-white hover:text-orange-300 transition'
          >
            Home
          </Link>
          <Link
            href='/services'
            className='text-white hover:text-orange-300 transition'
          >
            Services
          </Link>
          <Link
            href='/about'
            className='text-white hover:text-orange-300 transition'
          >
            About
          </Link>
          <Link
            href='/contacts'
            className='text-white hover:text-orange-300 transition'
          >
            Contacts
          </Link>
        </nav>

        <div className='flex space-x-4'>
          {token ? (
            <button
              className='btn-secondary rounded-full text-sm font-medium'
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                href='/login'
                className='btn-secondary rounded-full text-sm font-medium'
              >
                Login
              </Link>
              <Link
                href='/register'
                className='btn-primary rounded-full text-sm font-medium'
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button className='md:hidden text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
