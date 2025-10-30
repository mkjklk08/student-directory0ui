import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';

export function Header() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const initial = saved === 'light' ? 'light' : 'dark';
    setTheme(initial);
    document.body.classList.toggle('theme-light', initial === 'light');
  }, []);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.body.classList.toggle('theme-light', next === 'light');
  }

  return (
    <header className="header">
      <h1 className="header__title">Student Directory</h1>
      <nav className="header__nav">
        <NavLink to="/" className="header__link">
          <span>Home</span>
        </NavLink>
        <NavLink to="/form" className="header__link">
          <span>Validation</span>
        </NavLink>
        <label className="themeSwitch" aria-label="Toggle theme">
          <input type="checkbox" checked={theme === 'light'} onChange={toggleTheme} />
          <span className="themeSwitch__slider" />
          <span className="themeSwitch__label">{theme === 'light' ? 'Light' : 'Dark'}</span>
        </label>
      </nav>
    </header>
  );
}
