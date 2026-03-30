# CLAUDE.md — AI Assistant Guide for HellowWorld

## Project Overview

**HellowWorld** is a static HTML website serving as a collection of Appalachian Trail (AT) hiking guides and a Sumner Material Lift parts sales reference. It has zero build dependencies — no npm, no framework, no bundler. All pages are standalone HTML5 files with embedded CSS.

---

## Repository Structure

```
HellowWorld/
├── index.html              # Home page / navigation hub
├── shelters.html           # Top 5 AT shelters guide
├── neel-gap-guide.html     # Day hike guide north from Neel Gap (~12 mi, strenuous)
├── sumner-parts.html       # Sumner Material Lift parts sales reference
├── hiawassee-shuttle.html  # Shuttle options to Hiawassee from the AT
├── low-gap-resupply.html   # Resupply guide from Low Gap Shelter
├── hostel-vs-hotel.html    # Green Dragon Hostel vs. hotel comparison for AT Georgia
├── README.md               # Minimal repo description
└── CLAUDE.md               # This file
```

---

## Tech Stack

- **HTML5** — semantic markup, proper doctype, `lang="en"`
- **CSS3** — embedded `<style>` blocks per page (no external stylesheets)
- **No JavaScript** — fully static, no interactivity
- **No dependencies** — no package.json, no node_modules, no build tools
- **No CI/CD** — no automated testing or deployment pipelines

---

## Development Workflow

### Making Changes

1. Edit HTML files directly — no build step required
2. Open in a browser to verify visually
3. Commit with a descriptive message (see commit conventions below)
4. Push to the active feature branch

### Git Conventions

Branch naming: `claude/<feature-description>-<id>` (e.g. `claude/add-claude-documentation-33Iwe`)

Commit message style observed in this repo:
- Imperative mood, sentence case
- Specific and descriptive (e.g. `Add resupply guide from Low Gap Shelter with shuttles and tap-to-call contacts`)
- No ticket numbers or scope prefixes

### No Tests

There are no automated tests. QA is done manually by reviewing page content for accuracy (distances, elevations, pricing, contact numbers).

---

## HTML & CSS Conventions

All pages follow these patterns — maintain consistency when adding or editing pages.

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <style>
    /* embedded styles here */
  </style>
</head>
<body>
  <!-- content -->
</body>
</html>
```

### CSS Conventions

**Universal reset** — always include:
```css
* { box-sizing: border-box; margin: 0; padding: 0; }
```

**Color palette** — use these values consistently:

| Role | Value |
|---|---|
| Page background | `#f0f4f8` |
| Body text | `#2d3748` |
| Primary links | `#3182ce` / `#2b6cb0` |
| Section headers | `#2b6cb0` |
| Success / positive | `#38a169` / `#276749` |
| Warning / caution | `#f6ad55` |
| Error / danger | `#e53e3e` |
| Card background | `#ffffff` |

**Layout:**
- Use **flexbox** for all layouts (`display: flex`, `flex-wrap: wrap`)
- Cards: white background, `border-radius: 6–8px`, `box-shadow: 0 2px 6px rgba(0,0,0,0.08)`, consistent padding
- Typography: `font-family: sans-serif`, rem-based sizing

**Component patterns:**
- **Alert/info boxes:** left border accent, color-coded background (see existing pages for examples)
- **Tables:** striped rows (`tr:nth-child(even)`), hover highlight, `overflow-x: auto` wrapper for responsiveness
- **Buttons/call-to-action links:** inline-block, background color matching primary or accent palette, `border-radius`, padding

### Navigation

Every page should include a back link to `index.html`. Pattern:
```html
<a href="index.html">← Back to Home</a>
```

---

## Content Guidelines

### Appalachian Trail Pages

- Verify distances and elevations against authoritative sources (AWOL AT Guide, Guthook/FarOut)
- Include tap-to-call links for shuttle/hostel phone numbers: `<a href="tel:+1XXXXXXXXXX">(XXX) XXX-XXXX</a>`
- Use realistic, hiker-relevant warnings (water sources, bail-out points, weather)
- Mileages should be directional (NOBO/SOBO context noted where relevant)

### Sumner Parts Page

- Pricing and supplier links must reflect current catalog data
- Each part entry should include: part name, part number, price, and supplier
- Maintain the sales reference format — this is a quick-lookup tool

---

## Key Files to Understand

| File | Purpose |
|---|---|
| `index.html` | Entry point; lists all guides with nav links |
| `shelters.html` | Static content guide; good simple template example |
| `sumner-parts.html` | Most complex page (566 lines); demonstrates table and card patterns |
| `hostel-vs-hotel.html` | Most recent addition; clean example of current conventions |

---

## What NOT to Do

- Do not introduce JavaScript, npm, or any build tooling unless explicitly requested
- Do not use external CSS frameworks (Bootstrap, Tailwind, etc.)
- Do not add external fonts or icon libraries (keep pages self-contained)
- Do not split CSS into separate `.css` files — keep styles embedded per page
- Do not add a backend or server-side logic — this is a static site
