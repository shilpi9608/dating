'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

export function InterestsSection({ userInterests, onUpdate }) {
  const [interests, setInterests] = useState(userInterests || []);
  const [newInterest, setNewInterest] = useState('');

  // keep local state in sync if parent prop changes
  useEffect(() => {
    setInterests(userInterests || []);
  }, [userInterests]);

  const addInterest = () => {
    const trimmed = newInterest.trim();
    if (trimmed && !interests.includes(trimmed)) {
      const updated = [...interests, trimmed];
      setInterests(updated);
      onUpdate(updated);
    }
    setNewInterest('');
  };

  const removeInterest = (interestToRemove) => {
    const updated = interests.filter((i) => i !== interestToRemove);
    setInterests(updated);
    onUpdate(updated);
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
              className='px-3 py-1 text-sm flex items-center'
            >
              {interest}
              <Button
                variant='ghost'
                size='icon'
                className='ml-2 p-0'
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
            onKeyDown={(e) => e.key === 'Enter' && addInterest()}
          />
          <Button onClick={addInterest}>
            <Plus className='h-4 w-4 mr-2' /> Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
