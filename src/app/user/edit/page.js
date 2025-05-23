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
  const [photos, setPhotos] = useState([]);
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
    collegeInformation: {
      year: 0,
      branch: '',
    },
    interests: [],
    photos: [],
    preferences: {
      matchType: '',
      matchGender: '',
      qualities: '',
    },
    email: '',
    likes: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // or from cookies if stored there

        if (!token) {
          toast.error('User not authenticated');
          return;
        }

        const response = await axios.get('/api/user/owninfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setProfile(response.data.user);
          setPhotos(response.data.user.photos);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error(
          error.response?.data?.error || 'Failed to fetch user profile.'
        );
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-b from-pink to-coral'>
      <div className='max-w-4xl mx-auto p-4 md:p-8 space-y-8'>
        <ProfileHeader
          title='Edit Your Profile'
          subtitle='Make your profile stand out'
        />
        <div className='space-y-12'>
          <PhotoGallery
            photos={photos}
            setPhotos={(updatedPhotos) => {
              setPhotos(updatedPhotos);
              updateProfile({ photos: updatedPhotos });
            }}
          />

          <PersonalInfoSection
            personalInfo={profile.personalInformation}
            onUpdate={(field, value) => {
              const updatedInfo = {
                ...profile.personalInformation,
                [field]: value,
              };
              setProfile((prev) => ({
                ...prev,
                personalInformation: updatedInfo,
              }));
              updateProfile({ personalInformation: updatedInfo });
            }}
          />

          <CollegeInfoSection
            collegeInfo={profile.collegeInformation}
            onUpdate={(field, value) => {
              const updatedInfo = {
                ...profile.collegeInformation,
                [field]: value,
              };
              setProfile((prev) => ({
                ...prev,
                collegeInformation: updatedInfo,
              }));
              updateProfile({ collegeInformation: updatedInfo });
            }}
          />

          <InterestsSection
            userInterests={profile.interests}
            onUpdate={(interests) => {
              setProfile((prev) => ({ ...prev, interests }));
              updateProfile({ interests });
            }}
          />

          <PreferencesSection
            preferences={profile.preferences}
            onUpdate={(field, value) => {
              const updatedPrefs = { ...profile.preferences, [field]: value };
              setProfile((prev) => ({ ...prev, preferences: updatedPrefs }));
              updateProfile({ preferences: updatedPrefs });
            }}
          />
        </div>
      </div>
    </div>
  );
}
