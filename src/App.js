import React, { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AppHeader from "./Components/AppHeader";
import Chatroom from "./Components/Chatroom";
import SignIn from "./Components/SignIn";
import Register from "./Components/Register";

import "./App.css";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD4PKIP7LXVv9oTe9y2zQKzFaUMVAneJ6Y",
    authDomain: "chat-app-639ce.firebaseapp.com",
    projectId: "chat-app-639ce",
    storageBucket: "chat-app-639ce.appspot.com",
    messagingSenderId: "702439026592",
    appId: "1:702439026592:web:f358bbeee1db54d5edfec5",
    measurementId: "G-53QZVF10PB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.signOut();
    }, []);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    return (
        <div className="App">
            <AppHeader user={user} />
            <main>
                <Routes>
                    <Route path="/" element={<Chatroom user={user} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/signin" element={<SignIn />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
