
import { useEffect, useRef } from 'react';
import SplashCursor from './SplashCursor';
import './CustomCursor.css';

function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    );

    if (!mediaQuery.matches) return;

    const outer = outerRef.current;
    const inner = innerRef.current;

    if (!outer || !inner) return;

    document.body.classList.add('custom-cursor-enabled');

    let mouseX = -100;
    let mouseY = -100;
    let outerX = -100;
    let outerY = -100;
    let innerX = -100;
    let innerY = -100;
    let animationFrame;

    const handlePointerMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      outer.classList.add('is-visible');
      inner.classList.add('is-visible');

      const interactive = event.target.closest(
        'a, button, [role="button"], input, textarea, select, label'
      );

      outer.classList.toggle('is-hovering', Boolean(interactive));
      inner.classList.toggle('is-hovering', Boolean(interactive));
    };

    const handlePointerDown = () => {
      outer.classList.remove('is-clicking');
      void outer.offsetWidth;
      outer.classList.add('is-clicking');
    };

    const handleAnimationEnd = () => {
      outer.classList.remove('is-clicking');
    };

    const animate = () => {
      outerX += (mouseX - outerX) * 0.14;
      outerY += (mouseY - outerY) * 0.14;

      innerX += (mouseX - innerX) * 0.38;
      innerY += (mouseY - innerY) * 0.38;

      outer.style.transform =
        `translate3d(${outerX}px, ${outerY}px, 0) translate(-50%, -50%)`;

      inner.style.transform =
        `translate3d(${innerX}px, ${innerY}px, 0) translate(-50%, -50%)`;

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    outer.addEventListener('animationend', handleAnimationEnd);

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      outer.removeEventListener('animationend', handleAnimationEnd);
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  return (
    <>
      <SplashCursor
        rainbow={false}
        size={0.75}
        force={0.45}
        swirl={3}
        trail={0.7}
        clickSplash
        colorSpeed={1}
        intensity={0.85}
        momentum={1}
        shading={1}
        glow={0}
        quality="high"
        intro
        contained={false}
      />

      <div className="custom-cursor">
        <div
          ref={outerRef}
          className="custom-cursor__outer"
        />
        <div
          ref={innerRef}
          className="custom-cursor__inner"
        />
      </div>
    </>
  );
}

export default CustomCursor;
