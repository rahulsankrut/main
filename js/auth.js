// Authentication and User Management
class Auth {
    constructor() {
        console.log('Auth class initialized'); // Debug log
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        console.log('Auth init called'); // Debug log
        const session = localStorage.getItem('medportal_session');
        if (session) {
            this.currentUser = JSON.parse(session);
            this.isAuthenticated = true;
            console.log('Found existing session'); // Debug log
        }
    }

    async login(email, password) {
        console.log('Login attempt:', email); // Debug log
        try {
            if (email === 'doctor@example.com' && password === 'password') {
                this.currentUser = {
                    id: '1',
                    name: 'Dr. Smith',
                    email: email,
                    role: 'doctor'
                };
                this.isAuthenticated = true;
                localStorage.setItem('medportal_session', JSON.stringify(this.currentUser));
                console.log('Login successful'); // Debug log
                return true;
            }
            console.log('Invalid credentials'); // Debug log
            throw new Error('Invalid credentials');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    logout() {
        console.log('Logout called'); // Debug log
        this.isAuthenticated = false;
        this.currentUser = null;
        localStorage.removeItem('medportal_session');
        window.location.href = 'index.html';
    }

    checkAuth() {
        console.log('Checking auth status:', this.isAuthenticated); // Debug log
        if (!this.isAuthenticated) {
            window.location.href = 'index.html';
        }
    }
}