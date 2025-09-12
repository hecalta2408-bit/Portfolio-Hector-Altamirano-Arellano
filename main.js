// main.js - Lógica central para todo el sitio

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL MENÚ MÓVIL ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    // --- LÓGICA PARA GENERAR TARJETAS DE SERVICIOS ---
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer && typeof assets !== 'undefined' && assets.services) {
        assets.services.forEach(service => {
            // AHORA LA TARJETA ES UN ENLACE (<a>)
            const serviceCardLink = document.createElement('a');
            serviceCardLink.href = 'contact.html'; // Dirige a la página de contacto
            serviceCardLink.className = 'skill-card'; // Mantiene los mismos estilos

            serviceCardLink.innerHTML = `
                <div class="skill-icon">${service.icon}</div>
                <h4 class="skill-title">${service.title}</h4>
                <p class="skill-description">${service.description}</p>
            `;
            servicesContainer.appendChild(serviceCardLink);
        });
    }

    // --- LÓGICA PARA GENERAR TARJETAS DE PORTAFOLIO EN EL INICIO ---
    const portfolioPreviewContainer = document.getElementById('portfolio-preview');
    if (portfolioPreviewContainer && typeof assets !== 'undefined' && assets.portfolio) {
        assets.portfolio.slice(0, 2).forEach(project => {
            const cardLink = document.createElement('a');
            cardLink.href = project.url;
            cardLink.className = 'portfolio-preview-card';
            cardLink.innerHTML = `
                <img src="${project.image}" alt="Imagen del proyecto ${project.title}">
                <div class="portfolio-preview-overlay">
                    <h3>${project.title}</h3>
                    <p>${project.category}</p>
                </div>
            `;
            portfolioPreviewContainer.appendChild(cardLink);
        });
    }

    // --- LÓGICA PARA GENERAR SERVICIOS EN EL INICIO ---
     const servicesPreviewContainer = document.getElementById('services-preview');
    if (servicesPreviewContainer && typeof assets !== 'undefined' && assets.services) {
        assets.services.slice(0, 3).forEach(service => {
            const serviceCardLink = document.createElement('a');
            serviceCardLink.href = 'contact.html';
            serviceCardLink.className = 'skill-card';
            serviceCardLink.innerHTML = `
                <div class="skill-icon">${service.icon}</div>
                <h4 class="skill-title">${service.title}</h4>
                <p class="skill-description">${service.description}</p>
            `;
            servicesPreviewContainer.appendChild(serviceCardLink);
        });
    }
});

