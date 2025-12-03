// Configuración del sistema
const SYSTEM_CONFIG = {
    school: {
        name: 'Colegio La Herradura',
        year: 2025,
        address: '',
        phone: ''
    },
    
    pdf: {
        margin: 20,
        fontSize: {
            title: 16,
            subtitle: 14,
            normal: 11,
            small: 10
        },
        colors: {
            primary: [26, 82, 118], // #1a5276
            secondary: [231, 76, 60] // #e74c3c
        }
    },
    
    storage: {
        key: 'matriculas_colegio_herradura',
        usersKey: 'admin_users'
    }
};

// Variables de mapeo de campos del formulario al PDF
const FIELD_MAPPING = {
    // Datos del alumno
    'apellidoPaterno': 'Apellido Paterno',
    'apellidoMaterno': 'Apellido Materno',
    'nombres': 'Nombres',
    'cedulaIdentidad': 'Cédula de Identidad',
    'nacionalidad': 'Nacionalidad',
    'fechaNacimiento': 'Fecha de Nacimiento',
    'pasaporteDNI': 'N° Pasaporte o DNI',
    'lugarNacimiento': 'Lugar de Nacimiento',
    'edad': 'Edad',
    'domicilio': 'Domicilio',
    'sector': 'Sector',
    'prevision': 'Previsión',
    'etnia': 'Etnia',
    'celularEmergencia': 'Celular de Emergencia',
    'cultoReligioso': 'Culto religioso',
    
    // Padres
    'nombrePadre': 'Nombre del Padre',
    'rutPasaportePadre': 'Rut Padre',
    'nacionalidadPadre': 'Nacionalidad Padre',
    'fechaNacimientoPadre': 'Fecha Nacimiento Padre',
    'edadPadre': 'Edad Padre',
    'nivelEducacionalPadre': 'Nivel Educacional Padre',
    'emailPadre': 'Email Padre',
    'domicilioPadre': 'Domicilio Padre',
    'sectorPadre': 'Sector Padre',
    'celularPadre': 'Celular Padre',
    'ocupacionPadre': 'Ocupación Padre',
    
    // Madre (similar mapeo)
    // ... resto de campos
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SYSTEM_CONFIG, FIELD_MAPPING };
}