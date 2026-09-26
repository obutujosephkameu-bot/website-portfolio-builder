import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { adminDb, getAdminMessaging, FCM_VAPID_KEY, ADMIN_UID } from "@/lib/firebase-admin";

export const useAdminPush = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    let active = true;

    (async () => {
      try {
        const reg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        const messaging = await getAdminMessaging();
        if (!messaging) return;

        if (Notification.permission === "default") {
          await Notification.requestPermission();
        }
        if (Notification.permission !== "granted") return;

        const token = await getToken(messaging, {
          serviceWorkerRegistration: reg,
          ...(FCM_VAPID_KEY ? { vapidKey: FCM_VAPID_KEY } : {}),
        }).catch(() => null);

        if (token && active) {
          await setDoc(doc(adminDb, "notificationTokens", ADMIN_UID), {
            token,
            updatedAt: serverTimestamp(),
            userAgent: navigator.userAgent,
          }, { merge: true });
        }

        onMessage(messaging, (payload) => {
          const title = payload.notification?.title || "New Lumex Message";
          const body = payload.notification?.body || "A new client message has been received.";
          if (Notification.permission === "granted") {
            new Notification(title, { body, icon: "/lumex-admin-icon.png" });
          }
        });
      } catch (e) {
        console.warn("Admin push setup failed", e);
      }
    })();

    return () => { active = false; };
  }, [enabled]);
};
