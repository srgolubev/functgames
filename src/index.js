require('./style.css');
require('./competitionsCarousel.css');
require('./competitionsCarousel.js');

// Function to render the gallery section
function renderSectionGallery(content) {
  const s = content.gallerySection || {};
  if (!s.images || s.images.length === 0) {
    return '';
  }

  const imageElements = s.images.map(imgUrl => `
    <div class="gallery-item">
      <img src="${imgUrl}" alt="Фото из галереи" loading="lazy">
    </div>
  `).join('');

  return `
    <section id="gallery" class="section">
      <h2 class="section-title">${s.title || 'Галерея'}</h2>
      <div class="gallery-grid">
        ${imageElements}
      </div>
      <div class="gallery-more-btn-wrapper">
        <a href="${s.morePhotosLink}" class="main-btn" target="_blank">${s.morePhotosButtonText || 'Больше фото'}</a>
      </div>
    </section>
  `;
}

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

  // Генерация секций ${renderSectionProgram(content)}
  app.innerHTML = `
    ${renderHeader(content)}
    ${renderBanner(content)}
    ${renderSectionAbout(content)}
    ${renderSectionFunctional(content)}
    ${renderSectionFamilySport(content)}
    ${renderSectionMainStage(content)} 
    ${renderSectionCompetitions(content)}
    ${renderSectionGallery(content)} 
    ${renderSectionActivities(content)}
    ${renderSectionHeadliners(content)}
    ${renderSectionImportant(content)}
    ${renderSectionPartners(content)}
    ${renderFooter(content)}
  `;
  loadCompetitions();
  setupMasonryGallery();

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
          ${logos.non_descriptor_red ? `<img src="${logos.non_descriptor_red}" alt="Non Descriptor">` : ''}
          ${logos.mosgames_dark ? `<img src="${logos.mosgames_dark}" alt="Игры Москвы">` : ''}
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
            <h1 style="font-size: 2.8rem; font-family: var(--font-heading); font-weight: 900; margin-bottom: 1rem; line-height: 1.1; text-align: left;">${b.title || ''}</h1>
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



// FAMILY SPORT
function renderSectionFamilySport(content) {
  const s = content.familySportSection || {};
  return `
    <section id="familySport" class="section section-bg-dark family">
      <h2>${s.title || ''}</h2>
      <div class="family-info-row">
        <div class="family-info-main">

          <div class="family-desc">${s.description || ''}</div>
          <div class="family-prizes">${s.prizesText || ''}</div>
        </div>
        <div class="family-info-photos">
          ${(s.images || []).map(img => `<img src="${img}" alt="Семейный фестиваль" class="family-photo">`).join('')}
        </div>
      </div>
    </section>
  `;
}

// COMPETITIONS SECTION
function renderSectionCompetitions(content) {
  return `
    <section id="competitions" class="section competitions-section">
      <h2 class="competitions-title">СОРЕВНОВАНИЯ</h2>
      <div id="competitions-carousel-arrows" class="competitions-carousel-arrows"></div>
      <div id="competitions-carousel" class="competitions-carousel">
        <div id="competitions-carousel-track" class="competitions-carousel-track"></div>
      </div>
      <div id="competitions-carousel-dots" class="competitions-carousel-dots"></div>
    </section>
  `;
}

// ACTIVITIES SECTION
function renderSectionActivities(content) {
  // Жёстко заданные активности и изображения
  const activities = [
    { img: 'assets/images/powerful.jpg', label: 'Самый мощный' },
    { img: 'assets/images/fast.jpg', label: 'Самый быстрый' },
    { img: 'assets/images/hardy.jpg', label: 'Самый выносливый' },
    { img: 'assets/images/accurate.jpg', label: 'Самый точный' },
    { img: 'assets/images/strong.jpg', label: 'Самый сильный' },
  ];
  return `
    <section id="activities" class="section activities-section">
      <h2 class="activities-title">АКТИВНОСТИ:</h2>
      <div class="activities-list">
        ${activities.map(a => `
          <div class="activity-item">
            <img src="${a.img}" alt="${a.label}" class="activity-img" />
            <div class="activity-label">${a.label}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// HEADLINERS SECTION
function renderSectionHeadliners(content) {
  // Жёстко заданные хедлайнеры
  const headliners = [
    {
      img: 'assets/images/Bobylev.png',
      name: 'Николай Бобылев',
      desc: 'Победитель шоу «Титаны», учитель физкультуры и спортсмен, выступающий в армрестлинге, пауэрлифтинге и других силовых видах спорта.'
    },
    {
      img: 'assets/images/Stoun.png',
      name: 'Александр «Стоун» Зарубин',
      desc: 'Чемпион России по боевым искусствам, Чемпион Кубка мира, боец ММА, участник шоу «Титаны».'
    },
    {
      img: 'assets/images/Vlasov.png',
      name: 'Роман Власов',
      desc: 'Российский спортсмен, борец греко-римского стиля, двукратный олимпийский чемпион, участник шоу «Титаны».'
    },
    {
      img: 'assets/images/Krukov.png',
      name: 'Никита Крюков',
      desc: 'Олимпийский чемпион, трёхкратный чемпион мира в спринте, заслуженный мастер спорта России, участник шоу «Титаны».'
    },
    {
      img: 'assets/images/Kovalchuk.png',
      name: 'Илья Ковальчук',
      desc: 'Нападающий национальной сборной России, заслуженный мастер спорта, олимпийский чемпион, двукратный чемпион мира, пятикратный призёр чемпионатов мира.'
    },
    {
      img: 'assets/images/Nagornaya.png',
      name: 'Дарья Нагорная',
      desc: 'Российская гимнастка, серебряный призёр Олимпийских игр, чемпионка мира, участница шоу «Титаны».'
    },
    {
      img: 'assets/images/Pluzhnikova.png',
      name: 'Дарья Плужникова',
      desc: 'Российская культуристка, бодибилдер, блогер, мировая рекордсменка, участница шоу «Титаны».'
    }
  ];
  return `
    <section id="headliners" class="section headliners-section">
      <div class="container">
        <h2 class="headliners-title">ХЕДЛАЙНЕРЫ</h2>
        <div class="headliners-list">
          ${headliners.map(h => `
            <div class="headliner-item">
              <img src="${h.img}" alt="${h.name}" class="headliner-img" />
              <div class="headliner-name">${h.name}</div>
              <div class="headliner-desc">${h.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// TITANS SECTION
// MAIN STAGE
function renderSectionMainStage(content) {
  const s = content.mainStageSection || {};
  return `
    <section id="main-stage" class="section main-stage-section">
      <div class="main-stage-content">
        <div class="main-stage-text">
          <h2 class="section-title">${s.title}</h2>
          <p>${s.description}</p>
        </div>
        <div class="main-stage-image">
          <img src="${s.image}" alt="${s.title}">
        </div>
      </div>
    </section>
  `;
}

// TITANS
function renderSectionTitans(content) {
  const s = content.titansSection || {};
  return `
    <section id="titans" class="section titans-section">
      <div class="container titans-container">
        <div class="titans-main">
          <h2 class="titans-title">${s.title || 'ЮНЫЕ ТИТАНЫ'}</h2>
          <div class="titans-desc">${s.description || ''}</div>
          <div class="titans-info-card">
  <div class="titans-info-row">
    <div class="titans-info-icon participants"></div>
    <div>
      <div class="titans-info-title titans-red">УЧАСТНИКИ</div>
      <div class="titans-info-value">14-15 лет,<br>16-18 лет,<br>19-23 года</div>
    </div>
  </div>
  <div class="titans-info-row">
    <div class="titans-info-icon team"></div>
    <div>
      <div class="titans-info-title titans-red">КОМАНДА</div>
      <div class="titans-info-value">5 человек<br><span class="titans-info-note">(1 человек противоположного пола)</span></div>
    </div>
  </div>
  <div class="titans-info-row">
    <div class="titans-info-icon mechanics"></div>
    <div>
      <div class="titans-info-title titans-red">МЕХАНИКА СОРЕВНОВАНИЙ</div>
      <div class="titans-info-value">Отборочный тур<br>Полуфинал<br>Финал<br><span class="titans-info-note">(4 команды)</span></div>
    </div>
  </div>
  <div class="titans-special-guests">
    <span class="titans-info-icon guests"></span>
    <span><b>Специальные гости — участники и победители 1, 2 сезона ТИТАНЫ</b></span>
  </div>
</div>
          
        </div>
        <div class="titans-photos">
          <img src="assets/images/FSS3111.jpg" alt="Юные титаны фото 1" class="titans-photo">
          <img src="assets/images/FSS3114.jpg" alt="Юные титаны фото 2" class="titans-photo">
          <div class="titans-logo-block">
            <img src="assets/images/logo/titans.png" alt="Юные титаны" class="titans-logo">
            <div class="titans-registration-block">
              <h4 class="titans-registration-title">Регистрация</h4>
              <a class="main-btn titans-register-btn disabled">Завершено</a>
            </div>
            <a href="assets/Положение_Юные_Титаны_для_детей_и_подростков_10_06_2025_2.pdf" class="titans-regulation-link" target="_blank">Положение о соревновании</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

// FUNCTIONAL GAMES
function renderSectionFunctional(content) {
  const s = content.functionalGamesSection || {};
  return `
    <section id="functionalGames" class="section functional">
      ${s.logo ? `<img src="${s.logo2}" alt="Functional Games" class="section-logo">` : ''}
      <h2>${s.title||''}</h2>
      <div class="desc">${s.description||''}</div>
      <div class="context">${s.context||''}</div>
      <div class="participants-info">${s.participantsInfo ? `${s.participantsInfo.total}, ${s.participantsInfo.spectators}` : ''}</div>
      <div class="requirements"><b>Не допускаются:</b> ${(s.participantRequirements||[]).join(', ')}</div>
      <div class="obstacle">
        <b>Полоса препятствий:</b> ${(s.obstacleCourse?.stages||[]).join(', ')}
        <div>${s.obstacleCourse?.equipmentSponsor||''}</div>
      </div>
      <div class="moscow-register-btn-wrapper" style="text-align:center; margin: 18px 0 22px 0;">
        <a href="${s.registerUrl}"class="main-btn moscow-register-btn">Регистрация</a>
        <div class="family-regulation-link" style="margin-top: 10px;">
          <a href="${s.regulationsLink}" target="_blank" class="family-regulation-pdf">Положение о проведении</a>
        </div>
      </div>
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
function renderSectionGallery(content) {
  const s = content.gallerySection || {};
  if (!s.images || s.images.length === 0) {
    return '';
  }

  const imageElements = s.images.map(imgUrl => `
    <div class="gallery-item">
      <img src="${imgUrl}" alt="Фото из галереи" loading="lazy">
    </div>
  `).join('');

  return `
    <section id="gallery" class="section">
      <h2 class="section-title">${s.title || 'Галерея'}</h2>
      <div class="gallery-grid">
        ${imageElements}
      </div>
      <div class="gallery-more-btn-wrapper">
        <a href="${s.morePhotosLink}" class="main-btn" target="_blank">${s.morePhotosButtonText || 'Больше фото'}</a>
      </div>
    </section>
  `;
}

// PROGRAM
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
    <section id="important" class="section section-bg-dark important-section">
      <div class="container">
        <h2 class="section-title">${s.title || 'ВАЖНАЯ ИНФОРМАЦИЯ'}</h2>
        <div class="important-info-content">
          ${(s.infoBlocks || []).map(block => `
            <div class="info-block">
              <h3 class="info-block-title">${block.title}</h3>
              <p>${block.text}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

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
        <div>${(s.locationAccess?.directions||'').replace(/\n/g, '<br>')}</div>
        <div style="margin:18px 0 0 0; width:100%; max-width:100%; height:340px; border-radius:14px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          <iframe src="https://yandex.ru/map-widget/v1/?ll=37.735675%2C55.708137&z=16&pt=37.735675,55.708137,pm2rdm" width="100%" height="340" frameborder="0" allowfullscreen title="Яндекс.Карта: Северное Спортивный центр"></iframe>
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

function setupMasonryGallery() {
  const gallery = document.querySelector('.gallery-grid');
  if (!gallery) {
    return;
  }

  const resizeAllGridItems = () => {
    const allItems = gallery.querySelectorAll('.gallery-item');
    const rowHeight = 1;
    const rowGap = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-row-gap'));

    allItems.forEach(item => {
      const img = item.querySelector('img');
      
      const setSpan = () => {
        // Calculate the aspect ratio of the image
        const ratio = img.naturalHeight / img.naturalWidth;
        // Get the width of the grid item
        const itemWidth = item.getBoundingClientRect().width;
        // Calculate the scaled height of the image
        const scaledHeight = itemWidth * ratio;
        // Calculate the number of rows to span
        const rowSpan = Math.ceil((scaledHeight + rowGap) / (rowHeight + rowGap));
        // Apply the span to the grid item
        item.style.gridRowEnd = `span ${rowSpan}`;
      }

      if (img.complete) {
        setSpan();
      } else {
        img.addEventListener('load', setSpan);
      }
    });
  }

  // Wait for images to load before setting up the grid
  const images = gallery.querySelectorAll('img');
  let imagesLoaded = 0;
  images.forEach(img => {
    if (img.complete) {
        imagesLoaded++;
    } else {
        img.addEventListener('load', () => {
            imagesLoaded++;
            if (imagesLoaded === images.length) {
                resizeAllGridItems();
            }
        });
    }
  });

  if (imagesLoaded === images.length) {
    resizeAllGridItems();
  }

  // Recalculate on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeAllGridItems, 200);
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
