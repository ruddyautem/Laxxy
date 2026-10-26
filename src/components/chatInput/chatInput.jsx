import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = async (e) => {
    e.preventDefault();
    const message = input.trim();
    if (!channelId || !user || !message || isSending) return;
    setIsSending(true); setError('');
    try {
      await addDoc(collection(doc(db, 'rooms', channelId), 'messages'), {
        message, timestamp: serverTimestamp(), senderUid: user.uid,
        user: user.displayName || user.email || 'Utilisateur', userImage: user.photoURL || '',
      });
      setInput((current) => current === input ? '' : current);
      chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch { setError("Envoi impossible. Votre message est conservé."); }
    finally { setIsSending(false); }
  };

  return (
    <ChatInputContainer>
      <form onSubmit={sendMessage}>
        <input
          aria-label={`Message dans ${channelName}`}
          maxLength={5000}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Écrire un message dans #${channelName}`}
        />
        <Button hidden type='submit' disabled={isSending}>
          Envoyer
        </Button>
      </form>
      {error && <p role="alert" style={{ position: "fixed", bottom: 8, marginLeft: 20 }}>{error}</p>}
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid grey;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }
  > form > Button {
    display: none;
  }
`;
