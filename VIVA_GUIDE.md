# Viva Preparation & Syllabus Alignment Guide
## Front End Engineering-II (25CSE0203) — Semester Project

This document maps all 23 Front End Engineering-II course requirements (Lectures 1–42) to exact code files, hooks, line locations, and implementation snippets within **Celestial Odyssey**.

---

### 1. HTML5 Semantic Tags
- **Locations**:
  - `<header>` & `<nav>` in [`Navbar.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/components/Navbar.jsx)
  - `<main>` in [`App.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/App.jsx)
  - `<section>` & `<article>` in [`Home.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/Home.jsx) and [`Hero.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/components/Hero.jsx)
  - `<footer>` in [`Footer.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/components/Footer.jsx)
- **Viva Answer**: "Semantic tags provide structural meaning to search engines and screen readers instead of non-semantic generic `div` elements."

### 2. CSS Box Model
- **Locations**: [`src/styles/index.css`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/styles/index.css)
- **Implementation**: Box sizing reset (`*, *::before, *::after { box-sizing: border-box; }`), custom padding (`padding: 1.75rem`), margin auto centering, and border-radius variables (`--radius-lg: 20px`).

### 3. CSS Flexbox
- **Locations**: [`src/styles/index.css`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/styles/index.css), [`Navbar.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/components/Navbar.jsx)
- **Implementation**: `.flex { display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 1rem; }` for navigation bar alignment and card headers.

### 4. CSS Grid
- **Locations**: [`src/styles/index.css`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/styles/index.css), [`Home.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/Home.jsx), [`Planets.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/Planets.jsx)
- **Implementation**: `.grid-cols-4 { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }` for planet cards and statistics widgets.

### 5. CSS Media Queries (Mobile-First Responsive Design)
- **Locations**: [`src/styles/index.css`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/styles/index.css)
- **Implementation**: `@media (max-width: 1023px)` and `@media (max-width: 767px)` converting desktop 4-column grid into 1-column mobile layouts and collapsing navigation into a mobile drawer menu.

### 6. JavaScript ES6+ Features
- **Locations**: Across all `.jsx` and `.js` files.
- **Implementation**: Arrow functions `() => {}`, `const/let`, template literals `` `lat: ${lat}` ``, object destructuring `const { id } = useParams()`, spread operator `[...favorites, newItem]`.

### 7. Fetch API
- **Locations**: [`spaceApi.js`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/services/spaceApi.js)
- **Implementation**: `fetch('https://api.wheretheiss.at/v1/satellites/25544')` for retrieving live International Space Station coordinates.

### 8. Async / Await
- **Locations**: [`spaceApi.js`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/services/spaceApi.js), [`useFetch.js`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/hooks/useFetch.js)
- **Implementation**:
  ```javascript
  export async function fetchISSPosition() {
    const response = await fetch(ISS_API_URL);
    const data = await response.json();
    return data;
  }
  ```

### 9. JSON (JavaScript Object Notation)
- **Locations**: [`planetsData.json`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/data/planetsData.json), [`constellationsData.json`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/data/constellationsData.json), [`quizData.json`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/data/quizData.json)
- **Implementation**: Structured JSON data arrays storing astronomical statistics, orbital periods, star mythologies, and quiz questions.

### 10. Browser Local Storage
- **Locations**: [`useLocalStorage.js`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/hooks/useLocalStorage.js)
- **Implementation**: `window.localStorage.getItem(key)` & `window.localStorage.setItem(key, JSON.stringify(val))` for persisting user theme preference (`celestial_theme`), bookmarked favorites (`celestial_favorites`), and quiz high score (`celestial_high_score`).

### 11. React Components
- **Locations**: `src/components/` & `src/pages/`
- **Implementation**: Modular functional components (`Navbar`, `Footer`, `Hero`, `PlanetCard`, `StatCard`, `FeatureCard`, `Modal`).

### 12. React Props
- **Locations**: [`PlanetCard.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/components/PlanetCard.jsx), [`StatCard.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/components/StatCard.jsx)
- **Implementation**: Passing data properties (`planet={planet}`, `label="Planets"`, `value="08"`) into reusable components.

### 13. React State
- **Locations**: [`Quiz.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/Quiz.jsx), [`Planets.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/Planets.jsx)
- **Implementation**: Component-level state tracking active tab, selected quiz answer, search filter keywords, and modal visibility.

### 14. useState Hook
- **Locations**: [`Quiz.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/Quiz.jsx), [`Navbar.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/components/Navbar.jsx)
- **Implementation**: `const [currentIdx, setCurrentIdx] = useState(0);` for managing current quiz step and score counters.

### 15. useEffect Hook
- **Locations**: [`ISS.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/ISS.jsx), [`APOD.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/APOD.jsx), [`useTheme.js`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/hooks/useTheme.js)
- **Implementation**: Triggering API requests on mount and polling ISS coordinates every 5 seconds with automatic timer cleanup on component unmount.

### 16. useRef Hook
- **Locations**: [`SearchBar.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/components/SearchBar.jsx), [`OrbitRadar.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/components/OrbitRadar.jsx), [`ISS.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/ISS.jsx)
- **Implementation**: Input element auto-focusing (`inputRef.current.focus()`), canvas DOM reference (`canvasRef`), and storing background polling interval IDs.

### 17. useMemo Hook
- **Locations**: [`Planets.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/Planets.jsx), [`Constellations.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/Constellations.jsx)
- **Implementation**: Memoizing filtered and sorted planet arrays based on search query, type filter, and sorting metrics to prevent unnecessary recalculations.

### 18. useCallback Hook
- **Locations**: [`useFetch.js`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/hooks/useFetch.js)
- **Implementation**: Memoizing the async `executeFetch` function to maintain stable reference dependencies inside `useEffect`.

### 19. Custom Hooks
- **Locations**: [`useFetch.js`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/hooks/useFetch.js), [`useLocalStorage.js`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/hooks/useLocalStorage.js), [`useTheme.js`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/hooks/useTheme.js)
- **Implementation**: Custom logic abstraction for state synchronization, theme toggling, and asynchronous data fetching.

### 20. React Router
- **Locations**: [`App.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/App.jsx)
- **Implementation**: `BrowserRouter`, `Routes`, `Route` mapping paths (`/`, `/planets`, `/iss`, `/apod`, `/constellations`, `/quiz`, `/favorites`, `/about`, `/*`).

### 21. Dynamic Routes & Route Parameters
- **Locations**: [`App.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/App.jsx), [`PlanetDetail.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/PlanetDetail.jsx)
- **Implementation**: `<Route path="/planet/:id" element={<PlanetDetail />} />` and `const { id } = useParams();`.

### 22. Conditional Rendering
- **Locations**: [`Quiz.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/Quiz.jsx), [`APOD.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/APOD.jsx), [`Modal.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/components/Modal.jsx)
- **Implementation**: `{loading ? <Loader /> : error ? <ErrorMessage /> : <DataView />}` and `{isOpen && <Modal />}`.

### 23. Controlled Forms & Inputs
- **Locations**: [`SearchBar.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/components/SearchBar.jsx), [`APOD.jsx`](file:///c:/Users/Hp/OneDrive/Desktop/FEE2Project/Space-Explorer/src/pages/APOD.jsx)
- **Implementation**: React-controlled input fields `<input value={value} onChange={e => onChange(e.target.value)} />`.
