import React from "react";
import Advice from "../../components/advice/Advice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./adviceSlider.module.css";

const AdviceSlider = () => {
  const items = [<Advice />, <Advice />, <Advice />, <Advice />];
  const settings = {
    dots: false,
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
        },
      },
    ],
  };
  return (
    <div>
      <h1 className={styles.slider__header}>Советы от доноров</h1>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className={styles.slide}>
            {item}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AdviceSlider;
