const storageKey = 'minor-ce-portfolio-content-v2';
const editToggle = document.querySelector('#editToggle');
const saveButton = document.querySelector('#saveEdits');
const exportButton = document.querySelector('#exportData');
const importInput = document.querySelector('#importData');
const resetButton = document.querySelector('#resetEdits');
const statusText = document.querySelector('#editorStatus');

const defaultData = {
  fields: {
    brandText: 'Portfolio Robert-Jan Laan',
    heroEyebrow: 'Minor Circulaire Economie',
    heroTitle: 'Portfolio assessment: mijn werk, keuzes en groei als circulaire professional',
    heroCopy: 'Deze portfolio laat mijn eigen bijdrage zien aan onderwijsproducten, opdrachtontwikkeling, projectbegeleiding en zelfontwikkelde AI-hulpmiddelen zoals de vakantieplanner, afstudeerbegeleider en groenbeheerbegeleider.',
    introOneTitle: 'Beroepsproducten met praktijkwaarde',
    introOneText: 'Ik toon concrete producten die gebruikt kunnen worden in onderwijs, opdrachtvorming, begeleiding, planning en groenbeheer.',
    introTwoTitle: 'Eigenaarschap zichtbaar',
    introTwoText: 'Per project beschrijf ik mijn rol, gemaakte keuzes, onderbouwing en wat ik zelf heb ontwikkeld of opgeleverd.',
    introThreeTitle: 'Reflectie en ontwikkeling',
    introThreeText: 'Ik verbind mijn ervaringen aan circulair denken, professioneel handelen, AI-gebruik en mijn ontwikkeling binnen de minor.',
    projectsTitle: 'Projecten en eigen bijdrage',
    projectsIntro: 'De projecten hieronder vormen de kern van mijn bewijsmateriaal. Per project staat wat het vraagstuk was, welke rol ik had en welk resultaat ik heb opgeleverd.',
    processTitle: 'Proceslijn',
    processIntro: 'Deze proceslijn laat zien hoe ik van losse vraagstukken naar bruikbare beroepsproducten, begeleidingsvormen en AI-hulpmiddelen ben gekomen.',
    productsTitle: 'Beroepsproducten',
    productsIntro: 'Deze producten gebruik ik als bewijs voor professionele kwaliteit, eigenaarschap, reflectie en groei als circulaire professional.',
    learningTitle: 'Leerproces en reflectie',
    learningIntro: 'Mijn leerproces laat zien hoe ik steeds bewuster ben gaan werken vanuit circulariteit, praktijkwaarde, eigenaarschap en verantwoord gebruik van AI.',
    evidenceTitle: 'Beoordelingsbewijs per criterium',
    evidenceIntro: 'Deze matrix koppelt de vijf criteria uit het assessment direct aan de plekken waar het bewijs in mijn portfolio staat.',
    footerText: 'Portfolio Minor Circulaire Economie - Robert-Jan Laan'
  },
  projects: [
    {
      label: 'Project 1',
      title: 'Wormenhotel-lesprogramma',
      text: 'Ik heb een lesprogramma ontwikkeld voor leerlingen van 12-14 jaar rondom duurzaamheid, circulariteit en klimaat. De kernvraag is hoe organisch afval kan worden omgezet in iets waardevols voor de natuur. Het eindproduct is een werkend wormenhotel dat leerlingen bouwen, onderhouden, monitoren en gebruiken.',
      points: [
        'Eigen product: lesprogramma met visie, leerdoelen, fases, werkvormen en formatieve beoordeling.',
        'Circulaire waarde: afval wordt benaderd als onderdeel van een kringloop in plaats van als eindpunt.',
        'Praktijkwaarde: inzetbaar voor onderbouw VO/Agora, met ruimte voor onderzoek, ontwerp, logboek en reflectie.',
        'Onderbouwing: gekoppeld aan eigenaarschap, klimaatbewust handelen, bodem, biodiversiteit en voedselketen.'
      ],
      featured: true
    },
    {
      label: 'Project 2',
      title: 'Handleiding wormenhotel bouwen',
      text: 'Als vervolg op het lesprogramma heb ik een praktische handleiding gemaakt met drie manieren om een wormenhotel te bouwen: met emmers, opbergbakken of een houten kist. Daarmee is het concept niet alleen inhoudelijk uitgewerkt, maar ook uitvoerbaar gemaakt.',
      points: [
        'Eigen product: korte bouwinstructie met benodigdheden, stappen en visuele opbouw.',
        'Keuze: meerdere varianten toegevoegd zodat scholen kunnen kiezen op basis van materiaal, niveau en beschikbare middelen.',
        'Praktijkwaarde: leerlingen en begeleiders kunnen direct starten met bouwen.'
      ],
      featured: false
    },
    {
      label: 'Project 3',
      title: 'Sjabloon opdrachtbrief voor de minor',
      text: 'Ik heb een opdrachtbrief-sjabloon gemaakt waarmee toekomstige opdrachtgevers hun opdracht duidelijker kunnen formuleren. Het sjabloon helpt om doel, aanleiding, eindproducten, planning, communicatie en randvoorwaarden vooraf scherp te krijgen.',
      points: [
        'Eigen product: structuur voor opdrachtgevers en minorbegeleiders.',
        'Professionele waarde: betere intake van opdrachten, realistischer verwachtingen en duidelijkere deadlines.',
        'Keuze: focus op concrete uitvoerbaarheid, impact, studentvaardigheden en wederzijdse ondersteuning.'
      ],
      featured: false
    },
    {
      label: 'Project 4',
      title: 'Begeleiding bodemverzuringsproject',
      text: 'Voor het project over zure bodems in Nederland heb ik gefunctioneerd als opdrachtgever en begeleider. Ik hielp een groep om het vraagstuk te vertalen naar een onderzoekbare opdracht en gaf tussentijdse beoordeling op product, proces en professionele communicatie.',
      points: [
        'Rol: begeleider/opdrachtgever namens het vraagstuk rond bodemverzuring.',
        'Bewijs: tussentijdse beoordeling van 27-05-2026 met feedback op projectopzet, voorstudie en proces.',
        'Professionele houding: aandacht voor initiatief, diepgang, communicatie en verplaatsen in de probleemeigenaar.'
      ],
      featured: false
    },
    {
      label: 'Project 5',
      title: 'ChatGPT-vakantieplanner',
      text: 'Ik heb een vakantieplanner ontwikkeld in ChatGPT. Dit product laat zien hoe ik AI heb ingezet om een praktisch planningsvraagstuk te structureren, keuzes inzichtelijk te maken en gebruikers stapsgewijs te begeleiden naar een passend plan.',
      points: [
        'Eigen ontwikkeling: een AI-hulpmiddel dat informatie ordent en vertaalt naar een concreet plan.',
        'Professionele waarde: laat zien dat ik digitale tools kan ontwerpen voor gebruiksgemak, planning en besluitvorming.',
        'Nog aanvullen: doelgroep, belangrijkste functies, voorbeeldoutput en welke ontwerpkeuzes ik bewust heb gemaakt.'
      ],
      featured: false
    },
    {
      label: 'Project 6',
      title: 'ChatGPT-afstudeerbegeleider',
      text: 'Ik heb een afstudeerbegeleider ontwikkeld in ChatGPT. Dit hulpmiddel is bedoeld om structuur, richting en reflectie te geven tijdens een afstudeerproces, bijvoorbeeld bij planning, onderzoeksvragen, feedbackverwerking en voortgang.',
      points: [
        'Eigen ontwikkeling: een begeleidende AI-omgeving voor studie- en onderzoeksprocessen.',
        'Professionele waarde: ondersteunt eigenaarschap, structuur en kritische vragen tijdens een complex traject.',
        'Nog aanvullen: hoe de begeleider werkt, welke problemen hij oplost en hoe ik kwaliteit/bruikbaarheid heb getest.'
      ],
      featured: false
    },
    {
      label: 'Project 7',
      title: 'ChatGPT-begeleider groenbeheer Moscowa',
      text: 'Ik heb een begeleider ontwikkeld rond groenbeheer van Moscowa. Dit is een belangrijk hoofdproduct waarin ik veel werk heb gestoken. Het laat zien hoe ik informatie over groenbeheer kan structureren en vertalen naar begeleiding, analyse of advies.',
      points: [
        'Eigen ontwikkeling: een AI-hulpmiddel gericht op groenbeheer en stedelijke leefomgeving.',
        'Circulaire relevantie: koppeling mogelijk met biodiversiteit, klimaatadaptatie, openbare ruimte en duurzaam beheer.',
        'Nog aanvullen: precieze context, doelgroep, functies, gebruikte bronnen/afwegingen en voorbeelden van output.'
      ],
      featured: false
    }
  ],
  process: [
    {
      title: 'Vraagstuk scherp maken',
      text: 'Ik begon steeds bij de vraag achter de opdracht: welk probleem moet worden opgelost, voor wie is het relevant en welke circulaire of professionele waarde kan het opleveren? Dat gold voor onderwijs, opdrachtontwikkeling, projectbegeleiding en AI-hulpmiddelen.'
    },
    {
      title: 'Vertalen naar bruikbare producten',
      text: 'Ik heb ideeën omgezet naar producten die anderen kunnen gebruiken: een lesprogramma, een bouwinstructie, een opdrachtbrief, een beoordelingsmoment en AI-hulpmiddelen voor planning, begeleiding en groenbeheer.'
    },
    {
      title: 'Keuzes onderbouwen',
      text: 'Mijn keuzes draaiden om uitvoerbaarheid, doelgroep, leerwaarde en gebruiksgemak. Bij de AI-hulpmiddelen moet ik vooral laten zien waarom ik bepaalde functies, vragen en structuur heb gekozen.'
    },
    {
      title: 'Reflecteren en aanscherpen',
      text: 'In mijn reflectie moet ik expliciet maken wat goed werkte, welke aannames ik had en wat ik anders zou doen. Vooral de koppeling tussen productkwaliteit, praktijkwaarde, AI-gebruik en mijn eigen professionele ontwikkeling moet scherp worden.'
    }
  ],
  products: [
    {
      title: 'Wormenhotel-lesprogramma',
      text: 'Bewijs voor professionele kwaliteit: uitgewerkt onderwijsprogramma met achtergrond, leerdoelen, hoofvraag, projectfases, monitoring, reflectie en formatieve beoordeling.'
    },
    {
      title: 'Wormenhotelbouw-handleiding',
      text: 'Bewijs voor praktische uitvoerbaarheid: drie bouwopties met benodigdheden, stappen en bronnen. Dit maakt het lesprogramma concreet toepasbaar.'
    },
    {
      title: 'Sjabloon opdrachtbrief',
      text: 'Bewijs voor professioneel redeneren: een hulpmiddel waarmee de minor toekomstige opdrachten scherper kan beoordelen en structureren voordat studenten starten.'
    },
    {
      title: 'Tussentijdse beoordeling bodemverzuring',
      text: 'Bewijs voor professionele rolname: ik trad op als opdrachtgever/begeleider en gaf inhoudelijke feedback op projectopzet, voorstudie, proces en communicatie.'
    },
    {
      title: 'ChatGPT-vakantieplanner',
      text: 'Bewijs voor digitale productontwikkeling: een door mij ontwikkeld AI-hulpmiddel dat planning, keuzes en gebruikersbegeleiding ondersteunt.'
    },
    {
      title: 'ChatGPT-afstudeerbegeleider',
      text: 'Bewijs voor begeleiding en structuur: een AI-hulpmiddel dat studenten kan helpen bij onderzoek, planning, reflectie en voortgang in een afstudeerproces.'
    },
    {
      title: 'ChatGPT-begeleider groenbeheer Moscowa',
      text: 'Bewijs voor verdieping: een hoofdproduct rond groenbeheer waarin ik AI inzet om informatie, analyse en begeleiding te structureren.'
    },
    {
      title: 'Nog toevoegen: reflectiedocument',
      text: 'Belangrijk voor maximale score: voeg een persoonlijk reflectiedocument toe waarin ik per criterium mijn keuzes, aannames, beperkingen, leerproces en toekomstige handelen onderbouw.'
    }
  ],
  learning: [
    {
      title: 'Van idee naar toepasbaarheid',
      text: 'Ik heb geleerd dat circulaire economie pas sterk wordt als een idee praktisch uitvoerbaar wordt. Het wormenhotel laat dit zien: leerlingen ervaren een kringloop door zelf te bouwen, te verzorgen en te reflecteren.'
    },
    {
      title: 'Professioneler opdrachtdenken',
      text: 'Door het opdrachtbrief-sjabloon ben ik kritischer gaan kijken naar wat een goede opdracht nodig heeft: doel, context, eindproducten, planning, communicatie, randvoorwaarden en gewenste impact.'
    },
    {
      title: 'Eigenaarschap nemen',
      text: 'In het bodemverzuringsproject nam ik een andere positie in: niet alleen maker, maar ook begeleider/opdrachtgever. Dat vroeg om duidelijke feedback, professionele communicatie en denken vanuit de probleemeigenaar.'
    },
    {
      title: 'AI als professioneel hulpmiddel',
      text: 'Met de vakantieplanner, afstudeerbegeleider en groenbeheerbegeleider heb ik onderzocht hoe AI kan helpen om complexe informatie praktisch, begeleidend en bruikbaar te maken. Voor het assessment moet ik mijn ontwerpkeuzes en kwaliteitscontrole helder uitleggen.'
    }
  ],
  evidence: [
    {
      criterion: '1. Beroepsproducten',
      location: 'Wormenhotel-lesprogramma, bouw-handleiding, opdrachtbrief-sjabloon, bodemverzuring, vakantieplanner, afstudeerbegeleider en groenbeheerbegeleider.',
      status: 'Sterk, nog toelichten'
    },
    {
      criterion: '2. Eigenaarschap',
      location: 'Per project: mijn rol, mijn keuzes, mijn bijdrage en wat ik kan verdedigen bij doorvragen. Bij de AI-producten expliciet maken wat ik zelf heb ontworpen.',
      status: 'Prioriteit'
    },
    {
      criterion: '3. Reflectie',
      location: 'Leerproces en reflectiedocument: sterke/zwakke punten, aannames, beperkingen, AI-betrouwbaarheid en gevolgen voor toepasbaarheid.',
      status: 'Nog aanvullen'
    },
    {
      criterion: '4. Leerproces',
      location: 'Proceslijn en leerproces: waarom ik deze opdrachten en AI-hulpmiddelen koos en hoe vrijheid/eigen regie mijn ontwikkeling stuurden.',
      status: 'Nog verdiepen'
    },
    {
      criterion: '5. Groei circulaire professional',
      location: 'Leerproces: ontwikkeling in circulair denken, GreenComp, waardenreflectie, toekomstscenario’s, groenbeheer en toekomstig professioneel handelen.',
      status: 'Nog koppelen'
    }
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
  list.innerHTML = '<div class="table-row table-head" role="row"><span role="columnheader">Criterium</span><span role="columnheader">Waar staat het bewijs?</span><span role="columnheader">Status</span></div>';
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
