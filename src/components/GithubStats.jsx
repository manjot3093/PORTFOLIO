import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiUsers, FiUserPlus, FiFolder, FiStar } from "react-icons/fi";
import useGithub from "../hooks/useGithub";

gsap.registerPlugin(ScrollTrigger);

const LANG_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3776ab",
  "C++": "#00599c",
  Java: "#ea2d2e",
  HTML: "#e34c26",
  CSS: "#264de4",
};

function StatCard({ icon: Icon, label, value, loading }) {
  return (
    <div className="gradient-border glass rounded-2xl p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-grad-primary flex items-center justify-center text-xl shrink-0">
        <Icon />
      </div>
      <div>
        <p className="font-display text-2xl font-bold">
          {loading ? "—" : value}
        </p>
        <p className="text-white/50 text-sm">{label}</p>
      </div>
    </div>
  );
}

export default function GithubStats() {
  const { loading, error, profile, repos, languages } = useGithub();

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const recent = [...repos]
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 5);

  useEffect(() => {
    if (loading) return;
    gsap.fromTo(
      ".lang-bar",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        transformOrigin: "left",
        scrollTrigger: { trigger: "#github", start: "top 70%" },
      }
    );
  }, [loading]);

  return (
    <section id="github" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <p className="text-accent-cyan font-display tracking-widest text-sm mb-3 text-center">
          LIVE FROM GITHUB
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-14">
          GitHub <span className="text-gradient">Analytics</span>
        </h2>

        {error && (
          <p className="text-center text-red-400/80 text-sm mb-10">{error}</p>
        )}

        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          {/* Profile card */}
          <div className="gradient-border glass rounded-2xl p-6 text-center flex flex-col items-center">
            {loading ? (
              <div className="w-24 h-24 rounded-full bg-white/5 animate-pulse mb-4" />
            ) : (
              <img
                src={profile?.avatar_url}
                alt={profile?.login}
                className="w-24 h-24 rounded-full mb-4 border-2 border-accent-purple/60"
              />
            )}
            <p className="font-display font-semibold text-lg">
              {loading ? "Loading..." : profile?.name || profile?.login}
            </p>
            <p className="text-white/50 text-sm mt-2">
              {loading ? "" : profile?.bio}
            </p>
            <a
              href={profile?.html_url || "https://github.com/manjot3093"}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="mt-4 text-xs text-accent-cyan underline underline-offset-4"
            >
              View Profile →
            </a>
          </div>

          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-5">
              <StatCard
                icon={FiUsers}
                label="Followers"
                value={profile?.followers}
                loading={loading}
              />
              <StatCard
                icon={FiUserPlus}
                label="Following"
                value={profile?.following}
                loading={loading}
              />
              <StatCard
                icon={FiFolder}
                label="Public Repos"
                value={profile?.public_repos}
                loading={loading}
              />
              <StatCard
                icon={FiStar}
                label="Total Stars"
                value={totalStars}
                loading={loading}
              />
            </div>

            {!loading && languages.length > 0 && (
              <div className="gradient-border glass rounded-2xl p-6">
                <h3 className="font-display mb-4 text-white/80">
                  Top Languages
                </h3>
                <div className="space-y-3">
                  {languages.slice(0, 6).map((l) => (
                    <div key={l.language}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{l.language}</span>
                        <span className="text-white/40">{l.percent}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="lang-bar h-full rounded-full"
                          style={{
                            width: `${l.percent}%`,
                            background:
                              LANG_COLORS[l.language] || "#8b5cf6",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loading && recent.length > 0 && (
              <div className="gradient-border glass rounded-2xl p-6">
                <h3 className="font-display mb-4 text-white/80">
                  Recently Updated
                </h3>
                <ul className="space-y-3">
                  {recent.map((r) => (
                    <li key={r.id}>
                      <a
                        href={r.html_url}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor-hover
                        className="flex justify-between text-sm hover:text-accent-cyan transition-colors"
                      >
                        <span>{r.name}</span>
                        <span className="text-white/30">
                          {new Date(r.updated_at).toLocaleDateString()}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
