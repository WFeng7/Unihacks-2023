const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

function setFormMessage (formElement, type, message){
    const messageElement = formElement.querySelector("form .message");

    messageElement.textContent = message;
    messageElement.classList.remove("form .message error", "error");
    messageElement.classList.add(`${type}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        //performing login here:
        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });
});