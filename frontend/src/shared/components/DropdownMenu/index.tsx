import React, { useRef } from 'react';
import useOnOutsideClick from 'shared/hooks/onOutsideClick';
import { Exit, User, Cog } from 'shared/icons';
import { Separator, Container, WrapperDiamond, Wrapper, ActionsList, ActionItem, ActionTitle } from './Styles';

type DropdownMenuProps = {
  left: number;
  top: number;
  onLogout: () => void;
  onCloseDropdown: () => void;
  onAdminConsole: () => void;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ left, top, onLogout, onCloseDropdown, onAdminConsole }) => {
  const $containerRef = useRef<HTMLDivElement>(null);
  useOnOutsideClick($containerRef, true, onCloseDropdown, null);
  return (
    <Container ref={$containerRef} left={left} top={top}>
      <Wrapper>
        <ActionItem onClick={onAdminConsole}>
          <User size={16} color="#c2c6dc" />
          <ActionTitle>Profile</ActionTitle>
        </ActionItem>
        <Separator />
        <ActionsList>
          <ActionItem onClick={onLogout}>
            <Exit size={16} color="#c2c6dc" />
            <ActionTitle>Logout</ActionTitle>
          </ActionItem>
        </ActionsList>
      </Wrapper>
      <WrapperDiamond />
    </Container>
  );
};

type ProfileMenuProps = {
  onProfile: () => void;
  onLogout: () => void;
  onAdminConsole: () => void;
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onAdminConsole, onProfile, onLogout }) => {
  return (
    <>
      <ActionItem onClick={onAdminConsole}>
        <Cog size={16} color="#c2c6dc" />
        <ActionTitle>Admin Console</ActionTitle>
      </ActionItem>
      <Separator />
      <ActionItem onClick={onProfile}>
        <User size={16} color="#c2c6dc" />
        <ActionTitle>Profile</ActionTitle>
      </ActionItem>
      <ActionsList>
        <ActionItem onClick={onLogout}>
          <Exit size={16} color="#c2c6dc" />
          <ActionTitle>Logout</ActionTitle>
        </ActionItem>
      </ActionsList>
    </>
  );
};

export { ProfileMenu };

export default DropdownMenu;
