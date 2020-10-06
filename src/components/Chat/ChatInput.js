import React, { useState } from 'react';
import './ChatInput.css';
import firebase from 'firebase';
import db from '../../config/firebase';
import { useStateValue } from '../../Context/StateProvider';

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState('');
    const [{ user }] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();

        if (channelId) {
            db.collection('rooms').doc(channelId).collection('messages').add({
                user     : user.displayName,
                message  : input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                userImage: user.photoURL,
            });
        }
    };

    return (
        <div className="chatInput">
            <form>
                <input 
                    placeholder={`Message #${channelName ? channelName?.toLowerCase() : ''}`} 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                />
                <button type="submit" onClick={sendMessage}>
                    SEND
                </button>
            </form>
        </div>
    )
}

export default ChatInput;
