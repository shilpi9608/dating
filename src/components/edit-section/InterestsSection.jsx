'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

export function InterestsSection({ userInterests }) {
  const [interests, setInterests] = useState(userInterests);
  const [newInterest, setNewInterest] = useState('');

  const addInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Interests</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex flex-wrap gap-2'>
          {interests.map((interest) => (
            <Badge
              key={interest}
              variant='secondary'
              className='px-3 py-1 text-sm'
            >
              {interest}
              <Button
                variant='ghost'
                size='sm'
                className='ml-2 h-auto p-0'
                onClick={() => removeInterest(interest)}
              >
                <X className='h-3 w-3' />
              </Button>
            </Badge>
          ))}
        </div>
        <div className='flex gap-2'>
          <Input
            placeholder='Add new interest'
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addInterest()}
          />
          <Button onClick={addInterest}>
            <Plus className='h-4 w-4 mr-2' />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
