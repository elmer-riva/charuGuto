(() => {
  const start = new Date('2025-03-22T00:00:00');
  const MAX_MONTHS = 1000;
  const grid = document.getElementById('achievements');

  for (let i = 1; i <= MAX_MONTHS; i++) {
    const div = document.createElement('div');
    div.className = 'month-item locked';
    const icon = document.createElement('div');
    icon.className = 'month-icon';
    icon.textContent = i;
    const label = document.createElement('span');
    label.className = 'month-label';
    label.textContent = `${i} ${i === 1 ? 'mes' : 'meses'}`;
    div.append(icon, label);
    grid.append(div);
  }
  
  function show(view) {
    document.querySelectorAll('.view')
      .forEach(v => v.classList.add('hidden'));
    document.getElementById('view-'+view)
      .classList.remove('hidden');
    document.querySelectorAll('nav button')
      .forEach(b => b.classList.toggle('active', b.dataset.view === view));
  }
  document.querySelectorAll('nav button')
    .forEach(btn => btn.addEventListener('click', () => show(btn.dataset.view)));
  show('counter');

  setInterval(() => {
    const diff = Date.now() - start.getTime();
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    document.getElementById('days').textContent    = d.toString().padStart(2,'0');
    document.getElementById('hours').textContent   = h.toString().padStart(2,'0');
    document.getElementById('minutes').textContent = m.toString().padStart(2,'0');
    document.getElementById('seconds').textContent = s.toString().padStart(2,'0');

    document.getElementById('t-days').textContent    = d.toString().padStart(2,'0');
    document.getElementById('t-hours').textContent   = Math.floor(diff/3600000).toString().padStart(2,'0');
    document.getElementById('t-minutes').textContent = Math.floor(diff/60000).toString().padStart(2,'0');
    document.getElementById('t-seconds').textContent = Math.floor(diff/1000).toString().padStart(2,'0');

    const months = Math.floor(diff / (1000*60*60*24*30));
    document.querySelectorAll('.month-item').forEach((el, idx) => {
      if (idx < months) el.classList.remove('locked');
      else el.classList.add('locked');
    });
  }, 1000);

  const conf = document.getElementById('confetti');
  for (let i = 0; i < 30; i++) {
    const e = document.createElement('i');
    e.textContent = '❤️';
    e.style.position = 'absolute';
    e.style.left = Math.random()*100 + '%';
    e.style.fontSize = 20 + Math.random()*20 + 'px';
    e.style.animation = `float 6s ${Math.random()*3}s infinite`;
    conf.append(e);
  }
})();
