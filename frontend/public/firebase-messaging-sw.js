// Firebase Messaging Service Worker
// This file is required to silence 404 errors for firebase-messaging-sw.js
// Actual implementation can be added later as needed.
 self.addEventListener('install', () => {
   self.skipWaiting();
 });
