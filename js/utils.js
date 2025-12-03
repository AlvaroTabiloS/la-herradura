// Utilidades para el sistema
class Utils {
    static formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('es-CL');
    }

    static formatRUT(rut) {
        if (!rut) return '';
        return rut.replace(/(\d{1,3})(\d{3})(\d{3})(\w{1})/, '$1.$2.$3-$4');
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validateRUT(rut) {
        if (!rut) return false;
        const cleanRut = rut.replace(/[^0-9kK]/g, '');
        if (cleanRut.length < 8) return false;
        return true;
    }

    static generateID() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    static getCurrentYear() {
        return new Date().getFullYear();
    }

    static sanitizeInput(text) {
        if (typeof text !== 'string') return text;
        return text
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
    }

    static downloadFile(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    static showNotification(message, type = 'info', duration = 5000) {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#d4edda' : 
                        type === 'error' ? '#f8d7da' : 
                        type === 'warning' ? '#fff3cd' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : 
                    type === 'error' ? '#721c24' : 
                    type === 'warning' ? '#856404' : '#0c5460'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : 
                            type === 'error' ? '#f5c6cb' : 
                            type === 'warning' ? '#ffeaa7' : '#bee5eb'};
            border-radius: 5px;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-width: 300px;
            max-width: 500px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;
        
        document.body.appendChild(notification);
        
        // Botón cerrar
        notification.querySelector('.notification-close').onclick = () => {
            notification.remove();
        };
        
        // Auto-remover
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);
    }

    static confirm(message) {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
            `;
            
            const content = document.createElement('div');
            content.style.cssText = `
                background: white;
                padding: 30px;
                border-radius: 10px;
                max-width: 400px;
                width: 90%;
                text-align: center;
            `;
            
            content.innerHTML = `
                <h3 style="margin-bottom: 20px; color: #333;">${message}</h3>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button id="confirm-yes" style="padding: 10px 30px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        Sí
                    </button>
                    <button id="confirm-no" style="padding: 10px 30px; background: #95a5a6; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        No
                    </button>
                </div>
            `;
            
            modal.appendChild(content);
            document.body.appendChild(modal);
            
            // Event listeners
            document.getElementById('confirm-yes').onclick = () => {
                modal.remove();
                resolve(true);
            };
            
            document.getElementById('confirm-no').onclick = () => {
                modal.remove();
                resolve(false);
            };
            
            // Cerrar al hacer clic fuera
            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.remove();
                    resolve(false);
                }
            };
        });
    }
}

// Hacer disponible globalmente
window.Utils = Utils;