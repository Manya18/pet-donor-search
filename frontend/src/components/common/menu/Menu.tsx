import styles from "./menu.module.css"

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <ul className={styles.menu__list}>
        <li className={styles.menu__item}>
          <a href="/announcements">Объявления</a>
        </li>
        <li className={styles.menu__item}>
          <a href="#">Информация</a>
        </li>
        <li className={styles.menu__item}>
          <a href="#">Советы</a>
        </li>
        <li className={styles.menu__item}>
          <a href="#">Мероприятия</a>
        </li>
        <li className={styles.menu__item}>
          <a href="#">Где сдать кровь?</a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
