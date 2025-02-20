'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function CreateGossipDialog({ open, onOpenChange }) {
  const [showManualAdd1, setShowManualAdd1] = useState(false);
  const [showManualAdd2, setShowManualAdd2] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl bg-custom-orange/20'>
        <DialogHeader>
          <DialogTitle className='text-center'>Create New Gossip</DialogTitle>
        </DialogHeader>
        <div className='space-y-6'>
          <div className='space-y-4'>
            <h3 className='font-medium'>Person 1</h3>
            <div className='flex gap-2'>
              <Input
                placeholder='Search registered users...'
                className='bg-background'
              />
              <Button variant='outline'>
                <Search className='w-4 h-4' />
              </Button>
            </div>
            {showManualAdd1 ? (
              <div className='space-y-4'>
                <Input placeholder='Name' className='bg-background' />
                <Select>
                  <SelectTrigger className='bg-background'>
                    <SelectValue placeholder='Select year' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='freshman'>Freshman</SelectItem>
                    <SelectItem value='sophomore'>Sophomore</SelectItem>
                    <SelectItem value='junior'>Junior</SelectItem>
                    <SelectItem value='senior'>Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <Button
                variant='link'
                onClick={() => setShowManualAdd1(true)}
                className='text-custom-coral'
              >
                + Add manually instead
              </Button>
            )}
          </div>

          <div className='space-y-4'>
            <h3 className='font-medium'>Person 2</h3>
            <div className='flex gap-2'>
              <Input
                placeholder='Search registered users...'
                className='bg-background'
              />
              <Button variant='outline'>
                <Search className='w-4 h-4' />
              </Button>
            </div>
            {showManualAdd2 ? (
              <div className='space-y-4'>
                <Input placeholder='Name' className='bg-background' />
                <Select>
                  <SelectTrigger className='bg-background'>
                    <SelectValue placeholder='Select year' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='freshman'>Freshman</SelectItem>
                    <SelectItem value='sophomore'>Sophomore</SelectItem>
                    <SelectItem value='junior'>Junior</SelectItem>
                    <SelectItem value='senior'>Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <Button
                variant='link'
                onClick={() => setShowManualAdd2(true)}
                className='text-custom-coral'
              >
                + Add manually instead
              </Button>
            )}
          </div>

          <Button className='w-full bg-custom-coral hover:bg-custom-coral/90'>
            Create Gossip
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
