document.addEventListener('DOMContentLoaded', () => {
    const navbarHeader = document.querySelector('.navbar-header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const dropdownToggle = document.getElementById('dropdown-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const mobileNavigation = window.matchMedia('(max-width: 768px)');

    const updateNavbarShadow = () => {
        navbarHeader?.classList.toggle('is-scrolled', window.scrollY > 8);
    };

    window.addEventListener('scroll', updateNavbarShadow, { passive: true });
    updateNavbarShadow();

    if (!hamburgerBtn || !navMenu || !dropdownToggle || !dropdownMenu) {
        return;
    }

    const setMenuOpen = (isOpen) => {
        navMenu.classList.toggle('active', isOpen);
        hamburgerBtn.classList.toggle('toggle', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
        hamburgerBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');

        if (!isOpen) {
            setDropdownOpen(false);
        }
    };

    const setDropdownOpen = (isOpen) => {
        dropdownMenu.classList.toggle('show', isOpen);
        dropdownToggle.setAttribute('aria-expanded', String(isOpen));
    };

    hamburgerBtn.addEventListener('click', () => {
        setMenuOpen(hamburgerBtn.getAttribute('aria-expanded') !== 'true');
    });

    dropdownToggle.addEventListener('click', (event) => {
        event.preventDefault();
        setDropdownOpen(dropdownToggle.getAttribute('aria-expanded') !== 'true');
    });

    navMenu.addEventListener('click', (event) => {
        if (event.target instanceof Element && event.target.closest('a:not(.dropdown-toggle)')) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target instanceof Element && !event.target.closest('.navbar')) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const menuWasOpen = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            setMenuOpen(false);

            if (menuWasOpen) {
                hamburgerBtn.focus();
            }
        }
    });

    mobileNavigation.addEventListener('change', () => {
        setMenuOpen(false);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const monthElement = document.getElementById("calendar-month");
    const dateElement = document.getElementById("calendar-date");

    const now = new Date();

    // Obtener el nombre del mes abreviado o completo (ej: "JUN" o "JUNE")
    const monthName = now.toLocaleString("en-US", { month: "long" }).toUpperCase();

    // Obtener el número del día
    const dayNumber = now.getDate();

    // Insertar en el HTML
    monthElement.textContent = monthName;
    dateElement.textContent = dayNumber;
});