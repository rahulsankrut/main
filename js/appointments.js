class AppointmentManager {
    constructor() {
        this.auth = new Auth();
        this.appointments = [];
        this.init();
    }

    init() {
        this.auth.checkAuth();
        this.loadAppointments();
        this.setupEventListeners();
    }

    async loadAppointments() {
        try {
            // Mock data - replace with API call
            const appointments = await this.fetchAppointments();
            this.appointments = appointments;
            this.renderAppointments();
        } catch (error) {
            console.error('Error loading appointments:', error);
        }
    }

    async fetchAppointments() {
        // Mock data
        return [
            {
                id: 'A001',
                patientName: 'John Doe',
                date: '2024-03-20',
                time: '09:00',
                type: 'checkup',
                status: 'scheduled'
            },
            {
                id: 'A002',
                patientName: 'Jane Smith',
                date: '2024-03-20',
                time: '10:30',
                type: 'followup',
                status: 'scheduled'
            }
        ];
    }

    renderAppointments() {
        const timeSlots = document.querySelector('.time-slots');
        if (!timeSlots) return;

        timeSlots.innerHTML = this.appointments.map(apt => `
            <div class="time-slot">
                <span class="time">${apt.time}</span>
                <div class="appointment-slot">
                    <div class="appointment ${apt.status}">
                        <strong>${apt.patientName}</strong>
                        <span>${apt.type}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // New appointment button
        const newAppointmentBtn = document.querySelector('.new-appointment-btn');
        if (newAppointmentBtn) {
            newAppointmentBtn.addEventListener('click', () => this.showAppointmentModal());
        }

        // Form submission
        const appointmentForm = document.getElementById('appointmentForm');
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAppointmentSubmit(e.target);
            });
        }
    }

    showAppointmentModal() {
        const modal = document.getElementById('appointmentModal');
        if (modal) {
            modal.hidden = false;
        }
    }

    async handleAppointmentSubmit(form) {
        try {
            const appointmentData = {
                patientId: form.elements.patientSelect.value,
                date: form.elements.appointmentDate.value,
                time: form.elements.appointmentTime.value,
                type: form.elements.appointmentType.value,
                notes: form.elements.appointmentNotes.value
            };

            // Mock API call - replace with real API
            await this.saveAppointment(appointmentData);
            this.hideModal();
            this.loadAppointments();
        } catch (error) {
            console.error('Error saving appointment:', error);
        }
    }

    hideModal() {
        const modal = document.getElementById('appointmentModal');
        if (modal) {
            modal.hidden = true;
        }
    }

    async saveAppointment(appointmentData) {
        // Mock API call - replace with real API
        console.log('Saving appointment:', appointmentData);
        // Add to appointments array
        this.appointments.push({
            id: `A${this.appointments.length + 1}`,
            patientName: 'New Patient',
            ...appointmentData,
            status: 'scheduled'
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const appointmentManager = new AppointmentManager();
}); 