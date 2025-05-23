'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableField } from '../EditableField';

export function PersonalInfoSection({ personalInfo }) {
  const handleSave = (field, value) => {
    console.log(`Saving ${field}: ${value}`);
    // In a real app, you'd send this to your backend
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <EditableField
          label='Name'
          value={personalInfo.name}
          onSave={(value) => handleSave('name', value)}
        />
        <EditableField
          label='Age'
          value={personalInfo.age}
          onSave={(value) => handleSave('age', value)}
          inputType='number'
        />
        <EditableField
          label='Height (cm)'
          value={personalInfo.height}
          onSave={(value) => handleSave('height', value)}
          inputType='number'
        />
        <EditableField
          label='Smoking Habits'
          value={personalInfo.smoking}
          onSave={(value) => handleSave('smoking', value)}
        />
        <EditableField
          label='Drinking Habits'
          value={personalInfo.drinking}
          onSave={(value) => handleSave('drinking', value)}
          inputType='number'
        />
        <EditableField
          label='Religion'
          value={personalInfo.religion}
          onSave={(value) => handleSave('religion', value)}
        />
      </CardContent>
    </Card>
  );
}
