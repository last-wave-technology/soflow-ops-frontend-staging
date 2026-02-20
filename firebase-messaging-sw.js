/**
 * Firebase Cloud Messaging service worker.
 * Required for FCM getToken() and background push.
 * Replace the config below with your Firebase project config from Firebase Console.
 *
 * Desktop: When payload has a "notification" block, we skip showing here to avoid
 * duplicate (browser shows one). For data-only messages we show with app icon.
 *
 * Mobile: Ensure (1) site is HTTPS on the device, (2) user enabled notifications
 * on that device (Profile → Notifications), (3) when testing from Console use
 * "Send to single device" with that device's FCM token (each device has its own).
 */
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCXoN9XjKe3q0u1HD5qdVOHKLJX5ZoRZF4",
  authDomain: "soflow-rubios-operations.firebaseapp.com",
  projectId: "soflow-rubios-operations",
  storageBucket: "soflow-rubios-operations.firebasestorage.app",
  messagingSenderId: "327684072993",
  appId: "1:327684072993:web:d65ce9713219af0dace560",
  measurementId: "G-GPP0DD5YHV"
});

const messaging = firebase.messaging();

// Handle background push. Only show here when the message is DATA-ONLY (no notification
// block). When the payload has a "notification" block, the browser shows it automatically —
// we skip showing to avoid duplicate notifications on desktop.
messaging.onBackgroundMessage((payload) => {
  const hasNotificationPayload = payload.notification && (
    payload.notification.title != null || payload.notification.body != null
  );
  if (hasNotificationPayload) {
    // Let the browser show the built-in notification (one only). Skip our custom show.
    return;
  }
  const data = payload.data ?? {};
  const title = data.title ?? data.notification?.title ?? 'Notification';
  const body = data.body ?? data.notification?.body ?? '';
  const options = {
    body,
    icon: '/icon-transparent-cropped.png',
    badge: '/icon-transparent-cropped.png',
    data: { ...data, url: data.url || '/' },
    tag: data.type || data.messageId || 'soflow-fcm',
    renotify: false,
  };
  self.registration.showNotification(title, options);
});
