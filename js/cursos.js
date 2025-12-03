// Configuración de cursos disponibles
const CURSOS_DISPONIBLES = [
    'Pre-Kinder',
    'Kinder',
    'Primero Básico A',
    'Primero Básico B',
    'Segundo Básico A',
    'Tercero Básico A',
    'Cuarto Básico A',
    'Quinto Básico A',
    'Sexto Básico A',
    'Séptimo Básico A',
    'Octavo Básico A'
];

// Función para generar opciones de curso
function generarOpcionesCurso(selectElement) {
    if (!selectElement) return;
    
    selectElement.innerHTML = `
        <option value="">Seleccione un curso</option>
        ${CURSOS_DISPONIBLES.map(curso => 
            `<option value="${curso}">${curso}</option>`
        ).join('')}
    `;
}

// Hacer disponible globalmente
window.CURSOS_DISPONIBLES = CURSOS_DISPONIBLES;
window.generarOpcionesCurso = generarOpcionesCurso;