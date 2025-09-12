// brief-logic.js
import { generatePdf } from './pdf-generator.js';
import { briefQuestions, logoBase64 } from './assets.js';

document.addEventListener('DOMContentLoaded', () => {
    const briefForm = document.getElementById('brief-form');
    if (!briefForm) return;

    const serviceSelect = document.getElementById('servicio_principal');
    const dynamicContainer = document.getElementById('dynamic-questions-container');

    // --- Lógica para el formulario dinámico ---
    serviceSelect.addEventListener('change', (event) => {
        const selectedService = event.target.value;
        dynamicContainer.innerHTML = ''; // Limpiar preguntas anteriores

        if (selectedService && briefQuestions[selectedService]) {
            const questionsHtml = briefQuestions[selectedService].map(q => `
                <div class="form-group">
                    <label for="${q.id}">${q.label}</label>
                    ${q.type === 'textarea'
                        ? `<textarea id="${q.id}" name="${q.id}" class="form-textarea" placeholder="${q.placeholder || ''}"></textarea>`
                        : `<input type="${q.type}" id="${q.id}" name="${q.id}" class="form-input" placeholder="${q.placeholder || ''}">`
                    }
                </div>
            `).join('');
            dynamicContainer.innerHTML = questionsHtml;
        }
    });

    // --- Lógica para el envío del formulario ---
    const submitButton = briefForm.querySelector('button[type="submit"]');
    const spinner = document.getElementById('spinner');

    briefForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        spinner.style.display = 'inline-block';
        submitButton.disabled = true;

        const formData = new FormData(briefForm);
        const data = Object.fromEntries(formData.entries());
        
        // --- Generación de ID Único ---
        const now = new Date();
        const datePart = now.getFullYear().toString().slice(-2) + 
                         ('0' + (now.getMonth() + 1)).slice(-2) + 
                         ('0' + now.getDate()).slice(-2);
        const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
        const uniqueId = `${datePart}-${randomPart}`;
        data.uniqueId = uniqueId; // Añadimos el ID a los datos

        const pdfFileName = `Hector Altamirano-Brief #${uniqueId}.pdf`;

        try {
            const pdfBlob = await generatePdf(data, logoBase64);

            const downloadUrl = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = pdfFileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(downloadUrl);
            
            uploadToDrive(pdfBlob, pdfFileName);

        } catch (error) {
            console.error('Error al generar o descargar el PDF:', error);
            alert('Hubo un error al generar tu PDF. Por favor, intenta de nuevo.');
            spinner.style.display = 'none';
            submitButton.disabled = false;
        } 
    });

    async function uploadToDrive(pdfBlob, fileName) {
        // ... (el resto de la función uploadToDrive se mantiene igual)
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onloadend = async () => {
            const base64data = reader.result.split(',')[1];
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQ8a49sg5oL-uRXlmKTP6DABamcPzqGVrlRqgCuwIlixGg492caGGoWHq2jqcB0uTa/exec'; 

            try {
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        fileName: fileName,
                        fileContent: base64data
                    })
                });
                const result = await response.json();
                if (result.status === 'success') {
                    console.log('Brief subido a Drive con éxito:', result.fileUrl);
                    alert('¡Gracias! Tu brief ha sido enviado correctamente y una copia ha sido descargada.');
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error('Error al subir el archivo a Google Drive:', error);
                alert('Tu brief fue descargado, pero hubo un problema al enviarlo. Por favor, contáctame directamente.');
            } finally {
                spinner.style.display = 'none';
                submitButton.disabled = false;
            }
        };
    }
});

