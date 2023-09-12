import logo from '../../images/logo.svg';

function Header() {
  return (
    <header>
      <img src={ logo } alt="logo Trybe News" />
      <div>
        <h1> TRYBE NEWS</h1>
      </div>
    </header>
  );
}

export default Header;
