import { useContext } from "react";
import { ChatContext } from "../Context/chatContext";
import CurrentMessage from "./Message/CurrentMessage";
import BlankMessage from "./Message/BlankMessage";

export default function Message() {
    const { currentRoomId } = useContext(ChatContext);
    return (
        <div className="messaging-space">
            {currentRoomId ? <CurrentMessage /> : <BlankMessage />}
        </div>
    );
}
