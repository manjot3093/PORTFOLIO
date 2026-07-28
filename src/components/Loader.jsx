import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const rootRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    tl.to(counter, {
      val: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.floor(counter.val)),
    });

    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 2.2, ease: "power2.inOut", transformOrigin: "left" }
    );

    gsap.fromTo(
      ".loader-logo",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
    >
      <div className="loader-logo font-display text-3xl md:text-5xl font-bold tracking-tight">
        <span className="text-gradient">MS</span>
        <span className="text-white/40">.dev</span>
      </div>

      <div className="mt-8 w-56 md:w-72 h-[2px] bg-white/10 overflow-hidden rounded-full">
        <div
          ref={barRef}
          className="h-full w-full bg-grad-primary rounded-full"
        />
      </div>

      <div className="mt-4 font-display text-sm text-white/50 tabular-nums">
        {progress}%
      </div>
    </div>
  );
}
