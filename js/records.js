class MedicalRecordManager {
    constructor() {
        this.auth = new Auth();
        this.records = [];
        this.init();
    }

    init() {
        this.auth.checkAuth();
        this.loadRecords();
        this.setupEventListeners();
    }

    async loadRecords() {
        try {
            // Mock data - replace with API call
            const records = await this.fetchRecords();
            this.records = records;
            this.renderRecords();
        } catch (error) {
            console.error('Error loading records:', error);
        }
    }

    async fetchRecords() {
        // Mock data
        return [
            {
                id: 'R001',
                patientName: 'John Doe',
                date: '2024-03-15',
                type: 'Diagnosis',
                details: 'Regular checkup - Blood pressure normal',
                doctor: 'Dr. Smith'
            },
            {
                id: 'R002',
                patientName: 'Jane Smith',
                date: '2024-03-14',
                type: 'Prescription',
                details: 'Prescribed antibiotics for infection',
                doctor: 'Dr. Smith'
            }
        ];
    }

    renderRecords() {
        const recordsGrid = document.querySelector('.records-grid');
        if (!recordsGrid) return;

        recordsGrid.innerHTML = this.records.map(record => `
            <div class="record-card">
                <div class="record-header">
                    <h3>Patient: ${record.patientName}</h3>
                    <span class="record-date">${record.date}</span>
                </div>
                <div class="record-type">${record.type}</div>
                <div class="record-content">
                    <p>${record.details}</p>
                    <p><strong>Doctor:</strong> ${record.doctor}</p>
                </div>
                <div class="record-actions">
                    <button class="view-btn" data-record-id="${record.id}">View Details</button>
                    <button class="edit-btn" data-record-id="${record.id}">Edit</button>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // New record button
        const newRecordBtn = document.querySelector('.new-record-btn');
        if (newRecordBtn) {
            newRecordBtn.addEventListener('click', () => this.showRecordModal());
        }

        // Search functionality
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Record actions
        document.addEventListener('click', (e) => {
            if (e.target.matches('.view-btn')) {
                const recordId = e.target.dataset.recordId;
                this.viewRecord(recordId);
            }
            if (e.target.matches('.edit-btn')) {
                const recordId = e.target.dataset.recordId;
                this.editRecord(recordId);
            }
        });
    }

    handleSearch(query) {
        if (!query) {
            this.renderRecords();
            return;
        }

        const filtered = this.records.filter(record => 
            record.patientName.toLowerCase().includes(query.toLowerCase()) ||
            record.type.toLowerCase().includes(query.toLowerCase())
        );

        this.renderRecords(filtered);
    }

    showRecordModal(record = null) {
        const modal = document.getElementById('recordModal');
        if (modal) {
            modal.hidden = false;
            if (record) {
                // Pre-fill form for editing
            }
        }
    }

    async viewRecord(recordId) {
        const record = this.records.find(r => r.id === recordId);
        if (record) {
            // Implement view functionality
            console.log('Viewing record:', record);
        }
    }

    async editRecord(recordId) {
        const record = this.records.find(r => r.id === recordId);
        if (record) {
            this.showRecordModal(record);
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const recordManager = new MedicalRecordManager();
}); 