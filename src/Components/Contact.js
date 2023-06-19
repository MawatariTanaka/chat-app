import React from "react";
import { Row, Col, Divider } from "antd";
import Invitations from "./Contact/Invitations";
import Rooms from "./Contact/Rooms";

export default function Contact() {
    return (
        <div className="contact">
            <Row>
                <Col span={24}>
                    <Rooms />
                </Col>
            </Row>
        </div>
    );
}
