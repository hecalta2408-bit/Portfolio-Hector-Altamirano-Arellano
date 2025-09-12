// portfolio.js - Lógica exclusiva para la galería del portafolio

document.addEventListener('DOMContentLoaded', () => {

    const portfolioGallery = document.getElementById('portfolio-gallery');
    // Verificamos si estamos en la página de portafolio y si assets.js está cargado
    if (portfolioGallery && typeof assets !== 'undefined' && assets.portfolio) {
        assets.portfolio.forEach(project => {
            const cardLink = document.createElement('a');
            cardLink.href = project.url;
            cardLink.className = 'portfolio-item';

            cardLink.innerHTML = `
                <img src="${project.image}" alt="Imagen del proyecto ${project.title}">
                <div class="portfolio-item-overlay">
                    <h3>${project.title}</h3>
                    <p>${project.category}</p>
                </div>
            `;
            portfolioGallery.appendChild(cardLink);
        });
    } else if (portfolioGallery) {
        // Mensaje de error si los datos no cargan, útil para depurar.
        portfolioGallery.innerHTML = '<p>No se pudieron cargar los proyectos. Asegúrate de que assets.js esté enlazado correctamente antes que este script.</p>';
    }

});

