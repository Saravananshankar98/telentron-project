import React, { useState } from "react";
import "./slider.css";

const Slider = () => {
  const sliders = [
    {
      video: "/video/1.mp4",
      title: "Hi Candidate!",
      subtitle: "Are you looking for a Job?",
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic, or web designs.",
      buttonText: "Job Seeker",
    },
    {
      video: "/video/2.mp4",
      title: "Welcome Back!",
      subtitle: "Discover amazing opportunities.",
      description:
        "This is a platform where you can find your dream job. Explore new possibilities and start your career journey today.",
      buttonText: "Trainer",
    },
    {
      video: "/video/3.mp4",
      title: "Join Us!",
      subtitle: "Your future starts here.",
      description:
        "We connect you with top companies and the best jobs. Take the first step towards your dream career with us.",
      buttonText: "Employer",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? sliders.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % sliders.length);
  };

  const currentSlide = sliders[currentIndex];

  return (
    <div className="slider-container">
      {/* Video */}
      <video
        src={currentSlide.video}
        className="slider-video"
        autoPlay
        loop
        muted
      ></video>

      {/* Overlay Text */}
      <div className="slider-content">
        <h1>{currentSlide.title}</h1>
        <h2>{currentSlide.subtitle}</h2>
        <p>{currentSlide.description}</p>
        <button className="box">{currentSlide.buttonText}</button>
      </div>

      {/* Arrows */}
      <img
        src="/leftarrow.png"
        className="left-arrow"
        alt="<"
        onClick={goToPrevious}
      />
      <img
        src="/rightarrow.png"
        className="right-arrow"
        alt=">"
        onClick={goToNext}
      />
    </div>
  );
};

export default Slider;
