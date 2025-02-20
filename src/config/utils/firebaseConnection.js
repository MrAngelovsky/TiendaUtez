import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCFNqWxfu8W_CrHFdEBjiW5NxpDKVya1xM",
    authDomain: "e-commerce-aa5ff.firebaseapp.com",
    projectId: "e-commerce-aa5ff",
    storageBucket: "e-commerce-aa5ff.firebasestorage.app",
    messagingSenderId: "936614010396",
    appId: "1:936614010396:web:409cccbf179474101149d9"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };
