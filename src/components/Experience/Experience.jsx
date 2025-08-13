import './Experience.css';

export default function Experience(props) {
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

  let endYear = ` - Aujourd'hui`;
  if (props.endYear) {
    endYear = ` - ${props.endYear}`;
    if (props.startYear === props.endYear) {
      endYear = null;
    }
  }

  let tags = null;
  if (props.tags) {
    tags = props.tags.map((tag) => (
      <span key={tag} className="tag">
        #{tag}
      </span>
    ));
    tags = <div className="tags">{tags}</div>;
  }

  // Get localized job title using locale
  const jobTitle = props.jobTitle['fr'];

  return (
    <div className="Experience">
      <h2 className="title">{jobTitle}</h2>
      <span className="year">
        {props.startYear} {endYear} {company}{' '}
      </span>
      {tags}
    </div>
  );
}
