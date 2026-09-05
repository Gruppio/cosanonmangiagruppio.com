# Cosa non mangia Gruppio?

Sito statico personale con l’elenco dei cibi che Gruppio non mangia e una serie
di statistiche rigorosamente stimate.

## Modificare i contenuti

Le categorie rifiutate, le frequenze alimentari, le porzioni e le ipotesi dei
contatori si trovano in [`content.js`](content.js). Non servono database o
pannelli di amministrazione.

## Anteprima locale

Avvia un server statico dalla cartella del progetto:

```sh
python3 -m http.server 8000
```

Poi visita <http://localhost:8000>.

## Pubblicazione

Ogni push su `main` attiva il workflow GitHub Pages. Il dominio personalizzato è
definito in `CNAME` come `cosanonmangiagruppio.com`.
