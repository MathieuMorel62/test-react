import holbertonLogo from '../assets/holberton-logo.jpg'

function Header() {
  return (
    <div className="header">
      <header className="Header flex flex-col items-start gap-3 border-b-2 border-[var(--main-color)] p-3 min-[520px]:flex-row min-[520px]:items-center min-[520px]:gap-5 min-[520px]:p-5">
        <img className="w-24 min-[520px]:w-[150px]" src={holbertonLogo} alt="Holberton logo" />
        <h1 className="m-0 text-2xl text-[var(--main-color)] min-[520px]:text-[2rem]">School dashboard</h1>
      </header>

  </div>
  );
}

export default Header;
