import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-i18n';

import I18n from '../../I18n';

import './Experience.css';

export default withRouter(function Experience(props) {
  const { location, match } = props;
  const { locale } = match.params;

  let company = null;
  if (props.company) {
    company = `@ ${props.company}`;
  }
  if (props.companyUrl) {
    company = (
      <span>
        @{' '}
        <a href={props.companyUrl} target="_blank" rel="noopener noreferrer">
          {props.company}
        </a>
      </span>
    );
  }

  let endYear = ` - ${I18n.getTranslation(location, 'Today')}`;
  if (props.endYear) {
    endYear = ` - ${props.endYear}`;
    if (props.startYear === props.endYear) {
      endYear = null;
    }
  }

  let tags = null;
  if (props.tags) {
    tags = props.tags.map(tag => (
      <span key={tag} className="tag">
        #{tag}
      </span>
    ));
    tags = <div className="tags">{tags}</div>;
  }

  const jobTitle = props.jobTitle[locale];

  return (
    <div className="Experience">
      <Link key={props.slug} to={`/career/${props.slug}`}>
        <h2 className="title">{jobTitle}</h2>
      </Link>
      <span className="year">
        {props.startYear} {endYear} {company}{' '}
      </span>
      {tags}
    </div>
  );
});
