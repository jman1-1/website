const navItems = document.querySelectorAll('[data-view]');
const views = document.querySelectorAll('.view');
let previousView = 'overview';

function activateView(target) {
  views.forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + target)?.classList.add('active');
  window.scrollTo(0, 0);
}

function setActiveNav(target) {
  navItems.forEach(n => {
    if (n.dataset.view === target) {
      n.classList.add('active');
    } else {
      n.classList.remove('active');
    }
  });
}

navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const target = item.dataset.view;
    previousView = target;
    activateView(target);
    setActiveNav(target);
  });
});

document.querySelector('.content').addEventListener('click', e => {
  const link = e.target.closest('a.project-name');
  if (!link) return;
  e.preventDefault();

  fetch(link.href)
    .then(r => r.text())
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const headline = doc.querySelector('.page-headline')?.outerHTML ?? '';
      const meta = doc.querySelector('.detail-meta')?.outerHTML ?? '';
      const body = doc.querySelector('.detail-body')?.outerHTML ?? '';
      const screenshot = doc.querySelector('.project-screenshot')?.outerHTML ?? '';
      const screenshotRow = doc.querySelector('.screenshot-row')?.outerHTML ?? '';

      const detailView = document.getElementById('view-detail');
      detailView.innerHTML = `<button class="detail-back" id="back-btn">← back</button>${headline}${meta}${body}${screenshot}${screenshotRow}`;

      document.getElementById('back-btn').addEventListener('click', () => {
        activateView(previousView);
        setActiveNav(previousView);
      });

      activateView('detail');
    });
});