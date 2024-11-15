// Authentication and User Management
class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check for existing session
        const session = localStorage.getItem('medportal_session');
        if (session) {
            this.currentUser = JSON.parse(session);
            this.isAuthenticated = true;
        }
    }

    async login(email, password) {
        try {
            // Mock API call - replace with real API
            if (email === 'doctor@example.com' && password === 'password') {
                this.currentUser = {
                    id: '1',
                    name: 'Dr. Smith',
                    email: email,
                    role: 'doctor'
                };
                this.isAuthenticated = true;
                localStorage.setItem('medportal_session', JSON.stringify(this.currentUser));
                return true;
            }
            throw new Error('Invalid credentials');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    logout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        localStorage.removeItem('medportal_session');
        window.location.href = 'index.html';
    }

    checkAuth() {
        if (!this.isAuthenticated) {
            window.location.href = 'index.html';
        }
    }
}