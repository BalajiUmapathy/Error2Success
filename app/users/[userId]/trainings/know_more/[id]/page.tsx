// app/users/[userId]/trainings/know_more/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTrainings, Training } from '../../Context';
import styles from './detailTraining.module.css';

export default function DetailPage() {
  const { userId, id } = useParams();
  const { getTrainingById } = useTrainings();
  const router = useRouter();
  const [training, setTraining] = useState<Training | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) {
      router.push(`/users/${userId}/trainings`);
      return;
    }
    const found = getTrainingById(id);
    if (!found) {
      router.push(`/users/${userId}/trainings`);
    } else {
      setTraining(found);
    }
  }, [id]);

  if (!training) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.detailWrapper}>
      {/* BACK BUTTON */}
      <div className={styles.backRow}>
        <button
          onClick={() => router.push(`/users/${userId}/trainings`)}
          className={styles.backBtn}
        >
          ←
        </button>
      </div>

      {/* TITLE */}
      <div className={styles.titleRow}>
        <h1 className={styles.detailTitle}>{training.title}</h1>
      </div>

      {/* INFO ROW */}
      <div className={styles.infoRow}>
        {/* LEFT COLUMN: Organizer + Description */}
        <div className={styles.leftColumn}>
          <div className={styles.organizerGroup}>
            <div className={styles.greyLabel}>Organized By</div>
            <div className={styles.plainText}>{training.organizer}</div>
          </div>

          <div className={styles.descriptionGroup}>
            <div className={styles.greyLabel}>Description</div>
            <p className={styles.plainText}>{training.description}</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Date / Duration / Posters */}
        <div className={styles.rightColumn}>
          <div className={styles.smallGroup}>
            <div className={styles.greyLabelSmall}>Date</div>
            <div className={styles.plainText}>{training.date}</div>
          </div>

          <div className={styles.smallGroup}>
            <div className={styles.greyLabelSmall}>Duration</div>
            <div className={styles.plainText}>{training.duration}</div>
          </div>

          <div className={styles.posterBox}>
            <div className={styles.posterHeader}>
              <span>Posters</span>
            </div>
            <div className={styles.posterRow}>
              {training.posters.map((p, idx) => (
                <div key={idx} className={styles.posterItem}>
                  <span>{p.label}</span>
                  <a
                    href={p.url}
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Link to PDF
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── JOIN BUTTON ─────────────────────────────────────────────────────── */}
<div className={styles.joinRow}>
  {/* 
    If training.link is something like "https://meet.google.com/xyz-1234",
    this <a> will open it in a new tab/window.
  */}
  <a 
    href={training.link} 
    target="_blank" 
    rel="noopener noreferrer"
    className={styles.joinBtn}
  >
    Join
  </a>
</div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <span>Feedback | Complaint</span>
        <span>© 2024 UrbanNet All Rights Reserved.</span>
        <span>Help</span>
      </footer>
    </div>
  );
}
