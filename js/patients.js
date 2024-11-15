// Patient Management System
class PatientManager {
    constructor() {
        this.auth = new Auth();
        this.patients = [];
        this.currentPatient = null;
        this.init();
    }

    init() {
        this.auth.checkAuth();
        this.loadPatients();
        this.setupEventListeners();
        this.initializeSearchAndFilters();
    }

    async loadPatients() {
        try {
            // Mock data - replace with API call
            const response = await this.fetchPatients();
            this.patients = response;
            this.renderPatientList();
        } catch (error) {
            console.error('Error loading patients:', error);
            this.showError('Failed to load patients');
        }
    }

    async fetchPatients() {
        // Mock data - replace with API call
        return [
            {
                id: 'P001',
                name: 'John Doe',
                age: 45,
                lastVisit: '2024-02-15',
                status: 'active',
                email: 'john@example.com',
                phone: '555-0123',
                medicalHistory: ['Hypertension', 'Diabetes']
            },
            {
                id: 'P002',
                name: 'Jane Smith',
                age: 32,
                lastVisit: '2024-03-01',
                status: 'active',
                email: 'jane@example.com',
                phone: '555-0124',
                medicalHistory: ['Asthma']
            }
        ];
    }

    renderPatientList() {
        const tbody = document.querySelector('.patient-list tbody');
        if (!tbody) return;

        tbody.innerHTML = this.patients.map(patient => `
            <tr data-patient-id="${patient.id}">
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.lastVisit}</td>
                <td><span class="status ${patient.status}">${patient.status}</span></td>
                <td>
                    <button class="view-btn" data-action="view">View</button>
                    <button class="edit-btn" data-action="edit">Edit</button>
                </td>
            </tr>
        `).join('');
    }

    setupEventListeners() {
        // Add new patient button
        const addButton = document.querySelector('.add-patient-btn');
        if (addButton) {
            addButton.addEventListener('click', () => this.showPatientModal());
        }

        // Patient list actions
        const patientList = document.querySelector('.patient-list');
        if (patientList) {
            patientList.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const patientId = e.target.closest('tr')?.dataset.patientId;
                
                if (action && patientId) {
                    if (action === 'view') this.viewPatient(patientId);
                    if (action === 'edit') this.editPatient(patientId);
                }
            });
        }

        // Form submission
        const patientForm = document.getElementById('patientForm');
        if (patientForm) {
            patientForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handlePatientFormSubmit(e.target);
            });
        }
    }

    initializeSearchAndFilters() {
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchPatients(e.target.value);
            });
        }
    }

    searchPatients(query) {
        if (!query) {
            this.renderPatientList();
            return;
        }

        const filtered = this.patients.filter(patient => 
            patient.name.toLowerCase().includes(query.toLowerCase()) ||
            patient.id.toLowerCase().includes(query.toLowerCase())
        );

        this.renderPatientList(filtered);
    }

    showPatientModal(patient = null) {
        const modal = document.getElementById('patientModal');
        if (!modal) return;

        this.currentPatient = patient;
        modal.hidden = false;

        // Pre-fill form if editing
        if (patient) {
            const form = modal.querySelector('form');
            if (form) {
                form.elements.patientName.value = patient.name;
                // Fill other fields
            }
        }
    }

    async handlePatientFormSubmit(form) {
        try {
            const patientData = {
                name: form.elements.patientName.value,
                // Get other form values
            };

            if (this.currentPatient) {
                await this.updatePatient(this.currentPatient.id, patientData);
            } else {
                await this.createPatient(patientData);
            }

            this.hideModal();
            this.loadPatients();
        } catch (error) {
            console.error('Error saving patient:', error);
            this.showError('Failed to save patient');
        }
    }

    hideModal() {
        const modal = document.getElementById('patientModal');
        if (modal) {
            modal.hidden = true;
            this.currentPatient = null;
        }
    }

    showError(message) {
        // Implement error notification
        alert(message);
    }

    async viewPatient(patientId) {
        const patient = this.patients.find(p => p.id === patientId);
        if (patient) {
            // Implement patient view
            console.log('Viewing patient:', patient);
        }
    }

    async editPatient(patientId) {
        const patient = this.patients.find(p => p.id === patientId);
        if (patient) {
            this.showPatientModal(patient);
        }
    }

    async createPatient(patientData) {
        // Implement API call
        console.log('Creating patient:', patientData);
    }

    async updatePatient(patientId, patientData) {
        // Implement API call
        console.log('Updating patient:', patientId, patientData);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const patientManager = new PatientManager();
});
