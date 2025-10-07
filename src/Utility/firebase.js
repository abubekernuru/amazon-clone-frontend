// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBvzdGMaNyRZmWMVRWYqc7HntUCRgn9Zx4",
//     authDomain: "clone-ffb4d.firebaseapp.com",
//     projectId: "clone-ffb4d",
//     storageBucket: "clone-ffb4d.firebasestorage.app",
//     messagingSenderId: "266440038081",
//     appId: "1:266440038081:web:d989ca2fcb2afd33506640"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvzdGMaNyRZmWMVRWYqc7HntUCRgn9Zx4",
  authDomain: "clone-ffb4d.firebaseapp.com",
  projectId: "clone-ffb4d",
  storageBucket: "clone-ffb4d.firebasestorage.app",
  messagingSenderId: "266440038081",
  appId: "1:266440038081:web:d989ca2fcb2afd33506640"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
