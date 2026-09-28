// Navbar burger toggle + BibTeX copy button + play demo videos only when visible.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.navbar-burger').forEach((b) => {
    b.addEventListener('click', () => {
      const target = document.getElementById(b.dataset.target);
      b.classList.toggle('is-active');
      if (target) target.classList.toggle('is-active');
    });
  });
  document.querySelectorAll('#navbarMain .navbar-item').forEach((a) => {
    a.addEventListener('click', () => {
      document.querySelectorAll('.navbar-burger, #navbarMain').forEach((el) => el.classList.remove('is-active'));
    });
  });

  const copyBtn = document.getElementById('copy-citation-btn');
  const citationText = document.getElementById('citation-bibtex');
  if (copyBtn && citationText) {
    copyBtn.addEventListener('click', async () => {
      const original = copyBtn.textContent;
      try {
        await navigator.clipboard.writeText(citationText.textContent);
        copyBtn.textContent = 'Copied';
      } catch (_) {
        copyBtn.textContent = 'Copy failed';
      }
      setTimeout(() => { copyBtn.textContent = original; }, 1200);
    });
  }

  // Autoplay (muted, looped) videos only while they are on screen.
  const vids = document.querySelectorAll('video[data-autoplay]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.play().catch(() => {}); } else { e.target.pause(); }
      });
    }, { threshold: 0.25 });
    vids.forEach((v) => io.observe(v));
  } else {
    vids.forEach((v) => v.play().catch(() => {}));
  }
});

// Tabbed players: each .demo-tabs group swaps the source of the player named in data-player.
// Buttons may carry wide/tall variants; phones get the portrait (tall) video.
document.addEventListener('DOMContentLoaded', () => {
  const narrow = window.matchMedia('(max-width: 768px)');
  document.querySelectorAll('.demo-tabs').forEach((group) => {
    const player = document.getElementById(group.dataset.player);
    if (!player) return;
    const tabs = group.querySelectorAll('.button');
    const show = (btn, play) => {
      const tall = narrow.matches && btn.dataset.tall;
      const src = tall ? btn.dataset.tall : (btn.dataset.wide || btn.dataset.src);
      const poster = tall ? btn.dataset.posterTall : (btn.dataset.posterWide || btn.dataset.poster);
      const source = player.querySelector('source');
      if (source.getAttribute('src') === src) return;
      player.poster = poster;
      source.src = src;
      player.load();
      if (play) player.play().catch(() => {});
    };
    const caption = group.dataset.captionTarget ? document.getElementById(group.dataset.captionTarget) : null;
    tabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabs.forEach((b) => b.classList.remove('is-selected', 'is-link'));
        btn.classList.add('is-selected', 'is-link');
        show(btn, true);
        if (caption && btn.dataset.caption) caption.innerHTML = btn.dataset.caption;
      });
    });
    const current = () => group.querySelector('.button.is-selected') || tabs[0];
    show(current(), false);
    narrow.addEventListener('change', () => show(current(), !player.paused));
  });

  // Scroll cue only on tables that actually overflow.
  const markOverflow = () => {
    document.querySelectorAll('.table-wrap').forEach((w) => {
      w.classList.toggle('overflows', w.scrollWidth > w.clientWidth + 2);
    });
  };
  markOverflow();
  window.addEventListener('resize', markOverflow);
});
