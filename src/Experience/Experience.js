import React from 'react';

export default function(props) {
  return (
    <div className="Experience">
      <h2>{props.jobTitle} @ {props.company}</h2>
    </div>
  );
}
