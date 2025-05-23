'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableField } from '../EditableField';

export function CollegeInfoSection({ collegeInfo }) {
  const handleSave = (field, value) => {
    console.log(`Saving ${field}: ${value}`);
    // In a real app, you'd send this to your backend
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>College Information</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <EditableField
          label='Year of Study'
          value={collegeInfo.year}
          onSave={(value) => handleSave('year', value)}
        />
        <EditableField
          label='Branch'
          value={collegeInfo.branch}
          onSave={(value) => handleSave('branch', value)}
        />
      </CardContent>
    </Card>
  );
}
