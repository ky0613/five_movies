import { getApps, getApp, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export default ({ $config }, inject) => {
  const firebaseConfig = {
    apiKey: $config.fbApiKey,
    authDomain: $config.fbAuthDomain,
    projectId: $config.fbProjectId,
    databaseURL: $config.fbDatabaseUrl,
    storageBucket: $config.fbStorageBucket,
    messagingSenderId: $config.fbMessagingSenderId,
    appId: $config.fbAppId,
    measurementId: $config.fbMeasurementId,
  };

  const firebaseApp = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp();

  inject("storage", getStorage(firebaseApp));
};
