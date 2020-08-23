import React, { useRef, useState, useEffect } from 'react';
import { Home, Star, Bell, AngleDown, BarChart, CheckCircle } from 'shared/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProfileIcon from 'shared/components/ProfileIcon';
import TaskAssignee from 'shared/components/TaskAssignee';
import { usePopup, Popup } from 'shared/components/PopupMenu';
import { RoleCode } from 'shared/generated/graphql';
import MiniProfile from 'shared/components/MiniProfile';
import {
  TaskcafeLogo,
  TaskcafeTitle,
  ProjectFinder,
  LogoContainer,
  NavSeparator,
  IconContainer,
  ProjectNameTextarea,
  InviteButton,
  GlobalActions,
  ProjectActions,
  ProjectMeta,
  ProjectName,
  ProjectTabs,
  ProjectTab,
  NavbarWrapper,
  NavbarHeader,
  ProjectSettingsButton,
  ProfileContainer,
  ProfileNameWrapper,
  ProfileNamePrimary,
  ProfileNameSecondary,
  ProjectMember,
  ProjectMembers,
} from './Styles';

const HomeDashboard = styled(Home)``;

type ProjectHeadingProps = {
  onFavorite?: () => void;
  name: string;
  canEditProjectName: boolean;
  onSaveProjectName?: (projectName: string) => void;
  onOpenSettings: ($target: React.RefObject<HTMLElement>) => void;
};

const ProjectHeading: React.FC<ProjectHeadingProps> = ({
  onFavorite,
  name: initialProjectName,
  onSaveProjectName,
  canEditProjectName,
  onOpenSettings,
}) => {
  const [isEditProjectName, setEditProjectName] = useState(false);
  const [projectName, setProjectName] = useState(initialProjectName);
  const $projectName = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (isEditProjectName && $projectName && $projectName.current) {
      $projectName.current.focus();
      $projectName.current.select();
    }
  }, [isEditProjectName]);
  useEffect(() => {
    setProjectName(initialProjectName);
  }, [initialProjectName]);

  const onProjectNameChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    setProjectName(event.currentTarget.value);
  };
  const onProjectNameBlur = () => {
    if (onSaveProjectName) {
      onSaveProjectName(projectName);
    }
    setEditProjectName(false);
  };
  const onProjectNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if ($projectName && $projectName.current) {
        $projectName.current.blur();
      }
    }
  };

  const $settings = useRef<HTMLButtonElement>(null);
  return (
    <>
      {isEditProjectName ? (
        <ProjectNameTextarea
          ref={$projectName}
          onChange={onProjectNameChange}
          onKeyDown={onProjectNameKeyDown}
          onBlur={onProjectNameBlur}
          spellCheck={false}
          value={projectName}
        />
      ) : (
        <ProjectName
          onClick={() => {
            if (canEditProjectName) {
              setEditProjectName(true);
            }
          }}
        >
          {projectName}
        </ProjectName>
      )}
      <ProjectSettingsButton
        onClick={() => {
          onOpenSettings($settings);
        }}
        ref={$settings}
      >
        <AngleDown color="#c2c6dc" />
      </ProjectSettingsButton>
      {onFavorite && (
        <ProjectSettingsButton onClick={() => onFavorite()}>
          <Star width={16} height={16} color="#c2c6dc" />
        </ProjectSettingsButton>
      )}
    </>
  );
};

export type MenuItem = {
  name: string;
  link: string;
};
type MenuTypes = {
  [key: string]: Array<string>;
};

export const MENU_TYPES: MenuTypes = {
  PROJECT_MENU: ['Board', 'Timeline', 'Calender'],
  TEAM_MENU: ['Projects', 'Members', 'Settings'],
};

type NavBarProps = {
  menuType?: Array<MenuItem> | null;
  name: string | null;
  currentTab?: number;
  onSetTab?: (tab: number) => void;
  onOpenProjectFinder: ($target: React.RefObject<HTMLElement>) => void;
  onChangeProjectOwner?: (userID: string) => void;
  onChangeRole?: (userID: string, roleCode: RoleCode) => void;
  onFavorite?: () => void;
  onProfileClick: ($target: React.RefObject<HTMLElement>) => void;
  onSaveName?: (name: string) => void;
  onNotificationClick: () => void;
  canEditProjectName?: boolean;
  canInviteUser?: boolean;
  onInviteUser?: ($target: React.RefObject<HTMLElement>) => void;
  onDashboardClick: () => void;
  user: TaskUser | null;
  onOpenSettings: ($target: React.RefObject<HTMLElement>) => void;
  projectMembers?: Array<TaskUser> | null;
  onRemoveFromBoard?: (userID: string) => void;
  onMemberProfile?: ($targetRef: React.RefObject<HTMLElement>, memberID: string) => void;
};

const NavBar: React.FC<NavBarProps> = ({
  menuType,
  canInviteUser = false,
  onInviteUser,
  onChangeProjectOwner,
  currentTab,
  onMemberProfile,
  canEditProjectName = false,
  onOpenProjectFinder,
  onFavorite,
  onSetTab,
  onChangeRole,
  name,
  onRemoveFromBoard,
  onSaveName,
  onProfileClick,
  onNotificationClick,
  onDashboardClick,
  user,
  projectMembers,
  onOpenSettings,
}) => {
  const handleProfileClick = ($target: React.RefObject<HTMLElement>) => {
    if ($target && $target.current) {
      onProfileClick($target);
    }
  };
  const { showPopup } = usePopup();
  return (
    <NavbarWrapper>
      <NavbarHeader>
        <ProjectActions>
          <ProjectMeta>
            {name && (
              <ProjectHeading
                onFavorite={onFavorite}
                onOpenSettings={onOpenSettings}
                name={name}
                canEditProjectName={canEditProjectName}
                onSaveProjectName={onSaveName}
              />
            )}
          </ProjectMeta>
          {name && (
            <ProjectTabs>
              {menuType &&
                menuType.map((menu, idx) => {
                  return (
                    <ProjectTab
                      key={menu.name}
                      to={menu.link}
                      exact
                      onClick={() => {
                        // TODO
                      }}
                    >
                      {menu.name}
                    </ProjectTab>
                  );
                })}
            </ProjectTabs>
          )}
        </ProjectActions>
        <LogoContainer to="/">
          <TaskcafeLogo width={32} height={32} />
          <TaskcafeTitle>Taskcafé</TaskcafeTitle>
        </LogoContainer>
        <GlobalActions>
          {projectMembers && onMemberProfile && (
            <>
              <ProjectMembers>
                {projectMembers.map((member, idx) => (
                  <ProjectMember
                    showRoleIcons
                    zIndex={projectMembers.length - idx}
                    key={member.id}
                    size={28}
                    member={member}
                    onMemberProfile={onMemberProfile}
                  />
                ))}
                {canInviteUser && (
                  <InviteButton
                    onClick={$target => {
                      if (onInviteUser) {
                        onInviteUser($target);
                      }
                    }}
                    variant="outline"
                  >
                    Invite
                  </InviteButton>
                )}
              </ProjectMembers>
              <NavSeparator />
            </>
          )}
          <ProjectFinder onClick={onOpenProjectFinder} variant="gradient">
            Projects
          </ProjectFinder>
          <IconContainer onClick={onDashboardClick}>
            <HomeDashboard width={20} height={20} />
          </IconContainer>
          <IconContainer disabled>
            <CheckCircle width={20} height={20} />
          </IconContainer>
          <IconContainer onClick={onNotificationClick}>
            <Bell color="#c2c6dc" size={20} />
          </IconContainer>
          <IconContainer disabled>
            <BarChart width={20} height={20} />
          </IconContainer>

          {user && (
            <IconContainer>
              <ProfileIcon user={user} size={30} onProfileClick={handleProfileClick} />
            </IconContainer>
          )}
        </GlobalActions>
      </NavbarHeader>
    </NavbarWrapper>
  );
};

export default NavBar;
