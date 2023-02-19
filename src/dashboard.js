if (!localStorage.getItem("token")) {
    location.href = "./login.html";
}

document.getElementById("accountButton").onclick = () => {
    localStorage.removeItem("token");
    location.href = "./index.html";
}

function createPatientElement(uuid, name) {
    let dashboard = document.getElementById("dashboard");
    // Yes, updating innerHTML is slow. It's better than 18 lines of setting everything individually
    dashboard.innerHTML += `<div class="patient" data-bs-toggle="modal" data-bs-target="#viewPatientModal" data-uuid="${uuid}" onclick="patientClick(this)"><p class="name">${name}</p></div>`;

}

function patientClick(element) {
    console.log(`UUID: ${element.dataset.uuid}, Name: ${element.children[0].innerText}`);
}


function getPatients() {
    // Get the patients from the API

}


function createPatient() {

}

// Get the patients here instead of setting them manually
createPatientElement("34298089vce9rwij234b,dsf", "big mama");
createPatientElement("34298089vce9rwij234b,dsf", "joe chungu");
createPatientElement("34298089vce9rwij234b,dsf", "apple");

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