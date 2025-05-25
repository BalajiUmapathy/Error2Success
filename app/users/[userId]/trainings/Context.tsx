// app/users/[userId]/trainings/Context.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type Training = {
  id: string;
  title: string;
  organizer: string;
  date: string;
  duration: string;
  description: string;
  link: string;
  posters: { label: string; url: string }[];
};

type TrainingsContextType = {
  trainings: Training[];
  addTraining: (t: Omit<Training, 'id'>) => string;
  getTrainingById: (id: string) => Training | undefined;
};

const TrainingsContext = createContext<TrainingsContextType | null>(null);

export function useTrainings() {
  const ctx = useContext(TrainingsContext);
  if (!ctx) throw new Error('useTrainings must be used within TrainingsProvider');
  return ctx;
}

type ProviderProps = { children: ReactNode };

export function TrainingsProvider({ children }: ProviderProps) {
  const [trainings, setTrainings] = useState<Training[]>([
    // initial dummy data
    {
      id: uuidv4(),
      title: 'Urban Planning and GIS Integration.',
      organizer: 'Indian Institute of Urban Affairs',
      date: '12th September, 2024',
      duration: '10:00 AM - 4:00 PM',
      description:
        'Join us for a comprehensive workshop on integrating Geographic Information Systems (GIS) in urban planning. This session will explore how GIS can be leveraged to enhance urban development, optimize resource allocation, and improve decision-making processes. Experts from the field will discuss the latest tools and technologies, share case studies, and provide practical insights into GIS applications in urban environments.',
      link: 'https://example.com/urban-gis',
      posters: [{ label: 'Notification', url: 'https://example.com/notification.pdf' }],
    },
    {
      id: uuidv4(),
      title: 'Smart City Coordination Workshop',
      organizer: 'Smart India Urban Collective',
      date: '20th September, 2024',
      duration: '11:00 AM - 5:00 PM',
      description:
        'A hands-on workshop focusing on inter-departmental coordination for smart city projects. Learn how to streamline processes and share data seamlessly.',
      link: 'https://example.com/smart-city',
      posters: [{ label: 'Notification', url: 'https://example.com/sc-notif.pdf' }],
    },
    {
      id: uuidv4(),
      title: 'Water Management Training',
      organizer: 'National Water Board',
      date: '5th October, 2024',
      duration: '9:00 AM - 1:00 PM',
      description:
        'Best practices for water resource management in urban areas. Techniques, case studies, and live demos included.',
      link: 'https://example.com/water-mgmt',
      posters: [{ label: 'Notification', url: 'https://example.com/wm-notif.pdf' }],
    },
  ]);

  function addTraining(t: Omit<Training, 'id'>): string {
    const newId = uuidv4();
    setTrainings((prev) => [...prev, { id: newId, ...t }]);
    return newId;
  }

  function getTrainingById(id: string): Training | undefined {
    return trainings.find((tr) => tr.id === id);
  }

  return (
    <TrainingsContext.Provider value={{ trainings, addTraining, getTrainingById }}>
      {children}
    </TrainingsContext.Provider>
  );
}
