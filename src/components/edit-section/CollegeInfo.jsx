'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableField } from '../EditableField';

export function CollegeInfoSection({ collegeInfo, onUpdate }) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>College Information</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <EditableField
          label='Year of Study'
          value={collegeInfo.year}
          onSave={(value) => onUpdate('year', value)}
        />
        <EditableField
          label='Branch'
          value={collegeInfo.branch}
          onSave={(value) => onUpdate('branch', value)}
        />
      </CardContent>
    </Card>
  );
}
