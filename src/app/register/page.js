'use client';

import React from 'react';

import axios from 'axios';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Heart, Upload } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [step, setStep] = useState('email');
  const [gossipUserName, setGossipUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [personalInformation, setPersonalInformation] = useState({
    name: '',
    age: 0,
  });
  const [collegeInformation, setCollegeInformation] = useState({
    year: 0,
    branch: '',
  });
  const navigate = useRouter();

  const registerUser = async () => {
    try {
      const response = await axios.post('/api/user/register', {
        personalInformation,
        gossipUserName,
        email,
        password,
        collegeInformation,
      });

      if (response.status === 201) {
        navigate.push('/login');
        toast.success(response.data.message);
      }

      // You can handle redirection or a success message here
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Server error:', error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        // Network error or something else
        console.error('Error during registration:', error.message);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (step) {
      case 'email':
        // TODO: Implement phone verification
        setStep('personal');
        break;
      case 'personal':
        // TODO: Verify OTP
        setStep('college');
        break;
      case 'college':
        await registerUser();
        console.log('Register with:', { email });
        break;
    }
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center py-12'
      style={{ backgroundColor: '#FFE6C9' }}
    >
      <Card className='w-[420px]'>
        <CardHeader className='text-center'>
          <div
            className='w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center'
            style={{ backgroundColor: '#FCC6FF' }}
          >
            <Heart className='w-6 h-6' style={{ color: '#FFA09B' }} />
          </div>
          <CardTitle className='text-2xl'>Create Account</CardTitle>
          <CardDescription>
            {step === 'email' && 'Enter your email and password to get started'}
            {step === 'personal' && 'Enter some personal Info'}
            {step === 'college' && 'Tell us about your college Branch and Year'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {step === 'email' && (
              <>
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
                  <Label htmlFor='email'>Gossip username</Label>
                  <Input
                    id='gossip'
                    type='text'
                    placeholder='gossip name'
                    value={gossipUserName}
                    onChange={(e) => setGossipUserName(e.target.value)}
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
              </>
            )}

            {step === 'personal' && (
              <>
                <div className='space-y-2'>
                  <Label htmlFor='otp'>Name</Label>
                  <Input
                    id='name'
                    type='text'
                    placeholder='Name.....'
                    value={personalInformation.name}
                    onChange={(e) =>
                      setPersonalInformation({
                        ...personalInformation,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='otp'>Age</Label>
                  <Input
                    id='age'
                    type='number'
                    placeholder='Age.....'
                    value={personalInformation.age}
                    onChange={(e) =>
                      setPersonalInformation({
                        ...personalInformation,
                        age: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </>
            )}

            {step === 'college' && (
              <>
                <div className='space-y-2'>
                  <Label htmlFor='otp'>Year</Label>
                  <Input
                    id='year'
                    type='number'
                    placeholder='Year.....'
                    value={collegeInformation.year}
                    onChange={(e) =>
                      setCollegeInformation({
                        ...collegeInformation,
                        year: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='otp'>Branch</Label>
                  <Input
                    id='branch'
                    type='text'
                    placeholder='Branch.....'
                    value={collegeInformation.branch}
                    onChange={(e) =>
                      setCollegeInformation({
                        ...collegeInformation,
                        branch: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </>
            )}

            <Button
              type='submit'
              className='w-full'
              style={{ backgroundColor: '#FFA09B', color: 'white' }}
            >
              {step === 'college' ? 'Complete Registration' : 'Continue'}
            </Button>
          </form>

          {step === 'phone' && (
            <div className='mt-6 text-center'>
              <p className='text-sm text-muted-foreground'>
                Already have an account?{' '}
                <a
                  href='/login'
                  className='underline'
                  style={{ color: '#FFA09B' }}
                >
                  Login
                </a>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
