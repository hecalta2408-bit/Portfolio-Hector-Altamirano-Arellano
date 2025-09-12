// pdf-generator.js
import { briefQuestions } from './assets.js';

export async function generatePdf(data, logoBase64) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 50;
    let y = 0;

    // --- HEADER ---
    doc.addImage(logoBase64, 'PNG', pageWidth - margin - 80, 40, 80, 80);
    y = 150;

    // --- INFO PRINCIPAL ---
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(138, 138, 142); // #8A8A8E

    const today = new Date();
    doc.text(`Fecha: ${today.toLocaleDateString('es-MX')}`, margin, y);
    y += 20;

    doc.text(`Nombre del Cliente: ${data.cliente_nombre || 'N/A'}`, margin, y);
    y += 40;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(29, 29, 31); // #1D1D1F
    doc.text('Brief-', margin, y);
    y += 60;
    
    // --- FUNCIÓN PARA AÑADIR SECCIONES Y PREGUNTAS ---
    const addSection = (title, fields) => {
        // ... (Lógica para añadir secciones, similar a la versión anterior pero adaptada)
        if (fields.every(field => !data[field.id])) return;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(0, 87, 255); // #0057FF
        doc.text(title, margin, y);
        y += 25;
        
        fields.forEach(field => {
            if (data[field.id]) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);
                doc.setTextColor(138, 138, 142);
                doc.text(field.label, margin, y);
                y += 15;

                doc.setFontSize(11);
                doc.setTextColor(29, 29, 31);
                const splitText = doc.splitTextToSize(data[field.id], pageWidth - (margin * 2));
                doc.text(splitText, margin, y);
                y += (doc.getTextDimensions(splitText).h) + 20;
            }
        });
        y += 20;
    };

    // --- CONTENIDO DEL BRIEF ---
    const generalQuestions = [
      { id: 'cliente_contacto', label: 'Persona de contacto:' },
      { id: 'cliente_email', label: 'Correo electrónico:' },
      { id: 'cliente_telefono', label: 'Teléfono / WhatsApp:'},
      { id: 'proyecto_problema', label: 'Problema principal o necesidad:' },
      { id: 'proyecto_meta', label: 'Meta principal del proyecto:' },
      { id: 'publico_descripcion', label: 'Público objetivo:' },
      { id: 'competencia', label: 'Principales competidores:' },
      { id: 'inspiracion', label: 'Inspiración:' }
    ];
    addSection('Información General y del Proyecto', generalQuestions);
    
    // Añadir preguntas del servicio seleccionado
    if (data.servicio_principal && briefQuestions[data.servicio_principal]) {
        addSection('Detalles Específicos del Servicio', briefQuestions[data.servicio_principal]);
    }

    addSection('Consideraciones Finales', [{id: 'final_info', label: 'Información adicional:'}]);

    // --- FOOTER ---
    const footerY = pageHeight - 60;
    doc.setDrawColor(221, 221, 221);
    doc.line(margin, footerY, pageWidth - margin, footerY);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(29, 29, 31);
    doc.text(`Hector Altamirano-Brief #${data.uniqueId}`, margin, footerY - 15);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(138, 138, 142);
    const footerText = `México, Estado de México | colaboración Nexura EC\n(56) 6386-8189 | aleare2458@gmail.com`;
    doc.text(footerText, pageWidth - margin, footerY + 20, { align: 'right' });


    return doc.output('blob');
}

