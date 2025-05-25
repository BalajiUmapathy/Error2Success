// app/users/[userId]/trainings/layout.tsx
import { TrainingsProvider } from './Context';

export default function TrainingsLayout({ children }: { children: React.ReactNode }) {
  return <TrainingsProvider>{children}</TrainingsProvider>;
}
