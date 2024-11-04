import React, { useState, useEffect } from 'react';
import './css/Hero.css';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    'https://lh3.googleusercontent.com/p/AF1QipOKYUSMgVhH65rpLD_S0fN7E_Nn5H06skrFACBT=s1360-w1360-h1020',
    'https://scontent.fisb9-1.fna.fbcdn.net/v/t39.30808-6/461772643_551531807222501_3287055501509344859_n.jpg?stp=dst-jpg_s720x720&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=n1SY0qxuKLwQ7kNvgH5umP3&_nc_zt=23&_nc_ht=scontent.fisb9-1.fna&_nc_gid=A9eiJqns-XsMWyiD1CxwWjV&oh=00_AYDV9ZavJSe2sgYXNkw2Gupw8yHh-YO6jLRssi7XdyZVog&oe=6724147F',
    'https://scontent.fisb9-1.fna.fbcdn.net/v/t39.30808-6/386600561_345196567856027_1208787795912616621_n.jpg?stp=dst-jpg_s960x960&_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=fJLwUJIyj74Q7kNvgFWEoI7&_nc_zt=23&_nc_ht=scontent.fisb9-1.fna&_nc_gid=AhAyVnalxrVcEnrmWaqvloU&oh=00_AYCzZZFLea4GXbmJ6oAej6h3jAWSMTHZdL0e6qe6ow3RQQ&oe=67244428'
  ];

  // Automatically transition to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <div
        className="carousel-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="carousel-slide" key={index}>
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Remove the button if not needed, or keep them for manual control */}
      <button className="prev-slide" onClick={prevSlide}>❮</button>
      <button className="next-slide" onClick={nextSlide}>❯</button>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Hero;
