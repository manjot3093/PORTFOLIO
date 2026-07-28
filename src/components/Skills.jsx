import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  SiCplusplus,
  SiOpenjdk,
  SiJavascript,
  SiPython,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiPostman,
  SiDocker,
  SiRender,
  SiVercel,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    title: "Languages",
    items: [
      { name: "C++", icon: SiCplusplus },
      { name: "Java", icon: SiOpenjdk },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Python", icon: SiPython },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "React", icon: SiReact },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "VS Code", icon: VscVscode },
      { name: "Postman", icon: SiPostman },
      { name: "Docker", icon: SiDocker },
      { name: "Render", icon: SiRender },
      { name: "Vercel", icon: SiVercel },
    ],
  },
];

function SkillCard({ name, Icon }) {
  const cardRef = useRef(null);

  const onMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, {
      rotateY: x / 12,
      rotateX: -y / 12,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 600,
    });
  };
  const onLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor-hover
      className="skill-card gradient-border glass rounded-2xl p-5 flex flex-col items-center gap-3 hover:shadow-glow transition-shadow duration-300"
    >
      <Icon className="text-3xl text-accent-cyan" />
      <p className="text-sm text-white/70">{name}</p>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".skill-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.04,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-padding">
      <div className="max-w-6xl mx-auto">
        <p className="text-accent-cyan font-display tracking-widest text-sm mb-3 text-center">
          WHAT I WORK WITH
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-16">
          Skills & <span className="text-gradient">Technologies</span>
        </h2>

        <div className="space-y-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <h3 className="font-display text-lg text-white/70 mb-5">
                {cat.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {cat.items.map((item) => (
                  <SkillCard key={item.name} name={item.name} Icon={item.icon} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
