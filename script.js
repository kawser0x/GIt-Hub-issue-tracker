const login = document.getElementById("login");

const loginbtn = document.getElementById("loginbtn");
const admininput = document.getElementById("loginadmin");
const logPass = document.getElementById("loginpass");
const showIssue = document.getElementById("showIssue");

const displycontainer = document.getElementById("show-issues");

loginbtn.addEventListener("click", () => {
  if (admininput.value === "admin" && logPass.value === "admin123") {
    login.classList.add("hidden");
    showIssue.classList.remove("hidden");
  } else {
    alert("Something Wrong");
  }
});

// "id": 7,
// "title": "Improve search functionality",
// "description": "Add filters for advanced search including date ranges, status, and tags.",
// "status": "open",
// "labels": [
// "enhancement",
// "good first issue"
// ],
// "priority": "low",
// "author": "search_guru",
// "assignee": "emma_ui",
// "createdAt": "2024-01-17T12:00:00Z",
// "updatedAt": "2024-01-17T12:00:00Z"

function findP(priority) {
    const p = priority.toLowerCase();
    
    if (p === "high") {
        return `
            <img class="w-8" src="./assets/Open-Status.png" alt="status" />
            <span class="btn btn-outline btn-secondary rounded-full uppercase font-bold text-xs">${priority}</span>
        `;
    } 
    else if (p === "medium") { 
        return `
            <img class="w-8" src="./assets/Open-Status.png" alt="status" />
            <span class="btn btn-outline btn-warning rounded-full uppercase font-bold text-xs">${priority}</span>
        `;
    } 
    else {
        return `
            <img class="w-8" src="./assets/Closed- Status .png" alt="status" />
            <span class="btn btn-outline rounded-full uppercase font-bold text-xs">${priority}</span>
        `;
    }
}

async function displayIssue(){
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();
    divContant(data.data);
}


function divContant(data) {
  displycontainer.innerHTML = "";
  
  data.forEach(item => {
    const card = document.createElement("div");
    
    const labelsHtml = item.labels.map(label => {
      if (label.toLowerCase() === "bug") {
        return `<button class="badge badge-outline badge-secondary"><i class="fa-solid fa-bug "></i>${label.toUpperCase()}</button>`;
      } 
      else if (label.toLowerCase() === "enhancement") {
        return `<button class="badge badge-outline badge-accent"><i class="fa-solid fa-link"></i>${label.toUpperCase()}</button>`;
      } 
      else if (label.toLowerCase() === "help wanted") {
        return `<button class="badge badge-outline badge-warning"><i class="fa-regular fa-life-ring"></i>${label.toUpperCase()}</button>`;
      } 
      else {
        return `<button class="badge badge-outline badge-primary"><i class="fa-brands fa-git-alt"></i>${label.toUpperCase()}</button>`;
      }
    }).join("");

    const priorityL = findP(item.priority) ;
    card.innerHTML = `
      <div class="shadow-xl p-6 space-y-3 border-t-2 border-red-400 h-full flex flex-col justify-between">
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            ${priorityL}
          </div>
          
          <div>
            <h2 class="text-xl font-bold">${item.title}</h2>
            <p class="text-sm font-light text-gray-500">${item.description}</p>

            <div class="flex flex-wrap gap-2 pt-3 cursor-pointer">
               ${labelsHtml}
            </div>
          </div>
        </div>

        <div class="text-sm font-light border-t pt-4 mt-4 flex justify-between items-center">
          <p># ${item.id} by <span class="font-semibold">${item.author}</span></p>
          <p>${new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    `;
    displycontainer.appendChild(card);
  });
}
function showbtn(){
    
}


displayIssue();