# Kolkata — City Heritage Archive & Information Portal

An informative, sophisticated digital heritage archive and city information portal documenting the architectural, intellectual, and cultural history of **Kolkata** ("The City of Joy"), West Bengal, India.

Built strictly using **HTML5, CSS3, and JavaScript** for a college web-development assignment.

---

## 🏛️ Project Purpose & Design Philosophy

This project presents an **academic, editorial, and culturally authentic digital archive** rather than a commercial travel agency website. Inspired by museum repositories (such as the Victoria & Albert Museum, the British Museum, and the Archaeological Survey of India), the site emphasizes:

* **In-Depth Historical Context:** Rigorous, authentic architectural monographs and scholarly chronologies.
* **Refined Editorial Typography:** Classical serif headers (`Playfair Display`, `Cormorant Garamond`) paired with clear informational typography (`Plus Jakarta Sans`).
* **Restrained Visual Identity:** Deep heritage navy (`#152238`), muted Bengal terracotta (`#9c3d28`), antique brass (`#b38f4d`), and warm archival parchment surfaces (`#fbf9f4`).
* **Zero Commercial Sales Language:** Replaced marketing calls-to-action with scholarly navigation (`Read History →`, `Archival Directory`, `Chronology of the Monument`).
* **Pure Frontend Implementation:** 100% compliant with assignment requirements: no backend servers, databases, node modules, or external APIs.

---

## 📂 Project Directory Structure

```text
College/
│
├── index.html                  # 1. Home Page (Historical Introduction & City Timeline)
├── heritage.html               # 2. Heritage Directory (10 Iconic Landmarks & Minimal Search)
├── hotel-booking.html          # 3. Hotel Accommodation (Institutional Requisition & Estimator)
├── gathering.html              # 4. Gatherings & Culture (Festivals & Sacred Observances)
├── gallery.html                # 5. Photographic Archive (Plates & Interactive Lightbox)
│
├── heritage/                   # 6–15. Digital Museum Monograph Articles
│   ├── victoria-memorial.html          # Site 1: Victoria Memorial Hall (1921)
│   ├── howrah-bridge.html              # Site 2: Howrah Bridge (Rabindra Setu, 1943)
│   ├── dakshineswar-temple.html        # Site 3: Dakshineswar Kali Temple (1855)
│   ├── belur-math.html                 # Site 4: Belur Math Universal Temple (1938)
│   ├── indian-museum.html              # Site 5: Indian Museum (Jadughar, 1814)
│   ├── st-pauls-cathedral.html         # Site 6: St. Paul's Cathedral (1847)
│   ├── marble-palace.html              # Site 7: Marble Palace (1835)
│   ├── princep-ghat.html               # Site 8: Prinsep Ghat (1843)
│   ├── jorasanko-thakur-bari.html      # Site 9: Jorasanko Thakur Bari (18th Century)
│   └── writers-building.html           # Site 10: Writers' Building (Mahakaran, 1777)
│
├── css/
│   └── style.css               # Master editorial stylesheet (Design tokens, layout, typography)
│
├── js/
│   └── script.js               # Master JavaScript (Nav toggle, validations, filters, lightbox)
│
├── images/
│   ├── logo/                   # Archival SVG emblems (Color & White variants)
│   ├── heritage/               # Local offline SVG illustrations for all 10 heritage sites
│   ├── events/                 # Local offline SVG illustrations for cultural gatherings
│   └── gallery/                # Local offline SVG illustrations for photographic plates
│
└── README.md                   # Project documentation & evaluation guide
```

---

## 📄 Page Structure & Architectural Breakdown

### 1. Home Page (`index.html`)
* **Hero Section:** Large atmospheric photograph with quiet typography: `KOLKATA` · *“The City of Joy”* and a historical introduction.
* **Editorial Sections:**
  * *About the City:* The geopolitical and urban transition from three villages to an imperial capital.
  * *A City Shaped by History:* Five-epoch chronological timeline (`1690`, `1772`, `1911`, `1947`, `2001`).
  * *Heritage & Architecture:* Three columns exploring Palladian Neoclassicism, Bengal Navaratna Terracotta, and Industrial Steel.
  * *Major Heritage Landmarks:* Curated monographs linking directly to individual detail archives.
  * *Along the Hooghly:* The riverine spine, historic ghats, and country boat traditions.
  * *Literary & Artistic Legacy:* The Bengal Renaissance, Rabindranath Tagore, and College Street Boi Para.
  * *Culture & Traditions:* Non-commercial overview of major community gatherings.
* **Institutional Master Footer:** West Bengal Tourism Development Corporation (WBTDC) contact records and college project accreditation.

### 2. Heritage Directory (`heritage.html`)
* **Heading:** `HERITAGE OF KOLKATA` — *“Ten places that document the architectural, religious and cultural history of the city.”*
* Minimal search bar and understated category tabs (*Colonial & Neoclassical, Sacred & Temple, Riverfront & Industrial, Museums & Literature*).
* Refined cards with large photographs, completion dates, architectural styles, locations, concise descriptions, and `Read History →` links.

### 3. Ten Dedicated Digital Museum Articles (`heritage/*.html`)
Each individual page functions as an encyclopedia monograph with:
1. **Title & Date:** e.g., `VICTORIA MEMORIAL` · `Kolkata · 1921`
2. **Archival Plate:** High-resolution photograph with formal caption and figure label.
3. **Historical Background:** Detailed narrative of founding figures, political context, and construction financing.
4. **Architecture:** Analysis of engineering materials, architectural styles, and decorative motifs.
5. **Historical Significance:** Discussion of why the site matters in Bengal and Indian history.
6. **What to See:** Highlighted architectural features, art collections, and sacred relics.
7. **Chronology of the Monument:** Historical milestones formatted as an editorial timeline.
8. **Visitor Information:** Clean tabular layout with location, visiting hours, admission rules, nearest metro/railway, and photography guidelines.
9. **Archival Excerpt & Technical Records:** Historical quote box and catalog records.
10. **Article Pagination:** Bidirectional links between consecutive monographs and back to the main directory.

### 4. Hotel Accommodation (`hotel-booking.html`)
* **Heading:** `HOTEL ACCOMMODATION` — *“Plan your stay in Kolkata.”*
* Clean, structured institutional requisition form:
  * Full Name, Email, Phone, Residential Address
  * Check-in & Check-out date pickers with validation logic
  * Room Category select, Number of Rooms & Guests
  * Government ID Proof verification
  * Dietary provisions (Bengali Breakfast, Thali, Vegetarian, Vegan)
  * Settlement preferences (At Check-in, UPI, Card, Net Banking)
  * Special accessibility / institutional requirements
* **Live Dynamic Calculator:** Calculates duration (nights), base tariff, and statutory 12% GST in real time.
* **Frontend Confirmation Voucher:** Formatted reservation voucher with unique Reference ID (`KOL-BK-2026-XXXX`) and print functionality (`window.print()`).

### 5. Gathering & Culture (`gathering.html`)
* **Heading:** `KOLKATA — GATHERINGS & CULTURE` — *“Documenting the historic festivals, literary congregations, and cultural traditions of the city.”*
* Cultural documents covering:
  1. *Durga Puja (Sharodotsav)* (UNESCO Intangible Cultural Heritage)
  2. *Poila Baisakh (Bengali New Year)* (Haal Khata & renewal)
  3. *International Kolkata Book Fair* (Literary democracy)
  4. *Kolkata International Film Festival (KIFF)* (World cinema at Nandan)
  5. *Park Street Christmas Festival* (Cosmopolitan winter gathering)
  6. *Dover Lane Music Conference* (All-night classical Indian ragas)
  7. *Prinsep Ghat Maha Ganga Aarti* (Vedic riverfront devotion)
* Complete **Annual Calendar Schedule Table** detailing months, venues, and highlights.

### 6. Photographic Archive (`gallery.html`)
* **Heading:** `PHOTOGRAPHIC ARCHIVE` — *“Visual documentation of Kolkata’s architecture, riverfront, and city life.”*
* 12 archival plates in a clean editorial grid with thin borders and minimal captions.
* **Archival Lightbox Modal:** Full-screen preview with high-resolution image, plate counter (`Photograph X of 12`), descriptive caption, Next/Previous navigation, and keyboard arrow controls.

---

## 🚀 How to Run

1. Open `index.html` in any modern web browser (Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge).
2. All 15 HTML pages and assets run entirely offline with zero dependencies.
