/* Lumex Admin – Firebase Cloud Messaging service worker */
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyA11zqb_-Cve_55y1JvySQg9z3iZNiPN4Y",
  authDomain: "lumex-domain.firebaseapp.com",
  projectId: "lumex-domain",
  storageBucket: "lumex-domain.firebasestorage.app",
  messagingSenderId: "996895418268",
  appId: "1:996895418268:web:b490ede4e9eb67c86a8a59",
});

const messaging = firebase.messaging();
const ADMIN_PATH = "/lumexadmin254kenyalost34657283tems14";

messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || "New Lumex Message";
  const body = (payload.notification && payload.notification.body) || "A new client message has been received.";
  self.registration.showNotification(title, {
    body,
    icon: "/lumex-admin-icon.png",
    badge: "/lumex-admin-icon.png",
    data: { url: ADMIN_PATH + "/messages" },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || ADMIN_PATH;
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.includes(ADMIN_PATH) && "focus" in c) return c.focus();
      }
      return clients.openWindow(url);
    })
  );
});

// Minimal offline shell for the login route only — never caches private data.
const SHELL_CACHE = "lumex-admin-shell-v1";
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SHELL_CACHE).then((c) => c.addAll(["/lumex-admin-icon.png"])));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
