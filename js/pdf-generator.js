// Generador de PDF con formato exacto de la ficha de matrícula
// SOLO usar la variable global jsPDF si existe
if (typeof jsPDF !== 'undefined') {
    const { jsPDF } = window.jspdf;
    
    class PDFGenerator {
        constructor() {
            this.doc = null;
            this.margin = 20;
            this.lineHeight = 7;
            this.currentY = 0;
            this.pageWidth = 210; // A4 width in mm
            this.pageHeight = 297; // A4 height in mm
        }

        generate(matriculaData) {
            this.doc = new jsPDF('p', 'mm', 'a4');
            this.currentY = 20;
            
            // Encabezado
            this.addHeader();
            
            // Sección 1: Antecedentes del Alumno
            this.addAlumnoSection(matriculaData);
            
            // Sección 2: Antecedentes Familiares
            this.addFamiliaSection(matriculaData);
            
            // Sección 3: Antecedentes Sociales
            this.addSocialSection(matriculaData);
            
            // Sección 4: Apoderados
            this.addApoderadosSection(matriculaData);
            
            // Sección 5: Antecedentes Académicos
            this.addAcademicosSection(matriculaData);
            
            // Sección 6: Antecedentes de Salud
            this.addSaludSection(matriculaData);
            
            // Sección 7: Declaraciones y Firma
            this.addDeclaracionesSection(matriculaData);
            
            // Guardar PDF
            const fileName = `Ficha_Matricula_${matriculaData.apellidoPaterno}_${matriculaData.apellidoMaterno}.pdf`;
            this.doc.save(fileName);
        }

        addHeader() {
            this.doc.setFontSize(16);
            this.doc.setFont('helvetica', 'bold');
            this.doc.text('FICHA DE MATRÍCULA', this.pageWidth / 2, this.currentY, { align: 'center' });
            
            this.currentY += 8;
            this.doc.setFontSize(14);
            this.doc.text('Colegio La Herradura 2026', this.pageWidth / 2, this.currentY, { align: 'center' });
            
            this.currentY += 15;
        }

        addAlumnoSection(data) {
            this.addSectionTitle('Antecedentes del Alumno/a');
            
            // Fila 1
            this.addField('Apellido Paterno:', data.apellidoPaterno || '', 20);
            this.addField('Apellido Materno:', data.apellidoMaterno || '', 100, true);
            
            // Fila 2
            this.addField('Nombres:', data.nombres || '', 20);
            
            // Fila 3
            this.addField('Cédula de Identidad:', data.cedulaIdentidad || '', 20);
            this.addField('Nacionalidad:', data.nacionalidad || '', 100, true);
            
            // Fila 4
            this.addField('Fecha de Nacimiento:', this.formatDate(data.fechaNacimiento) || '', 20);
            this.addField('N° Pasaporte o DNI:', data.pasaporteDNI || '', 100, true);
            
            // Fila 5
            this.addField('Lugar de Nacimiento (ciudad o comuna):', data.lugarNacimiento || '', 20);
            this.addField('Edad:', data.edad || '', 100, true);
            
            // Fila 6
            this.addField('Domicilio:', data.domicilio || '', 20);
            
            // Fila 7
            this.addField('Sector:', data.sector || '', 100, true);
            
            // Fila 8
            this.addField('Fonasa (A,B,C,D) o Isapre o sin previsión:', data.prevision || '', 20);
            this.addField('Etnia:', data.etnia || '', 100, true);
            
            // Fila 9
            this.addField('Celular de Emergencia:', data.celularEmergencia || '', 20);
            this.addField('Culto religioso:', data.cultoReligioso || '', 100, true);
            
            this.currentY += 10;
        }

        addFamiliaSection(data) {
            this.addSectionTitle('Antecedentes familiares');
            
            // PADRE
            this.doc.setFont('helvetica', 'bold');
            this.doc.text('Padre:', this.margin, this.currentY);
            this.doc.setFont('helvetica', 'normal');
            this.currentY += 6;
            
            this.addField('Nombre Completo del Padre:', data.nombrePadre || '', 20);
            this.addField('Rut o Pasaporte:', data.rutPasaportePadre || '', 100, true);
            
            this.addField('Nacionalidad:', data.nacionalidadPadre || '', 100, true);
            
            this.addField('Fecha de Nacimiento:', this.formatDate(data.fechaNacimientoPadre) || '', 20);
            this.addField('Edad:', data.edadPadre || '', 100, true);
            
            this.addField('Nivel Educacional:', data.nivelEducacionalPadre || '', 20);
            this.addField('E-Mail:', data.emailPadre || '', 100, true);
            
            this.addField('Domicilio:', data.domicilioPadre || '', 20);
            this.addField('Sector:', data.sectorPadre || '', 100, true);
            
            this.addField('Celular:', data.celularPadre || '', 20);
            this.addField('Ocupación actual:', data.ocupacionPadre || '', 100, true);
            
            this.currentY += 10;
            
            // MADRE
            this.doc.setFont('helvetica', 'bold');
            this.doc.text('Madre:', this.margin, this.currentY);
            this.doc.setFont('helvetica', 'normal');
            this.currentY += 6;
            
            this.addField('Nombre Completo de la Madre:', data.nombreMadre || '', 20);
            this.addField('Rut o Pasaporte:', data.rutPasaporteMadre || '', 100, true);
            
            this.addField('Nacionalidad:', data.nacionalidadMadre || '', 100, true);
            
            this.addField('Fecha de Nacimiento:', this.formatDate(data.fechaNacimientoMadre) || '', 20);
            this.addField('Edad:', data.edadMadre || '', 100, true);
            
            this.addField('Nivel Educacional:', data.nivelEducacionalMadre || '', 20);
            this.addField('E-Mail:', data.emailMadre || '', 100, true);
            
            this.addField('Domicilio:', data.domicilioMadre || '', 20);
            this.addField('Sector:', data.sectorMadre || '', 100, true);
            
            this.addField('Celular:', data.celularMadre || '', 20);
            this.addField('Ocupación actual:', data.ocupacionMadre || '', 100, true);
            
            this.currentY += 10;
            
            // Personas con quien vive
            this.addField('Persona(s) con quién vive el alumno/a (Vínculo):', data.personasConQuienVive || '', 20);
            
            this.currentY += 10;
        }

        addSocialSection(data) {
            this.addSectionTitle('Antecedentes Sociales de la Familia');
            
            this.addField('Tipo de vivienda:', data.tipoVivienda || '', 20);
            this.addField('Pertenencia de la vivienda:', data.pertenenciaVivienda || '', 100, true);
            
            this.addField('Agua potable:', data.aguaPotable || '', 20);
            this.addField('Tipo de baño:', data.tipoBano || '', 70);
            this.addField('N° de baños:', data.numeroBanos || '', 140, true);
            
            this.addField('N° de habitaciones de la vivienda:', data.numeroHabitaciones || '', 20);
            this.addField('N° de personas que habitan la vivienda:', data.numeroPersonasVivienda || '', 100, true);
            
            this.addField('Tiene registro social de hogares:', data.registroSocialHogares || '', 20);
            
            this.addField('N° de personas del grupo familiar que trabajan:', data.numeroPersonasTrabajan || '', 20);
            this.addField('Alumno/a:', data.alumnoCategoria || '', 100, true);
            
            this.addField('Tiene hermanos en el Colegio:', data.hermanosEnColegio || '', 20);
            this.addField('¿En qué curso tiene hermanos?:', data.cursosHermanos || '', 100, true);
            
            this.addField('Medio de transporte:', data.medioTransporte || '', 20);
            this.addField('Tiempo que tarda en el traslado:', data.tiempoTraslado || '', 100, true);
            
            this.addField('Adulto que apoya en el aprendizaje:', data.adultoApoyo || '', 20);
            this.addField('Lugar adecuado para labores escolares:', data.lugarEstudio || '', 100, true);
            
            this.addField('Calificación lugar estudio (1.0-7.0):', data.calificacionLugarEstudio || '', 20);
            
            this.addField('Pertenece a Programa Social:', data.perteneceProgramaSocial || '', 20);
            this.addField('¿Cuál sería?:', data.cualProgramaSocial || '', 100, true);
            
            this.currentY += 10;
        }

        addApoderadosSection(data) {
            this.addSectionTitle('Nombre del Apoderado/a Titular y Suplente');
            
            // TITULAR
            this.doc.setFont('helvetica', 'bold');
            this.doc.text('Apoderado/a Titular:', this.margin, this.currentY);
            this.doc.setFont('helvetica', 'normal');
            this.currentY += 6;
            
            this.addField('Nombre Completo:', data.nombreApoderadoTitular || '', 20);
            this.addField('Celular:', data.celularTitular || '', 100, true);
            
            this.addField('Rut o Pasaporte:', data.rutPasaporteTitular || '', 100, true);
            
            this.addField('E-Mail:', data.emailTitular || '', 20);
            
            this.addField('Último nivel educacional:', data.nivelEducacionalTitular || '', 20);
            
            this.addField('Situación laboral:', data.situacionLaboralTitular || '', 20);
            this.addField('Lugar de trabajo:', data.lugarTrabajoTitular || '', 100, true);
            
            this.currentY += 10;
            
            // SUPLENTE
            this.doc.setFont('helvetica', 'bold');
            this.doc.text('Apoderado/a Suplente:', this.margin, this.currentY);
            this.doc.setFont('helvetica', 'normal');
            this.currentY += 6;
            
            this.addField('Nombre Completo:', data.nombreApoderadoSuplente || '', 20);
            this.addField('Celular:', data.celularSuplente || '', 100, true);
            
            this.addField('Rut o Pasaporte:', data.rutPasaporteSuplente || '', 100, true);
            
            this.addField('E-Mail:', data.emailSuplente || '', 20);
            
            this.currentY += 10;
        }

        addAcademicosSection(data) {
            this.addSectionTitle('Antecedentes Académicos del Alumno/a');
            
            this.addField('Colegio de procedencia:', data.colegioProcedencia || '', 20);
            
            this.addField('Ha repetido algún curso:', data.haRepetido || '', 20);
            this.addField('¿Qué curso(s)?:', data.cursosRepetidos || '', 100, true);
            
            this.addField('Pertenece a PIE:', data.pertenecePIE || '', 20);
            this.addField('Diagnóstico:', data.diagnosticoPIE || '', 100, true);
            
            this.currentY += 10;
        }

        addSaludSection(data) {
            this.addSectionTitle('Antecedentes de Salud del Alumno/a');
            
            this.doc.text('Problemas de salud:', this.margin, this.currentY);
            this.currentY += 6;
            
            this.doc.text(`Visual: ${data.problemaVisual === 'SI' ? 'Sí' : 'No'}`, 25, this.currentY);
            this.doc.text(`Auditivo: ${data.problemaAuditivo === 'SI' ? 'Sí' : 'No'}`, 70, this.currentY);
            this.doc.text(`Cardiaco: ${data.problemaCardiaco === 'SI' ? 'Sí' : 'No'}`, 110, this.currentY);
            this.doc.text(`Columna: ${data.problemaColumna === 'SI' ? 'Sí' : 'No'}`, 150, this.currentY);
            this.currentY += 7;
            
            this.addField('¿Padece alguna enfermedad?:', data.padeceEnfermedad || '', 20);
            this.addField('¿Cuál sería?:', data.cualEnfermedad || '', 100, true);
            
            this.addField('Toma algún medicamento:', data.tomaMedicamento || '', 20);
            this.addField('¿Cuál sería?:', data.cualMedicamento || '', 100, true);
            
            this.addField('Es alérgico/a:', data.esAlergico || '', 20);
            this.addField('¿Cuál sería?:', data.cualAlergia || '', 100, true);
            
            this.addField('Medicamento contraindicado:', data.medicamentoContraindicado || '', 20);
            this.addField('¿Cuál sería?:', data.cualMedicamentoContraindicado || '', 100, true);
            
            this.addField('Problemas para Educación Física:', data.problemaSaludEF || '', 20);
            this.addField('¿Cuál sería?:', data.cualProblemaSaludEF || '', 100, true);
            
            this.addField('Peso(kg):', data.peso || '', 20);
            this.addField('Talla(cm):', data.talla || '', 70);
            this.addField('Grupo Sanguíneo:', data.grupoSanguineo || '', 140, true);
            
            this.currentY += 10;
            
            // Autorización retiro
            this.doc.setFont('helvetica', 'bold');
            this.doc.text('Autorización para realizar retiro diario:', this.margin, this.currentY);
            this.doc.setFont('helvetica', 'normal');
            this.currentY += 10;
            
            this.doc.text('Persona 1:', 25, this.currentY);
            this.currentY += 6;
            this.addField('Nombre:', data.nombreRetiro1 || '', 30);
            this.addField('Rut o pasaporte:', data.rutPasaporteRetiro1 || '', 100, true);
            this.addField('Celular:', data.celularRetiro1 || '', 30);
            this.addField('Parentesco:', data.parentescoRetiro1 || '', 100, true);
            
            this.currentY += 10;
            this.doc.text('Persona 2:', 25, this.currentY);
            this.currentY += 6;
            this.addField('Nombre:', data.nombreRetiro2 || '', 30);
            this.addField('Rut o pasaporte:', data.rutPasaporteRetiro2 || '', 100, true);
            this.addField('Celular:', data.celularRetiro2 || '', 30);
            this.addField('Parentesco:', data.parentescoRetiro2 || '', 100, true);
            
            this.currentY += 10;
        }

        addDeclaracionesSection(data) {
            // Verificar si necesitamos nueva página
            if (this.currentY > 250) {
                this.doc.addPage();
                this.currentY = 20;
            }
            
            this.addSectionTitle('Declaraciones');
            
            this.doc.setFontSize(10);
            
            // Declaración 1
            this.doc.text('☐', this.margin, this.currentY);
            this.doc.text('Declaro conocer y aceptar el Proyecto Educativo, Reglamento Interno y Reglamento', this.margin + 5, this.currentY);
            this.currentY += 5;
            this.doc.text('de Evaluación del Colegio La Herradura, así como, las responsabilidades que debo', this.margin + 5, this.currentY);
            this.currentY += 5;
            this.doc.text('cumplir como Apoderado/a.', this.margin + 5, this.currentY);
            this.currentY += 10;
            
            // Declaración 2
            this.doc.text('☐', this.margin, this.currentY);
            this.doc.text('La información entregada es fidedigna, haciéndome responsable de cualquier', this.margin + 5, this.currentY);
            this.currentY += 5;
            this.doc.text('omisión. Además, me comprometo a actualizar los datos de la Ficha Escolar,', this.margin + 5, this.currentY);
            this.currentY += 5;
            this.doc.text('cuando sea necesario.', this.margin + 5, this.currentY);
            this.currentY += 10;
            
            // Declaración 3
            this.doc.text('☐', this.margin, this.currentY);
            this.doc.text('Autorizo al Colegio La Herradura a utilizar medios audiovisuales y fotográficos', this.margin + 5, this.currentY);
            this.currentY += 5;
            this.doc.text('de mi pupilo/a en actividades de difusión del Colegio ante la comunidad.', this.margin + 5, this.currentY);
            this.currentY += 15;
            
            // Firma
            this.doc.setFontSize(11);
            this.doc.text(`Nombre Apoderado/a: ${data.nombreApoderadoFirma || ''}`, this.margin, this.currentY);
            this.doc.text(`Rut o Pasaporte: ${data.rutPasaporteFirma || ''}`, 120, this.currentY);
            
            this.currentY += 20;
            
            // Línea de firma
            this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
            this.currentY += 5;
            this.doc.text('Firma del Apoderado/a', this.pageWidth / 2, this.currentY, { align: 'center' });
            
            this.currentY += 15;
            
            // Funcionario
            this.doc.text('Nombre Funcionario que realiza la matrícula:', this.margin, this.currentY);
            this.currentY += 10;
            this.doc.line(this.margin, this.currentY, 100, this.currentY);
            this.currentY += 5;
            this.doc.text('Firma:', 110, this.currentY - 5);
            this.doc.line(120, this.currentY, 180, this.currentY);
        }

        addSectionTitle(title) {
            this.doc.setFont('helvetica', 'bold');
            this.doc.setFontSize(12);
            this.doc.text(title, this.margin, this.currentY);
            this.doc.setFont('helvetica', 'normal');
            this.currentY += 8;
        }

        addField(label, value, x, isSecondColumn = false) {
            if (isSecondColumn) {
                this.doc.text(`${label} ${value}`, x, this.currentY);
            } else {
                this.doc.text(`${label}`, x, this.currentY);
                if (value) {
                    this.doc.text(value, x + this.doc.getTextWidth(label) + 5, this.currentY);
                }
                this.currentY += this.lineHeight;
            }
        }

        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('es-CL');
        }

        checkPageBreak(neededSpace = 20) {
            if (this.currentY + neededSpace > this.pageHeight - this.margin) {
                this.doc.addPage();
                this.currentY = this.margin;
                return true;
            }
            return false;
        }
    }
    
    // Exportar solo si jsPDF está disponible
    window.generatePDF = function(matriculaData) {
        if (typeof jsPDF === 'undefined') {
            console.error('jsPDF no está disponible');
            alert('Error: jsPDF no está cargado. Recarga la página.');
            return;
        }
        const generator = new PDFGenerator();
        generator.generate(matriculaData);
    };
} else {
    console.warn('jsPDF no está disponible en este contexto');
}


// Función global para generar PDF
window.generatePDF = function(matriculaData) {
    const generator = new PDFGenerator();
    generator.generate(matriculaData);
};

// Función para generar PDF desde cualquier parte
window.exportMatriculaPDF = function(matriculaId) {
    const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
    const matricula = matriculas.find(m => m.id === matriculaId);
    
    if (matricula) {
        const generator = new PDFGenerator();
        generator.generate(matricula);
    } else {
        alert('Matrícula no encontrada');
    }
};