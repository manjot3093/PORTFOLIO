import { useEffect, useState } from "react";
import { FiHome, FiUser, FiCode, FiFolder, FiAward, FiGithub, FiMail } from "react-icons/fi";

const ITEMS = [
  { id: "home", label: "Go to Home", icon: FiHome },
  { id: "about", label: "Go to About", icon: FiUser },
  { id: "skills", label: "Go to Skills", icon: FiCode },
  { id: "projects", label: "Go to Projects", icon: FiFolder },
  { id: "achievements", label: "Go to Achievements", icon: FiAward },
  { id: "github", label: "Go to GitHub Stats", icon: FiGithub },
  { id: "contact", label: "Go to Contact", icon: FiMail },
];

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose(true);
      }
      if (e.key === "Escape") onClose(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  const filtered = ITEMS.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
    onClose(false);
    setQuery("");
  };

  return (
    <div
      className="fixed inset-0 z-[95] flex items-start justify-center pt-32 bg-black/60 backdrop-blur-sm"
      onClick={() => onClose(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg glass-strong rounded-2xl shadow-glow overflow-hidden"
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command or search..."
          className="w-full bg-transparent px-6 py-4 outline-none border-b border-white/10 placeholder:text-white/30"
        />
        <div className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="px-6 py-4 text-white/40 text-sm">No results.</p>
          )}
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="w-full flex items-center gap-3 px-6 py-3 hover:bg-white/5 transition-colors text-left"
            >
              <item.icon className="text-accent-cyan" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
