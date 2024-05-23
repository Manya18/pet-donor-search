import styles from "./menu.module.css"
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const scrollToAnchor = (anchorId: string) => {
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, anchorId:string) => {
    event.preventDefault();
    if (document.location.pathname !== '/') {
      navigate('/');
    }
    scrollToAnchor(anchorId);
  };

  return (
    <nav className={styles.menu}>
      <ul className={styles.menu__list}>
        <li className={styles.menu__item}>
          <a href="/announcements" >Объявления</a>
        </li>
        <li className={styles.menu__item}>
          <a href="#advice" onClick={(e) => handleClick(e, 'advice')}>Советы</a>
        </li>
        <li className={styles.menu__item}>
          <a href="#new" onClick={(e) => handleClick(e, 'new')}>Новости</a>
        </li>
        <li className={styles.menu__item}>
          <a href="#event" onClick={(e) => handleClick(e, 'event')}>Мероприятия</a>
        </li>
        <li className={styles.menu__item}>
          <a href="#place" onClick={(e) => handleClick(e, 'place')}>Где сдать кровь?</a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
