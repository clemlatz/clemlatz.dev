import React from 'react';

import './Experience.css';

export default function(props) {

  let company = null;
  if (props.company) {
    company = `@ ${props.company}`;
  }
  if (props.companyUrl) {
    company = <span>@ <a href={props.companyUrl} target="_blank">{props.company}</a></span>
  }

  let endYear = ' - Aujourd\'hui';
  if (props.endYear) {
    endYear = ` - ${props.endYear}`;
    if (props.startYear === props.endYear) {
      endYear = null;
    }
  }

  return (
    <div className="Experience">
      <h2 className="title">
        {props.jobTitle}
      </h2>
      <span className="year">{props.startYear} {endYear} {company} </span>
    </div>
  );
}
