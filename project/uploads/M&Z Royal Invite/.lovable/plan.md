## Goal

Replace the current SVG monogram + intro loader with a luxury embossed look that matches your uploaded reference: a large circular bronze/gold ornate medallion with elegant "M&Z" calligraphy, sitting on a cream paper with arabesque embossed patterns and a soft envelope flap, ending with the line "YOU ARE INVITED FOR OUR SPECIAL DAY". All other sections (Couple, Countdown, Events, Venue, Timeline, RSVP, Gallery, Gift, Closing) stay exactly as they are.

## Approach

1. **Generate the hero artwork as an AI image** (premium quality) using your reference as the visual target:
   - Top-down luxury wedding invitation
   - Cream/ivory paper with embossed Islamic arabesque pattern
   - Soft envelope flap at top
   - Large circular bronze medallion centered, ornate floral/arabesque carving
   - Elegant intertwined "M & Z" calligraphy in warm gold at the center
   - Tagline area at the bottom
   - Saved as `src/assets/hero-medallion.jpg`

2. **Rebuild `IntroLoader.tsx`** as a full-bleed cover screen:
   - Background = the generated medallion image (object-cover, centered)
   - Subtle Ken-Burns slow zoom (Framer Motion)
   - Gold-foil shimmer overlay sweeping across the medallion
   - Bottom: "YOU ARE INVITED FOR OUR SPECIAL DAY" in Cinzel, gold, letter-spaced
   - "Open Invitation" button with gold border + shimmer, triggers music + reveals the rest
   - Soft fade-out into the main page

3. **Rebuild `Hero.tsx`** (first section after intro) to echo the same language:
   - Same embossed cream paper background (CSS pattern + soft vignette)
   - Smaller version of the medallion image floating with gentle parallax
   - "Mahbubul & Zarin" in Cormorant italic
   - "We are getting married" tagline (Cinzel, tracked)
   - Date pill "16 · 07 · 2026"
   - Scroll cue chevron

4. **Add a reusable embossed paper texture** to `src/styles.css`:
   - Subtle SVG arabesque pattern as a background utility (`.paper-arabesque`)
   - Warm radial vignette for depth
   - Used by IntroLoader + Hero so they feel like one continuous card

5. **Fix the hydration warning** in the current `Monogram.tsx` (numeric SVG coords differ between server/client) by rounding the computed line coordinates. Monogram stays in code as a fallback / used elsewhere if needed, but the hero will use the image.

## Files touched

- `src/assets/hero-medallion.jpg` *(new, AI-generated, premium)*
- `src/components/wedding/IntroLoader.tsx` *(rewrite)*
- `src/components/wedding/Hero.tsx` *(rewrite)*
- `src/components/wedding/Monogram.tsx` *(round coords — fixes hydration warning)*
- `src/styles.css` *(add `.paper-arabesque` utility + vignette)*

Nothing else changes — Countdown, Couple, Events, Venue, Timeline, RSVP, Gallery, Gift, Closing, MusicToggle, admin, and the RSVP backend all stay intact.

## Notes

- The medallion image is generated once and bundled, so it loads fast and is consistent on every device.
- If you later want to swap the medallion for a real photo of your printed invite, you just replace `src/assets/hero-medallion.jpg`.

Shall I proceed?