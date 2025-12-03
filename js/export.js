// Inicializar jsPDF
const { jsPDF } = window.jspdf;

function exportData() {
    const formato = document.getElementById('formato-exportacion').value;
    const filtro = document.getElementById('filtro-matricula').value;
    
    let matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
    
    // Aplicar filtros si es necesario
    if (filtro === 'fecha') {
        const fechaDesde = document.getElementById('fecha-desde').value;
        const fechaHasta = document.getElementById('fecha-hasta').value;
        
        if (fechaDesde) {
            matriculas = matriculas.filter(m => new Date(m.fechaRegistro) >= new Date(fechaDesde));
        }
        if (fechaHasta) {
            matriculas = matriculas.filter(m => new Date(m.fechaRegistro) <= new Date(fechaHasta));
        }
    }
    
    if (matriculas.length === 0) {
        alert('No hay datos para exportar con los filtros seleccionados');
        return;
    }
    
    switch (formato) {
        case 'pdf':
            exportToPDF(matriculas);
            break;
        case 'csv':
            exportToCSV(matriculas);
            break;
        case 'json':
            exportToJSON(matriculas);
            break;
        default:
            alert('Formato no válido');
    }
}

function exportToPDF(matriculas) {
    if (matriculas.length === 0) return;
    
    // Exportar la primera matrícula como ejemplo
    // En una implementación completa, se podría exportar todas o permitir selección
    const matricula = matriculas[0];
    generatePDF(matricula);
}

function exportToCSV(matriculas) {
    if (matriculas.length === 0) return;
    
    const headers = Object.keys(matriculas[0]);
    const csvContent = [
        headers.join(','),
        ...matriculas.map(row => 
            headers.map(header => 
                JSON.stringify(row[header] || '')
            ).join(',')
        )
    ].join('\n');
    
    downloadFile(csvContent, 'matriculas.csv', 'text/csv');
}

function exportToJSON(matriculas) {
    const dataStr = JSON.stringify(matriculas, null, 2);
    downloadFile(dataStr, 'matriculas.json', 'application/json');
}

function downloadFile(content, fileName, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function generatePDF(matriculaData) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Título
    pdf.setFontSize(16);
    pdf.text('FICHA DE MATRÍCULA', 105, 20, { align: 'center' });
    pdf.setFontSize(14);
    pdf.text('Colegio La Herradura 2026', 105, 28, { align: 'center' });
    
    // Antecedentes del Alumno
    pdf.setFontSize(12);
    pdf.text('Antecedentes del Alumno/a', 20, 40);
    
    // Datos básicos - Usando las variables de la plantilla {{ }}
    pdf.text(`Apellido Paterno: ${matriculaData.apellidoPaterno || ''}`, 20, 50);
    pdf.text(`Apellido Materno: ${matriculaData.apellidoMaterno || ''}`, 100, 50);
    pdf.text(`Nombres: ${matriculaData.nombres || ''}`, 20, 57);
    pdf.text(`Cédula de Identidad: ${matriculaData.cedulaIdentidad || ''}`, 20, 64);
    pdf.text(`Nacionalidad: ${matriculaData.nacionalidad || ''}`, 100, 64);
    pdf.text(`Fecha de Nacimiento: ${matriculaData.fechaNacimiento || ''}`, 20, 71);
    pdf.text(`N° Pasaporte o DNI: ${matriculaData.pasaporteDNI || ''}`, 100, 71);
    
    // Continuar con más campos según la plantilla...
    
    // Guardar el PDF
    const fileName = `Ficha_Matricula_${matriculaData.apellidoPaterno}_${matriculaData.apellidoMaterno}.pdf`;
    pdf.save(fileName);
}