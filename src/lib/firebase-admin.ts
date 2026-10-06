// Secondary Firebase project used exclusively by the hidden Lumex Admin panel.
// Kept separate from the main `firebase.ts` so existing public-site auth/data is untouched.
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, isSupported, type Messaging } from "firebase/messaging";

const adminConfig = {
  apiKey: "AIzaSyA11zqb_-Cve_55y1JvySQg9z3iZNiPN4Y",
  authDomain: "lumex-domain.firebaseapp.com",
  projectId: "lumex-domain",
  storageBucket: "lumex-domain.firebasestorage.app",
  messagingSenderId: "996895418268",
  appId: "1:996895418268:web:b490ede4e9eb67c86a8a59",
  measurementId: "G-66T8MXZE0Y",
};

const APP_NAME = "lumex-admin";

const adminApp = getApps().find((a) => a.name === APP_NAME) || initializeApp(adminConfig, APP_NAME);

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
export const adminStorage = getStorage(adminApp);

export const ADMIN_UID = "NlOhkCy1W3ZtdjikVfzcMc9jrH73";
export const ADMIN_PATH = "/lumexadmin254kenyalost34657283tems14";

// VAPID key for FCM web push — owner can replace via Admin Settings if needed.
export const FCM_VAPID_KEY = "";

export const isOwner = (user: { uid?: string | null; email?: string | null } | null | undefined) =>
  !!user && user.uid === ADMIN_UID;

export const getAdminMessaging = async (): Promise<Messaging | null> => {
  try {
    if (await isSupported()) return getMessaging(adminApp);
  } catch {}
  return null;
};

export default adminApp;
