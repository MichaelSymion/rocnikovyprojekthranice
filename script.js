document.addEventListener('DOMContentLoaded', () => {
    // Selektory pro karusel
    const images = document.querySelectorAll('.carousel img');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    // Selektory pro navigaci
    const sidebarLinks = document.querySelectorAll('.sidebar a[data-section]');
    const navbarLinks = document.querySelectorAll('.navbar a[data-section]');
    const mainContent = document.querySelector('.main-content');
    const hiddenContent = document.querySelector('.hidden-content');
    let currentIndex = 0;

    // Uložení původního obsahu hlavní sekce pro obnovení
    const originalMainContent = mainContent.innerHTML;

    // Funkce pro karusel
    function showImage(index) {
        if (images.length === 0) return; // Kontrola, zda jsou obrázky v karuselu
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    function autoSlide() {
        if (images.length === 0) return; // Zastavení, pokud nejsou obrázky
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    // Ovládání karuselu
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        // Automatický posun karuselu každých 5 sekund
        setInterval(autoSlide, 5000);
    }

    // Funkce pro zpracování navigace
    function handleNavigation(e, links) {
        e.preventDefault();
        const sectionId = e.target.getAttribute('data-section');
        const targetSection = hiddenContent.querySelector(`#${sectionId}`);

        if (targetSection) {
            mainContent.innerHTML = targetSection.innerHTML;
            // Odstranění třídy active ze všech odkazů
            sidebarLinks.forEach(l => l.classList.remove('active'));
            navbarLinks.forEach(l => l.classList.remove('active'));
            // Přidání třídy active na kliknutý odkaz
            e.target.classList.add('active');
        } else {
            // Obnovení původního obsahu, pokud sekce není nalezena
            mainContent.innerHTML = originalMainContent;
            sidebarLinks.forEach(l => l.classList.remove('active'));
            navbarLinks.forEach(l => l.classList.remove('active'));
            // Nastavení "O webu" jako aktivní
            navbarLinks.forEach(l => {
                if (l.getAttribute('data-section') === 'informace') {
                    l.classList.add('active');
                }
            });
        }
    }

    // Přidání posluchačů na odkazy v sidebaru
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => handleNavigation(e, sidebarLinks));
    });

    // Přidání posluchačů na odkazy v navbaru
    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => handleNavigation(e, navbarLinks));
    });

    // Funkce pro kliknutí na kartu
    function handleCardClick(e) {
        const element = e.target.closest('.project-card');
        if (!element) return;
        const sectionId = element.getAttribute('data-section');
        if (sectionId) {
            const targetSection = hiddenContent.querySelector(`#${sectionId}`);
            if (targetSection) {
                mainContent.innerHTML = targetSection.innerHTML;
                // Odstranění třídy active ze všech odkazů
                sidebarLinks.forEach(l => l.classList.remove('active'));
                navbarLinks.forEach(l => l.classList.remove('active'));
            }
        }
    }

    // Přidání posluchače na kliknutí na karty
    document.addEventListener('click', (e) => {
        if (e.target.closest('.project-card')) {
            handleCardClick(e);
        }
    });

    // Obnovení původního obsahu při kliknutí na logo
    const homeLink = document.querySelector('.navbar h1');
    if (homeLink) {
        homeLink.addEventListener('click', () => {
            mainContent.innerHTML = originalMainContent;
            sidebarLinks.forEach(l => l.classList.remove('active'));
            navbarLinks.forEach(l => l.classList.remove('active'));
            // Nastavení "O webu" jako aktivní
            navbarLinks.forEach(l => {
                if (l.getAttribute('data-section') === 'informace') {
                    l.classList.add('active');
                }
            });
        });
    }
});