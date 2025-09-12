// assets.js
export const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...'; // (Aquí va la cadena Base64 completa de tu logo)

export const briefQuestions = {
    web: [
        { id: 'web_tipo', label: '¿Qué tipo de sitio web necesitas?', type: 'text', placeholder: 'Informativo, e-commerce, blog...' },
        { id: 'web_paginas', label: '¿Cuántas páginas o secciones tendrá?', type: 'text' },
        { id: 'web_funcionalidades', label: '¿Qué funcionalidades especiales se requieren?', type: 'textarea', placeholder: 'Formularios, pagos, chat en vivo...' },
        { id: 'web_hosting', label: '¿Tienes un dominio y hosting contratados?', type: 'text' }
    ],
    branding: [
        { id: 'branding_valores', label: '¿Qué valores y personalidad quieres que tu marca transmita?', type: 'text' },
        { id: 'branding_rediseño', label: '¿Tienes un logotipo actual que quieras rediseñar?', type: 'text' },
        { id: 'branding_elementos', label: '¿Qué elementos de marca se deben incluir?', type: 'textarea', placeholder: 'Logotipo, paleta de colores, tipografía...' }
    ],
    producto: [
        { id: 'producto_tipo', label: '¿Es un producto nuevo o una mejora a uno existente?', type: 'text' },
        { id: 'producto_funcionalidades', label: '¿Cuáles son las funcionalidades clave que el usuario debe poder realizar?', type: 'textarea' },
        { id: 'producto_flujo', label: '¿Tienes algún "flujo de usuario" o user journey en mente?', type: 'textarea' }
    ],
    arquitectura: [
        { id: 'arqui_tipo', label: '¿Cuál es el tipo de proyecto?', type: 'text', placeholder: 'Residencial, comercial, industrial' },
        { id: 'arqui_area', label: '¿Cuál es el área total y la ubicación del terreno?', type: 'text' },
        { id: 'arqui_entregables', label: '¿Necesitas solo planos arquitectónicos, renders 3D o ambos?', type: 'text' },
        { id: 'arqui_estilo', label: '¿Qué estilo arquitectónico te gustaría?', type: 'text' }
    ],
    packaging: [
        { id: 'pack_producto', label: '¿Qué tipo de producto se va a empaquetar?', type: 'text' },
        { id: 'pack_dimensiones', label: '¿Cuáles son las dimensiones y materiales preferidos?', type: 'text' },
        { id: 'pack_info', label: '¿Qué información legal o reglamentaria debe incluirse?', type: 'textarea' }
    ]
};

// ... (El resto de tu assets.js con los servicios y el portafolio se mantiene igual)
export const services = [ /* ... */ ];
export const portfolio = [ /* ... */ ];

