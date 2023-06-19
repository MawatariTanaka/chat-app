import React, { useContext, useEffect, useState } from "react";
import { Input, Button, Layout, Form } from "antd";
import { auth, db } from "../../App";
import {
    collection,
    doc,
    arrayUnion,
    updateDoc,
    onSnapshot,
    getDoc,
} from "firebase/firestore";
import { ChatContext } from "../../Context/chatContext";
import CustomHeader from "./CustomHeader"; // import the custom header

const { Content, Footer } = Layout;

export default function CurrentMessage() {
    const { currentRoomId } = useContext(ChatContext);
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    useEffect(() => {
        const roomRef = doc(db, "rooms", currentRoomId);
        onSnapshot(roomRef, (doc) => {
            setRoomName(doc.data().roomName);
            setMessages(doc.data().messages);
        });
    }, [currentRoomId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newMessage = {
            sender: auth.currentUser.uid,
            text: text,
        };
        const roomRef = doc(db, "rooms", currentRoomId);
        const roomSnapshot = await getDoc(roomRef);
        const inChatArr = roomSnapshot.data().in_chat;

        if (!inChatArr.includes(auth.currentUser.uid)) {
            await updateDoc(roomRef, {
                messages: arrayUnion(newMessage),
            });
        } else {
            await updateDoc(roomRef, {
                messages: arrayUnion(newMessage),
                in_chat: arrayUnion(auth.currentUser.uid),
            });
        }
        setText("");
    };

    return (
        <Layout>
            <CustomHeader roomName={roomName} /> {/* use the custom header */}
            <Content className="message-container">
                {auth.currentUser.uid &&
                    messages.map((message, index) => (
                        <div
                            key={index}
                            style={
                                auth.currentUser.uid == message.sender
                                    ? {
                                          alignSelf: "flex-end",
                                          background:
                                              "linear-gradient(to left, #0a618c, #34c0db)",
                                          color: "white",
                                      }
                                    : {}
                            }
                        >
                            {message.text}
                        </div>
                    ))}
            </Content>
            <Footer style={{ display: "flex", alignItems: "center" }}>
                <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flex: 1 }}
                >
                    <Input
                        placeholder="Type your message here"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        style={{ marginRight: "10px" }}
                    />
                    <Button type="primary" htmlType="submit">
                        Send
                    </Button>
                </form>
            </Footer>
        </Layout>
    );
}
