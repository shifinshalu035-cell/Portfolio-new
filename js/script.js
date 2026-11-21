/* ===== SCROLL REVEAL ===== */
const items = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
items.forEach((el) => observer.observe(el));

/* ===== LIGHTBOX ===== */
const gItems = document.querySelectorAll('.g-item');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
let current = 0;

function showImage(index) {
  current = (index + gItems.length) % gItems.length;
  const item = gItems[current];
  lbImg.src = item.querySelector('img').src;
  lbCaption.textContent = item.querySelector('figcaption').innerText.replace('\n', ' · ');
}

gItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    showImage(i);
    lightbox.classList.add('open');
  });
});

document.getElementById('lbClose').onclick = () => lightbox.classList.remove('open');
document.getElementById('lbPrev').onclick = () => showImage(current - 1);
document.getElementById('lbNext').onclick = () => showImage(current + 1);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('open');
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') lightbox.classList.remove('open');
  if (e.key === 'ArrowLeft') showImage(current - 1);
  if (e.key === 'ArrowRight') showImage(current + 1);
});