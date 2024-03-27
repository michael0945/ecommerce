import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import classes from "./Carousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Carousell() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemsLink) => {
          return <img key={imageItemsLink} src={imageItemsLink} alt="" />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default Carousell;
