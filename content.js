/*
 * Contenuti e ipotesi del sito.
 *
 * Per aggiungere un cibo che Gruppio non mangia, copia uno degli oggetti in
 * `refusals`, modifica testo e icona e lascia la virgola tra gli elementi.
 * Le icone disponibili sono: water, mushroom, zucchini, spinach, ricotta.
 */
window.SITE_DATA = {
  dates: {
    birth: "1988-10-03T00:00:00+01:00",
    foodStart: "1990-10-03T00:00:00+01:00",
  },

  refusals: [
    {
      icon: "water",
      name: "Tutto ciò che vive nell’acqua",
      note: "Pesce, crostacei, molluschi e qualunque altra creatura abbia scelto l’acqua come casa.",
    },
    { icon: "mushroom", name: "Funghi", note: "No." },
    { icon: "zucchini", name: "Zucchine", note: "No." },
    { icon: "spinach", name: "Spinaci", note: "No." },
    { icon: "ricotta", name: "Ricotta", note: "No." },
  ],

  foods: [
    {
      id: "piadine",
      label: "Piadine col prosciutto",
      shortLabel: "piadina",
      perWeek: 3,
      portionKg: 0.2,
      accent: "#ffb238",
    },
    {
      id: "tagliatelle",
      label: "Tagliatelle al ragù",
      shortLabel: "piatto",
      perWeek: 3,
      portionKg: 0.3,
      accent: "#e85032",
    },
    {
      id: "hamburger",
      label: "Hamburger",
      shortLabel: "hamburger",
      perWeek: 2,
      portionKg: 0.25,
      accent: "#9fc56b",
    },
  ],

  biological: {
    fartsPerDay: 20,
    fecesKgPerDay: 0.15,
  },
};
