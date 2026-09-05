(() => {
  "use strict";

  const data = window.SITE_DATA;
  const DAY_MS = 24 * 60 * 60 * 1000;
  const WEEK_MS = 7 * DAY_MS;
  const numberFormatter = new Intl.NumberFormat("it-IT");
  const decimalFormatter = new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
  const clockFormatter = new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const foodStart = new Date(data.dates.foodStart);
  const birth = new Date(data.dates.birth);

  function elapsedSince(start, now) {
    return Math.max(0, now.getTime() - start.getTime());
  }

  function formatDuration(milliseconds) {
    const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) return `${days}g ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  }

  function createIcon(iconName) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    svg.setAttribute("viewBox", "0 0 64 64");
    svg.setAttribute("aria-hidden", "true");
    use.setAttribute("href", `#icon-${iconName}`);
    svg.append(use);
    return svg;
  }

  function renderRefusals() {
    const container = document.querySelector("#refusal-list");

    data.refusals.forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "refusal-card reveal";
      article.style.setProperty("--delay", `${index * 70}ms`);

      const number = document.createElement("span");
      number.className = "refusal-number";
      number.textContent = String(index + 1).padStart(2, "0");

      const icon = createIcon(item.icon);
      icon.classList.add("refusal-icon");

      const copy = document.createElement("div");
      const heading = document.createElement("h3");
      const note = document.createElement("p");
      heading.textContent = item.name;
      note.textContent = item.note;
      copy.append(heading, note);

      const verdict = document.createElement("span");
      verdict.className = "verdict";
      verdict.textContent = "NO";
      verdict.setAttribute("aria-label", "Verdetto: no");

      article.append(number, icon, copy, verdict);
      container.append(article);
    });
  }

  function renderFoodCards() {
    const container = document.querySelector("#food-stats");

    data.foods.forEach((food) => {
      const article = document.createElement("article");
      article.className = "stat-card reveal";
      article.style.setProperty("--accent", food.accent);
      article.dataset.food = food.id;

      const eyebrow = document.createElement("p");
      eyebrow.className = "stat-frequency";
      eyebrow.textContent = `${food.perWeek} a settimana · ${numberFormatter.format(food.portionKg * 1000)} g l’una`;

      const heading = document.createElement("h3");
      heading.textContent = food.label;

      const countBlock = document.createElement("div");
      countBlock.className = "stat-number-block";
      const count = document.createElement("strong");
      count.dataset.value = "count";
      count.textContent = "0";
      const countLabel = document.createElement("span");
      countLabel.textContent = "porzioni stimate";
      countBlock.append(count, countLabel);

      const kilograms = document.createElement("p");
      kilograms.className = "kilograms";
      const kgValue = document.createElement("strong");
      kgValue.dataset.value = "kg";
      kgValue.textContent = "0,000";
      kilograms.append(kgValue, document.createTextNode(" kg mangiati"));

      const progressLabel = document.createElement("div");
      progressLabel.className = "progress-label";
      const nextLabel = document.createElement("span");
      nextLabel.textContent = `Prossim${food.shortLabel.endsWith("a") ? "a" : "o"} ${food.shortLabel}`;
      const countdown = document.createElement("span");
      countdown.dataset.value = "countdown";
      progressLabel.append(nextLabel, countdown);

      const progress = document.createElement("div");
      progress.className = "progress-track";
      progress.setAttribute("role", "progressbar");
      progress.setAttribute("aria-label", `Avanzamento verso la prossima porzione di ${food.label}`);
      progress.setAttribute("aria-valuemin", "0");
      progress.setAttribute("aria-valuemax", "100");
      const progressFill = document.createElement("span");
      progressFill.dataset.value = "progress";
      progress.append(progressFill);

      article.append(eyebrow, heading, countBlock, kilograms, progressLabel, progress);
      container.append(article);
    });
  }

  function renderBiologicalCards() {
    const container = document.querySelector("#biological-stats");

    const definitions = [
      {
        id: "farts",
        index: "A",
        label: "Scoregge",
        description: `${data.biological.fartsPerDay} al giorno. Minimo sindacale.`,
        unit: "scoregge stimate",
      },
      {
        id: "feces",
        index: "B",
        label: "Merda cagata",
        description: `${numberFormatter.format(data.biological.fecesKgPerDay * 1000)} grammi al giorno.`,
        unit: "kg stimati",
      },
    ];

    definitions.forEach((definition) => {
      const article = document.createElement("article");
      article.className = "bio-card reveal";
      article.dataset.biological = definition.id;

      const index = document.createElement("span");
      index.className = "bio-index";
      index.textContent = definition.index;

      const copy = document.createElement("div");
      const heading = document.createElement("h3");
      heading.textContent = definition.label;
      const description = document.createElement("p");
      description.textContent = definition.description;
      copy.append(heading, description);

      const valueBlock = document.createElement("div");
      valueBlock.className = "bio-value";
      const value = document.createElement("strong");
      value.dataset.value = "value";
      value.textContent = "0";
      const unit = document.createElement("span");
      unit.textContent = definition.unit;
      valueBlock.append(value, unit);

      article.append(index, copy, valueBlock);
      container.append(article);
    });
  }

  function renderMethod() {
    const container = document.querySelector("#method-list");
    const items = [
      ["Data di nascita", "3 ottobre 1988"],
      ["Inizio stime alimentari", "3 ottobre 1990 (2 anni)"],
      ["Piadina col prosciutto", "3/settimana × 0,20 kg"],
      ["Tagliatelle al ragù", "3/settimana × 0,30 kg"],
      ["Hamburger", "2/settimana × 0,25 kg"],
      ["Scoregge", `${data.biological.fartsPerDay}/giorno dalla nascita`],
      ["Merda", `${numberFormatter.format(data.biological.fecesKgPerDay * 1000)} g/giorno dalla nascita`],
    ];

    items.forEach(([term, definition]) => {
      const wrapper = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = term;
      dd.textContent = definition;
      wrapper.append(dt, dd);
      container.append(wrapper);
    });
  }

  function updateCounters() {
    const now = new Date();
    const foodElapsed = elapsedSince(foodStart, now);
    const lifeElapsed = elapsedSince(birth, now);

    data.foods.forEach((food) => {
      const card = document.querySelector(`[data-food="${food.id}"]`);
      const exactCount = (foodElapsed / WEEK_MS) * food.perWeek;
      const wholeCount = Math.floor(exactCount);
      const interval = WEEK_MS / food.perWeek;
      const progress = exactCount - wholeCount;
      const untilNext = interval * (1 - progress);

      card.querySelector('[data-value="count"]').textContent = numberFormatter.format(wholeCount);
      card.querySelector('[data-value="kg"]').textContent = decimalFormatter.format(
        exactCount * food.portionKg,
      );
      card.querySelector('[data-value="countdown"]').textContent = formatDuration(untilNext);
      const progressBar = card.querySelector(".progress-track");
      const progressValue = Math.min(100, progress * 100);
      progressBar.setAttribute("aria-valuenow", progressValue.toFixed(2));
      card.querySelector('[data-value="progress"]').style.transform = `scaleX(${progress})`;
    });

    const daysAlive = lifeElapsed / DAY_MS;
    const fartCount = Math.floor(daysAlive * data.biological.fartsPerDay);
    const fecesKg = daysAlive * data.biological.fecesKgPerDay;
    document.querySelector('[data-biological="farts"] [data-value="value"]').textContent =
      numberFormatter.format(fartCount);
    document.querySelector('[data-biological="feces"] [data-value="value"]').textContent =
      decimalFormatter.format(fecesKg);
    document.querySelector("#last-update").textContent = clockFormatter.format(now);
  }

  function setupRevealAnimations() {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
  }

  function setupShare() {
    const button = document.querySelector("#share-button");
    const feedback = document.querySelector("#share-feedback");
    const shareData = {
      title: document.title,
      text: "Finalmente sappiamo cosa non mangia Gruppio.",
      url: window.location.href,
    };

    button.addEventListener("click", async () => {
      try {
        if (navigator.share) {
          await navigator.share(shareData);
          feedback.textContent = "Dati diffusi con successo.";
          return;
        }

        await navigator.clipboard.writeText(window.location.href);
        feedback.textContent = "Link copiato. Ora diffondilo responsabilmente.";
      } catch (error) {
        if (error.name !== "AbortError") {
          feedback.textContent = "Copia il link dalla barra del browser e diffondi i dati.";
        }
      }
    });
  }

  renderRefusals();
  renderFoodCards();
  renderBiologicalCards();
  renderMethod();
  updateCounters();
  setupRevealAnimations();
  setupShare();
  document.querySelector("#current-year").textContent = new Date().getFullYear();
  window.setInterval(updateCounters, 1000);
})();
