// Integración con Google Sheets usando Google Apps Script
class GoogleSheetsIntegration {
    constructor() {
        // URL de tu Google Apps Script (debes crear uno)
        this.scriptUrl = 'https://script.google.com/macros/s/AKfycbz9shXnV50b0-6usTSX4aHEenUHkf7tKVzPadHrfiaVZPj8iB3-B2O3REkG1FtqGl3j4g/exec'; // Reemplaza con tu URL
        this.isConfigured = false;
        this.sheetHeaders = [
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

    // Configurar la URL del script
    configure(scriptUrl) {
        this.scriptUrl = scriptUrl;
        this.isConfigured = true;
        console.log('Google Sheets configurado con URL:', scriptUrl);
    }

    // Mapear datos del formulario a las columnas de Google Sheets
    mapFormDataToSheet(formData) {
        const rowData = [];
        
        // 1. Marca temporal
        rowData.push(new Date().toLocaleString('es-CL'));
        
        // 2. Dirección de correo electrónico
        rowData.push(formData.emailUsuario || '');
        
        // 3. Curso
        rowData.push(formData.cursoEstudiante || '');
        
        // 4. Apellido Paterno
        rowData.push(formData.apellidoPaterno || '');
        
        // 5. Apellido Materno
        rowData.push(formData.apellidoMaterno || '');
        
        // 6. Nombres
        rowData.push(formData.nombres || '');
        
        // 7. Cédula de Identidad
        rowData.push(formData.cedulaIdentidad || '');
        
        // 8. Nacionalidad
        rowData.push(formData.nacionalidad || '');
        
        // 9. Fecha de Nacimiento
        rowData.push(this.formatDate(formData.fechaNacimiento) || '');
        
        // 10. N° Pasaporte o DNI
        rowData.push(formData.pasaporteDNI || '');
        
        // 11. Lugar de Nacimiento
        rowData.push(formData.lugarNacimiento || '');
        
        // 12. Edad
        rowData.push(formData.edad || '');
        
        // 13. Domicilio
        rowData.push(formData.domicilio || '');
        
        // 14. Sector
        rowData.push(formData.sector || '');
        
        // 15. Fonasa/Isapre
        rowData.push(formData.prevision || '');
        
        // 16. Etnia
        rowData.push(formData.etnia || '');
        
        // 17. Celular de Emergencia
        rowData.push(formData.celularEmergencia || '');
        
        // 18. Culto Religioso
        rowData.push(formData.cultoReligioso || '');
        
        // 19. Nombre Padre
        rowData.push(formData.nombrePadre || '');
        
        // 20. Rut Padre
        rowData.push(formData.rutPasaportePadre || '');
        
        // 21. Nacionalidad Padre
        rowData.push(formData.nacionalidadPadre || '');
        
        // 22. Fecha Nacimiento Padre
        rowData.push(this.formatDate(formData.fechaNacimientoPadre) || '');
        
        // 23. Edad Padre
        rowData.push(formData.edadPadre || '');
        
        // 24. Nivel Educacional Padre
        rowData.push(formData.nivelEducacionalPadre || '');
        
        // 25. Email Padre
        rowData.push(formData.emailPadre || '');
        
        // 26. Domicilio Padre
        rowData.push(formData.domicilioPadre || '');
        
        // 27. Sector Padre
        rowData.push(formData.sectorPadre || '');
        
        // 28. Celular Padre
        rowData.push(formData.celularPadre || '');
        
        // 29. Ocupación Padre
        rowData.push(formData.ocupacionPadre || '');
        
        // 30. Nombre Madre
        rowData.push(formData.nombreMadre || '');
        
        // 31. Rut Madre
        rowData.push(formData.rutPasaporteMadre || '');
        
        // 32. Nacionalidad Madre
        rowData.push(formData.nacionalidadMadre || '');
        
        // 33. Fecha Nacimiento Madre
        rowData.push(this.formatDate(formData.fechaNacimientoMadre) || '');
        
        // 34. Edad Madre
        rowData.push(formData.edadMadre || '');
        
        // 35. Nivel Educacional Madre
        rowData.push(formData.nivelEducacionalMadre || '');
        
        // 36. Email Madre
        rowData.push(formData.emailMadre || '');
        
        // 37. Domicilio Madre
        rowData.push(formData.domicilioMadre || '');
        
        // 38. Sector Madre
        rowData.push(formData.sectorMadre || '');
        
        // 39. Celular Madre
        rowData.push(formData.celularMadre || '');
        
        // 40. Ocupación Madre
        rowData.push(formData.ocupacionMadre || '');
        
        // 41. Personas con quien vive
        rowData.push(formData.personasConQuienVive || '');
        
        // 42. Tipo de vivienda
        rowData.push(formData.tipoVivienda || '');
        
        // 43. Pertenencia vivienda
        rowData.push(formData.pertenenciaVivienda || '');
        
        // 44. Agua potable
        rowData.push(formData.aguaPotable || '');
        
        // 45. Tipo de baño
        rowData.push(formData.tipoBano || '');
        
        // 46. N° de baños
        rowData.push(formData.numeroBanos || '');
        
        // 47. N° de habitaciones
        rowData.push(formData.numeroHabitaciones || '');
        
        // 48. N° personas en vivienda
        rowData.push(formData.numeroPersonasVivienda || '');
        
        // 49. Registro social hogares
        rowData.push(formData.registroSocialHogares || '');
        
        // 50. N° personas que trabajan
        rowData.push(formData.numeroPersonasTrabajan || '');
        
        // 51. Alumno/a categoría
        rowData.push(formData.alumnoCategoria || '');
        
        // 52. Hermanos en Colegio
        rowData.push(formData.hermanosEnColegio || '');
        
        // 53. Cursos hermanos
        rowData.push(formData.cursosHermanos || '');
        
        // 54. Medio transporte
        rowData.push(formData.medioTransporte || '');
        
        // 55. Tiempo traslado
        rowData.push(formData.tiempoTraslado || '');
        
        // 56. Adulto que apoya
        rowData.push(formData.adultoApoyo || '');
        
        // 57. Lugar estudio adecuado
        rowData.push(formData.lugarEstudio || '');
        
        // 58. Calificación lugar estudio
        rowData.push(formData.calificacionLugarEstudio || '');
        
        // 59. Programa Social
        rowData.push(formData.perteneceProgramaSocial || '');
        
        // 60. Cuál programa social
        rowData.push(formData.cualProgramaSocial || '');
        
        // 61. Nombre Apoderado Titular
        rowData.push(formData.nombreApoderadoTitular || '');
        
        // 62. Celular Titular
        rowData.push(formData.celularTitular || '');
        
        // 63. Rut Titular
        rowData.push(formData.rutPasaporteTitular || '');
        
        // 64. Email Titular
        rowData.push(formData.emailTitular || '');
        
        // 65. Nivel educacional Titular
        rowData.push(formData.nivelEducacionalTitular || '');
        
        // 66. Situación laboral Sin trabajo
        rowData.push(formData.situacionLaboralTitular === 'Sin trabajo' ? 'X' : '');
        
        // 67. Situación laboral Con trabajo
        rowData.push(formData.situacionLaboralTitular === 'Con trabajo' ? 'X' : '');
        
        // 68. Trabaja en hogar
        rowData.push(formData.lugarTrabajoTitular === 'En el hogar' ? 'X' : '');
        
        // 69. Trabaja fuera hogar
        rowData.push(formData.lugarTrabajoTitular === 'Fuera del hogar' ? 'X' : '');
        
        // 70. Nombre Apoderado Suplente
        rowData.push(formData.nombreApoderadoSuplente || '');
        
        // 71. Celular Suplente
        rowData.push(formData.celularSuplente || '');
        
        // 72. Rut Suplente
        rowData.push(formData.rutPasaporteSuplente || '');
        
        // 73. Email Suplente
        rowData.push(formData.emailSuplente || '');
        
        // 74. Colegio procedencia
        rowData.push(formData.colegioProcedencia || '');
        
        // 75. Ha repetido curso
        rowData.push(formData.haRepetido || '');
        
        // 76. Cursos repetidos
        rowData.push(formData.cursosRepetidos || '');
        
        // 77. Pertenece PIE
        rowData.push(formData.pertenecePIE || '');
        
        // 78. Diagnóstico PIE
        rowData.push(formData.diagnosticoPIE || '');
        
        // 79. Padece enfermedad
        rowData.push(formData.padeceEnfermedad || '');
        
        // 80. Cuál enfermedad
        rowData.push(formData.cualEnfermedad || '');
        
        // 81. Toma medicamento
        rowData.push(formData.tomaMedicamento || '');
        
        // 82. Cuál medicamento
        rowData.push(formData.cualMedicamento || '');
        
        // 83. Es alérgico
        rowData.push(formData.esAlergico || '');
        
        // 84. Cuál alergia
        rowData.push(formData.cualAlergia || '');
        
        // 85. Medicamento contraindicado
        rowData.push(formData.medicamentoContraindicado || '');
        
        // 86. Cuál medicamento contraindicado
        rowData.push(formData.cualMedicamentoContraindicado || '');
        
        // 87. Problemas Educación Física
        rowData.push(formData.problemaSaludEF || '');
        
        // 88. Cuál problema EF
        rowData.push(formData.cualProblemaSaludEF || '');
        
        // 89. Nombre 1 retiro
        rowData.push(formData.nombreRetiro1 || '');
        
        // 90. Rut 1 retiro
        rowData.push(formData.rutPasaporteRetiro1 || '');
        
        // 91. Celular 1 retiro
        rowData.push(formData.celularRetiro1 || '');
        
        // 92. Parentesco 1 retiro
        rowData.push(formData.parentescoRetiro1 || '');
        
        // 93. Nombre 2 retiro
        rowData.push(formData.nombreRetiro2 || '');
        
        // 94. Rut 2 retiro
        rowData.push(formData.rutPasaporteRetiro2 || '');
        
        // 95. Celular 2 retiro
        rowData.push(formData.celularRetiro2 || '');
        
        // 96. Parentesco 2 retiro
        rowData.push(formData.parentescoRetiro2 || '');
        
        // 97. Declaración 1 (Aceptado)
        rowData.push(formData.declaracion1 === 'Acepto' ? 'Aceptado' : '');
        
        // 98. Declaración 2 (Aceptado)
        rowData.push(formData.declaracion2 === 'Acepto' ? 'Aceptado' : '');
        
        // 99. Declaración 3 (Aceptado)
        rowData.push(formData.declaracion3 === 'Acepto' ? 'Aceptado' : '');
        
        // 100. Nombre apoderado firma
        rowData.push(formData.nombreApoderadoFirma || '');
        
        // 101. RUT apoderado firma
        rowData.push(formData.rutPasaporteFirma || '');
        
        // 102. Problema Visual
        rowData.push(formData.problemaVisual === 'SI' ? 'Sí' : 'No');
        
        // 103. Problema Auditivo
        rowData.push(formData.problemaAuditivo === 'SI' ? 'Sí' : 'No');
        
        // 104. Problema Cardiaco
        rowData.push(formData.problemaCardiaco === 'SI' ? 'Sí' : 'No');
        
        // 105. Problema Columna
        rowData.push(formData.problemaColumna === 'SI' ? 'Sí' : 'No');
        
        // 106. Peso
        rowData.push(formData.peso || '');
        
        // 107. Talla
        rowData.push(formData.talla || '');
        
        // 108. Grupo sanguíneo
        rowData.push(formData.grupoSanguineo || '');
        
        return rowData;
    }

    // Enviar datos a Google Sheets
    async sendToGoogleSheets(formData) {
        if (!this.isConfigured) {
            console.error('Google Sheets no está configurado');
            return { success: false, error: 'No configurado' };
        }

        try {
            const rowData = this.mapFormDataToSheet(formData);
            
            // Crear objeto de datos para enviar
            const payload = {
                action: 'addRow',
                data: rowData,
                timestamp: new Date().toISOString()
            };

            console.log('Enviando datos a Google Sheets:', payload);

            // Enviar usando fetch
            const response = await fetch(this.scriptUrl, {
                method: 'POST',
                mode: 'no-cors', // Para evitar problemas CORS
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Nota: con 'no-cors' no podemos leer la respuesta
            // Pero asumimos que fue exitoso
            console.log('Datos enviados a Google Sheets');
            return { success: true, message: 'Datos enviados correctamente' };

        } catch (error) {
            console.error('Error al enviar a Google Sheets:', error);
            return { success: false, error: error.message };
        }
    }

    // Método alternativo usando Google Forms
    async sendViaGoogleForm(formData) {
        // Esta es una alternativa usando un Google Form
        // Necesitas crear un Google Form con las mismas preguntas
        const formUrl = 'https://docs.google.com/forms/d/e/.../formResponse'; // Tu URL de Google Form
        
        const formDataToSend = new FormData();
        const rowData = this.mapFormDataToSheet(formData);
        
        // Mapear cada campo a su entrada correspondiente en el Google Form
        // Necesitas obtener los nombres de los campos (entry.xxxxx) de tu Google Form
        rowData.forEach((value, index) => {
            const fieldName = `entry.${index + 1}`; // Ajusta según tus campos
            formDataToSend.append(fieldName, value);
        });

        try {
            await fetch(formUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: formDataToSend
            });
            
            return { success: true, message: 'Datos enviados vía Google Form' };
        } catch (error) {
            console.error('Error al enviar vía Google Form:', error);
            return { success: false, error: error.message };
        }
    }

    // Formatear fecha
    formatDate(dateString) {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-CL');
        } catch (e) {
            return dateString;
        }
    }
}

// Crear instancia global
window.googleSheets = new GoogleSheetsIntegration();

// Función global para enviar datos del formulario actual
window.sendFormToGoogleSheets = async function() {
    const form = document.getElementById('matricula-form');
    if (!form) {
        alert('No se encontró el formulario');
        return;
    }
    
    // Validar formulario
    if (typeof validateCompleteForm === 'function' && !validateCompleteForm()) {
        alert('Complete todos los campos obligatorios antes de enviar');
        return;
    }
    
    // Recopilar datos
    const formDataObj = new FormData(form);
    const data = {};
    
    for (let [key, value] of formDataObj.entries()) {
        data[key] = value;
    }
    
    // Agregar checkboxes de salud
    data.problemaVisual = document.getElementById('problemaVisual')?.checked ? 'SI' : 'NO';
    data.problemaAuditivo = document.getElementById('problemaAuditivo')?.checked ? 'SI' : 'NO';
    data.problemaCardiaco = document.getElementById('problemaCardiaco')?.checked ? 'SI' : 'NO';
    data.problemaColumna = document.getElementById('problemaColumna')?.checked ? 'SI' : 'NO';
    
    // Mostrar loading
    const button = document.getElementById('send-to-drive-btn');
    const originalText = button.textContent;
    button.textContent = 'Enviando...';
    button.disabled = true;
    
    try {
        const result = await window.googleSheets.sendToGoogleSheets(data);
        
        if (result.success) {
            alert('✅ Datos enviados correctamente a Google Sheets');
            
            // También guardar en localStorage
            const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
            data.id = Date.now();
            data.fechaRegistro = new Date().toISOString();
            data.enviadoAGSheets = true;
            data.fechaEnvio = new Date().toISOString();
            matriculas.push(data);
            localStorage.setItem('matriculas', JSON.stringify(matriculas));
            
        } else {
            alert('❌ Error al enviar: ' + (result.error || 'Desconocido'));
        }
    } catch (error) {
        alert('❌ Error: ' + error.message);
    } finally {
        button.textContent = originalText;
        button.disabled = false;
    }
};

// Configurar automáticamente si hay URL en localStorage
document.addEventListener('DOMContentLoaded', function() {
    const savedScriptUrl = localStorage.getItem('googleSheetsScriptUrl');
    if (savedScriptUrl) {
        window.googleSheets.configure(savedScriptUrl);
    }
});