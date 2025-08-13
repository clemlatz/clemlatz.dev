import Experience from '../Experience/Experience.jsx';
import experiences from '../../data/experiences';

import './Career.css';

export default function Career() {
  const experienceList = experiences.map((experience) => {
    return <Experience key={experience.slug} {...experience} />;
  });

  return <div className="Career">{experienceList}</div>;
}
