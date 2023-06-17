import { useNavigate, Link } from "react-router-dom";
import { Layout, Menu, Dropdown, Space } from "antd";
import {
    UserOutlined,
    LogoutOutlined,
    PlusOutlined,
    DownOutlined,
    SmileOutlined,
} from "@ant-design/icons";
import { auth } from "../App";

const { Header } = Layout;

function AppHeader() {
    const navigate = useNavigate();
    const handleSignOut = () => {
        auth.signOut();
    };

    const handleSignIn = () => {
        navigate("/signin");
    };

    const handleRegister = () => {
        navigate("/register");
    };

    const authenticatedMenuItems = [
        {
            key: "profile",
            icon: <UserOutlined />,
            label: <span>Profile</span>,
        },
        {
            key: "create-room",
            icon: <PlusOutlined />,
            label: <span>Create Room</span>,
        },
        {
            key: "sign-out",
            icon: <LogoutOutlined />,
            label: <span onClick={handleSignOut}>Sign Out</span>,
        },
    ];

    const unauthenticatedMenuItems = [
        {
            key: "sign-in",
            label: <Link to="/signin">Sign In</Link>,
        },
        {
            key: "register",
            label: <Link to="/register">Register</Link>,
        },
    ];

    const items = auth.currentUser
        ? authenticatedMenuItems
        : unauthenticatedMenuItems;

    return (
        <Header>
            <h1 style={{ color: "white" }}>Chat app 🔥</h1>
            <Dropdown menu={{ items }}>
                <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                    style={{ color: "white" }}
                >
                    <Space>
                        {auth.currentUser ? auth.currentUser.email : "Menu"}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </Header>
    );
}

export default AppHeader;
