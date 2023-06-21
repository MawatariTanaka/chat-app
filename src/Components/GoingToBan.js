import { useContext } from "react";
import { Button, Col, Row } from "antd";
import { ChatContext } from "../Context/chatContext";
import { db } from "../App";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function GoingToBan({ goingToBan }) {
    const { currentRoomId, dispatch } = useContext(ChatContext);
    const auth = getAuth();

    const handleBan = async (act) => {
        if (act) {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userRef, {
                ban: arrayUnion(goingToBan.id),
            });
            const roomRef = doc(db, "rooms", currentRoomId);
            const roomSnapshot = await getDoc(roomRef);
            const inChat = roomSnapshot.data().in_chat;
            await updateDoc(roomRef, {
                ban: arrayUnion(goingToBan.id),
                in_chat: inChat.filter((obj) => obj.id !== goingToBan.id),
            });
        }
        dispatch({ type: "CHANGE_GOING_TO_BAN", payload: "" });
    };

    return (
        <Row justify="center" align="middle" className="going-to-ban-alert">
            <Col>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                    Do you want to remove {goingToBan.username} from this room
                    and all subsequent rooms?
                </div>
                <Row justify="center">
                    <Button
                        type="primary"
                        danger
                        style={{ marginRight: 20 }}
                        onClick={() => {
                            handleBan(true);
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        onClick={() => {
                            handleBan(false);
                        }}
                    >
                        No
                    </Button>
                </Row>
            </Col>
        </Row>
    );
}
