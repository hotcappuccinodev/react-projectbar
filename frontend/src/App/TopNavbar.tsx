import React from 'react';
import TopNavbar, { MenuItem } from 'shared/components/TopNavbar';
import styled from 'styled-components/macro';
import { ProfileMenu } from 'shared/components/DropdownMenu';
import ProjectSettings, { DeleteConfirm, DELETE_INFO } from 'shared/components/ProjectSettings';
import { useHistory } from 'react-router';
import { PermissionLevel, PermissionObjectType, useCurrentUser } from 'App/context';
import {
  RoleCode,
  useMeQuery,
  useDeleteProjectMutation,
  useGetProjectsQuery,
  GetProjectsDocument,
} from 'shared/generated/graphql';
import { usePopup, Popup } from 'shared/components/PopupMenu';
import { History } from 'history';
import produce from 'immer';
import { Link } from 'react-router-dom';
import MiniProfile from 'shared/components/MiniProfile';
import cache from 'App/cache';
import NOOP from 'shared/utils/noop';

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 8px;
`;

const TeamTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
`;

const TeamProjects = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  margin-bottom: 4px;
`;

const TeamProjectLink = styled(Link)`
  display: flex;
  font-weight: 700;
  height: 36px;
  overflow: hidden;
  padding: 0;
  position: relative;
  text-decoration: none;
  user-select: none;
`;

const TeamProjectBackground = styled.div<{ color: string }>`
  background-image: url(null);
  background-color: ${props => props.color};

  background-size: cover;
  background-position: 50%;
  position: absolute;
  width: 100%;
  height: 36px;
  opacity: 1;
  border-radius: 3px;
  &:before {
    background: rgba(${props => props.theme.colors.bg.secondary});
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0.88;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const TeamProjectAvatar = styled.div<{ color: string }>`
  background-image: url(null);
  background-color: ${props => props.color};

  display: inline-block;
  flex: 0 0 auto;
  background-size: cover;
  border-radius: 3px 0 0 3px;
  height: 36px;
  width: 36px;
  position: relative;
  opacity: 0.7;
`;

const TeamProjectContent = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  width: 100%;
  padding: 9px 0 9px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TeamProjectTitle = styled.div`
  font-weight: 700;
  display: block;
  padding-right: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TeamProjectContainer = styled.div`
  box-sizing: border-box;
  border-radius: 3px;
  position: relative;
  margin: 0 4px 4px 0;
  min-width: 0;
  &:hover ${TeamProjectTitle} {
    color: rgba(${props => props.theme.colors.text.secondary});
  }
  &:hover ${TeamProjectAvatar} {
    opacity: 1;
  }
  &:hover ${TeamProjectBackground}:before {
    opacity: 0.78;
  }
`;

const colors = ['#e362e3', '#7a6ff0', '#37c5ab', '#aa62e3', '#e8384f'];

const ProjectFinder = () => {
  const { loading, data } = useGetProjectsQuery();
  if (loading) {
    return <span>loading</span>;
  }
  if (data) {
    const { projects, teams } = data;
    const projectTeams = teams.map(team => {
      return {
        id: team.id,
        name: team.name,
        projects: projects.filter(project => project.team.id === team.id),
      };
    });
    return (
      <>
        {projectTeams.map(team => (
          <TeamContainer key={team.id}>
            <TeamTitle>{team.name}</TeamTitle>
            <TeamProjects>
              {team.projects.map((project, idx) => (
                <TeamProjectContainer key={project.id}>
                  <TeamProjectLink to={`/projects/${project.id}`}>
                    <TeamProjectBackground color={colors[idx % 5]} />
                    <TeamProjectAvatar color={colors[idx % 5]} />
                    <TeamProjectContent>
                      <TeamProjectTitle>{project.name}</TeamProjectTitle>
                    </TeamProjectContent>
                  </TeamProjectLink>
                </TeamProjectContainer>
              ))}
            </TeamProjects>
          </TeamContainer>
        ))}
      </>
    );
  }
  return <span>error</span>;
};
type ProjectPopupProps = {
  history: History<History.PoorMansUnknown>;
  name: string;
  projectID: string;
};

export const ProjectPopup: React.FC<ProjectPopupProps> = ({ history, name, projectID }) => {
  const { hidePopup, setTab } = usePopup();
  const [deleteProject] = useDeleteProjectMutation({
    update: (client, deleteData) => {
      const cacheData: any = client.readQuery({
        query: GetProjectsDocument,
      });

      const newData = produce(cacheData, (draftState: any) => {
        draftState.projects = draftState.projects.filter(
          (project: any) => project.id !== deleteData.data.deleteProject.project.id,
        );
      });

      client.writeQuery({
        query: GetProjectsDocument,
        data: {
          ...newData,
        },
      });
    },
  });
  return (
    <>
      <Popup title={null} tab={0}>
        <ProjectSettings
          onDeleteProject={() => {
            setTab(1, 300);
          }}
        />
      </Popup>
      <Popup title={`Delete the "${name}" project?`} tab={1}>
        <DeleteConfirm
          description={DELETE_INFO.DELETE_PROJECTS.description}
          deletedItems={DELETE_INFO.DELETE_PROJECTS.deletedItems}
          onConfirmDelete={() => {
            if (projectID) {
              deleteProject({ variables: { projectID } });
              hidePopup();
              history.push('/projects');
            }
          }}
        />
      </Popup>
    </>
  );
};

type GlobalTopNavbarProps = {
  nameOnly?: boolean;
  projectID: string | null;
  teamID?: string | null;
  onChangeProjectOwner?: (userID: string) => void;
  name: string | null;
  currentTab?: number;
  popupContent?: JSX.Element;
  menuType?: Array<MenuItem>;
  onChangeRole?: (userID: string, roleCode: RoleCode) => void;
  projectMembers?: null | Array<TaskUser>;
  onSaveProjectName?: (projectName: string) => void;
  onInviteUser?: ($target: React.RefObject<HTMLElement>) => void;
  onSetTab?: (tab: number) => void;
  onRemoveFromBoard?: (userID: string) => void;
};

const GlobalTopNavbar: React.FC<GlobalTopNavbarProps> = ({
  currentTab,
  onSetTab,
  menuType,
  teamID,
  onChangeProjectOwner,
  onChangeRole,
  name,
  popupContent,
  projectMembers,
  onInviteUser,
  onSaveProjectName,
  onRemoveFromBoard,
}) => {
  const { user, setUserRoles, setUser } = useCurrentUser();
  const { data } = useMeQuery({
    onCompleted: response => {
      if (user && user.roles) {
        setUserRoles({
          org: user.roles.org,
          teams: response.me.teamRoles.reduce((map, obj) => {
            map.set(obj.teamID, obj.roleCode);
            return map;
          }, new Map<string, string>()),
          projects: response.me.projectRoles.reduce((map, obj) => {
            map.set(obj.projectID, obj.roleCode);
            return map;
          }, new Map<string, string>()),
        });
      }
    },
  });
  const { showPopup, hidePopup } = usePopup();
  const history = useHistory();
  const onLogout = () => {
    fetch('/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(async x => {
      const { status } = x;
      if (status === 200) {
        cache.reset();
        history.replace('/login');
        setUser(null);
        hidePopup();
      }
    });
  };
  const onProfileClick = ($target: React.RefObject<HTMLElement>) => {
    showPopup(
      $target,
      <Popup title={null} tab={0}>
        <ProfileMenu
          onLogout={onLogout}
          showAdminConsole={user ? user.roles.org === 'admin' : false}
          onAdminConsole={() => {
            history.push('/admin');
            hidePopup();
          }}
          onProfile={() => {
            history.push('/profile');
            hidePopup();
          }}
        />
      </Popup>,
      195,
    );
  };

  const onOpenSettings = ($target: React.RefObject<HTMLElement>) => {
    if (popupContent) {
      showPopup($target, popupContent, 185);
    }
  };

  if (!user) {
    return null;
  }
  const userIsTeamOrProjectAdmin = user.isAdmin(PermissionLevel.TEAM, PermissionObjectType.TEAM, teamID);
  const onMemberProfile = ($targetRef: React.RefObject<HTMLElement>, memberID: string) => {
    const member = projectMembers ? projectMembers.find(u => u.id === memberID) : null;
    const warning =
      'You can’t leave because you are the only admin. To make another user an admin, click their avatar, select “Change permissions…”, and select “Admin”.';
    if (member) {
      showPopup(
        $targetRef,
        <MiniProfile
          warning={member.role && member.role.code === 'owner' ? warning : null}
          canChangeRole={userIsTeamOrProjectAdmin}
          onChangeRole={roleCode => {
            if (onChangeRole) {
              onChangeRole(member.id, roleCode);
            }
          }}
          onRemoveFromBoard={
            member.role && member.role.code === 'owner'
              ? undefined
              : () => {
                  if (onRemoveFromBoard) {
                    onRemoveFromBoard(member.id);
                  }
                }
          }
          user={member}
          bio=""
        />,
      );
    }
  };

  return (
    <>
      <TopNavbar
        name={name}
        menuType={menuType}
        onOpenProjectFinder={$target => {
          showPopup(
            $target,
            <Popup tab={0} title={null}>
              <ProjectFinder />
            </Popup>,
          );
        }}
        currentTab={currentTab}
        user={data ? data.me.user : null}
        canEditProjectName={userIsTeamOrProjectAdmin}
        canInviteUser={userIsTeamOrProjectAdmin}
        onMemberProfile={onMemberProfile}
        onInviteUser={onInviteUser}
        onChangeRole={onChangeRole}
        onChangeProjectOwner={onChangeProjectOwner}
        onNotificationClick={NOOP}
        onSetTab={onSetTab}
        onRemoveFromBoard={onRemoveFromBoard}
        onDashboardClick={() => {
          history.push('/');
        }}
        projectMembers={projectMembers}
        onProfileClick={onProfileClick}
        onSaveName={onSaveProjectName}
        onOpenSettings={onOpenSettings}
      />
    </>
  );
};

export default GlobalTopNavbar;
