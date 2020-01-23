import React from 'react';

import I18n from '../../I18n';
import { NavLink } from 'react-router-dom';

import './Home.css';

export default function Home() {
  return (
    <div>
      <p>
        <I18n t="Front-end web developer based in Paris" />
      </p>
      <p>
        <NavLink to="/en/">en</NavLink> · <NavLink to="/fr/">fr</NavLink>
      </p>
    </div>
  );
}
