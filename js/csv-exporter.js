// Exportador de CSV con formato específico - VERSIÓN ACTUALIZADA
class CSVExporter {
    constructor() {
        this.headers = [
            'Marca temporal',
            'Dirección de correo electrónico',
            'Curso:',
            'Apellido Paterno:',
            'Apellido Materno:',
            'Nombres:',
            'Cédula de Identidad:',
            'Nacionalidad:',
            'Fecha de Nacimiento:',
            'N° Pasaporte o DNI:',
            'Lugar de Nacimiento (ciudad o comuna):',
            'Edad:',
            'Domicilio:',
            'Sector:',
            'Fonasa (A, B, C, D); Isapre o Sin Previsión:',
            'Etnia:',
            'Celular de Emergencia:',
            'Culto Religioso',
            'Nombre Completo del Padre:',
            'Rut o Pasaporte(padre):',
            'Nacionalidad(padre):',
            'Fecha de Nacimiento(padre):',
            'Edad(padre):',
            'Nivel Educacional(padre):',
            'E-Mail(padre):',
            'Domicilio(padre):',
            'Sector(padre):',
            'Celular(padre):',
            'Ocupación actual(padre):',
            'Nombre Completo de la Madre:',
            'Rut o Pasaporte(madre):',
            'Nacionalidad(madre):',
            'Fecha de Nacimiento(madre):',
            'Edad(madre):',
            'Nivel Educacional(madre):',
            'E-Mail(madre):',
            'Domicilio(madre):',
            'Sector(madre):',
            'Celular(madre):',
            'Ocupación actual(madre):',
            'Persona(s) con quién vive el alumno/a (Vínculo: padres, madre, papá, abuelos…):',
            'Tipo de vivienda (material sólido, material ligero o mixta):',
            'Pertenencia de la vivienda (propia, arrendada, cedida, allegado, en toma):',
            'Agua potable (SI/NO):',
            'Tipo de baño (alcantarillado, fosa séptica, pozo):',
            'N° de baños:',
            'N° de habitaciones de la vivienda:  *sin contar comedor, cocina, baño',
            'N° de personas que habitan la vivienda:',
            'Tiene registro social de hogares (SI/NO):',
            'N° de personas del grupo familiar que trabajan:',
            'Alumno/a:',
            'Tiene hermanos en el Colegio (SI/NO):',
            '¿En qué curso tiene hermanos?:',
            'Medio de transporte para llegar al Colegio (propia o locomoción colectiva):',
            'Tiempo que tarda en el traslado desde su hogar al Colegio:',
            'Existe algún adulto que apoye en el aprendizaje y labores escolares del alumno/a en el hogar (SI/NO):',
            'Existe en el hogar un lugar adecuado para realizar las labores escolares (SI/NO):',
            'Si existe el lugar para realizar las labores escolares, ¿cómo lo calificaría con nota del 1.0 a 7.0?:',
            'Pertenece algún Programa Social (Junaeb, Chile Solidario, Organismo colaborador del Sename u otro)(SI/NO):',
            'Si respondió SI, ¿Cuál sería?',
            'Nombre Completo Apoderado/a Titular:',
            'Celular(titular):',
            'Rut o Pasaporte(titular):',
            'E-Mail(titular):',
            'Indique el último nivel educacional cursado. (Si está estudiando, indique el nivel que se encuentra cursando):',
            '¿Cuál es su situación laboral actual? Sin trabajo',
            '¿Cuál es su situación laboral actual? Con trabajo',
            'Si actualmente se encuentra trabajando, ¿dónde trabaja principalmente? En el hogar',
            'Si actualmente se encuentra trabajando, ¿dónde trabaja principalmente? Fuera del hogar',
            'Nombre Completo Apoderado/a Suplente:',
            'Celular(suplente):',
            'Rut o Pasaporte(suplente):',
            'E-Mail(suplente):',
            'Colegio de procedencia.:',
            'Ha repetido algún curso (SI/NO):',
            'Si respondió SI, ¿qué curso(s)?:',
            '¿Pertenece a un Programa Integración Escolar PIE? (SI/NO):',
            'Si respondió SI, ¿Cuál sería el diagnóstico?',
            '¿Padece alguna enfermedad? (SI/NO):',
            'Si respondió SI, ¿cuál sería?.:',
            'Toma algún medicamento (SI/NO):',
            'Si respondió SI, ¿cuál sería?..:',
            'Es alérgico/a (SI/NO)',
            'Si respondió SI, ¿cuál sería?...:',
            '¿Tiene algún medicamento contraindicado? (SI/NO):',
            'Si respondió SI, ¿cuál sería?....:',
            'Problemas de Salud Significativo para no realizar Asignatura de Educación Física (SI/NO):',
            'Si respondió SI, ¿cuál sería?: *Si el alumno cuenta con alguna enfermedad, favor traer certificado médico actualizado.',
            'Nombre 1:',
            'Rut o pasaporte 1:',
            'Celular 1:',
            'Parentesco 1:',
            'Nombre 2:',
            'Rut o pasaporte 2:',
            'Celular 2:',
            'Parentesco 2:',
            'Declaro conocer  y aceptar el Proyecto Educativo, Reglamento Interno y Reglamento de Evaluación del Colegio La Herradura, así como, las responsabilidades que debo cumplir como Apoderado/a, especialmente en asistir al establecimiento educacional, cada vez que sea citado o a reuniones de curso.',
            'La información entregada es fidedigna, haciéndome responsable de cualquier omisión. Además, me comprometo a actualizar los datos de la Ficha Escolar, cuando sea necesario.',
            'Autorizo al Colegio La Herradura a utilizar medios audiovisuales y fotográficos de mi pupilo/a en actividades de difusión del Colegio ante la comunidad.',
            'Nombre apoderado que firmara',
            'RUT o PASAPORTE del apoderado que firmara',
            'Problemas de salud Visual',
            'Problemas de salud Auditivo:',
            'Problemas de salud Cardiaco:',
            'Problemas de salud Columna:',
            'Peso(Kg)',
            'Talla(Cm)',
            'Grupo sanguíneo:'
        ];
    }

    // Mapeo de nombres de campos del formulario a los encabezados del CSV
    getFieldMapping() {
        return {
            // NUEVOS CAMPOS
            'emailUsuario': 'Dirección de correo electrónico',
            'cursoEstudiante': 'Curso:',
            
            // Datos básicos
            'apellidoPaterno': 'Apellido Paterno:',
            'apellidoMaterno': 'Apellido Materno:',
            'nombres': 'Nombres:',
            'cedulaIdentidad': 'Cédula de Identidad:',
            'nacionalidad': 'Nacionalidad:',
            'fechaNacimiento': 'Fecha de Nacimiento:',
            'pasaporteDNI': 'N° Pasaporte o DNI:',
            'lugarNacimiento': 'Lugar de Nacimiento (ciudad o comuna):',
            'edad': 'Edad:',
            'domicilio': 'Domicilio:',
            'sector': 'Sector:',
            'prevision': 'Fonasa (A, B, C, D); Isapre o Sin Previsión:',
            'etnia': 'Etnia:',
            'celularEmergencia': 'Celular de Emergencia:',
            'cultoReligioso': 'Culto Religioso',
            
            // Padre
            'nombrePadre': 'Nombre Completo del Padre:',
            'rutPasaportePadre': 'Rut o Pasaporte(padre):',
            'nacionalidadPadre': 'Nacionalidad(padre):',
            'fechaNacimientoPadre': 'Fecha de Nacimiento(padre):',
            'edadPadre': 'Edad(padre):',
            'nivelEducacionalPadre': 'Nivel Educacional(padre):',
            'emailPadre': 'E-Mail(padre):',
            'domicilioPadre': 'Domicilio(padre):',
            'sectorPadre': 'Sector(padre):',
            'celularPadre': 'Celular(padre):',
            'ocupacionPadre': 'Ocupación actual(padre):',
            
            // Madre
            'nombreMadre': 'Nombre Completo de la Madre:',
            'rutPasaporteMadre': 'Rut o Pasaporte(madre):',
            'nacionalidadMadre': 'Nacionalidad(madre):',
            'fechaNacimientoMadre': 'Fecha de Nacimiento(madre):',
            'edadMadre': 'Edad(madre):',
            'nivelEducacionalMadre': 'Nivel Educacional(madre):',
            'emailMadre': 'E-Mail(madre):',
            'domicilioMadre': 'Domicilio(madre):',
            'sectorMadre': 'Sector(madre):',
            'celularMadre': 'Celular(madre):',
            'ocupacionMadre': 'Ocupación actual(madre):',
            
            // Antecedentes familiares
            'personasConQuienVive': 'Persona(s) con quién vive el alumno/a (Vínculo: padres, madre, papá, abuelos…):',
            
            // Antecedentes sociales
            'tipoVivienda': 'Tipo de vivienda (material sólido, material ligero o mixta):',
            'pertenenciaVivienda': 'Pertenencia de la vivienda (propia, arrendada, cedida, allegado, en toma):',
            'aguaPotable': 'Agua potable (SI/NO):',
            'tipoBano': 'Tipo de baño (alcantarillado, fosa séptica, pozo):',
            'numeroBanos': 'N° de baños:',
            'numeroHabitaciones': 'N° de habitaciones de la vivienda:  *sin contar comedor, cocina, baño',
            'numeroPersonasVivienda': 'N° de personas que habitan la vivienda:',
            'registroSocialHogares': 'Tiene registro social de hogares (SI/NO):',
            'numeroPersonasTrabajan': 'N° de personas del grupo familiar que trabajan:',
            'alumnoCategoria': 'Alumno/a:',
            'hermanosEnColegio': 'Tiene hermanos en el Colegio (SI/NO):',
            'cursosHermanos': '¿En qué curso tiene hermanos?:',
            'medioTransporte': 'Medio de transporte para llegar al Colegio (propia o locomoción colectiva):',
            'tiempoTraslado': 'Tiempo que tarda en el traslado desde su hogar al Colegio:',
            'adultoApoyo': 'Existe algún adulto que apoye en el aprendizaje y labores escolares del alumno/a en el hogar (SI/NO):',
            'lugarEstudio': 'Existe en el hogar un lugar adecuado para realizar las labores escolares (SI/NO):',
            'calificacionLugarEstudio': 'Si existe el lugar para realizar las labores escolares, ¿cómo lo calificaría con nota del 1.0 a 7.0?:',
            'perteneceProgramaSocial': 'Pertenece algún Programa Social (Junaeb, Chile Solidario, Organismo colaborador del Sename u otro)(SI/NO):',
            'cualProgramaSocial': 'Si respondió SI, ¿Cuál sería?',
            
            // Apoderado titular
            'nombreApoderadoTitular': 'Nombre Completo Apoderado/a Titular:',
            'celularTitular': 'Celular(titular):',
            'rutPasaporteTitular': 'Rut o Pasaporte(titular):',
            'emailTitular': 'E-Mail(titular):',
            'nivelEducacionalTitular': 'Indique el último nivel educacional cursado. (Si está estudiando, indique el nivel que se encuentra cursando):',
            'situacionLaboralTitular': '¿Cuál es su situación laboral actual? Con trabajo',
            'lugarTrabajoTitular': 'Si actualmente se encuentra trabajando, ¿dónde trabaja principalmente? Fuera del hogar',
            
            // Apoderado suplente
            'nombreApoderadoSuplente': 'Nombre Completo Apoderado/a Suplente:',
            'celularSuplente': 'Celular(suplente):',
            'rutPasaporteSuplente': 'Rut o Pasaporte(suplente):',
            'emailSuplente': 'E-Mail(suplente):',
            
            // Académicos
            'colegioProcedencia': 'Colegio de procedencia.:',
            'haRepetido': 'Ha repetido algún curso (SI/NO):',
            'cursosRepetidos': 'Si respondió SI, ¿qué curso(s)?:',
            'pertenecePIE': '¿Pertenece a un Programa Integración Escolar PIE? (SI/NO):',
            'diagnosticoPIE': 'Si respondió SI, ¿Cuál sería el diagnóstico?',
            
            // Salud
            'padeceEnfermedad': '¿Padece alguna enfermedad? (SI/NO):',
            'cualEnfermedad': 'Si respondió SI, ¿cuál sería?.:',
            'tomaMedicamento': 'Toma algún medicamento (SI/NO):',
            'cualMedicamento': 'Si respondió SI, ¿cuál sería?..:',
            'esAlergico': 'Es alérgico/a (SI/NO)',
            'cualAlergia': 'Si respondió SI, ¿cuál sería?...:',
            'medicamentoContraindicado': '¿Tiene algún medicamento contraindicado? (SI/NO):',
            'cualMedicamentoContraindicado': 'Si respondió SI, ¿cuál sería?....:',
            'problemaSaludEF': 'Problemas de Salud Significativo para no realizar Asignatura de Educación Física (SI/NO):',
            'cualProblemaSaludEF': 'Si respondió SI, ¿cuál sería?: *Si el alumno cuenta con alguna enfermedad, favor traer certificado médico actualizado.',
            
            // Retiro
            'nombreRetiro1': 'Nombre 1:',
            'rutPasaporteRetiro1': 'Rut o pasaporte 1:',
            'celularRetiro1': 'Celular 1:',
            'parentescoRetiro1': 'Parentesco 1:',
            'nombreRetiro2': 'Nombre 2:',
            'rutPasaporteRetiro2': 'Rut o pasaporte 2:',
            'celularRetiro2': 'Celular 2:',
            'parentescoRetiro2': 'Parentesco 2:',
            
            // Declaraciones
            'declaracion1': 'Declaro conocer  y aceptar el Proyecto Educativo, Reglamento Interno y Reglamento de Evaluación del Colegio La Herradura, así como, las responsabilidades que debo cumplir como Apoderado/a, especialmente en asistir al establecimiento educacional, cada vez que sea citado o a reuniones de curso.',
            'declaracion2': 'La información entregada es fidedigna, haciéndome responsable de cualquier omisión. Además, me comprometo a actualizar los datos de la Ficha Escolar, cuando sea necesario.',
            'declaracion3': 'Autorizo al Colegio La Herradura a utilizar medios audiovisuales y fotográficos de mi pupilo/a en actividades de difusión del Colegio ante la comunidad.',
            
            // Firma
            'nombreApoderadoFirma': 'Nombre apoderado que firmara',
            'rutPasaporteFirma': 'RUT o PASAPORTE del apoderado que firmara',
            
            // Salud específica
            'problemaVisual': 'Problemas de salud Visual',
            'problemaAuditivo': 'Problemas de salud Auditivo:',
            'problemaCardiaco': 'Problemas de salud Cardiaco:',
            'problemaColumna': 'Problemas de salud Columna:',
            'peso': 'Peso(Kg)',
            'talla': 'Talla(Cm)',
            'grupoSanguineo': 'Grupo sanguíneo:'
        };
    }

    // Función para exportar datos del formulario a CSV
    exportFormData(formData) {
        const data = this.prepareData(formData);
        const csvContent = this.convertToCSV(data);
        this.downloadCSV(csvContent, `matricula_${new Date().toISOString().split('T')[0]}.csv`);
    }

    // Preparar datos para CSV
    prepareData(formData) {
        const mapping = this.getFieldMapping();
        const rowData = [];
        
        // 1. Marca temporal
        rowData.push(new Date().toLocaleString());
        
        // 2. Dirección de correo electrónico (NUEVO CAMPO)
        rowData.push(this.escapeCSV(formData.emailUsuario || ''));
        
        // 3. Curso (NUEVO CAMPO)
        rowData.push(this.escapeCSV(formData.cursoEstudiante || ''));
        
        // 4. Procesar cada campo según el mapeo
        this.headers.slice(3).forEach(header => {
            let value = '';
            
            // Buscar el campo correspondiente en el mapeo
            const fieldName = Object.keys(mapping).find(key => mapping[key] === header);
            
            if (fieldName && formData[fieldName]) {
                value = formData[fieldName];
                
                // Procesar valores especiales
                if (header.includes('SI/NO')) {
                    value = this.formatYesNo(value);
                } else if (header.includes('Fecha')) {
                    value = this.formatDate(value);
                }
            }
            
            // Para campos de salud específica (checkbox)
            if (header === 'Problemas de salud Visual') {
                value = formData.problemaVisual === 'SI' ? 'Sí' : 'No';
            } else if (header === 'Problemas de salud Auditivo:') {
                value = formData.problemaAuditivo === 'SI' ? 'Sí' : 'No';
            } else if (header === 'Problemas de salud Cardiaco:') {
                value = formData.problemaCardiaco === 'SI' ? 'Sí' : 'No';
            } else if (header === 'Problemas de salud Columna:') {
                value = formData.problemaColumna === 'SI' ? 'Sí' : 'No';
            }
            
            // Para declaraciones (checkbox)
            if (header.includes('Declaro conocer') || header.includes('La información entregada') || header.includes('Autorizo al Colegio')) {
                const decNumber = header.includes('Declaro conocer') ? 'declaracion1' : 
                                header.includes('La información') ? 'declaracion2' : 'declaracion3';
                value = formData[decNumber] === 'Acepto' ? 'Aceptado' : 'No aceptado';
            }
            
            rowData.push(this.escapeCSV(value));
        });
        
        return rowData;
    }

    // Convertir array a string CSV
    convertToCSV(data) {
        const csvRows = [];
        
        // Agregar encabezados
        csvRows.push(this.headers.join(','));
        
        // Agregar datos
        csvRows.push(data.join(','));
        
        return csvRows.join('\n');
    }

    // Descargar archivo CSV
    downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }

    // Funciones auxiliares
    formatYesNo(value) {
        if (typeof value === 'string') {
            return value.toUpperCase() === 'SI' ? 'Sí' : 'No';
        }
        return value ? 'Sí' : 'No';
    }

    formatDate(dateString) {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-CL');
        } catch (e) {
            return dateString;
        }
    }

    escapeCSV(value) {
        if (value === null || value === undefined) return '';
        
        const stringValue = String(value);
        
        // Si contiene comas, saltos de línea o comillas, envolver en comillas
        if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
        }
        
        return stringValue;
    }
}

// Función global para exportar datos del formulario
window.exportToCSV = function(formData) {
    const exporter = new CSVExporter();
    exporter.exportFormData(formData);
};

// Función para exportar desde el formulario actual
window.exportCurrentForm = function() {
    const form = document.getElementById('matricula-form');
    if (!form) {
        alert('No se encontró el formulario');
        return;
    }
    
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Agregar datos de checkboxes de salud
    data.problemaVisual = document.getElementById('problemaVisual')?.checked ? 'SI' : 'NO';
    data.problemaAuditivo = document.getElementById('problemaAuditivo')?.checked ? 'SI' : 'NO';
    data.problemaCardiaco = document.getElementById('problemaCardiaco')?.checked ? 'SI' : 'NO';
    data.problemaColumna = document.getElementById('problemaColumna')?.checked ? 'SI' : 'NO';
    
    const exporter = new CSVExporter();
    exporter.exportFormData(data);
};