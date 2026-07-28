import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  FiStar,
  FiGitBranch,
  FiExternalLink,
  FiSearch,
  FiGrid,
  FiList,
} from "react-icons/fi";
import useGithub from "../hooks/useGithub";

gsap.registerPlugin(ScrollTrigger);

function Skeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-56 rounded-2xl glass animate-pulse bg-white/[0.02]"
        />
      ))}
    </div>
  );
}

function RepoCard({ repo, featured }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      data-cursor-hover
      className={`project-card group relative gradient-border glass rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${
        featured ? "ring-1 ring-accent-purple/40" : ""
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-6 text-[10px] tracking-widest font-display bg-grad-primary rounded-full px-3 py-1">
          MAJOR PROJECT
        </span>
      )}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-lg truncate pr-2">
            {repo.name}
          </h3>
          <FiExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </div>
        <p className="text-sm text-white/50 line-clamp-2 min-h-[2.5rem]">
          {repo.description || "No description provided."}
        </p>

        {repo.topics?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {repo.topics.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-1 rounded-full bg-white/5 text-accent-cyan"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-6 text-xs text-white/50">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <FiStar /> {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <FiGitBranch /> {repo.forks_count}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {repo.language && (
            <span className="w-2 h-2 rounded-full bg-accent-purple" />
          )}
          <span>{repo.language}</span>
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const { loading, error, repos, featured } = useGithub();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("updated");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState("grid");

  const languages = useMemo(() => {
    const set = new Set(repos.map((r) => r.language).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [repos]);

  const filtered = useMemo(() => {
    let list = repos.filter((r) => !r.fork);
    if (category !== "all") list = list.filter((r) => r.language === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q)
      );
    }
    if (sortBy === "stars") {
      list = [...list].sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else {
      list = [...list].sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
    }
    return list;
  }, [repos, query, sortBy, category]);

  useEffect(() => {
    if (loading) return;
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        scrollTrigger: { trigger: "#projects", start: "top 70%" },
      }
    );
  }, [loading, filtered.length]);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <p className="text-accent-cyan font-display tracking-widest text-sm mb-3 text-center">
          FEATURED WORK
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">
          Major <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-white/50 text-center max-w-xl mx-auto mb-14">
          Auto-selected from my{" "}
          <a
            href="https://github.com/manjot3093"
            target="_blank"
            rel="noreferrer"
            className="text-accent-cyan underline underline-offset-4"
          >
            live GitHub profile
          </a>{" "}
          — ranked by stars, forks, and recency, so it's always current.
        </p>

        {loading && <Skeleton />}
        {error && (
          <p className="text-center text-red-400/80 text-sm mb-10">{error}</p>
        )}

        {!loading && !error && (
          <>
            {featured.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {featured.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} featured />
                ))}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
              <h3 className="font-display text-xl">All Repositories</h3>
              <div className="flex flex-wrap items-center gap-3">
                <div className="glass rounded-full flex items-center gap-2 px-4 py-2">
                  <FiSearch className="text-white/40" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search repos..."
                    className="bg-transparent outline-none text-sm placeholder:text-white/30 w-32 md:w-48"
                  />
                </div>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="glass rounded-full px-4 py-2 text-sm outline-none bg-surface"
                >
                  {languages.map((l) => (
                    <option key={l} value={l} className="bg-surface">
                      {l === "all" ? "All Languages" : l}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="glass rounded-full px-4 py-2 text-sm outline-none bg-surface"
                >
                  <option value="updated" className="bg-surface">
                    Latest
                  </option>
                  <option value="stars" className="bg-surface">
                    Stars
                  </option>
                </select>

                <div className="glass rounded-full flex p-1">
                  <button
                    onClick={() => setView("grid")}
                    data-cursor-hover
                    className={`p-2 rounded-full ${
                      view === "grid" ? "bg-white/10" : ""
                    }`}
                  >
                    <FiGrid />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    data-cursor-hover
                    className={`p-2 rounded-full ${
                      view === "list" ? "bg-white/10" : ""
                    }`}
                  >
                    <FiList />
                  </button>
                </div>
              </div>
            </div>

            <div
              className={
                view === "grid"
                  ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filtered.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-white/40 py-12">
                No repositories match your filters.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
