import './Header.css';

export default function Header() {
  return (
    <header className="Header">
      <h1 className="title">
        <a href="/">Clément Latzarus</a>
      </h1>
      <p className="tagline">
        a.k.a.{' '}
        <a
          href="https://github.com/clemlatz"
          target="_blank"
          rel="noopener noreferrer"
        >
          clemlatz
        </a>{' '}
        · développeur web
      </p>
      <nav className="navigation">
        <ul>
          <li>
            <a href="https://blog.clemlatz.dev">Blog</a>
          </li>
          <li>
            <a href="/career">
              Parcours
            </a>
          </li>
          <li>
            <a href="/links">
              Liens
            </a>
          </li>
          <li>
            <a href="/contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
