# CLAUDE.md — AI Assistant Guide for HellowWorld

## Project Overview

**HellowWorld** is a static HTML website serving as a comprehensive Appalachian Trail (AT) hiking resource and a Sumner Material Lift parts sales reference. It has zero build dependencies — no npm, no framework, no bundler. All pages are standalone HTML5 files with embedded CSS and JavaScript where needed.

---

## Repository Structure

```
HellowWorld/
├── index.html                  # Home page / navigation hub
├── shelters.html               # Shelter showcase (top 5 AT shelters)
├── at-map.html                 # Interactive Leaflet map — 62 shelters (GA → Damascus, VA)
├── at-georgia-map.html         # Redirect → at-map.html (kept for backwards compatibility)
├── distance-calculator.html    # Shelter-to-shelter distance/elevation/sunset calculator
├── resupply-planner.html       # Interactive resupply planner with mileage/carry sliders
├── noc-nantahala.html          # Nantahala Outdoor Center guide
├── neel-gap-guide.html         # Day hike guide north from Neel Gap
├── hiawassee-shuttle.html      # Shuttle options to Hiawassee from the AT
├── low-gap-resupply.html       # Resupply guide from Low Gap Shelter
├── hostel-vs-hotel.html        # Green Dragon Hostel vs. hotel comparison
├── sumner-parts.html           # Sumner Material Lift parts sales reference
├── shelter-*.html              # 62 individual shelter pages (see below)
├── sw.js                       # Service worker for offline support
├── todo.md                     # Feature roadmap
├── README.md                   # Minimal repo description
└── CLAUDE.md                   # This file
```

### Shelter Pages (62 total)

Shelters are grouped by state/section and listed south-to-north (NOBO order):

**Georgia (11):** springer-mountain, stover-creek, hawk-mountain, gooch-mountain, blood-mountain, whitley-gap, low-gap-resupply, blue-mountain, tray-mountain, deep-gap, plumorchard-gap

**North Carolina — Pre-Smokies (14):** muskrat-creek, standing-indian, carter-gap, big-spring, rock-gap, siler-bald, cold-spring, wayah-bald, wesser-bald, rufus-morgan, sassafras-gap-nc, brown-fork-gap, cable-gap, fontana-dam

**Great Smoky Mountains NP (13):** birch-spring-gap, russell-field, mollies-ridge, spence-field, derrick-knob, silers-bald, double-spring-gap, mount-collins, icewater-spring, pecks-corner, tricorner-knob, cosby-knob, davenport-gap

**Davenport Gap to Hot Springs (4):** groundhog-creek, roaring-fork, walnut-mountain, deer-park-mountain

**Hot Springs to Erwin, TN (8):** spring-mountain, little-laurel, jerry-cabin, flint-mountain, hogback-ridge, bald-mountain, no-business-knob, curley-maple-gap

**Erwin, TN to Damascus, VA (12):** cherry-gap, clyde-smith, roan-high-knob, stan-murray, overmountain, mountaineer-falls, moreland-gap, laurel-fork, vandeventer, iron-mountain, double-springs, abingdon-gap

---

## Tech Stack

- **HTML5** — semantic markup, proper doctype, `lang="en"`
- **CSS3** — embedded `<style>` blocks per page (no external stylesheets)
- **JavaScript** — embedded `<script>` blocks for interactive pages
- **[Leaflet.js](https://leafletjs.com/) v1.9.4** — used in `at-map.html` for the interactive trail map (loaded via CDN)
- **[Open-Meteo API](https://open-meteo.com/)** — free, no-key weather API used in all 62 shelter pages for current conditions and 3-day forecast
- **NOAA solar algorithm** — pure JavaScript sunrise/sunset calculator (no API dependency), hardcoded to Eastern timezone (EDT/EST)
- **OpenStreetMap** — map tile provider for Leaflet
- **Service Worker** — `sw.js` provides offline caching (network-first HTML, cache-first tiles)
- **No build tools** — no package.json, no node_modules, no bundler, no CI/CD

---

## Development Workflow

### Making Changes

1. Edit HTML files directly — no build step required
2. Open in a browser to verify visually
3. Commit with a descriptive message (see conventions below)
4. Push to the active feature branch

### Git Conventions

Branch naming: `claude/<feature-description>-<id>` (e.g. `claude/explore-map-functionality-dftU2`)

Commit message style:
- Imperative mood, sentence case
- Specific and descriptive (e.g. `Add resupply guide from Low Gap Shelter with shuttles and tap-to-call contacts`)
- No ticket numbers or scope prefixes

### No Tests

There are no automated tests. QA is done manually by reviewing page content for accuracy (distances, elevations, pricing, contact numbers) and checking data consistency across at-map.html, distance-calculator.html, and individual shelter pages.

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
  <script>if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(function(){});}</script>
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
| Section headers (NC) | `#2b6cb0` |
| Section headers (GSMNP) | `#065f46` |
| AT green (map/header) | `#2d5a27` |
| Success / positive | `#38a169` / `#276749` |
| Warning / caution | `#f6ad55` |
| Error / danger | `#e53e3e` |
| Card background | `#ffffff` |

**Layout:**
- Use **flexbox** for all layouts (`display: flex`, `flex-wrap: wrap`)
- Cards: white background, `border-radius: 6–8px`, `box-shadow: 0 2px 6px rgba(0,0,0,0.08)`, consistent padding
- Typography: `font-family: sans-serif`, rem-based sizing

**Component patterns:**
- **Alert/info boxes:** left border accent, color-coded background
- **Tables:** striped rows (`tr:nth-child(even)`), hover highlight, `overflow-x: auto` wrapper for responsiveness
- **Buttons/call-to-action links:** inline-block, background color matching primary or accent palette, `border-radius`, padding

### Navigation

Every page should include a back link. Shelter pages use prev/next navigation linking the full chain in NOBO order. Pattern:
```html
<a href="index.html">← Back to Home</a>
```

---

## Key Pages to Understand

| File | Purpose | Notes |
|---|---|---|
| `index.html` | Entry point; lists all guides | Start here |
| `at-map.html` | Leaflet map, 62 shelters, AT polyline | Uses CDN JS/CSS; most complex page |
| `distance-calculator.html` | Distance/elevation/sunset between any two shelters | Duplicate shelter array + calcSun() |
| `resupply-planner.html` | Interactive planner with JS sliders | Total distance: 469.0 mi |
| `shelter-blood-mountain.html` | Good shelter page example | Stone cabin type |
| `shelter-fontana-dam.html` | "Hilton of the AT" — detailed shelter | Capacity 24 |
| `sw.js` | Service worker for offline support | Network-first HTML, cache-first tiles |
| `sumner-parts.html` | Parts reference table | Non-AT content |

---

## Shelter Page Template

Each shelter page follows a consistent structure:
- Breadcrumb navigation (Home → AT Map → Shelter name)
- Header with shelter name, state badge, mile marker, elevation, capacity, water source
- Warning/alert banners (when applicable)
- Current weather widget (Open-Meteo API, `var LAT=...,LNG=...;` in GLOBAL scope before the weather IIFE)
- Sunrise/sunset widget (NOAA algorithm, 4-day forecast, "until sunset" / "Currently dark" for today)
- Stat grid: AT Mile, Elevation, Capacity, Type, County, Water, Privy, Fee
- Shelter overview prose
- Resupply/exit options with route cards (recommended, alternate, emergency)
- Lodging cards with pros & cons
- Prev/next navigation strip linking adjacent shelters in NOBO order
- Service worker registration script before `</body>`

When adding a new shelter page:
1. Copy an existing NC shelter page as template (e.g. `shelter-muskrat-creek.html`)
2. Update all data: LAT/LNG, mile, elevation, capacity, water, county, content
3. Add to `at-map.html` shelter array (with correct state, type, lat, lng, mile, elev, cap, url, water)
4. Add to `distance-calculator.html` shelter array (same data minus type)
5. Add to `sw.js` CORE_ASSETS array
6. Update prev/next links on adjacent shelter pages
7. Update shelter counts in at-map.html header and panel labels

---

## at-map.html Architecture

This is the most complex page. Key components:

**Header** — dark green bar with title, `ⓘ Legend` button (opens modal), and dynamic offline warning badge (hidden by default, shows when `navigator.onLine === false`).

**Map controls (top-right)** — grouped `.map-controls` div with `Resupply` (links to resupply-planner.html), `Distance` (links to distance-calculator.html), and `Locate Me` (triggers GPS, zooms to user with pulsing dot marker and nearest-shelter popup).

**All Shelters panel** — fixed bar at the bottom of the viewport. Tapping expands a scrollable shelter list grouped by state. Dual-action rows: click shelter name = fly to map and open popup, → button = navigate to detail page. Water status dot (green/yellow/red) next to each name. Panel position managed via `window.visualViewport` resize/scroll events. Uses `display:none/block` toggle — no translateY math.

**Legend modal** — opened by the `ⓘ Legend` header button. `position: fixed`, centered overlay. Includes Water Status section (green = reliable, yellow = requires walk/seasonal, red = no water).

**Shelter data array** — `const shelters = [...]` at the top of the `<script>` block. Each entry: `{ name, state, type, lat, lng, mile, elev, cap, url, water }`. Optional flags: `hilton`, `noc`, `clingmans`, `parkExit`.

**Marker colors by type:**
- `lean-to` GA → `#8B4513` (brown)
- `stone-cabin` → `#5a6e7e` (slate)
- `lean-to` NC → `#2b6cb0` (blue)
- `fontana` → `#6b21a8` (purple)
- `lean-to` GSMNP → `#065f46` (dark green)
- `parkExit` (Davenport Gap) → `#92400e` (amber)

**Special markers** — NOC (blue label), Standing Bear Farm (amber label), Hot Springs (purple label). These are separate from the shelter array.

**Road crossing markers** — separate array `crossings`, rendered as grey triangles (no popup link).

**Water status classifier** — `getWaterStatus(waterText)` parses shelter water descriptions into red/yellow/green status. Used for marker dots and popup badges.

**Sunrise/sunset calculator** — `calcSun(lat, lng, date)` uses NOAA solar algorithm with hardcoded Eastern timezone (EDT Mar–Nov, EST otherwise). Displayed in popups.

**Auto-derived callouts** — popups auto-generate badges for: Southern Terminus, Historic CCC cabin, Highest shelter per state, Extra large capacity (20+), Northern end of coverage.

---

## distance-calculator.html Architecture

**Shelter array** — duplicate of at-map.html shelter data (without `type` field). Must be kept in sync.

**Features:**
- Two dropdowns with optgroups by state (GA, NC, GSMNP)
- Swap button to reverse direction
- Results: total distance, elevation gain/loss, NOBO/SOBO badge
- Route list showing each shelter between start/end with water status dots
- "Arrive Before Dark?" box with 3 pace estimates (2.0, 2.5, 3.0 mph) and safety status colors based on sunrise/sunset

---

## sw.js — Service Worker

- `CACHE_NAME = 'at-hiker-v1'`
- `CORE_ASSETS` — lists all HTML files + Leaflet CDN assets
- Install: pre-caches all core assets
- Fetch: network-first for HTML (fresh weather data), cache-first for map tiles (cached opportunistically)

When adding new pages, add their filenames to the `CORE_ASSETS` array.

---

## Content Guidelines

### Appalachian Trail Pages

- Verify distances and elevations against authoritative sources (AWOL AT Guide, Guthook/FarOut)
- Include tap-to-call links for shuttle/hostel phone numbers: `<a href="tel:+1XXXXXXXXXX">(XXX) XXX-XXXX</a>`
- Use realistic, hiker-relevant warnings (water sources, bail-out points, weather)
- Mileages are NOBO (northbound) unless noted otherwise
- Sunrise/sunset times are Eastern timezone (hardcoded, DST-aware)
- `var LAT=...,LNG=...;` must be declared in GLOBAL scope (before the weather IIFE) so both weather and sunrise scripts can access them

### Sumner Parts Page

- Pricing and supplier links must reflect current catalog data
- Each part entry should include: part name, part number, price, and supplier
- Maintain the sales reference format — this is a quick-lookup tool

---

## What NOT to Do

- Do not introduce npm or any build tooling unless explicitly requested
- Do not use external CSS frameworks (Bootstrap, Tailwind, etc.)
- Do not add external fonts or icon libraries beyond what's already in use
- Do not split CSS into separate `.css` files — keep styles embedded per page
- Do not add a backend or server-side logic — this is a static site
- Do not add new CDN dependencies without good reason — Leaflet and Open-Meteo are the only current external dependencies
- Do not use `translateY` hacks for panel positioning — use `window.visualViewport` instead
- Do not hard-code pixel offsets for mobile browser toolbars — toolbar height varies by browser and scroll state
- Do not declare LAT/LNG inside the weather IIFE — they must be global for the sunrise script
- Do not use `new Date().getTimezoneOffset()` for sunrise calculations — use the hardcoded Eastern timezone function
