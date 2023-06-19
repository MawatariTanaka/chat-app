import React from "react";
import { Button, List, Avatar, Row, Col } from "antd";

const data = [
    {
        inviter: "John",
        avatarUrl: "https://i.pravatar.cc/50",
    },
    {
        inviter: "Jane",
        avatarUrl: "https://i.pravatar.cc/51",
    },
    {
        inviter: "Bob",
        avatarUrl: "https://i.pravatar.cc/52",
    },
];

export default function Invitations() {
    const renderInvitation = (item) => (
        <List.Item className="invitation">
            <Col>
                <Row style={{ color: "white" }}>
                    <Avatar src={item.avatarUrl} />
                    <div>{item.inviter}</div>
                </Row>
                <Row style={{ marginTop: "8px" }}>
                    <Button type="primary" style={{ backgroundColor: "green" }}>
                        Accept
                    </Button>
                    <Button
                        type="primary"
                        style={{ backgroundColor: "red", marginLeft: "8px" }}
                    >
                        Decline
                    </Button>
                </Row>
            </Col>
        </List.Item>
    );

    return (
        <div style={{ color: "white" }}>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={renderInvitation}
            />
        </div>
    );
}
