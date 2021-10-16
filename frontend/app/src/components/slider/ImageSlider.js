import React, { useState } from "react";
import { SliderData } from "../slider/Sliderdata";
import "./slider.css";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/lib/styles.css";
import "react-owl-carousel2/src/owl.theme.default.css";

const options = {
  items: 1,
  nav: true,
  rewind: true,
  autoplay: true,
};
const ImageSlider = ({ slides }) => {
  const length = slides.length;

  return (
    <div>
      <div className="col-md-12">
        <section className="slider">
          <OwlCarousel options={options}>
            {SliderData.map((slider, index) => {
              return (
                <div key={index}>
                  <img
                    src={slider.image}
                    alt="slider images"
                    className="image"
                  />
                </div>
              );
            })}
          </OwlCarousel>
        </section>
      </div>
    </div>
  );
};

export default ImageSlider;
