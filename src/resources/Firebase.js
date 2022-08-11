// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3gTB3yBl3v5jcDcDiHQG-h1M2QOJGR7A",
  authDomain: "uploadimages-c8bef.firebaseapp.com",
  projectId: "uploadimages-c8bef",
  storageBucket: "uploadimages-c8bef.appspot.com",
  messagingSenderId: "691136289873",
  appId: "1:691136289873:web:937ab75d9baa1366296c70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)