'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableField } from '../EditableField';

export function PersonalInfoSection({ personalInfo, onUpdate }) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <EditableField
          label='Name'
          value={personalInfo.name}
          onSave={(value) => onUpdate('name', value)}
        />
        <EditableField
          label='Age'
          value={personalInfo.age}
          onSave={(value) => onUpdate('age', value)}
          inputType='number'
        />
        <EditableField
          label='Height (cm)'
          value={personalInfo.height}
          onSave={(value) => onUpdate('height', value)}
          inputType='number'
        />
        <EditableField
          label='Smoking Habits'
          value={personalInfo.smoking}
          onSave={(value) => onUpdate('smoking', value)}
        />
        <EditableField
          label='Drinking Habits'
          value={personalInfo.drinking}
          onSave={(value) => onUpdate('drinking', value)}
        />
        <EditableField
          label='Religion'
          value={personalInfo.religion}
          onSave={(value) => onUpdate('religion', value)}
        />
      </CardContent>
    </Card>
  );
}
