import { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const scrollTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8 px-6">
      <div className="h-px w-full max-w-6xl mx-auto bg-grad-primary opacity-50 absolute top-0 left-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-xl text-gradient">
            Manjot Singh
          </p>
          <p className="text-white/40 text-sm mt-1">
            Full Stack Developer · Software Engineer
          </p>
        </div>

        <div className="flex items-center gap-5 text-xl text-white/60">
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

        <button
          onClick={scrollTop}
          data-cursor-hover
          className="glass rounded-full p-3 hover:shadow-glow transition-shadow"
          aria-label="Back to top"
        >
          <FiArrowUp />
        </button>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 mt-10 text-xs text-white/30">
        <p>© {new Date().getFullYear()} Manjot Singh. All rights reserved.</p>
        <p className="tabular-nums">
          Local time: {time.toLocaleTimeString()}
        </p>
      </div>
    </footer>
  );
}
