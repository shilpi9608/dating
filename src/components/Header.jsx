import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='bg-navbar bg-opacity-80 p-4 shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-2xl font-bold text-white'>shiva</div>
        <nav className='hidden md:flex space-x-8'>
          <Link
            href='/'
            className='text-white hover:text-orange-300 cursor-pointer transition'
          >
            Home
          </Link>
          <Link
            href='/services'
            className='text-white hover:text-orange-300 cursor-pointer transition'
          >
            Services
          </Link>
          <Link
            href='/about'
            className='text-white hover:text-orange-300 cursor-pointer transition'
          >
            About
          </Link>
          <Link
            href='/contacts'
            className='text-white hover:text-orange-300 cursor-pointer transition'
          >
            Contacts
          </Link>
        </nav>
        <div className='flex space-x-4'>
          <Link
            href='/login'
            className='relative btn-secondary rounded-full text-sm font-medium'
          >
            Login
          </Link>


          <Link
            href='/register'
            className='relative btn-primary rounded-full text-sm font-medium'
          >
            Sign Up
          </Link>
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
