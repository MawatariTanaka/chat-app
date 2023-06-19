import { ChatContext } from "../../Context/chatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../App";
import { useEffect, useContext, useState } from "react";
import { Layout, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

export default function MessageDetail() {
    const { currentRoomId, showRoomDetail, dispatch } = useContext(ChatContext);
    const [roomData, setRoomData] = useState(null);

    useEffect(() => {
        const roomDocRef = doc(db, "rooms", currentRoomId);
        const unsubscribe = onSnapshot(roomDocRef, (doc) => {
            setRoomData(doc.data());
        });
        return () => {
            unsubscribe();
        };
    }, [currentRoomId]);

    if (!roomData || !showRoomDetail) {
        return null;
    }

    return (
        <Layout className="messaging-detail-layout">
            <Header className="messaging-detail-header">
                <Button
                    type="text"
                    icon={<LeftOutlined />}
                    onClick={() => {
                        dispatch({
                            type: "CHANGE_SHOW_STATUS",
                            payload: false,
                        });
                    }}
                />
                {roomData.roomName}
            </Header>
            <Content style={{ padding: "0 50px" }}></Content>
        </Layout>
    );
}
