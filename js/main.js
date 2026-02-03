// Função para Copiar PIX (da página inicial)
function copyPix() {
    const pixText = document.getElementById('pixKey').innerText;
    const feedback = document.getElementById('copyFeedback');
    const container = document.getElementById('pixContainer');

    // Verifica se os elementos existem antes de usá-los
    if (pixText && feedback && container) {
        navigator.clipboard.writeText(pixText).then(() => {
            feedback.style.opacity = '1';
            container.style.background = '#e8f5e9'; // Fundo levemente verde ao copiar
            
            setTimeout(() => {
                feedback.style.opacity = '0';
                container.style.background = '#f0f2f5';
            }, 2000);
        });
    }
}

/**
 * Carrega o cabeçalho e o rodapé de arquivos externos e os insere na página.
 * Também ativa o link de navegação correto.
 */
async function loadLayout() {
    const headerPlaceholder = document.getElementById('main-header');
    const footerPlaceholder = document.getElementById('main-footer');

    if (headerPlaceholder) {
        try {
            const response = await fetch('layout/header.html');
            const data = await response.text();
            headerPlaceholder.innerHTML = data;
            activateNavLink();
        } catch (error) {
            console.error('Erro ao carregar o cabeçalho:', error);
            headerPlaceholder.innerHTML = '<p style="text-align:center;color:red;">Erro ao carregar o menu.</p>';
        }
    }

    if (footerPlaceholder) {
        try {
            const response = await fetch('layout/footer.html');
            const data = await response.text();
            footerPlaceholder.innerHTML = data;
            updateCopyrightYear();
        } catch (error) {
            console.error('Erro ao carregar o rodapé:', error);
            footerPlaceholder.innerHTML = '<p style="text-align:center;color:red;">Erro ao carregar o rodapé.</p>';
        }
    }
}

/**
 * Ativa o link de navegação que corresponde à página atual.
 */
function activateNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('header nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Atualiza dinamicamente o ano no rodapé.
 */
function updateCopyrightYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}


// Executa o código quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', async () => {
    
    await loadLayout();

    // Configuração Padrão do ScrollReveal
    // A biblioteca só será ativada se o elemento `ScrollReveal` existir.
    if (typeof ScrollReveal === 'function') {
        const sr = ScrollReveal({
            distance: '80px',
            duration: 1800,
            delay: 300,
            reset: false,
            viewFactor: 0.2,
            mobile: true
        });

        // As animações só devem ser registradas DEPOIS que o layout for carregado
        sr.reveal('.reveal', { origin: 'bottom', interval: 150 });
        sr.reveal('.main-logo', { origin: 'top', distance: '50px' });
        
        // Animações específicas que podem ou não estar na página
        sr.reveal('.card', { interval: 200, scale: 0.85 });
        sr.reveal('.hero h2', { origin: 'left', delay: 400, distance: '100px' });
        sr.reveal('.hero p', { origin: 'right', delay: 600, distance: '100px' });
        sr.reveal('.min-card', { scale: 0.9, interval: 200 });
        sr.reveal('.contact-info', { origin: 'left', delay: 400 });
        sr.reveal('.map-container', { origin: 'right', delay: 400 });
        sr.reveal('.schedule-row', { origin: 'left', interval: 200 });
    }
});