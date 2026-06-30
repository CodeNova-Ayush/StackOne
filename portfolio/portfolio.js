var teamMembers = [
    {
        name: "Gauravi Roy",
        role: "UI/UX Designer",
        skills: ["HTML","CSS","Responsive Design","DOM"],
        github: "https://github.com/gauravir39",
        linkedin: "https://www.linkedin.com/in/gauravi-roy-680104381/"
    },
    {
        name: "Ayush Mishra",
        role: "Lead Developer",
        skills: ["JavaScript","SPA","LocalStorage","Git"],
        github: "https://github.com/CodeNova-Ayush",
        linkedin: "https://www.linkedin.com/in/ayush-mishra-5b8874381/"
    },
    {
        name: "Saransh Yadav",
        role: "API Developer",
        skills: ["Fetch API","JSON","Async","Error Handling"],
        github: "https://github.com/Inexpert-trifler",
        linkedin: "https://www.linkedin.com/in/saransh-yadav-b72643336/"
    },
    {
        name: "Vijay Kumar",
        role: "Storage Developer",
        skills: ["CRUD","localStorage","Array","Binding"],
        github: "https://github.com/vijaycoder01",
        linkedin: "https://www.linkedin.com/in/vijay-769105381/"
    },
    {
        name: "Shoaib Khan",
        role: "Testing Lead",
        skills: ["Testing","Deployment","Git","Bug Fixing"],
        github: "https://github.com/shoaibgmkhan",
        linkedin: "https://www.linkedin.com/in/shoaib-khan-80a105381/"
    }
];

window.onload = function(){

    var grid = document.getElementById("portfolio-grid");

    for(var i=0;i<teamMembers.length;i++){

        var member = teamMembers[i];

        var card = document.createElement("div");
        card.className = "portfolio-card";

        var name = document.createElement("h3");
        name.innerText = member.name;

        var role = document.createElement("p");
        role.innerText = member.role;

        card.appendChild(name);
        card.appendChild(role);

        var skillDiv = document.createElement("div");

        for(var j=0;j<member.skills.length;j++){

            var span = document.createElement("span");
            span.className = "skill-tag";
            span.innerText = member.skills[j];

            skillDiv.appendChild(span);

        }

        card.appendChild(skillDiv);

        if(member.github!=""){

            var github=document.createElement("a");

            github.href=member.github;
            github.target="_blank";
            github.innerText="GitHub";

            card.appendChild(github);

        }

        if(member.linkedin!=""){

            var linkedin=document.createElement("a");

            linkedin.href=member.linkedin;
            linkedin.target="_blank";
            linkedin.innerText=" LinkedIn";

            card.appendChild(linkedin);

        }

        grid.appendChild(card);

    }

    var form=document.getElementById("contact-form");

    form.addEventListener("submit",function(e){

        e.preventDefault();

        var name=document.getElementById("contact-name");
        var email=document.getElementById("contact-email");
        var body=document.getElementById("contact-body");

        if(name.value.trim()==""){

            alert("Enter Name");
            return;

        }

        if(email.value.trim()==""){

            alert("Enter Email");
            return;

        }

        if(body.value.trim().length<10){

            alert("Message must contain at least 10 characters");
            return;

        }

        document.getElementById("form-message-container").innerHTML =
        "<div class='form-success-alert'>Message Sent Successfully!</div>";

        form.reset();

    });

};
