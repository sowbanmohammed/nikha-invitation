# Royal Nikah Invitation

Interactive Nikah invitation built with React, Vite, Tailwind CSS, GSAP, Lenis and Canvas.

## Features

- Thick satin bow/ribbon drag interaction
- Knot opening reveal
- Royal emerald + antique-gold aesthetic
- Bride and groom names as the first revealed content
- Palace-style venue scene
- Canvas scratch-to-reveal wedding date
- Paper-pop style confetti burst
- Countdown revealed only after scratching
- Arabic duas with English meanings
- Mobile-first touch support

## Run

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Customize

Edit:

`src/data/weddingData.js`

Change the bride, groom, venue, date and time.

The countdown target is currently:

`2026-10-18T19:00:00+05:30`

If the Nikah time changes, update it in:

`src/components/scratch/ScratchDate.jsx`

## Notes

The palace is intentionally created with CSS so the project does not depend on paid images or 3D assets. High-quality palace imagery can be added later if desired.

The Arabic duas should be reviewed by the family/scholar before publishing if exact religious wording is important.
