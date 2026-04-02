# TODO

## Completed

### Map: Auto-derived shelter callouts ✓
Derived callout badges from existing shelter data (Southern Terminus, Historic Stone Cabin, highest per state, large capacity, northern end of coverage). Merged in PR #19.

### Map: Dual-action shelter list panel ✓
Shelter list items now fly to the shelter on the map (click) with a separate → button to navigate to the detail page. Merged in PR #18.

---

## Upcoming Features (in order)

### 1. Water Report Status Indicators
Add visual water reliability indicators to shelter markers on the map. Parse existing `water` field data to classify each shelter:
- **Green** — reliable, year-round, on-site
- **Yellow** — seasonal, requires walking (0.1+ mi), or spring-fed
- **Red** — no water on site (e.g. Blood Mountain)

Display as a small colored dot on each map marker. Add a legend entry explaining the colors.

**Files to change:** `at-map.html` — marker rendering, legend modal, shelter data (add `waterStatus` field or derive from `water` string).

### 2. Distance Calculator Between Shelters
Pick two shelters from dropdowns → show NOBO mileage between them and total elevation change. Uses existing `mile` and `elev` data from the shelter array.

Could live as a panel on the map page or a standalone page. Should also show intermediate shelters in the route.

**Files to change:** `at-map.html` (if panel) or new `distance-calculator.html`. Update `index.html` navigation.

### 3. Sunrise/Sunset Times
Calculate sunrise and sunset for each shelter using lat/lng and a solar position algorithm (no API needed — works offline). Display on:
- Each shelter detail page (alongside weather widget)
- Map popups

**Files to change:** All 38 `shelter-*.html` pages, `at-map.html` popup builder.

### 4. Offline Support (Service Worker)
Add a service worker to cache all HTML pages for offline access. Shelter details, distance calculator, and sunrise/sunset all work without internet. Map tiles are the limitation — cache last-viewed area where possible.

Do this last so all new features get cached.

**Files to add:** `sw.js` (service worker), registration script in all pages.

---

## Future Considerations

### About Page
Create an about page for the app. Update `index.html` navigation and `CLAUDE.md` structure docs.

### Update CLAUDE.md
After all features above are complete, update `CLAUDE.md` to reflect new files, features, and architecture changes.
