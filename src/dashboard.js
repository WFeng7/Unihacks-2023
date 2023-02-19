if (!localStorage.getItem("token")) {
    location.href = "./login.html";
}

document.getElementById("accountButton").onclick = () => {
    localStorage.removeItem("token");
    location.href = "./index.html";
}

{
    const dashboard = document.getElementById('dashboard');
    const patientTemplate = document.getElementById('patientTemplate');
    makeReq('/api/getAll').then(txt => {
        data = JSON.parse(txt);
        console.log(data);
        data.forEach(v => {
            if (v.type !== 2) return;

        });
    });

    const templatePopup = document.getElementById('popupTemplate');
    document.querySelector('div.addPatient').addEventListener('click', () => {
        document.body.appendChild(templatePopup.content.cloneNode(true));
    });
}