'use client';

import React from 'react';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, X } from 'lucide-react';
import Image from 'next/image';

export function PhotoGallery({ photos, setPhotos }) {
  const addPhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotos([...photos, e.target.result]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Your Photos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {photos.map((photo, index) => (
            <div key={index} className='relative aspect-square'>
              <Image
                src={photo || '/placeholder.svg'}
                alt={`User photo ${index + 1}`}
                fill
                className='object-cover rounded-lg'
              />
              <Button
                variant='destructive'
                size='icon'
                className='absolute top-2 right-2'
                onClick={() => removePhoto(index)}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          ))}
          {photos.length < 6 && (
            <div className='aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center relative group cursor-pointer hover:border-primary'>
              <input
                type='file'
                className='absolute inset-0 opacity-0 cursor-pointer'
                accept='image/*'
                onChange={addPhoto}
              />
              <Camera className='w-8 h-8 text-muted-foreground/25 group-hover:text-primary' />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
