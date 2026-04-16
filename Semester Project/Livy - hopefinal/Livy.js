/* ============================================
   LivyLamp — Production JavaScript (Fixed)
   ============================================ */

/* ---- Data ---- */
const GALLERY_ITEMS = [
  { name: "Aurelian Minimalist", collection: "Floor Collection", rating: 4.8, customers: 412, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx00c4KBRZAN1G2MRtQg-ynrUz1Bzl9Y_vdsUx-YT-z-YX_fxI9Ke2SeKutEPX7i-ydAXWnuw7gel3B2Y9JQMchA2jBmDs9pK4u8IKWTU90ODhwcwn60LPL5CZveShh11tU0DZrgu4VEhanqTfkNSQ-1NqlFWeMOVR35NN7uMOxLeRxJF-t5E4N_USAchHrdLp9msAmbFFMPWYi2jpYYHvYfx-cYxR_mpwMHaX2H-zqnI6XU-PnWSQOY_Gn1kbrCzyEcehZoRn1WWZ" },
  { name: "Obsidian Pendant", collection: "Ceiling Collection", rating: 4.5, customers: 395, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzaErm_e79ESVwtIB0Z0qSZdV4TaUwHoES1uXnJI_HMV-oYk1RMcyKoTgri1ILzQUcazGjF51oNPCnwO3KnKstGZfmlCr6t2j3Cgrc01K_veOb6W5vL2jGjuwLn5-KkP2DpXJ7yAv18eBJhNwt5cuZs--K4oqhu0-4t0iYETQS8H9peojSpcHMPuTNFmRruvNUxiBgKmCNmgffH420P5FSKtbJ5F5JnZuMCyqBfdN-Rls49N5lla7O-41HckVKzr1SDM8fCgYrW-If" },
  { name: "Carrara Task Lamp", collection: "Desk Collection", rating: 4.9, customers: 288, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf4jFZsMOQP-sl0Jxhn3KcWyHNTEMtNUESfp5W3oEiS3YYsKdH29gFYbsd1xIc0M2K9SV883JvvzfF8llshKgRHJEB9Pig7F82VLu6FBCIr910p7d_MNJ7ZWnOYBE-i99yZYai37gCm8OwBLgtPZRKcs02z-5HCC4K6Hlrvtg07JNRM0N3eJVbvA1ERP_PZFIeJgzjv0BFe755rsaWcBbCqtWJrbJcML2ImdW4Fn4kZkEizr28OG7-SeYi2ZnjkoeEWfF1cPEAMNiA" },
  { name: "Nebula Ambient", collection: "Table Collection", rating: 4.7, customers: 560, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYSatvIP2DVeZJSrJi4hOa-n1ptj1cyj5DMBXqLYTIZ9C2tDGKPas8NyypCoKrqk66qAImEPgPmZ-700OK5PQISsQvyabOvGkCD57YjeCFd2RxUJpqviWVWTklux_g6x92hN3crCs8nsU_caBASjsFS6nS7KNa64VsQGbhFSmZX8kOLxwpzT3pUkMA41i5aEhrbcndSAzwWuf1KU3ScFbwIYVthRecU4eDFJqceag4EFpl0NWsPmlH5rboe4Fr94OkOp-XlfJTo-DT" },
];

const TESTIMONIALS = [
  { name: "Sarah Jenkins", role: "Interior Designer", quote: "The personalized recommendation was spot on. The lamp doesn't just provide light; it completely changed the mood of my reading nook.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9UqCImwutkb6ijG3VIBrq6f_GQrYVxQJockKbo_D0OTgzc6S6DIvIKZ8ZkDhFhRgDzE3ZWVr36XPMM6jV-mfESYeIp6fLSzRX-6KlN4zjBq5T-uJEBmSB6R--Mz8qqSlZt4U6fGAuLxDoso-nXq4uS5WIkprJ0I1uq2OG0GikVFDjsne6C3f7vpu-UgjEZ009JLX64S4zajoZjCg6wN2xIKoylDlea9xARJBFMxgL1YgQwmLfeNz-cVBlAXfqB_hMPzJy1P53Pt1u" },
  { name: "David Chen", role: "Home Owner", quote: "I was skeptical about AI recommendations for decor, but LivyLamp proved me wrong. The quality and craftsmanship are exceptional.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeu4D_wQYHW_7lHbvIVo-lhqmQyAz66SZMeUE9hsg2O3SCiG_GAkM5zwfQXBtRQaNLr42DzzAkkzuBJPkSa0izV-upo7IcGiZNh7UYGBDVe8IjVhDsBvw3GIuc9aiQT2esUH9HmrY6FfKsu2oHrbD35EMC3WDd3esn70As4zXD4yjagtDb5InddSKBWfkus8EsjNltWM3FF6p2hrDn6B_pf01CuwyAyOtRmMt8ElfnDWbDdqYmS3X6l2QqnlTXCL-nn9E8xMyy6l_R" },
  { name: "Elena Rodriguez", role: "Architect", quote: "Modern, elegant, and efficient. The customer service throughout the selection process was professional and very helpful.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnjiRWJvtx7R5TaYvbCE4sXOpN9F9Uo25TlGebbtPzXt3oiDWWunxXiRUHB8m_1bjfzpvou33Xha_vyas_gkYQ36f2hhx5KNxaNRlOlUzsh6Sd5AhysLHl26Yp4Logp7kWgO-thD09TesnnFqg7pcwIz9mjlgTvJzgsda1GhxPgj2YD2_liAg_PRAxtFP84AHlQ_eAymtC6XHtTd5Vms0bXwD9Yrb-oIuTl7KYy75z1VHIYymmVwVSDGr2kq7f0VhMiRX5MHqjUISy" },
];

const PRODUCTS = [
  { id: 1, name: "Nordic Sentinel Floor", price: 495, rating: 4.8, reviews: 124, type: "Floor Lamp", image: "https://images.unsplash.com/photo-1540609651537-df982279815a?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Søren Table Glow", price: 220, rating: 4.9, reviews: 88, type: "Table Lamp", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Onyx Pillar Pendant", price: 640, rating: 4.7, reviews: 45, type: "Pendant Light", image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Ethereal Globe", price: 310, rating: 5.0, reviews: 32, type: "Pendant Light", image: "https://images.unsplash.com/photo-1536376074432-cd4258ae71ac?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Minimalist Arc Floor", price: 550, rating: 4.6, reviews: 210, type: "Floor Lamp", image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Bauhaus Table Geometry", price: 280, rating: 4.8, reviews: 96, type: "Table Lamp", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800" },
  { id: 7, name: "Zenith Kitchen Pendant", price: 890, rating: 4.9, reviews: 38, type: "Pendant Light", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800" },
  { id: 8, name: "Articulated Steel Task", price: 415, rating: 4.5, reviews: 112, type: "Table Lamp", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800" },
];

/* ---- Cart State ---- */
let cart = [];

/* ---- Page Navigation ---- */
function showPage(page) {
  document.getElementById('page-home').style.display = page === 'home' ? '' : 'none';
  document.getElementById('page-booking').style.display = page === 'booking' ? '' : 'none';
  document.getElementById('page-collections').style.display = page === 'collections' ? '' : 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (page === 'collections') renderProducts('all');
}

/* ---- Mobile Menu ---- */
let mobileOpen = false;
function toggleMobileMenu() {
  mobileOpen = !mobileOpen;
  document.getElementById('mobile-nav').style.display = mobileOpen ? 'block' : 'none';
  document.getElementById('mobile-menu-icon').textContent = mobileOpen ? 'close' : 'menu';
}
function closeMobileMenu() {
  mobileOpen = false;
  document.getElementById('mobile-nav').style.display = 'none';
  document.getElementById('mobile-menu-icon').textContent = 'menu';
}

/* ---- Render Gallery (uses CSS classes: gallery-card, gallery-img-wrap, gallery-overlay, gallery-quick-view, gallery-name, gallery-collection, gallery-stars, btn-quote) ---- */
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = GALLERY_ITEMS.map(item => {
    const fullStars = Math.floor(item.rating);
    const stars = Array.from({ length: 5 }, (_, i) =>
      i < fullStars
        ? '<span class="material-symbols-outlined filled-icon">star</span>'
        : '<span class="material-symbols-outlined" style="font-size:0.75rem;color:var(--muted)">star</span>'
    ).join('');
    return `
    <article class="gallery-card">
      <div class="gallery-img-wrap">
        <img src="${item.image}" alt="${item.name} — ${item.collection}" loading="lazy" />
        <div class="gallery-overlay"></div>
        <button class="gallery-quick-view" onclick="showPage('collections')">Quick View</button>
      </div>
      <h4 class="gallery-name">${item.name}</h4>
      <p class="gallery-collection">${item.collection}</p>
      <div class="gallery-stars">${stars} <span class="count">${item.rating} (${item.customers})</span></div>
      <button class="btn-quote" onclick="showPage('collections')">View Collection</button>
    </article>`;
  }).join('');
}

/* ---- Render Testimonials (uses CSS classes: testimonial-card, testimonial-stars, testimonial-author, testimonial-avatar, testimonial-name, testimonial-role) ---- */
function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  grid.innerHTML = TESTIMONIALS.map(t => {
    const stars = Array.from({ length: 5 }, () =>
      '<span class="material-symbols-outlined filled-icon">star</span>'
    ).join('');
    return `
    <article class="testimonial-card">
      <div class="testimonial-stars">${stars}</div>
      <blockquote>"${t.quote}"</blockquote>
      <div class="testimonial-author">
        <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar" loading="lazy" />
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    </article>`;
  }).join('');
}

/* ---- Render Products (uses CSS classes: product-card, product-img-wrap, product-info, product-type-tag, product-price-row, product-price, product-rating) ---- */
function renderProducts(filter) {
  const items = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.type === filter);
  const grid = document.getElementById('products-grid');
  grid.innerHTML = items.map(p => `
    <article class="product-card">
      <div class="product-img-wrap"><img src="${p.image}" alt="${p.name}" loading="lazy" /></div>
      <div class="product-info">
        <h4>${p.name}</h4>
        <p class="product-type-tag">${p.type}</p>
        <div class="product-price-row">
          <span class="product-price">$${p.price}</span>
          <span class="product-rating"><span class="material-symbols-outlined filled-icon">star</span> ${p.rating} (${p.reviews})</span>
        </div>
        <button class="btn-primary btn-lg" style="width:100%" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </article>
  `).join('');
}

function filterProducts(type, btn) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(type);
}

/* ---- Cart ---- */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty++; } else { cart.push({ ...product, qty: 1 }); }
  updateCartUI();
  openCartModal();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateCartUI();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(productId); return; }
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  badge.style.display = totalItems > 0 ? 'flex' : 'none';
  badge.textContent = totalItems;

  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');

  if (cart.length === 0) {
    itemsEl.innerHTML = '';
    emptyEl.style.display = '';
    footerEl.style.display = 'none';
    return;
  }
  emptyEl.style.display = 'none';
  footerEl.style.display = '';

  itemsEl.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img src="${i.image}" alt="${i.name}" />
      <div class="cart-item-info">
        <h5>${i.name}</h5>
        <span class="cart-item-price">$${i.price}</span>
      </div>
      <div class="cart-item-qty">
        <button onclick="changeQty(${i.id},-1)">−</button>
        <span>${i.qty}</span>
        <button onclick="changeQty(${i.id},1)">+</button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i.id})" aria-label="Remove"><span class="material-symbols-outlined">delete</span></button>
    </div>
  `).join('');

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cart-total-price').textContent = '$' + total.toLocaleString();
}

function openCartModal() { document.getElementById('cart-overlay').style.display = 'flex'; updateCartUI(); }
function closeCartModal() { document.getElementById('cart-overlay').style.display = 'none'; }

/* ---- Auth Modal ---- */
function openAuthModal() { document.getElementById('auth-overlay').style.display = 'flex'; switchAuthTab('login'); }
function closeAuthModal() { document.getElementById('auth-overlay').style.display = 'none'; clearAuthErrors(); }

function switchAuthTab(tab) {
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
  document.getElementById('login-form').style.display = tab === 'login' ? '' : 'none';
  document.getElementById('signup-form').style.display = tab === 'signup' ? '' : 'none';
  clearAuthErrors();
}

function clearAuthErrors() {
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}

/* ---- Validation Helpers ---- */
function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function showError(id, msg) { document.getElementById(id).textContent = msg; }

function handleLogin(e) {
  e.preventDefault();
  clearAuthErrors();
  let valid = true;
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  if (!email || !isValidEmail(email)) { showError('err-login-email', 'Valid email required'); valid = false; }
  if (!pass || pass.length < 6) { showError('err-login-pass', 'Min 6 characters'); valid = false; }
  if (!valid) return;
  alert('Login successful! (demo)');
  closeAuthModal();
}

function handleSignup(e) {
  e.preventDefault();
  clearAuthErrors();
  let valid = true;
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const pass = document.getElementById('signup-pass').value;
  const pass2 = document.getElementById('signup-pass2').value;
  if (!name) { showError('err-signup-name', 'Name required'); valid = false; }
  if (!email || !isValidEmail(email)) { showError('err-signup-email', 'Valid email required'); valid = false; }
  if (!pass || pass.length < 6) { showError('err-signup-pass', 'Min 6 characters'); valid = false; }
  if (pass !== pass2) { showError('err-signup-pass2', 'Passwords must match'); valid = false; }
  if (!valid) return;
  alert('Account created! (demo)');
  closeAuthModal();
}

/* ---- Booking Form ---- */
function handleBooking(e) {
  e.preventDefault();
  clearAuthErrors();
  let valid = true;
  const name = document.getElementById('book-name').value.trim();
  const email = document.getElementById('book-email').value.trim();
  const phone = document.getElementById('book-phone').value.trim();
  const date = document.getElementById('book-date').value;
  const time = document.getElementById('book-time').value;

  if (!name) { showError('err-book-name', 'Name required'); valid = false; }
  if (!email || !isValidEmail(email)) { showError('err-book-email', 'Valid email required'); valid = false; }
  if (!phone || phone.length < 7) { showError('err-book-phone', 'Valid phone required'); valid = false; }
  if (!date) { showError('err-book-date', 'Date required'); valid = false; }
  if (!time) { showError('err-book-time', 'Time required'); valid = false; }
  if (!valid) return;

  document.getElementById('booking-form-container').style.display = 'none';
  document.getElementById('booking-confirm').style.display = '';
  const formatted = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('confirm-details').textContent =
    `Thank you, ${name}! Your showroom visit is booked for ${formatted} at ${time}. A confirmation has been sent to ${email}.`;
}

/* ---- Scroll Reveal ---- */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ---- Escape key closes modals ---- */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeAuthModal(); closeCartModal(); }
});

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', function() {
  renderGallery();
  renderTestimonials();
  initReveal();
  const dateInput = document.getElementById('book-date');
  if (dateInput) { dateInput.min = new Date().toISOString().split('T')[0]; }
});
