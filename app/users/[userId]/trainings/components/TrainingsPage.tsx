// app/users/[userId]/trainings/components/TrainingsPage.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTrainings, Training } from '../Context';
import TrainingCard from './TrainingCard';
import styles from '../trainings.module.css';

interface Props {
  userId: string;
}

export default function TrainingsPage({ userId }: Props) {
  const { trainings } = useTrainings();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Filter by title or organizer
  const filtered = trainings.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.organizer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goToCreate = () => {
    router.push(`/users/${userId}/trainings/create`);
  };

  const onKnowMore = (id: string) => {
    router.push(`/users/${userId}/trainings/know_more/${id}`);
  };

  return (
    <div className={styles.wrapper}>


      {/* SEARCH + CREATE NEW */}
      <div className={styles.toolbar}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          
        </div>

        <div className={styles.toolsRight}>
          
          <button onClick={goToCreate} className={styles.createNewBtn}>
            CREATE NEW
          </button>
        </div>
      </div>

      {/* LIST OF CARDS */}
      <main className={styles.cardContainer}>
        {filtered.length > 0 ? (
          filtered.map((t: Training) => (
            <TrainingCard
              key={t.id}
              training={t}
              onKnowMore={() => onKnowMore(t.id)}
            />
          ))
        ) : (
          <p className={styles.noResults}>No trainings match your search.</p>
        )}
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <span></span>
        <span>© 2024 UrbanNet All Rights Reserved.</span>
        <span></span>
      </footer>
    </div>
  );
}
