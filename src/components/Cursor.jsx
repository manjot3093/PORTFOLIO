import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };

    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.05 });
    };

    let raf;
    const render = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.15;
      ringPos.y += (pos.y - ringPos.y) * 0.15;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      raf = requestAnimationFrame(render);
    };
    render();

    const onEnter = () => {
      gsap.to(ring, { scale: 2.4, opacity: 0.5, duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };
    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.15 });

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    document
      .querySelectorAll("a, button, [data-cursor-hover]")
      .forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[90] w-10 h-10 -ml-5 -mt-5 rounded-full border border-accent-purple/70 pointer-events-none mix-blend-difference"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[90] w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent-cyan shadow-glow-cyan pointer-events-none"
      />
    </div>
  );
}
