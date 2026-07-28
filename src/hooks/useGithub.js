import { useEffect, useState } from "react";
import {
  fetchProfile,
  fetchRepos,
  pickFeaturedRepos,
  aggregateLanguages,
} from "../services/github";

/**
 * Single source of truth for all live GitHub data used across
 * the Projects and Github sections. Fetches once, shares the result.
 */
export default function useGithub() {
  const [state, setState] = useState({
    loading: true,
    error: null,
    profile: null,
    repos: [],
    featured: [],
    languages: [],
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [profile, repos] = await Promise.all([
          fetchProfile(),
          fetchRepos(),
        ]);
        if (cancelled) return;

        setState({
          loading: false,
          error: null,
          profile,
          repos,
          featured: pickFeaturedRepos(repos, 4),
          languages: aggregateLanguages(repos),
        });
      } catch (err) {
        if (cancelled) return;
        setState((s) => ({
          ...s,
          loading: false,
          error:
            err?.response?.status === 403
              ? "GitHub API rate limit reached — try again shortly."
              : "Couldn't load GitHub data right now.",
        }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
