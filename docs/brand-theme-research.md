# Brand world research — 8 October 2026

The directory keeps the site’s ivory, soft rose and champagne interface. Each of the 90 houses has its own hand-selected palette and an original CSS composition used consistently on its card and profile. These are editorial interpretations, not official brand identity specifications or copies of campaign photography.

## Sources and limitations

Official homepages and their public stylesheets were reviewed. `read` means the HTML was retrieved successfully; `search-verified` means the official site was verified through web search because direct access returned an error. CSS colours were used as evidence, not blindly promoted to palette tokens: checkout libraries and third-party widgets often introduce unrelated colours.

- Good Molecules: direct requests returned HTTP 403. Its official homepage was read through web search; the lavender treatment is an editorial interpretation of its colourful packaging. A text name remains until a verifiable wordmark is available.
- Dear, Klairs: the old global homepage returned HTTP 500; the official US store at `https://www.klairs.com/` was reviewed instead.
- Guerlain: its bare domain returned HTTP 401; its official US homepage loaded successfully and supplies the exact header wordmark.
- VT Cosmetics: `vtcosmetics.com` was a redirect-only landing page, so it was excluded; the official Korean site `https://www.vt-cosmetics.com/` was reviewed.
- C.O. Bigelow: the current homepage logo includes a Peanuts campaign lockup. It was not reused as the permanent brand mark; the brand’s plain typographic name is retained.
- L’Occitane Group is the corporate group, so its blue corporate site informs this theme rather than the yellow retail L’Occitane logo.

## Theme registry

`lib/brand-directory.ts` is the single source for background, readable surface, ink, accent, secondary colour, composition, bilingual mood label, official website and research status. `app/brand-theme.tsx` maps those tokens to CSS custom properties. `app/brand-worlds.css` contains eight lightweight geometric compositions. Brand identity, routes and category membership are preserved.

| Brand | Official source | Background / accent | Composition | Interpretation | Review |
|---|---|---|---|---|---|
| Neutriherbs | [https://neutriherbs.com](https://neutriherbs.com) | `#fcfaf6` / `#56ad6a` | botanical | Natural green accents and airy cream skincare presentation. | read |
| OLAPLEX | [https://olaplex.com](https://olaplex.com) | `#f6f4f2` / `#8b261f` | studio | Warm ivory, precise black wordmark and restrained burgundy site accents. | read |
| Good Molecules | [https://www.goodmolecules.com/](https://www.goodmolecules.com/) | `#eee8f6` / `#7555ae` | prism | Playful ingredient-led packaging interpreted through lavender and soft green. | search-verified |
| Round Lab | [https://roundlab.com](https://roundlab.com) | `#eaf4fb` / `#557fbc` | water | Blue skincare packaging and clean spacious product presentation. | read |
| Kopari Beauty | [https://koparibeauty.com](https://koparibeauty.com) | `#dbfbfa` / `#17cfcc` | solar | Aqua logo, turquoise website accents and warm sand backgrounds. | read |
| Biodance | [https://biodance.com](https://biodance.com) | `#f8eee9` / `#d6a59b` | water | Minimal black identity and gentle skincare photography translated into blush water. | read |
| Laura Geller Beauty | [https://laurageller.com](https://laurageller.com) | `#fbe5c3` / `#93021a` | atelier | Wine-red site accents with warm complexion and cream tones. | read |
| Dermalogica | [https://dermalogica.com](https://dermalogica.com) | `#eef1f3` / `#5b6670` | studio | Slate-grey identity, clinical whitespace and precise typography. | read |
| CurrentBody | [https://currentbody.com](https://currentbody.com) | `#eef5f2` / `#78b4a6` | prism | Clean technology layouts with mint accents and pearl surfaces. | read |
| Saie | [https://saiehello.com](https://saiehello.com) | `#e5dff0` / `#91889d` | petal | Lavender website palette and organic sculptural wordmark. | read |
| Sigma Beauty | [https://sigmabeauty.com](https://sigmabeauty.com) | `#f8edf2` / `#cf1678` | studio | Black-and-magenta logo with crisp makeup-tool presentation. | read |
| Commodity Fragrances | [https://commodityfragrances.com](https://commodityfragrances.com) | `#191918` / `#b3916d` | atelier | Monochrome fragrance presentation, amber vessels and typography-first layouts. | read |
| Crown Affair | [https://crownaffair.com](https://crownaffair.com) | `#f0f5e5` / `#9caf82` | botanical | Pale green website backgrounds and understated everyday hair rituals. | read |
| Naturium | [https://naturium.com](https://naturium.com) | `#f1eee4` / `#918b65` | botanical | Neutral ingredient-led presentation interpreted with olive and warm ivory. | read |
| Haus Labs | [https://hauslabs.com](https://hauslabs.com) | `#ecebe8` / `#a1a19b` | prism | Website greys, bold sans wordmark and modern pigment presentation. | read |
| Dr. Dennis Gross | [https://drdennisgross.com](https://drdennisgross.com) | `#fff1e7` / `#ff6728` | studio | Orange site accents and black clinical skincare identity. | read |
| Shiseido | [https://shiseido.com](https://shiseido.com) | `#fff5f2` / `#bc1731` | atelier | Japanese beauty house interpreted with restrained red and porcelain-white surfaces. | read |
| Huda Beauty | [https://hudabeauty.com](https://hudabeauty.com) | `#53132d` / `#eb3986` | petal | White wordmark and vivid pink website identity in a deep berry atmosphere. | read |
| ONE/SIZE | [https://onesizebeauty.com](https://onesizebeauty.com) | `#721b2a` / `#b82032` | graphic | Boxed black wordmark and signature red website accents. | read |
| NARS | [https://narscosmetics.com](https://narscosmetics.com) | `#181719` / `#c8102e` | studio | High-contrast black identity with red accents and editorial restraint. | read |
| Summer Fridays | [https://summerfridays.com](https://summerfridays.com) | `#e9eff3` / `#5c7899` | water | Muted blue site accents, warm neutrals and relaxed skincare presentation. | read |
| Rare Beauty | [https://rarebeauty.com](https://rarebeauty.com) | `#fdf6f0` / `#6f0936` | petal | Warm off-white website surfaces and deep berry identity. | read |
| Glossier | [https://glossier.com](https://glossier.com) | `#f8e4eb` / `#0600ff` | petal | White wordmark, soft pink product world and electric-blue website accents. | read |
| Tower 28 Beauty | [https://tower28beauty.com](https://tower28beauty.com) | `#f8f2ed` / `#d74015` | solar | Orange wordmark, warm cream and lilac website surfaces. | read |
| Paula's Choice | [https://paulaschoice.com](https://paulaschoice.com) | `#edf2f6` / `#3e607e` | studio | Clean skincare presentation and a restrained blue-grey editorial treatment. | read |
| Drunk Elephant | [https://drunkelephant.com](https://drunkelephant.com) | `#f4f5df` / `#bfd641` | graphic | Minimal wordmark with playful colourful skincare packaging. | read |
| NUDESTIX | [https://nudestix.com](https://nudestix.com) | `#ece1d6` / `#a47b62` | studio | Black wordmark, nude makeup and straightforward product layouts. | read |
| BYOMA | [https://byoma.com](https://byoma.com) | `#ffeef7` / `#e31d93` | graphic | Website magenta and light-yellow brand logo with bold colour-block packaging. | read |
| MALIN+GOETZ | [https://malinandgoetz.com](https://malinandgoetz.com) | `#f2f2ed` / `#10069f` | studio | Cobalt wordmark and minimal typographic apothecary presentation. | read |
| NEST New York | [https://nestnewyork.com](https://nestnewyork.com) | `#272523` / `#bd9963` | atelier | Warm cream website tones interpreted through amber fragrance glass and gold. | read |
| The INKEY List | [https://theinkeylist.com](https://theinkeylist.com) | `#f1f0ed` / `#9322ff` | studio | Black typography-first packaging and neutral surfaces with purple site accents. | read |
| Juvia's Place | [https://juviasplace.com](https://juviasplace.com) | `#fff5e8` / `#c69a4c` | solar | Warm cream website canvas, gold logo and saturated coral accents. | read |
| C.O. Bigelow | [https://bigelowchemists.com](https://bigelowchemists.com) | `#eef0e4` / `#268559` | botanical | Heritage pharmacy presentation with green and cream interpreted as an archival interior. | read |
| FOREO | [https://foreo.com](https://foreo.com) | `#f1e6f3` / `#78278b` | prism | Purple and pink site colours with polished beauty-device presentation. | read |
| amika | [https://loveamika.com](https://loveamika.com) | `#fefaf0` / `#ff580a` | graphic | Orange website accents and playful saturated haircare identity. | read |
| Ole Henriksen | [https://olehenriksen.com](https://olehenriksen.com) | `#fff1d7` / `#f5c543` | solar | Website citrus yellow and lavender accents with bright skincare photography. | read |
| Kate Somerville | [https://katesomerville.com](https://katesomerville.com) | `#f3f0ee` / `#8097a8` | studio | Restrained grey identity and minimal skincare layouts. | read |
| Peach & Lily | [https://peachandlily.com](https://peachandlily.com) | `#fff0ec` / `#ff7b85` | petal | Pink wordmark and airy peach-toned skincare presentation. | read |
| Real Techniques | [https://realtechniques.com](https://realtechniques.com) | `#f5e6ee` / `#bd6699` | prism | Bold stacked wordmark and pink-purple makeup-tool packaging. | read |
| Tweezerman | [https://tweezerman.com](https://tweezerman.com) | `#f0e9e3` / `#c15153` | studio | Precision-tool typography and warm neutral website surfaces. | read |
| Bubble Skincare | [https://hellobubble.com](https://hellobubble.com) | `#fbe8dc` / `#f66646` | graphic | Website coral and lavender with energetic skincare packaging. | read |
| beautyblender | [https://beautyblender.com](https://beautyblender.com) | `#fbe7f2` / `#d00070` | petal | Magenta wordmark and iconic soft rounded makeup tools. | read |
| L'Occitane Group | [https://group.loccitane.com](https://group.loccitane.com) | `#e9edf8` / `#334e9d` | atelier | Corporate group website blue and pale periwinkle; distinct from the retail L'Occitane identity. | read |
| Megababe | [https://megababebeauty.com](https://megababebeauty.com) | `#e8edf9` / `#001a70` | graphic | Pale blue website surfaces, navy text and blue logo. | read |
| Saltair | [https://saltair.com](https://saltair.com) | `#f4e4d7` / `#c28360` | solar | Neutral wordmark and colourful bodycare packaging interpreted with warm coast tones. | read |
| Nécessaire | [https://necessaire.com](https://necessaire.com) | `#efeee9` / `#a1a195` | studio | Neutral grey website palette and restrained serif identity. | read |
| OSEA Malibu | [https://oseamalibu.com](https://oseamalibu.com) | `#e8efea` / `#1d4d41` | water | Green wordmark, sea-green website accents and coastal skincare imagery. | read |
| Touchland | [https://touchland.com](https://touchland.com) | `#f1e9f8` / `#9e84c4` | prism | Black identity and translucent colourful handcare packaging. | read |
| Therabody | [https://therabody.com](https://therabody.com) | `#f7f3e9` / `#b03730` | studio | Warm neutral website surfaces and precise black device identity. | read |
| Silk'n | [https://silkn.com](https://silkn.com) | `#fdfbf9` / `#b99878` | prism | Website beige and pearl surfaces with soft beauty-device presentation. | read |
| Snif | [https://snif.co](https://snif.co) | `#e9d8d0` / `#b47559` | graphic | Warm brown website palette and playful fragrance typography. | read |
| Ellis Brooklyn | [https://ellisbrooklyn.com](https://ellisbrooklyn.com) | `#e8e6f4` / `#7a7dba` | prism | Spaced black wordmark and colourful fragrance bottles in a lavender interpretation. | read |
| Skylar | [https://skylar.com](https://skylar.com) | `#fff4f0` / `#815b61` | water | Website blush and cream with a light California-inspired fragrance world. | read |
| Juliette Has a Gun | [https://juliettehasagun.com](https://juliettehasagun.com) | `#f7e9ed` / `#d50032` | petal | Dark wordmark with pink detail and red website accents. | read |
| DedCool | [https://dedcool.com](https://dedcool.com) | `#f0eee6` / `#ff6b18` | graphic | Orange website accents and barcode-like graphic fragrance identity. | read |
| VEGAMOUR | [https://vegamour.com](https://vegamour.com) | `#f6e5df` / `#9b5b3f` | botanical | Warm brown website typography and rose-toned haircare packaging. | read |
| BondiBoost | [https://bondiboost.com](https://bondiboost.com) | `#ece4de` / `#b68e73` | studio | Neutral haircare presentation and clean black identity. | read |
| R+Co | [https://randco.com](https://randco.com) | `#e4e9f5` / `#1333f6` | graphic | Bold black wordmark, blue website accents and eclectic haircare packaging. | read |
| Living Proof | [https://livingproof.com](https://livingproof.com) | `#f9f5f4` / `#d43747` | studio | Soft website neutrals with a crisp typographic haircare identity. | read |
| Verb Products | [https://verbproducts.com](https://verbproducts.com) | `#d8e4e7` / `#638080` | graphic | Muted teal website accents, pale blue surfaces and bold white wordmark. | read |
| PATTERN Beauty | [https://patternbeauty.com](https://patternbeauty.com) | `#faf3e3` / `#f4b223` | solar | Golden wordmark, warm yellow website palette and textured haircare presentation. | read |
| T3 Micro | [https://t3micro.com](https://t3micro.com) | `#f4e9e5` / `#b98c7b` | prism | Polished device identity with rose-metal and warm white interpretation. | read |
| Davines | [https://davines.com](https://davines.com) | `#eae8e2` / `#879078` | botanical | Earthy website greys and sustainable haircare presentation. | read |
| Color Wow | [https://colorwowhair.com](https://colorwowhair.com) | `#eceff3` / `#6985aa` | studio | Black-and-white identity and a cool reflective haircare interpretation. | read |
| Briogeo | [https://briogeohair.com](https://briogeohair.com) | `#f6e7ef` / `#d74388` | botanical | Pink website accents and colourful botanical haircare packaging. | read |
| OUAI | [https://theouai.com](https://theouai.com) | `#fffaf4` / `#a48b85` | atelier | Warm cream website canvas, taupe accents and sculptural black wordmark. | read |
| Gisou | [https://gisou.com](https://gisou.com) | `#fff0d6` / `#c99b3c` | solar | Honey haircare presentation, warm brown website text and pink-gold interpretation. | read |
| K18 Hair | [https://k18hair.com](https://k18hair.com) | `#eee8de` / `#655dc6` | prism | Purple molecular logo detail, neutral website canvas and technical haircare identity. | read |
| First Aid Beauty | [https://firstaidbeauty.com](https://firstaidbeauty.com) | `#f9f7f2` / `#dd001b` | studio | Red wordmark and clean neutral website backgrounds. | read |
| Farmacy Beauty | [https://farmacybeauty.com](https://farmacybeauty.com) | `#f0ecdf` / `#52583d` | botanical | Website olive greens and warm beige with ingredient-led skincare presentation. | read |
| Sunday Riley | [https://sundayriley.com](https://sundayriley.com) | `#f2eafa` / `#8264b0` | prism | Black wordmark and vivid product packaging interpreted through violet and gold. | read |
| mixsoon | [https://mixsoon.us](https://mixsoon.us) | `#e3f2e6` / `#8bad9b` | botanical | Mint website surfaces and minimal Korean skincare identity. | read |
| Sulwhasoo | [https://sulwhasoo.com](https://sulwhasoo.com) | `#f8ede0` / `#d18c4b` | atelier | Warm Korean beauty-house packaging interpreted with amber and ivory. | read |
| innisfree | [https://innisfree.com](https://innisfree.com) | `#edf6e9` / `#00bc70` | botanical | Official website vivid green and airy natural skincare presentation. | read |
| COSRX | [https://cosrx.com](https://cosrx.com) | `#f4f0da` / `#d7b737` | studio | Black wordmark and minimal ingredient packaging with a pale-yellow interpretation. | read |
| VT Cosmetics | [https://www.vt-cosmetics.com/](https://www.vt-cosmetics.com/) | `#edf0e3` / `#658c56` | botanical | Official Korean cosmetics site and green Cica product packaging. | read |
| Torriden | [https://torriden.com](https://torriden.com) | `#e8f6f8` / `#55a9c0` | water | Minimal Korean skincare presentation with blue hydration packaging. | read |
| Dear, Klairs | [https://www.klairs.com/](https://www.klairs.com/) | `#e9eef7` / `#6375a1` | water | Official Blue Calming line interpreted through quiet blue-grey layers. | read |
| Guerlain | [https://www.guerlain.com/us/en-us](https://www.guerlain.com/us/en-us) | `#f6eddd` / `#b58c42` | atelier | Official bee-bottle and amber fragrance world with gold and ivory interpretation. | read |
| Anastasia Beverly Hills | [https://anastasiabeverlyhills.com](https://anastasiabeverlyhills.com) | `#f2e4e9` / `#6c293a` | atelier | Delicate wordmark and deep rose website accents. | read |
| Charlotte Tilbury | [https://charlottetilbury.com](https://charlottetilbury.com) | `#3a080a` / `#caa790` | atelier | Official deep burgundy, champagne and rose-gold website palette. | read |
| Danessa Myricks Beauty | [https://danessamyricksbeauty.com](https://danessamyricksbeauty.com) | `#eee3e0` / `#a26769` | prism | Warm neutral website surfaces and artist-led colour presentation. | read |
| Westman Atelier | [https://westman-atelier.com](https://westman-atelier.com) | `#f4ebe5` / `#750e1e` | atelier | Restrained wordmark, warm complexion tones and burgundy website accents. | read |
| Morphe | [https://morphe.com](https://morphe.com) | `#eae8e6` / `#53565a` | studio | Website stone-grey palette and bold makeup-artist identity. | read |
| ColourPop | [https://colourpop.com](https://colourpop.com) | `#fee6f4` / `#3e1c4a` | graphic | Official pink website surfaces and purple accents with a playful wordmark. | read |
| Tarte | [https://tartecosmetics.com](https://tartecosmetics.com) | `#f0e8f4` / `#6c4888` | petal | Purple-toned makeup packaging and a soft violet interpretation of the brand edit. | read |
| Too Faced | [https://toofaced.com](https://toofaced.com) | `#fde7f0` / `#ea0071` | petal | Official hot-pink website accents and peach-pink makeup presentation. | read |
| Hourglass Cosmetics | [https://hourglasscosmetics.com](https://hourglasscosmetics.com) | `#302a25` / `#b58150` | atelier | Official bronze, champagne and ivory palette translated into a sculptural dark interior. | read |
| MAKEUP BY MARIO | [https://makeupbymario.com](https://makeupbymario.com) | `#252426` / `#a09186` | studio | Official near-black website identity and restrained neutral artist palette. | read |
| Patrick Ta Beauty | [https://patrickta.com](https://patrickta.com) | `#f2ddd8` / `#ad6960` | atelier | Official rose-gold website tones and polished makeup presentation. | read |

## Logo handling

Existing verified assets remain local and source-attributed in `public/brand-logos/sources.json`. New assets are taken from official page headers, linked assets or the exact logo area of an official SVG sprite. An icon/monogram also has a visible full brand name on its card. Missing or failed images fall back to the brand name rather than an invented logo.

Original coloured logos are retained. Only designated monochrome marks are inverted or darkened for their theme’s background. Opaque logo backgrounds use multiply/screen blending. The homepage ribbon uses a coherent dark silhouette on ivory, with no black boxes, inverted white-on-ivory marks, or arbitrary rotation.

## Verification

Theme tests require coverage for all 90 routes, official HTTPS source URLs and at least WCAG AA 4.5:1 text contrast on both base and content surfaces. Local asset existence is checked. Browser and build results are recorded in the pull request. Commerce, campaign authorization and product data are outside this visual change.
