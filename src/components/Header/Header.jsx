import './Header.css';

export default function Header() {
  return (
    <header className="Header">
      <div className="Header__title">
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
      </div>

      <nav className="Header__navigation">
        <ul>
          <li>
            <a href="https://blog.clemlatz.dev">blog</a>
          </li>
          <li>
            <a href="/career">
              parcours
            </a>
          </li>
          <li>
            <a href="/projects">
              projets
            </a>
          </li>
          <li>
            <a href="/links">
              liens
            </a>
          </li>
          <li>
            <a href="/contact">
              contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
