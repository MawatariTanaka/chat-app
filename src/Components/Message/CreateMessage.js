import React, { useState, useEffect } from "react";
import { Form, Input, Select, Switch, Button } from "antd";
import { auth, db } from "../../App";
import {
    collection,
    query,
    doc,
    getDoc,
    getDocs,
    addDoc,
} from "firebase/firestore";

const { Option } = Select;

export default function CreateMessage() {
    const [form] = Form.useForm();
    const [options, setOptions] = useState([]);
    const [roomName, setRoomName] = useState("");
    const [otherPlayer, setOtherPlayer] = useState(["", ""]);
    const [privateRoom, setPrivateRoom] = useState(false);

    const onFinish = async () => {
        const otherPlayerName = await getDoc(
            doc(db, "users", otherPlayer)
        ).then((doc) => {
            if (doc.exists()) {
                return doc.data().username;
            } else {
                throw new Error(`No user found with uid ${otherPlayer}`);
            }
        });

        const roomData = {
            coverPhotoURL: "https://i.pravatar.cc/30",
            host: auth.currentUser.displayName,
            host_id: auth.currentUser.uid,
            message: [],
            player: otherPlayerName,
            player_id: otherPlayer,
            private: privateRoom,
            roomName: roomName,
        };

        await addDoc(collection(db, "rooms"), roomData).then(() => {
            form.resetFields();
        });
    };

    const onSearch = async (value) => {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        const newOptions = querySnapshot.docs.slice(0, 5).map((doc) => ({
            label: doc.data().username,
            value: doc.id,
        }));
        setOptions(newOptions);
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item name="roomName" label="Room Name">
                <Input
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
            </Form.Item>
            <Form.Item name="otherPlayer" label="Other Player">
                <Select
                    showSearch
                    placeholder="Select Other Player"
                    optionFilterProp="children"
                    onSearch={onSearch}
                    value={otherPlayer}
                    onChange={(value) => {
                        setOtherPlayer(value);
                    }}
                >
                    {options.map((option) => (
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="private" label="Private" valuePropName="checked">
                <Switch
                    checked={privateRoom}
                    onChange={(value) => setPrivateRoom(value)}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
