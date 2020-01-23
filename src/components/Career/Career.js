import React from 'react';

import Experience from '../Experience/Experience';

import experiences from '../../data/experiences';

export default function ExperienceList() {
  const experienceList = experiences.map(experience => {
    return <Experience key={experience.slug} {...experience} />;
  });

  return <div>{experienceList}</div>;
}
