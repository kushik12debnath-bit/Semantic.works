// === UNIFIED INTERACTIVE ANIMATIONS + BUSINESS CONVERSIONS ===

document.addEventListener('DOMContentLoaded', function() {

  // --- LOADING SCREEN ---
  var ls = document.createElement('div');
  ls.className = 'loading-screen';
  ls.innerHTML = '<div class="loading-logo">Semantic Reworks</div><div class="loading-bar"></div>';
  document.body.prepend(ls);
  document.body.classList.add('loading');
  setTimeout(function() {
    ls.classList.add('hidden');
    document.body.classList.remove('loading');
    setTimeout(function() { ls.remove(); }, 600);
  }, 2200);

  // --- CUSTOM CURSOR ---
  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  var ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  var mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();
  document.querySelectorAll('a, button, .tier-card, .port-card, .srv, input, textarea, select').forEach(function(el) {
    el.addEventListener('mouseenter', function() { ring.classList.add('hover'); });
    el.addEventListener('mouseleave', function() { ring.classList.remove('hover'); });
  });

  // --- MAGNETIC BUTTONS ---
  document.querySelectorAll('.btn-primary, .c-btn, .nav-links a').forEach(function(el) {
    el.classList.add('magnetic');
    el.addEventListener('mousemove', function(e) {
      var r = el.getBoundingClientRect();
      el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.3) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.3) + 'px)';
    });
    el.addEventListener('mouseleave', function() { el.style.transform = ''; });
  });

  // --- PARALLAX TILT ON CARDS ---
  document.querySelectorAll('.tier-card, .port-card, .srv, .belief').forEach(function(card) {
    card.classList.add('tilt-card');
    card.addEventListener('mousemove', function(e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'perspective(800px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) scale(1.02)';
      card.style.setProperty('--mouse-x', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--mouse-y', ((e.clientY - r.top) / r.height * 100) + '%');
    });
    card.addEventListener('mouseleave', function() { card.style.transform = ''; });
  });

  // --- TYPING EFFECT ON HERO SUBTITLE ---
  var hs = document.querySelector('.hero-sub');
  if (hs) {
    var ot = hs.textContent;
    hs.textContent = '';
    var tc = document.createElement('span');
    tc.className = 'typing-cursor';
    hs.appendChild(tc);
    var idx = 0;
    setTimeout(function() {
      var ti = setInterval(function() {
        if (idx < ot.length) {
          hs.insertBefore(document.createTextNode(ot[idx]), tc);
          idx++;
        } else {
          clearInterval(ti);
          setTimeout(function() { tc.remove(); }, 2000);
        }
      }, 20);
    }, 2500);
  }

  // --- SCROLL PROGRESS BAR ---
  var pb = document.createElement('div');
  pb.className = 'scroll-progress';
  document.body.appendChild(pb);
  window.addEventListener('scroll', function() {
    var dh = document.documentElement.scrollHeight - window.innerHeight;
    pb.style.width = (dh > 0 ? (window.scrollY / dh) * 100 : 0) + '%';
  });

  // --- STAGGERED CARD REVEALS ---
  document.querySelectorAll('.port-grid, .srv-grid, .tier-grid, .belief-grid').forEach(function(g) {
    g.classList.add('stagger-reveal');
  });
  var stagObs = new IntersectionObserver(function(es) {
    es.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.stagger-reveal').forEach(function(el) { stagObs.observe(el); });

  // --- FLOATING SOCIAL PROOF NOTIFICATION ---
  var nf = document.createElement('div');
  nf.className = 'float-notification';
  nf.innerHTML = '<button class="notif-close">&times;</button><div class="notif-icon">\u{1F680}</div><div class="notif-title">Recent Launch</div><div class="notif-text">We just deployed a real-time IoT dashboard for a manufacturing client in Kolkata.</div>';
  document.body.appendChild(nf);
  setTimeout(function() { nf.classList.add('show'); }, 8000);
  nf.querySelector('.notif-close').addEventListener('click', function() { nf.classList.remove('show'); });
  nf.addEventListener('click', function(e) {
    if (e.target.classList.contains('notif-close')) return;
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    nf.classList.remove('show');
  });

  // --- MOBILE STICKY CTA ---
  var sc = document.createElement('div');
  sc.className = 'mobile-sticky-cta';
  sc.innerHTML = '<span class="cta-text">Ready to build?</span><button class="cta-btn">Get Quote</button>';
  document.body.appendChild(sc);
  sc.querySelector('.cta-btn').addEventListener('click', function() {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  });
  window.addEventListener('scroll', function() {
    sc.classList.toggle('visible', window.scrollY > 400);
  });

  // --- SECTION REVEAL ---
  var secObs = new IntersectionObserver(function(es) {
    es.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('section').forEach(function(s) {
    s.classList.add('section-reveal');
    secObs.observe(s);
  });

  // --- BELIEF CARD NUMBERS ---
  document.querySelectorAll('.belief').forEach(function(b, i) {
    var n = document.createElement('div');
    n.className = 'belief-num';
    n.textContent = '0' + (i + 1);
    b.style.position = 'relative';
    b.appendChild(n);
  });

  // --- SECTION TITLE LINE ANIMATION ---
  var titleObs = new IntersectionObserver(function(es) {
    es.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: 0.5 });
  document.querySelectorAll('.section-title').forEach(function(t) { titleObs.observe(t); });

  // --- REVEAL + REVEAL-GRID OBSERVER ---
  var defaultObs = new IntersectionObserver(function(es) {
    es.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(function(el) { defaultObs.observe(el); });
  document.querySelectorAll('.reveal-grid').forEach(function(el) { defaultObs.observe(el); });

  // --- BUTTON RIPPLE ---
  var rs = document.createElement('style');
  rs.textContent = '@keyframes rippleExpand{to{width:300px;height:300px;opacity:0}}';
  document.head.appendChild(rs);
  document.querySelectorAll('.btn-primary, .c-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var r = this.getBoundingClientRect();
      var rip = document.createElement('span');
      rip.style.cssText = 'position:absolute;top:' + (e.clientY - r.top) + 'px;left:' + (e.clientX - r.left) + 'px;width:0;height:0;border-radius:50%;background:rgba(255,255,255,0.2);transform:translate(-50%,-50%);animation:rippleExpand 0.6s ease-out forwards;pointer-events:none;z-index:1';
      this.appendChild(rip);
      setTimeout(function() { rip.remove(); }, 600);
    });
  });

  // --- CTA SCROLL FROM HERO ---
  document.querySelectorAll('.hero-actions a').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var t = document.querySelector(btn.getAttribute('href') || '#contact');
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- TIER CARD SHIMMER ON SCROLL ---
  var tierObs = new IntersectionObserver(function(es) {
    es.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.style.animation = 'glowPulse 3s ease-in-out infinite';
        e.target.style.animationDelay = (Math.random() * 2) + 's';
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.tier-card').forEach(function(c) { tierObs.observe(c); });

});
