import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./sliderForThree.module.css";
import { SliderType } from "../../../types/sliderType";
import { useState } from "react";
import Modal from "react-modal";

const orgID = sessionStorage.getItem('organisationID');
const userID = sessionStorage.getItem('userID');

const SliderForThree = ({
  elems,
  title,
  sectionName,
  buttonText,
  modalContent,
}: SliderType) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className={styles.slider_wrapper}>
      <div className={styles.slider__header}>
        <h1 id={sectionName} className={styles.slider__title}>
          {title}
        </h1>
        {orgID && sectionName !== 'advice' || sectionName === 'advice' && userID && !orgID ? (
        <button className={styles.create__button} onClick={() => openModal()}>
          {buttonText}
        </button>
        ) : (
          <div/>
        )}
      </div>
      <Slider {...settings}>
        {elems.map((elem, index) => (
          <div key={index} className={styles.slide}>
            {elem}
          </div>
        ))}
      </Slider>
      <Modal
        style={{
          content: { width: "500px", marginLeft: "auto", marginRight: "auto" },
        }}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default SliderForThree;
