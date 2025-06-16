// Карусель соревнований
let competitionsData = [];

async function loadCompetitions() {
  const res = await fetch('competitions.json');
  competitionsData = await res.json();
  renderCompetitionsCarousel();
}

function renderCompetitionsCarousel() {
  const carousel = document.getElementById('competitions-carousel');
  const dots = document.getElementById('competitions-carousel-dots');
  const arrows = document.getElementById('competitions-carousel-arrows');
  if (!carousel) return;

  let visibleCount = window.innerWidth < 900 ? 1 : 3;
  let current = 0;

  // Создаём трек для карточек
  let track = document.createElement('div');
  track.className = 'competitions-carousel-track';
  track.style.width = `${competitionsData.length * 370 + (competitionsData.length-1)*26}px`;

  for (let i = 0; i < competitionsData.length; i++) {
    const c = competitionsData[i];
    const card = document.createElement('div');
    card.className = 'competitions-card';
    card.innerHTML = `
      <img src="${c.image}" alt="${c.title}" class="competitions-card-img">
      <div class="competitions-card-content">
        <div class="competitions-card-title">${c.title}</div>
        <div class="competitions-card-desc">${c.description}</div>
        <div class="competitions-card-links">
          ${c.regulation ? `<a href="${c.regulation}" class="competitions-card-link" target="_blank">Положение</a>` : ''}
          ${c.registerUrl && c.registerUrl !== '#' ? `<a href="${c.registerUrl}" class="competitions-card-btn" target="_blank">Зарегистрироваться</a>` : ''}
        </div>
      </div>
    `;
    track.appendChild(card);
  }
  carousel.innerHTML = '';
  carousel.appendChild(track);

  // dots
  if (dots) {
    dots.innerHTML = '';
    for (let i = 0; i <= competitionsData.length - visibleCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'competitions-carousel-dot' + (i === current ? ' active' : '');
      dot.onclick = () => { current = i; update(); };
      dots.appendChild(dot);
    }
  }

  // стрелки
  if (arrows) {
    arrows.innerHTML = '';
    // Левая
    const left = document.createElement('button');
    left.className = 'competitions-carousel-arrow';
    left.innerHTML = `<svg viewBox="0 0 32 32"><path d="M20.7 25.3a1 1 0 0 1-1.4 0l-8-8a1 1 0 0 1 0-1.4l8-8a1 1 0 0 1 1.4 1.4L13.42 16l7.3 7.3a1 1 0 0 1 0 1.4z"/></svg>`;
    left.onclick = () => { if (current > 0) { current--; update(); } };
    arrows.appendChild(left);
    // Правая
    const right = document.createElement('button');
    right.className = 'competitions-carousel-arrow';
    right.innerHTML = `<svg viewBox="0 0 32 32"><path d="M11.3 6.7a1 1 0 0 1 1.4 0l8 8a1 1 0 0 1 0 1.4l-8 8a1 1 0 1 1-1.4-1.4l7.3-7.3-7.3-7.3a1 1 0 0 1 0-1.4z"/></svg>`;
    right.onclick = () => { if (current < competitionsData.length - visibleCount) { current++; update(); } };
    arrows.appendChild(right);
  }

  function update() {
    // Сдвиг трека
    const cardWidth = track.firstChild ? track.firstChild.offsetWidth : 370;
    const gap = 26;
    const shift = (cardWidth + gap) * current;
    track.style.transform = `translateX(-${shift}px)`;
    // dots
    if (dots) {
      Array.from(dots.children).forEach((dot, idx) => {
        dot.classList.toggle('active', idx === current);
      });
    }
  }

  // начальный сдвиг
  update();
}

window.addEventListener('resize', renderCompetitionsCarousel);
window.loadCompetitions = loadCompetitions;
