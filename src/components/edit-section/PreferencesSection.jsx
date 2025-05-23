'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableField } from '@/components/EditableField';

export function PreferencesSection({ preferences }) {
  const handleSave = (field, value) => {
    console.log(`Saving ${field}: ${value}`);
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <EditableField
          label='Looking For'
          value={preferences?.matchType || ''}
          onSave={(value) => handleSave('lookingFor', value)}
        />
        <EditableField
          label='Interested In'
          value={preferences?.matchGender || ''}
          onSave={(value) => handleSave('interestedIn', value)}
        />
        <EditableField
          label='Desired Qualities'
          value={preferences?.qualities || ''}
          onSave={(value) => handleSave('desiredQualities', value)}
        />
      </CardContent>
    </Card>
  );
}
