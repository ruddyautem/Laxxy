import React from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { enterRoom } from "../../features/appSlice";

function SidebarOption({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();
  const addChannel = async () => {
    const channelName = prompt("Nom du canal de discussion");
    if (channelName) {
      try {
        const docRef = await addDoc(collection(db, "rooms"), {
          name: channelName,
        });
        console.log("document written", docRef.id);
      } catch (e) {
        console.log("error adding document", e);
      }
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };

  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize='small' style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  &:hover {
    background-color: rgb(221, 169, 0);
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SidebarOptionChannel = styled.h3`
  margin-left: -2px;
  padding: 10px 0px;
  font-weight: 300;
  width: 260px;
  background-color: rgb(60, 146, 199);
  &:hover {
    background-color: rgb(84, 179, 238);
  }
`;
