require('./style.css');

document.addEventListener('DOMContentLoaded', async () => {
  const app = document.getElementById('app');
  let content = {};

  // Загрузка content.json
  try {
    const response = await fetch('content.json');
    content = await response.json();
  } catch (e) {
    app.innerHTML = '<div style="color:red">Ошибка загрузки контента</div>';
    return;
  }

  // Генерация секций
  app.innerHTML = `
    ${renderHeader(content)}
    ${renderBanner(content)}
    ${renderSectionAbout(content)}
    ${renderSectionFunctional(content)}
    ${renderSectionSpectators(content)}
    ${renderSectionRegistration(content)}
    ${renderSectionProgram(content)}
    ${renderSectionImportant(content)}
    ${renderSectionPartners(content)}
    ${renderFooter(content)}
  `;

  // Плавный скролл
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth'});
      }
    });
  });

  // Burger menu logic
  const burgerBtn = document.querySelector('.burger');
  const nav = document.querySelector('.main-header nav');
  const overlay = document.querySelector('.overlay');
  if (burgerBtn && nav && overlay) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('active');
      nav.classList.toggle('active');
      overlay.classList.toggle('active');
    });
    overlay.addEventListener('click', () => {
      burgerBtn.classList.remove('active');
      nav.classList.remove('active');
      overlay.classList.remove('active');
    });
  }
});

// HEADER
function renderHeader(content) {
  // Burger menu HTML
  const burger = `
    <button class="burger" aria-label="Открыть меню">
      <span></span><span></span><span></span>
    </button>
  `;

  const logos = content.logos || {};
  const nav = content.navigation || [];
  return `
    <header class="main-header">
      <div class="header-logos-burger">
        <div class="header-logos">
          ${logos.moscowSport ? `<img src="${logos.moscowSport}" alt="Московский спорт">` : ''}
          ${logos.nasledie ? `<img src="${logos.nasledie}" alt="Наследие">` : ''}
          ${logos.depsport ? `<img src="${logos.depsport}" alt="Департамент спорта Москвы">` : ''}
        </div>
        ${burger}
      </div>
      <nav>
        <ul>
          ${nav.map(item => `<li><a href="${item.href}">${item.text}</a></li>`).join('')}
        </ul>
      </nav>
      <div class="overlay"></div>
    </header>
  `;
}

// BANNER
function renderBanner(content) {
  const b = content.banner || {};
  return `
    <section class="section section-accent banner">
      <div class="container">
        <div class="banner-inner" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; padding: 2.5rem 1.5rem; gap: 2rem;">
          <div class="banner-text" style="flex:1; min-width:260px; color: #fff;">
            <h1 style="font-size: 2.8rem; font-family: var(--font-heading); font-weight: 900; margin-bottom: 1rem; line-height: 1.1;">${b.title || ''}</h1>
            <div class="banner-date" style="font-size:1.4rem; font-weight:600; margin-bottom:0.5rem;">${b.dateText || ''}</div>
            ${b.locationText ? `<div class="banner-location" style="font-size:1.05rem; font-weight:500; opacity:0.85; margin-bottom:1.2rem; line-height:1.35;">${(b.locationText||'').replace(/\n/g,'<br>')}</div>` : ''}
            <a href="${b.ctaButtonLink || '#'}" class="main-btn banner-cta-turquoise" style="background: var(--color-title); font-size:1.25rem; border-radius: 20px; padding: 0.75rem 2.2rem; box-shadow: 0 2px 12px rgba(43,211,225,0.14);">${b.ctaButtonText || ''}</a>
          </div>
          <div class="banner-media" style="flex:1; min-width:260px; display:flex; align-items:center; justify-content:center;">
            <img src="assets/images/3d/MusculeCat2.png" alt="Muscle Cat" style="max-width:340px; border-radius: 24px; box-shadow: 0 4px 24px rgba(0,0,0,0.3);">
          </div>
        </div>
      </div>
    </section>
  `;
}

// ABOUT
function renderSectionAbout(content) {
  const s = content.aboutFestival || {};
  return `
    <section id="about" class="section section-bg-dark about-section">
      <div class="container">
        <h2 class="about-title">${s.title || ''}</h2>
        <div class="about-desc">${s.description || ''}</div>
        <ul style="margin-bottom:1.2rem;">
          ${(s.points || []).map(point => `<li>${point}</li>`).join('')}
        </ul>
        <div class="about-why-row">
  <div class="about-why-dumbbell-col">
    <img src="assets/images/3d/Гантеля.png" alt="Гантеля" class="about-why-dumbbell">
  </div>
  <div class="about-why">
    <h3 class="about-why-title">Почему стоит участвовать?</h3>
    <ul class="about-why-list">
      ${(s.whyParticipatePoints || []).map(point => `<li >${point}</li>`).join('')}
    </ul>
  </div>
</div>
      </div>
    </section>
  `;
}
  // const s = content.familySportSection || {};
  // return `
  //   <section id="familySport" class="section family">
  //     <h2>${s.title || ''}</h2>
  //     <div class="tagline">${s.tagline||''}</div>
  //     <div class="start-time">${s.startTime||''}</div>
  //     <p>${s.description||''}</p>
  //     <div class="nominations"><b>Номинации:</b> ${(s.nominationCategories||[]).join(', ')}</div>
  //     <div class="competitions"><b>Соревнования:</b> ${(s.competitions||[]).join(', ')}</div>
  //     <div class="prizes">
  //       <div><b>Подарки:</b> ${s.prizes?.participationGifts||''}</div>
  //       <div><b>Главные призы:</b> ${(s.prizes?.mainPrizes||[]).join(', ')}</div>
  //     </div>
  //     <div class="gallery">
  //       ${(s.imageGallery||[]).map(img=>`<img src="${img}" alt="Фестиваль">`).join('')}
  //     </div>
  //   </section>
  // `;
//}

// FUNCTIONAL GAMES
function renderSectionFunctional(content) {
  const s = content.functionalGamesSection || {};
  return `
    <section id="functionalGames" class="section functional">
      ${s.logo ? `<img src="${s.logo}" alt="Functional Games" class="section-logo">` : ''}
      <h2>${s.title||''}</h2>
      <div class="desc">${s.description||''}</div>
      <div class="context">${s.context||''}</div>
      <div class="participants-info">${s.participantsInfo ? `${s.participantsInfo.total}, ${s.participantsInfo.spectators}` : ''}</div>
      <div class="formats">
        <b>Форматы:</b>
        <div class="format-cards format-cards-center">
          ${(s.formats||[]).map(f=>`
            <div class="format-card">
              <div class="format-icon">${f.name.includes('Команд') ? '🏆' : '🥇'}</div>
              <div class="format-title">${f.name}</div>
              ${f.description ? `<div class="format-desc">${f.description}</div>` : ''}
              ${f.conditions ? `<div class="format-conditions">${f.conditions}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
      <div class="requirements"><b>Требования:</b> ${(s.participantRequirements||[]).join(', ')}</div>
      <div class="structure"><b>Структура:</b> ${s.competitionStructure||''}</div>
      <div class="obstacle">
        <b>Полоса препятствий:</b> ${(s.obstacleCourse?.stages||[]).join(', ')}
        <div>${s.obstacleCourse?.equipmentSponsor||''}</div>
      </div>
      ${s.regulationsLink ? `<a href="${s.regulationsLink}" target="_blank" class="regulations-link">Положение</a>` : ''}
      <div class="gallery">
        ${(s.imageGallery||[]).map(img=>`<img src="${img}" alt="Игры" class="gallery-thumb" data-fullsrc="${img}">`).join('')}
      </div>
    </section>
  `;
}

// PARTICIPANTS
//function renderSectionParticipants(content) {
//   const s = content.participantsSection || {};
//   return `
//   <section id="participantsInfo" class="section participants">
//     <h2>${s.title||''}</h2>
//     <p>${s.generalInfo||''}</p>
//     <ul>${(s.keyConditions||[]).map(c=>`<li>${c}</li>`).join('')}</ul>
//   </section>
// `;
//}

// SPECTATORS
function renderSectionSpectators(content) {
  const s = content.spectatorsSection || {};
  return `
    <section id="spectatorsInfo" class="section section-dark spectators">
      <h2>${s.title||''}</h2>
      <p>${s.description||''}</p>
      <ul>${(s.activities||[]).map(a=>`<li>${a}</li>`).join('')}</ul>
      <div class="reasons">
        <b>Почему стоит прийти:</b>
        <ul>${(s.reasonsToAttend||[]).map(r=>`<li>${r}</li>`).join('')}</ul>
      </div>
    </section>
  `;
}

// REGISTRATION
function renderSectionRegistration(content) {
  const s = content.registrationSection || {};
  return `
    <section id="register" class="section register">
      <h2>${s.title||''}</h2>
      <ul>${(s.rules||[]).map(r=>`<li>${r}</li>`).join('')}</ul>
      ${s.timepadLink ? `<div class="centered-btn"><a href="${s.timepadLink}" target="_blank" class="register-btn">${s.buttonText||'Зарегистрироваться'}</a></div>` : ''}
      ${s.ctaParticipateBanner ? `<div class="participate-banner"><a href="${s.ctaParticipateBanner.link}" target="_blank">${s.ctaParticipateBanner.text}</a></div>` : ''}
    </section>
  `;
}

// ...
function renderSectionProgram(content) {
  const s = content.eventProgram || {};
  return `
    <section id="program" class="section section-orange program">
      <h2>${s.title||''}</h2>
      <table class="schedule-table">
        <tbody>
          ${(s.schedule||[]).map(item=>`
            <tr>
              <td class="schedule-time">${item.time}</td>
              <td class="schedule-event">${item.event}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </section>
  `;
}

// IMPORTANT INFO
function renderSectionImportant(content) {
  const s = content.importantInfoSection || {};
  return `
    <section id="importantInfo" class="section important-info">
      <h2>${s.title||''}</h2>
      <div class="medical">
        <b>${s.medicalCertificate?.title||''}</b>
        <p>${s.medicalCertificate?.text||''}</p>
      </div>
      <div class="location">
        <b>${s.locationAccess?.title||''}</b>
        <div>${s.locationAccess?.address||''}</div>
        <div>${s.locationAccess?.directions||''}</div>
        <div style="margin:18px 0 0 0; width:100%; max-width:100%; height:340px; border-radius:14px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          <iframe src="https://yandex.ru/map-widget/v1/?ll=37.561445%2C55.715421&z=16&pt=37.561445,55.715421,pm2rdm" width="100%" height="340" frameborder="0" allowfullscreen title="Яндекс.Карта: Южное Спортивное Ядро"></iframe>
        </div>
      </div>
    </section>
  `;
}

// PARTNERS
function renderSectionPartners(content) {
  const s = content.partnersSection || {};
  return `
    <section id="partners" class="section partners">
      <h2>${s.title||''}</h2>
      <div class="partners-list">
        ${(s.partners||[]).map(p=>`
          <div class="partner-card">
            <a href="${p.link||'#'}" target="_blank" rel="noopener">
              <img src="${p.logo}" alt="${p.name}">
            </a>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// LIGHTBOX
// Вставить после загрузки DOM
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', function(e) {
      const img = e.target.closest('.gallery-thumb');
      if (img) {
        e.preventDefault();
        let overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `<img src="${img.dataset.fullsrc || img.src}" class="lightbox-img" alt="">`;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.classList.add('active'), 10);
        function closeLightbox(ev) {
          if (ev.type === 'keydown' && ev.key !== 'Escape') return;
          if (ev.type === 'click' && ev.target !== overlay) return;
          overlay.classList.remove('active');
          setTimeout(() => overlay.remove(), 200);
          document.removeEventListener('keydown', closeLightbox);
          overlay.removeEventListener('click', closeLightbox);
        }
        document.addEventListener('keydown', closeLightbox);
        overlay.addEventListener('click', closeLightbox);
      }
    });
  });
}

// FOOTER
function renderFooter(content) {
  const f = content.footer || {};
  return `
    <footer class="main-footer">
      <div>${f.copyright||''}</div>
      <div class="footer-links">
        ${(f.links||[]).map(l=>`<a href="${l.href}" target="_blank">${l.text}</a>`).join(' | ')}
      </div>
      <div class="footer-social">
        ${(f.socialMedia||[]).map(sm=>`<a href="${sm.link}" target="_blank">${sm.platform}</a>`).join(' ')}
      </div>
    </footer>
  `;
}
