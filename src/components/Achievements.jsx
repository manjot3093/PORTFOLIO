import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiAward, FiCode, FiCpu, FiZap } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  {
    icon: FiZap,
    title: "Elite Coder",
    desc: "Recognized for consistent high-level performance in competitive programming and problem solving.",
  },
  {
    icon: FiAward,
    title: "Hackathon Winner",
    desc: "Built and shipped a working prototype under time pressure, placing among top teams.",
  },
  {
    icon: FiCpu,
    title: "JP Morgan C++ Certification",
    desc: "Completed JP Morgan's Software Engineering Job Simulation focused on C++ and systems thinking.",
  },
  {
    icon: FiCode,
    title: "College Achievements",
    desc: "Consistent academic and technical recognition throughout the CSE program.",
  },
];

export default function Achievements() {
  useEffect(() => {
    gsap.fromTo(
      ".achv-card",
      { opacity: 0, y: 40, rotateX: -10 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "#achievements", start: "top 75%" },
      }
    );
  }, []);

  return (
    <section id="achievements" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <p className="text-accent-cyan font-display tracking-widest text-sm mb-3 text-center">
          RECOGNITION
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-16">
          Achievements
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.title}
              data-cursor-hover
              className="achv-card gradient-border glass rounded-2xl p-8 hover:shadow-glow transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-grad-primary flex items-center justify-center text-2xl mb-5">
                <a.icon />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                {a.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
