# tarsier.eye — Discover the Philippines 🌿

tarsier.eye (also known as PH Nature Explorer) is a web application that allows users to virtually explore the stunning natural wonders of the Philippines through immersive Google Street View panoramas.
tarsier.eye is a web application that allows users to virtually explore the stunning natural wonders of the Philippines through immersive Google Street View panoramas.

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
- **Curated Popular Destinations**: Browse through a hand-picked, hardcoded database of popular spots divided into 8 categories.
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
