import React, { useState, useContext } from "react";
import { ChatContext } from "../Context/chatContext";
import { auth, db } from "../App";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

export default function Contact() {
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([]);

    const searchUsers = async () => {
        const usersRef = collection(db, "users");
        const q = query(
            usersRef,
            where("username", ">=", username),
            where("username", "<=", username + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);
        const qualifiedUsers = querySnapshot.docs
            .filter((doc) => doc.data().id !== auth.currentUser.uid)
            .map((doc) => doc.data())
            .slice(0, 3);
        setUsers(qualifiedUsers);
    };

    const { dispatch } = useContext(ChatContext);

    return (
        <div className="contact-list">
            <input
                className="search-contact"
                type="text"
                placeholder="Find a contact..."
                value={username}
                onKeyDown={(e) => {
                    if (e.code === "Enter") {
                        searchUsers();
                    }
                }}
                onChange={(e) => setUsername(e.target.value)}
            />
            <div className="searched-users">
                {users &&
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="suggested-user"
                            onClick={() => {
                                let chat;
                                const sender = auth.currentUser.uid;
                                const receiver = user.id;
                                const combinedId =
                                    sender > receiver
                                        ? `${sender}${receiver}`
                                        : `${receiver}${sender}`;
                                const chatRef = doc(db, "chats", combinedId);
                                getDoc(chatRef)
                                    .then((docSnapshot) => {
                                        if (docSnapshot.exists()) {
                                            chat = docSnapshot.data();
                                        }
                                    })
                                    .then(() => {
                                        dispatch({
                                            type: "CHANGE_USER",
                                            payload: { user, chat },
                                        });
                                    });
                            }}
                        >
                            <img
                                className="suggested-user-img"
                                src={`${process.env.PUBLIC_URL}/icon/profile-user.png`}
                            />
                            <div className="suggested-user-name">
                                {user.username}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
