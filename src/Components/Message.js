import { useContext } from 'react';
import { ChatContext } from '../Context/chatContext';
import CurrentMessage from './Message/CurrentMessage';
import BlankMessage from './Message/BlankMessage';

export default function Message() {
    const { currentMessagingUser } = useContext(ChatContext);
    return (
        <div className="messaging-space">
            {currentMessagingUser ? <CurrentMessage /> : <BlankMessage />}
        </div>
    );
}
