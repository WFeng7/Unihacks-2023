const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

const signedIn = (localStorage.getItem("token") ? true : false);
let accountButton = document.getElementById("accountButton");

if (signedIn) {
    accountButton.innerText = "Log Out";
    document.getElementById("signupButton").style.display = "none";
} else {
    document.getElementById("dashboardLink").style.display = "none";
}

accountButton.onclick = () => {
    if (signedIn) {
        localStorage.removeItem("token");
        location.reload();
    } else {
        location.href = "/login.html";
    }
}