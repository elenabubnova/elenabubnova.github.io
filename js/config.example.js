// Local development only — copy to config.js (gitignored):
//   cp js/config.example.js js/config.js
// Get a key from https://aistudio.google.com/apikey
//
// Production: the deploy workflow writes js/config.js from the GEMINI_API_KEY
// GitHub Actions secret. Pages must deploy via GitHub Actions (Settings → Pages →
// Source: GitHub Actions → "Deploy GitHub Pages"), not branch deploy.
//
// Local dev: if you see "Requests from referer ... are blocked", edit the key in
// Google AI Studio → API key → Application restrictions → HTTP referrers, and add:
//   http://127.0.0.1:5500/*
//   http://localhost:5500/*
//   https://elenabubnova.github.io/*

window.GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";
