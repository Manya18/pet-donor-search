import Logo from "@common/logo/Logo";
import Menu from "@common/menu/Menu";
import vk from "@images/vk.png";
import tg from "@images/tg.png";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.container}>
          <Logo />
          <Menu />
        </div>
        <hr className={styles.hr} />
        <div className={styles.container}>
          <p className={styles.footer__rights}>
            PetsDonorSearch © 2024
            <br /> Все права защищены <br />
            Прочтите нашу 
            <a href="#"> политику конфиденциальности</a>
             и 
            <a href="#">пользовательское соглашение</a>
          </p>
          <div className={styles.contacts__group}>
            <a href="#">
              <img src={vk} alt="vk icon" className={styles.contact}></img>
            </a>
            <a href="#">
              <img src={tg} alt="tg icon" className={styles.contact}></img>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
