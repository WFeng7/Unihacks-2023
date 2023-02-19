var patients = [];

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
}


function getPatients() {
    // Get the patients from the API

    makeReq('/api/getAll').then(txt => {
        let resp = JSON.parse(txt);
        console.log(resp);

        // Loop through all patients
        resp.forEach(user => {
            if (user.type !== 2) return; // Check if the user is not a patient

            let patientInfo = JSON.parse(user.data);
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
    patients.push(patient);

    makeReq('/api/create', JSON.stringify(patient), 'application/json').then(id => {
        createPatientElement(id, patient);
    });
}

getPatients();