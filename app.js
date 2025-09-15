// ----- Catàleg i dies -----
const CATALOG_DIETS = [
  "General","General (fàcil masticació)","Rica en residus","PDB","Diabetis 1200","Diabetis 1500","Diabetis 2000",
  "Cardio i Cardio Diabètica","Hipocalòrica","PDA i Astringent","Control de residu no astringent","General TX","PDA TX",
  "Astringent A o B TX","Control K + 80 g proteïna","Hepatobiliar","Control K + 60 g proteïna","Disfàgia orofaríngia estricta",
  "Disfàgia orofaríngia moderada","Protecció de la mucosa oral","IMAO","Pancreatitis + Pancreatitis diabètica",
  "Tractament amb iode","Redistribució proteica","Vegetariana estricta","Ovo-lacto-vegetariana","Hipercalòrica","Diabètica 2500",
  "Exempta de porc","General sense lactosa","Alta densitat nutricional (ADN) i alta seguretat alimentària (ASA)"
];
const DAYS = ["Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte","Diumenge"];

// ----- Dades: menú complet per Setmana 1 i 2, Hivern i Estiu -----
function genData(){
  const H_FIRST = ["Sopa de verdures","Llenties estofades","Crema de carbassa","Arròs caldós","Escudella","Cigrons guisats","Amanida de llenties"];
  const H_SECOND = ["Pollastre a la planxa","Mandonguilles a la jardinera","Truita francesa","Llom al forn","Galta estofada","Lluç al forn","Vedella estofada"];
  const H_SIDE = ["Enciam i tomàquet","Patata bullida","Arròs blanc","Verdura al vapor","Puré de patata","Carbassó a la planxa","Bròquil bullit"];
  const H_DESS = ["Iogurt natural","Poma","Pera","Taronja","Plàtan","Mandarina","Compota de poma"];

  const E_FIRST = ["Gaspatxo","Amanida andalusa","Amanida de pasta","Sopa freda de cogombre","Sopa de meló","Ensaladilla suau","Salmorejo suau"];
  const E_SECOND = ["Pit de pollastre a la planxa","Truita de patata","Tonyina al forn","Hamburguesa de gall dindi","Filet de lluç a la planxa","Bacallà amb samfaina","Pernilets de pollastre al forn"];
  const E_SIDE = ["Amanida mixta","Carbassó a la planxa","Arròs blanc","Verdura al vapor","Mongetes tendres","Patata al caliu","Cuscús suau"];
  const E_DESS = ["Síndria","Meló","Préssec","Iogurt","Poma","Fruita tallada","Gelatina"];

  const dietsPerDay = [
    ["General","General (fàcil masticació)","Vegetariana estricta","Ovo-lacto-vegetariana","Diabetis 1500","Hipocalòrica","General sense lactosa","Exempta de porc"],
    ["General","Rica en residus","PDB","Diabetis 2000","Cardio i Cardio Diabètica","Hipercalòrica","Control de residu no astringent","Diabètica 2500"],
    ["General","PDA i Astringent","Astringent A o B TX","General TX","PDA TX","IMAO","Protecció de la mucosa oral","Redistribució proteica"],
    ["General","Control K + 80 g proteïna","Control K + 60 g proteïna","Hepatobiliar","Pancreatitis + Pancreatitis diabètica","Tractament amb iode","Disfàgia orofaríngia moderada","Disfàgia orofaríngia estricta"],
    ["General","General (fàcil masticació)","Vegetariana estricta","Ovo-lacto-vegetariana","Diabetis 1200","Hipocalòrica","General sense lactosa","Exempta de porc"],
    ["General","Rica en residus","PDB","Diabetis 2000","Cardio i Cardio Diabètica","Hipercalòrica","Control de residu no astringent","Diabètica 2500"],
    ["General","PDA i Astringent","Astringent A o B TX","General TX","PDA TX","IMAO","Protecció de la mucosa oral","Redistribució proteica"]
  ];

  const data = [];
  ["HIVERN","ESTIU"].forEach(season => {
    [1,2].forEach(week => {
      DAYS.forEach((day, idx) => {
        const dlist = dietsPerDay[idx];
        dlist.forEach((dieta, j) => {
          const i = (idx + j + week) % 7;
          const first = (season==="HIVERN" ? H_FIRST : E_FIRST)[i];
          const second = (season==="HIVERN" ? H_SECOND : E_SECOND)[(i+2)%7];
          const side = (season==="HIVERN" ? H_SIDE : E_SIDE)[(i+3)%7];
          const dess = (season==="HIVERN" ? H_DESS : E_DESS)[(i+4)%7];
          data.push({
            menuType: season,
            week: week,
            day: day,
            dieta: dieta,
            primers: first,
            segons: second,
            guarnicions: side,
            postres: dess,
            pa: "Blanc",
            observacions: (j===0 && idx%2===0) ? "Control de sal" : ""
          });
        });
      });
    });
  });

  // Casos exactes aportats: mantenim coherència amb el briefing
  data.push({ menuType:"HIVERN", week:1, day:"Dilluns", dieta:"General",
    primers:"Llenties estofades", segons:"Pit de pollastre a la planxa",
    guarnicions:"Amanida mixta", postres:"Poma", pa:"Blanc", observacions:"" });
  data.push({ menuType:"HIVERN", week:1, day:"Dijous", dieta:"General",
    primers:"Espinacs a la catalana", segons:"Mandonguilles a la jardinera",
    guarnicions:"Sopa d’estrelles (bol petit)", postres:"Fruita", pa:"Blanc",
    observacions:"xxxxxxxxxxxxxxxxxxxxxxxxxxx" });

  return data;
}

const DATA = genData();
let state = { menuType: "HIVERN", week: 1, q: "" };

function setSeason(season){
  state.menuType = season;
  document.getElementById('title-season').textContent = season;
  render();
}
function setWeek(w){
  state.week = w;
  document.getElementById('btn-set1').classList.toggle('active', w===1);
  document.getElementById('btn-set2').classList.toggle('active', w===2);
  render();
}
function applySearch(){
  const el = document.getElementById('q');
  state.q = el.value.trim().toLowerCase();
  render();
}
document.addEventListener('keydown', function(e){
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); document.getElementById('q').focus(); }
});

function normalize(s){ return (s||'').toLowerCase(); }
function isDayQuery(q){ const qn = normalize(q); return DAYS.some(d => normalize(d) === qn); }
function matchesEntry(entry, q){
  if (!q) return true;
  const fields = [entry.dieta, entry.primers, entry.segons, entry.guarnicions, entry.postres, entry.pa, entry.observacions];
  return fields.some(s => normalize(s).includes(q));
}

function render(){
  const grid = document.getElementById('grid'); grid.innerHTML = '';
  const isDay = isDayQuery(state.q);
  const dayFilter = isDay ? DAYS.find(d => normalize(d) === state.q) : null;
  const daysToShow = isDay ? [dayFilter] : DAYS;

  daysToShow.forEach(day => {
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `<div class="card__header"><div>${day}</div><span class="badge">${state.menuType} · Setmana ${state.week}</span></div>`;
    const body = document.createElement('div'); body.className = 'card__body';

    let rows = DATA.filter(e => e.menuType === state.menuType && e.week === state.week && e.day === day);
    if (!isDay && state.q) rows = rows.filter(e => matchesEntry(e, state.q));
    rows.sort((a,b)=> CATALOG_DIETS.indexOf(a.dieta) - CATALOG_DIETS.indexOf(b.dieta));

    const table = document.createElement('table'); table.className = 'table';
    table.innerHTML = `<thead><tr><th>Dieta</th><th>Primer</th><th>Segon</th><th>Guarnició</th><th>Postres</th><th>Pa</th></tr></thead><tbody></tbody>`;
    const tbody = table.querySelector('tbody');

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

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-set1').classList.add('active');
  render();
});
