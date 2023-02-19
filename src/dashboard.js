if (!localStorage.getItem("token")) {
    location.href = "./login.html";
}

document.getElementById("accountButton").onclick = () => {
    localStorage.removeItem("token");
    location.href = "./index.html";
}