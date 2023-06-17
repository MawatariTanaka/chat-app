import React, { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef(null);

    useEffect(() => {
        setHeaderHeight(headerRef.current.clientHeight);
    }, []);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    const handleSignOut = () => {
        auth.signOut();
    };

    return (
        <div className="App">
            <header ref={headerRef}>
                <h1>Chat App 🔥</h1>
                {user && <button onClick={handleSignOut}>Sign Out</button>}
            </header>
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Chatroom user={user} headerHeight={headerHeight} />
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/signin" element={<SignIn />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
