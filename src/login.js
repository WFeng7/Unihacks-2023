const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector("form .message");

    messageElement.textContent = message;
    // messageElement.classList.remove("form .message error", "error");
    // messageElement.classList.add(`${type}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    loginForm.addEventListener("submit", async e => {
        e.preventDefault();
        try {
            await attemptLogin(loginForm.elements.username.value, loginForm.elements.password.value);
        } catch (e) {
            setFormMessage(loginForm, "error", e);
        }
    });
});