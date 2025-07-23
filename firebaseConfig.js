// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgoerBkWjeaSn0yl6Zv8_KDND7IHvQ9Hs",
  authDomain: "CityCast.firebaseapp.com",
  projectId: "citycast-a5555",
  storageBucket: "yourapp.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefg"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
