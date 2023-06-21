import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../App';
import { Avatar, Layout, Typography, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, TrophyOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Profile() {
    const [userData, setUserData] = useState({
        username: 'John Doe',
        email: 'johndoe@example.com',
        points: 100,
    });

    useEffect(() => {
        async function getUser() {
            const userDoc = await getDoc(
                doc(db, 'users', auth.currentUser.uid)
            );
            setUserData(userDoc.data());
        }
        getUser();
    }, []);

    return (
        <Layout>
            <Content
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: '50vh',
                }}
            >
                <div>
                    <Avatar size={64} icon={<UserOutlined />} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Title level={3}>{userData.username}</Title>
                    <Text type="secondary">
                        <MailOutlined /> {userData.email}
                    </Text>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <TrophyOutlined
                        style={{ fontSize: '32px', color: 'black' }}
                    />
                    <Title level={4} style={{ margin: '0 0 0 8px' }}>
                        {userData.point} points.
                    </Title>
                </div>
            </Content>
        </Layout>
    );
}
