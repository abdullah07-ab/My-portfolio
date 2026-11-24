document.documentElement.classList.add('js');

/* ---------- Content data (edit here to update the site) ---------- */
const EMAIL = 'abdullah0303815@gmail.com';

const SKILLS = {
  'Programming languages': ['Python', 'Java', 'C'],
  'Backend development': ['Django', 'Django REST Framework', 'REST API development', 'Authentication systems', 'OTP verification', 'Backend architecture'],
  'Database': ['SQL', 'Database design', 'ERD'],
  'Background processing': ['Celery', 'Asynchronous tasks', 'OCR integration'],
  'Development tools': ['Git', 'GitHub', 'Visual Studio Code', 'Apache NetBeans'],
  'Operating system': ['Ubuntu Linux'],
  'Additional knowledge': ['API testing', 'Provider management', 'Admin dashboards', 'File upload & private storage', 'Wireframing']
};

const STATUS = {
  done: ['b-done', 'Contributions delivered'],
  active: ['b-active', 'Active development'],
  plan: ['b-plan', 'Planning & design']
};

const PROJECTS = [
  {
    title: 'ElectroHire', featured: true, status: 'done',
    type: 'Service marketplace platform',
    role: 'Dev 2, Senior Backend Developer',
    tech: ['Django REST Framework'],
    desc: 'A Bangladesh-focused service marketplace that connects customers with electrical and trade service providers.',
    highlight: '205 tests passed across the project test suite.',
    features: ['OTP verification', 'Provider profiles', 'Bookings', 'Ratings and reports', 'Admin dashboard API'],
    contributions: ['OTP verification system', 'Provider profile management', 'Admin dashboard API', 'Contact management system', 'Rating system', 'Reports management', 'Booking system', 'Password reset functionality', 'Backend API integration']
  },
  {
    title: 'PredictRx', status: 'done',
    type: 'Healthcare / drug interaction platform',
    role: 'Backend Developer (B)',
    period: 'November 7–20, 2026',
    tech: ['Celery', 'OCR', 'Private storage', 'REST API'],
    desc: 'A healthcare-focused application for drug information and drug interaction analysis.',
    features: ['Drug and interaction data API', 'Background analysis jobs', 'Scan upload with OCR', 'Private file storage', 'Consent banner'],
    contributions: ['Drug and interaction read API', 'Analysis start endpoint', 'Celery integration', 'Scan upload functionality', 'OCR background processing', 'Private storage implementation', 'Admin interface reskin', 'Consent banner logic']
  },
  {
    title: 'ElectriFix', status: 'plan',
    type: 'Electrical service marketplace',
    role: 'Project development / technical contributor',
    tech: [],
    desc: 'A web-first service marketplace designed to connect customers with electrical and trade service providers. It is in MVP planning, so the features below are planned, not built.',
    stage: 'ERD design and wireframing',
    planned: ['Dual-role account system', 'Provider onboarding', 'SMS notification integration (Twilio or SSL Wireless)', 'Dispute resolution', 'Gated rating system'],
    phase2: ['Native mobile application', 'Payment gateway', 'Real-time chat', 'GPS tracking'],
    contributions: ['ERD design', 'Wireframing']
  },
  {
    title: 'UNI-Schooler', status: 'active',
    type: 'University student networking & collaboration platform',
    role: 'Senior Developer',
    tech: [],
    desc: 'A platform designed to help university students connect, communicate, and collaborate academically. Development is in progress with a 15-day delivery and deployment target.',
    planned: ['Student networking', 'Academic collaboration', 'Student community features', 'AI-powered support chatbot', 'Platform development', 'Deployment'],
    contributions: []
  }
];

/* ---------- Helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html) n.innerHTML = html; return n; };
const list = (arr, cls = '') => arr.map(i => `<li class="${cls}">${i}</li>`).join('');

/* ---------- Skills ---------- */
const skillGrid = $('#skillGrid');
Object.entries(SKILLS).forEach(([name, tags]) => {
  skillGrid.append(el('div', 'skill-card reveal',
    `<h3>${name}</h3><div class="tags">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`));
});

/* ---------- Projects ---------- */
const projGrid = $('#projGrid');
PROJECTS.forEach((p, i) => {
  const [cls, label] = STATUS[p.status];
  const card = el('article', 'proj reveal' + (p.featured ? ' featured' : ''), `
    <div class="proj-top">
      <div><h3>${p.title}</h3><p class="type">${p.type}</p></div>
      <span class="badge ${cls}">${label}</span>
    </div>
    <p class="role-line"><b>My role:</b> ${p.role}${p.period ? ' &middot; ' + p.period : ''}</p>
    <p class="desc">${p.desc}</p>
    ${p.highlight ? `<p class="hl">${p.highlight}</p>` : ''}
    ${p.tech.length ? `<div class="tags">${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
    <div class="proj-actions">
      <button class="btn primary" data-i="${i}">View details</button>
      <span class="btn ghost" aria-disabled="true">GitHub: coming soon</span>
      <span class="btn ghost" aria-disabled="true">Live demo: coming soon</span>
    </div>`);
  projGrid.append(card);
});

/* ---------- Modal ---------- */
const modal = $('#modal'), body = $('#modalBody');
function openProject(i) {
  const p = PROJECTS[i], [cls, label] = STATUS[p.status];
  body.innerHTML = `
    <button class="close" aria-label="Close details">&times;</button>
    <span class="badge ${cls}">${label}</span>
    <h3 id="mTitle">${p.title}</h3>
    <p class="muted">${p.type}</p>
    <p style="margin-top:1rem">${p.desc}</p>
    <h4>My role</h4><p>${p.role}${p.period ? ' &middot; ' + p.period : ''}</p>
    ${p.stage ? `<h4>Current stage</h4><p>${p.stage}</p>` : ''}
    ${p.highlight ? `<h4>Achievement</h4><p>${p.highlight}</p>` : ''}
    ${p.tech.length ? `<h4>Technologies</h4><div class="tags">${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
    ${p.features ? `<h4>Key features</h4><ul>${list(p.features)}</ul>` : ''}
    ${p.contributions.length ? `<h4>${p.status === 'plan' ? 'Work completed so far' : 'My contributions'}</h4><ul>${list(p.contributions)}</ul>` : ''}
    ${p.planned ? `<h4>${p.status === 'plan' ? 'Planned features (not built yet)' : 'Project goals (in progress)'}</h4><ul>${list(p.planned, 'planned')}</ul>` : ''}
    ${p.phase2 ? `<h4>Phase 2 roadmap</h4><ul>${list(p.phase2, 'planned')}</ul>` : ''}`;
  modal.showModal();
  $('.close', body).focus();
}
projGrid.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b) openProject(+b.dataset.i); });
modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.close')) modal.close(); });

/* ---------- Mobile nav ---------- */
const burger = $('#burger'), menu = $('#menu');
function setMenu(open) { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); }
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ---------- Active section + reveal ---------- */
const links = [...menu.querySelectorAll('a')];
const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  const rev = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); rev.unobserve(en.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(n => rev.observe(n));
} else {
  document.querySelectorAll('.reveal').forEach(n => n.classList.add('in'));
}

/* ---------- Contact form (validation + mailto) ---------- */
const form = $('#form'), note = $('#formNote');
const rules = {
  name: v => v.trim().length >= 2 || 'Enter your name.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
  subject: v => v.trim().length >= 3 || 'Enter a subject.',
  message: v => v.trim().length >= 10 || 'Write at least 10 characters.'
};
function check(field) {
  const res = rules[field.name](field.value), lab = field.closest('label');
  lab.classList.toggle('bad', res !== true);
  $('.err', lab).textContent = res === true ? '' : res;
  return res === true;
}
form.querySelectorAll('input,textarea').forEach(f => f.addEventListener('blur', () => check(f)));
form.addEventListener('submit', e => {
  e.preventDefault();
  const fields = [...form.querySelectorAll('input,textarea')];
  const ok = fields.map(check).every(Boolean);
  if (!ok) { fields.find(f => f.closest('label').classList.contains('bad')).focus(); note.textContent = 'Fix the highlighted fields and try again.'; return; }
  const d = Object.fromEntries(new FormData(form));
  const bodyText = `${d.message}\n\nFrom: ${d.name} (${d.email})`;
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(bodyText)}`;
  note.textContent = 'Your email app should open with the message ready. Press send there to deliver it.';
});

$('#year').textContent = new Date().getFullYear();