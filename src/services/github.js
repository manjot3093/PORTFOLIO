import axios from "axios";

export const GITHUB_USERNAME = "manjot3093";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: { Accept: "application/vnd.github+json" },
});

/** Basic profile info: avatar, bio, followers, following, public repo count */
export async function fetchProfile(username = GITHUB_USERNAME) {
  const { data } = await api.get(`/users/${username}`);
  return data;
}

/** All public, non-fork repos, newest first, paginated to 100 */
export async function fetchRepos(username = GITHUB_USERNAME) {
  const { data } = await api.get(`/users/${username}/repos`, {
    params: { per_page: 100, sort: "updated", direction: "desc" },
  });
  return data;
}

/**
 * Picks the "major" projects automatically — no hardcoded/placeholder names.
 * Ranking: stars desc -> forks desc -> most recently updated.
 * Excludes forks so only original work is featured.
 */
export function pickFeaturedRepos(repos, count = 4) {
  return [...repos]
    .filter((r) => !r.fork)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      if (b.forks_count !== a.forks_count) {
        return b.forks_count - a.forks_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, count);
}

/** Aggregate language usage across repos for the language breakdown chart */
export function aggregateLanguages(repos) {
  const counts = {};
  repos.forEach((r) => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  });
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(counts)
    .map(([language, count]) => ({
      language,
      count,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}
