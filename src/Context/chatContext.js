import { createContext, useReducer } from "react";

const initialState = {
    currentMessagingUser: "",
    currentDialogue: [],
};

const chatReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_USER":
            const { user, chat } = action.payload;
            return {
                ...state,
                currentMessagingUser: user,
                currentDialogue: chat ? chat.messages : [],
            };
        case "SEND_MESSAGE":
            return { ...state, currentDialogue: action.payload.messages };
        case "RESET":
            return initialState;
        default:
            return state;
    }
};

export const ChatContext = createContext(initialState);

export const ChatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);
    return (
        <ChatContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};
