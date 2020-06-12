import React, { useRef } from 'react';
import styled from 'styled-components';

export const Container = styled.div<{ size: number | string; bgColor: string | null; backgroundURL: string | null }>`
  margin-left: 10px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  background: ${props => (props.backgroundURL ? `url(${props.backgroundURL})` : props.bgColor)};
  background-position: center;
  background-size: contain;
`;

type ProfileIconProps = {
  user: TaskUser;
  onProfileClick: ($target: React.RefObject<HTMLElement>, user: TaskUser) => void;
  size: number | string;
};

const ProfileIcon: React.FC<ProfileIconProps> = ({ user, onProfileClick, size }) => {
  const $profileRef = useRef<HTMLDivElement>(null);
  return (
    <Container
      ref={$profileRef}
      onClick={() => {
        onProfileClick($profileRef, user);
      }}
      size={size}
      backgroundURL={user.profileIcon.url ?? null}
      bgColor={user.profileIcon.bgColor ?? null}
    >
      {(!user.profileIcon.url && user.profileIcon.initials) ?? ''}
    </Container>
  );
};

ProfileIcon.defaultProps = {
  size: 28,
};

export default ProfileIcon;
