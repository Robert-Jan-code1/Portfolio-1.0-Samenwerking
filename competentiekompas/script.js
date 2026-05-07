const competencies = [
  'Communicatie',
  'Samenwerken',
  'Probleemoplossend vermogen',
  'Leiderschap',
  'Zelfstandigheid',
  'Plannen en organiseren'
];

const storageKey = 'competentiekompas-halfjaar-v1';
const defaultScore = null;
const signals = {
  Communicatie: ['communicatie', 'communiceren', 'presentatie', 'uitleg', 'luisteren', 'feedback', 'gesprek', 'afstemming', 'schrijven'],
  Samenwerken: ['samenwerken', 'team', 'collega', 'overleg', 'helpen', 'afstemmen', 'gezamenlijk', 'groep', 'samen'],
  'Probleemoplossend vermogen': ['probleem', 'oplossing', 'analyse', 'onderzoek', 'verbetering', 'besluit', 'oorzaak', 'aanpak', 'oplossen'],
  Leiderschap: ['leiderschap', 'leiding', 'initiatief', 'aansturen', 'verantwoordelijkheid', 'coordineren', 'beslissen', 'motiveren', 'eigenaarschap'],
  Zelfstandigheid: ['zelfstandig', 'zelfstandigheid', 'eigen initiatief', 'zonder hulp', 'verantwoordelijk', 'uitvoeren', 'autonomie', 'proactief'],
  'Plannen en organiseren': ['planning', 'plannen', 'organiseren', 'deadline', 'prioriteit', 'structuur', 'agenda', 'voortgang', 'tijd', 'coordinatie']
};
const growthWords = ['verbeterd', 'gegroeid', 'ontwikkeling', 'vooruitgang', 'sterker', 'beter', 'geleerd', 'toegenomen', 'succesvol'];
const weakWords = ['moeite', 'lastig', 'onvoldoende', 'zwak', 'verbeterpunt', 'ontwikkelpunt', 'fout', 'probleem', 'achterstand', 'onzeker'];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const elements = {
  form: $('#score-form'),
  file: $('#evidence-file'),
  clearFile: $('#clear-file-button'),
  results: $('#results-button'),
  reset: $('#reset-button'),
  savePdf: $('#save-pdf-button'),
  chart: $('#radar-chart'),
  zero: $('#zero-alert'),
  growth: $('#growth-summary'),
  fileStatus: $('#file-status'),
  fileInsights: $('#file-insights'),
  analysis: $('#analysis-results'),
  plan: $('#development-plan'),
  report: $('#report'),
  progressLabel: $('#progress-label'),
  progressFill: $('#progress-fill'),
  resultStatus: $('#result-status')
};

let state = loadState();

function defaultScores() {
  return Object.fromEntries(competencies.map((item) => [item, defaultScore]));
}

function defaultState() {
  return { startScores: defaultScores(), currentScores: defaultScores(), plan: {}, fileAnalysis: null, hasViewedResults: false };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved) return defaultState();
    return {
      startScores: { ...defaultScores(), ...(saved.startScores || {}) },
      currentScores: { ...defaultScores(), ...(saved.currentScores || {}) },
      plan: saved.plan || {},
      fileAnalysis: saved.fileAnalysis || null,
      hasViewedResults: Boolean(saved.hasViewedResults)
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // De app blijft bruikbaar zonder browseropslag.
  }
}

function init() {
  render();
  elements.file.addEventListener('change', handleFileUpload);
  elements.clearFile.addEventListener('click', () => {
    state.fileAnalysis = null;
    elements.file.value = '';
    saveState();
    render();
  });
  elements.results.addEventListener('click', () => {
    state.hasViewedResults = true;
    saveState();
    render();
    scrollToSection('results');
  });
  elements.reset.addEventListener('click', () => {
    state = defaultState();
    localStorage.removeItem(storageKey);
    render();
  });
  elements.savePdf.addEventListener('click', () => window.print());
  $$('.nav-button').forEach((button) => button.addEventListener('click', () => scrollToSection(button.dataset.target)));
}

function render() {
  const categories = categorize();
  const changes = getChanges();
  renderFileAnalysis();
  renderForm();
  renderProgress();
  renderRadar();
  renderZeroAlert(categories.zero);
  renderGrowth(changes);
  renderAnalysis(categories);
  renderPlan(categories);
  renderReport(categories, changes);
  elements.resultStatus.textContent = state.hasViewedResults
    ? 'De analyse vergelijkt de startmeting met waar je nu staat.'
    : 'Klik op Bekijk ontwikkeling om de analyse te activeren.';
}

function renderForm() {
  elements.form.innerHTML = '<div class="competency-list">' + competencies.map((name) => `
    <fieldset class="competency-row">
      <legend>${name}</legend>
      <div class="score-columns">
        ${scoreGroup(name, 'startScores', 'Begin halfjaar', 'start-score')}
        ${scoreGroup(name, 'currentScores', 'Nu', 'current-score')}
      </div>
    </fieldset>
  `).join('') + '</div>';

  $$('[data-score-type]').forEach((input) => input.addEventListener('change', () => {
    state[input.dataset.scoreType][input.dataset.competency] = Number(input.value);
    saveState();
    render();
  }));
}

function scoreGroup(name, type, title, className) {
  return `<div class="score-group ${className}"><span class="score-group-title">${title}</span><div class="score-options">${[0, 1, 2, 3, 4, 5].map((score) => {
    const id = `${type}-${slug(name)}-${score}`;
    const checked = state[type][name] === score ? 'checked' : '';
    return `<input data-score-type="${type}" data-competency="${name}" type="radio" id="${id}" name="${type}-${name}" value="${score}" ${checked}><label for="${id}">${score}</label>`;
  }).join('')}</div></div>`;
}

function renderProgress() {
  const completed = competencies.filter((name) => state.startScores[name] !== null && state.currentScores[name] !== null).length;
  elements.progressLabel.textContent = `${completed} van ${competencies.length} competenties compleet gemeten`;
  elements.progressFill.style.width = `${Math.round((completed / competencies.length) * 100)}%`;
}

function categorize() {
  const groups = { strong: [], develop: [], weak: [], zero: [] };
  competencies.forEach((name) => {
    const score = state.currentScores[name];
    if (score === null) return;
    const item = { competency: name, score, startScore: state.startScores[name], delta: delta(name) };
    if (score >= 4) groups.strong.push(item);
    else if (score >= 2) groups.develop.push(item);
    else groups.weak.push(item);
    if (score === 0) groups.zero.push(item);
  });
  return groups;
}

function getChanges() {
  return competencies.map((name) => {
    const startScore = state.startScores[name];
    const currentScore = state.currentScores[name];
    return { competency: name, startScore, currentScore, delta: startScore === null || currentScore === null ? null : currentScore - startScore };
  });
}

function renderZeroAlert(items) {
  elements.zero.hidden = !state.hasViewedResults || items.length === 0;
  elements.zero.textContent = items.length ? `Let op: score 0 bij ${items.map((item) => item.competency).join(', ')}. Deze competenties vragen directe aandacht.` : '';
}

function renderGrowth(changes) {
  if (!state.hasViewedResults) {
    elements.growth.innerHTML = '';
    return;
  }
  const measured = changes.filter((item) => item.delta !== null);
  const improved = measured.filter((item) => item.delta > 0).length;
  const declined = measured.filter((item) => item.delta < 0).length;
  const average = measured.length ? measured.reduce((sum, item) => sum + item.delta, 0) / measured.length : 0;
  elements.growth.innerHTML = metric(formatDelta(average, 1), 'gemiddelde groei') + metric(improved, 'competenties verbeterd') + metric(declined, 'competenties gedaald');
}

function metric(value, label) {
  return `<article class="metric-card"><strong>${value}</strong><span>${label}</span></article>`;
}

function renderAnalysis(groups) {
  if (!state.hasViewedResults) {
    elements.analysis.innerHTML = '<p class="empty-state">Vul begin- en huidige scores in en klik op Bekijk ontwikkeling.</p>';
    return;
  }
  elements.analysis.innerHTML = resultCard('Sterke punten', groups.strong, 'strong') + resultCard('Ontwikkelpunten', groups.develop, 'develop') + resultCard('Zwakke punten', groups.weak, 'weak');
}

function resultCard(title, items, type) {
  const body = items.length ? `<ul>${items.map((item) => `<li>${item.competency}: nu ${item.score}, begin ${formatScore(item.startScore)} <span class="${deltaClass(item.delta)}">(${formatDelta(item.delta)})</span></li>`).join('')}</ul>` : '<p class="empty-state">Geen competenties in deze categorie.</p>';
  return `<article class="result-card ${type}"><h3>${title}</h3>${body}</article>`;
}

function renderPlan(groups) {
  if (!state.hasViewedResults) {
    elements.plan.innerHTML = '<p class="empty-state">Het ontwikkelingsplan verschijnt na de analyse.</p>';
    return;
  }
  const items = [...groups.weak, ...groups.develop];
  if (!items.length) {
    elements.plan.innerHTML = '<p class="empty-state">Er zijn geen ontwikkelpunten gevonden. Leg eventueel vast hoe je sterke punten behoudt.</p>';
    return;
  }
  elements.plan.innerHTML = `<div class="plan-list">${items.map(planItem).join('')}</div>`;
  $$('[data-plan-field]').forEach((field) => field.addEventListener('input', () => {
    const key = field.dataset.planKey;
    state.plan[key] = state.plan[key] || { action: '', deadline: '', measure: '' };
    state.plan[key][field.dataset.planField] = field.value;
    saveState();
    renderReport(categorize(), getChanges());
  }));
}

function planItem(item) {
  const key = slug(item.competency);
  const plan = state.plan[key] || { action: '', deadline: '', measure: '' };
  const target = Math.min(item.score + 2, 5);
  return `<article class="plan-item"><h3>${item.competency}</h3><p>Begin: ${formatScore(item.startScore)}. Nu: ${item.score}. Verandering: <span class="${deltaClass(item.delta)}">${formatDelta(item.delta)}</span>. Doel: ${target}.</p>
    <label>Actie<textarea data-plan-field="action" data-plan-key="${key}" rows="2" placeholder="Bijvoorbeeld: oefenen, feedback vragen of training volgen.">${escapeHtml(plan.action)}</textarea></label>
    <label>Termijn<input data-plan-field="deadline" data-plan-key="${key}" type="text" value="${escapeAttr(plan.deadline)}" placeholder="Bijvoorbeeld: binnen 8 weken"></label>
    <label>Meetbaar resultaat<textarea data-plan-field="measure" data-plan-key="${key}" rows="2" placeholder="Beschrijf hoe je voortgang zichtbaar wordt.">${escapeHtml(plan.measure)}</textarea></label>
  </article>`;
}

function renderReport(groups, changes) {
  if (!state.hasViewedResults) {
    elements.report.innerHTML = '<p class="empty-state">Het rapportoverzicht verschijnt na de analyse.</p>';
    return;
  }
  const fileBlock = state.fileAnalysis ? `<article class="report-block"><h3>Bestandsanalyse</h3><p>Gebaseerd op: ${escapeHtml(state.fileAnalysis.fileName)}.</p><ul>${state.fileAnalysis.insights.slice().sort((a, b) => b.confidence - a.confidence).slice(0, 3).map((item) => `<li>${item.competency}: ${item.confidence}% betrouwbaarheid</li>`).join('')}</ul></article>` : '';
  elements.report.innerHTML = `<div class="report-grid">${fileBlock}<article class="report-block"><h3>Ontwikkeling per competentie</h3>${scoreTable(changes)}</article><article class="report-block"><h3>Samenvatting</h3><ul><li>Sterke punten nu: ${groups.strong.length}</li><li>Ontwikkelpunten nu: ${groups.develop.length}</li><li>Zwakke punten nu: ${groups.weak.length}</li><li>Score 0 nu: ${groups.zero.length}</li></ul></article><article class="report-block"><h3>Grootste veranderingen</h3>${trendList(changes)}</article><article class="report-block"><h3>Persoonlijk ontwikkelingsplan</h3>${planSummary([...groups.weak, ...groups.develop])}</article></div>`;
}

function scoreTable(changes) {
  return `<table class="score-table"><thead><tr><th>Competentie</th><th>Begin</th><th>Nu</th><th>Verschil</th></tr></thead><tbody>${changes.map((item) => `<tr><td>${item.competency}</td><td>${formatScore(item.startScore)}</td><td>${formatScore(item.currentScore)}</td><td class="${deltaClass(item.delta)}">${formatDelta(item.delta)}</td></tr>`).join('')}</tbody></table>`;
}

function trendList(changes) {
  const measured = changes.filter((item) => item.delta !== null).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  if (!measured.length) return '<p class="empty-state">Nog geen volledige start- en huidige metingen.</p>';
  return `<ul class="trend-list">${measured.map((item) => `<li><span>${item.competency}</span><strong class="${deltaClass(item.delta)}">${formatDelta(item.delta)}</strong></li>`).join('')}</ul>`;
}

function planSummary(items) {
  if (!items.length) return '<p class="empty-state">Geen ontwikkelacties nodig op basis van de huidige scores.</p>';
  return `<ul>${items.map((item) => {
    const plan = state.plan[slug(item.competency)] || {};
    return `<li><strong>${item.competency}</strong>: ${escapeHtml(plan.action || 'Nog geen actie ingevuld')}. Termijn: ${escapeHtml(plan.deadline || 'Geen termijn ingevuld')}. Resultaat: ${escapeHtml(plan.measure || 'Geen meetbaar resultaat ingevuld')}.</li>`;
  }).join('')}</ul>`;
}

function renderRadar() {
  const center = 240;
  const radius = 130;
  const start = seriesPoints(state.startScores, center, radius);
  const current = seriesPoints(state.currentScores, center, radius);
  const grid = [1, 2, 3, 4, 5].map((level) => `<polygon class="radar-grid" points="${pointsToString(competencies.map((_, index) => radarPoint(index, center, radius * (level / 5))))}"></polygon>`).join('');
  const axes = competencies.map((name, index) => {
    const axis = radarPoint(index, center, radius);
    const label = radarPoint(index, center, radius + 48);
    return `<line class="radar-axis" x1="${center}" y1="${center}" x2="${axis.x}" y2="${axis.y}"></line><text class="radar-label" x="${label.x}" y="${label.y}" text-anchor="middle" dominant-baseline="middle">${name}</text>`;
  }).join('');
  elements.chart.innerHTML = `<svg class="radar-svg" viewBox="0 0 480 480" role="img" aria-label="Spiderplot met startmeting en huidige meting">${grid}${axes}<polygon class="radar-area-start" points="${pointsToString(start)}"></polygon><polygon class="radar-area-current" points="${pointsToString(current)}"></polygon>${dots(start, 'radar-point-start')}${dots(current, 'radar-point-current')}</svg>`;
}

function seriesPoints(scores, center, radius) {
  return competencies.map((name, index) => radarPoint(index, center, radius * ((scores[name] || 0) / 5)));
}

function radarPoint(index, center, radius) {
  const angle = (Math.PI * 2 * index) / competencies.length - Math.PI / 2;
  return { x: Math.round((center + Math.cos(angle) * radius) * 100) / 100, y: Math.round((center + Math.sin(angle) * radius) * 100) / 100 };
}

function pointsToString(points) {
  return points.map((point) => `${point.x},${point.y}`).join(' ');
}

function dots(points, className) {
  return points.map((point) => `<circle class="${className}" cx="${point.x}" cy="${point.y}" r="4"></circle>`).join('');
}

function handleFileUpload(event) {
  const files = [...(event.target.files || [])];
  if (!files.length) return;
  elements.fileStatus.classList.remove('warning');
  elements.fileStatus.textContent = `${files.length} bestand(en) worden geanalyseerd...`;
  Promise.all(files.map(readFile)).then((items) => {
    const analysis = analyzeEvidence(items.map((item) => item.content).join('\n\n'), items.map((item) => item.name).join(', '), files.length);
    analysis.insights.forEach((item) => {
      state.startScores[item.competency] = item.startScore;
      state.currentScores[item.competency] = item.currentScore;
    });
    state.fileAnalysis = analysis;
    state.hasViewedResults = true;
    saveState();
    render();
    scrollToSection('results');
  }).catch(() => {
    elements.fileStatus.classList.add('warning');
    elements.fileStatus.textContent = 'Een bestand kon niet worden gelezen. Probeer tekst-, CSV-, Markdown- of JSON-bestanden.';
  });
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, content: String(reader.result || '') });
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function analyzeEvidence(content, fileName, fileCount) {
  const text = normalize(content);
  const words = Math.max(text.split(/\s+/).filter(Boolean).length, 1);
  const insights = competencies.map((name) => {
    const keywordHits = signals[name].reduce((sum, word) => sum + count(text, normalize(word)), 0);
    const growthHits = nearby(text, signals[name], growthWords);
    const weakHits = nearby(text, signals[name], weakWords);
    const currentScore = clamp(Math.round(keywordHits * 0.9 + growthHits * 1.2 - weakHits * 0.6), 0, 5);
    const startScore = clamp(currentScore - clamp(Math.round(growthHits * 0.8 - weakHits * 0.4), 0, 3), 0, 5);
    const confidence = clamp(Math.round(((keywordHits / words) * 900 + keywordHits * 12 + growthHits * 8) * 10), 0, 100);
    return { competency: name, keywordHits, growthHits, weakHits, startScore, currentScore, confidence };
  });
  return { fileName, fileCount, wordCount: words, insights };
}

function renderFileAnalysis() {
  const analysis = state.fileAnalysis;
  if (!analysis) {
    elements.fileStatus.classList.remove('warning');
    elements.fileStatus.textContent = 'Nog geen bestand geanalyseerd.';
    elements.fileInsights.innerHTML = '';
    return;
  }
  elements.fileStatus.classList.remove('warning');
  elements.fileStatus.textContent = `Analyse toegepast op basis van ${analysis.fileCount} bestand(en), ${analysis.wordCount} woorden. Scores en spiderplot zijn automatisch bijgewerkt.`;
  elements.fileInsights.innerHTML = analysis.insights.map((item) => `<article class="insight-card"><h3>${item.competency}</h3><p>Begin: ${item.startScore}. Nu: ${item.currentScore}. Ontwikkeling: <span class="${deltaClass(item.currentScore - item.startScore)}">${formatDelta(item.currentScore - item.startScore)}</span></p><p>${item.keywordHits} criteria-signalen, ${item.growthHits} groeisignalen, ${item.weakHits} aandachtssignalen.</p><div class="confidence-bar" aria-label="Betrouwbaarheid ${item.confidence}%"><span style="width: ${item.confidence}%"></span></div></article>`).join('');
}

function count(text, needle) {
  const matches = text.match(new RegExp(`\\b${escapeRegExp(needle)}\\b`, 'g'));
  return matches ? matches.length : 0;
}

function nearby(text, keywords, words) {
  return text.split(/[.!?\n\r]+/).reduce((sum, sentence) => {
    const hasKeyword = keywords.some((keyword) => sentence.includes(normalize(keyword)));
    return hasKeyword ? sum + words.filter((word) => sentence.includes(word)).length : sum;
  }, 0);
}

function scrollToSection(id) {
  document.querySelector(`#${id}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
  $$('.nav-button').forEach((button) => button.classList.toggle('active', button.dataset.target === id));
}

function delta(name) {
  const start = state.startScores[name];
  const current = state.currentScores[name];
  return start === null || current === null ? null : current - start;
}

function formatScore(score) {
  return score === null ? 'Nog niet ingevuld' : score;
}

function formatDelta(value, digits = 0) {
  if (value === null) return 'n.v.t.';
  const rounded = Number(value.toFixed(digits));
  return rounded > 0 ? `+${rounded}` : String(rounded);
}

function deltaClass(value) {
  if (value > 0) return 'delta-positive';
  if (value < 0) return 'delta-negative';
  return 'delta-neutral';
}

function normalize(value) {
  return String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function slug(value) {
  return normalize(value).replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

init();
