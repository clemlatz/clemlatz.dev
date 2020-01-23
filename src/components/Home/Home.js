import React from 'react';

import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <p>
        <NavLink to="/en/">en</NavLink> · <NavLink to="/fr/">fr</NavLink>
      </p>
    </div>
  );
}
