// Copy to config.js for local development:
//   cp js/config.example.js js/config.js
// Get a key from https://aistudio.google.com/apikey
// On GitHub, add Actions secret: GEMINI_API_KEY
//
// Local dev: if you see "Requests from referer ... are blocked", edit the key in
// Google AI Studio → API key → Application restrictions → HTTP referrers, and add:
//   http://127.0.0.1:5500/*
//   http://localhost:5500/*
//   https://elenabubnova.github.io/*
// Or use a separate dev-only key here (production uses the GitHub secret on deploy).

window.GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";
