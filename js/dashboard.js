// Dashboard functionality
class Dashboard {
    constructor() {
        this.auth = new Auth();
        this.init();
    }

    init() {
        this.auth.checkAuth();
        this.loadDashboardData();
        this.setupEventListeners();
    }

    async loadDashboardData() {
        try {
            // Mock data - replace with API calls
            const appointments = await this.getTodaysAppointments();
            const stats = await this.getPatientStats();
            const records = await this.getRecentRecords();

            this.updateDashboardUI(appointments, stats, records);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
    }

    async getTodaysAppointments() {
        // Mock data
        return [
            { time: '9:00 AM', patient: 'John Doe', type: 'Checkup' },
            { time: '10:30 AM', patient: 'Jane Smith', type: 'Follow-up' },
            { time: '2:00 PM', patient: 'Bob Johnson', type: 'Consultation' }
        ];
    }

    async getPatientStats() {
        // Mock data
        return {
            total: 150,
            active: 120,
            new: 5,
            appointments: 8
        };
    }

    async getRecentRecords() {
        // Mock data
        return [
            { patient: 'John Doe', type: 'Prescription', date: '2024-03-15' },
            { patient: 'Jane Smith', type: 'Lab Result', date: '2024-03-14' }
        ];
    }

    updateDashboardUI(appointments, stats, records) {
        // Update appointments section
        const appointmentsList = document.querySelector('.appointment-list');
        if (appointmentsList) {
            appointmentsList.innerHTML = appointments.map(apt => `
                <div class="appointment">
                    <time>${apt.time}</time>
                    <span>${apt.patient} - ${apt.type}</span>
                </div>
            `).join('');
        }

        // Update stats
        const statsElements = document.querySelectorAll('.stat-value');
        statsElements.forEach(element => {
            const statType = element.dataset.stat;
            if (stats[statType]) {
                element.textContent = stats[statType];
            }
        });

        // Update recent records
        const recordsList = document.querySelector('.recent-records');
        if (recordsList) {
            recordsList.innerHTML = records.map(record => `
                <div class="record-item">
                    <span>${record.patient}</span>
                    <span>${record.type}</span>
                    <time>${record.date}</time>
                </div>
            `).join('');
        }
    }

    setupEventListeners() {
        // Logout button
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.auth.logout());
        }

        // Other dashboard interactions
        document.addEventListener('click', (e) => {
            if (e.target.matches('.refresh-btn')) {
                this.loadDashboardData();
            }
        });
    }
}
