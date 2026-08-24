import holbertonLogo from '../assets/holberton-logo.jpg'
import './Header.css'

function Header() {
  return (
    <div className="header">
      <header className="Header">
        <img src={holbertonLogo} alt="Holberton logo" />
        <h1>School dashboard</h1>
      </header>

  </div>
  );
}

export default Header;
