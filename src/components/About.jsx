import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Counter({ to, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          val: to,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => (el.textContent = Math.floor(obj.val)),
        }),
    });
  }, [to]);

  return (
    <div className="text-center">
      <p ref={ref} className="font-display text-3xl md:text-4xl font-bold text-gradient">
        0
      </p>
      <p className="text-white/50 text-sm mt-1">{label}</p>
    </div>
  );
}

const TIMELINE = [
  {
    year: "Now",
    title: "B.Tech, Computer Science",
    desc: "Building full-stack products and deepening backend + AI fundamentals.",
  },
  {
    year: "Focus",
    title: "Web, Backend & Cloud",
    desc: "Shipping production apps end-to-end — from UI to APIs to deployment.",
  },
  {
    year: "Always",
    title: "Problem Solving",
    desc: "Consistent DSA practice and competitive problem solving across platforms.",
  },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".about-img",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      }
    );
    gsap.fromTo(
      ".timeline-item",
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: { trigger: ".timeline-wrap", start: "top 80%" },
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="about-img relative mx-auto w-72 h-72 md:w-96 md:h-96">
          <div className="absolute -inset-1 rounded-3xl bg-grad-primary opacity-60 blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-3xl overflow-hidden glass-strong flex items-center justify-center">
            <span className="font-display text-6xl text-white/20">MS</span>
          </div>
        </div>

        <div>
          <p className="text-accent-cyan font-display tracking-widest text-sm mb-3">
            ABOUT ME
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Turning ideas into{" "}
            <span className="text-gradient">shipped software</span>
          </h2>
          <p className="text-white/60 leading-relaxed mb-8">
            I'm a Computer Science undergrad (B.Tech) with a passion for
            web development, backend engineering, AI, and cloud systems. I
            care about clean architecture, smooth interfaces, and code that
            holds up in production — not just in a demo.
          </p>

          <div className="timeline-wrap space-y-5 mb-10">
            {TIMELINE.map((item) => (
              <div
                key={item.title}
                className="timeline-item flex gap-4 border-l-2 border-accent-purple/40 pl-5"
              >
                <div>
                  <p className="text-xs font-display text-accent-purple">
                    {item.year}
                  </p>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 gradient-border glass rounded-2xl p-6">
            <Counter to={30} label="Repositories" />
            <Counter to={300} label="Problems Solved" />
            <Counter to={10} label="Technologies" />
          </div>
        </div>
      </div>
    </section>
  );
}
