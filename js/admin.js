document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
    setupAdminEventListeners();
    loadAdminData();
});

function initializeAdminPanel() {
    if (!checkAdminPermissions()) {
        window.location.href = 'index.html';
        return;
    }
    
    console.log('Panel de administración inicializado');
}

function setupAdminEventListeners() {
    // Navegación entre pestañas
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            navigateToAdminTab(tabId);
        });
    });
    
    // Botones de acción
    document.getElementById('refresh-data').addEventListener('click', loadAdminData);
    document.getElementById('add-matricula').addEventListener('click', addNewMatricula);
    document.getElementById('agregar-usuario').addEventListener('click', addNewUser);
    document.getElementById('exportar-datos-btn').addEventListener('click', exportData);
    
    // Filtros
    document.getElementById('filtro-matricula').addEventListener('change', toggleFilterOptions);
}

function navigateToAdminTab(tabId) {
    // Ocultar todos los contenidos de pestañas
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Mostrar el contenido de la pestaña seleccionada
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Actualizar pestañas activas
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === tabId) {
            tab.classList.add('active');
        }
    });
}

function loadAdminData() {
    loadMatriculasData();
    loadUsersData();
    updateAdminStats();
}

function loadMatriculasData() {
    const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
    const matriculasBody = document.getElementById('matriculas-body');
    
    matriculasBody.innerHTML = '';
    
    if (matriculas.length === 0) {
        matriculasBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 20px;">
                    No hay matrículas registradas
                </td>
            </tr>
        `;
        return;
    }
    
    matriculas.forEach((matricula, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${matricula.apellidoPaterno || ''} ${matricula.apellidoMaterno || ''}</td>
            <td>${matricula.nombres || ''}</td>
            <td>${matricula.cedulaIdentidad || ''}</td>
            <td>${new Date(matricula.fechaRegistro).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-warning" onclick="viewMatricula(${matricula.id})">Ver</button>
                <button class="btn btn-danger" onclick="deleteMatricula(${matricula.id})">Eliminar</button>
                <button class="btn" onclick="exportMatriculaPDF(${matricula.id})">PDF</button>
            </td>
        `;
        matriculasBody.appendChild(row);
    });
}

function loadUsersData() {
    // En una implementación real, esto vendría de una base de datos
    const users = [
        { username: 'admin', fechaCreacion: '2024-01-01' }
    ];
    
    const usuariosBody = document.getElementById('usuarios-body');
    usuariosBody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${new Date(user.fechaCreacion).toLocaleDateString()}</td>
            <td>
                ${user.username !== 'admin' ? 
                    '<button class="btn btn-danger" onclick="deleteUser(\'' + user.username + '\')">Eliminar</button>' : 
                    '<button class="btn btn-danger" disabled>Eliminar</button>'
                }
            </td>
        `;
        usuariosBody.appendChild(row);
    });
}

function updateAdminStats() {
    const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
    
    // Actualizar estadísticas en la interfaz si existen
    const totalMatriculas = document.getElementById('total-matriculas');
    if (totalMatriculas) {
        totalMatriculas.textContent = matriculas.length;
    }
}

function addNewMatricula() {
    window.location.href = 'formulario.html';
}

function addNewUser() {
    const nuevoUsuario = document.getElementById('nuevo-usuario').value;
    const nuevaContrasena = document.getElementById('nueva-contrasena').value;
    
    if (!nuevoUsuario || !nuevaContrasena) {
        alert('Por favor, complete ambos campos');
        return;
    }
    
    // En una implementación real, aquí se guardaría en una base de datos
    alert(`Usuario "${nuevoUsuario}" agregado correctamente (simulación)`);
    
    // Limpiar campos
    document.getElementById('nuevo-usuario').value = '';
    document.getElementById('nueva-contrasena').value = '';
    
    // Recargar lista de usuarios
    loadUsersData();
}

function toggleFilterOptions() {
    const filtro = document.getElementById('filtro-matricula').value;
    const filtroFecha = document.getElementById('filtro-fecha');
    
    if (filtro === 'fecha') {
        filtroFecha.style.display = 'flex';
    } else {
        filtroFecha.style.display = 'none';
    }
}

// Funciones globales para los botones de acción
window.viewMatricula = function(matriculaId) {
    // Redirigir al formulario con los datos de la matrícula
    localStorage.setItem('editMatriculaId', matriculaId);
    window.location.href = 'formulario.html';
};

window.deleteMatricula = function(matriculaId) {
    if (confirm('¿Está seguro de que desea eliminar esta matrícula?')) {
        const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
        const updatedMatriculas = matriculas.filter(m => m.id !== matriculaId);
        localStorage.setItem('matriculas', JSON.stringify(updatedMatriculas));
        loadAdminData();
        alert('Matrícula eliminada correctamente');
    }
};

window.deleteUser = function(username) {
    if (confirm(`¿Está seguro de que desea eliminar al usuario "${username}"?`)) {
        // En una implementación real, eliminar de la base de datos
        alert(`Usuario "${username}" eliminado (simulación)`);
        loadUsersData();
    }
};

window.exportMatriculaPDF = function(matriculaId) {
    const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
    const matricula = matriculas.find(m => m.id === matriculaId);
    
    if (matricula) {
        generatePDF(matricula);
    } else {
        alert('Matrícula no encontrada');
    }
};