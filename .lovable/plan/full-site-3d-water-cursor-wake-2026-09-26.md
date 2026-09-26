# Full-site 3D water cursor wake

## Changes
- Replace the existing soft cursor glow with a high-definition water wake that follows mouse movement across every public page.
- Create a boat-like split wake behind the pointer using layered water crests, foam bubbles, droplets, and expanding ripples.
- Keep the effect behind clickable content so navigation, forms, and buttons continue working normally.
- Reduce particle density automatically on slower screens and disable the effect for touch devices or reduced-motion preferences.

## Technical details
- Use one optimized full-screen canvas effect shared by the existing page layout, with device-pixel-ratio rendering for crisp detail.
- Animate particles through a reusable pool rather than creating page elements continuously.
- Use the site’s blue, white, and orange visual tokens for water highlights and reflections.
- Verify pointer movement, scrolling, button clicks, desktop rendering, mobile behavior, and build health.
