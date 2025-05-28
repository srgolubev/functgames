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
          ${logos.moscowSport ? `<img src="${logos.moscowSport}" alt="Moscow Sport">` : ''}
          ${logos.worldClass ? `<img src="${logos.worldClass}" alt="World Class">` : ''}
          ${logos.yashankin ? `<img src="${logos.yashankin}" alt="Yashankin">` : ''}
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
  const banner = content.banner || {};
  if(banner.type === 'video') {
    return `
      <section id="banner" class="banner">
        <video class="banner-video" autoplay loop muted playsinline poster="${banner.posterImage}">
          <source src="${banner.source_mp4}" type="video/mp4">
          <source src="${banner.source_webm}" type="video/webm">
          Ваш браузер не поддерживает видео.
        </video>
        <div class="banner-video-red"></div>
        <div class="banner-overlay">
          <h1>${banner.title || ''}</h1>
          <div class="banner-date">${banner.dateText || ''}</div>
          ${banner.ctaButtonText ? `<a href="${banner.ctaButtonLink}" class="banner-cta">${banner.ctaButtonText}</a>` : ''}
        </div>
      </section>
    `;
  } else if(banner.type === 'image') {
    return `
      <section id="banner" class="banner">
        <img src="${banner.posterImage}" alt="Banner" class="banner-img">
        <div class="banner-overlay">
          <h1>${banner.title || ''}</h1>
          <div class="banner-date">${banner.dateText || ''}</div>
          ${banner.ctaButtonText ? `<a href="${banner.ctaButtonLink}" class="banner-cta">${banner.ctaButtonText}</a>` : ''}
        </div>
      </section>
    `;
  }
  return '';
}

// ABOUT
function renderSectionAbout(content) {
  const about = content.aboutFestival || {};
  return `
    <section id="about" class="section about">
      <h2>${about.title || ''}</h2>
      <p>${about.description || ''}</p>
      <ul class="goals">
        ${(about.goals||[]).map(g=>`<li>${g}</li>`).join('')}
      </ul>
      <ul class="why-participate">
        ${(about.whyParticipatePoints||[]).map(p=>`<li>${p}</li>`).join('')}
      </ul>
    </section>
  `;
}

// FAMILY SPORT
//function renderSectionFamily(content) {
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
        <div class="format-cards">
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
    <section id="spectatorsInfo" class="section spectators">
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
    <section id="program" class="section program">
      <h2>${s.title||''}</h2>
      <div class="program-list">
        ${(s.schedule||[]).map(item=>`
          <div class="program-item">
            <div class="program-time">${item.time}</div>
            <div class="program-event">${item.event}</div>
          </div>`).join('')}
      </div>
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
      <div class="partners-logos">
        ${(s.partners||[]).map(p=>`<a href="${p.link||'#'}" target="_blank"><img src="${p.logo}" alt="${p.name}"></a>`).join('')}
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
