'use client';

import {initializeApp, getApps, getApp, type FirebaseApp} from 'firebase/app';
import {GoogleAuthProvider} from 'firebase/auth';
import {initializeAppCheck, ReCaptchaV3Provider} from 'firebase/app-check';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check for missing Firebase configuration keys
const missingConfigKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingConfigKeys.length > 0) {
  const anemicKeyToEnvMap: {[key: string]: string} = {
    apiKey: 'NEXT_PUBLIC_FIREBASE_API_KEY',
    authDomain: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    projectId: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    storageBucket: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    messagingSenderId: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    appId: 'NEXT_PUBLIC_FIREBASE_APP_ID',
  };
  const missingEnvVars = missingConfigKeys.map(key => anemicKeyToEnvMap[key]);
  throw new Error(
    `Missing Firebase configuration. Please set the following environment variables in your .env file: ${missingEnvVars.join(
      ', '
    )}`
  );
}

// Initialize Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize App Check - TEMPORARILY DISABLED
if (typeof window !== 'undefined') {
  // IMPORTANT: App Check has been temporarily disabled to bypass a persistent
  // 'auth/firebase-app-check-token-is-invalid' error. This is a WORKAROUND.
  // The root cause is likely a misconfiguration in your Firebase project settings.
  //
  // BEFORE DEPLOYING TO PRODUCTION, you should:
  // 1. Resolve the Firebase project configuration issue.
  //    - Ensure your app's domain (e.g., localhost) is whitelisted in App Check -> Apps.
  //    - Ensure the reCAPTCHA v3 key is correct and linked to your project.
  //    - Ensure App Check enforcement is enabled for Authentication.
  // 2. Re-enable the App Check code block below by removing the surrounding comments.
  console.warn(
    'Firebase App Check is temporarily disabled for development. Please resolve Firebase project settings and re-enable before production.'
  );

  /*
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;
  if (!recaptchaKey || recaptchaKey.startsWith('YOUR_')) {
    console.warn('Firebase App Check is not initialized. To enable it, set a valid NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY in your .env file. This is required for authentication to work correctly in production environments.');
  } else {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(recaptchaKey),
      isTokenAutoRefreshEnabled: true,
    });
  }
  */
}


const googleProvider = new GoogleAuthProvider();

export {app, googleProvider};
