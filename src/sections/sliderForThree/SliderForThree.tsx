import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./sliderForThree.module.css";
import { SliderType } from "../../types/sliderType";

const SliderForThree = (props: SliderType) => {
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
      <h1 className={styles.slider__header}>{props.title}</h1>
      <Slider {...settings}>
        {props.elems.map((elem, index) => (
          <div key={index} className={styles.slide}>
            {elem}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderForThree;
