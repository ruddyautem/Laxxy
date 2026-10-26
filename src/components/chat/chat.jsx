import React, { useState } from 'react';
import styled from 'styled-components';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../../features/appSlice';
import ChatInput from '../chatInput/chatInput';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { collection, doc, orderBy, query, limitToLast } from 'firebase/firestore';
import Message from '../message/message';
import { useRef, useEffect } from 'react';

function Chat() {
  const [historySize, setHistorySize] = useState(100);
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails, , roomError] = useDocument(roomId && doc(db, 'rooms', roomId));

  const [roomMessages, loading, messageError] = useCollection(
    roomId &&
      query(
        collection(db, 'rooms', roomId, 'messages'),
        orderBy('timestamp', 'asc'), limitToLast(historySize)
      )
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [roomId, loading]);
  
  return (
    <ChatContainer onScroll={(e) => { if (e.currentTarget.scrollTop < 20 && roomMessages?.size === historySize) setHistorySize((size) => size + 100); }}>
      {(roomError || messageError) && <p role='alert'>Impossible de charger ce canal. Vérifiez votre connexion et vos droits d’accès.</p>}
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Détails
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const ChatMessages = styled.div``;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
