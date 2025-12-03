// Credenciales de administrador
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '1234qwe';

// Verificar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    
    // Configurar event listeners para login
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    
    // Configurar logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

function checkAuthStatus() {
    const isAdminPage = window.location.pathname.includes('administracion.html');
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (isAdminPage && !isLoggedIn) {
        // Redirigir al login si no está autenticado
        window.location.href = 'index.html';
    }
}

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const alertElement = document.getElementById('login-alert');
    
    if (login(username, password)) {
        showAlert(alertElement, 'Login exitoso', 'success');
        setTimeout(() => {
            window.location.href = 'administracion.html';
        }, 1000);
    } else {
        showAlert(alertElement, 'Usuario o contraseña incorrectos', 'error');
    }
}

function login(username, password) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUsername', username);
        return true;
    }
    return false;
}

function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    window.location.href = 'index.html';
}

function showAlert(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `alert alert-${type}`;
    element.classList.remove('hidden');
    
    setTimeout(() => {
        element.classList.add('hidden');
    }, 5000);
}

// Función global para verificar permisos
function checkAdminPermissions() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}