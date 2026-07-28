import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import ParticleBackground from "./ParticleBackground";

const ROLES = ["Full Stack Developer", "Software Engineer", "AI Enthusiast"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const rootRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.3 });
    tl.fromTo(
      ".hero-line",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power4.out" }
    ).fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );

    gsap.to(".floating-icon", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.4,
    });
  }, []);

  // typing animation
  useEffect(() => {
    const full = ROLES[roleIndex];
    let i = 0;
    let deleting = false;
    let timeout;

    const tick = () => {
      if (!deleting) {
        i++;
        setText(full.slice(0, i));
        if (i === full.length) {
          timeout = setTimeout(() => {
            deleting = true;
            tick();
          }, 1400);
          return;
        }
      } else {
        i--;
        setText(full.slice(0, i));
        if (i === 0) {
          setRoleIndex((r) => (r + 1) % ROLES.length);
          return;
        }
      }
      timeout = setTimeout(tick, deleting ? 35 : 65);
    };
    timeout = setTimeout(tick, 65);
    return () => clearTimeout(timeout);
  }, [roleIndex]);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grad-radial"
    >
      <ParticleBackground />

      {/* floating code snippets */}
      <div className="floating-icon absolute top-28 left-[8%] hidden md:block glass rounded-xl px-4 py-3 font-mono text-xs text-accent-cyan/80 rotate-[-6deg]">
        const dev = "Manjot";
      </div>
      <div className="floating-icon absolute bottom-40 right-[10%] hidden md:block glass rounded-xl px-4 py-3 font-mono text-xs text-accent-purple/80 rotate-[5deg]">
        {"{ status: 'shipping' }"}
      </div>
      <div className="floating-icon absolute top-1/2 right-[6%] hidden lg:block glass rounded-xl px-4 py-3 font-mono text-xs text-accent-blue/80 rotate-[8deg]">
        useEffect(() =&gt; grow())
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <p className="hero-line text-white/60 text-lg mb-3">Hi 👋 I'm</p>
        <h1 className="hero-line font-display font-bold text-5xl sm:text-6xl md:text-8xl leading-tight text-gradient">
          Manjot Singh
        </h1>

        <div className="hero-line mt-6 h-10 font-display text-xl md:text-3xl text-white/85">
          {text}
          <span className="animate-pulse">|</span>
        </div>

        <p className="hero-line mt-6 max-w-xl mx-auto text-white/50">
          I design and build fast, polished, production-grade web
          experiences — from pixel-perfect interfaces to the backend
          systems powering them.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            data-cursor-hover
            className="hero-cta btn-magnetic bg-grad-primary shadow-glow hover:scale-105"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download
            data-cursor-hover
            className="hero-cta btn-magnetic glass hover:bg-white/10"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            data-cursor-hover
            className="hero-cta btn-magnetic border border-white/15 hover:border-white/40"
          >
            Contact Me
          </a>
        </div>

        <div className="hero-cta mt-10 flex items-center justify-center gap-6 text-2xl text-white/60">
          <a
            href="https://github.com/manjot3093"
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="hover:text-accent-cyan transition-colors"
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="hover:text-accent-blue transition-colors"
          >
            <FiLinkedin />
          </a>
          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="hover:text-accent-purple transition-colors"
          >
            <SiLeetcode />
          </a>
          <a
            href="mailto:hello@manjotsingh.dev"
            data-cursor-hover
            className="hover:text-accent-cyan transition-colors"
          >
            <FiMail />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
        <span className="text-xs tracking-widest">SCROLL</span>
        <FiArrowDown />
      </div>
    </section>
  );
}
