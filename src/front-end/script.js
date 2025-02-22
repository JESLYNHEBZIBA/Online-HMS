// Base URL for the backend API
const BASE_URL = "http://localhost:8080/api";

// DOM Elements
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const dashboard = document.getElementById("dashboard");
const patientAppointments = document.getElementById("patientAppointments");
const patientPrescriptions = document.getElementById("patientPrescriptions");
const doctorAppointments = document.getElementById("doctorAppointments");

// Login Functionality
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert("Login successful!");
      dashboard.style.display = "block";
      loadDashboard();
    } else {
      alert("Login failed!");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
});

// Register Functionality
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  const role = document.getElementById("registerRole").value;

  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role }),
    });

    if (response.ok) {
      alert("Registration successful!");
      window.location.href = "#login";
    } else {
      alert("Registration failed!");
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
});

// Load Dashboard Data
async function loadDashboard() {
  // Fetch patient appointments
  const appointmentsResponse = await fetch(`${BASE_URL}/appointments/patient/1`);
  const appointments = await appointmentsResponse.json();
  patientAppointments.innerHTML = appointments
    .map((appointment) => `<li>${appointment.appointmentDate}</li>`)
    .join("");

  // Fetch patient prescriptions
  const prescriptionsResponse = await fetch(`${BASE_URL}/prescriptions/patient/1`);
  const prescriptions = await prescriptionsResponse.json();
  patientPrescriptions.innerHTML = prescriptions
    .map((prescription) => `<li>${prescription.prescriptionDetails}</li>`)
    .join("");

  // Fetch doctor appointments
  const doctorAppointmentsResponse = await fetch(`${BASE_URL}/appointments/doctor/1`);
  const doctorAppointmentsData = await doctorAppointmentsResponse.json();
  doctorAppointments.innerHTML = doctorAppointmentsData
    .map((appointment) => `<li>${appointment.appointmentDate}</li>`)
    .join("");
}