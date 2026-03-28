const login = document.getElementById("login");

const loginbtn = document.getElementById("loginbtn");
const admininput = document.getElementById("loginadmin");
const logPass = document.getElementById("loginpass");
const showIssue = document.getElementById("showIssue");

loginbtn.addEventListener("click", () => {
  if(admininput.value === "admin" && logPass.value === "admin123"){
    login.classList.add("hidden");
    showIssue.classList.remove("hidden");

  }
  else{
    alert("Something Wrong");
  }
});
