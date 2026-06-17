/**
 * Premium stock imagery fallbacks (Unsplash).
 * Uses local images when present; otherwise loads curated photos.
 */
(function () {
  const U = (id, w, h) =>
    `https://images.unsplash.com/photo-${id}?w=${w || 800}&h=${h || 800}&fit=crop&auto=format&q=85`;

  const PREMIUM_IMAGES = {
    'hero-poster.jpg': U('1563805042-7684c019e6cb', 1920, 1080),
    'about-store.jpg': U('1554118811-1e0d2994e8b3', 900, 700),
    'gallery-1.jpg': U('1497035627-7b843c997ea1', 900, 675),
    'gallery-2.jpg': U('1570197788415-a801d8c4e936', 900, 675),
    'gallery-3.jpg': U('1511799847-ef04b616bb29', 900, 675),
    'gallery-4.jpg': U('1551024506-d5b83f84f257', 900, 675),
    'gallery-5.jpg': U('1571875257724-b199340262b1', 900, 675),
    'gallery-6.jpg': U('1488472229707-3fe021a6ad2b', 900, 675),
    'scoop-strawberry.jpg': U('1551260583-bb33ab811451', 800, 800),
    'scoop-fig-honey.jpg': U('1558961363-fa8a64dc331f', 800, 800),
    'scoop-passion-fruit.jpg': U('1525385133511-4a6dd1642241', 800, 800),
    'scoop-harvest-mango.jpg': U('1628797079834-7ff7a41b5864', 800, 800),
    'scoop-chikoo.jpg': U('1563805042-7684c019e6cb', 800, 800),
    'scoop-blueberry.jpg': U('1494858352-24e4d7a0088c', 800, 800),
    'scoop-alphonso.jpg': U('1605027998946-411d0c9a2690', 800, 800),
    'scoop-pineapple.jpg': U('1550258988-9b87b6f9c0c4', 800, 800),
    'scoop-tender-coconut.jpg': U('1587049352074-5d9e8f4b8b0e', 800, 800),
    'scoop-jackfruit.jpg': U('1615485507206-447530c2d0d2', 800, 800),
    'scoop-very-berry.jpg': U('1461009839741-56db49274525', 800, 800),
    'scoop-sitaphal.jpg': U('1563379091-3220521252a4', 800, 800),
    'scoop-lotus-biscoff.jpg': U('1558961363-fa8a64dc331f', 800, 800),
    'scoop-triple-chocolate.jpg': U('1488909566241-7a020efcb593', 800, 800),
    'scoop-classic-vanilla.jpg': U('1563805042-7684c019e6cb', 800, 800),
    'scoop-butterscotch.jpg': U('1551024506-d5b83f84f257', 800, 800),
    'stick-fruit-bar.jpg': U('1551024506-d5b83f84f257', 800, 800),
    'stick-milk-bar.jpg': U('1563805042-7684c019e6cb', 800, 800),
    'stick-kulfi-bar.jpg': U('1587049352074-5d9e8f4b8b0e', 800, 800),
    'stick-chilly-mango.jpg': U('1605027998946-411d0c9a2690', 800, 800),
    'stick-strawberry-bar.jpg': U('1551260583-bb33ab811451', 800, 800),
    'stick-coconut-kulfi.jpg': U('1587049352074-5d9e8f4b8b0e', 800, 800),
    'br-rock.jpg': U('1488909566241-7a020efcb593', 800, 800),
    'mango-in-mango.jpg': U('1628797079834-7ff7a41b5864', 800, 800),
    'strawberry-in-strawberry.jpg': U('1551260583-bb33ab811451', 800, 800),
    'fruit-float.jpg': U('1571875257724-b199340262b1', 800, 800),
    'milkshake.jpg': U('1570197788415-a801d8c4e936', 800, 800),
    'fruit-cream-sundae.jpg': U('1497035627-7b843c997ea1', 800, 800),
    'mini-falooda.jpg': U('1571875257724-b199340262b1', 800, 800),
    'brownie-sundae.jpg': U('1488472229707-3fe021a6ad2b', 800, 800),
    'croissant-cone.jpg': U('1558961363-fa8a64dc331f', 800, 800),
    'hot-puff.jpg': U('1558961363-fa8a64dc331f', 800, 800),
    'pastry-ice-cream.jpg': U('1563379091-3220521252a4', 800, 800),
    'waffles.jpg': U('1563379091-3220521252a4', 800, 800),
    'roll-cake.jpg': U('1578985545068-69928b1d9589', 800, 800),
    'cheesecake.jpg': U('1533134242443-35ca0adae238', 800, 800),
    'pastries.jpg': U('1578985545068-69928b1d9589', 800, 800),
    'lotus-biscoff.jpg': U('1558961363-fa8a64dc331f', 800, 800),
    'feature-milk.jpg': U('1550583724-b2693b4eb720', 400, 400),
    'feature-veg.jpg': U('1546069900-ba7a34837537', 400, 400),
    'feature-fruit.jpg': U('1551260583-bb33ab811451', 400, 400),
    'feature-events.jpg': U('1511799847-ef04b616bb29', 400, 400),
  };

  const FEATURE_PHOTOS = {
    milk: PREMIUM_IMAGES['feature-milk.jpg'],
    veg: PREMIUM_IMAGES['feature-veg.jpg'],
    fruit: PREMIUM_IMAGES['feature-fruit.jpg'],
    events: PREMIUM_IMAGES['feature-events.jpg'],
  };

  function getPlaceholder(img) {
    const ph = img.nextElementSibling;
    if (ph && (ph.classList.contains('product-img-placeholder') || ph.classList.contains('about-img-placeholder'))) {
      return ph;
    }
    return null;
  }

  function showPlaceholder(img) {
    const ph = getPlaceholder(img);
    if (ph) {
      ph.style.display = 'flex';
      img.style.display = 'none';
    }
  }

  function hidePlaceholder(img) {
    const ph = getPlaceholder(img);
    if (ph) ph.style.display = 'none';
    img.style.display = '';
    img.style.opacity = '1';
  }

  function loadInto(img, url, onFail) {
    img.addEventListener(
      'load',
      () => {
        if (img.naturalWidth > 0) hidePlaceholder(img);
        else onFail?.();
      },
      { once: true }
    );
    img.addEventListener('error', () => onFail?.(), { once: true });
    img.src = url;
  }

  function resolveImage(img) {
    const src = img.getAttribute('src');
    if (!src || !src.includes('images/') || src.includes('icons.svg')) return;

    const filename = src.split('/').pop().split('?')[0];
    const premium = PREMIUM_IMAGES[filename];
    if (!premium) return;

    showPlaceholder(img);

    loadInto(img, src, () => {
      loadInto(img, premium, () => showPlaceholder(img));
    });
  }

  function initFeaturePhotos() {
    document.querySelectorAll('[data-feature-photo]').forEach((el) => {
      const url = FEATURE_PHOTOS[el.dataset.featurePhoto];
      if (url) el.style.backgroundImage = `url("${url}")`;
    });
  }

  function initHeroPoster() {
    const poster = PREMIUM_IMAGES['hero-poster.jpg'];
    const video = document.querySelector('.hero-video');
    const fallback = document.querySelector('.hero-bg-fallback');
    const videoWrap = document.querySelector('.hero-video-wrap');

    if (video && poster) video.setAttribute('poster', poster);

    if (fallback && poster) {
      fallback.style.backgroundImage = `linear-gradient(180deg, rgba(28,10,0,0.35) 0%, rgba(28,10,0,0.5) 45%, rgba(28,10,0,0.82) 100%), url("${poster}")`;
      fallback.style.backgroundSize = 'cover';
      fallback.style.backgroundPosition = 'center';
    }

    if (video) {
      video.addEventListener('error', () => {
        if (videoWrap) videoWrap.style.display = 'none';
      });
    }
  }

  function init() {
    document.querySelectorAll('img[src*="images/"]').forEach(resolveImage);
    initFeaturePhotos();
    initHeroPoster();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
