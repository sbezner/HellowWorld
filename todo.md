# TODO

## Completed

### Map: Auto-derived shelter callouts ✓
Derived callout badges from existing shelter data (Southern Terminus, Historic Stone Cabin, highest per state, large capacity, northern end of coverage). Merged in PR #19.

### Map: Dual-action shelter list panel ✓
Shelter list items now fly to the shelter on the map (click) with a separate → button to navigate to the detail page. Merged in PR #18.

### 1. Water Report Status Indicators ✓
Added visual water reliability indicators (green/yellow/red) to map markers, popups, shelter list panel, and legend. Parses existing `water` field to classify each shelter. Merged in PR #21.

### 2. Distance Calculator Between Shelters ✓
New `distance-calculator.html` page with two dropdowns, swap button, total mileage, elevation gain/loss, NOBO/SOBO direction, and full intermediate shelter route with water status dots. Added to index.html navigation. Merged in PR #22.

### 3. Sunrise/Sunset Times ✓
Added NOAA solar algorithm (pure JS, no API) to map popups (today's sunrise/sunset/remaining), all 38 shelter pages (4-day forecast widget), and distance calculator ("Arrive Before Dark?" estimate at 3 hiking paces with safety status). Merged in PR #23.

### 4. Offline Support (Service Worker) ✓
Added `sw.js` service worker that pre-caches all 49 HTML pages and Leaflet CDN assets. Network-first for HTML (fresh weather online, cached fallback offline). Map tiles cached opportunistically as viewed. Registration added to all pages. Merged in PR #24.

---

## Future Considerations

### About Page
Create an about page for the app. Update `index.html` navigation and `CLAUDE.md` structure docs.

### Update CLAUDE.md
After all features above are complete, update `CLAUDE.md` to reflect new files, features, and architecture changes.
