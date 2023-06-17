import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../App";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    onSnapshot,
} from "firebase/firestore";
import { ChatContext } from "../../Context/chatContext";

export default function CurrentMessage() {
    function handleSendingMessage(e) {
        e.preventDefault();
        const sender = auth.currentUser.uid;
        const receiver = currentMessagingUser.id;
        const combinedId =
            sender > receiver ? `${sender}${receiver}` : `${receiver}${sender}`;
        const currentMessage = {
            sender: sender,
            text: message,
        };
        const chatRef = doc(db, "chats", combinedId);
        getDoc(chatRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    updateDoc(chatRef, {
                        messages: arrayUnion(currentMessage),
                    });
                } else {
                    setDoc(chatRef, {
                        messages: [currentMessage],
                    });
                    const userRef = doc(db, "users", sender);
                    getDoc(userRef).then((docSnapshot) => {
                        if (docSnapshot.exists()) {
                            updateDoc(userRef, {
                                currentDialogue: arrayUnion(combinedId),
                            });
                        } else {
                            setDoc(userRef, {
                                currentDialogue: [combinedId],
                            });
                        }
                    });
                    const messagingUserRef = doc(db, "users", receiver);
                    getDoc(messagingUserRef).then((docSnapshot) => {
                        if (docSnapshot.exists()) {
                            updateDoc(messagingUserRef, {
                                currentDialogue: arrayUnion(combinedId),
                            });
                        } else {
                            setDoc(messagingUserRef, {
                                currentDialogue: [combinedId],
                            });
                        }
                    });
                }
            })
            .then(() => {
                setMessage("");
            });
    }

    const [chats, setChats] = useState([]);
    const { currentMessagingUser } = useContext(ChatContext);
    const [message, setMessage] = useState("");
    const userPhoto =
        currentMessagingUser.photoURL ||
        `${process.env.PUBLIC_URL}/icon/profile-user.png`;

    useEffect(() => {
        const getChats = () => {
            const sender = auth.currentUser.uid;
            const receiver = currentMessagingUser.id;
            const combinedId =
                sender > receiver
                    ? `${sender}${receiver}`
                    : `${receiver}${sender}`;
            const unsub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
                setChats(doc.data().messages);
            });
            return () => {
                unsub();
            };
        };
        getChats();
    }, [currentMessagingUser]);

    console.log(chats);

    return (
        <>
            <div className="message-user-to">
                <img className="message-user-img" src={userPhoto} />
                <p className="message-user-name">
                    {currentMessagingUser.username}
                </p>
            </div>
            <div className="dialogue">
                {chats.map((messageObj, index) => (
                    <div
                        key={index}
                        className={`dialogue-row ${
                            messageObj.sender === auth.currentUser.uid
                                ? "dialogue-sender-row"
                                : "dialogue-receiver-row"
                        }`}
                    >
                        <p>{messageObj.text}</p>
                    </div>
                ))}
            </div>
            <form className="message-box">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" onClick={handleSendingMessage}>
                    <img
                        src={`${process.env.PUBLIC_URL}/icon/send-message.png`}
                        alt="send"
                    />
                </button>
            </form>
        </>
    );
}
