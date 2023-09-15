import logo from '../../images/logo.svg';
import styles from './header.module.css';

function Header() {
  return (
    <header className={ styles.headerContainer }>
      <div className={ styles.logoContainer }>
        <img src={ logo } alt="logo Trybe News" />
      </div>
      <div className={ styles.titleContainer }>
        <h1> TRYBE NEWS</h1>
      </div>
    </header>
  );
}

export default Header;
