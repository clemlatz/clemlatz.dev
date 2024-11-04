import './Links.css';

export default function Links() {
  const links = {
    Mastodon: 'https://mastodon.social/@clemlatz',
    Github: 'https://github.com/clemlatz',
    'Linked in': 'https://www.linkedin.com/in/clemlatz/',
    Bluesky: 'https://bsky.app/profile/clemlatz.dev',
    Medium: 'https://medium.com/@clemlatz',
    StackOverflow: 'https://stackoverflow.com/users/1053818/clemlatz',
    Twitter: 'https://twitter.com/clemlatz',
  };
  const list = Object.entries(links).map(([title, url]) => (
    <li key={url}>
      <a href={url} target="_blank" rel="me noopener noreferrer">
        {title}
      </a>
    </li>
  ));

  return (
    <div>
      <ul className="links">{list}</ul>
    </div>
  );
}
