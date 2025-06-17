'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  GraduationCap,
  Sparkles,
  Coffee,
  Users,
  Star,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Decoration from '@/components/profile-page/Decoration';
import { PhotoGallery } from '@/components/profile-page/PhotoGallery';
import { toast } from 'react-toastify';
import { comment } from 'postcss';

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const YEAR_LABELS = {
    1: 'Fresher',
    2: 'Sophomore',
    3: 'Junior',
    4: 'Senior',
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!id) return;

      try {
        const res = await axios.post('/api/browse/one', { id });
        setUser(res.data.user);
        console.log(res.data.user.likes);
        setLikeCount(
          Array.isArray(res.data.user.likes) ? res.data.user.likes.length : 0
        );
      } catch (err) {
        console.error(err);
        const msg = err?.response?.data?.error || 'Failed to load profile.';
        toast.error(msg);
      }
    };

    loadProfile();
  }, [id]);

  const handleLike = useCallback(async () => {
    if (!id) return;
    try {
      // Retrieve JWT token
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        toast.warn('You must be logged in to like profiles.');
        return;
      }

      const res = await axios.post(
        '/api/match/likeprofile',
        { likedUserId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201 && res.data.match) {
        toast.success("It's a match! 🎉");
      } else {
        toast.success(res.data.message || 'Profile liked successfully.');
      }
    } catch (err) {
      console.error('Like Error:', err);
      const msg = err?.response?.data?.error || 'Failed to like profile.';
      toast.error(msg);
    }
  }, [id]);

  if (!user) return null;

  const {
    personalInformation = {},
    collegeInformation = {},
    interests = [],
    photos = [],
    likes = [],
    preferences = {},
    about = '',
  } = user;

  const {
    name = 'Unknown',
    height = '-',
    religion = 'N/A',
    smoking = 'N/A',
    drinking = 'N/A',
  } = personalInformation;

  const { branch = 'N/A', year = '-' } = collegeInformation;

  const {
    matchType = 'N/A',
    matchGender = 'N/A',
    qualities = 'N/A',
  } = preferences;

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 relative overflow-hidden'>
      <Decoration />
      <div className='relative z-10 max-w-screen-2xl mx-auto px-4 py-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-amber-900 mb-2'>Profile</h1>
          <div className='w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto rounded-full'></div>
        </div>

        <div className='grid lg:grid-cols-5 gap-8'>
          <div className='lg:col-span-2 space-y-6'>
            <PhotoGallery photos={photos} userName={name} likes={likeCount} />

            <Card className='shadow-lg bg-white/90 backdrop-blur-sm border border-pink-100/50'>
              <CardContent className='p-6'>
                <h3 className='text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2'>
                  <Sparkles className='w-5 h-5 text-orange-400' /> Quick Info
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-amber-700'>Height</span>
                    <span className='font-medium text-amber-900'>
                      {height} cm
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-amber-700'>Religion</span>
                    <span className='font-medium text-amber-900'>
                      {religion}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-amber-700'>Smoking</span>
                    <span className='font-medium text-amber-900 capitalize'>
                      {smoking}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-amber-700'>Drinking</span>
                    <span className='font-medium text-amber-900 capitalize'>
                      {drinking}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='lg:col-span-3 space-y-6'>
            <Card className='shadow-lg bg-white/90 backdrop-blur-sm border border-pink-100/50'>
              <CardContent className='p-6'>
                <h3 className='text-xl font-semibold text-amber-900 mb-4 flex items-center gap-2'>
                  <Coffee className='w-5 h-5 text-orange-400' /> About Me
                </h3>
                <p className='text-amber-800 text-lg leading-relaxed'>
                  {about}
                </p>
              </CardContent>
            </Card>

            <Card className='shadow-lg bg-white/90 backdrop-blur-sm border border-pink-100/50'>
              <CardContent className='p-6'>
                <h3 className='text-xl font-semibold text-amber-900 mb-4 flex items-center gap-2'>
                  <GraduationCap className='w-5 h-5 text-orange-400' />{' '}
                  Education
                </h3>
                <div className='bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg p-4'>
                  <p className='text-amber-900 font-medium'>{branch}</p>
                  <p className='text-amber-700'>
                    {year > 0 && year < 5 ? YEAR_LABELS[year] : 'Secret'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className='shadow-lg bg-white/90 backdrop-blur-sm border border-pink-100/50'>
              <CardContent className='p-6'>
                <h3 className='text-xl font-semibold text-amber-900 mb-4 flex items-center gap-2'>
                  <Heart className='w-5 h-5 text-orange-400' /> Interests
                </h3>
                <div className='flex flex-wrap gap-3'>
                  {interests.map((interest, idx) => (
                    <Badge
                      key={idx}
                      className='bg-gradient-to-r from-orange-200 to-pink-200 text-amber-900 border-0 px-4 py-2 text-sm hover:from-orange-300 hover:to-pink-300 transition-all duration-300'
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className='shadow-lg bg-white/90 backdrop-blur-sm border border-pink-100/50'>
              <CardContent className='p-6'>
                <h3 className='text-xl font-semibold text-amber-900 mb-4 flex items-center gap-2'>
                  <Users className='w-5 h-5 text-orange-400' /> Looking For
                </h3>
                <div className='space-y-4'>
                  <div className='bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg p-4'>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <div>
                        <p className='text-amber-700 text-sm'>Match Type</p>
                        <p className='text-amber-900 font-medium'>
                          {matchType}
                        </p>
                      </div>
                      <div>
                        <p className='text-amber-700 text-sm'>
                          Gender Preference
                        </p>
                        <p className='text-amber-900 font-medium'>
                          {matchGender}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className='text-amber-700 text-sm mb-2'>
                      Desired Qualities
                    </p>
                    <p className='text-amber-900 font-medium'>{qualities}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className='flex gap-4 justify-center pt-4'>
              <button
                onClick={handleLike}
                className='bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 hover:from-pink-500 hover:to-rose-500'
              >
                <Heart className='w-5 h-5 animate-pulse' /> Like Profile
              </button>
              <button className='bg-gradient-to-r from-amber-300 via-orange-300 to-pink-300 text-amber-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-pink-200 flex items-center gap-2 hover:from-amber-400 hover:to-pink-400'>
                <Star className='w-5 h-5 fill-current animate-pulse' /> Confess
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
