import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./sliderForThree.module.css";
import { SliderType } from "../../../types/sliderType";

const SliderForThree = ({ elems, title, sectionName }: SliderType) => {
  console.log(elems, title);
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
      <h1 id={sectionName} className={styles.slider__header}>
        {title}
      </h1>
      <Slider {...settings}>
        {elems.map((elem, index) => (
          <div key={index} className={styles.slide}>
            {elem}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderForThree;
