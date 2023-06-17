import React from "react";
import { Row, Col, Divider } from "antd";
import Invitations from "./Contact/Invitations";
import Rooms from "./Contact/Rooms";

export default function Contact() {
    return (
        <div>
            <Row>
                <Col span={24}>
                    <Rooms />
                </Col>
            </Row>
            <Divider style={{ background: "white" }} />
            <Row>
                <Col span={24}>
                    <Invitations />
                </Col>
            </Row>
        </div>
    );
}
