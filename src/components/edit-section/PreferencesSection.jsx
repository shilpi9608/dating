'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableField } from '@/components/EditableField';

export function PreferencesSection({ preferences, onUpdate }) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <EditableField
          label='Looking For'
          value={preferences?.matchType || ''}
          onSave={(value) => onUpdate('matchType', value)}
        />
        <EditableField
          label='Interested In'
          value={preferences?.matchGender || ''}
          onSave={(value) => onUpdate('matchGender', value)}
        />
        <EditableField
          label='Desired Qualities'
          value={preferences?.qualities || ''}
          onSave={(value) => onUpdate('qualities', value)}
        />
      </CardContent>
    </Card>
  );
}
