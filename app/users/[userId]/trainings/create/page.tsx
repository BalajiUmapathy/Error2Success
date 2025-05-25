// app/users/[userId]/trainings/create/page.tsx
'use client';

import { useParams } from 'next/navigation';
import CreateTrainingForm from './components/CreateTrainingForm';

export default function CreatePage() {
  const { userId } = useParams();
  const userIdStr = Array.isArray(userId) ? userId[0] : userId;
  return <CreateTrainingForm userId={userIdStr!} />;
}
