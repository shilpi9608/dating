'use client';

import { CollegeInfoSection } from '@/components/edit-section/CollegeInfo';
import { InterestsSection } from '@/components/edit-section/InterestsSection';
import { PersonalInfoSection } from '@/components/edit-section/PersonalInfo';
import { PreferencesSection } from '@/components/edit-section/PreferencesSection';
import { PhotoGallery } from '@/components/PhotoGallery';
import { ProfileHeader } from '@/components/ProfileHeader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function EditProfilePage() {
  const [activeSection, setActiveSection] = useState('basic');
  const [profile, setProfile] = useState({
    personalInformation: {
      name: '',
      age: 0,
      height: 0,
      smoking: '',
      drinking: '',
      religion: '',
    },
    gossipUserName: '',
    about: '',
    collegeInformation: { year: 0, branch: '' },
    interests: [],
    photos: [],
    preferences: { matchType: '', matchGender: '', qualities: '' },
    email: '',
    likes: [],
  });

  // Fetch current user data
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('User not authenticated');
          return;
        }
        const { data } = await axios.get('/api/user/owninfo', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data.user);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error(
          error.response?.data?.error || 'Failed to fetch user profile.'
        );
      }
    }
    fetchUserProfile();
  }, []);

  // Generic update handler accumulating changes in state
  const handleUpdate = (fieldPath, value) => {
    setProfile((prev) => {
      const updated = { ...prev };
      const keys = fieldPath.split('.');
      let obj = updated;
      // traverse to nested object
      console.log('|||||||||||||||||||||||');
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  // Save all changes at once
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('User not authenticated');
        return;
      }
      await axios.patch('/api/user/update', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      toast.error(error.response?.data?.error || 'Failed to update profile.');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-pink to-coral'>
      <div className='max-w-4xl mx-auto p-4 md:p-8 space-y-8'>
        <ProfileHeader
          title='Edit Your Profile'
          subtitle='Make your profile stand out'
        />
        <div className='flex justify-end'>
          <button
            onClick={handleSave}
            className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition'
          >
            Save Changes
          </button>
        </div>
        <div className='space-y-12'>
          <PhotoGallery
            photos={profile.photos}
            setPhotos={(photos) => handleUpdate('photos', photos)}
          />
          <PersonalInfoSection
            personalInfo={profile.personalInformation}
            onUpdate={(field, value) =>
              handleUpdate(`personalInformation.${field}`, value)
            }
          />
          <CollegeInfoSection
            collegeInfo={profile.collegeInformation}
            onUpdate={(field, value) =>
              handleUpdate(`collegeInformation.${field}`, value)
            }
          />
          <InterestsSection
            userInterests={profile.interests}
            onUpdate={(interests) => handleUpdate('interests', interests)}
          />
          <PreferencesSection
            preferences={profile.preferences}
            onUpdate={(field, value) =>
              handleUpdate(`preferences.${field}`, value)
            }
          />
        </div>
      </div>
    </div>
  );
}
