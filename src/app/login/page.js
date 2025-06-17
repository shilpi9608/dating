'use client';

import React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Heart } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const loginUser = async () => {
    try {
      const response = await axios.post('/api/user/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success(response.data.message);

        // You can store the token if needed
        localStorage.setItem('token', response.data.token);

        // Redirect to dashboard or home
        router.push('/'); // Adjust the route as needed
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
        console.error('Server error:', error.response.data.error);
      } else {
        toast.error('Login failed. Please try again.');
        console.error('Error during login:', error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser();
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center'
      style={{ backgroundColor: '#FFE6C9' }}
    >
      <Card className='w-[380px]'>
        <CardHeader className='text-center'>
          <div
            className='w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center'
            style={{ backgroundColor: '#FCC6FF' }}
          >
            <Heart className='w-6 h-6' style={{ color: '#FFA09B' }} />
          </div>
          <CardTitle className='text-2xl'>Welcome back</CardTitle>
          <CardDescription>Login to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email ID</Label>
              <Input
                id='email'
                type='email'
                placeholder='example@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='*******'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type='submit'
              className='w-full'
              style={{ backgroundColor: '#FFA09B', color: 'white' }}
            >
              Login
            </Button>
          </form>
          <div className='mt-6 text-center'>
            <p className='text-sm text-muted-foreground'>
              Don't have an account?{' '}
              <a
                href='/register'
                className='underline'
                style={{ color: '#FFA09B' }}
              >
                Sign up
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
