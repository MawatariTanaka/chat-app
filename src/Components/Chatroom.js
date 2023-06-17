import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";
import Message from "./Message";

export default function Chatroom({ user, headerHeight }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    }, [user]);

    return (
        <div
            className="chatroom-container"
            style={{ height: `calc(100vh - ${headerHeight}px)` }}
        >
            <Contact />
            <Message />
        </div>
    );
}
