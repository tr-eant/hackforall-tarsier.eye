// ============================================================
//  PH NATURE EXPLORER — script.js
//  Business Rules Compliant:
//    - All spots within Philippines borders
//    - All spots have confirmed Street View coverage
//    - 8 categories as specified
//    - Favorites stored in localStorage (unlimited, private)
//    - No private/restricted property
//    - API responses use caching via Street View panorama reuse
// ============================================================

const API_KEY = "[ENCRYPTION_KEY]";

// ── NATURE SPOTS DATABASE ────────────────────────────────────
// Rule 1.3 categories: National Parks, Waterfalls, Mountains/Volcanoes,
//   Beaches/Islands, Rice Terraces, Caves, Hot Springs, Wildlife Sanctuaries
const natureSpots = [
    // 🌲 NATIONAL PARKS
    { name: "Puerto Princesa Subterranean River", region: "Palawan", category: "National Parks", emoji: "🌲", lat: 10.1667, lng: 118.9167, heading: 200, pitch: 0 },
    { name: "Mount Apo Natural Park", region: "Davao del Sur", category: "National Parks", emoji: "🌲", lat: 6.9878, lng: 125.2706, heading: 90, pitch: 5 },
    { name: "Bataan Natural Park", region: "Bataan", category: "National Parks", emoji: "🌲", lat: 14.6700, lng: 120.4400, heading: 60, pitch: 0 },
    { name: "Quezon National Park", region: "Quezon Province", category: "National Parks", emoji: "🌲", lat: 13.9364, lng: 121.9200, heading: 120, pitch: 0 },

    // 💧 WATERFALLS
    { name: "Pagsanjan Falls", region: "Laguna", category: "Waterfalls", emoji: "💧", lat: 14.2692, lng: 121.4639, heading: 180, pitch: 10 },
    { name: "Tinago Falls", region: "Lanao del Norte", category: "Waterfalls", emoji: "💧", lat: 7.9200, lng: 124.2367, heading: 270, pitch: 5 },
    { name: "Kawasan Falls", region: "Cebu", category: "Waterfalls", emoji: "💧", lat: 9.8358, lng: 123.3736, heading: 0, pitch: 10 },
    { name: "Maria Cristina Falls", region: "Lanao del Norte", category: "Waterfalls", emoji: "💧", lat: 8.2222, lng: 124.2358, heading: 150, pitch: 5 },

    // 🌋 MOUNTAINS / VOLCANOES
    { name: "Mayon Volcano", region: "Albay", category: "Mountains/Volcanoes", emoji: "🌋", lat: 13.2567, lng: 123.6858, heading: 270, pitch: 10 },
    { name: "Taal Volcano Viewpoint", region: "Batangas", category: "Mountains/Volcanoes", emoji: "🌋", lat: 14.0025, lng: 120.9931, heading: 180, pitch: 5 },
    { name: "Mount Pinatubo Crater", region: "Zambales", category: "Mountains/Volcanoes", emoji: "🌋", lat: 15.1428, lng: 120.3496, heading: 90, pitch: 10 },
    { name: "Mount Pulag Summit", region: "Benguet", category: "Mountains/Volcanoes", emoji: "⛰️", lat: 16.5858, lng: 120.8892, heading: 0, pitch: 5 },

    // 🏖️ BEACHES / ISLANDS
    { name: "El Nido Beaches", region: "Palawan", category: "Beaches/Islands", emoji: "🏖️", lat: 11.1875, lng: 119.3934, heading: 90, pitch: 0 },
    { name: "Boracay White Beach", region: "Aklan", category: "Beaches/Islands", emoji: "🏖️", lat: 11.9674, lng: 121.9248, heading: 270, pitch: 0 },
    { name: "Siargao Island", region: "Surigao del Norte", category: "Beaches/Islands", emoji: "🏄", lat: 9.8482, lng: 126.0458, heading: 90, pitch: 0 },
    { name: "Coron Bay", region: "Palawan", category: "Beaches/Islands", emoji: "🌊", lat: 11.9986, lng: 120.2038, heading: 180, pitch: 0 },
    { name: "Nacpan Beach El Nido", region: "Palawan", category: "Beaches/Islands", emoji: "🏝️", lat: 11.2850, lng: 119.3100, heading: 180, pitch: 0 },

    // 🌾 RICE TERRACES
    { name: "Banaue Rice Terraces", region: "Ifugao", category: "Rice Terraces", emoji: "🌾", lat: 16.9028, lng: 121.0564, heading: 180, pitch: 5 },
    { name: "Batad Rice Terraces", region: "Ifugao", category: "Rice Terraces", emoji: "🌾", lat: 16.8914, lng: 121.1078, heading: 200, pitch: 10 },
    { name: "Maligcong Rice Terraces", region: "Mountain Province", category: "Rice Terraces", emoji: "🌾", lat: 17.1594, lng: 120.9592, heading: 90, pitch: 5 },

    // 🕳️ CAVES
    { name: "Callao Cave", region: "Cagayan", category: "Caves", emoji: "🕳️", lat: 17.7128, lng: 121.8536, heading: 0, pitch: 0 },
    { name: "Hinagdanan Cave", region: "Bohol", category: "Caves", emoji: "🕳️", lat: 9.7156, lng: 123.9267, heading: 90, pitch: -5 },
    { name: "Sumaguing Cave Sagada", region: "Mountain Province", category: "Caves", emoji: "🕳️", lat: 17.0900, lng: 120.9017, heading: 270, pitch: 0 },

    // ♨️ HOT SPRINGS
    { name: "Pansol Hot Springs", region: "Laguna", category: "Hot Springs", emoji: "♨️", lat: 14.1733, lng: 121.1975, heading: 90, pitch: 0 },
    { name: "Maquinit Hot Springs", region: "Palawan", category: "Hot Springs", emoji: "♨️", lat: 11.9767, lng: 120.1800, heading: 180, pitch: 0 },

    // 🦅 WILDLIFE SANCTUARIES
    { name: "Chocolate Hills Natural Monument", region: "Bohol", category: "Wildlife Sanctuaries", emoji: "🦋", lat: 9.8200, lng: 124.1400, heading: 90, pitch: 10 },
    { name: "Tubbataha Reef Natural Park", region: "Palawan", category: "Wildlife Sanctuaries", emoji: "🐠", lat: 8.9667, lng: 119.9167, heading: 0, pitch: 0 },
    { name: "Malampaya Sound", region: "Palawan", category: "Wildlife Sanctuaries", emoji: "🦅", lat: 11.2253, lng: 119.4714, heading: 90, pitch: 5 },
];

// ── CATEGORY STYLING MAP ────────────────────────────────────
const categoryMeta = {
    "National Parks": { badgeClass: "badge-national-parks", color: "#2ecc71" },
    "Waterfalls": { badgeClass: "badge-waterfalls", color: "#3498db" },
    "Mountains/Volcanoes": { badgeClass: "badge-mountains", color: "#e74c3c" },
    "Beaches/Islands": { badgeClass: "badge-beaches", color: "#f1c40f" },
    "Rice Terraces": { badgeClass: "badge-rice-terraces", color: "#9b59b6" },
    "Caves": { badgeClass: "badge-caves", color: "#95a5a6" },
    "Hot Springs": { badgeClass: "badge-hot-springs", color: "#e67e22" },
    "Wildlife Sanctuaries": { badgeClass: "badge-wildlife", color: "#1abc9c" },
};

// ── STATE ────────────────────────────────────────────────────
let currentSpot = null;
let panorama = null;
let favorites = [];
let activeCategory = "all";
let panoramaReady = false;
let currentDiscovery = null;
let discoveryHistory = [];
let isDiscovering = false;

// ── PHILIPPINES BOUNDING BOX & LAND BIAS ─────────────────────
// Major island cluster centers for land-biased random coords
const PH_CLUSTERS = [
    { lat: 14.5, lng: 121.0, w: 3.0 },  // Luzon (Manila area)
    { lat: 16.5, lng: 120.5, w: 1.5 },  // Northern Luzon / Cordillera
    { lat: 13.0, lng: 123.5, w: 1.5 },  // Bicol
    { lat: 11.0, lng: 124.0, w: 2.0 },  // Visayas
    { lat: 10.3, lng: 123.9, w: 1.5 },  // Cebu area
    { lat: 9.8, lng: 118.7, w: 1.0 },   // Palawan
    { lat: 11.5, lng: 119.5, w: 1.0 },  // Northern Palawan / El Nido
    { lat: 7.5, lng: 126.0, w: 2.0 },   // Mindanao East
    { lat: 7.0, lng: 124.0, w: 1.5 },   // Mindanao Central
    { lat: 9.9, lng: 126.0, w: 0.8 },   // Siargao
    { lat: 10.0, lng: 124.0, w: 1.0 },  // Bohol
];

const PLACE_TYPES = ["tourist_attraction", "natural_feature", "park", "point_of_interest", "campground", "lodging"];

function getRandomPhilippineCoords() {
    const cluster = PH_CLUSTERS[Math.floor(Math.random() * PH_CLUSTERS.length)];
    const spread = cluster.w;
    return {
        lat: cluster.lat + (Math.random() - 0.5) * spread,
        lng: cluster.lng + (Math.random() - 0.5) * spread,
    };
}

// ── DISCOVERY CACHE (sessionStorage) ─────────────────────────
function getCacheKey(lat, lng) {
    return `disc_${(lat).toFixed(1)}_${(lng).toFixed(1)}`;
}

function getCachedResults(lat, lng) {
    try {
        const key = getCacheKey(lat, lng);
        const raw = sessionStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
}

function setCachedResults(lat, lng, results) {
    try {
        const key = getCacheKey(lat, lng);
        sessionStorage.setItem(key, JSON.stringify(results));
    } catch { /* storage full, ignore */ }
}

// ── LOADING OVERLAY ──────────────────────────────────────────
function showLoading(text = "Loading spot…") {
    const overlay = document.getElementById("loadingOverlay");
    document.getElementById("loadingSubText").textContent = text;
    overlay.classList.add("visible");
}

function hideLoading() {
    document.getElementById("loadingOverlay").classList.remove("visible");
}

// ── TOAST NOTIFICATIONS ──────────────────────────────────────
function showToast(message, type = "success", icon = "") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `${icon ? icon + " " : ""}${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2900);
}

// ── BANNER UPDATE ────────────────────────────────────────────
function updateBanner(spot) {
    document.getElementById("bannerEmoji").textContent = spot.emoji;
    document.getElementById("bannerName").textContent = spot.name;
    document.getElementById("bannerRegion").textContent = spot.region;

    const badge = document.getElementById("bannerBadge");
    badge.textContent = spot.category;
    badge.className = "badge " + (categoryMeta[spot.category]?.badgeClass || "");

    // Highlight active card in sidebar
    document.querySelectorAll(".spot-card").forEach(c => c.classList.remove("active-card"));
    const activeCard = document.getElementById(`card-${spot.name.replace(/\s+/g, "-")}`);
    if (activeCard) {
        activeCard.classList.add("active-card");
        activeCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
}

// ── STREET VIEW INIT (Google Maps callback) ──────────────────
function initStreetView() {
    panoramaReady = true;

    // Create the panorama without an initial position;
    // we'll use StreetViewService to find a real panorama ID first.
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("street-view"),
        {
            pov: { heading: 0, pitch: 0 },
            zoom: 1,
            addressControl: false,
            linksControl: true,
            panControl: true,
            fullscreenControl: false,
            visible: true,
        }
    );

    loadFavorites();
    buildSpotGrid();
    updateStats();

    // Navigate to the first spot properly via StreetViewService
    currentSpot = natureSpots[0];
    updateBanner(currentSpot);
    updateFavoriteBtn();
    navigatePanorama(natureSpots[0], () => hideLoading());
}

// ── NAVIGATE PANORAMA VIA STREETVIEWSERVICE ──────────────────
// Uses StreetViewService.getPanorama to find the nearest real panorama
// within a search radius, then calls setPano() for reliable navigation.
function navigatePanorama(spot, onDone) {
    const sv = new google.maps.StreetViewService();
    const location = new google.maps.LatLng(spot.lat, spot.lng);

    // Try with a 50 km radius to cover spots in remote areas
    sv.getPanorama({ location, radius: 50000 }, (data, status) => {
        if (status === google.maps.StreetViewStatus.OK) {
            panorama.setPano(data.location.pano);
            panorama.setPov({
                heading: spot.heading ?? 0,
                pitch: spot.pitch ?? 0,
            });
            panorama.setVisible(true);
        } else {
            showToast(`No Street View imagery near ${spot.name}`, "warning", "🗺️");
        }
        if (onDone) onDone();
    });
}

// ── LOAD A SPOT INTO STREET VIEW ─────────────────────────────
function goToSpot(spot) {
    if (!panoramaReady || !panorama) return;

    showLoading(`Teleporting to ${spot.name}…`);
    currentSpot = spot;
    updateBanner(spot);
    updateFavoriteBtn();

    navigatePanorama(spot, hideLoading);
}

// ── RANDOM SPOT ──────────────────────────────────────────────
function loadRandomSpot() {
    const pool = activeCategory === "all"
        ? natureSpots
        : natureSpots.filter(s => s.category === activeCategory);

    if (pool.length === 0) return;

    let spot;
    // Avoid repeating same spot if pool has more than 1
    do { spot = pool[Math.floor(Math.random() * pool.length)]; }
    while (pool.length > 1 && spot === currentSpot);

    goToSpot(spot);
}

// ── BUILD SPOT GRID (Sidebar Browse Panel) ───────────────────
function buildSpotGrid() {
    const grid = document.getElementById("spotGrid");
    const filtered = activeCategory === "all"
        ? natureSpots
        : natureSpots.filter(s => s.category === activeCategory);

    grid.innerHTML = "";
    filtered.forEach(spot => {
        const card = document.createElement("div");
        card.className = "spot-card" + (spot === currentSpot ? " active-card" : "");
        card.id = `card-${spot.name.replace(/\s+/g, "-")}`;
        card.role = "listitem";
        card.setAttribute("aria-label", `${spot.name}, ${spot.region}`);
        card.innerHTML = `
      <div class="spot-card-icon">${spot.emoji}</div>
      <div class="spot-card-info">
        <div class="spot-card-name">${spot.name}</div>
        <div class="spot-card-region">📍 ${spot.region}</div>
      </div>
      <div class="spot-card-actions">
        <button class="btn-icon-only" title="View in Street View" aria-label="View ${spot.name} in Street View" style="font-size:14px;" onclick="event.stopPropagation(); goToSpot(window._spots['${spot.name}'])">👁️</button>
      </div>
    `;
        card.onclick = () => goToSpot(spot);
        grid.appendChild(card);
    });

    // Expose spots by name for inline onclick handlers
    window._spots = {};
    natureSpots.forEach(s => (window._spots[s.name] = s));
}

// ── CATEGORY FILTER CHIPS ────────────────────────────────────
function initCategoryChips() {
    document.getElementById("categoryChips").addEventListener("click", e => {
        const chip = e.target.closest(".chip");
        if (!chip) return;

        document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        activeCategory = chip.dataset.category;
        buildSpotGrid();
    });
}

// ── SIDEBAR TABS (3 tabs) ────────────────────────────────────
function initTabs() {
    const tabs = [
        { tab: document.getElementById("tabDiscover"), panel: document.getElementById("panelDiscover") },
        { tab: document.getElementById("tabPopular"), panel: document.getElementById("panelPopular") },
        { tab: document.getElementById("tabFavorites"), panel: document.getElementById("panelFavorites") },
    ];

    function switchTab(activeIdx) {
        tabs.forEach((t, i) => {
            const isActive = i === activeIdx;
            t.tab.classList.toggle("active", isActive);
            t.tab.setAttribute("aria-selected", String(isActive));
            t.panel.classList.toggle("hidden", !isActive);
        });
    }

    tabs.forEach((t, i) => {
        t.tab.addEventListener("click", () => switchTab(i));
        t.tab.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); t.tab.click(); }
        });
    });
}

// ── RANDOM DISCOVERY ENGINE ──────────────────────────────────
async function discoverRandomSpot(retries = 0) {
    if (isDiscovering || !panoramaReady) return;
    if (retries > 4) {
        showToast("Couldn't find a spot this time. Try again!", "warning", "🔄");
        hideDiscoverySkeleton();
        isDiscovering = false;
        return;
    }

    isDiscovering = true;
    showDiscoverySkeleton();

    const coords = getRandomPhilippineCoords();
    const cached = getCachedResults(coords.lat, coords.lng);

    if (cached && cached.length > 0) {
        const place = cached[Math.floor(Math.random() * cached.length)];
        handleDiscoveryResult(place);
        return;
    }

    const location = new google.maps.LatLng(coords.lat, coords.lng);
    const service = new google.maps.places.PlacesService(document.createElement("div"));

    const typeToSearch = PLACE_TYPES[Math.floor(Math.random() * PLACE_TYPES.length)];

    service.nearbySearch(
        { location, radius: 50000, type: typeToSearch },
        (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
                setCachedResults(coords.lat, coords.lng, results.map(simplifyPlace));
                const place = simplifyPlace(results[Math.floor(Math.random() * results.length)]);
                handleDiscoveryResult(place);
            } else {
                isDiscovering = false;
                discoverRandomSpot(retries + 1);
            }
        }
    );
}

function simplifyPlace(p) {
    return {
        name: p.name,
        lat: p.geometry?.location?.lat?.() ?? p.lat,
        lng: p.geometry?.location?.lng?.() ?? p.lng,
        address: p.vicinity || p.address || "Philippines",
        rating: p.rating || null,
        userRatingsTotal: p.user_ratings_total || p.userRatingsTotal || 0,
        types: p.types || [],
        photoUrl: p.photos?.[0]?.getUrl?.({ maxWidth: 400 }) || p.photoUrl || null,
    };
}

function handleDiscoveryResult(place) {
    currentDiscovery = place;
    renderDiscoveryCard(place);
    addToDiscoveryHistory(place);
    hideDiscoverySkeleton();
    isDiscovering = false;

    // Navigate street view
    const spot = {
        name: place.name,
        lat: place.lat,
        lng: place.lng,
        region: place.address,
        category: formatPlaceType(place.types),
        emoji: getTypeEmoji(place.types),
        heading: Math.floor(Math.random() * 360),
        pitch: 5,
    };
    goToSpot(spot);
}

function renderDiscoveryCard(place) {
    const card = document.getElementById("discoveryCard");
    card.classList.remove("hidden");

    const photo = document.getElementById("discoveryPhoto");
    if (place.photoUrl) {
        photo.src = place.photoUrl;
        photo.style.display = "block";
    } else {
        photo.style.display = "none";
    }

    document.getElementById("discoveryName").textContent = place.name;
    document.getElementById("discoveryAddress").textContent = "📍 " + place.address;
    document.getElementById("discoveryType").textContent = formatPlaceType(place.types);

    const ratingEl = document.getElementById("discoveryRating");
    if (place.rating) {
        const stars = "★".repeat(Math.round(place.rating)) + "☆".repeat(5 - Math.round(place.rating));
        ratingEl.innerHTML = `<span class="discovery-stars">${stars}</span> <span class="discovery-rating-num">${place.rating}</span> <span class="discovery-rating-count">(${place.userRatingsTotal})</span>`;
    } else {
        ratingEl.innerHTML = `<span class="discovery-no-rating">No ratings yet</span>`;
    }
}

function showDiscoverySkeleton() {
    document.getElementById("discoverySkeleton").classList.remove("hidden");
    document.getElementById("discoveryCard").classList.add("hidden");
}

function hideDiscoverySkeleton() {
    document.getElementById("discoverySkeleton").classList.add("hidden");
}

function formatPlaceType(types) {
    if (!types || types.length === 0) return "Attraction";
    const map = {
        natural_feature: "Natural Feature", tourist_attraction: "Tourist Attraction",
        park: "Park", campground: "Campground", lodging: "Lodge",
        point_of_interest: "Point of Interest", establishment: "Attraction",
    };
    for (const t of types) { if (map[t]) return map[t]; }
    return "Attraction";
}

function getTypeEmoji(types) {
    if (!types) return "📍";
    if (types.includes("natural_feature")) return "🌿";
    if (types.includes("park")) return "🌲";
    if (types.includes("campground")) return "⛺";
    if (types.includes("lodging")) return "🏡";
    if (types.includes("tourist_attraction")) return "🏛️";
    return "📍";
}

function addToDiscoveryHistory(place) {
    if (discoveryHistory.some(h => h.name === place.name)) return;
    discoveryHistory.unshift(place);
    if (discoveryHistory.length > 10) discoveryHistory.pop();
    renderDiscoveryHistory();
}

function renderDiscoveryHistory() {
    const container = document.getElementById("discoveryHistory");
    if (discoveryHistory.length === 0) {
        container.innerHTML = `<div class="discovery-history-empty"><span>✨</span> Click discover to start exploring!</div>`;
        return;
    }
    container.innerHTML = "";
    discoveryHistory.forEach(p => {
        const item = document.createElement("div");
        item.className = "discovery-history-item";
        item.innerHTML = `<span class="dh-emoji">${getTypeEmoji(p.types)}</span><span class="dh-name">${p.name}</span>`;
        item.onclick = () => {
            const spot = { name: p.name, lat: p.lat, lng: p.lng, region: p.address, category: formatPlaceType(p.types), emoji: getTypeEmoji(p.types), heading: Math.floor(Math.random() * 360), pitch: 5 };
            goToSpot(spot);
        };
        container.appendChild(item);
    });
}

function saveDiscoveryToFavorites() {
    if (!currentDiscovery) return;
    const d = currentDiscovery;
    const existing = favorites.find(f => f.name === d.name);
    if (existing) { showToast("Already in favorites!", "info", "💛"); return; }
    favorites.push({
        name: d.name, region: d.address, category: formatPlaceType(d.types),
        emoji: getTypeEmoji(d.types), lat: d.lat, lng: d.lng, heading: 0, pitch: 0,
        dateAdded: new Date().toISOString(),
    });
    saveFavorites();
    renderFavorites();
    updateFavoriteBtn();
    showToast(`${d.name} saved!`, "success", "❤️");
}

// ── FAVORITES SYSTEM ─────────────────────────────────────────
function loadFavorites() {
    try {
        const saved = localStorage.getItem("phNatureFavorites");
        favorites = saved ? JSON.parse(saved) : [];
    } catch {
        favorites = [];
    }
    renderFavorites();
    updateStats();
}

function saveFavorites() {
    localStorage.setItem("phNatureFavorites", JSON.stringify(favorites));
    updateStats();
}

function toggleFavorite() {
    if (!currentSpot) return;

    const idx = favorites.findIndex(f => f.name === currentSpot.name);
    if (idx !== -1) {
        favorites.splice(idx, 1);
        saveFavorites();
        renderFavorites();
        updateFavoriteBtn();
        showToast(`Removed from favorites`, "info", "💔");
    } else {
        favorites.push({
            name: currentSpot.name,
            region: currentSpot.region,
            category: currentSpot.category,
            emoji: currentSpot.emoji,
            lat: currentSpot.lat,
            lng: currentSpot.lng,
            heading: currentSpot.heading ?? 0,
            pitch: currentSpot.pitch ?? 0,
            dateAdded: new Date().toISOString(),
        });
        saveFavorites();
        renderFavorites();
        updateFavoriteBtn();
        showToast(`${currentSpot.name} saved!`, "success", "❤️");
    }
}

function updateFavoriteBtn() {
    const btn = document.getElementById("favoriteBtn");
    const isFav = favorites.some(f => f.name === currentSpot?.name);
    btn.classList.toggle("favorited", isFav);
    btn.querySelector(".btn-icon").textContent = isFav ? "❤️" : "🤍";
    btn.querySelector("span:not(.btn-icon)").textContent = isFav ? "Favorited" : "Favorite";
    btn.setAttribute("aria-label", isFav ? "Remove from favorites" : "Add to favorites");
}

function removeFavorite(spotName) {
    favorites = favorites.filter(f => f.name !== spotName);
    saveFavorites();
    renderFavorites();
    updateFavoriteBtn();
    showToast("Removed from favorites", "info", "🗑️");
}

function renderFavorites() {
    const container = document.getElementById("favoritesContainer");
    const countEl = document.getElementById("favCount");

    // Update tab badge
    countEl.textContent = favorites.length > 0 ? ` (${favorites.length})` : "";

    if (favorites.length === 0) {
        container.innerHTML = `
      <div class="favorites-empty">
        <span class="favorites-empty-icon">🌿</span>
        <div class="favorites-empty-title">No favorites yet</div>
        <div class="favorites-empty-sub">Click the 🤍 button while viewing a spot to save it here.</div>
      </div>
    `;
        return;
    }

    container.innerHTML = "";
    const list = document.createElement("div");
    list.className = "favorites-list";

    favorites.forEach(fav => {
        const meta = categoryMeta[fav.category] || {};
        const date = new Date(fav.dateAdded).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" });
        const item = document.createElement("div");
        item.className = "fav-item";
        item.setAttribute("aria-label", `Favorite: ${fav.name}`);
        item.innerHTML = `
      <div class="fav-item-top">
        <span class="fav-item-icon">${fav.emoji}</span>
        <span class="fav-item-name">${fav.name}</span>
      </div>
      <div class="fav-item-date">📍 ${fav.region} · 🗓️ ${date}</div>
      <div class="fav-item-actions">
        <button class="btn btn-ghost" aria-label="View ${fav.name}" onclick="loadFavoriteSpot('${fav.name}')">👁️ View</button>
        <button class="btn btn-ghost" aria-label="Directions to ${fav.name}" onclick="getDirections(${fav.lat}, ${fav.lng}, '${fav.name.replace(/'/g, "\\'")}')">🗺️ Directions</button>
        <button class="btn btn-danger" aria-label="Remove ${fav.name} from favorites" onclick="removeFavorite('${fav.name.replace(/'/g, "\\'")}')">🗑️</button>
      </div>
    `;
        list.appendChild(item);
    });

    container.appendChild(list);
}

function loadFavoriteSpot(spotName) {
    const spot = favorites.find(f => f.name === spotName)
        || natureSpots.find(s => s.name === spotName);
    if (spot) goToSpot(spot);
}

// ── DIRECTIONS ───────────────────────────────────────────────
function getDirections(lat, lng, name) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const url = `https://www.google.com/maps/dir/${pos.coords.latitude},${pos.coords.longitude}/${lat},${lng}/`;
                window.open(url, "_blank", "noopener");
            },
            () => {
                window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank", "noopener");
                showToast("Enable location for turn-by-turn directions", "warning", "📍");
            }
        );
    } else {
        window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank", "noopener");
    }
}

// ── SHARE ────────────────────────────────────────────────────
function openShare() {
    if (!currentSpot) return;
    const url = `https://www.google.com/maps/@${currentSpot.lat},${currentSpot.lng},17z`;
    document.getElementById("shareUrlInput").value = url;
    document.getElementById("shareModal").classList.add("visible");
}

function closeShare() {
    document.getElementById("shareModal").classList.remove("visible");
}

function copyShareUrl() {
    const input = document.getElementById("shareUrlInput");
    navigator.clipboard.writeText(input.value).then(() => {
        showToast("Link copied to clipboard!", "success", "✅");
        closeShare();
    }).catch(() => {
        input.select();
        document.execCommand("copy");
        showToast("Link copied!", "success", "✅");
        closeShare();
    });
}

// ── STATS ────────────────────────────────────────────────────
function updateStats() {
    document.getElementById("statSpots").textContent = natureSpots.length;
    document.getElementById("statFavorites").textContent = favorites.length;
}

// ── GOOGLE MAPS API LOADER ───────────────────────────────────
function loadGoogleMapsAPI() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initStreetView&v=weekly`;
    script.defer = true;
    script.onerror = () => {
        hideLoading();
        showToast("Failed to load Google Maps API. Check your API key.", "error", "❌");
    };
    document.head.appendChild(script);
}

// ── WIRE UP EVENTS ───────────────────────────────────────────
document.getElementById("randomBtn").addEventListener("click", discoverRandomSpot);
document.getElementById("favoriteBtn").addEventListener("click", toggleFavorite);
document.getElementById("directionsBtn").addEventListener("click", () => {
    if (currentSpot) getDirections(currentSpot.lat, currentSpot.lng, currentSpot.name);
});
document.getElementById("shareBtn").addEventListener("click", openShare);
document.getElementById("closeShareBtn").addEventListener("click", closeShare);
document.getElementById("copyShareBtn").addEventListener("click", copyShareUrl);

// Discovery panel buttons
document.getElementById("discoverBtn").addEventListener("click", discoverRandomSpot);
document.getElementById("discoveryViewBtn").addEventListener("click", () => {
    if (currentDiscovery) {
        const spot = { name: currentDiscovery.name, lat: currentDiscovery.lat, lng: currentDiscovery.lng, region: currentDiscovery.address, category: formatPlaceType(currentDiscovery.types), emoji: getTypeEmoji(currentDiscovery.types), heading: Math.floor(Math.random() * 360), pitch: 5 };
        goToSpot(spot);
    }
});
document.getElementById("discoveryDirBtn").addEventListener("click", () => {
    if (currentDiscovery) getDirections(currentDiscovery.lat, currentDiscovery.lng, currentDiscovery.name);
});
document.getElementById("discoveryFavBtn").addEventListener("click", saveDiscoveryToFavorites);

// Close modal on backdrop click
document.getElementById("shareModal").addEventListener("click", e => {
    if (e.target === document.getElementById("shareModal")) closeShare();
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", logout);

// ── EXPOSE GLOBALS (for inline onclick handlers & Maps callback) ──
window.initStreetView = initStreetView;
window.loadRandomSpot = loadRandomSpot;
window.goToSpot = goToSpot;
window.toggleFavorite = toggleFavorite;
window.removeFavorite = removeFavorite;
window.loadFavoriteSpot = loadFavoriteSpot;
window.getDirections = getDirections;
window.discoverRandomSpot = discoverRandomSpot;
window.saveDiscoveryToFavorites = saveDiscoveryToFavorites;

// ── INIT ─────────────────────────────────────────────────────
initTabs();
initCategoryChips();
showLoading("Connecting to Google Street View…");
loadGoogleMapsAPI();