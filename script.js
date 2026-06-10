const storageKey = 'minor-ce-portfolio-content-v3';
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
    heroTitle: 'Assessmentportfolio: beroepsproducten, eigenaarschap en groei',
    heroCopy: 'In dit portfolio laat ik zien welke producten ik zelf heb ontwikkeld, welke keuzes ik daarin heb gemaakt en hoe ik ben gegroeid als circulaire professional. De nadruk ligt op praktijkwaarde, professionele redenering, reflectie en mijn eigen rol.',
    introOneTitle: 'Beroepsproducten met praktijkwaarde',
    introOneText: 'Mijn bewijs bestaat uit concrete producten voor onderwijs, opdrachtontwikkeling, projectbegeleiding en zelfontwikkelde AI-hulpmiddelen.',
    introTwoTitle: 'Eigenaarschap scherp zichtbaar',
    introTwoText: 'Per project benoem ik mijn eigen bijdrage, mijn ontwerpkeuzes en wat ik inhoudelijk kan verdedigen bij kritische vragen.',
    introThreeTitle: 'Reflectie en ontwikkeling',
    introThreeText: 'Ik verbind mijn producten aan circulair denken, professioneel handelen, verantwoord AI-gebruik en mijn ontwikkeling tijdens de minor.',
    projectsTitle: 'Projecten en eigen bijdrage',
    projectsIntro: 'Deze projecten vormen de kern van mijn bewijsmateriaal. Ik laat per onderdeel zien wat het vraagstuk was, wat mijn rol was en welke waarde het product of proces oplevert.',
    processTitle: 'Mijn werkwijze',
    processIntro: 'Mijn proces laat zien hoe ik van een vraagstuk naar een bruikbaar product ben gegaan, en hoe ik mijn keuzes onderweg heb aangescherpt.',
    productsTitle: 'Beroepsproducten',
    productsIntro: 'Deze producten gebruik ik als bewijs voor professionele kwaliteit, eigenaarschap, reflectie en groei als circulaire professional.',
    learningTitle: 'Leerproces en reflectie',
    learningIntro: 'Mijn leerproces laat zien hoe ik steeds bewuster ben gaan werken vanuit circulariteit, praktijkwaarde, eigenaarschap en verantwoord gebruik van AI.',
    evidenceTitle: 'Beoordelingsbewijs per criterium',
    evidenceIntro: 'Deze matrix koppelt de vijf assessmentcriteria direct aan mijn bewijsmateriaal en mijn toelichting tijdens het gesprek.',
    footerText: 'Portfolio Minor Circulaire Economie - Robert-Jan Laan'
  },
  projects: [
    {
      label: 'Project 1',
      title: 'Wormenhotel-lesprogramma',
      text: 'Ik heb een lesprogramma ontwikkeld voor leerlingen van 12-14 jaar rondom duurzaamheid, circulariteit en klimaat. De kernvraag is hoe organisch afval kan worden omgezet in iets waardevols voor de natuur. Het eindproduct is een werkend wormenhotel dat leerlingen bouwen, onderhouden, monitoren en gebruiken.',
      points: [
        'Mijn bijdrage: ik werkte het programma uit met visie, leerdoelen, projectfases, werkvormen en formatieve beoordeling.',
        'Professionele keuze: ik koos voor leren door doen, omdat leerlingen circulariteit sterker begrijpen wanneer zij de kringloop zelf ervaren.',
        'Praktijkwaarde: het programma is inzetbaar in onderbouw VO/Agora en koppelt afval, bodem, biodiversiteit, klimaat en verantwoordelijkheid.',
        'Assessmentwaarde: toont inhoudelijke samenhang, doelgroepgericht ontwerpen en een concreet beroepsproduct.'
      ],
      featured: true
    },
    {
      label: 'Project 2',
      title: 'Handleiding wormenhotel bouwen',
      text: 'Als vervolg op het lesprogramma heb ik een praktische handleiding gemaakt met drie manieren om een wormenhotel te bouwen: met emmers, opbergbakken of een houten kist. Daardoor is het lesidee ook praktisch uitvoerbaar.',
      points: [
        'Mijn bijdrage: ik vertaalde het concept naar materialen, stappen en bouwvarianten.',
        'Professionele keuze: meerdere varianten maken het product bruikbaar voor verschillende budgetten, materialen en begeleidingsniveaus.',
        'Praktijkwaarde: leerlingen en begeleiders kunnen direct starten met bouwen en leren door experimenteren.',
        'Reflectiepunt: veiligheid, onderhoud en continuïteit moeten in uitvoering goed begeleid worden.'
      ],
      featured: false
    },
    {
      label: 'Project 3',
      title: 'Sjabloon opdrachtbrief voor de minor',
      text: 'Ik heb een opdrachtbrief-sjabloon gemaakt waarmee toekomstige opdrachtgevers hun opdracht duidelijker kunnen formuleren. Het sjabloon helpt om doel, aanleiding, eindproducten, planning, communicatie, randvoorwaarden en gewenste impact vooraf scherp te krijgen.',
      points: [
        'Mijn bijdrage: ik ontwierp een vaste structuur voor opdrachtgever, studententeam en minorbegeleider.',
        'Professionele keuze: ik legde nadruk op concrete uitvoerbaarheid, deadlines, contactmomenten en verwachtingen.',
        'Praktijkwaarde: de minor kan hiermee opdrachten beter beoordelen voordat studenten starten.',
        'Assessmentwaarde: toont dat ik niet alleen uitvoer, maar ook processen rond opdrachtkwaliteit kan verbeteren.'
      ],
      featured: false
    },
    {
      label: 'Project 4',
      title: 'Begeleiding bodemverzuringsproject',
      text: 'Voor het project over zure bodems in Nederland heb ik gefunctioneerd als opdrachtgever en begeleider. Ik hielp een groep om het vraagstuk te vertalen naar een onderzoekbare opdracht en gaf tussentijdse beoordeling op product, proces en professionele communicatie.',
      points: [
        'Mijn rol: begeleider/opdrachtgever namens het vraagstuk rond bodemverzuring.',
        'Bewijs: tussentijdse beoordeling van 27-05-2026 met feedback op projectopzet, voorstudie en proces.',
        'Professionele keuze: ik keek niet alleen naar inhoud, maar ook naar initiatief, communicatie en verplaatsen in de probleemeigenaar.',
        'Leerwaarde: dit project laat zien dat ik ook vanuit een begeleidende en beoordelende positie kan werken.'
      ],
      featured: false
    },
    {
      label: 'Project 5',
      title: 'ChatGPT-vakantieplanner',
      text: 'Ik heb een vakantieplanner ontwikkeld in ChatGPT. Dit product laat zien hoe ik AI heb ingezet om een praktisch planningsvraagstuk te structureren, keuzes inzichtelijk te maken en gebruikers stap voor stap te begeleiden naar een passend plan.',
      points: [
        'Mijn bijdrage: ik ontwierp de gespreksstructuur, keuzevragen en manier waarop informatie wordt vertaald naar een concreet plan.',
        'Professionele keuze: de planner moet eerst behoefte, randvoorwaarden en voorkeuren ophalen voordat hij advies geeft.',
        'Praktijkwaarde: het hulpmiddel ondersteunt planning, overzicht en besluitvorming.',
        'Reflectiepunt: AI-output moet gecontroleerd worden op haalbaarheid, actualiteit en aannames.'
      ],
      featured: false
    },
    {
      label: 'Project 6',
      title: 'ChatGPT-afstudeerbegeleider',
      text: 'Ik heb een afstudeerbegeleider ontwikkeld in ChatGPT. Dit hulpmiddel is bedoeld om structuur, richting en reflectie te geven tijdens een afstudeerproces, bijvoorbeeld bij planning, onderzoeksvragen, feedbackverwerking en voortgang.',
      points: [
        'Mijn bijdrage: ik ontwierp een begeleidende AI-omgeving die studenten helpt om hun proces te ordenen.',
        'Professionele keuze: de begeleider geeft niet alleen antwoorden, maar stelt ook kritische vragen over doel, methode, planning en bewijs.',
        'Praktijkwaarde: ondersteunt eigenaarschap, voortgang en reflectie bij een complex studieproces.',
        'Assessmentwaarde: toont dat ik begeleiding kan vertalen naar een digitaal hulpmiddel met duidelijke leerfunctie.'
      ],
      featured: false
    },
    {
      label: 'Project 7',
      title: 'ChatGPT-begeleider groenbeheer Moscowa',
      text: 'Ik heb een begeleider ontwikkeld rond groenbeheer van Moscowa. Dit is een belangrijk hoofdproduct waarin ik veel werk heb gestoken. Het laat zien hoe ik informatie over groenbeheer kan structureren en vertalen naar begeleiding, analyse of advies.',
      points: [
        'Mijn bijdrage: ik bouwde een AI-hulpmiddel rond groenbeheer, stedelijke leefomgeving en praktische begeleiding.',
        'Circulaire relevantie: het product kan worden gekoppeld aan biodiversiteit, klimaatadaptatie, openbare ruimte en duurzaam beheer.',
        'Professionele keuze: de begeleider moet informatie ordenen en helpen om keuzes voor beheer beter te onderbouwen.',
        'Assessmentwaarde: dit is een hoofdproduct waarmee ik verdieping, digitale ontwikkeling en circulair professioneel denken kan laten zien.'
      ],
      featured: false
    }
  ],
  process: [
    {
      title: '1. Vraagstuk en waarde bepalen',
      text: 'Ik begon bij de vraag: welk probleem moet worden opgelost, voor wie is het relevant en welke duurzame of professionele waarde kan het opleveren? Zo werd afval een onderwijsbare kringloop, opdrachtintake een procesverbetering en groenbeheer een onderwerp voor gestructureerde AI-begeleiding.'
    },
    {
      title: '2. Vertalen naar bruikbare vorm',
      text: 'Ik heb ideeën omgezet naar producten die anderen kunnen gebruiken: een lesprogramma, een bouwinstructie, een opdrachtbrief, een beoordelingsrol en AI-hulpmiddelen voor planning, afstuderen en groenbeheer.'
    },
    {
      title: '3. Keuzes expliciet maken',
      text: 'Mijn keuzes draaiden om uitvoerbaarheid, doelgroep, leerwaarde, gebruiksgemak en professionele betrouwbaarheid. Bij de AI-hulpmiddelen hoort daar ook bij dat ik kritisch kijk naar aannames, controleerbaarheid en de rol van de gebruiker.'
    },
    {
      title: '4. Toepassen en beoordelen',
      text: 'Ik keek steeds of het product echt bruikbaar is in de praktijk. Bij het wormenhotel betekent dat bouwen en onderhouden; bij de opdrachtbrief duidelijke afspraken; bij bodemverzuring feedback op proces; bij AI-hulpmiddelen bruikbare begeleiding en controleerbare output.'
    },
    {
      title: '5. Reflecteren en doorontwikkelen',
      text: 'Voor het assessment verbind ik elk product aan wat ik heb geleerd: waar mijn aanpak sterk was, welke aannames of beperkingen erin zitten en hoe ik deze ervaring meeneem in toekomstig professioneel handelen.'
    }
  ],
  products: [
    {
      title: 'Wormenhotel-lesprogramma',
      text: 'Bewijs voor professionele kwaliteit: uitgewerkt onderwijsprogramma met achtergrond, leerdoelen, hoofdvraag, projectfases, monitoring, reflectie en formatieve beoordeling.'
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
      title: 'Assessmenttoelichting',
      text: 'Tijdens het assessment licht ik per product toe wat mijn eigen bijdrage was, welke keuzes ik heb gemaakt, welke beperkingen ik zie en hoe het product waarde heeft voor praktijk of vraagstuk.'
    }
  ],
  learning: [
    {
      title: 'Van circulair idee naar gedrag',
      text: 'Door het wormenhotel leerde ik dat circulariteit sterker wordt wanneer mensen het kunnen doen en ervaren. Afval wordt dan geen abstract begrip, maar onderdeel van een zichtbare kringloop.'
    },
    {
      title: 'Van losse opdracht naar professionele intake',
      text: 'Door de opdrachtbrief ben ik kritischer gaan kijken naar opdrachtkwaliteit. Een goed duurzaam project vraagt niet alleen een interessant thema, maar ook duidelijke doelen, rolverdeling, randvoorwaarden en contactmomenten.'
    },
    {
      title: 'Van maker naar begeleider',
      text: 'Bij het bodemverzuringsproject nam ik een andere positie in: ik was niet alleen uitvoerder, maar ook begeleider/opdrachtgever. Dat vroeg om afstand nemen, feedback geven en denken vanuit de probleemeigenaar.'
    },
    {
      title: 'AI als professioneel hulpmiddel',
      text: 'Met de vakantieplanner, afstudeerbegeleider en groenbeheerbegeleider heb ik onderzocht hoe AI complexe informatie praktisch en begeleidend kan maken. Ik heb daarbij geleerd dat de waarde niet alleen in output zit, maar vooral in goede vragen, structuur en controle.'
    },
    {
      title: 'Toekomstig handelen',
      text: 'Ik neem mee dat ik in toekomstige projecten eerder mijn aannames expliciet wil maken, bewijs wil verzamelen tijdens het proces en digitale hulpmiddelen wil toetsen op betrouwbaarheid, bruikbaarheid en maatschappelijke waarde.'
    }
  ],
  evidence: [
    {
      criterion: '1. Beroepsproducten',
      location: 'Alle zeven projecten tonen concrete producten of rollen: lesprogramma, handleiding, opdrachtbrief, bodemverzuring, vakantieplanner, afstudeerbegeleider en groenbeheerbegeleider.',
      status: 'Bewijs aanwezig'
    },
    {
      criterion: '2. Eigenaarschap',
      location: 'Per project staat mijn bijdrage, keuze en rol benoemd. In het gesprek moet ik vooral de AI-producten en het groenbeheer Moscowa scherp kunnen toelichten.',
      status: 'Hoogste prioriteit'
    },
    {
      criterion: '3. Reflectie',
      location: 'Leerproces en assessmenttoelichting benoemen sterke punten, aannames, beperkingen, AI-betrouwbaarheid en toepasbaarheid.',
      status: 'Mondeling verdiepen'
    },
    {
      criterion: '4. Leerproces',
      location: 'Proceslijn en leerproces laten zien waarom ik deze opdrachten oppakte en hoe mijn rol verschoof van maker naar begeleider en ontwerper van hulpmiddelen.',
      status: 'Bewijs aanwezig'
    },
    {
      criterion: '5. Groei circulaire professional',
      location: 'Wormenhotel, bodemverzuring en groenbeheer Moscowa tonen groei in circulair denken; opdrachtbrief en AI-producten tonen groei in professioneel handelen.',
      status: 'Goed koppelen'
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
