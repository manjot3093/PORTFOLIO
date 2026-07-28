import { useEffect, useState } from "react";
import { FiCommand } from "react-icons/fi";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ onOpenPalette }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[60] transition-transform duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`mx-auto mt-4 max-w-6xl rounded-full px-4 md:px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "glass-strong shadow-glow py-2" : "py-3"
        }`}
      >
        <button
          onClick={() => scrollTo("home")}
          className="font-display font-bold text-lg tracking-tight"
          data-cursor-hover
        >
          <span className="text-gradient">MS</span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              data-cursor-hover
              className={`relative px-4 py-2 text-sm rounded-full transition-colors ${
                active === id
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {active === id && (
                <span className="absolute inset-0 rounded-full bg-white/10 -z-10" />
              )}
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={onOpenPalette}
          data-cursor-hover
          className="glass flex items-center gap-2 rounded-full px-3 py-2 text-xs text-white/70 hover:text-white transition"
        >
          <FiCommand />
          <span className="hidden md:inline">⌘K</span>
        </button>
      </div>
    </header>
  );
}
