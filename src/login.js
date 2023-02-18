function setFormMessage (formElement, type, message){
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__mesage--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        //performing login here:
        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });
});