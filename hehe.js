// Calcul du nombre de jours ensemble
function updateCounter() {
    const meetingDate = new Date('2023-09-28').getTime();
    const now = new Date().getTime();
    const difference = now - meetingDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
}

// Ajouter un message d'amour
function addMessage() {
    const author = document.getElementById('message-author').value.trim();
    const text = document.getElementById('message-text').value.trim();

    if (author === '' || text === '') {
        alert('Veuillez remplir tous les champs!');
        return;
    }

    const message = {
        author: author,
        text: text,
        date: new Date().toLocaleDateString('fr-FR')
    };

    // Sauvegarder dans localStorage
    let messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));

    // Réinitialiser le formulaire
    document.getElementById('message-author').value = '';
    document.getElementById('message-text').value = '';

    // Afficher le nouveau message
    displayMessages();
}

// Afficher les messages
function displayMessages() {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const container = document.getElementById('messages-container');
    container.innerHTML = '';

    messages.forEach(msg => {
        const card = document.createElement('div');
        card.className = 'message-card';
        card.innerHTML = `
            <div class="message-author">💕 ${msg.author}</div>
            <div class="message-text">${msg.text}</div>
            <small>${msg.date}</small>
        `;
        container.appendChild(card);
    });
}

// Ajouter un message au livre d'or
function addGuestMessage() {
    const name = document.getElementById('guest-name').value.trim();
    const message = document.getElementById('guest-message').value.trim();

    if (name === '' || message === '') {
        alert('Veuillez remplir tous les champs!');
        return;
    }

    const guestMessage = {
        name: name,
        message: message,
        date: new Date().toLocaleDateString('fr-FR')
    };

    // Sauvegarder dans localStorage
    let guestMessages = JSON.parse(localStorage.getItem('guestMessages') || '[]');
    guestMessages.push(guestMessage);
    localStorage.setItem('guestMessages', JSON.stringify(guestMessages));

    // Réinitialiser le formulaire
    document.getElementById('guest-name').value = '';
    document.getElementById('guest-message').value = '';

    // Afficher le nouveau message
    displayGuestMessages();
}

// Afficher les messages du livre d'or
function displayGuestMessages() {
    const guestMessages = JSON.parse(localStorage.getItem('guestMessages') || '[]');
    const container = document.getElementById('guestbook-container');
    container.innerHTML = '';

    guestMessages.forEach(msg => {
        const card = document.createElement('div');
        card.className = 'guest-card';
        card.innerHTML = `
            <div class="guest-name">👤 ${msg.name}</div>
            <div class="guest-content">"${msg.message}"</div>
            <div class="guest-date">${msg.date}</div>
        `;
        container.appendChild(card);
    });
}

// Ouvrir la modal de la galerie
function openModal(element) {
    const modal = document.getElementById('modal');
    const img = element.querySelector('img');
    const caption = element.querySelector('.gallery-overlay p').textContent;

    document.getElementById('modal-img').src = img.src;
    document.getElementById('modal-caption').textContent = caption;
    modal.classList.add('active');
}

// Fermer la modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
}

// Basculer le thème
document.getElementById('theme-btn').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    this.textContent = isDarkMode ? '☀️' : '🌙';
});

// Charger le thème sauvegardé
function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-btn').textContent = '☀️';
    }
}

// Fermer la modal quand on clique dessus
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Fermer la modal avec ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Ajouter des animations d'entrée pour les éléments
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-in-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.story-card, .timeline-item, .gallery-item, .message-card, .guest-card').forEach(el => {
    observer.observe(el);
});

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    updateCounter();
    displayMessages();
    displayGuestMessages();

    // Mettre à jour le compteur chaque minute
    setInterval(updateCounter, 60000);

    // Créer des cœurs flottants
    createFloatingHearts();
});

// Créer des cœurs flottants aléatoires
function createFloatingHearts() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    function createHeart() {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.animation = 'floatingHearts ' + (Math.random() * 4 + 4) + 's linear forwards';
        hero.appendChild(heart);

        setTimeout(() => heart.remove(), 8000);
    }

    // Créer des cœurs toutes les 500ms
    setInterval(createHeart, 500);
}

// Smooth scroll pour les liens
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Ajouter un effet de cœur quand on clique
document.addEventListener('click', function(event) {
    if (event.target.matches('button, .nav-link, input, textarea')) {
        createClickHeart(event.clientX, event.clientY);
    }
});

function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'floatingHearts 2s linear forwards';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
}