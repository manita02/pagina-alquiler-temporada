(function() {
    'use strict';

    // ============================================
    // NAVBAR - Scroll y activación
    // ============================================
    const navbar = document.getElementById('mainNavbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efecto de sombra al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Activar link de la sección visible
        updateActiveNavLink();
    });

    // Función para actualizar el link activo según la sección visible
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // ============================================
    // SCROLL SUAVE
    // ============================================
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo aplicar scroll suave a enlaces ancla
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Offset para navbar fija
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                }
            }
        });
    });

    // ============================================
    // FILTRO DE GALERÍA
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener el filtro seleccionado
            const filter = this.getAttribute('data-filter');
            
            // Filtrar elementos de la galería
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = '';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
        });
    });

    // ============================================
    // LIGHTBOX PARA IMÁGENES
    // ============================================
    const galleryCards = document.querySelectorAll('.gallery-card');
    const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
    const lightboxImage = document.getElementById('lightboxImage');
    
    galleryCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            const imgSrc = img.getAttribute('src');
            const imgAlt = img.getAttribute('alt');
            
            // Verificar que la imagen existe (no es placeholder)
            if (imgSrc && !imgSrc.includes('placeholder')) {
                lightboxImage.setAttribute('src', imgSrc);
                lightboxImage.setAttribute('alt', imgAlt);
                lightboxModal.show();
            }
        });
    });

    // Cerrar lightbox con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxModal._isShown) {
            lightboxModal.hide();
        }
    });

    // ============================================
    // ANIMACIONES AL SCROLL (Intersection Observer)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos animables
    const animatableElements = document.querySelectorAll('.service-card, .gallery-item, .table tbody tr');
    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // MEJORAS DE UX
    // ============================================
    
    // Prevenir comportamiento por defecto en enlaces que apuntan a # solamente
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // Lazy loading mejorado para imágenes (si el navegador lo soporta)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }

    // ============================================
    // GRILLA DE TARIFAS - CARGA DINÁMICA
    // ============================================
    const tarifasGridBody = document.getElementById('tarifasGridBody');
    
    if (tarifasGridBody) {
        // Datos de tarifas (puedes cargar desde una API o archivo JSON)
        const tarifasData = [
            {
                mes: 'Diciembre',
                primerQuincena: { precio: '-', alquilado: false },
                segundaQuincena: { precio: '-', alquilado: false },
                semana: { precio: '-', alquilado: false },
                porDia: { precio: '-', alquilado: false }
            },
            {
                mes: 'Enero',
                primerQuincena: { precio: '$XX.XXX', alquilado: true },
                segundaQuincena: { precio: '$XX.XXX', alquilado: true },
                semana: { precio: '$XX.XXX', alquilado: true },
                porDia: { precio: '$XX.XXX', alquilado: true }
            },
            {
                mes: 'Febrero',
                primerQuincena: { precio: '$XX.XXX', alquilado: true },
                segundaQuincena: { precio: 'ARS$1.200.000', alquilado: false },
                semana: { precio: '-', alquilado: false },
                porDia: { precio: '-', alquilado: false }
            },
            {
                mes: 'Marzo',
                primerQuincena: { precio: '-', alquilado: false },
                segundaQuincena: { precio: '-', alquilado: false },
                semana: { precio: '-', alquilado: false },
                porDia: { precio: 'USD$60', alquilado: false }
            },
            {
                mes: 'Semana Santa',
                primerQuincena: { precio: '-', alquilado: false },
                segundaQuincena: { precio: '-', alquilado: false },
                semana: { precio: 'USD$500', alquilado: false },
                porDia: { precio: '-', alquilado: false }
            }
        ];

        // Función para crear una celda
        function createCell(data, type) {
            const cell = document.createElement('td');
            cell.className = 'tarifa-cell';
            
            if (data.alquilado) {
                cell.classList.add('alquilado');
                cell.innerHTML = '<span class="badge bg-danger">Alquilado</span>';
            } else {
                cell.textContent = data.precio;
            }
            
            return cell;
        }

        // Generar filas de la tabla
        tarifasData.forEach(item => {
            const row = document.createElement('tr');
            
            // Columna Mes
            const mesCell = document.createElement('td');
            mesCell.className = 'mes-cell';
            mesCell.innerHTML = `<strong>${item.mes}</strong>`;
            row.appendChild(mesCell);
            
            // Resto de columnas
            row.appendChild(createCell(item.primerQuincena, 'primerQuincena'));
            row.appendChild(createCell(item.segundaQuincena, 'segundaQuincena'));
            row.appendChild(createCell(item.semana, 'semana'));
            row.appendChild(createCell(item.porDia, 'porDia'));
            
            tarifasGridBody.appendChild(row);
        });
    }

    // ============================================
    // TEMPORADA - CARGA DINÁMICA DE AÑOS
    // ============================================
    const temporadaElement = document.getElementById('temporadaAnio');
    
    if (temporadaElement) {
        const añoActual = new Date().getFullYear();
        const añoSiguiente = añoActual + 1;
        temporadaElement.textContent = `${añoActual}/${añoSiguiente}`;
    }

    // ============================================
    // FICHA DEL INMUEBLE - CONTROL DINÁMICO
    // ============================================
    const fichaSection = document.getElementById('ficha-inmueble');
    const fichaCode = document.getElementById('fichaCode');
    const fichaLink = document.getElementById('fichaLink');
    
    // Configuración de la ficha (puede activarse/desactivarse dinámicamente)
    const fichaConfig = {
        enabled: true, // Cambiar a false para ocultar la sección
        codigo: 'ALQ-171',
        url: 'https://miramarinmobiliario.com.ar/ver-ficha-inmueble/ALQ-0171'
    };
    
    // Función para activar/desactivar la sección de ficha
    function toggleFichaSection(show) {
        if (fichaSection) {
            if (show) {
                fichaSection.style.display = 'block';
                // Actualizar código y URL si es necesario
                if (fichaCode) {
                    fichaCode.textContent = fichaConfig.codigo;
                }
                if (fichaLink) {
                    fichaLink.href = fichaConfig.url;
                }
            } else {
                fichaSection.style.display = 'none';
            }
        }
    }
    
    // Activar/desactivar según la configuración
    toggleFichaSection(fichaConfig.enabled);
    
    // Exportar función para uso externo (si se necesita activar desde otro script)
    window.toggleFichaInmueble = toggleFichaSection;

    // ============================================
    // CONSOLA DE DEBUG (solo en desarrollo)
    // ============================================
    /*
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('✅ Alquiler Temporario Miramar - Scripts cargados correctamente');
        if (fichaConfig.enabled) {
            console.log('✅ Sección Ficha del Inmueble: ACTIVADA');
        } else {
            console.log('ℹ️ Sección Ficha del Inmueble: DESACTIVADA (cambiar fichaConfig.enabled a true para activar)');
        }
    }
    */
})();

