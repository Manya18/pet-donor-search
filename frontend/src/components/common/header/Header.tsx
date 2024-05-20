import Logo from "../logo/Logo";
import profile from "../../../images/profile.png";
import styles from "./header.module.css";
import Menu from "../menu/Menu";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Logo />
        <Menu />
        <div className={styles.header__profile}>
          <button className={styles.header__profile__button}>
            <a href="/start">
              <img src={profile} alt="profile"></img>
            </a>
          </button>
        </div>
      </div>
      <hr className={styles.hr} />
    </header>
  );
};

export default Header;
