import React from 'react';
import { Heart, Users, Star, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function FeaturesSection() {
  const features = [
    {
      icon: Heart,
      title: 'Search Your Crush',
      description:
        'Find names, like profiles, and add them to your crush list.',
      color: 'pink',
    },
    {
      icon: Users,
      title: 'Find Your Match',
      description: "Get a like back? It's a match—time to connect!",
      color: 'purple',
    },
    {
      icon: Star,
      title: 'Show Your Interest',
      description: 'Star a profile to subtly let your crush know.',
      color: 'amber',
    },
    {
      icon: MessageCircle,
      title: 'Gossip on Flying Sparks',
      description: 'Join the buzz and chat about potential fires.',
      color: 'sky',
    },
  ];

  // Map color names to tailwind classes
  const colorMap = {
    pink: {
      bg: 'bg-pink-100',
      glow: 'bg-pink-200/50',
      text: 'text-pink-500',
      border: 'border-pink-200',
      shadow: 'shadow-pink-200/50',
    },
    purple: {
      bg: 'bg-purple-100',
      glow: 'bg-purple-200/50',
      text: 'text-purple-500',
      border: 'border-purple-200',
      shadow: 'shadow-purple-200/50',
    },
    amber: {
      bg: 'bg-amber-100',
      glow: 'bg-amber-200/50',
      text: 'text-amber-500',
      border: 'border-amber-200',
      shadow: 'shadow-amber-200/50',
    },
    sky: {
      bg: 'bg-sky-100',
      glow: 'bg-sky-200/50',
      text: 'text-sky-500',
      border: 'border-sky-200',
      shadow: 'shadow-sky-200/50',
    },
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
      {features.map((feature, index) => {
        const colors = colorMap[feature.color];

        return (
          <Card
            key={index}
            className={`border ${colors.border} rounded-xl overflow-hidden backdrop-blur-sm bg-secondaryBackground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <CardContent className='flex flex-col items-center text-center p-6'>
              <div
                className={`mb-5 p-4 ${colors.bg} rounded-full relative ${colors.shadow}`}
              >
                {/* Glassy effect with glow */}
                <div
                  className={`absolute inset-0 rounded-full ${colors.glow} blur-md`}
                ></div>
                <feature.icon
                  className={`h-8 w-8 ${colors.text} relative z-10`}
                />
              </div>
              <h3 className='text-xl font-bold mb-2'>{feature.title}</h3>
              <p className='text-muted-foreground'>{feature.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
