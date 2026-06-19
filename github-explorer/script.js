// ===== GitHub Explorer Script ===== //

// ===== Mock fallback data ===== //
var mockProfiles = {
  octocat: {
    profile: {
      avatar_url: "https://avatars.githubusercontent.com/u/5832347?v=4",
      name: "The Octocat",
      login: "octocat",
      bio: "Testing merges since 2011.",
      followers: 9400,
      following: 9,
      public_repos: 8,
      location: "San Francisco, CA",
      html_url: "https://github.com/octocat"
    },
    repos: [
      { name: "boysenberry-repo-1", description: "Testing workflows.", stargazers_count: 120, forks_count: 32, language: "JavaScript", html_url: "https://github.com/octocat/boysenberry-repo-1" },
      { name: "git-consortium", description: "Training demo repo.", stargazers_count: 85, forks_count: 14, language: "HTML", html_url: "https://github.com/octocat/git-consortium" }
    ]
  },
  google: {
    profile: {
      avatar_url: "https://avatars.githubusercontent.com/u/1342004?v=4",
      name: "Google",
      login: "google",
      bio: "Google Open Source.",
      followers: 34500,
      following: 0,
      public_repos: 2500,
      location: "Mountain View, CA",
      html_url: "https://github.com/google"
    },
    repos: [
      { name: "gson", description: "Java library for JSON serialization/deserialization.", stargazers_count: 23500, forks_count: 4200, language: "Java", html_url: "https://github.com/google/gson" },
      { name: "zx", description: "A tool for writing better scripts.", stargazers_count: 39000, forks_count: 1100, language: "JavaScript", html_url: "https://github.com/google/zx" }
    ]
  }
};

// ===== Language colour map ===== //
var langColors = {
  javascript: "gold",
  typescript: "steelblue",
  html: "coral",
  css: "purple",
  java: "crimson",
  python: "steelblue",
  ruby: "crimson",
  cpp: "crimson",
  c: "gray",
  go: "steelblue"
};
