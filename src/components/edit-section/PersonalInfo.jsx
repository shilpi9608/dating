import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableField } from '../EditableField';

export function PersonalInfoSection() {
  // In a real app, you'd fetch this data from your backend
  const personalInfo = {
    name: 'Sarah Parker',
    age: '24',
    height: '165',
    religion: 'Hindu',
  };

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
          label='Religion'
          value={personalInfo.religion}
          onSave={(value) => handleSave('religion', value)}
          inputType=''
        />
      </CardContent>
    </Card>
  );
}
