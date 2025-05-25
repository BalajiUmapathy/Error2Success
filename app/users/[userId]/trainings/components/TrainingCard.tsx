// app/users/[userId]/trainings/components/TrainingCard.tsx
import { Training } from '../Context';
import styles from '../trainings.module.css';

type Props = {
  training: Training;
  onKnowMore: () => void;
};

export default function TrainingCard({ training, onKnowMore }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardLeft}>
          <h2 className={styles.cardTitle}>{training.title}</h2>
          <p className={styles.organizer}>
            ORGANISED BY : {training.organizer}
          </p>
        </div>

        <div className={styles.cardRight}>
          <p>
            <strong>DATE :</strong> {training.date}
          </p>
          <p>
            <strong>DURATION :</strong> {training.duration}
          </p>
        </div>

        <div className={styles.cardButtonWrap}>
          <button onClick={onKnowMore} className={styles.knowMoreBtn}>
            Know More
          </button>
        </div>
      </div>
    </div>
  );
}
