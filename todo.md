# TODO

## Future Features

### Map: Auto-derived shelter callouts
Currently only 4 shelters have special callouts on the AT map (Fontana Dam, A. Rufus Morgan/NOC, Mount Collins/Clingmans, Davenport Gap). Many other notable shelters show no callout despite having distinguishing characteristics.

**Recommendation:** Derive callouts from existing shelter data rather than adding more boolean flags. Suggested rules:

| Condition | Callout |
|---|---|
| `mile === 0` | Southern Terminus of the AT |
| `type === 'stone-cabin'` | Historic CCC Stone Cabin |
| Highest `elev` per state | Highest shelter in [State] |
| `cap >= 20` | Extra large capacity |
| `mile === 227.3` | Northern end of coverage |

Keep the 4 existing hardcoded flags (`hilton`, `noc`, `clingmans`, `parkExit`) as-is since they can't be derived from numeric data.

**File to change:** `at-map.html` — popup builder in the `shelters.forEach` block.
