'use strict';
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  let language = 'ka';
  try { if (localStorage.getItem('aurea-language') === 'en') language = 'en'; } catch (_) {}
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('navigation');
  const booking = document.getElementById('booking-dialog');
  const info = document.getElementById('info-dialog');
  const form = document.getElementById('booking-form');
  const success = document.getElementById('form-success');
  const error = document.getElementById('form-error');
  let opener = null;
  let errorKey = '';
  const messages = {
    name: { ka: 'გთხოვთ, მიუთითოთ სახელი.', en: 'Please enter your name.' },
    phone: { ka: 'გთხოვთ, მიუთითოთ ტელეფონი (7–15 ციფრი).', en: 'Please enter a phone number (7–15 digits).' },
    procedure: { ka: 'გთხოვთ, აირჩიოთ მიმართულება.', en: 'Please choose a care direction.' }
  };
  const translate = (lang, persist = true) => {
    language = lang;
    root.lang = lang;
    document.querySelectorAll('[data-ka][data-en]').forEach(el => { el.textContent = el.dataset[lang]; });
    document.querySelectorAll('[data-attr]').forEach(el => { el.setAttribute(el.dataset.attr, el.dataset[lang === 'ka' ? 'attrKa' : 'attrEn']); });
    document.querySelectorAll('[data-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.lang === lang)));
    document.title = lang === 'ka' ? 'AUREA AESTHETICS — ესთეტიკის დემო | SimpleWeb.ge' : 'AUREA AESTHETICS — Aesthetic clinic demo | SimpleWeb.ge';
    document.querySelector('meta[name="description"]').content = lang === 'ka' ? 'AUREA AESTHETICS — ესთეტიკური კლინიკის გამოგონილი, ორენოვანი დემო SimpleWeb.ge-ს პორტფოლიოსთვის.' : 'AUREA AESTHETICS — a fictional bilingual aesthetic clinic demo for the SimpleWeb.ge portfolio.';
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = document.querySelector('meta[name="description"]').content;
    document.querySelector('meta[property="og:locale"]').content = lang === 'ka' ? 'ka_GE' : 'en_US';
    if (errorKey) error.textContent = messages[errorKey][lang];
    if (persist) { try { localStorage.setItem('aurea-language', lang); } catch (_) {} }
  };
  translate(language, false);
  document.querySelectorAll('[data-lang]').forEach(el => el.addEventListener('click', () => translate(el.dataset.lang)));
  const closeMenu = (restore = false) => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); if (restore) menu.focus(); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); });
  nav.querySelectorAll('a').forEach(el => el.addEventListener('click', () => closeMenu()));
  document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu(true); });
  window.matchMedia('(min-width:901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  const resetForm = () => { form.reset(); error.textContent = ''; errorKey = ''; form.hidden = false; success.hidden = true; form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid')); };
  const openDialog = (dialog, trigger) => { opener = trigger; closeMenu(); dialog.showModal(); document.body.style.overflow = 'hidden'; };
  document.querySelectorAll('[data-book]').forEach(el => el.addEventListener('click', () => { resetForm(); form.elements.procedure.value = el.dataset.book || ''; openDialog(booking, el); }));
  document.querySelectorAll('[data-info]').forEach(el => el.addEventListener('click', () => openDialog(info, el)));
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelectorAll('.close-dialog').forEach(el => el.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
    dialog.addEventListener('close', () => { document.body.style.overflow = ''; if (dialog === booking) resetForm(); if (opener) opener.focus({ preventScroll: true }); });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    error.textContent = ''; errorKey = '';
    form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
    const name = form.elements.name, phone = form.elements.phone, procedure = form.elements.procedure;
    const digits = phone.value.replace(/\D/g, '');
    if (!name.value.trim()) errorKey = 'name';
    else if (!/^[+\d\s().-]+$/.test(phone.value.trim()) || digits.length < 7 || digits.length > 15) errorKey = 'phone';
    else if (!procedure.value) errorKey = 'procedure';
    if (errorKey) { const field = form.elements[errorKey]; field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-describedby', 'form-error'); error.textContent = messages[errorKey][language]; field.focus(); return; }
    form.reset(); form.hidden = true; success.hidden = false; success.focus();
  });
  document.querySelectorAll('.faq-item').forEach(item => item.addEventListener('toggle', () => { if (item.open) document.querySelectorAll('.faq-item').forEach(other => { if (other !== item) other.open = false; }); }));
  const slider = document.getElementById('compare-slider');
  slider.addEventListener('input', () => { slider.closest('.comparison').style.setProperty('--position', slider.value + '%'); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
})();
