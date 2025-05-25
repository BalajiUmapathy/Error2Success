// app/users/[userId]/trainings/create/components/CreateTrainingForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

// ← Correct relative import path:
import { useTrainings } from '../../Context';
import styles from '../createTraining.module.css';

interface Props {
  userId: string;
}

export default function CreateTrainingForm({ userId }: Props) {
  const { addTraining } = useTrainings();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    date: '',
    duration: '',
    description: '',
    link: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onCreate = () => {
    const newId = addTraining({
      title: formData.title,
      organizer: formData.organizer,
      date: formData.date,
      duration: formData.duration,
      description: formData.description,
      link: formData.link,
      posters: [{ label: 'Notification', url: formData.link || '#' }],
    });

    router.push(`/users/${userId}/trainings`);
  };

  return (
    <div className={styles.formWrapper}>
      {/* BACK BUTTON */}
      <div className={styles.backRow}>
        <button
          onClick={() => router.push(`/users/${userId}/trainings`)}
          className={styles.backBtn}
        >
          ←
        </button>
      </div>

      {/* TITLE ROW */}
      <div className={styles.rowFull}>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={formData.title}
          onChange={handleChange}
          className={styles.titleInput}
        />
        <button className={styles.editIconBtn}>✎</button>
      </div>

      {/* ORGANIZER + DATE */}
      
      <div className={styles.rowTwo}>
        <div className={styles.organizerGroup}>
          <div className={styles.greyLabel}>Organized By</div>
          <input
            type="text"
            name="organizer"
            placeholder="Enter name"
            value={formData.organizer}
            onChange={handleChange}
            className={styles.textInput}
          />
        <button className={styles.editIconBtn}>✎</button>
        </div>

        <div className={styles.dateGroup}>
          <div className={styles.greyLabelSmall}>Date</div>
          <input
            type="date"
            name="date"
            placeholder="dd-mm-yyyy"
            value={formData.date}
            onChange={handleChange}
            className={styles.textInputSmall}
          />
        </div>
      </div>

      {/* DESCRIPTION / DURATION / POSTERS (STACKED) */}
      <div className={styles.rowThree}>
        <div className={styles.descriptionGroup}>
          <div className={styles.greyLabel}>Description</div>
          <textarea
            name="description"
            rows={5}
            placeholder=""
            value={formData.description}
            onChange={handleChange}
            className={styles.textArea}
          />
          <button className={styles.editIconBtnOverlay}>✎</button>
        </div>

        <div className={styles.durationGroup}>
          <div className={styles.greyLabelSmall}>Duration</div>
          <input
            type="text"
            name="duration"
            placeholder="Enter Duration"
            value={formData.duration}
            onChange={handleChange}
            className={styles.textInputSmall}
          />
        </div>

        <div className={styles.posterBox}>
          <div className={styles.posterHeader}>
            <span>Posters</span>
            <button className={styles.addPosterBtn}>＋</button>
          </div>
          <div className={styles.posterRow}>
            <span>Notification</span>
            <a href="#" className={styles.link}>
              Link to PDF
            </a>
          </div>
        </div>
      </div>

      {/* LINK + CREATE BUTTON */}
      <div className={styles.linkRow}>
        <button className={styles.editIconBtn}>✎</button>
        <input
          type="text"
          name="link"
          placeholder="Enter Link"
          value={formData.link}
          onChange={handleChange}
          className={styles.linkInput}
        />
        <button onClick={onCreate} className={styles.createBtn}>
          Create
        </button>
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
