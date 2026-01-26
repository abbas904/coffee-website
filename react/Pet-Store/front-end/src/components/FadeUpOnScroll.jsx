import { useEffect, useRef, useState } from "react";

const FadeUpOnScroll = ({ children, delay = 0, duration = 800, scale = 1.03 }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`opacity-0 transform translate-y-6 transition-all`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDelay: `${delay}ms`,
        transform: isVisible ? `translateY(0px) scale(1)` : `translateY(24px) scale(0.95)`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

export default FadeUpOnScroll;
