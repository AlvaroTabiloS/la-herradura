// Inicialización segura de jsPDF
(function() {
    // Verificar si jsPDF ya está cargado
    if (typeof window.jspdf !== 'undefined') {
        console.log('jsPDF ya está cargado');
    } else {
        console.warn('jsPDF no está disponible. Cargando...');
        
        // Cargar dinámicamente si no está presente
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = function() {
            console.log('jsPDF cargado dinámicamente');
        };
        script.onerror = function() {
            console.error('Error al cargar jsPDF');
        };
        document.head.appendChild(script);
    }
    
    // Función para verificar si jsPDF está listo
    window.isPDFReady = function() {
        return typeof window.jspdf !== 'undefined';
    };
})();