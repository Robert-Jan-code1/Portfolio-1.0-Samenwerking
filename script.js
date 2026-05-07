const storageKey = 'minor-ce-portfolio-content-v1';
const editToggle = document.querySelector('#editToggle');
const saveButton = document.querySelector('#saveEdits');
const exportButton = document.querySelector('#exportData');
const importInput = document.querySelector('#importData');
const resetButton = document.querySelector('#resetEdits');
const statusText = document.querySelector('#editorStatus');

const defaultData = {
  fields: {},
  projects: [
    {
      label: 'Project 1',
      title: 'Titel van opdracht',
      text: 'Voeg hier later het vraagstuk, de opdrachtgever, jouw rol en het belangrijkste resultaat toe.',
      points: ['Vraagstuk en context', 'Jouw bijdrage', 'Proces en keuzes', 'Bewijs voor beoordeling'],
      featured: true
    },
    { label: 'Project 2', title: 'Nog toe te voegen', text: 'Plek voor een tweede opdracht, casus of groepsproject.', points: [] },
    { label: 'Project 3', title: 'Nog toe te voegen', text: 'Plek voor een derde opdracht of verdiepende activiteit.', points: [] }
  ],
  process: [
    { title: 'Vraagstuk begrijpen', text: "Wat is de uitdaging, welke belangen spelen mee en welke kansen of risico's zie je?" },
    { title: 'Onderzoeken en analyseren', text: 'Welke methode gebruikte je, welke data verzamelde je en welke patronen ontdekte je?' },
    { title: 'Richting kiezen', text: 'Welke opties heb je verkend en waarom paste de gekozen richting het best?' },
    { title: 'Valideren en verbeteren', text: 'Welke feedback kreeg je van stakeholders en wat heb je daarmee aangepast?' }
  ],
  products: [
    { title: 'Transitieplan', text: 'Status: nog toevoegen. Leg uit waarom het professioneel bruikbaar is voor de opdrachtgever.' },
    { title: 'Analyse en modellen', text: 'Status: nog toevoegen. Koppel elk model aan inzichten en keuzes.' },
    { title: 'Presentatie of workshop', text: 'Status: nog toevoegen. Laat zien hoe interactie en validatie hebben plaatsgevonden.' }
  ],
  learning: [
    { title: 'Situatie', text: 'Welke ervaring, opdracht of feedbackmoment was belangrijk?' },
    { title: 'Keuze', text: 'Wat deed jij bewust en waarom koos je daarvoor?' },
    { title: 'Inzicht', text: 'Wat heb je geleerd over jezelf, samenwerking of duurzaamheid?' },
    { title: 'Vervolg', text: 'Wat neem je mee naar je volgende project of professionele rol?' }
  ],
  evidence: [
    { criterion: 'Professionele kwaliteit', location: "Beroepsproducten en projectpagina's", status: 'Open' },
    { criterion: 'Eigenaarschap', location: 'Jouw rol, keuzes en toelichting per project', status: 'Open' },
    { criterion: 'Reflectie', location: 'Leerproces en reflectiepagina', status: 'Open' },
    { criterion: 'Groei als circulaire professional', location: 'Ontwikkeling, GreenComp en toekomstig handelen', status: 'Open' }
  ]
};

let portfolioData = loadData();
let editing = false;
let saveTimer;

function loadData() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return structuredClone(defaultData);
  try {
    return { ...structuredClone(defaultData), ...JSON.parse(saved) };
  } catch {
    return structuredClone(defaultData);
  }
}

function setStatus(message) {
  statusText.textContent = message;
}

function renderAll() {
  applySavedFields();
  renderProjects();
  renderCards('processList', portfolioData.process, 'process');
  renderCards('productList', portfolioData.products, 'products');
  renderCards('learningList', portfolioData.learning, 'learning');
  renderEvidence();
  setEditableState();
  observeSections();
}

function applySavedFields() {
  document.querySelectorAll('[data-edit]').forEach((element) => {
    const key = element.dataset.edit;
    if (portfolioData.fields[key]) element.textContent = portfolioData.fields[key];
  });
}

function renderProjects() {
  const list = document.querySelector('#projectList');
  list.innerHTML = '';
  portfolioData.projects.forEach((project, index) => {
    const node = document.querySelector('#projectTemplate').content.firstElementChild.cloneNode(true);
    if (project.featured) node.classList.add('featured');
    node.dataset.index = index;
    node.querySelector('[data-field="label"]').textContent = project.label;
    node.querySelector('[data-field="title"]').textContent = project.title;
    node.querySelector('[data-field="text"]').textContent = project.text;
    const points = node.querySelector('[data-field="points"]');
    points.innerHTML = '';
    project.points.forEach((point) => {
      const li = document.createElement('li');
      li.textContent = point;
      points.append(li);
    });
    node.querySelector('.remove-item').addEventListener('click', () => removeItem('projects', index));
    list.append(node);
  });
}

function renderCards(containerId, items, collection) {
  const list = document.querySelector(`#${containerId}`);
  list.innerHTML = '';
  items.forEach((item, index) => {
    const node = document.querySelector('#cardTemplate').content.firstElementChild.cloneNode(true);
    if (collection === 'process') {
      node.className = 'timeline-item';
      const number = document.createElement('span');
      number.textContent = index + 1;
      node.prepend(number);
    }
    node.dataset.index = index;
    node.querySelector('[data-field="title"]').textContent = item.title;
    node.querySelector('[data-field="text"]').textContent = item.text;
    node.querySelector('.remove-item').addEventListener('click', () => removeItem(collection, index));
    list.append(node);
  });
}

function renderEvidence() {
  const list = document.querySelector('#evidenceList');
  list.innerHTML = '<div class="table-row table-head" role="row"><span role="columnheader">Criterium</span><span role="columnheader">Waar komt bewijs?</span><span role="columnheader">Status</span></div>';
  portfolioData.evidence.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'table-row';
    row.dataset.index = index;
    row.innerHTML = `<button class="remove-item" type="button" aria-label="Bewijsregel verwijderen">×</button><span data-field="criterion"></span><span data-field="location"></span><span class="status" data-field="status"></span>`;
    row.querySelector('[data-field="criterion"]').textContent = item.criterion;
    row.querySelector('[data-field="location"]').textContent = item.location;
    row.querySelector('[data-field="status"]').textContent = item.status;
    row.querySelector('.remove-item').addEventListener('click', () => removeItem('evidence', index));
    list.append(row);
  });
}

function setEditableState() {
  document.body.classList.toggle('editing', editing);
  document.querySelectorAll('[data-edit], [data-field], .check-list li').forEach((element) => {
    element.contentEditable = editing ? 'true' : 'false';
  });
  editToggle.textContent = editing ? 'Stop bewerken' : 'Bewerk website';
}

function collectData() {
  document.querySelectorAll('[data-edit]').forEach((element) => {
    portfolioData.fields[element.dataset.edit] = element.textContent.trim();
  });

  portfolioData.projects = [...document.querySelectorAll('#projectList .project-card')].map((card) => ({
    label: card.querySelector('[data-field="label"]').textContent.trim(),
    title: card.querySelector('[data-field="title"]').textContent.trim(),
    text: card.querySelector('[data-field="text"]').textContent.trim(),
    points: [...card.querySelectorAll('.check-list li')].map((item) => item.textContent.trim()).filter(Boolean),
    featured: card.classList.contains('featured')
  }));

  portfolioData.process = collectCardList('#processList');
  portfolioData.products = collectCardList('#productList');
  portfolioData.learning = collectCardList('#learningList');
  portfolioData.evidence = [...document.querySelectorAll('#evidenceList .table-row:not(.table-head)')].map((row) => ({
    criterion: row.querySelector('[data-field="criterion"]').textContent.trim(),
    location: row.querySelector('[data-field="location"]').textContent.trim(),
    status: row.querySelector('[data-field="status"]').textContent.trim()
  }));
}

function collectCardList(selector) {
  return [...document.querySelectorAll(`${selector} article`)].map((card) => ({
    title: card.querySelector('[data-field="title"]').textContent.trim(),
    text: card.querySelector('[data-field="text"]').textContent.trim()
  }));
}

function saveData(message = 'Opgeslagen in deze browser') {
  collectData();
  localStorage.setItem(storageKey, JSON.stringify(portfolioData));
  setStatus(message);
}

function queueSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveData('Automatisch opgeslagen'), 350);
}

function addItem(type) {
  saveData('Nieuwe inhoud wordt toegevoegd');
  if (type === 'project') {
    portfolioData.projects.push({ label: `Project ${portfolioData.projects.length + 1}`, title: 'Nieuwe opdracht', text: 'Beschrijf hier het vraagstuk, jouw rol en het resultaat.', points: ['Vraagstuk', 'Jouw bijdrage', 'Bewijs'], featured: false });
  }
  if (type === 'product') portfolioData.products.push({ title: 'Nieuw beroepsproduct', text: 'Beschrijf wat dit product laat zien en aan welk criterium het bewijs levert.' });
  if (type === 'evidence') portfolioData.evidence.push({ criterion: 'Nieuw criterium', location: 'Link naar bewijs', status: 'Open' });
  localStorage.setItem(storageKey, JSON.stringify(portfolioData));
  renderAll();
  setStatus('Onderdeel toegevoegd');
}

function removeItem(collection, index) {
  portfolioData[collection].splice(index, 1);
  localStorage.setItem(storageKey, JSON.stringify(portfolioData));
  renderAll();
  setStatus('Onderdeel verwijderd');
}

function exportPortfolio() {
  saveData('Exportbestand gemaakt');
  const blob = new Blob([JSON.stringify(portfolioData, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'portfolio-inhoud.json';
  link.click();
  URL.revokeObjectURL(link.href);
}

function importPortfolio(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      portfolioData = { ...structuredClone(defaultData), ...JSON.parse(reader.result) };
      localStorage.setItem(storageKey, JSON.stringify(portfolioData));
      renderAll();
      setStatus('Import gelukt');
    } catch {
      setStatus('Import mislukt: ongeldig JSON-bestand');
    }
  };
  reader.readAsText(file);
}

function observeSections() {
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 });
  sections.forEach((section) => observer.observe(section));
}

editToggle.addEventListener('click', () => {
  editing = !editing;
  if (!editing) saveData();
  setEditableState();
  setStatus(editing ? 'Klik op tekst om te bewerken' : 'Bewerkmodus uit');
});
saveButton.addEventListener('click', () => saveData());
exportButton.addEventListener('click', exportPortfolio);
importInput.addEventListener('change', (event) => {
  const [file] = event.target.files;
  if (file) importPortfolio(file);
});
resetButton.addEventListener('click', () => {
  if (!confirm('Weet je zeker dat je lokale bewerkingen wilt verwijderen?')) return;
  localStorage.removeItem(storageKey);
  portfolioData = structuredClone(defaultData);
  renderAll();
  setStatus('Lokale bewerkingen verwijderd');
});
document.addEventListener('input', (event) => {
  if (editing && (event.target.matches('[data-edit], [data-field]') || event.target.closest('.check-list'))) queueSave();
});
document.querySelectorAll('[data-add]').forEach((button) => button.addEventListener('click', () => addItem(button.dataset.add)));

renderAll();
