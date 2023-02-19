var patients = {};

if (!localStorage.getItem("token")) {
    location.href = "./login.html";
}

document.getElementById("accountButton").onclick = () => {
    localStorage.removeItem("token");
    location.href = "./index.html";
}


function createPatientElement(uuid, patient) {
    let dashboard = document.getElementById("dashboard");
    // Yes, updating innerHTML is slow. It's better than 18 lines of setting everything individually
    dashboard.innerHTML += `<div class="patient" data-bs-toggle="modal" data-bs-target="#viewPatientModal" data-uuid="${uuid}" onclick="patientClick(this)"><p class="name">${patient.name}</p></div>`;

}

function patientClick(element) {
    console.log(`UUID: ${element.dataset.uuid}, Name: ${element.children[0].innerText}`);
    let patient = patients[element.dataset.uuid];
    document.getElementById("patientName").textContent = `${patient.name} | ${patient.birthday} ${patient.gender}`;
    document.getElementById("patientNotes").textContent = patient.notes;
    document.getElementById("viewPatientModal").dataset.uuid = element.dataset.uuid;
}


function getPatients() {
    makeReq('/api/getAll').then(txt => {
        let resp = JSON.parse(txt);
        console.log(resp);

        // Loop through all patients
        resp.forEach(user => {
            if (user.type !== 2) return; // Check if the user is not a patient
            let patientInfo = JSON.parse(user.data);
            patients[user.id] = patientInfo;
            createPatientElement(user.id, patientInfo);
        })
    });
}

class Patient {
    name;
    birthday;
    gender;
    notes;

    constructor(name, birthday, gender, notes) {
        this.name = name;
        this.birthday = birthday;
        this.gender = gender;
        this.notes = notes;
    }
}


function createPatient() {
    let nameElem = document.getElementById("nameSelect");
    let dateElem = document.getElementById("dateSelect");
    let genderElem = document.getElementById("genderSelect");

    let patient = new Patient(nameElem.value, dateElem.value, genderElem.value, "");
    nameElem.value = "";
    dateElem.value = "";
    genderElem.value = "";
    
    makeReq('/api/create', JSON.stringify(patient), 'application/json').then(id => {
        patients[id] = patient;
        createPatientElement(id, patient);
    });
}

function editPatient() {
    const uuid = document.getElementById("viewPatientModal").dataset.uuid;
    let patient = patients[uuid];
    patient.notes = document.getElementById("patientNotes").value;

    makeReq(`/api/set/${uuid}`, JSON.stringify(patient), 'application/json').then(id => {
        patients[id] = patient;
    });

}


getPatients();