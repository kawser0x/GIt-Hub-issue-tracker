const login = document.getElementById("login");

const loginbtn = document.getElementById("loginbtn");
const admininput = document.getElementById("loginadmin");
const logPass = document.getElementById("loginpass");
const showIssue = document.getElementById("showIssue");

const displycontainer = document.getElementById("show-issues");

const colorP = document.getElementById("colorP");

const countIssues = document.getElementById("countIssue");

const loadingspinner = document.getElementById("loading-spinner");

loginbtn.addEventListener("click", () => {
  if (admininput.value === "admin" && logPass.value === "admin123") {
    login.classList.add("hidden");
    showIssue.classList.remove("hidden");
  } else {
    alert("Something Wrong");
  }
});

function findP(priority) {
  const p = priority.toLowerCase();
  let html = "";
  let colorClass = "";

  if (p === "high") {
    html = `
      <img class="w-8" src="./assets/Open-Status.png" alt="status" />
      <span class="btn btn-outline btn-secondary rounded-full uppercase font-bold text-xs">${priority}</span>
    `;
    colorClass = "border-green-400";
  } else if (p === "medium") {
    html = `
      <img class="w-8" src="./assets/Open-Status.png" alt="status" />
      <span class="btn btn-outline btn-warning rounded-full uppercase font-bold text-xs">${priority}</span>
    `;
    colorClass = "border-green-400";
  } else {
    html = `
      <img class="w-8" src="./assets/Closed- Status .png" alt="status" />
      <span class="btn btn-outline rounded-full uppercase font-bold text-xs">${priority}</span>
    `;
    colorClass = "border-purple-400";
  }

  return { html, colorClass };
}

async function displayIssue() {
    loadingspinner.classList.remove("hidden");
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await response.json();
  loadingspinner.classList.add("hidden");
  divContant(data.data);
}

function divContant(data) {
  countIssues.innerText = data.length;
  displycontainer.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");

    const labelsHtml = item.labels
      .map((label) => {
        if (label.toLowerCase() === "bug") {
          return `<button class="badge badge-outline badge-secondary"><i class="fa-solid fa-bug "></i>${label.toUpperCase()}</button>`;
        } else if (label.toLowerCase() === "enhancement") {
          return `<button class="badge badge-outline badge-accent"><i class="fa-solid fa-link"></i>${label.toUpperCase()}</button>`;
        } else if (label.toLowerCase() === "help wanted") {
          return `<button class="badge badge-outline badge-warning"><i class="fa-regular fa-life-ring"></i>${label.toUpperCase()}</button>`;
        } else {
          return `<button class="badge badge-outline badge-primary"><i class="fa-brands fa-git-alt"></i>${label.toUpperCase()}</button>`;
        }
      })
      .join("");

    const priorityL = findP(item.priority);
    card.innerHTML = `
      <div onclick="openissueModal(${item.id})" id="colorP" class="shadow-xl p-6 space-y-3 border-t-2 ${priorityL.colorClass}  h-full flex flex-col justify-between">
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            ${priorityL.html}
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

const allbutton = document.getElementById("allbutton");
const openbutton = document.getElementById("openbutton");
const closebutton = document.getElementById("closedbutton");

allbutton.addEventListener("click", () => {
    allbutton.classList.add("btn-primary");
    openbutton.classList.remove("btn-primary");
    closebutton.classList.remove("btn-primary");
  displayIssue();
});

async function displayIssueopen() {
    loadingspinner.classList.remove("hidden");
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await response.json();
  loadingspinner.classList.add("hidden");
  divContantopen(data.data);
}

function divContantopen(data) {
  displycontainer.innerHTML = "";
  let count = 0;
  data.forEach((item) => {
    if (item.status === "open") {
      count++;
      const card = document.createElement("div");

      const labelsHtml = item.labels
        .map((label) => {
          if (label.toLowerCase() === "bug") {
            return `<button class="badge badge-outline badge-secondary"><i class="fa-solid fa-bug "></i>${label.toUpperCase()}</button>`;
          } else if (label.toLowerCase() === "enhancement") {
            return `<button class="badge badge-outline badge-accent"><i class="fa-solid fa-link"></i>${label.toUpperCase()}</button>`;
          } else if (label.toLowerCase() === "help wanted") {
            return `<button class="badge badge-outline badge-warning"><i class="fa-regular fa-life-ring"></i>${label.toUpperCase()}</button>`;
          } else {
            return `<button class="badge badge-outline badge-primary"><i class="fa-brands fa-git-alt"></i>${label.toUpperCase()}</button>`;
          }
        })
        .join("");

      const priorityL = findP(item.priority);
      card.innerHTML = `
      <div onclick="openissueModal(${item.id}) id="colorP" class="shadow-xl p-6 space-y-3 border-t-2 ${priorityL.colorClass}  h-full flex flex-col justify-between">
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            ${priorityL.html}
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
    }
  });
  countIssues.innerText = count;
}

openbutton.addEventListener("click", () => {
    openbutton.classList.add("btn-primary");
  allbutton.classList.remove("btn-primary");
  closebutton.classList.remove("btn-primary");
  displayIssueopen();
});

async function displayIssueclosed() {
    loadingspinner.classList.remove("hidden");
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await response.json();
  loadingspinner.classList.add("hidden");
  divContantclosed(data.data);
}

function divContantclosed(data) {
  displycontainer.innerHTML = "";
  let count2 = 0;
  data.forEach((item) => {
    if (item.status === "closed") {
      count2++;
      const card = document.createElement("div");

      const labelsHtml = item.labels
        .map((label) => {
          if (label.toLowerCase() === "bug") {
            return `<button class="badge badge-outline badge-secondary"><i class="fa-solid fa-bug "></i>${label.toUpperCase()}</button>`;
          } else if (label.toLowerCase() === "enhancement") {
            return `<button class="badge badge-outline badge-accent"><i class="fa-solid fa-link"></i>${label.toUpperCase()}</button>`;
          } else if (label.toLowerCase() === "help wanted") {
            return `<button class="badge badge-outline badge-warning"><i class="fa-regular fa-life-ring"></i>${label.toUpperCase()}</button>`;
          } else {
            return `<button class="badge badge-outline badge-primary"><i class="fa-brands fa-git-alt"></i>${label.toUpperCase()}</button>`;
          }
        })
        .join("");

      const priorityL = findP(item.priority);
      card.innerHTML = `
      <div onclick="openissueModal(${item.id}) id="colorP" class="shadow-xl p-6 space-y-3 border-t-2 ${priorityL.colorClass}  h-full flex flex-col justify-between">
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            ${priorityL.html}
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
    }
  });
  countIssues.innerText = count2;
}

closebutton.addEventListener("click", () => {
      closebutton.classList.add("btn-primary");
      openbutton.classList.remove("btn-primary");
  allbutton.classList.remove("btn-primary");
  displayIssueclosed(); 
});


async function openissueModal(id){
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();

    if (data.status === "success") {
        displayModal(data.data);
    }
    
}

function displayModal(issue) {
    const labelsHtml = issue.labels
        .map((label) => {
          if (label.toLowerCase() === "bug") {
            return `<button class="badge badge-outline badge-secondary"><i class="fa-solid fa-bug "></i>${label.toUpperCase()}</button>`;
          } else if (label.toLowerCase() === "enhancement") {
            return `<button class="badge badge-outline badge-accent"><i class="fa-solid fa-link"></i>${label.toUpperCase()}</button>`;
          } else if (label.toLowerCase() === "help wanted") {
            return `<button class="badge badge-outline badge-warning"><i class="fa-regular fa-life-ring"></i>${label.toUpperCase()}</button>`;
          } else {
            return `<button class="badge badge-outline badge-primary"><i class="fa-brands fa-git-alt"></i>${label.toUpperCase()}</button>`;
          }
        })
        .join("");
    const modalContent = document.getElementById("modalDiv");

    modalContent.innerHTML = `
        <div class="space-y-4">
            <div>
                <h2 class="text-2xl font-bold">${issue.title}</h2>
                <div class="flex gap-2 items-center mt-2">
                    <span class="badge badge-success">${issue.status}</span>
                    <p class="text-sm font-light">
                        ${issue.status} by <span class="font-bold"> . ${issue.author}</span> •  ${new Date(issue.createdAt).toLocaleDateString()}
                    </p> 
                </div>
            </div>

            <div class="flex flex-wrap gap-2">
                ${labelsHtml}
            </div>

            <p class="text-sm text-gray-600  bg-base-200 p-4 rounded-lg">
                ${issue.description}
            </p>

            <div class="flex justify-between border-t pt-4">
                <div>
                    <p class="text-xs uppercase text-gray-400">Assignee</p>
                    <h2 class="text-lg font-bold">${issue.assignee || 'Unassigned'}</h2>
                </div>
                <div class="text-right">
                    <p class="text-xs uppercase text-gray-400">Priority</p>
                    <span class="badge badge-error font-bold p-3">${issue.priority.toUpperCase()}</span>
                </div>
            </div>
        </div>
    `;

    document.getElementById("showissuemodal").showModal();
}

displayIssue();
