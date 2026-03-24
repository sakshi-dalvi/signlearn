// ============================================================
// SignLearn — Shared JavaScript
// ============================================================

// ── IMAGE FORMAT FALLBACK ──
// Tries .png → .jpg → .jpeg → .webp in order until one loads.
// Usage: tryImage('images/alphabet/a', imgElement, placeholderElement)
window.tryImage = function(basePath, img, placeholder) {
  var exts = ['png', 'jpg', 'jpeg', 'webp'];
  var i = 0;

  function next() {
    if (i >= exts.length) {
      // Nothing worked — show the coloured placeholder
      img.style.display = 'none';
      if (placeholder) placeholder.style.display = 'flex';
      return;
    }
    img.src = basePath + '.' + exts[i++];
  }

  img.onerror = next;
  img.onload  = function() {
    img.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
  };

  next(); // start trying
};

// ── AUTO-INIT ALL img[data-base] ON ANY PAGE ──
// Any <img data-base="images/alphabet/a"> will be auto-loaded.
// The placeholder is always the very next sibling element.
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('img[data-base]').forEach(function(img) {
    window.tryImage(img.getAttribute('data-base'), img, img.nextElementSibling);
  });
});

// ── ACTIVE NAV LINK ──
(function () {
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
  var ham   = document.querySelector('.nav-hamburger');
  var links = document.querySelector('.nav-links');
  if (ham && links) {
    ham.addEventListener('click', function() { links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() { links.classList.remove('open'); });
    });
  }
})();

// ── SCROLL FADE-IN ──
(function () {
  var els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(function(el) { observer.observe(el); });
})();

// ── TABS ──
function initTabs() {
  document.querySelectorAll('.tabs').forEach(function(tabGroup) {
    tabGroup.querySelectorAll('.tab-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var target = btn.dataset.tab;
        tabGroup.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        document.querySelectorAll('.tab-panel').forEach(function(panel) {
          panel.classList.toggle('active', panel.dataset.panel === target);
        });
      });
    });
  });
}
initTabs();
