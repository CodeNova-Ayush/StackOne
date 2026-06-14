var teamMembers = [
  { name: "Gauravi Roy", role: "UI/UX Designer & Frontend Developer", skills: ["HTML", "CSS", "Responsive Design", "DOM Manipulation"], github: "https://github.com/gauravir39", linkedin: "https://www.linkedin.com/in/gauravi-roy-680104381/" },
  { name: "Ayush Mishra", role: "Lead Developer & Architect", skills: ["JavaScript", "SPA Routing", "LocalStorage", "Git Workflow"], github: "https://github.com/CodeNova-Ayush", linkedin: "https://www.linkedin.com/in/ayush-mishra-5b8874381/" },
  { name: "Saransh Yadav", role: "API Integration Developer", skills: ["Async/Await", "Fetch API", "JSON Parsing", "Error Handling"], github: "https://github.com/Inexpert-trifler", linkedin: "https://www.linkedin.com/in/saransh-yadav-b72643336/" },
  { name: "Vijay Kumar", role: "State & Storage Developer", skills: ["CRUD Operations", "localStorage", "Array Methods", "Data Binding"], github: "https://github.com/vijaycoder01", linkedin: "https://www.linkedin.com/in/vijay-769105381/" },
  { name: "Shoaib Khan", role: "Testing & Deployment Lead", skills: ["Cross-browser Testing", "Bug Fixing", "Deployment", "Version Control"], github: "https://github.com/shoaibgmkhan", linkedin: "https://www.linkedin.com/in/shoaib-khan-80a105381/" }
];

var avatarColors = ["purple", "blue", "green", "orange", "red"];

export function init(container) {
  var grid = container.querySelector("#portfolio-grid");
  showCards(grid);
}

function showCards(grid) {
  grid.innerHTML = "";
  for (var i = 0; i < teamMembers.length; i++) {
    var member = teamMembers[i];
    var card = document.createElement("div");
    card.className = "portfolio-card";

    var avatar = document.createElement("div");
    avatar.className = "portfolio-avatar-placeholder " + avatarColors[i];
    var parts = member.name.split(" ");
    avatar.innerText = parts[0][0] + parts[1][0];
    card.appendChild(avatar);

    var nameEl = document.createElement("h3");
    nameEl.className = "portfolio-name";
    nameEl.innerText = member.name;
    card.appendChild(nameEl);

    var roleEl = document.createElement("p");
    roleEl.className = "portfolio-role";
    roleEl.innerText = member.role;
    card.appendChild(roleEl);

    var skillsDiv = document.createElement("div");
    skillsDiv.className = "portfolio-skills";
    for (var j = 0; j < member.skills.length; j++) {
      var tag = document.createElement("span");
      tag.className = "skill-tag";
      tag.innerText = member.skills[j];
      skillsDiv.appendChild(tag);
    }
    card.appendChild(skillsDiv);

    var linksDiv = document.createElement("div");
    linksDiv.className = "portfolio-links";
    if (member.github !== "") {
      var ghLink = document.createElement("a");
      ghLink.href = member.github;
      ghLink.target = "_blank";
      ghLink.className = "portfolio-github-link";
      ghLink.innerText = "GitHub Profile";
      linksDiv.appendChild(ghLink);
    }
    if (member.linkedin !== "") {
      var liLink = document.createElement("a");
      liLink.href = member.linkedin;
      liLink.target = "_blank";
      liLink.className = "portfolio-linkedin-link";
      liLink.innerText = "LinkedIn Profile";
      linksDiv.appendChild(liLink);
    }
    card.appendChild(linksDiv);

    grid.appendChild(card);
  }
}
