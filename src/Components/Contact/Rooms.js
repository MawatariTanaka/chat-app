import React from "react";
import { Input, List, Avatar } from "antd";

const { Search } = Input;

const data = [
    {
        hostName: "John Smith",
        roomName: "Private Room",
        hostPicture: "",
    },
    {
        hostName: "Jane Doe",
        roomName: "Shared Room",
        hostPicture: "",
    },
];

export default function Rooms() {
    return (
        <div>
            <Search placeholder="Find a room" style={{ width: "100%" }} />
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={({ hostName, roomName, hostPicture }) => (
                    <List.Item
                        className="list-room"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "left",
                        }}
                    >
                        <Avatar
                            src={hostPicture}
                            style={{ margin: "0 1rem" }}
                        />
                        <div style={{ color: "white" }}>
                            <div style={{ fontWeight: 700 }}>{hostName}</div>
                            <div>{roomName}</div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
}
