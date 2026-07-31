import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Luxury car slides data
const slidesData = [
  {
    image: 'https://images.unsplash.com/photo-1633650915954-dafa15a419e4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop',
    title: 'Lamborghini Aventador',
    description: '770 HP • 217 mph • V12 Engine',
  },
  {
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1000&auto=format&fit=crop',
    title: 'Rolls-Royce Ghost',
    description: 'Handcrafted • Serenity • 563 HP',
  },
  {
    image: 'https://images.unsplash.com/photo-1730110206438-84d983766aa1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Ferrari F8 Tributo',
    description: '710 HP • Italian Passion • 211 mph',
  },
  {
    image: 'https://images.unsplash.com/photo-1618642542397-ef97a739f1d7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=1000&auto=format&fit=crop',
    title: 'Bentley Continental GT',
    description: 'Luxury • Performance • 626 HP',
  },
  {
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop',
    title: 'Porsche 911 Turbo S',
    description: 'Precision • Timeless • 640 HP',
  },
];

const GetStarted: React.FC = () => {
  const extendedSlides = [
    slidesData[slidesData.length - 1],
    ...slidesData,
    slidesData[0],
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const getOriginalIndex = (extendedIndex: number): number => {
    if (extendedIndex === 0) return slidesData.length - 1;
    if (extendedIndex === extendedSlides.length - 1) return 0;
    return extendedIndex - 1;
  };

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
    },
    [isTransitioning]
  );

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);

    if (currentIndex === extendedSlides.length - 1) {
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        setCurrentIndex(1);
        setTimeout(() => {
          if (trackRef.current) {
            trackRef.current.style.transition = '';
          }
        }, 50);
      }
    }

    if (currentIndex === 0) {
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        setCurrentIndex(extendedSlides.length - 2);
        setTimeout(() => {
          if (trackRef.current) {
            trackRef.current.style.transition = '';
          }
        }, 50);
      }
    }
  }, [currentIndex, extendedSlides.length]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const pauseAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resumeAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000);
  };

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const handleDotClick = (dotIndex: number) => {
    const targetIndex = dotIndex + 1;
    goToSlide(targetIndex);
  };

  const activeDotIndex = getOriginalIndex(currentIndex);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background-color: #0a0a0a;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .app-getstarted {
          width: 100%;
          max-width: 500px;
          height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 100%);
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
          position: relative;
          margin: 0 auto;
          overflow: hidden;
        }

        .slider-container {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .carousel {
          display: flex;
          height: 100%;
          width: 100%;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slide {
          flex: 0 0 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .slide::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
          pointer-events: none;
        }

        .slide-content {
          position: absolute;
          bottom: 140px;
          left: 28px;
          right: 28px;
          color: white;
          text-shadow: 0 4px 20px rgba(0,0,0,0.6);
          z-index: 2;
          animation: fadeInUp 0.6s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slide-content h2 {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
          font-family: 'Playfair Display', serif;
          background: linear-gradient(135deg, #fff 0%, #88bd1f 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .slide-content p {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.95;
          font-family: 'Inter', sans-serif;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.9);
        }

        .dots {
          position: absolute;
          bottom: 110px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          z-index: 5;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 20px;
          background-color: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
        }

        .dot:hover {
          background-color: rgba(136, 189, 31, 0.8);
          transform: scale(1.2);
        }

        .dot.active {
          width: 28px;
          background-color: #88bd1f;
          box-shadow: 0 0 12px rgba(136, 189, 31, 0.6);
        }

        .get-started-btn {
          position: absolute;
          bottom: 24px;
          left: 20px;
          right: 20px;
          background: linear-gradient(145deg, #88bd1f, #6a9c1c);
          border: none;
          border-radius: 40px;
          padding: 16px 20px;
          color: #0a0a0a;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 1px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(136, 189, 31, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          line-height: 1.2;
          border: 1px solid rgba(255,255,255,0.2);
          z-index: 10;
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-decoration: none;
        }

        .get-started-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .get-started-btn:hover::before {
          left: 100%;
        }

        .get-started-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(136, 189, 31, 0.6);
          background: linear-gradient(145deg, #a3d633, #729c1f);
        }

        .get-started-btn:active {
          transform: translateY(1px);
          box-shadow: 0 8px 20px rgba(136, 189, 31, 0.5);
        }

        .get-started-btn i {
          font-size: 18px;
          color: #0a0a0a;
          transition: transform 0.2s;
        }

        .get-started-btn:hover i {
          transform: translateX(5px);
        }

        /* Decorative elements */
        .app-getstarted::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 40%, rgba(136, 189, 31, 0.03) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        /* Loading animation for slides */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .slide {
          animation: slideIn 0.8s ease-out;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .app-getstarted {
            max-width: 100%;
          }
          
          .slide-content {
            bottom: 120px;
            left: 20px;
            right: 20px;
          }
          
          .slide-content h2 {
            font-size: 26px;
            margin-bottom: 8px;
          }
          
          .slide-content p {
            font-size: 12px;
            letter-spacing: 0.5px;
          }
          
          .dots {
            bottom: 95px;
            gap: 10px;
          }
          
          .dot {
            width: 6px;
            height: 6px;
          }
          
          .dot.active {
            width: 22px;
          }
          
          .get-started-btn {
            bottom: 20px;
            left: 16px;
            right: 16px;
            padding: 14px 18px;
            font-size: 16px;
          }
        }

        /* Tablet Optimization */
        @media (min-width: 481px) and (max-width: 768px) {
          .app-getstarted {
            max-width: 450px;
          }
          
          .slide-content h2 {
            font-size: 36px;
          }
        }

        /* Hide scrollbar for cleaner look */
        .app-getstarted::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="app-getstarted">
        <div
          className="slider-container"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          <div
            className="carousel"
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((slide, idx) => (
              <div
                key={idx}
                className="slide"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dots">
            {slidesData.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${activeDotIndex === idx ? 'active' : ''}`}
                onClick={() => handleDotClick(idx)}
              />
            ))}
          </div>

          <Link className="get-started-btn" to="/auth/signin">
            <i className="fas fa-car-side"></i>
            Get Started
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default GetStarted;