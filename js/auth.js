// Authentication and User Management
class Auth {
    constructor() {
        console.log('Auth initialized');
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        console.log('Checking session');
        const session = localStorage.getItem('medportal_session');
        if (session) {
            this.currentUser = JSON.parse(session);
            this.isAuthenticated = true;
            console.log('Session found:', this.currentUser);
        }
    }

    async login(email, password) {
        console.log('Login attempt:', email);
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
                console.log('Login successful');
                return true;
            }
            console.log('Invalid credentials');
            throw new Error('Invalid credentials');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    checkAuth() {
        console.log('Checking auth:', this.isAuthenticated);
        if (!this.isAuthenticated) {
            console.log('Not authenticated, redirecting to login');
            window.location.href = 'index.html';
        }
    }

    logout() {
        console.log('Logging out');
        this.isAuthenticated = false;
        this.currentUser = null;
        localStorage.removeItem('medportal_session');
        window.location.href = 'index.html';
    }
}