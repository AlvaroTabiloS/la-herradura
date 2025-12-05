// js/form.js - ARCHIVO COMPLETO DEL FORMULARIO DE MATRÍCULA



// Variable para controlar las pestañas
let currentTab = 'datos-alumno';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz9shXnV50b0-6usTSX4aHEenUHkf7tKVzPadHrfiaVZPj8iB3-B2O3REkG1FtqGl3j4g/exec';

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Formulario de matrícula inicializado');
    initializeForm();
    setupEventListeners();
    loadFormSections();
    setupTabsNavigation();
});

// Agregar esta función en form.js, después de las demás funciones
function setupGoogleSheetsIntegration() {
    const sendBtn = document.getElementById('send-to-drive-btn');

    if (sendBtn) {
        sendBtn.addEventListener('click', async function() {

            
            if (!validateCompleteForm()) {
                showFormAlert('Complete todos los campos obligatorios antes de enviar', 'error');
                return;
            }
            
            // Verificar si Google Sheets está configurado
            window.googleSheets.configure(GOOGLE_SCRIPT_URL);

            if (!window.googleSheets.isConfigured) {
                showFormAlert('La integración con Google Sheets no está configurada correctamente.', 'error');
                return;
            }
            
            // Recopilar datos
            const formData = new FormData(document.getElementById('matricula-form'));
            const matriculaData = {};
            
            for (let [key, value] of formData.entries()) {
                matriculaData[key] = value;
            }
            
            // Agregar checkboxes de salud
            matriculaData.problemaVisual = document.getElementById('problemaVisual')?.checked ? 'SI' : 'NO';
            matriculaData.problemaAuditivo = document.getElementById('problemaAuditivo')?.checked ? 'SI' : 'NO';
            matriculaData.problemaCardiaco = document.getElementById('problemaCardiaco')?.checked ? 'SI' : 'NO';
            matriculaData.problemaColumna = document.getElementById('problemaColumna')?.checked ? 'SI' : 'NO';
            
            // Mostrar loading
            const originalText = sendBtn.textContent;
            sendBtn.textContent = 'Enviando...';
            sendBtn.disabled = true;
            
            try {
                const result = await window.googleSheets.sendToGoogleSheets(matriculaData);
                
                    if (result.success) {
                    showFormAlert('✅ Datos enviados correctamente a Google Sheets', 'success');
                    
                    // También guardar en localStorage
                    matriculaData.id = Date.now();
                    matriculaData.fechaRegistro = new Date().toISOString();
                    matriculaData.enviadoAGSheets = true;
                    matriculaData.fechaEnvio = new Date().toISOString();
                    
                    const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
                    matriculas.push(matriculaData);
                    localStorage.setItem('matriculas', JSON.stringify(matriculas));
                    
                } else {
                    showFormAlert('❌ Error al enviar: ' + (result.error || 'Desconocido'), 'error');
                }
            } catch (error) {
                showFormAlert('❌ Error: ' + error.message, 'error');
            } finally {
                sendBtn.textContent = originalText;
                sendBtn.disabled = false;
            }
        });
    }
}


// Función para inicializar el formulario
function initializeForm() {
    // Cargar datos si estamos editando
    const editId = localStorage.getItem('editMatriculaId');
    if (editId) {
        loadMatriculaForEdit(editId);
        localStorage.removeItem('editMatriculaId');
    }
}

// Función para cargar datos para edición
function loadMatriculaForEdit(matriculaId) {
    const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
    const matricula = matriculas.find(m => m.id == matriculaId);
    
    if (matricula) {
        console.log('Cargando matrícula para edición:', matricula);
        // Esta función se implementaría para llenar el formulario con los datos
        // fillFormWithData(matricula);
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Botones de acción principales
    const saveBtn = document.getElementById('save-form-btn');
    const previewBtn = document.getElementById('preview-pdf-btn');
    const clearBtn = document.getElementById('clear-form-btn');
    const exportBtn = document.getElementById('export-csv-btn');
    
    if (saveBtn) saveBtn.addEventListener('click', () => handleFormSubmit());
    if (previewBtn) previewBtn.addEventListener('click', previewPDF);
    if (clearBtn) clearBtn.addEventListener('click', clearForm);
    if (exportBtn) exportBtn.addEventListener('click', exportCurrentForm);

        const sendToSheetsBtn = document.getElementById('send-to-drive-btn');
    // Enviar formulario
    const form = document.getElementById('matricula-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(e);
        });
    }
    
    // Configurar campos condicionales después de cargar las secciones
    setTimeout(setupConditionalFields, 500);
        setupGoogleSheetsIntegration();
}

// Configurar navegación por pestañas
function setupTabsNavigation() {
    // Crear elemento para mostrar las pestañas si no existe
    const formSections = document.getElementById('form-sections');
    if (formSections && !document.querySelector('.tabs-container')) {
        const tabsHTML = `
            <div class="tabs-container">
                <div class="tabs">
                    <div class="tab ${currentTab === 'datos-alumno' ? 'active' : ''}" data-tab="datos-alumno">1. Datos Alumno</div>
                    <div class="tab ${currentTab === 'antecedentes-familiares' ? 'active' : ''}" data-tab="antecedentes-familiares">2. Familiares</div>
                    <div class="tab ${currentTab === 'antecedentes-sociales' ? 'active' : ''}" data-tab="antecedentes-sociales">3. Sociales</div>
                    <div class="tab ${currentTab === 'apoderados' ? 'active' : ''}" data-tab="apoderados">4. Apoderados</div>
                    <div class="tab ${currentTab === 'academicos' ? 'active' : ''}" data-tab="academicos">5. Académicos</div>
                    <div class="tab ${currentTab === 'salud' ? 'active' : ''}" data-tab="salud">6. Salud</div>
                    <div class="tab ${currentTab === 'verificacion' ? 'active' : ''}" data-tab="verificacion">7. Verificación</div>
                </div>
            </div>
        `;
        formSections.insertAdjacentHTML('afterbegin', tabsHTML);
    }
    
    // Event listeners para pestañas
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab')) {
            const tabId = e.target.getAttribute('data-tab');
            if (validateCurrentTab()) {
                navigateToTab(tabId);
            }
        }
        
        if (e.target.classList.contains('next-tab')) {
            const nextTab = e.target.getAttribute('data-next');
            if (validateCurrentTab()) {
                navigateToTab(nextTab);
            }
        }
        
        if (e.target.classList.contains('prev-tab')) {
            const prevTab = e.target.getAttribute('data-prev');
            navigateToTab(prevTab);
        }
    });
}

// Cargar todas las secciones del formulario
function loadFormSections() {
    const formSections = document.getElementById('form-sections');
    if (formSections) {
        // Si ya hay contenido, no recargar
        if (formSections.innerHTML.trim() === '') {
            formSections.innerHTML = generateAllFormSections();
        }
    }
}

// Generar todas las secciones del formulario
function generateAllFormSections() {
    return `
        <!-- Sección 1: Datos del Alumno -->
        <div class="tab-content active" id="datos-alumno">
            ${generateDatosAlumnoSection()}
        </div>
        
        <!-- Sección 2: Antecedentes Familiares -->
        <div class="tab-content" id="antecedentes-familiares">
            ${generateAntecedentesFamiliaresSection()}
        </div>
        
        <!-- Sección 3: Antecedentes Sociales -->
        <div class="tab-content" id="antecedentes-sociales">
            ${generateAntecedentesSocialesSection()}
        </div>
        
        <!-- Sección 4: Apoderados -->
        <div class="tab-content" id="apoderados">
            ${generateApoderadosSection()}
        </div>
        
        <!-- Sección 5: Antecedentes Académicos -->
        <div class="tab-content" id="academicos">
            ${generateAcademicosSection()}
        </div>
        
        <!-- Sección 6: Antecedentes de Salud -->
        <div class="tab-content" id="salud">
            ${generateSaludSection()}
        </div>
        
        <!-- Sección 7: Verificación -->
        <div class="tab-content" id="verificacion">
            ${generateVerificacionSection()}
        </div>
    `;
}

// ==============================================
// SECCIONES DEL FORMULARIO
// ==============================================

// SECCIÓN 1: Datos del Alumno
function generateDatosAlumnoSection() {
    return `
        <div class="form-section">
            <h3><span class="section-counter">1</span> Datos del Alumno/a</h3>
            
            <!-- Correo electrónico del apoderado -->
            <div class="form-group">
                <label for="emailUsuario" class="required">Correo electrónico del apoderado:</label>
                <input type="email" id="emailUsuario" name="emailUsuario" required 
                       placeholder="ejemplo@email.com">
            </div>
            
            <!-- Curso del estudiante -->
            <div class="form-group">
                <label for="cursoEstudiante" class="required">Curso del estudiante:</label>
                <select id="cursoEstudiante" name="cursoEstudiante" required>
                    <option value="">Seleccione un curso</option>
                    ${CURSOS_DISPONIBLES.map(curso => `<option value="${curso}">${curso}</option>`).join('')}
                </select>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="apellidoPaterno" class="required">Apellido Paterno:</label>
                    <input type="text" id="apellidoPaterno" name="apellidoPaterno" required>
                </div>
                
                <div class="form-group">
                    <label for="apellidoMaterno" class="required">Apellido Materno:</label>
                    <input type="text" id="apellidoMaterno" name="apellidoMaterno" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="nombres" class="required">Nombres:</label>
                <input type="text" id="nombres" name="nombres" required>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="cedulaIdentidad" class="required">Cédula de Identidad:</label>
                    <input type="text" id="cedulaIdentidad" name="cedulaIdentidad" placeholder="00000000-0" required>
                </div>
                
                <div class="form-group">
                    <label for="nacionalidad" class="required">Nacionalidad:</label>
                    <input type="text" id="nacionalidad" name="nacionalidad" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="fechaNacimiento" class="required">Fecha de Nacimiento:</label>
                    <input type="date" id="fechaNacimiento" name="fechaNacimiento" required>
                </div>
                
                <div class="form-group">
                    <label for="pasaporteDNI">N° Pasaporte o DNI:</label>
                    <input type="text" id="pasaporteDNI" name="pasaporteDNI">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="lugarNacimiento" class="required">Lugar de Nacimiento (ciudad o comuna):</label>
                    <input type="text" id="lugarNacimiento" name="lugarNacimiento" required>
                </div>
                
                <div class="form-group">
                    <label for="edad" class="required">Edad:</label>
                    <input type="number" id="edad" name="edad" min="3" max="20" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="domicilio" class="required">Domicilio:</label>
                <input type="text" id="domicilio" name="domicilio" required>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="sector" class="required">Sector:</label>
                    <input type="text" id="sector" name="sector" required>
                </div>
                
                <div class="form-group">
                    <label for="prevision" class="required">Fonasa (A,B,C,D) o Isapre o sin previsión:</label>
                    <select id="prevision" name="prevision" required>
                        <option value="">Seleccione</option>
                        <option value="Fonasa A">Fonasa A</option>
                        <option value="Fonasa B">Fonasa B</option>
                        <option value="Fonasa C">Fonasa C</option>
                        <option value="Fonasa D">Fonasa D</option>
                        <option value="Isapre">Isapre</option>
                        <option value="Sin previsión">Sin previsión</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="etnia" class="required">Etnia:</label>
                    <input type="text" id="etnia" name="etnia" placeholder="Si no tiene escribir 'ninguna'" required>
                </div>
                
                <div class="form-group">
                    <label for="celularEmergencia" class="required">Celular de Emergencia:</label>
                    <input type="tel" id="celularEmergencia" name="celularEmergencia" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="cultoReligioso" class="required">Culto religioso:</label>
                <input type="text" id="cultoReligioso" name="cultoReligioso" required>
            </div>
        </div>
        
        <div class="navigation-buttons">
            <button type="button" class="btn next-tab" data-next="antecedentes-familiares">Siguiente →</button>
        </div>
    `;
}

// SECCIÓN 2: Antecedentes Familiares
function generateAntecedentesFamiliaresSection() {
    return `
        <div class="form-section">
            <h3><span class="section-counter">2</span> Antecedentes Familiares - Padre</h3>
            
            <div class="form-group">
                <label for="nombrePadre">Nombre Completo del Padre:</label>
                <input type="text" id="nombrePadre" name="nombrePadre">
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="rutPasaportePadre">Rut o Pasaporte:</label>
                    <input type="text" id="rutPasaportePadre" name="rutPasaportePadre">
                </div>
                
                <div class="form-group">
                    <label for="nacionalidadPadre">Nacionalidad:</label>
                    <input type="text" id="nacionalidadPadre" name="nacionalidadPadre">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="fechaNacimientoPadre">Fecha de Nacimiento:</label>
                    <input type="date" id="fechaNacimientoPadre" name="fechaNacimientoPadre">
                </div>
                
                <div class="form-group">
                    <label for="edadPadre">Edad:</label>
                    <input type="number" id="edadPadre" name="edadPadre" min="18" max="100">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="nivelEducacionalPadre">Nivel Educacional:</label>
                    <input type="text" id="nivelEducacionalPadre" name="nivelEducacionalPadre">
                </div>
                
                <div class="form-group">
                    <label for="emailPadre">E-Mail:</label>
                    <input type="email" id="emailPadre" name="emailPadre">
                </div>
            </div>
            
            <div class="form-group">
                <label for="domicilioPadre">Domicilio:</label>
                <input type="text" id="domicilioPadre" name="domicilioPadre">
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="sectorPadre">Sector:</label>
                    <input type="text" id="sectorPadre" name="sectorPadre">
                </div>
                
                <div class="form-group">
                    <label for="celularPadre">Celular:</label>
                    <input type="tel" id="celularPadre" name="celularPadre">
                </div>
            </div>
            
            <div class="form-group">
                <label for="ocupacionPadre">Ocupación actual:</label>
                <input type="text" id="ocupacionPadre" name="ocupacionPadre">
            </div>
        </div>
        
        <div class="form-section">
            <h3>Antecedentes Familiares - Madre</h3>
            
            <div class="form-group">
                <label for="nombreMadre">Nombre Completo de la Madre:</label>
                <input type="text" id="nombreMadre" name="nombreMadre">
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="rutPasaporteMadre">Rut o Pasaporte:</label>
                    <input type="text" id="rutPasaporteMadre" name="rutPasaporteMadre">
                </div>
                
                <div class="form-group">
                    <label for="nacionalidadMadre">Nacionalidad:</label>
                    <input type="text" id="nacionalidadMadre" name="nacionalidadMadre">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="fechaNacimientoMadre">Fecha de Nacimiento:</label>
                    <input type="date" id="fechaNacimientoMadre" name="fechaNacimientoMadre">
                </div>
                
                <div class="form-group">
                    <label for="edadMadre">Edad:</label>
                    <input type="number" id="edadMadre" name="edadMadre" min="18" max="100">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="nivelEducacionalMadre">Nivel Educacional:</label>
                    <input type="text" id="nivelEducacionalMadre" name="nivelEducacionalMadre">
                </div>
                
                <div class="form-group">
                    <label for="emailMadre">E-Mail:</label>
                    <input type="email" id="emailMadre" name="emailMadre">
                </div>
            </div>
            
            <div class="form-group">
                <label for="domicilioMadre">Domicilio:</label>
                <input type="text" id="domicilioMadre" name="domicilioMadre">
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="sectorMadre">Sector:</label>
                    <input type="text" id="sectorMadre" name="sectorMadre">
                </div>
                
                <div class="form-group">
                    <label for="celularMadre">Celular:</label>
                    <input type="tel" id="celularMadre" name="celularMadre">
                </div>
            </div>
            
            <div class="form-group">
                <label for="ocupacionMadre">Ocupación actual:</label>
                <input type="text" id="ocupacionMadre" name="ocupacionMadre">
            </div>
        </div>
        
        <div class="form-section">
            <h3>Antecedentes Familiares</h3>
            
            <div class="form-group">
                <label for="personasConQuienVive" class="required">Persona(s) con quién vive el alumno/a (Vínculo: padres, madre, papá, abuelos...):</label>
                <input type="text" id="personasConQuienVive" name="personasConQuienVive" required>
            </div>
        </div>
        
        <div class="navigation-buttons">
            <button type="button" class="btn prev-tab" data-prev="datos-alumno">← Anterior</button>
            <button type="button" class="btn next-tab" data-next="antecedentes-sociales">Siguiente →</button>
        </div>
    `;
}

// SECCIÓN 3: Antecedentes Sociales
function generateAntecedentesSocialesSection() {
    return `
        <div class="form-section">
            <h3><span class="section-counter">3</span> Antecedentes Sociales de la Familia</h3>
            
            <div class="form-group">
                <label for="tipoVivienda" class="required">Tipo de vivienda:</label>
                <div class="radio-group">
                    <div class="radio-item">
                        <input type="radio" id="materialSolido" name="tipoVivienda" value="material sólido" required>
                        <label for="materialSolido">Material sólido</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" id="materialLigero" name="tipoVivienda" value="material ligero" required>
                        <label for="materialLigero">Material ligero</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" id="materialMixto" name="tipoVivienda" value="material mixto" required>
                        <label for="materialMixto">Material mixto</label>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="pertenenciaVivienda" class="required">Pertenencia de la vivienda:</label>
                <select id="pertenenciaVivienda" name="pertenenciaVivienda" required>
                    <option value="">Seleccione</option>
                    <option value="propia">Propia</option>
                    <option value="arrendada">Arrendada</option>
                    <option value="cedida">Cedida</option>
                    <option value="allegado">Allegado</option>
                    <option value="en toma">En toma</option>
                </select>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="aguaPotable" class="required">Agua potable:</label>
                    <select id="aguaPotable" name="aguaPotable" required>
                        <option value="">Seleccione</option>
                        <option value="SI">SI</option>
                        <option value="NO">NO</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="tipoBano" class="required">Tipo de baño:</label>
                    <select id="tipoBano" name="tipoBano" required>
                        <option value="">Seleccione</option>
                        <option value="alcantarillado">Alcantarillado</option>
                        <option value="fosa séptica">Fosa séptica</option>
                        <option value="pozo">Pozo</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="numeroBanos" class="required">N° de baños:</label>
                    <input type="number" id="numeroBanos" name="numeroBanos" min="0" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="numeroHabitaciones" class="required">N° de habitaciones de la vivienda:</label>
                    <input type="number" id="numeroHabitaciones" name="numeroHabitaciones" min="1" required>
                </div>
                
                <div class="form-group">
                    <label for="numeroPersonasVivienda" class="required">N° de personas que habitan la vivienda:</label>
                    <input type="number" id="numeroPersonasVivienda" name="numeroPersonasVivienda" min="1" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="registroSocialHogares" class="required">Tiene registro social de hogares:</label>
                    <select id="registroSocialHogares" name="registroSocialHogares" required>
                        <option value="">Seleccione</option>
                        <option value="SI">SI</option>
                        <option value="NO">NO</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="numeroPersonasTrabajan" class="required">N° de personas del grupo familiar que trabajan:</label>
                    <input type="number" id="numeroPersonasTrabajan" name="numeroPersonasTrabajan" min="0" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="alumnoCategoria" class="required">Alumno/a:</label>
                <div class="radio-group">
                    <div class="radio-item">
                        <input type="radio" id="prioritario" name="alumnoCategoria" value="Prioritario" required>
                        <label for="prioritario">Prioritario</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" id="preferente" name="alumnoCategoria" value="Preferente" required>
                        <label for="preferente">Preferente</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" id="sinInformacion" name="alumnoCategoria" value="Sin información" required>
                        <label for="sinInformacion">Sin información</label>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="hermanosEnColegio" class="required">Tiene hermanos en el Colegio:</label>
                    <select id="hermanosEnColegio" name="hermanosEnColegio" required>
                        <option value="">Seleccione</option>
                        <option value="SI">SI</option>
                        <option value="NO">NO</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="cursosHermanos">¿En qué curso tiene hermanos?:</label>
                    <input type="text" id="cursosHermanos" name="cursosHermanos">
                </div>
            </div>
            
            <div class="form-group">
                <label for="medioTransporte" class="required">Medio de transporte para llegar al Colegio:</label>
                <select id="medioTransporte" name="medioTransporte" required>
                    <option value="">Seleccione</option>
                    <option value="propia">Propia</option>
                    <option value="locomoción colectiva">Locomoción colectiva</option>
                    <option value="propia y locomoción colectiva">Propia y locomoción colectiva</option>
                    <option value="caminando">Caminando</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="tiempoTraslado" class="required">Tiempo que tarda en el traslado desde su hogar al Colegio:</label>
                <input type="text" id="tiempoTraslado" name="tiempoTraslado" placeholder="Ej: 30 minutos" required>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="adultoApoyo" class="required">Existe algún adulto que apoye en el aprendizaje y labores escolares del alumno/a en el hogar:</label>
                    <select id="adultoApoyo" name="adultoApoyo" required>
                        <option value="">Seleccione</option>
                        <option value="SI">SI</option>
                        <option value="NO">NO</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="lugarEstudio" class="required">Existe en el hogar un lugar adecuado para realizar las labores escolares:</label>
                    <select id="lugarEstudio" name="lugarEstudio" required>
                        <option value="">Seleccione</option>
                        <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="calificacionLugarEstudio">Si existe el lugar para realizar las labores escolares, ¿cómo lo calificaría con nota del 1.0 a 7.0?:</label>
                    <input type="number" id="calificacionLugarEstudio" name="calificacionLugarEstudio" min="1.0" max="7.0" step="0.1">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="perteneceProgramaSocial" class="required">Pertenece algún Programa Social (Junaeb, Chile Solidario, Organismo colaborador del Sename u otro):</label>
                        <select id="perteneceProgramaSocial" name="perteneceProgramaSocial" required>
                            <option value="">Seleccione</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="cualProgramaSocial">Si respondió SI, ¿Cuál sería?</label>
                        <input type="text" id="cualProgramaSocial" name="cualProgramaSocial">
                    </div>
                </div>
            </div>
            
            <div class="navigation-buttons">
                <button type="button" class="btn prev-tab" data-prev="antecedentes-familiares">← Anterior</button>
                <button type="button" class="btn next-tab" data-next="apoderados">Siguiente →</button>
            </div>
        `;
    }
    
    // SECCIÓN 4: Apoderados
    function generateApoderadosSection() {
        return `
            <div class="form-section">
                <h3><span class="section-counter">4</span> Nombre del Apoderado/a Titular y Suplente</h3>
                
                <div class="form-group">
                    <label for="nombreApoderadoTitular" class="required">Nombre Completo Apoderado/a Titular:</label>
                    <input type="text" id="nombreApoderadoTitular" name="nombreApoderadoTitular" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="celularTitular" class="required">Celular:</label>
                        <input type="tel" id="celularTitular" name="celularTitular" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="rutPasaporteTitular" class="required">Rut o Pasaporte:</label>
                        <input type="text" id="rutPasaporteTitular" name="rutPasaporteTitular" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="emailTitular" class="required">E-Mail:</label>
                    <input type="email" id="emailTitular" name="emailTitular" required>
                </div>
                
                <div class="form-group">
                    <label for="nivelEducacionalTitular" class="required">Indique el último nivel educacional cursado:</label>
                    <input type="text" id="nivelEducacionalTitular" name="nivelEducacionalTitular" required>
                </div>
                
                <div class="form-group">
                    <label class="required">¿Cuál es su situación laboral actual?</label>
                    <div class="radio-group">
                        <div class="radio-item">
                            <input type="radio" id="sinTrabajo" name="situacionLaboralTitular" value="Sin trabajo" required>
                            <label for="sinTrabajo">Sin trabajo</label>
                        </div>
                        <div class="radio-item">
                            <input type="radio" id="conTrabajo" name="situacionLaboralTitular" value="Con trabajo" required>
                            <label for="conTrabajo">Con trabajo</label>
                        </div>
                    </div>
                </div>
                
                <div class="form-group" id="lugarTrabajoGroup" style="display: none;">
                    <label class="required">Si actualmente se encuentra trabajando, ¿dónde trabaja principalmente?</label>
                    <div class="radio-group">
                        <div class="radio-item">
                            <input type="radio" id="trabajoHogar" name="lugarTrabajoTitular" value="En el hogar">
                            <label for="trabajoHogar">En el hogar</label>
                        </div>
                        <div class="radio-item">
                            <input type="radio" id="trabajoFuera" name="lugarTrabajoTitular" value="Fuera del hogar">
                            <label for="trabajoFuera">Fuera del hogar</label>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="nombreApoderadoSuplente">Nombre Completo Apoderado/a Suplente:</label>
                    <input type="text" id="nombreApoderadoSuplente" name="nombreApoderadoSuplente">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="celularSuplente">Celular:</label>
                        <input type="tel" id="celularSuplente" name="celularSuplente">
                    </div>
                    
                    <div class="form-group">
                        <label for="rutPasaporteSuplente">Rut o Pasaporte:</label>
                        <input type="text" id="rutPasaporteSuplente" name="rutPasaporteSuplente">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="emailSuplente">E-Mail:</label>
                    <input type="email" id="emailSuplente" name="emailSuplente">
                </div>
            </div>
            
            <div class="navigation-buttons">
                <button type="button" class="btn prev-tab" data-prev="antecedentes-sociales">← Anterior</button>
                <button type="button" class="btn next-tab" data-next="academicos">Siguiente →</button>
            </div>
        `;
    }
    
    // SECCIÓN 5: Antecedentes Académicos
    function generateAcademicosSection() {
        return `
            <div class="form-section">
                <h3><span class="section-counter">5</span> Antecedentes Académicos del Alumno/a</h3>
                
                <div class="form-group">
                    <label for="colegioProcedencia" class="required">Colegio de procedencia:</label>
                    <input type="text" id="colegioProcedencia" name="colegioProcedencia" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="haRepetido" class="required">Ha repetido algún curso:</label>
                        <select id="haRepetido" name="haRepetido" required>
                            <option value="">Seleccione</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="cursosRepetidos">Si respondió SI, ¿qué curso(s)?:</label>
                        <input type="text" id="cursosRepetidos" name="cursosRepetidos">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="pertenecePIE" class="required">¿Pertenece a un Programa Integración Escolar PIE?:</label>
                        <select id="pertenecePIE" name="pertenecePIE" required>
                            <option value="">Seleccione</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="diagnosticoPIE">Si respondió SI, ¿Cuál sería el diagnóstico?</label>
                        <textarea id="diagnosticoPIE" name="diagnosticoPIE" rows="3"></textarea>
                    </div>
                </div>
            </div>
            
            <div class="navigation-buttons">
                <button type="button" class="btn prev-tab" data-prev="apoderados">← Anterior</button>
                <button type="button" class="btn next-tab" data-next="salud">Siguiente →</button>
            </div>
        `;
    }
    
    // SECCIÓN 6: Antecedentes de Salud
    function generateSaludSection() {
        return `
            <div class="form-section">
                <h3><span class="section-counter">6</span> Antecedentes de Salud del Alumno/a</h3>
                
                <div class="form-group">
                    <label>Problemas de salud:</label>
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input type="checkbox" id="problemaVisual" name="problemaVisual" value="SI">
                            <label for="problemaVisual">Visual</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="problemaAuditivo" name="problemaAuditivo" value="SI">
                            <label for="problemaAuditivo">Auditivo</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="problemaCardiaco" name="problemaCardiaco" value="SI">
                            <label for="problemaCardiaco">Cardiaco</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="problemaColumna" name="problemaColumna" value="SI">
                            <label for="problemaColumna">Columna</label>
                        </div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="padeceEnfermedad" class="required">¿Padece alguna enfermedad?:</label>
                        <select id="padeceEnfermedad" name="padeceEnfermedad" required>
                            <option value="">Seleccione</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="cualEnfermedad">Si respondió SI, ¿cuál sería?:</label>
                        <input type="text" id="cualEnfermedad" name="cualEnfermedad">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="tomaMedicamento" class="required">Toma algún medicamento:</label>
                        <select id="tomaMedicamento" name="tomaMedicamento" required>
                            <option value="">Seleccione</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="cualMedicamento">Si respondió SI, ¿cuál sería?:</label>
                        <input type="text" id="cualMedicamento" name="cualMedicamento">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="esAlergico" class="required">Es alérgico/a:</label>
                        <select id="esAlergico" name="esAlergico" required>
                            <option value="">Seleccione</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="cualAlergia">Si respondió SI, ¿cuál sería?:</label>
                        <input type="text" id="cualAlergia" name="cualAlergia">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="medicamentoContraindicado" class="required">¿Tiene algún medicamento contraindicado?:</label>
                        <select id="medicamentoContraindicado" name="medicamentoContraindicado" required>
                            <option value="">Seleccione</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="cualMedicamentoContraindicado">Si respondió SI, ¿cuál sería?:</label>
                        <input type="text" id="cualMedicamentoContraindicado" name="cualMedicamentoContraindicado">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="problemaSaludEF" class="required">Problemas de Salud Significativo para no realizar Asignatura de Educación Física:</label>
                        <select id="problemaSaludEF" name="problemaSaludEF" required>
                            <option value="">Seleccione</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="cualProblemaSaludEF">Si respondió SI, ¿cuál sería?:</label>
                        <input type="text" id="cualProblemaSaludEF" name="cualProblemaSaludEF">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="peso" class="required">Peso(kg):</label>
                        <input type="number" id="peso" name="peso" min="0" step="0.1" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="talla" class="required">Talla(cm):</label>
                        <input type="number" id="talla" name="talla" min="0" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="grupoSanguineo" class="required">Grupo Sanguíneo:</label>
                        <input type="text" id="grupoSanguineo" name="grupoSanguineo" required>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h3>Autorización para realizar retiro diario del alumno/a del colegio</h3>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="nombreRetiro1">Nombre:</label>
                        <input type="text" id="nombreRetiro1" name="nombreRetiro1">
                    </div>
                    
                    <div class="form-group">
                        <label for="rutPasaporteRetiro1">Rut o pasaporte:</label>
                        <input type="text" id="rutPasaporteRetiro1" name="rutPasaporteRetiro1">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="celularRetiro1">Celular:</label>
                        <input type="tel" id="celularRetiro1" name="celularRetiro1">
                    </div>
                    
                    <div class="form-group">
                        <label for="parentescoRetiro1">Parentesco:</label>
                        <input type="text" id="parentescoRetiro1" name="parentescoRetiro1">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="nombreRetiro2">Nombre:</label>
                        <input type="text" id="nombreRetiro2" name="nombreRetiro2">
                    </div>
                    
                    <div class="form-group">
                        <label for="rutPasaporteRetiro2">Rut o pasaporte:</label>
                        <input type="text" id="rutPasaporteRetiro2" name="rutPasaporteRetiro2">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="celularRetiro2">Celular:</label>
                        <input type="tel" id="celularRetiro2" name="celularRetiro2">
                    </div>
                    
                    <div class="form-group">
                        <label for="parentescoRetiro2">Parentesco:</label>
                        <input type="text" id="parentescoRetiro2" name="parentescoRetiro2">
                    </div>
                </div>
            </div>
            
            <div class="navigation-buttons">
                <button type="button" class="btn prev-tab" data-prev="academicos">← Anterior</button>
                <button type="button" class="btn next-tab" data-next="verificacion">Siguiente →</button>
            </div>
        `;
    }
    
    // SECCIÓN 7: Verificación
    function generateVerificacionSection() {
        return `
            <div class="form-section">
                <h3><span class="section-counter">7</span> Verificación</h3>
                
                <div class="form-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="declaracion1" name="declaracion1" value="Acepto" required>
                        <label for="declaracion1" class="required">Declaro conocer y aceptar el Proyecto Educativo, Reglamento Interno y Reglamento de Evaluación del Colegio La Herradura, así como, las responsabilidades que debo cumplir como Apoderado/a, especialmente en asistir al establecimiento educacional, cada vez que sea citado o a reuniones de curso.</label>
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="declaracion2" name="declaracion2" value="Acepto" required>
                        <label for="declaracion2" class="required">La información entregada es fidedigna, haciéndome responsable de cualquier omisión. Además, me comprometo a actualizar los datos de la Ficha Escolar, cuando sea necesario.</label>
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="declaracion3" name="declaracion3" value="Acepto" required>
                        <label for="declaracion3" class="required">Autorizo al Colegio La Herradura a utilizar medios audiovisuales y fotográficos de mi pupilo/a en actividades de difusión del Colegio ante la comunidad.</label>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="nombreApoderadoFirma" class="required">Nombre apoderado que firmará:</label>
                        <input type="text" id="nombreApoderadoFirma" name="nombreApoderadoFirma" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="rutPasaporteFirma" class="required">RUT o PASAPORTE del apoderado que firmará:</label>
                        <input type="text" id="rutPasaporteFirma" name="rutPasaporteFirma" required>
                    </div>
                </div>
            </div>
            
            <div class="navigation-buttons">
                <button type="button" class="btn prev-tab" data-prev="salud">← Anterior</button>
                <button type="submit" class="btn btn-success">Enviar Matrícula</button>
            </div>
        `;
    }
    
    // ==============================================
    // FUNCIONES DE UTILIDAD
    // ==============================================
    
    // Configurar campos condicionales
    function setupConditionalFields() {
        // Campo de lugar de trabajo (se muestra solo si selecciona "Con trabajo")
        const situacionLaboralRadios = document.querySelectorAll('input[name="situacionLaboralTitular"]');
        const lugarTrabajoGroup = document.getElementById('lugarTrabajoGroup');
        
        if (situacionLaboralRadios && lugarTrabajoGroup) {
            situacionLaboralRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.value === 'Con trabajo') {
                        lugarTrabajoGroup.style.display = 'block';
                        // Hacer requeridos los radio buttons de lugar de trabajo
                        document.querySelectorAll('input[name="lugarTrabajoTitular"]').forEach(r => {
                            r.required = true;
                        });
                    } else {
                        lugarTrabajoGroup.style.display = 'none';
                        // Quitar requerido de los radio buttons de lugar de trabajo
                        document.querySelectorAll('input[name="lugarTrabajoTitular"]').forEach(r => {
                            r.required = false;
                        });
                    }
                });
            });
        }
        
        // Configurar campos que muestran/ocultan según respuestas SI/NO
        setupConditionalYesNoFields();
    }
    
    // Configurar campos que se muestran/ocultan según respuestas SI/NO
    function setupConditionalYesNoFields() {
        // Lista de campos condicionales
        const conditionalFields = [
            { trigger: 'hermanosEnColegio', target: 'cursosHermanos' },
            { trigger: 'perteneceProgramaSocial', target: 'cualProgramaSocial' },
            { trigger: 'haRepetido', target: 'cursosRepetidos' },
            { trigger: 'pertenecePIE', target: 'diagnosticoPIE' },
            { trigger: 'padeceEnfermedad', target: 'cualEnfermedad' },
            { trigger: 'tomaMedicamento', target: 'cualMedicamento' },
            { trigger: 'esAlergico', target: 'cualAlergia' },
            { trigger: 'medicamentoContraindicado', target: 'cualMedicamentoContraindicado' },
            { trigger: 'problemaSaludEF', target: 'cualProblemaSaludEF' }
        ];
        
        conditionalFields.forEach(field => {
            const trigger = document.getElementById(field.trigger);
            const target = document.getElementById(field.target);
            
            if (trigger && target) {
                // Configurar evento de cambio
                trigger.addEventListener('change', function() {
                    if (this.value === 'SI') {
                        target.required = true;
                        target.closest('.form-group').style.display = 'block';
                    } else {
                        target.required = false;
                        target.closest('.form-group').style.display = 'none';
                        target.value = '';
                    }
                });
                
                // Establecer estado inicial
                if (trigger.value !== 'SI') {
                    target.required = false;
                    target.closest('.form-group').style.display = 'none';
                }
            }
        });
    }
    
    // Navegar entre pestañas
    function navigateToTab(tabId) {
        // Ocultar todas las pestañas
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Mostrar la pestaña seleccionada
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.classList.add('active');
            currentTab = tabId;
            
            // Actualizar pestañas activas en la navegación
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-tab') === tabId) {
                    tab.classList.add('active');
                }
            });
            
            // Scroll al inicio de la sección
            window.scrollTo(0, 0);
        }
    }
    
    // Validar pestaña actual
    function validateCurrentTab() {
        const currentTabElement = document.querySelector('.tab-content.active');
        if (!currentTabElement) return true;
        
        const requiredFields = currentTabElement.querySelectorAll('[required]');
        let isValid = true;
        
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
                // Scroll al primer campo con error
                if (isValid === false) {
                    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    field.focus();
                    break;
                }
            } else {
                field.style.borderColor = '#ddd';
            }
        }
        
        if (!isValid) {
            showFormAlert('Por favor, complete todos los campos obligatorios marcados en rojo', 'error');
        }
        
        return isValid;
    }
    
    // ==============================================
    // FUNCIONES PRINCIPALES
    // ==============================================
    
    // Manejar envío del formulario
   async function handleFormSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    
    if (!validateCompleteForm()) {
        showFormAlert('Por favor, complete todos los campos obligatorios', 'error');
        return false;
    }
    
    // Recopilar datos del formulario
    const formData = new FormData(document.getElementById('matricula-form'));
    const matriculaData = {};
    
    for (let [key, value] of formData.entries()) {
        matriculaData[key] = value;
    }
    
    // Agregar datos adicionales
    matriculaData.id = Date.now();
    matriculaData.fechaRegistro = new Date().toISOString();
    matriculaData.timestamp = new Date().toLocaleString();
    
    // Procesar checkboxes de salud
    matriculaData.problemaVisual = document.getElementById('problemaVisual')?.checked ? 'SI' : 'NO';
    matriculaData.problemaAuditivo = document.getElementById('problemaAuditivo')?.checked ? 'SI' : 'NO';
    matriculaData.problemaCardiaco = document.getElementById('problemaCardiaco')?.checked ? 'SI' : 'NO';
    matriculaData.problemaColumna = document.getElementById('problemaColumna')?.checked ? 'SI' : 'NO';
    
    // Primero: Guardar en localStorage
    const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
    matriculas.push(matriculaData);
    localStorage.setItem('matriculas', JSON.stringify(matriculas));
    
    // Segundo: Intentar enviar a Google Sheets
    const sendBtn = document.querySelector('button[type="submit"]');
    const originalText = sendBtn.textContent;
    sendBtn.textContent = 'Enviando a Google Sheets...';
    sendBtn.disabled = true;
    
    try {
        // Verificar si Google Sheets está configurado
        
        window.googleSheets.configure(GOOGLE_SCRIPT_URL);
        
        if (!window.googleSheets.isConfigured) {
        const scriptUrl = localStorage.getItem('googleSheetsScriptUrl');
            if (!scriptUrl || !window.googleSheets) {
                throw new Error('Google Sheets no está configurado');
            }
        }
        // Enviar a Google Sheets
        const result = await window.googleSheets.sendToGoogleSheets(matriculaData);
        
        if (result.success) {
            // Marcar como enviado en localStorage
            matriculaData.enviadoAGSheets = true;
            matriculaData.fechaEnvio = new Date().toISOString();
            
            // Actualizar en localStorage
            const updatedMatriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
            const lastIndex = updatedMatriculas.length - 1;
            if (lastIndex >= 0) {
                updatedMatriculas[lastIndex] = matriculaData;
                localStorage.setItem('matriculas', JSON.stringify(updatedMatriculas));
            }
            
            // Mostrar mensaje de éxito
            showFormAlert('✅ Matrícula enviada correctamente a Google Sheets', 'success');
        
        // Limpiar formulario después de 2 segundos
        /*
        setTimeout(() => {
            const form = document.getElementById('matricula-form');
            if (form) {
                form.reset();
                navigateToTab('datos-alumno');
                
                // Resetear campos condicionales
                document.querySelectorAll('.form-group').forEach(group => {
                    group.style.display = '';
                });
            }
        }, 2000);
        
        return false;*/
      // OPCIÓN 2: Preguntar si quiere limpiar el formulario (recomendado)
            setTimeout(() => {
                if (confirm('✅ Matrícula enviada exitosamente.\n\n¿Desea limpiar el formulario para una nueva matrícula?')) {
                    const form = document.getElementById('matricula-form');
                    if (form) {
                        form.reset();
                        navigateToTab('datos-alumno');
                        showFormAlert('Formulario listo para nueva matrícula', 'info');
                    }
                }
            }, 1000);
            
        } else {
            showFormAlert('❌ Error al enviar a Google Sheets: ' + (result.error || 'Desconocido'), 'error');
        }
    } catch (error) {
        console.error('Error al enviar a Google Sheets:', error);
        showFormAlert('⚠️ Guardado localmente. Error al enviar a Google Sheets: ' + error.message, 'warning');
    } finally {
        // Restaurar botón
        sendBtn.textContent = originalText;
        sendBtn.disabled = false;
    }
    
    return false;
}   
    
    
    // Validar formulario completo
    function validateCompleteForm() {
        const requiredFields = document.querySelectorAll('[required]');
        let isValid = true;
        let firstErrorField = null;
        
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
                if (!firstErrorField) {
                    firstErrorField = field;
                }
            } else {
                field.style.borderColor = '#ddd';
            }
        }
        
        // Scroll al primer campo con error
        if (firstErrorField) {
            // Navegar a la pestaña del campo con error
            const tabWithError = firstErrorField.closest('.tab-content');
            if (tabWithError) {
                const tabId = tabWithError.id;
                navigateToTab(tabId);
            }
            
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorField.focus();
        }
        
        return isValid;
    }
    
    // Generar vista previa PDF
    function previewPDF() {
        const formData = new FormData(document.getElementById('matricula-form'));
        const matriculaData = {};
        
        for (let [key, value] of formData.entries()) {
            matriculaData[key] = value;
        }
        
        if (!validateCompleteForm()) {
            showFormAlert('Complete el formulario antes de generar el PDF', 'error');
            return;
        }
        
        // Usar la función global
        if (typeof window.generatePDF === 'function') {
            window.generatePDF(matriculaData);
        } else {
            showFormAlert('Función de PDF no disponible', 'error');
        }
    }
    
    // Limpiar formulario
    function clearForm() {
        if (confirm('¿Está seguro de que desea limpiar todo el formulario? Se perderán todos los datos no guardados.')) {
            const form = document.getElementById('matricula-form');
            if (form) {
                form.reset();
                navigateToTab('datos-alumno');
                showFormAlert('Formulario limpiado', 'success');
                
                // Resetear campos condicionales
                document.querySelectorAll('.form-group').forEach(group => {
                    group.style.display = '';
                });
            }
        }
    }
    
    // Exportar CSV del formulario actual
    function exportCurrentForm() {
        if (typeof window.exportCurrentForm === 'function') {
            // Validar formulario primero
            if (!validateCompleteForm()) {
                showFormAlert('Complete el formulario antes de exportar', 'error');
                return;
            }
            
            // Recopilar datos
            const formData = new FormData(document.getElementById('matricula-form'));
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Agregar checkboxes de salud
            data.problemaVisual = document.getElementById('problemaVisual')?.checked ? 'SI' : 'NO';
            data.problemaAuditivo = document.getElementById('problemaAuditivo')?.checked ? 'SI' : 'NO';
            data.problemaCardiaco = document.getElementById('problemaCardiaco')?.checked ? 'SI' : 'NO';
            data.problemaColumna = document.getElementById('problemaColumna')?.checked ? 'SI' : 'NO';
            
            // Exportar
            window.exportCurrentForm(data);
        } else {
            alert('Función de exportación CSV no disponible');
        }
    }
    
    // Mostrar alerta en el formulario
    function showFormAlert(message, type) {
        const alertElement = document.getElementById('form-alert');
        if (!alertElement) {
            // Crear elemento de alerta si no existe
            const actionsDiv = document.querySelector('.actions');
            if (actionsDiv) {
                const newAlert = document.createElement('div');
                newAlert.id = 'form-alert';
                newAlert.className = `alert alert-${type} hidden`;
                newAlert.textContent = message;
                actionsDiv.parentNode.insertBefore(newAlert, actionsDiv.nextSibling);
                newAlert.classList.remove('hidden');
                
                setTimeout(() => {
                    newAlert.classList.add('hidden');
                }, 5000);
            }
            return;
        }
        
        alertElement.textContent = message;
        alertElement.className = `alert alert-${type}`;
        alertElement.classList.remove('hidden');
        
        setTimeout(() => {
            alertElement.classList.add('hidden');
        }, 5000);
    }
    
    // Hacer funciones disponibles globalmente
    window.validateCompleteForm = validateCompleteForm;
    window.exportCurrentForm = exportCurrentForm;
    window.navigateToTab = navigateToTab;