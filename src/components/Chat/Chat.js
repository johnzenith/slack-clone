import React, { useState, useEffect } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import db from '../../config/firebase';
import Message from './Message';
import ChatInput from './ChatInput';

function Chat() {
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails]   = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snapshot => setRoomDetails(snapshot.data()));
        }

        db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => setRoomMessages(
                // Note: retrieve the document (room) ID
                snapshot.docs.map(doc => Object.assign({}, doc.data(), { id: doc.id })))
            );
    }, [roomId]);

    const ChatApp = () => (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__headerLeft">
                    <h4 className="chat__channelName">
                        <strong># {roomDetails?.name}</strong>
                        <StarBorderOutlinedIcon />
                    </h4>
                </div>

                <div className="chat__headerRight">
                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>
                </div>
            </div>

            <div className="chat__messages">
                {roomMessages.map(({ id, message, timestamp, user, userImage }) => (
                    <Message 
                        key={id} 
                        message={message} 
                        timestamp={timestamp} 
                        user={user} 
                        userImage={userImage} 
                    />
                ))}
            </div>

            <ChatInput channelName={roomDetails?.name} channelId={roomId} />
        </div>
    );

    return <ChatApp />;
}

export default Chat;