// Copy to config.js for local development:
//   cp js/config.example.js js/config.js
// Get a key from https://aistudio.google.com/apikey
//
// Production: js/config.js is committed for GitHub Pages branch deploy.
// The deploy workflow can overwrite it from the GEMINI_API_KEY Actions secret
// when Pages source is set to GitHub Actions.
//
// Local dev: if you see "Requests from referer ... are blocked", edit the key in
// Google AI Studio → API key → Application restrictions → HTTP referrers, and add:
//   http://127.0.0.1:5500/*
//   http://localhost:5500/*
//   https://elenabubnova.github.io/*

window.GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";
