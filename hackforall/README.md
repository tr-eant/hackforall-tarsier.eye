# tarsier.eye — Discover the Philippines 🌿

tarsier.eye (also known as PH Nature Explorer) is a web application that allows users to virtually explore the stunning natural wonders of the Philippines through immersive Google Street View panoramas.

## 🚀 Features

- **Virtual Exploration**: Teleport instantly to beautifully curated Philippine nature spots.
- **Random Discovery Engine**: Uncover hidden gems across the 7,641 islands. Powered by the Google Places API, the engine generates random coordinates clustered around major Philippine islands to find unique natural features, parks, attractions, and more.
- **Curated Popular Destinations**: Browse through a hand-picked, hardcoded database of popular spots divided into 8 categories:
  - 🌲 National Parks
  - 💧 Waterfalls
  - 🌋 Mountains / Volcanoes
  - 🏖️ Beaches / Islands
  - 🌾 Rice Terraces
  - 🕳️ Caves
  - ♨️ Hot Springs
  - 🦅 Wildlife Sanctuaries
- **Favorites System**: Save your favorite discoveries securely to your local browser storage (LocalStorage) so you never lose track of places you want to visit.
- **Get Directions**: Seamlessly integrated with Google Maps to provide turn-by-turn directions from your current location to the spot.
- **Spot Sharing**: Easily copy a direct link to any location to share the experience with friends.
- **Auth Guard**: A built-in login system protecting the main application view.

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla JavaScript, CSS3
- **APIs & Services**:
  - Google Maps JavaScript API
  - Google Street View Service
  - Google Places API
- **Data Storage**: Client-side `localStorage` and `sessionStorage`

## 📂 Project Structure

```
hackforall/
├── auth.js            # Authentication logic and session guard
├── index.html         # Main application layout & UI structure
├── login.css          # Styling specific to the login page
├── login.html         # Login portal
├── script.js          # Core app logic, Street View initialization, Discovery Engine
└── styles.css         # Main application styling (CSS variables, components, layout)
```

## ⚙️ Setup & Installation

1. Clone or download the repository to your local machine.
2. Ensure you have a valid Google Maps API Key with the following APIs enabled:
   - Maps JavaScript API
   - Street View API
   - Places API
3. Open `script.js` and locate the `API_KEY` constant at the top of the file:
   ```javascript
   const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY_HERE";
   ```
   *Replace the placeholder with your actual API key.*
4. Since this application uses ES6 Modules or standard APIs that might be blocked by CORS for local `file://` execution, it's recommended to serve the directory using a local web server (e.g., `npx serve`, VSCode Live Server, or Python's `http.server`).
5. Open `login.html` (or `index.html`, which will redirect you to the login page) in your browser.

## 💡 How It Works

### The Discovery Engine
The discovery engine leverages a predefined list of "Bounding Box Clusters" over the Philippines to ensure randomly generated coordinates actually fall on landmasses. It then uses the Google Places `nearbySearch` to find places of interest, caching the results in `sessionStorage` to optimize API usage and provide a snappy experience.

### Street View Fallback
To ensure a smooth user experience, the application uses the `StreetViewService` to check for panorama availability within a specific radius before attempting to render a location. This guarantees the user is never stuck looking at a blank screen.

## 📄 License

This project was developed for the Hack For All event. Feel free to explore, learn, and modify for educational purposes.
