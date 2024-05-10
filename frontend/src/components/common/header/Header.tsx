import Logo from "@common/logo/Logo";
import profile from "@images/profile.png";
import styles from "./header.module.css";
import Menu from "@common/menu/Menu";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Logo />
        <Menu />
        <div className={styles.header__profile}>
          <button className={styles.header__profile__button}>
            <img src={profile} alt="profile"></img>
          </button>
        </div>
      </div>
      <hr className={styles.hr} />
    </header>
  );
};

export default Header;
