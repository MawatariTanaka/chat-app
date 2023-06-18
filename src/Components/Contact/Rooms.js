import React, { useState, useEffect, useContext } from "react";
import { List, Avatar, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
    collection,
    where,
    onSnapshot,
    doc,
    query,
    or,
} from "firebase/firestore"; // updated import
import { auth, db } from "../../App";
import { ChatContext } from "../../Context/chatContext";

export default function Rooms() {
    const [availableRooms, setAvailableRooms] = useState([]);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            return;
        }

        const q = query(
            collection(db, "rooms"),
            or(
                where("host_id", "==", userId),
                where("player_id", "==", userId),
                where("private", "==", false)
            )
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const rooms = querySnapshot.docs.map((doc) => doc.data());
            setAvailableRooms(rooms);
        });

        return () => unsubscribe();
    }, [auth.currentUser]);

    return (
        <div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ width: "100%" }}
                onClick={() => {
                    dispatch({
                        type: "CHANGE_ROOM",
                        payload: "add-room",
                    });
                }}
            >
                Create room
            </Button>
            <List
                itemLayout="horizontal"
                dataSource={availableRooms}
                renderItem={({ host, roomName, coverPhotoURL }) => (
                    <List.Item
                        className="list-room"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "left",
                        }}
                    >
                        <Avatar
                            src={coverPhotoURL}
                            size={32}
                            style={{ margin: "0 1rem" }}
                        />
                        <div style={{ color: "white" }}>
                            <div style={{ fontWeight: 700 }}>
                                {host.length > 10
                                    ? `${host.slice(0, 10)}...`
                                    : host}
                            </div>
                            <div>
                                {roomName.length > 10
                                    ? `${roomName.slice(0, 10)}...`
                                    : roomName}
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
}
