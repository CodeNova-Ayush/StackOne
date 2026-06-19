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

// ===== App state ===== //
var activeUser = "octocat";
var sortKey = "stars";
var userData = null;
var repoData = null;

// ===== Fetch user from GitHub API ===== //
function searchUser(container, username) {
  clearStatus(container);
  showSpinner(container, username);

  fetch("https://api.github.com/users/" + username)
    .then(function(pRes) {
      if (!pRes.ok) throw new Error("Profile fetch failed");
      return pRes.json().then(function(profileData) {
        return fetch("https://api.github.com/users/" + username + "/repos?per_page=100")
          .then(function(rRes) {
            if (!rRes.ok) throw new Error("Repos fetch failed");
            return rRes.json();
          })
          .then(function(reposData) {
            userData = profileData;
            repoData = reposData;
            showProfile(container);
          });
      });
    })
    .catch(function() {
      loadFallback(container, username);
    });
}

function clearStatus(container) {
  var banner = container.querySelector("#git-status-banner");
  if (banner !== null) banner.innerHTML = "";
}

function showSpinner(container, username) {
  var area = container.querySelector("#git-workspace-area");
  if (area !== null) {
    area.innerHTML =
      '<div class="spinner-wrapper"><div class="spinner"></div><p>Connecting for <strong>@' +
      username + "</strong>...</p></div>";
  }
}

function loadFallback(container, username) {
  var banner = container.querySelector("#git-status-banner");
  if (banner !== null) {
    banner.innerHTML =
      '<div class="news-banner" style="border-color:crimson;color:crimson;margin-bottom:20px;">' +
      "<span>⚠️</span><span>Failed to load profile. Using mock data.</span></div>";
  }
  var backup = mockProfiles[username.toLowerCase()];
  if (!backup) backup = mockProfiles["octocat"];
  userData = backup.profile;
  repoData = backup.repos;
  showProfile(container);
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

// ===== Profile rendering ===== //
function showProfile(container) {
  var area = container.querySelector("#git-workspace-area");
  if (area === null) return;
  area.className = "github-workspace";
  setProfileHtml(area);
  setupLocation(container);
  showChart(container);
  showRepos(container);
  setupSort(container);
}

function setProfileHtml(area) {
  var fol = formatNumber(userData.followers);
  var flg = formatNumber(userData.following);
  var rep = formatNumber(userData.public_repos);
  var name = userData.name ? userData.name : userData.login;
  var bio = userData.bio ? userData.bio : "No bio.";
  area.innerHTML =
    '<div class="github-profile-col">' +
      '<div class="github-profile-card">' +
        '<img class="github-avatar" src="' + userData.avatar_url + '" alt="' + name + ' avatar">' +
        '<div>' +
          '<h3 class="github-profile-name">' + name + '</h3>' +
          '<span class="github-profile-login">@' + userData.login + '</span>' +
        '</div>' +
        '<p class="github-profile-bio">' + bio + '</p>' +
        '<div class="github-stats-row">' +
          '<div class="github-stat-col"><span class="github-stat-val">' + fol + '</span><span class="github-stat-lbl">Followers</span></div>' +
          '<div class="github-stat-col"><span class="github-stat-val">' + flg + '</span><span class="github-stat-lbl">Following</span></div>' +
          '<div class="github-stat-col"><span class="github-stat-val">' + rep + '</span><span class="github-stat-lbl">Repos</span></div>' +
        '</div>' +
        '<div class="github-details-list">' +
          '<div id="git-profile-location" class="github-detail-item" style="display: none;"><span>📍</span><span id="git-location-text"></span></div>' +
          '<div class="github-detail-item"><span>🔗</span><a href="' + userData.html_url + '" target="_blank" style="font-weight:bold;color:rgb(198,90,61);">Visit Profile</a></div>' +
        '</div>' +
      '</div>' +
      '<div class="github-chart-card"><h4 class="chart-title">Languages</h4><div class="chart-bar-list" id="git-chart-bars"></div></div>' +
    '</div>' +
    '<div class="github-repos-card">' +
      '<div class="repos-header">' +
        '<h3>Repositories</h3>' +
        '<div class="repos-sort-controls" id="repo-sorters">' +
          '<button class="filter-tab active" id="btn-sort-stars" data-sort="stars">Sort by Stars</button>' +
          '<button class="filter-tab" id="btn-sort-forks" data-sort="forks">Sort by Forks</button>' +
        '</div>' +
      '</div>' +
      '<div class="repos-list" id="git-repos-items"></div>' +
    '</div>';
}

function setupLocation(container) {
  var loc = userData.location;
  if (loc !== null && loc !== undefined && loc !== "") {
    var el = container.querySelector("#git-profile-location");
    var text = container.querySelector("#git-location-text");
    if (el !== null && text !== null) {
      el.style.display = "flex";
      text.innerText = loc;
    }
  }
}
