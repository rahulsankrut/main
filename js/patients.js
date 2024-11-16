// Patient Management System
class PatientManager {
    constructor() {
        this.auth = new Auth();
        this.patients = [];
        this.init();
    }

    init() {
        this.auth.checkAuth();
        this.loadPatients();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add patient button
        const addBtn = document.querySelector('.add-patient-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.showModal());
        }

        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Form submission
        const form = document.getElementById('patientForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    async loadPatients() {
        // Mock data - replace with API call
        this.patients = [
            { id: 'P001', name: 'John Doe', age: 45, lastVisit: '2024-02-15', status: 'Active' },
            { id: 'P002', name: 'Jane Smith', age: 32, lastVisit: '2024-03-01', status: 'Active' },
        ];
        this.renderPatients();
    }

    renderPatients() {
        const tbody = document.getElementById('patientTableBody');
        if (!tbody) return;

        tbody.innerHTML = this.patients.map(patient => `
            <tr>
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.lastVisit}</td>
                <td>${patient.status}</td>
                <td>
                    <button onclick="patientManager.viewPatient('${patient.id}')">View</button>
                    <button onclick="patientManager.editPatient('${patient.id}')">Edit</button>
                </td>
            </tr>
        `).join('');
    }

    showModal() {
        const modal = document.getElementById('patientModal');
        if (modal) modal.hidden = false;
    }

    hideModal() {
        const modal = document.getElementById('patientModal');
        if (modal) modal.hidden = true;
    }

    handleSearch(query) {
        const filtered = this.patients.filter(patient => 
            patient.name.toLowerCase().includes(query.toLowerCase()) ||
            patient.id.toLowerCase().includes(query.toLowerCase())
        );
        this.renderPatients(filtered);
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        // Add form handling logic here
        this.hideModal();
    }

    viewPatient(id) {
        console.log('Viewing patient:', id);
        // Add view logic
    }

    editPatient(id) {
        console.log('Editing patient:', id);
        // Add edit logic
    }
}

// Initialize
const patientManager = new PatientManager();
