import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";
import Message from "./Message";

export default function Chatroom({ user }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    }, [user]);

    return (
        <div className="chatroom-container" style={{ height: "91vh" }}>
            <Contact />
            <Message />
        </div>
    );
}
