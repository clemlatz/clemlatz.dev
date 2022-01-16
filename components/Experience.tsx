import Link from 'next/link';
import { ExperienceType } from '../data/experiences';
import styles from './Experience.module.css';

export default function Experience({
  experience,
}: {
  experience: ExperienceType;
}) {
  return (
    <div className={styles.container}>
      <Link href={`/career/${experience.slug}`}>
        <a>
          <h2 className={styles.title}>{experience.jobTitle.en}</h2>
        </a>
      </Link>
      <span className={styles.year}>
        {experience.startYear} {experience.endYear} {experience.company}{' '}
      </span>
      {experience.tags}
    </div>
  );
}
