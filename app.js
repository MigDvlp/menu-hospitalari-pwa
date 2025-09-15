// Catàleg de dietes (ordre oficial del demo)
const CATALOG_DIETS = [
  "General","General (fàcil masticació)","Rica en residus","PDB","Diabetis 1200","Diabetis 1500","Diabetis 2000",
  "Cardio i Cardio Diabètica","Hipocalòrica","PDA i Astringent","Control de residu no astringent","General TX","PDA TX",
  "Astringent A o B TX","Control K + 80 g proteïna","Hepatobiliar","Control K + 60 g proteïna","Disfàgia orofaríngia estricta",
  "Disfàgia orofaríngia moderada","Protecció de la mucosa oral","IMAO","Pancreatitis + Pancreatitis diabètica",
  "Tractament amb iode","Redistribució proteica","Vegetariana estricta","Ovo-lacto-vegetariana","Hipercalòrica","Diabètica 2500",
  "Exempta de porc","General sense lactosa","Alta densitat nutricional (ADN) i alta seguretat alimentària (ASA)"
];
const DAYS = ["Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte","Diumenge"];
// Dades de mostra
const DATA = [
  { menuType:"HIVERN", week:1, day:"Dilluns", dieta:"General", primers:"Llenties estofades", segons:"Pit de pollastre a la planxa", guarnicions:"Amanida mixta", postres:"Poma", pa:"Blanc", observacions:"" },
  { menuType:"HIVERN", week:1, day:"Dijous", dieta:"General", primers:"Espinacs a la catalana", segons:"Mandonguilles a la jardinera", guarnicions:"Sopa d’estrelles (bol petit)", postres:"Fruita", pa:"Blanc", observacions:"xxxxxxxxxxxxxxxxxxxxxxxxxxx" }
];
let state = { menuType: "HIVERN", week: 1, q: "" };
function setSeason(season){
  state.menuType = season; document.getElementById('title-season').textContent = season;
  document.getElementById('btn-hivern').classList.toggle('active', season==='HIVERN');
  document.getElementById('btn-estiu').classList.toggle('active', season==='ESTIU'); render();
}
function setWeek(w){
  state.week = w; document.getElementById('btn-set1').classList.toggle('active', w===1);
  document.getElementById('btn-set2').classList.toggle('active', w===2); render();
}
function applySearch(){ state.q = document.getElementById('q').value.trim().toLowerCase(); render(); }
document.addEventListener('keydown', function(e){
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); document.getElementById('q').focus(); }
});
function matches(entry, q){
  if (!q) return true;
  const fields = [entry.dieta, entry.primers, entry.segons, entry.guarnicions, entry.postres, entry.pa, entry.observacions];
  return fields.some(s => (s||'').toLowerCase().includes(q));
}
function render(){
  const grid = document.getElementById('grid'); grid.innerHTML = '';
  DAYS.forEach(day => {
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `<div class="card__header"><div>${day}</div></div>`;
    const body = document.createElement('div'); body.className = 'card__body';
    const table = document.createElement('table'); table.className = 'table';
    table.innerHTML = `<thead><tr><th>Dieta</th><th>Primer</th><th>Segon</th><th>Guarnició</th><th>Postres</th><th>Pa</th></tr></thead><tbody></tbody>`;
    const tbody = table.querySelector('tbody');
    const rows = DATA.filter(e => e.menuType === state.menuType && e.week === state.week && e.day === day)
                     .filter(e => matches(e, state.q))
                     .sort((a,b)=> CATALOG_DIETS.indexOf(a.dieta) - CATALOG_DIETS.indexOf(b.dieta));
    rows.forEach(e => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${e.dieta||'—'}</td><td>${e.primers||'—'}</td><td>${e.segons||'—'}</td><td>${e.guarnicions||'—'}</td><td>${e.postres||'—'}</td><td>${e.pa||'—'}</td>`;
      tbody.appendChild(tr);
    });
    if (rows.length === 0){
      const tr = document.createElement('tr');
      tr.innerHTML = `<td colspan="6" style="color:#666;">Sense registres per aquest dia.</td>`;
      tbody.appendChild(tr);
    }
    body.appendChild(table);
    const obs = rows.map(r => r.observacions).filter(Boolean).join(' · ');
    if (obs){
      const div = document.createElement('div');
      div.style.marginTop='8px'; div.style.fontSize='12px'; div.style.color='#444';
      div.textContent = 'Observacions: ' + obs; body.appendChild(div);
    }
    card.appendChild(body); grid.appendChild(card);
  });
}
render();
