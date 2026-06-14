var teamMembers = [
  { name: "Gauravi Roy", role: "UI/UX Designer & Frontend Developer", skills: ["HTML", "CSS", "Responsive Design", "DOM Manipulation"], github: "", linkedin: "" },
  { name: "Ayush Mishra", role: "Lead Developer & Architect", skills: ["JavaScript", "SPA Routing", "LocalStorage", "Git Workflow"], github: "", linkedin: "" },
  { name: "Saransh Yadav", role: "API Integration Developer", skills: ["Async/Await", "Fetch API", "JSON Parsing", "Error Handling"], github: "", linkedin: "" },
  { name: "Vijay Kumar", role: "State & Storage Developer", skills: ["CRUD Operations", "localStorage", "Array Methods", "Data Binding"], github: "", linkedin: "" },
  { name: "Shoaib Khan", role: "Testing & Deployment Lead", skills: ["Cross-browser Testing", "Bug Fixing", "Deployment", "Version Control"], github: "", linkedin: "" }
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

    grid.appendChild(card);
  }
}
