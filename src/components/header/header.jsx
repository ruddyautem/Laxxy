import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

function Header() {
  const [user] = useAuthState(auth);


  return (
    <HeaderContainer>
      {/* Left Section */}
      <HeaderLeft>
        <HeaderAvatar
          role="button" tabIndex={0} aria-label="Déconnexion"
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); auth.signOut(); } }}
          onClick={() => auth.signOut()}
          src={user?.photoURL || ''}
          alt={user?.displayName || 'User'}
          referrerPolicy="no-referrer"
        >
          {user?.displayName?.charAt(0)} {/* Fallback to initials */}
        </HeaderAvatar>
        <AccessTimeIcon />
      </HeaderLeft>

      {/* Search Section */}
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Rechercher..." />
      </HeaderSearch>

      {/* Right Section */}
      <HeaderRight>
        <HelpOutlinedIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: rgb(0, 59, 98);
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: grey;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
