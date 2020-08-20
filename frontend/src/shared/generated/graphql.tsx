import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
  UUID: string;
  Upload: any;
};





export enum RoleCode {
  Owner = 'owner',
  Admin = 'admin',
  Member = 'member',
  Observer = 'observer'
}

export type ProjectLabel = {
   __typename?: 'ProjectLabel';
  id: Scalars['ID'];
  createdDate: Scalars['Time'];
  labelColor: LabelColor;
  name?: Maybe<Scalars['String']>;
};

export type LabelColor = {
   __typename?: 'LabelColor';
  id: Scalars['ID'];
  name: Scalars['String'];
  position: Scalars['Float'];
  colorHex: Scalars['String'];
};

export type TaskLabel = {
   __typename?: 'TaskLabel';
  id: Scalars['ID'];
  projectLabel: ProjectLabel;
  assignedDate: Scalars['Time'];
};

export type ProfileIcon = {
   __typename?: 'ProfileIcon';
  url?: Maybe<Scalars['String']>;
  initials?: Maybe<Scalars['String']>;
  bgColor?: Maybe<Scalars['String']>;
};

export type OwnersList = {
   __typename?: 'OwnersList';
  projects: Array<Scalars['UUID']>;
  teams: Array<Scalars['UUID']>;
};

export type Member = {
   __typename?: 'Member';
  id: Scalars['ID'];
  role: Role;
  fullName: Scalars['String'];
  username: Scalars['String'];
  profileIcon: ProfileIcon;
  owned: OwnedList;
  member: MemberList;
};

export type RefreshToken = {
   __typename?: 'RefreshToken';
  id: Scalars['ID'];
  userId: Scalars['UUID'];
  expiresAt: Scalars['Time'];
  createdAt: Scalars['Time'];
};

export type Role = {
   __typename?: 'Role';
  code: Scalars['String'];
  name: Scalars['String'];
};

export type OwnedList = {
   __typename?: 'OwnedList';
  teams: Array<Team>;
  projects: Array<Project>;
};

export type MemberList = {
   __typename?: 'MemberList';
  teams: Array<Team>;
  projects: Array<Project>;
};

export type UserAccount = {
   __typename?: 'UserAccount';
  id: Scalars['ID'];
  email: Scalars['String'];
  createdAt: Scalars['Time'];
  fullName: Scalars['String'];
  initials: Scalars['String'];
  role: Role;
  username: Scalars['String'];
  profileIcon: ProfileIcon;
  owned: OwnedList;
  member: MemberList;
};

export type Team = {
   __typename?: 'Team';
  id: Scalars['ID'];
  createdAt: Scalars['Time'];
  name: Scalars['String'];
  members: Array<Member>;
};

export type Project = {
   __typename?: 'Project';
  id: Scalars['ID'];
  createdAt: Scalars['Time'];
  name: Scalars['String'];
  team: Team;
  taskGroups: Array<TaskGroup>;
  members: Array<Member>;
  labels: Array<ProjectLabel>;
};

export type TaskGroup = {
   __typename?: 'TaskGroup';
  id: Scalars['ID'];
  projectID: Scalars['String'];
  createdAt: Scalars['Time'];
  name: Scalars['String'];
  position: Scalars['Float'];
  tasks: Array<Task>;
};

export type ChecklistBadge = {
   __typename?: 'ChecklistBadge';
  complete: Scalars['Int'];
  total: Scalars['Int'];
};

export type TaskBadges = {
   __typename?: 'TaskBadges';
  checklist?: Maybe<ChecklistBadge>;
};

export type Task = {
   __typename?: 'Task';
  id: Scalars['ID'];
  taskGroup: TaskGroup;
  createdAt: Scalars['Time'];
  name: Scalars['String'];
  position: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['Time']>;
  complete: Scalars['Boolean'];
  assigned: Array<Member>;
  labels: Array<TaskLabel>;
  checklists: Array<TaskChecklist>;
  badges: TaskBadges;
};

export type Organization = {
   __typename?: 'Organization';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type TaskChecklistItem = {
   __typename?: 'TaskChecklistItem';
  id: Scalars['ID'];
  name: Scalars['String'];
  taskChecklistID: Scalars['UUID'];
  complete: Scalars['Boolean'];
  position: Scalars['Float'];
  dueDate: Scalars['Time'];
};

export type TaskChecklist = {
   __typename?: 'TaskChecklist';
  id: Scalars['ID'];
  name: Scalars['String'];
  position: Scalars['Float'];
  items: Array<TaskChecklistItem>;
};

export enum RoleLevel {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export enum ActionLevel {
  Org = 'ORG',
  Team = 'TEAM',
  Project = 'PROJECT'
}

export enum ObjectType {
  Org = 'ORG',
  Team = 'TEAM',
  Project = 'PROJECT',
  Task = 'TASK'
}

export type Query = {
   __typename?: 'Query';
  organizations: Array<Organization>;
  users: Array<UserAccount>;
  findUser: UserAccount;
  findProject: Project;
  findTask: Task;
  projects: Array<Project>;
  findTeam: Team;
  teams: Array<Team>;
  labelColors: Array<LabelColor>;
  taskGroups: Array<TaskGroup>;
  me: MePayload;
};


export type QueryFindUserArgs = {
  input: FindUser;
};


export type QueryFindProjectArgs = {
  input: FindProject;
};


export type QueryFindTaskArgs = {
  input: FindTask;
};


export type QueryProjectsArgs = {
  input?: Maybe<ProjectsFilter>;
};


export type QueryFindTeamArgs = {
  input: FindTeam;
};

export type Mutation = {
   __typename?: 'Mutation';
  addTaskLabel: Task;
  assignTask: Task;
  clearProfileAvatar: UserAccount;
  createProject: Project;
  createProjectLabel: ProjectLabel;
  createProjectMember: CreateProjectMemberPayload;
  createRefreshToken: RefreshToken;
  createTask: Task;
  createTaskChecklist: TaskChecklist;
  createTaskChecklistItem: TaskChecklistItem;
  createTaskGroup: TaskGroup;
  createTeam: Team;
  createTeamMember: CreateTeamMemberPayload;
  createUserAccount: UserAccount;
  deleteProject: DeleteProjectPayload;
  deleteProjectLabel: ProjectLabel;
  deleteProjectMember: DeleteProjectMemberPayload;
  deleteTask: DeleteTaskPayload;
  deleteTaskChecklist: DeleteTaskChecklistPayload;
  deleteTaskChecklistItem: DeleteTaskChecklistItemPayload;
  deleteTaskGroup: DeleteTaskGroupPayload;
  deleteTeam: DeleteTeamPayload;
  deleteTeamMember: DeleteTeamMemberPayload;
  deleteUserAccount: DeleteUserAccountPayload;
  logoutUser: Scalars['Boolean'];
  removeTaskLabel: Task;
  setTaskChecklistItemComplete: TaskChecklistItem;
  setTaskComplete: Task;
  toggleTaskLabel: ToggleTaskLabelPayload;
  unassignTask: Task;
  updateProjectLabel: ProjectLabel;
  updateProjectLabelColor: ProjectLabel;
  updateProjectLabelName: ProjectLabel;
  updateProjectMemberRole: UpdateProjectMemberRolePayload;
  updateProjectName: Project;
  updateTaskChecklistItemLocation: UpdateTaskChecklistItemLocationPayload;
  updateTaskChecklistItemName: TaskChecklistItem;
  updateTaskChecklistLocation: UpdateTaskChecklistLocationPayload;
  updateTaskChecklistName: TaskChecklist;
  updateTaskDescription: Task;
  updateTaskDueDate: Task;
  updateTaskGroupLocation: TaskGroup;
  updateTaskGroupName: TaskGroup;
  updateTaskLocation: UpdateTaskLocationPayload;
  updateTaskName: Task;
  updateTeamMemberRole: UpdateTeamMemberRolePayload;
  updateUserPassword: UpdateUserPasswordPayload;
  updateUserRole: UpdateUserRolePayload;
};


export type MutationAddTaskLabelArgs = {
  input?: Maybe<AddTaskLabelInput>;
};


export type MutationAssignTaskArgs = {
  input?: Maybe<AssignTaskInput>;
};


export type MutationCreateProjectArgs = {
  input: NewProject;
};


export type MutationCreateProjectLabelArgs = {
  input: NewProjectLabel;
};


export type MutationCreateProjectMemberArgs = {
  input: CreateProjectMember;
};


export type MutationCreateRefreshTokenArgs = {
  input: NewRefreshToken;
};


export type MutationCreateTaskArgs = {
  input: NewTask;
};


export type MutationCreateTaskChecklistArgs = {
  input: CreateTaskChecklist;
};


export type MutationCreateTaskChecklistItemArgs = {
  input: CreateTaskChecklistItem;
};


export type MutationCreateTaskGroupArgs = {
  input: NewTaskGroup;
};


export type MutationCreateTeamArgs = {
  input: NewTeam;
};


export type MutationCreateTeamMemberArgs = {
  input: CreateTeamMember;
};


export type MutationCreateUserAccountArgs = {
  input: NewUserAccount;
};


export type MutationDeleteProjectArgs = {
  input: DeleteProject;
};


export type MutationDeleteProjectLabelArgs = {
  input: DeleteProjectLabel;
};


export type MutationDeleteProjectMemberArgs = {
  input: DeleteProjectMember;
};


export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


export type MutationDeleteTaskChecklistArgs = {
  input: DeleteTaskChecklist;
};


export type MutationDeleteTaskChecklistItemArgs = {
  input: DeleteTaskChecklistItem;
};


export type MutationDeleteTaskGroupArgs = {
  input: DeleteTaskGroupInput;
};


export type MutationDeleteTeamArgs = {
  input: DeleteTeam;
};


export type MutationDeleteTeamMemberArgs = {
  input: DeleteTeamMember;
};


export type MutationDeleteUserAccountArgs = {
  input: DeleteUserAccount;
};


export type MutationLogoutUserArgs = {
  input: LogoutUser;
};


export type MutationRemoveTaskLabelArgs = {
  input?: Maybe<RemoveTaskLabelInput>;
};


export type MutationSetTaskChecklistItemCompleteArgs = {
  input: SetTaskChecklistItemComplete;
};


export type MutationSetTaskCompleteArgs = {
  input: SetTaskComplete;
};


export type MutationToggleTaskLabelArgs = {
  input: ToggleTaskLabelInput;
};


export type MutationUnassignTaskArgs = {
  input?: Maybe<UnassignTaskInput>;
};


export type MutationUpdateProjectLabelArgs = {
  input: UpdateProjectLabel;
};


export type MutationUpdateProjectLabelColorArgs = {
  input: UpdateProjectLabelColor;
};


export type MutationUpdateProjectLabelNameArgs = {
  input: UpdateProjectLabelName;
};


export type MutationUpdateProjectMemberRoleArgs = {
  input: UpdateProjectMemberRole;
};


export type MutationUpdateProjectNameArgs = {
  input?: Maybe<UpdateProjectName>;
};


export type MutationUpdateTaskChecklistItemLocationArgs = {
  input: UpdateTaskChecklistItemLocation;
};


export type MutationUpdateTaskChecklistItemNameArgs = {
  input: UpdateTaskChecklistItemName;
};


export type MutationUpdateTaskChecklistLocationArgs = {
  input: UpdateTaskChecklistLocation;
};


export type MutationUpdateTaskChecklistNameArgs = {
  input: UpdateTaskChecklistName;
};


export type MutationUpdateTaskDescriptionArgs = {
  input: UpdateTaskDescriptionInput;
};


export type MutationUpdateTaskDueDateArgs = {
  input: UpdateTaskDueDate;
};


export type MutationUpdateTaskGroupLocationArgs = {
  input: NewTaskGroupLocation;
};


export type MutationUpdateTaskGroupNameArgs = {
  input: UpdateTaskGroupName;
};


export type MutationUpdateTaskLocationArgs = {
  input: NewTaskLocation;
};


export type MutationUpdateTaskNameArgs = {
  input: UpdateTaskName;
};


export type MutationUpdateTeamMemberRoleArgs = {
  input: UpdateTeamMemberRole;
};


export type MutationUpdateUserPasswordArgs = {
  input: UpdateUserPassword;
};


export type MutationUpdateUserRoleArgs = {
  input: UpdateUserRole;
};

export type TeamRole = {
   __typename?: 'TeamRole';
  teamID: Scalars['UUID'];
  roleCode: RoleCode;
};

export type ProjectRole = {
   __typename?: 'ProjectRole';
  projectID: Scalars['UUID'];
  roleCode: RoleCode;
};

export type MePayload = {
   __typename?: 'MePayload';
  user: UserAccount;
  teamRoles: Array<TeamRole>;
  projectRoles: Array<ProjectRole>;
};

export type ProjectsFilter = {
  teamID?: Maybe<Scalars['UUID']>;
};

export type FindUser = {
  userId: Scalars['String'];
};

export type FindProject = {
  projectID: Scalars['UUID'];
};

export type FindTask = {
  taskID: Scalars['UUID'];
};

export type FindTeam = {
  teamID: Scalars['UUID'];
};

export type NewProject = {
  userID: Scalars['UUID'];
  teamID: Scalars['UUID'];
  name: Scalars['String'];
};

export type UpdateProjectName = {
  projectID: Scalars['UUID'];
  name: Scalars['String'];
};

export type DeleteProject = {
  projectID: Scalars['UUID'];
};

export type DeleteProjectPayload = {
   __typename?: 'DeleteProjectPayload';
  ok: Scalars['Boolean'];
  project: Project;
};

export type NewProjectLabel = {
  projectID: Scalars['UUID'];
  labelColorID: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
};

export type DeleteProjectLabel = {
  projectLabelID: Scalars['UUID'];
};

export type UpdateProjectLabelName = {
  projectLabelID: Scalars['UUID'];
  name: Scalars['String'];
};

export type UpdateProjectLabel = {
  projectLabelID: Scalars['UUID'];
  labelColorID: Scalars['UUID'];
  name: Scalars['String'];
};

export type UpdateProjectLabelColor = {
  projectLabelID: Scalars['UUID'];
  labelColorID: Scalars['UUID'];
};

export type CreateProjectMember = {
  projectID: Scalars['UUID'];
  userID: Scalars['UUID'];
};

export type CreateProjectMemberPayload = {
   __typename?: 'CreateProjectMemberPayload';
  ok: Scalars['Boolean'];
  member: Member;
};

export type DeleteProjectMember = {
  projectID: Scalars['UUID'];
  userID: Scalars['UUID'];
};

export type DeleteProjectMemberPayload = {
   __typename?: 'DeleteProjectMemberPayload';
  ok: Scalars['Boolean'];
  member: Member;
  projectID: Scalars['UUID'];
};

export type UpdateProjectMemberRole = {
  projectID: Scalars['UUID'];
  userID: Scalars['UUID'];
  roleCode: RoleCode;
};

export type UpdateProjectMemberRolePayload = {
   __typename?: 'UpdateProjectMemberRolePayload';
  ok: Scalars['Boolean'];
  member: Member;
};

export type NewTask = {
  taskGroupID: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Float'];
};

export type AssignTaskInput = {
  taskID: Scalars['UUID'];
  userID: Scalars['UUID'];
};

export type UnassignTaskInput = {
  taskID: Scalars['UUID'];
  userID: Scalars['UUID'];
};

export type UpdateTaskDescriptionInput = {
  taskID: Scalars['UUID'];
  description: Scalars['String'];
};

export type UpdateTaskLocationPayload = {
   __typename?: 'UpdateTaskLocationPayload';
  previousTaskGroupID: Scalars['UUID'];
  task: Task;
};

export type UpdateTaskDueDate = {
  taskID: Scalars['UUID'];
  dueDate?: Maybe<Scalars['Time']>;
};

export type SetTaskComplete = {
  taskID: Scalars['UUID'];
  complete: Scalars['Boolean'];
};

export type NewTaskLocation = {
  taskID: Scalars['UUID'];
  taskGroupID: Scalars['UUID'];
  position: Scalars['Float'];
};

export type DeleteTaskInput = {
  taskID: Scalars['String'];
};

export type DeleteTaskPayload = {
   __typename?: 'DeleteTaskPayload';
  taskID: Scalars['String'];
};

export type UpdateTaskName = {
  taskID: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateTaskChecklistItemLocation = {
  checklistID: Scalars['UUID'];
  checklistItemID: Scalars['UUID'];
  position: Scalars['Float'];
};

export type UpdateTaskChecklistItemLocationPayload = {
   __typename?: 'UpdateTaskChecklistItemLocationPayload';
  checklistID: Scalars['UUID'];
  prevChecklistID: Scalars['UUID'];
  checklistItem: TaskChecklistItem;
};

export type UpdateTaskChecklistLocation = {
  checklistID: Scalars['UUID'];
  position: Scalars['Float'];
};

export type UpdateTaskChecklistLocationPayload = {
   __typename?: 'UpdateTaskChecklistLocationPayload';
  checklist: TaskChecklist;
};

export type CreateTaskChecklist = {
  taskID: Scalars['UUID'];
  name: Scalars['String'];
  position: Scalars['Float'];
};

export type DeleteTaskChecklistItemPayload = {
   __typename?: 'DeleteTaskChecklistItemPayload';
  ok: Scalars['Boolean'];
  taskChecklistItem: TaskChecklistItem;
};

export type CreateTaskChecklistItem = {
  taskChecklistID: Scalars['UUID'];
  name: Scalars['String'];
  position: Scalars['Float'];
};

export type SetTaskChecklistItemComplete = {
  taskChecklistItemID: Scalars['UUID'];
  complete: Scalars['Boolean'];
};

export type DeleteTaskChecklistItem = {
  taskChecklistItemID: Scalars['UUID'];
};

export type UpdateTaskChecklistItemName = {
  taskChecklistItemID: Scalars['UUID'];
  name: Scalars['String'];
};

export type UpdateTaskChecklistName = {
  taskChecklistID: Scalars['UUID'];
  name: Scalars['String'];
};

export type DeleteTaskChecklist = {
  taskChecklistID: Scalars['UUID'];
};

export type DeleteTaskChecklistPayload = {
   __typename?: 'DeleteTaskChecklistPayload';
  ok: Scalars['Boolean'];
  taskChecklist: TaskChecklist;
};

export type NewTaskGroupLocation = {
  taskGroupID: Scalars['UUID'];
  position: Scalars['Float'];
};

export type UpdateTaskGroupName = {
  taskGroupID: Scalars['UUID'];
  name: Scalars['String'];
};

export type DeleteTaskGroupInput = {
  taskGroupID: Scalars['UUID'];
};

export type DeleteTaskGroupPayload = {
   __typename?: 'DeleteTaskGroupPayload';
  ok: Scalars['Boolean'];
  affectedRows: Scalars['Int'];
  taskGroup: TaskGroup;
};

export type NewTaskGroup = {
  projectID: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Float'];
};

export type AddTaskLabelInput = {
  taskID: Scalars['UUID'];
  projectLabelID: Scalars['UUID'];
};

export type RemoveTaskLabelInput = {
  taskLabelID: Scalars['UUID'];
};

export type ToggleTaskLabelInput = {
  taskID: Scalars['UUID'];
  projectLabelID: Scalars['UUID'];
};

export type ToggleTaskLabelPayload = {
   __typename?: 'ToggleTaskLabelPayload';
  active: Scalars['Boolean'];
  task: Task;
};

export type NewTeam = {
  name: Scalars['String'];
  organizationID: Scalars['UUID'];
};

export type DeleteTeam = {
  teamID: Scalars['UUID'];
};

export type DeleteTeamPayload = {
   __typename?: 'DeleteTeamPayload';
  ok: Scalars['Boolean'];
  team: Team;
  projects: Array<Project>;
};

export type DeleteTeamMember = {
  teamID: Scalars['UUID'];
  userID: Scalars['UUID'];
  newOwnerID?: Maybe<Scalars['UUID']>;
};

export type DeleteTeamMemberPayload = {
   __typename?: 'DeleteTeamMemberPayload';
  teamID: Scalars['UUID'];
  userID: Scalars['UUID'];
  affectedProjects: Array<Project>;
};

export type CreateTeamMember = {
  userID: Scalars['UUID'];
  teamID: Scalars['UUID'];
};

export type CreateTeamMemberPayload = {
   __typename?: 'CreateTeamMemberPayload';
  team: Team;
  teamMember: Member;
};

export type UpdateTeamMemberRole = {
  teamID: Scalars['UUID'];
  userID: Scalars['UUID'];
  roleCode: RoleCode;
};

export type UpdateTeamMemberRolePayload = {
   __typename?: 'UpdateTeamMemberRolePayload';
  ok: Scalars['Boolean'];
  teamID: Scalars['UUID'];
  member: Member;
};

export type UpdateUserPassword = {
  userID: Scalars['UUID'];
  password: Scalars['String'];
};

export type UpdateUserPasswordPayload = {
   __typename?: 'UpdateUserPasswordPayload';
  ok: Scalars['Boolean'];
  user: UserAccount;
};

export type UpdateUserRole = {
  userID: Scalars['UUID'];
  roleCode: RoleCode;
};

export type UpdateUserRolePayload = {
   __typename?: 'UpdateUserRolePayload';
  user: UserAccount;
};

export type NewRefreshToken = {
  userId: Scalars['String'];
};

export type NewUserAccount = {
  username: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  initials: Scalars['String'];
  password: Scalars['String'];
  roleCode: Scalars['String'];
};

export type LogoutUser = {
  userID: Scalars['String'];
};

export type DeleteUserAccount = {
  userID: Scalars['UUID'];
  newOwnerID?: Maybe<Scalars['UUID']>;
};

export type DeleteUserAccountPayload = {
   __typename?: 'DeleteUserAccountPayload';
  ok: Scalars['Boolean'];
  userAccount: UserAccount;
};

export type AssignTaskMutationVariables = {
  taskID: Scalars['UUID'];
  userID: Scalars['UUID'];
};


export type AssignTaskMutation = (
  { __typename?: 'Mutation' }
  & { assignTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id'>
    & { assigned: Array<(
      { __typename?: 'Member' }
      & Pick<Member, 'id' | 'fullName'>
    )> }
  ) }
);

export type ClearProfileAvatarMutationVariables = {};


export type ClearProfileAvatarMutation = (
  { __typename?: 'Mutation' }
  & { clearProfileAvatar: (
    { __typename?: 'UserAccount' }
    & Pick<UserAccount, 'id' | 'fullName'>
    & { profileIcon: (
      { __typename?: 'ProfileIcon' }
      & Pick<ProfileIcon, 'initials' | 'bgColor' | 'url'>
    ) }
  ) }
);

export type CreateProjectMutationVariables = {
  teamID: Scalars['UUID'];
  userID: Scalars['UUID'];
  name: Scalars['String'];
};


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name'>
    ) }
  ) }
);

export type CreateProjectLabelMutationVariables = {
  projectID: Scalars['UUID'];
  labelColorID: Scalars['UUID'];
  name: Scalars['String'];
};


export type CreateProjectLabelMutation = (
  { __typename?: 'Mutation' }
  & { createProjectLabel: (
    { __typename?: 'ProjectLabel' }
    & Pick<ProjectLabel, 'id' | 'createdDate' | 'name'>
    & { labelColor: (
      { __typename?: 'LabelColor' }
      & Pick<LabelColor, 'id' | 'colorHex' | 'name' | 'position'>
    ) }
  ) }
);

export type CreateTaskGroupMutationVariables = {
  projectID: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Float'];
};


export type CreateTaskGroupMutation = (
  { __typename?: 'Mutation' }
  & { createTaskGroup: (
    { __typename?: 'TaskGroup' }
    & Pick<TaskGroup, 'id' | 'name' | 'position'>
  ) }
);

export type DeleteProjectLabelMutationVariables = {
  projectLabelID: Scalars['UUID'];
};


export type DeleteProjectLabelMutation = (
  { __typename?: 'Mutation' }
  & { deleteProjectLabel: (
    { __typename?: 'ProjectLabel' }
    & Pick<ProjectLabel, 'id'>
  ) }
);

export type DeleteTaskMutationVariables = {
  taskID: Scalars['String'];
};


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & { deleteTask: (
    { __typename?: 'DeleteTaskPayload' }
    & Pick<DeleteTaskPayload, 'taskID'>
  ) }
);

export type DeleteTaskGroupMutationVariables = {
  taskGroupID: Scalars['UUID'];
};


export type DeleteTaskGroupMutation = (
  { __typename?: 'Mutation' }
  & { deleteTaskGroup: (
    { __typename?: 'DeleteTaskGroupPayload' }
    & Pick<DeleteTaskGroupPayload, 'ok' | 'affectedRows'>
    & { taskGroup: (
      { __typename?: 'TaskGroup' }
      & Pick<TaskGroup, 'id'>
      & { tasks: Array<(
        { __typename?: 'Task' }
        & Pick<Task, 'id' | 'name'>
      )> }
    ) }
  ) }
);

export type FindProjectQueryVariables = {
  projectID: Scalars['UUID'];
};


export type FindProjectQuery = (
  { __typename?: 'Query' }
  & { findProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'name'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id'>
    ), members: Array<(
      { __typename?: 'Member' }
      & Pick<Member, 'id' | 'fullName' | 'username'>
      & { role: (
        { __typename?: 'Role' }
        & Pick<Role, 'code' | 'name'>
      ), profileIcon: (
        { __typename?: 'ProfileIcon' }
        & Pick<ProfileIcon, 'url' | 'initials' | 'bgColor'>
      ) }
    )>, labels: Array<(
      { __typename?: 'ProjectLabel' }
      & Pick<ProjectLabel, 'id' | 'createdDate' | 'name'>
      & { labelColor: (
        { __typename?: 'LabelColor' }
        & Pick<LabelColor, 'id' | 'name' | 'colorHex' | 'position'>
      ) }
    )>, taskGroups: Array<(
      { __typename?: 'TaskGroup' }
      & Pick<TaskGroup, 'id' | 'name' | 'position'>
      & { tasks: Array<(
        { __typename?: 'Task' }
        & TaskFieldsFragment
      )> }
    )> }
  ), labelColors: Array<(
    { __typename?: 'LabelColor' }
    & Pick<LabelColor, 'id' | 'position' | 'colorHex' | 'name'>
  )>, users: Array<(
    { __typename?: 'UserAccount' }
    & Pick<UserAccount, 'id' | 'email' | 'fullName' | 'username'>
    & { role: (
      { __typename?: 'Role' }
      & Pick<Role, 'code' | 'name'>
    ), profileIcon: (
      { __typename?: 'ProfileIcon' }
      & Pick<ProfileIcon, 'url' | 'initials' | 'bgColor'>
    ), owned: (
      { __typename?: 'OwnedList' }
      & { teams: Array<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name'>
      )>, projects: Array<(
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name'>
      )> }
    ), member: (
      { __typename?: 'MemberList' }
      & { teams: Array<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name'>
      )>, projects: Array<(
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name'>
      )> }
    ) }
  )> }
);

export type FindTaskQueryVariables = {
  taskID: Scalars['UUID'];
};


export type FindTaskQuery = (
  { __typename?: 'Query' }
  & { findTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'description' | 'dueDate' | 'position' | 'complete'>
    & { taskGroup: (
      { __typename?: 'TaskGroup' }
      & Pick<TaskGroup, 'id'>
    ), badges: (
      { __typename?: 'TaskBadges' }
      & { checklist?: Maybe<(
        { __typename?: 'ChecklistBadge' }
        & Pick<ChecklistBadge, 'total' | 'complete'>
      )> }
    ), checklists: Array<(
      { __typename?: 'TaskChecklist' }
      & Pick<TaskChecklist, 'id' | 'name' | 'position'>
      & { items: Array<(
        { __typename?: 'TaskChecklistItem' }
        & Pick<TaskChecklistItem, 'id' | 'name' | 'taskChecklistID' | 'complete' | 'position'>
      )> }
    )>, labels: Array<(
      { __typename?: 'TaskLabel' }
      & Pick<TaskLabel, 'id' | 'assignedDate'>
      & { projectLabel: (
        { __typename?: 'ProjectLabel' }
        & Pick<ProjectLabel, 'id' | 'name' | 'createdDate'>
        & { labelColor: (
          { __typename?: 'LabelColor' }
          & Pick<LabelColor, 'id' | 'colorHex' | 'position' | 'name'>
        ) }
      ) }
    )>, assigned: Array<(
      { __typename?: 'Member' }
      & Pick<Member, 'id' | 'fullName'>
      & { profileIcon: (
        { __typename?: 'ProfileIcon' }
        & Pick<ProfileIcon, 'url' | 'initials' | 'bgColor'>
      ) }
    )> }
  ) }
);

export type TaskFieldsFragment = (
  { __typename?: 'Task' }
  & Pick<Task, 'id' | 'name' | 'description' | 'dueDate' | 'complete' | 'position'>
  & { badges: (
    { __typename?: 'TaskBadges' }
    & { checklist?: Maybe<(
      { __typename?: 'ChecklistBadge' }
      & Pick<ChecklistBadge, 'complete' | 'total'>
    )> }
  ), taskGroup: (
    { __typename?: 'TaskGroup' }
    & Pick<TaskGroup, 'id' | 'name' | 'position'>
  ), labels: Array<(
    { __typename?: 'TaskLabel' }
    & Pick<TaskLabel, 'id' | 'assignedDate'>
    & { projectLabel: (
      { __typename?: 'ProjectLabel' }
      & Pick<ProjectLabel, 'id' | 'name' | 'createdDate'>
      & { labelColor: (
        { __typename?: 'LabelColor' }
        & Pick<LabelColor, 'id' | 'colorHex' | 'position' | 'name'>
      ) }
    ) }
  )>, assigned: Array<(
    { __typename?: 'Member' }
    & Pick<Member, 'id' | 'fullName'>
    & { profileIcon: (
      { __typename?: 'ProfileIcon' }
      & Pick<ProfileIcon, 'url' | 'initials' | 'bgColor'>
    ) }
  )> }
);

export type GetProjectsQueryVariables = {};


export type GetProjectsQuery = (
  { __typename?: 'Query' }
  & { organizations: Array<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name'>
  )>, teams: Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'createdAt'>
  )>, projects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name'>
    ) }
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'MePayload' }
    & { user: (
      { __typename?: 'UserAccount' }
      & Pick<UserAccount, 'id' | 'fullName'>
      & { profileIcon: (
        { __typename?: 'ProfileIcon' }
        & Pick<ProfileIcon, 'initials' | 'bgColor' | 'url'>
      ) }
    ), teamRoles: Array<(
      { __typename?: 'TeamRole' }
      & Pick<TeamRole, 'teamID' | 'roleCode'>
    )>, projectRoles: Array<(
      { __typename?: 'ProjectRole' }
      & Pick<ProjectRole, 'projectID' | 'roleCode'>
    )> }
  ) }
);

export type CreateProjectMemberMutationVariables = {
  projectID: Scalars['UUID'];
  userID: Scalars['UUID'];
};


export type CreateProjectMemberMutation = (
  { __typename?: 'Mutation' }
  & { createProjectMember: (
    { __typename?: 'CreateProjectMemberPayload' }
    & Pick<CreateProjectMemberPayload, 'ok'>
    & { member: (
      { __typename?: 'Member' }
      & Pick<Member, 'id' | 'fullName' | 'username'>
      & { profileIcon: (
        { __typename?: 'ProfileIcon' }
        & Pick<ProfileIcon, 'url' | 'initials' | 'bgColor'>
      ), role: (
        { __typename?: 'Role' }
        & Pick<Role, 'code' | 'name'>
      ) }
    ) }
  ) }
);

export type DeleteProjectMutationVariables = {
  projectID: Scalars['UUID'];
};


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & { deleteProject: (
    { __typename?: 'DeleteProjectPayload' }
    & Pick<DeleteProjectPayload, 'ok'>
    & { project: (
      { __typename?: 'Project' }
      & Pick<Project, 'id'>
    ) }
  ) }
);

export type DeleteProjectMemberMutationVariables = {
  projectID: Scalars['UUID'];
  userID: Scalars['UUID'];
};


export type DeleteProjectMemberMutation = (
  { __typename?: 'Mutation' }
  & { deleteProjectMember: (
    { __typename?: 'DeleteProjectMemberPayload' }
    & Pick<DeleteProjectMemberPayload, 'ok' | 'projectID'>
    & { member: (
      { __typename?: 'Member' }
      & Pick<Member, 'id'>
    ) }
  ) }
);

export type UpdateProjectMemberRoleMutationVariables = {
  projectID: Scalars['UUID'];
  userID: Scalars['UUID'];
  roleCode: RoleCode;
};


export type UpdateProjectMemberRoleMutation = (
  { __typename?: 'Mutation' }
  & { updateProjectMemberRole: (
    { __typename?: 'UpdateProjectMemberRolePayload' }
    & Pick<UpdateProjectMemberRolePayload, 'ok'>
    & { member: (
      { __typename?: 'Member' }
      & Pick<Member, 'id'>
      & { role: (
        { __typename?: 'Role' }
        & Pick<Role, 'code' | 'name'>
      ) }
    ) }
  ) }
);

export type CreateTaskMutationVariables = {
  taskGroupID: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Float'];
};


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & TaskFieldsFragment
  ) }
);

export type CreateTaskChecklistMutationVariables = {
  taskID: Scalars['UUID'];
  name: Scalars['String'];
  position: Scalars['Float'];
};


export type CreateTaskChecklistMutation = (
  { __typename?: 'Mutation' }
  & { createTaskChecklist: (
    { __typename?: 'TaskChecklist' }
    & Pick<TaskChecklist, 'id' | 'name' | 'position'>
    & { items: Array<(
      { __typename?: 'TaskChecklistItem' }
      & Pick<TaskChecklistItem, 'id' | 'name' | 'taskChecklistID' | 'complete' | 'position'>
    )> }
  ) }
);

export type CreateTaskChecklistItemMutationVariables = {
  taskChecklistID: Scalars['UUID'];
  name: Scalars['String'];
  position: Scalars['Float'];
};


export type CreateTaskChecklistItemMutation = (
  { __typename?: 'Mutation' }
  & { createTaskChecklistItem: (
    { __typename?: 'TaskChecklistItem' }
    & Pick<TaskChecklistItem, 'id' | 'name' | 'taskChecklistID' | 'position' | 'complete'>
  ) }
);

export type DeleteTaskChecklistMutationVariables = {
  taskChecklistID: Scalars['UUID'];
};


export type DeleteTaskChecklistMutation = (
  { __typename?: 'Mutation' }
  & { deleteTaskChecklist: (
    { __typename?: 'DeleteTaskChecklistPayload' }
    & Pick<DeleteTaskChecklistPayload, 'ok'>
    & { taskChecklist: (
      { __typename?: 'TaskChecklist' }
      & Pick<TaskChecklist, 'id'>
    ) }
  ) }
);

export type DeleteTaskChecklistItemMutationVariables = {
  taskChecklistItemID: Scalars['UUID'];
};


export type DeleteTaskChecklistItemMutation = (
  { __typename?: 'Mutation' }
  & { deleteTaskChecklistItem: (
    { __typename?: 'DeleteTaskChecklistItemPayload' }
    & Pick<DeleteTaskChecklistItemPayload, 'ok'>
    & { taskChecklistItem: (
      { __typename?: 'TaskChecklistItem' }
      & Pick<TaskChecklistItem, 'id' | 'taskChecklistID'>
    ) }
  ) }
);

export type SetTaskChecklistItemCompleteMutationVariables = {
  taskChecklistItemID: Scalars['UUID'];
  complete: Scalars['Boolean'];
};


export type SetTaskChecklistItemCompleteMutation = (
  { __typename?: 'Mutation' }
  & { setTaskChecklistItemComplete: (
    { __typename?: 'TaskChecklistItem' }
    & Pick<TaskChecklistItem, 'id' | 'complete'>
  ) }
);

export type SetTaskCompleteMutationVariables = {
  taskID: Scalars['UUID'];
  complete: Scalars['Boolean'];
};


export type SetTaskCompleteMutation = (
  { __typename?: 'Mutation' }
  & { setTaskComplete: (
    { __typename?: 'Task' }
    & TaskFieldsFragment
  ) }
);

export type UpdateTaskChecklistItemLocationMutationVariables = {
  checklistID: Scalars['UUID'];
  checklistItemID: Scalars['UUID'];
  position: Scalars['Float'];
};


export type UpdateTaskChecklistItemLocationMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskChecklistItemLocation: (
    { __typename?: 'UpdateTaskChecklistItemLocationPayload' }
    & Pick<UpdateTaskChecklistItemLocationPayload, 'checklistID' | 'prevChecklistID'>
    & { checklistItem: (
      { __typename?: 'TaskChecklistItem' }
      & Pick<TaskChecklistItem, 'id' | 'taskChecklistID' | 'position'>
    ) }
  ) }
);

export type UpdateTaskChecklistItemNameMutationVariables = {
  taskChecklistItemID: Scalars['UUID'];
  name: Scalars['String'];
};


export type UpdateTaskChecklistItemNameMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskChecklistItemName: (
    { __typename?: 'TaskChecklistItem' }
    & Pick<TaskChecklistItem, 'id' | 'name'>
  ) }
);

export type UpdateTaskChecklistLocationMutationVariables = {
  checklistID: Scalars['UUID'];
  position: Scalars['Float'];
};


export type UpdateTaskChecklistLocationMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskChecklistLocation: (
    { __typename?: 'UpdateTaskChecklistLocationPayload' }
    & { checklist: (
      { __typename?: 'TaskChecklist' }
      & Pick<TaskChecklist, 'id' | 'position'>
    ) }
  ) }
);

export type UpdateTaskChecklistNameMutationVariables = {
  taskChecklistID: Scalars['UUID'];
  name: Scalars['String'];
};


export type UpdateTaskChecklistNameMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskChecklistName: (
    { __typename?: 'TaskChecklist' }
    & Pick<TaskChecklist, 'id' | 'name' | 'position'>
    & { items: Array<(
      { __typename?: 'TaskChecklistItem' }
      & Pick<TaskChecklistItem, 'id' | 'name' | 'taskChecklistID' | 'complete' | 'position'>
    )> }
  ) }
);

export type UpdateTaskGroupNameMutationVariables = {
  taskGroupID: Scalars['UUID'];
  name: Scalars['String'];
};


export type UpdateTaskGroupNameMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskGroupName: (
    { __typename?: 'TaskGroup' }
    & Pick<TaskGroup, 'id' | 'name'>
  ) }
);

export type CreateTeamMutationVariables = {
  name: Scalars['String'];
  organizationID: Scalars['UUID'];
};


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'createdAt' | 'name'>
  ) }
);

export type CreateTeamMemberMutationVariables = {
  userID: Scalars['UUID'];
  teamID: Scalars['UUID'];
};


export type CreateTeamMemberMutation = (
  { __typename?: 'Mutation' }
  & { createTeamMember: (
    { __typename?: 'CreateTeamMemberPayload' }
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id'>
    ), teamMember: (
      { __typename?: 'Member' }
      & Pick<Member, 'id' | 'username' | 'fullName'>
      & { role: (
        { __typename?: 'Role' }
        & Pick<Role, 'code' | 'name'>
      ), profileIcon: (
        { __typename?: 'ProfileIcon' }
        & Pick<ProfileIcon, 'url' | 'initials' | 'bgColor'>
      ) }
    ) }
  ) }
);

export type DeleteTeamMutationVariables = {
  teamID: Scalars['UUID'];
};


export type DeleteTeamMutation = (
  { __typename?: 'Mutation' }
  & { deleteTeam: (
    { __typename?: 'DeleteTeamPayload' }
    & Pick<DeleteTeamPayload, 'ok'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id'>
    ) }
  ) }
);

export type DeleteTeamMemberMutationVariables = {
  teamID: Scalars['UUID'];
  userID: Scalars['UUID'];
  newOwnerID?: Maybe<Scalars['UUID']>;
};


export type DeleteTeamMemberMutation = (
  { __typename?: 'Mutation' }
  & { deleteTeamMember: (
    { __typename?: 'DeleteTeamMemberPayload' }
    & Pick<DeleteTeamMemberPayload, 'teamID' | 'userID'>
  ) }
);

export type GetTeamQueryVariables = {
  teamID: Scalars['UUID'];
};


export type GetTeamQuery = (
  { __typename?: 'Query' }
  & { findTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'createdAt' | 'name'>
    & { members: Array<(
      { __typename?: 'Member' }
      & Pick<Member, 'id' | 'fullName' | 'username'>
      & { role: (
        { __typename?: 'Role' }
        & Pick<Role, 'code' | 'name'>
      ), profileIcon: (
        { __typename?: 'ProfileIcon' }
        & Pick<ProfileIcon, 'url' | 'initials' | 'bgColor'>
      ), owned: (
        { __typename?: 'OwnedList' }
        & { teams: Array<(
          { __typename?: 'Team' }
          & Pick<Team, 'id' | 'name'>
        )>, projects: Array<(
          { __typename?: 'Project' }
          & Pick<Project, 'id' | 'name'>
        )> }
      ), member: (
        { __typename?: 'MemberList' }
        & { teams: Array<(
          { __typename?: 'Team' }
          & Pick<Team, 'id' | 'name'>
        )>, projects: Array<(
          { __typename?: 'Project' }
          & Pick<Project, 'id' | 'name'>
        )> }
      ) }
    )> }
  ), projects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name'>
    ) }
  )>, users: Array<(
    { __typename?: 'UserAccount' }
    & Pick<UserAccount, 'id' | 'email' | 'fullName' | 'username'>
    & { role: (
      { __typename?: 'Role' }
      & Pick<Role, 'code' | 'name'>
    ), profileIcon: (
      { __typename?: 'ProfileIcon' }
      & Pick<ProfileIcon, 'url' | 'initials' | 'bgColor'>
    ), owned: (
      { __typename?: 'OwnedList' }
      & { teams: Array<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name'>
      )>, projects: Array<(
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name'>
      )> }
    ), member: (
      { __typename?: 'MemberList' }
      & { teams: Array<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name'>
      )>, projects: Array<(
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name'>
      )> }
    ) }
  )> }
);

export type UpdateTeamMemberRoleMutationVariables = {
  teamID: Scalars['UUID'];
  userID: Scalars['UUID'];
  roleCode: RoleCode;
};


export type UpdateTeamMemberRoleMutation = (
  { __typename?: 'Mutation' }
  & { updateTeamMemberRole: (
    { __typename?: 'UpdateTeamMemberRolePayload' }
    & Pick<UpdateTeamMemberRolePayload, 'teamID'>
    & { member: (
      { __typename?: 'Member' }
      & Pick<Member, 'id'>
      & { role: (
        { __typename?: 'Role' }
        & Pick<Role, 'code' | 'name'>
      ) }
    ) }
  ) }
);

export type ToggleTaskLabelMutationVariables = {
  taskID: Scalars['UUID'];
  projectLabelID: Scalars['UUID'];
};


export type ToggleTaskLabelMutation = (
  { __typename?: 'Mutation' }
  & { toggleTaskLabel: (
    { __typename?: 'ToggleTaskLabelPayload' }
    & Pick<ToggleTaskLabelPayload, 'active'>
    & { task: (
      { __typename?: 'Task' }
      & Pick<Task, 'id'>
      & { labels: Array<(
        { __typename?: 'TaskLabel' }
        & Pick<TaskLabel, 'id' | 'assignedDate'>
        & { projectLabel: (
          { __typename?: 'ProjectLabel' }
          & Pick<ProjectLabel, 'id' | 'createdDate' | 'name'>
          & { labelColor: (
            { __typename?: 'LabelColor' }
            & Pick<LabelColor, 'id' | 'colorHex' | 'name' | 'position'>
          ) }
        ) }
      )> }
    ) }
  ) }
);

export type UnassignTaskMutationVariables = {
  taskID: Scalars['UUID'];
  userID: Scalars['UUID'];
};


export type UnassignTaskMutation = (
  { __typename?: 'Mutation' }
  & { unassignTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id'>
    & { assigned: Array<(
      { __typename?: 'Member' }
      & Pick<Member, 'id' | 'fullName'>
    )> }
  ) }
);

export type UpdateProjectLabelMutationVariables = {
  projectLabelID: Scalars['UUID'];
  labelColorID: Scalars['UUID'];
  name: Scalars['String'];
};


export type UpdateProjectLabelMutation = (
  { __typename?: 'Mutation' }
  & { updateProjectLabel: (
    { __typename?: 'ProjectLabel' }
    & Pick<ProjectLabel, 'id' | 'createdDate' | 'name'>
    & { labelColor: (
      { __typename?: 'LabelColor' }
      & Pick<LabelColor, 'id' | 'colorHex' | 'name' | 'position'>
    ) }
  ) }
);

export type UpdateProjectNameMutationVariables = {
  projectID: Scalars['UUID'];
  name: Scalars['String'];
};


export type UpdateProjectNameMutation = (
  { __typename?: 'Mutation' }
  & { updateProjectName: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
  ) }
);

export type UpdateTaskDescriptionMutationVariables = {
  taskID: Scalars['UUID'];
  description: Scalars['String'];
};


export type UpdateTaskDescriptionMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskDescription: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'description'>
  ) }
);

export type UpdateTaskDueDateMutationVariables = {
  taskID: Scalars['UUID'];
  dueDate?: Maybe<Scalars['Time']>;
};


export type UpdateTaskDueDateMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskDueDate: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'dueDate'>
  ) }
);

export type UpdateTaskGroupLocationMutationVariables = {
  taskGroupID: Scalars['UUID'];
  position: Scalars['Float'];
};


export type UpdateTaskGroupLocationMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskGroupLocation: (
    { __typename?: 'TaskGroup' }
    & Pick<TaskGroup, 'id' | 'position'>
  ) }
);

export type UpdateTaskLocationMutationVariables = {
  taskID: Scalars['UUID'];
  taskGroupID: Scalars['UUID'];
  position: Scalars['Float'];
};


export type UpdateTaskLocationMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskLocation: (
    { __typename?: 'UpdateTaskLocationPayload' }
    & Pick<UpdateTaskLocationPayload, 'previousTaskGroupID'>
    & { task: (
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'createdAt' | 'name' | 'position'>
      & { taskGroup: (
        { __typename?: 'TaskGroup' }
        & Pick<TaskGroup, 'id'>
      ) }
    ) }
  ) }
);

export type UpdateTaskNameMutationVariables = {
  taskID: Scalars['String'];
  name: Scalars['String'];
};


export type UpdateTaskNameMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskName: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'position'>
  ) }
);

export type CreateUserAccountMutationVariables = {
  username: Scalars['String'];
  roleCode: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  initials: Scalars['String'];
  password: Scalars['String'];
};


export type CreateUserAccountMutation = (
  { __typename?: 'Mutation' }
  & { createUserAccount: (
    { __typename?: 'UserAccount' }
    & Pick<UserAccount, 'id' | 'email' | 'fullName' | 'initials' | 'username'>
    & { profileIcon: (
      { __typename?: 'ProfileIcon' }
      & Pick<ProfileIcon, 'url' | 'initials' | 'bgColor'>
    ), role: (
      { __typename?: 'Role' }
      & Pick<Role, 'code' | 'name'>
    ), owned: (
      { __typename?: 'OwnedList' }
      & { teams: Array<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name'>
      )>, projects: Array<(
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name'>
      )> }
    ), member: (
      { __typename?: 'MemberList' }
      & { teams: Array<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name'>
      )>, projects: Array<(
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name'>
      )> }
    ) }
  ) }
);

export type DeleteUserAccountMutationVariables = {
  userID: Scalars['UUID'];
  newOwnerID?: Maybe<Scalars['UUID']>;
};


export type DeleteUserAccountMutation = (
  { __typename?: 'Mutation' }
  & { deleteUserAccount: (
    { __typename?: 'DeleteUserAccountPayload' }
    & Pick<DeleteUserAccountPayload, 'ok'>
    & { userAccount: (
      { __typename?: 'UserAccount' }
      & Pick<UserAccount, 'id'>
    ) }
  ) }
);

export type UpdateUserPasswordMutationVariables = {
  userID: Scalars['UUID'];
  password: Scalars['String'];
};


export type UpdateUserPasswordMutation = (
  { __typename?: 'Mutation' }
  & { updateUserPassword: (
    { __typename?: 'UpdateUserPasswordPayload' }
    & Pick<UpdateUserPasswordPayload, 'ok'>
  ) }
);

export type UpdateUserRoleMutationVariables = {
  userID: Scalars['UUID'];
  roleCode: RoleCode;
};


export type UpdateUserRoleMutation = (
  { __typename?: 'Mutation' }
  & { updateUserRole: (
    { __typename?: 'UpdateUserRolePayload' }
    & { user: (
      { __typename?: 'UserAccount' }
      & Pick<UserAccount, 'id'>
      & { role: (
        { __typename?: 'Role' }
        & Pick<Role, 'code' | 'name'>
      ) }
    ) }
  ) }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'UserAccount' }
    & Pick<UserAccount, 'id' | 'email' | 'fullName' | 'username'>
    & { role: (
      { __typename?: 'Role' }
      & Pick<Role, 'code' | 'name'>
    ), profileIcon: (
      { __typename?: 'ProfileIcon' }
      & Pick<ProfileIcon, 'url' | 'initials' | 'bgColor'>
    ), owned: (
      { __typename?: 'OwnedList' }
      & { teams: Array<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name'>
      )>, projects: Array<(
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name'>
      )> }
    ), member: (
      { __typename?: 'MemberList' }
      & { teams: Array<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name'>
      )>, projects: Array<(
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name'>
      )> }
    ) }
  )> }
);

export const TaskFieldsFragmentDoc = gql`
    fragment TaskFields on Task {
  id
  name
  description
  dueDate
  complete
  position
  badges {
    checklist {
      complete
      total
    }
  }
  taskGroup {
    id
    name
    position
  }
  labels {
    id
    assignedDate
    projectLabel {
      id
      name
      createdDate
      labelColor {
        id
        colorHex
        position
        name
      }
    }
  }
  assigned {
    id
    fullName
    profileIcon {
      url
      initials
      bgColor
    }
  }
}
    `;
export const AssignTaskDocument = gql`
    mutation assignTask($taskID: UUID!, $userID: UUID!) {
  assignTask(input: {taskID: $taskID, userID: $userID}) {
    id
    assigned {
      id
      fullName
    }
  }
}
    `;
export type AssignTaskMutationFn = ApolloReactCommon.MutationFunction<AssignTaskMutation, AssignTaskMutationVariables>;

/**
 * __useAssignTaskMutation__
 *
 * To run a mutation, you first call `useAssignTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignTaskMutation, { data, loading, error }] = useAssignTaskMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useAssignTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AssignTaskMutation, AssignTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<AssignTaskMutation, AssignTaskMutationVariables>(AssignTaskDocument, baseOptions);
      }
export type AssignTaskMutationHookResult = ReturnType<typeof useAssignTaskMutation>;
export type AssignTaskMutationResult = ApolloReactCommon.MutationResult<AssignTaskMutation>;
export type AssignTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<AssignTaskMutation, AssignTaskMutationVariables>;
export const ClearProfileAvatarDocument = gql`
    mutation clearProfileAvatar {
  clearProfileAvatar {
    id
    fullName
    profileIcon {
      initials
      bgColor
      url
    }
  }
}
    `;
export type ClearProfileAvatarMutationFn = ApolloReactCommon.MutationFunction<ClearProfileAvatarMutation, ClearProfileAvatarMutationVariables>;

/**
 * __useClearProfileAvatarMutation__
 *
 * To run a mutation, you first call `useClearProfileAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearProfileAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearProfileAvatarMutation, { data, loading, error }] = useClearProfileAvatarMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearProfileAvatarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ClearProfileAvatarMutation, ClearProfileAvatarMutationVariables>) {
        return ApolloReactHooks.useMutation<ClearProfileAvatarMutation, ClearProfileAvatarMutationVariables>(ClearProfileAvatarDocument, baseOptions);
      }
export type ClearProfileAvatarMutationHookResult = ReturnType<typeof useClearProfileAvatarMutation>;
export type ClearProfileAvatarMutationResult = ApolloReactCommon.MutationResult<ClearProfileAvatarMutation>;
export type ClearProfileAvatarMutationOptions = ApolloReactCommon.BaseMutationOptions<ClearProfileAvatarMutation, ClearProfileAvatarMutationVariables>;
export const CreateProjectDocument = gql`
    mutation createProject($teamID: UUID!, $userID: UUID!, $name: String!) {
  createProject(input: {teamID: $teamID, userID: $userID, name: $name}) {
    id
    name
    team {
      id
      name
    }
  }
}
    `;
export type CreateProjectMutationFn = ApolloReactCommon.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      userID: // value for 'userID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, baseOptions);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = ApolloReactCommon.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateProjectLabelDocument = gql`
    mutation createProjectLabel($projectID: UUID!, $labelColorID: UUID!, $name: String!) {
  createProjectLabel(input: {projectID: $projectID, labelColorID: $labelColorID, name: $name}) {
    id
    createdDate
    labelColor {
      id
      colorHex
      name
      position
    }
    name
  }
}
    `;
export type CreateProjectLabelMutationFn = ApolloReactCommon.MutationFunction<CreateProjectLabelMutation, CreateProjectLabelMutationVariables>;

/**
 * __useCreateProjectLabelMutation__
 *
 * To run a mutation, you first call `useCreateProjectLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectLabelMutation, { data, loading, error }] = useCreateProjectLabelMutation({
 *   variables: {
 *      projectID: // value for 'projectID'
 *      labelColorID: // value for 'labelColorID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateProjectLabelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProjectLabelMutation, CreateProjectLabelMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateProjectLabelMutation, CreateProjectLabelMutationVariables>(CreateProjectLabelDocument, baseOptions);
      }
export type CreateProjectLabelMutationHookResult = ReturnType<typeof useCreateProjectLabelMutation>;
export type CreateProjectLabelMutationResult = ApolloReactCommon.MutationResult<CreateProjectLabelMutation>;
export type CreateProjectLabelMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProjectLabelMutation, CreateProjectLabelMutationVariables>;
export const CreateTaskGroupDocument = gql`
    mutation createTaskGroup($projectID: String!, $name: String!, $position: Float!) {
  createTaskGroup(input: {projectID: $projectID, name: $name, position: $position}) {
    id
    name
    position
  }
}
    `;
export type CreateTaskGroupMutationFn = ApolloReactCommon.MutationFunction<CreateTaskGroupMutation, CreateTaskGroupMutationVariables>;

/**
 * __useCreateTaskGroupMutation__
 *
 * To run a mutation, you first call `useCreateTaskGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskGroupMutation, { data, loading, error }] = useCreateTaskGroupMutation({
 *   variables: {
 *      projectID: // value for 'projectID'
 *      name: // value for 'name'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useCreateTaskGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskGroupMutation, CreateTaskGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTaskGroupMutation, CreateTaskGroupMutationVariables>(CreateTaskGroupDocument, baseOptions);
      }
export type CreateTaskGroupMutationHookResult = ReturnType<typeof useCreateTaskGroupMutation>;
export type CreateTaskGroupMutationResult = ApolloReactCommon.MutationResult<CreateTaskGroupMutation>;
export type CreateTaskGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskGroupMutation, CreateTaskGroupMutationVariables>;
export const DeleteProjectLabelDocument = gql`
    mutation deleteProjectLabel($projectLabelID: UUID!) {
  deleteProjectLabel(input: {projectLabelID: $projectLabelID}) {
    id
  }
}
    `;
export type DeleteProjectLabelMutationFn = ApolloReactCommon.MutationFunction<DeleteProjectLabelMutation, DeleteProjectLabelMutationVariables>;

/**
 * __useDeleteProjectLabelMutation__
 *
 * To run a mutation, you first call `useDeleteProjectLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectLabelMutation, { data, loading, error }] = useDeleteProjectLabelMutation({
 *   variables: {
 *      projectLabelID: // value for 'projectLabelID'
 *   },
 * });
 */
export function useDeleteProjectLabelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteProjectLabelMutation, DeleteProjectLabelMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteProjectLabelMutation, DeleteProjectLabelMutationVariables>(DeleteProjectLabelDocument, baseOptions);
      }
export type DeleteProjectLabelMutationHookResult = ReturnType<typeof useDeleteProjectLabelMutation>;
export type DeleteProjectLabelMutationResult = ApolloReactCommon.MutationResult<DeleteProjectLabelMutation>;
export type DeleteProjectLabelMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteProjectLabelMutation, DeleteProjectLabelMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation deleteTask($taskID: String!) {
  deleteTask(input: {taskID: $taskID}) {
    taskID
  }
}
    `;
export type DeleteTaskMutationFn = ApolloReactCommon.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, baseOptions);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = ApolloReactCommon.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const DeleteTaskGroupDocument = gql`
    mutation deleteTaskGroup($taskGroupID: UUID!) {
  deleteTaskGroup(input: {taskGroupID: $taskGroupID}) {
    ok
    affectedRows
    taskGroup {
      id
      tasks {
        id
        name
      }
    }
  }
}
    `;
export type DeleteTaskGroupMutationFn = ApolloReactCommon.MutationFunction<DeleteTaskGroupMutation, DeleteTaskGroupMutationVariables>;

/**
 * __useDeleteTaskGroupMutation__
 *
 * To run a mutation, you first call `useDeleteTaskGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskGroupMutation, { data, loading, error }] = useDeleteTaskGroupMutation({
 *   variables: {
 *      taskGroupID: // value for 'taskGroupID'
 *   },
 * });
 */
export function useDeleteTaskGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTaskGroupMutation, DeleteTaskGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTaskGroupMutation, DeleteTaskGroupMutationVariables>(DeleteTaskGroupDocument, baseOptions);
      }
export type DeleteTaskGroupMutationHookResult = ReturnType<typeof useDeleteTaskGroupMutation>;
export type DeleteTaskGroupMutationResult = ApolloReactCommon.MutationResult<DeleteTaskGroupMutation>;
export type DeleteTaskGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTaskGroupMutation, DeleteTaskGroupMutationVariables>;
export const FindProjectDocument = gql`
    query findProject($projectID: UUID!) {
  findProject(input: {projectID: $projectID}) {
    name
    team {
      id
    }
    members {
      id
      fullName
      username
      role {
        code
        name
      }
      profileIcon {
        url
        initials
        bgColor
      }
    }
    labels {
      id
      createdDate
      name
      labelColor {
        id
        name
        colorHex
        position
      }
    }
    taskGroups {
      id
      name
      position
      tasks {
        ...TaskFields
      }
    }
  }
  labelColors {
    id
    position
    colorHex
    name
  }
  users {
    id
    email
    fullName
    username
    role {
      code
      name
    }
    profileIcon {
      url
      initials
      bgColor
    }
    owned {
      teams {
        id
        name
      }
      projects {
        id
        name
      }
    }
    member {
      teams {
        id
        name
      }
      projects {
        id
        name
      }
    }
  }
}
    ${TaskFieldsFragmentDoc}`;

/**
 * __useFindProjectQuery__
 *
 * To run a query within a React component, call `useFindProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectQuery({
 *   variables: {
 *      projectID: // value for 'projectID'
 *   },
 * });
 */
export function useFindProjectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindProjectQuery, FindProjectQueryVariables>) {
        return ApolloReactHooks.useQuery<FindProjectQuery, FindProjectQueryVariables>(FindProjectDocument, baseOptions);
      }
export function useFindProjectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindProjectQuery, FindProjectQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindProjectQuery, FindProjectQueryVariables>(FindProjectDocument, baseOptions);
        }
export type FindProjectQueryHookResult = ReturnType<typeof useFindProjectQuery>;
export type FindProjectLazyQueryHookResult = ReturnType<typeof useFindProjectLazyQuery>;
export type FindProjectQueryResult = ApolloReactCommon.QueryResult<FindProjectQuery, FindProjectQueryVariables>;
export const FindTaskDocument = gql`
    query findTask($taskID: UUID!) {
  findTask(input: {taskID: $taskID}) {
    id
    name
    description
    dueDate
    position
    complete
    taskGroup {
      id
    }
    badges {
      checklist {
        total
        complete
      }
    }
    checklists {
      id
      name
      position
      items {
        id
        name
        taskChecklistID
        complete
        position
      }
    }
    labels {
      id
      assignedDate
      projectLabel {
        id
        name
        createdDate
        labelColor {
          id
          colorHex
          position
          name
        }
      }
    }
    assigned {
      id
      fullName
      profileIcon {
        url
        initials
        bgColor
      }
    }
  }
}
    `;

/**
 * __useFindTaskQuery__
 *
 * To run a query within a React component, call `useFindTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTaskQuery({
 *   variables: {
 *      taskID: // value for 'taskID'
 *   },
 * });
 */
export function useFindTaskQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindTaskQuery, FindTaskQueryVariables>) {
        return ApolloReactHooks.useQuery<FindTaskQuery, FindTaskQueryVariables>(FindTaskDocument, baseOptions);
      }
export function useFindTaskLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindTaskQuery, FindTaskQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindTaskQuery, FindTaskQueryVariables>(FindTaskDocument, baseOptions);
        }
export type FindTaskQueryHookResult = ReturnType<typeof useFindTaskQuery>;
export type FindTaskLazyQueryHookResult = ReturnType<typeof useFindTaskLazyQuery>;
export type FindTaskQueryResult = ApolloReactCommon.QueryResult<FindTaskQuery, FindTaskQueryVariables>;
export const GetProjectsDocument = gql`
    query getProjects {
  organizations {
    id
    name
  }
  teams {
    id
    name
    createdAt
  }
  projects {
    id
    name
    team {
      id
      name
    }
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, baseOptions);
      }
export function useGetProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, baseOptions);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = ApolloReactCommon.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    user {
      id
      fullName
      profileIcon {
        initials
        bgColor
        url
      }
    }
    teamRoles {
      teamID
      roleCode
    }
    projectRoles {
      projectID
      roleCode
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const CreateProjectMemberDocument = gql`
    mutation createProjectMember($projectID: UUID!, $userID: UUID!) {
  createProjectMember(input: {projectID: $projectID, userID: $userID}) {
    ok
    member {
      id
      fullName
      profileIcon {
        url
        initials
        bgColor
      }
      username
      role {
        code
        name
      }
    }
  }
}
    `;
export type CreateProjectMemberMutationFn = ApolloReactCommon.MutationFunction<CreateProjectMemberMutation, CreateProjectMemberMutationVariables>;

/**
 * __useCreateProjectMemberMutation__
 *
 * To run a mutation, you first call `useCreateProjectMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMemberMutation, { data, loading, error }] = useCreateProjectMemberMutation({
 *   variables: {
 *      projectID: // value for 'projectID'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useCreateProjectMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProjectMemberMutation, CreateProjectMemberMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateProjectMemberMutation, CreateProjectMemberMutationVariables>(CreateProjectMemberDocument, baseOptions);
      }
export type CreateProjectMemberMutationHookResult = ReturnType<typeof useCreateProjectMemberMutation>;
export type CreateProjectMemberMutationResult = ApolloReactCommon.MutationResult<CreateProjectMemberMutation>;
export type CreateProjectMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProjectMemberMutation, CreateProjectMemberMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation deleteProject($projectID: UUID!) {
  deleteProject(input: {projectID: $projectID}) {
    ok
    project {
      id
    }
  }
}
    `;
export type DeleteProjectMutationFn = ApolloReactCommon.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      projectID: // value for 'projectID'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, baseOptions);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = ApolloReactCommon.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const DeleteProjectMemberDocument = gql`
    mutation deleteProjectMember($projectID: UUID!, $userID: UUID!) {
  deleteProjectMember(input: {projectID: $projectID, userID: $userID}) {
    ok
    member {
      id
    }
    projectID
  }
}
    `;
export type DeleteProjectMemberMutationFn = ApolloReactCommon.MutationFunction<DeleteProjectMemberMutation, DeleteProjectMemberMutationVariables>;

/**
 * __useDeleteProjectMemberMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMemberMutation, { data, loading, error }] = useDeleteProjectMemberMutation({
 *   variables: {
 *      projectID: // value for 'projectID'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useDeleteProjectMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteProjectMemberMutation, DeleteProjectMemberMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteProjectMemberMutation, DeleteProjectMemberMutationVariables>(DeleteProjectMemberDocument, baseOptions);
      }
export type DeleteProjectMemberMutationHookResult = ReturnType<typeof useDeleteProjectMemberMutation>;
export type DeleteProjectMemberMutationResult = ApolloReactCommon.MutationResult<DeleteProjectMemberMutation>;
export type DeleteProjectMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteProjectMemberMutation, DeleteProjectMemberMutationVariables>;
export const UpdateProjectMemberRoleDocument = gql`
    mutation updateProjectMemberRole($projectID: UUID!, $userID: UUID!, $roleCode: RoleCode!) {
  updateProjectMemberRole(input: {projectID: $projectID, userID: $userID, roleCode: $roleCode}) {
    ok
    member {
      id
      role {
        code
        name
      }
    }
  }
}
    `;
export type UpdateProjectMemberRoleMutationFn = ApolloReactCommon.MutationFunction<UpdateProjectMemberRoleMutation, UpdateProjectMemberRoleMutationVariables>;

/**
 * __useUpdateProjectMemberRoleMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMemberRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMemberRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMemberRoleMutation, { data, loading, error }] = useUpdateProjectMemberRoleMutation({
 *   variables: {
 *      projectID: // value for 'projectID'
 *      userID: // value for 'userID'
 *      roleCode: // value for 'roleCode'
 *   },
 * });
 */
export function useUpdateProjectMemberRoleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProjectMemberRoleMutation, UpdateProjectMemberRoleMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateProjectMemberRoleMutation, UpdateProjectMemberRoleMutationVariables>(UpdateProjectMemberRoleDocument, baseOptions);
      }
export type UpdateProjectMemberRoleMutationHookResult = ReturnType<typeof useUpdateProjectMemberRoleMutation>;
export type UpdateProjectMemberRoleMutationResult = ApolloReactCommon.MutationResult<UpdateProjectMemberRoleMutation>;
export type UpdateProjectMemberRoleMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProjectMemberRoleMutation, UpdateProjectMemberRoleMutationVariables>;
export const CreateTaskDocument = gql`
    mutation createTask($taskGroupID: String!, $name: String!, $position: Float!) {
  createTask(input: {taskGroupID: $taskGroupID, name: $name, position: $position}) {
    ...TaskFields
  }
}
    ${TaskFieldsFragmentDoc}`;
export type CreateTaskMutationFn = ApolloReactCommon.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      taskGroupID: // value for 'taskGroupID'
 *      name: // value for 'name'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, baseOptions);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = ApolloReactCommon.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const CreateTaskChecklistDocument = gql`
    mutation createTaskChecklist($taskID: UUID!, $name: String!, $position: Float!) {
  createTaskChecklist(input: {taskID: $taskID, name: $name, position: $position}) {
    id
    name
    position
    items {
      id
      name
      taskChecklistID
      complete
      position
    }
  }
}
    `;
export type CreateTaskChecklistMutationFn = ApolloReactCommon.MutationFunction<CreateTaskChecklistMutation, CreateTaskChecklistMutationVariables>;

/**
 * __useCreateTaskChecklistMutation__
 *
 * To run a mutation, you first call `useCreateTaskChecklistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskChecklistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskChecklistMutation, { data, loading, error }] = useCreateTaskChecklistMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      name: // value for 'name'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useCreateTaskChecklistMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskChecklistMutation, CreateTaskChecklistMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTaskChecklistMutation, CreateTaskChecklistMutationVariables>(CreateTaskChecklistDocument, baseOptions);
      }
export type CreateTaskChecklistMutationHookResult = ReturnType<typeof useCreateTaskChecklistMutation>;
export type CreateTaskChecklistMutationResult = ApolloReactCommon.MutationResult<CreateTaskChecklistMutation>;
export type CreateTaskChecklistMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskChecklistMutation, CreateTaskChecklistMutationVariables>;
export const CreateTaskChecklistItemDocument = gql`
    mutation createTaskChecklistItem($taskChecklistID: UUID!, $name: String!, $position: Float!) {
  createTaskChecklistItem(input: {taskChecklistID: $taskChecklistID, name: $name, position: $position}) {
    id
    name
    taskChecklistID
    position
    complete
  }
}
    `;
export type CreateTaskChecklistItemMutationFn = ApolloReactCommon.MutationFunction<CreateTaskChecklistItemMutation, CreateTaskChecklistItemMutationVariables>;

/**
 * __useCreateTaskChecklistItemMutation__
 *
 * To run a mutation, you first call `useCreateTaskChecklistItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskChecklistItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskChecklistItemMutation, { data, loading, error }] = useCreateTaskChecklistItemMutation({
 *   variables: {
 *      taskChecklistID: // value for 'taskChecklistID'
 *      name: // value for 'name'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useCreateTaskChecklistItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskChecklistItemMutation, CreateTaskChecklistItemMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTaskChecklistItemMutation, CreateTaskChecklistItemMutationVariables>(CreateTaskChecklistItemDocument, baseOptions);
      }
export type CreateTaskChecklistItemMutationHookResult = ReturnType<typeof useCreateTaskChecklistItemMutation>;
export type CreateTaskChecklistItemMutationResult = ApolloReactCommon.MutationResult<CreateTaskChecklistItemMutation>;
export type CreateTaskChecklistItemMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskChecklistItemMutation, CreateTaskChecklistItemMutationVariables>;
export const DeleteTaskChecklistDocument = gql`
    mutation deleteTaskChecklist($taskChecklistID: UUID!) {
  deleteTaskChecklist(input: {taskChecklistID: $taskChecklistID}) {
    ok
    taskChecklist {
      id
    }
  }
}
    `;
export type DeleteTaskChecklistMutationFn = ApolloReactCommon.MutationFunction<DeleteTaskChecklistMutation, DeleteTaskChecklistMutationVariables>;

/**
 * __useDeleteTaskChecklistMutation__
 *
 * To run a mutation, you first call `useDeleteTaskChecklistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskChecklistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskChecklistMutation, { data, loading, error }] = useDeleteTaskChecklistMutation({
 *   variables: {
 *      taskChecklistID: // value for 'taskChecklistID'
 *   },
 * });
 */
export function useDeleteTaskChecklistMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTaskChecklistMutation, DeleteTaskChecklistMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTaskChecklistMutation, DeleteTaskChecklistMutationVariables>(DeleteTaskChecklistDocument, baseOptions);
      }
export type DeleteTaskChecklistMutationHookResult = ReturnType<typeof useDeleteTaskChecklistMutation>;
export type DeleteTaskChecklistMutationResult = ApolloReactCommon.MutationResult<DeleteTaskChecklistMutation>;
export type DeleteTaskChecklistMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTaskChecklistMutation, DeleteTaskChecklistMutationVariables>;
export const DeleteTaskChecklistItemDocument = gql`
    mutation deleteTaskChecklistItem($taskChecklistItemID: UUID!) {
  deleteTaskChecklistItem(input: {taskChecklistItemID: $taskChecklistItemID}) {
    ok
    taskChecklistItem {
      id
      taskChecklistID
    }
  }
}
    `;
export type DeleteTaskChecklistItemMutationFn = ApolloReactCommon.MutationFunction<DeleteTaskChecklistItemMutation, DeleteTaskChecklistItemMutationVariables>;

/**
 * __useDeleteTaskChecklistItemMutation__
 *
 * To run a mutation, you first call `useDeleteTaskChecklistItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskChecklistItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskChecklistItemMutation, { data, loading, error }] = useDeleteTaskChecklistItemMutation({
 *   variables: {
 *      taskChecklistItemID: // value for 'taskChecklistItemID'
 *   },
 * });
 */
export function useDeleteTaskChecklistItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTaskChecklistItemMutation, DeleteTaskChecklistItemMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTaskChecklistItemMutation, DeleteTaskChecklistItemMutationVariables>(DeleteTaskChecklistItemDocument, baseOptions);
      }
export type DeleteTaskChecklistItemMutationHookResult = ReturnType<typeof useDeleteTaskChecklistItemMutation>;
export type DeleteTaskChecklistItemMutationResult = ApolloReactCommon.MutationResult<DeleteTaskChecklistItemMutation>;
export type DeleteTaskChecklistItemMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTaskChecklistItemMutation, DeleteTaskChecklistItemMutationVariables>;
export const SetTaskChecklistItemCompleteDocument = gql`
    mutation setTaskChecklistItemComplete($taskChecklistItemID: UUID!, $complete: Boolean!) {
  setTaskChecklistItemComplete(input: {taskChecklistItemID: $taskChecklistItemID, complete: $complete}) {
    id
    complete
  }
}
    `;
export type SetTaskChecklistItemCompleteMutationFn = ApolloReactCommon.MutationFunction<SetTaskChecklistItemCompleteMutation, SetTaskChecklistItemCompleteMutationVariables>;

/**
 * __useSetTaskChecklistItemCompleteMutation__
 *
 * To run a mutation, you first call `useSetTaskChecklistItemCompleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTaskChecklistItemCompleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTaskChecklistItemCompleteMutation, { data, loading, error }] = useSetTaskChecklistItemCompleteMutation({
 *   variables: {
 *      taskChecklistItemID: // value for 'taskChecklistItemID'
 *      complete: // value for 'complete'
 *   },
 * });
 */
export function useSetTaskChecklistItemCompleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTaskChecklistItemCompleteMutation, SetTaskChecklistItemCompleteMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTaskChecklistItemCompleteMutation, SetTaskChecklistItemCompleteMutationVariables>(SetTaskChecklistItemCompleteDocument, baseOptions);
      }
export type SetTaskChecklistItemCompleteMutationHookResult = ReturnType<typeof useSetTaskChecklistItemCompleteMutation>;
export type SetTaskChecklistItemCompleteMutationResult = ApolloReactCommon.MutationResult<SetTaskChecklistItemCompleteMutation>;
export type SetTaskChecklistItemCompleteMutationOptions = ApolloReactCommon.BaseMutationOptions<SetTaskChecklistItemCompleteMutation, SetTaskChecklistItemCompleteMutationVariables>;
export const SetTaskCompleteDocument = gql`
    mutation setTaskComplete($taskID: UUID!, $complete: Boolean!) {
  setTaskComplete(input: {taskID: $taskID, complete: $complete}) {
    ...TaskFields
  }
}
    ${TaskFieldsFragmentDoc}`;
export type SetTaskCompleteMutationFn = ApolloReactCommon.MutationFunction<SetTaskCompleteMutation, SetTaskCompleteMutationVariables>;

/**
 * __useSetTaskCompleteMutation__
 *
 * To run a mutation, you first call `useSetTaskCompleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTaskCompleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTaskCompleteMutation, { data, loading, error }] = useSetTaskCompleteMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      complete: // value for 'complete'
 *   },
 * });
 */
export function useSetTaskCompleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTaskCompleteMutation, SetTaskCompleteMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTaskCompleteMutation, SetTaskCompleteMutationVariables>(SetTaskCompleteDocument, baseOptions);
      }
export type SetTaskCompleteMutationHookResult = ReturnType<typeof useSetTaskCompleteMutation>;
export type SetTaskCompleteMutationResult = ApolloReactCommon.MutationResult<SetTaskCompleteMutation>;
export type SetTaskCompleteMutationOptions = ApolloReactCommon.BaseMutationOptions<SetTaskCompleteMutation, SetTaskCompleteMutationVariables>;
export const UpdateTaskChecklistItemLocationDocument = gql`
    mutation updateTaskChecklistItemLocation($checklistID: UUID!, $checklistItemID: UUID!, $position: Float!) {
  updateTaskChecklistItemLocation(input: {checklistID: $checklistID, checklistItemID: $checklistItemID, position: $position}) {
    checklistID
    prevChecklistID
    checklistItem {
      id
      taskChecklistID
      position
    }
  }
}
    `;
export type UpdateTaskChecklistItemLocationMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskChecklistItemLocationMutation, UpdateTaskChecklistItemLocationMutationVariables>;

/**
 * __useUpdateTaskChecklistItemLocationMutation__
 *
 * To run a mutation, you first call `useUpdateTaskChecklistItemLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskChecklistItemLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskChecklistItemLocationMutation, { data, loading, error }] = useUpdateTaskChecklistItemLocationMutation({
 *   variables: {
 *      checklistID: // value for 'checklistID'
 *      checklistItemID: // value for 'checklistItemID'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useUpdateTaskChecklistItemLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskChecklistItemLocationMutation, UpdateTaskChecklistItemLocationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskChecklistItemLocationMutation, UpdateTaskChecklistItemLocationMutationVariables>(UpdateTaskChecklistItemLocationDocument, baseOptions);
      }
export type UpdateTaskChecklistItemLocationMutationHookResult = ReturnType<typeof useUpdateTaskChecklistItemLocationMutation>;
export type UpdateTaskChecklistItemLocationMutationResult = ApolloReactCommon.MutationResult<UpdateTaskChecklistItemLocationMutation>;
export type UpdateTaskChecklistItemLocationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskChecklistItemLocationMutation, UpdateTaskChecklistItemLocationMutationVariables>;
export const UpdateTaskChecklistItemNameDocument = gql`
    mutation updateTaskChecklistItemName($taskChecklistItemID: UUID!, $name: String!) {
  updateTaskChecklistItemName(input: {taskChecklistItemID: $taskChecklistItemID, name: $name}) {
    id
    name
  }
}
    `;
export type UpdateTaskChecklistItemNameMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskChecklistItemNameMutation, UpdateTaskChecklistItemNameMutationVariables>;

/**
 * __useUpdateTaskChecklistItemNameMutation__
 *
 * To run a mutation, you first call `useUpdateTaskChecklistItemNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskChecklistItemNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskChecklistItemNameMutation, { data, loading, error }] = useUpdateTaskChecklistItemNameMutation({
 *   variables: {
 *      taskChecklistItemID: // value for 'taskChecklistItemID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateTaskChecklistItemNameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskChecklistItemNameMutation, UpdateTaskChecklistItemNameMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskChecklistItemNameMutation, UpdateTaskChecklistItemNameMutationVariables>(UpdateTaskChecklistItemNameDocument, baseOptions);
      }
export type UpdateTaskChecklistItemNameMutationHookResult = ReturnType<typeof useUpdateTaskChecklistItemNameMutation>;
export type UpdateTaskChecklistItemNameMutationResult = ApolloReactCommon.MutationResult<UpdateTaskChecklistItemNameMutation>;
export type UpdateTaskChecklistItemNameMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskChecklistItemNameMutation, UpdateTaskChecklistItemNameMutationVariables>;
export const UpdateTaskChecklistLocationDocument = gql`
    mutation updateTaskChecklistLocation($checklistID: UUID!, $position: Float!) {
  updateTaskChecklistLocation(input: {checklistID: $checklistID, position: $position}) {
    checklist {
      id
      position
    }
  }
}
    `;
export type UpdateTaskChecklistLocationMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskChecklistLocationMutation, UpdateTaskChecklistLocationMutationVariables>;

/**
 * __useUpdateTaskChecklistLocationMutation__
 *
 * To run a mutation, you first call `useUpdateTaskChecklistLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskChecklistLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskChecklistLocationMutation, { data, loading, error }] = useUpdateTaskChecklistLocationMutation({
 *   variables: {
 *      checklistID: // value for 'checklistID'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useUpdateTaskChecklistLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskChecklistLocationMutation, UpdateTaskChecklistLocationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskChecklistLocationMutation, UpdateTaskChecklistLocationMutationVariables>(UpdateTaskChecklistLocationDocument, baseOptions);
      }
export type UpdateTaskChecklistLocationMutationHookResult = ReturnType<typeof useUpdateTaskChecklistLocationMutation>;
export type UpdateTaskChecklistLocationMutationResult = ApolloReactCommon.MutationResult<UpdateTaskChecklistLocationMutation>;
export type UpdateTaskChecklistLocationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskChecklistLocationMutation, UpdateTaskChecklistLocationMutationVariables>;
export const UpdateTaskChecklistNameDocument = gql`
    mutation updateTaskChecklistName($taskChecklistID: UUID!, $name: String!) {
  updateTaskChecklistName(input: {taskChecklistID: $taskChecklistID, name: $name}) {
    id
    name
    position
    items {
      id
      name
      taskChecklistID
      complete
      position
    }
  }
}
    `;
export type UpdateTaskChecklistNameMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskChecklistNameMutation, UpdateTaskChecklistNameMutationVariables>;

/**
 * __useUpdateTaskChecklistNameMutation__
 *
 * To run a mutation, you first call `useUpdateTaskChecklistNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskChecklistNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskChecklistNameMutation, { data, loading, error }] = useUpdateTaskChecklistNameMutation({
 *   variables: {
 *      taskChecklistID: // value for 'taskChecklistID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateTaskChecklistNameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskChecklistNameMutation, UpdateTaskChecklistNameMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskChecklistNameMutation, UpdateTaskChecklistNameMutationVariables>(UpdateTaskChecklistNameDocument, baseOptions);
      }
export type UpdateTaskChecklistNameMutationHookResult = ReturnType<typeof useUpdateTaskChecklistNameMutation>;
export type UpdateTaskChecklistNameMutationResult = ApolloReactCommon.MutationResult<UpdateTaskChecklistNameMutation>;
export type UpdateTaskChecklistNameMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskChecklistNameMutation, UpdateTaskChecklistNameMutationVariables>;
export const UpdateTaskGroupNameDocument = gql`
    mutation updateTaskGroupName($taskGroupID: UUID!, $name: String!) {
  updateTaskGroupName(input: {taskGroupID: $taskGroupID, name: $name}) {
    id
    name
  }
}
    `;
export type UpdateTaskGroupNameMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskGroupNameMutation, UpdateTaskGroupNameMutationVariables>;

/**
 * __useUpdateTaskGroupNameMutation__
 *
 * To run a mutation, you first call `useUpdateTaskGroupNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskGroupNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskGroupNameMutation, { data, loading, error }] = useUpdateTaskGroupNameMutation({
 *   variables: {
 *      taskGroupID: // value for 'taskGroupID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateTaskGroupNameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskGroupNameMutation, UpdateTaskGroupNameMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskGroupNameMutation, UpdateTaskGroupNameMutationVariables>(UpdateTaskGroupNameDocument, baseOptions);
      }
export type UpdateTaskGroupNameMutationHookResult = ReturnType<typeof useUpdateTaskGroupNameMutation>;
export type UpdateTaskGroupNameMutationResult = ApolloReactCommon.MutationResult<UpdateTaskGroupNameMutation>;
export type UpdateTaskGroupNameMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskGroupNameMutation, UpdateTaskGroupNameMutationVariables>;
export const CreateTeamDocument = gql`
    mutation createTeam($name: String!, $organizationID: UUID!) {
  createTeam(input: {name: $name, organizationID: $organizationID}) {
    id
    createdAt
    name
  }
}
    `;
export type CreateTeamMutationFn = ApolloReactCommon.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *      organizationID: // value for 'organizationID'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, baseOptions);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = ApolloReactCommon.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const CreateTeamMemberDocument = gql`
    mutation createTeamMember($userID: UUID!, $teamID: UUID!) {
  createTeamMember(input: {userID: $userID, teamID: $teamID}) {
    team {
      id
    }
    teamMember {
      id
      username
      fullName
      role {
        code
        name
      }
      profileIcon {
        url
        initials
        bgColor
      }
    }
  }
}
    `;
export type CreateTeamMemberMutationFn = ApolloReactCommon.MutationFunction<CreateTeamMemberMutation, CreateTeamMemberMutationVariables>;

/**
 * __useCreateTeamMemberMutation__
 *
 * To run a mutation, you first call `useCreateTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMemberMutation, { data, loading, error }] = useCreateTeamMemberMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useCreateTeamMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTeamMemberMutation, CreateTeamMemberMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTeamMemberMutation, CreateTeamMemberMutationVariables>(CreateTeamMemberDocument, baseOptions);
      }
export type CreateTeamMemberMutationHookResult = ReturnType<typeof useCreateTeamMemberMutation>;
export type CreateTeamMemberMutationResult = ApolloReactCommon.MutationResult<CreateTeamMemberMutation>;
export type CreateTeamMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTeamMemberMutation, CreateTeamMemberMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation deleteTeam($teamID: UUID!) {
  deleteTeam(input: {teamID: $teamID}) {
    ok
    team {
      id
    }
  }
}
    `;
export type DeleteTeamMutationFn = ApolloReactCommon.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, baseOptions);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = ApolloReactCommon.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const DeleteTeamMemberDocument = gql`
    mutation deleteTeamMember($teamID: UUID!, $userID: UUID!, $newOwnerID: UUID) {
  deleteTeamMember(input: {teamID: $teamID, userID: $userID, newOwnerID: $newOwnerID}) {
    teamID
    userID
  }
}
    `;
export type DeleteTeamMemberMutationFn = ApolloReactCommon.MutationFunction<DeleteTeamMemberMutation, DeleteTeamMemberMutationVariables>;

/**
 * __useDeleteTeamMemberMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMemberMutation, { data, loading, error }] = useDeleteTeamMemberMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      userID: // value for 'userID'
 *      newOwnerID: // value for 'newOwnerID'
 *   },
 * });
 */
export function useDeleteTeamMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTeamMemberMutation, DeleteTeamMemberMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTeamMemberMutation, DeleteTeamMemberMutationVariables>(DeleteTeamMemberDocument, baseOptions);
      }
export type DeleteTeamMemberMutationHookResult = ReturnType<typeof useDeleteTeamMemberMutation>;
export type DeleteTeamMemberMutationResult = ApolloReactCommon.MutationResult<DeleteTeamMemberMutation>;
export type DeleteTeamMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTeamMemberMutation, DeleteTeamMemberMutationVariables>;
export const GetTeamDocument = gql`
    query getTeam($teamID: UUID!) {
  findTeam(input: {teamID: $teamID}) {
    id
    createdAt
    name
    members {
      id
      fullName
      username
      role {
        code
        name
      }
      profileIcon {
        url
        initials
        bgColor
      }
      owned {
        teams {
          id
          name
        }
        projects {
          id
          name
        }
      }
      member {
        teams {
          id
          name
        }
        projects {
          id
          name
        }
      }
    }
  }
  projects(input: {teamID: $teamID}) {
    id
    name
    team {
      id
      name
    }
  }
  users {
    id
    email
    fullName
    username
    role {
      code
      name
    }
    profileIcon {
      url
      initials
      bgColor
    }
    owned {
      teams {
        id
        name
      }
      projects {
        id
        name
      }
    }
    member {
      teams {
        id
        name
      }
      projects {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetTeamQuery__
 *
 * To run a query within a React component, call `useGetTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamQuery({
 *   variables: {
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useGetTeamQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, baseOptions);
      }
export function useGetTeamLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, baseOptions);
        }
export type GetTeamQueryHookResult = ReturnType<typeof useGetTeamQuery>;
export type GetTeamLazyQueryHookResult = ReturnType<typeof useGetTeamLazyQuery>;
export type GetTeamQueryResult = ApolloReactCommon.QueryResult<GetTeamQuery, GetTeamQueryVariables>;
export const UpdateTeamMemberRoleDocument = gql`
    mutation updateTeamMemberRole($teamID: UUID!, $userID: UUID!, $roleCode: RoleCode!) {
  updateTeamMemberRole(input: {teamID: $teamID, userID: $userID, roleCode: $roleCode}) {
    member {
      id
      role {
        code
        name
      }
    }
    teamID
  }
}
    `;
export type UpdateTeamMemberRoleMutationFn = ApolloReactCommon.MutationFunction<UpdateTeamMemberRoleMutation, UpdateTeamMemberRoleMutationVariables>;

/**
 * __useUpdateTeamMemberRoleMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMemberRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMemberRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMemberRoleMutation, { data, loading, error }] = useUpdateTeamMemberRoleMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      userID: // value for 'userID'
 *      roleCode: // value for 'roleCode'
 *   },
 * });
 */
export function useUpdateTeamMemberRoleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTeamMemberRoleMutation, UpdateTeamMemberRoleMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTeamMemberRoleMutation, UpdateTeamMemberRoleMutationVariables>(UpdateTeamMemberRoleDocument, baseOptions);
      }
export type UpdateTeamMemberRoleMutationHookResult = ReturnType<typeof useUpdateTeamMemberRoleMutation>;
export type UpdateTeamMemberRoleMutationResult = ApolloReactCommon.MutationResult<UpdateTeamMemberRoleMutation>;
export type UpdateTeamMemberRoleMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTeamMemberRoleMutation, UpdateTeamMemberRoleMutationVariables>;
export const ToggleTaskLabelDocument = gql`
    mutation toggleTaskLabel($taskID: UUID!, $projectLabelID: UUID!) {
  toggleTaskLabel(input: {taskID: $taskID, projectLabelID: $projectLabelID}) {
    active
    task {
      id
      labels {
        id
        assignedDate
        projectLabel {
          id
          createdDate
          labelColor {
            id
            colorHex
            name
            position
          }
          name
        }
      }
    }
  }
}
    `;
export type ToggleTaskLabelMutationFn = ApolloReactCommon.MutationFunction<ToggleTaskLabelMutation, ToggleTaskLabelMutationVariables>;

/**
 * __useToggleTaskLabelMutation__
 *
 * To run a mutation, you first call `useToggleTaskLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleTaskLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleTaskLabelMutation, { data, loading, error }] = useToggleTaskLabelMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      projectLabelID: // value for 'projectLabelID'
 *   },
 * });
 */
export function useToggleTaskLabelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleTaskLabelMutation, ToggleTaskLabelMutationVariables>) {
        return ApolloReactHooks.useMutation<ToggleTaskLabelMutation, ToggleTaskLabelMutationVariables>(ToggleTaskLabelDocument, baseOptions);
      }
export type ToggleTaskLabelMutationHookResult = ReturnType<typeof useToggleTaskLabelMutation>;
export type ToggleTaskLabelMutationResult = ApolloReactCommon.MutationResult<ToggleTaskLabelMutation>;
export type ToggleTaskLabelMutationOptions = ApolloReactCommon.BaseMutationOptions<ToggleTaskLabelMutation, ToggleTaskLabelMutationVariables>;
export const UnassignTaskDocument = gql`
    mutation unassignTask($taskID: UUID!, $userID: UUID!) {
  unassignTask(input: {taskID: $taskID, userID: $userID}) {
    assigned {
      id
      fullName
    }
    id
  }
}
    `;
export type UnassignTaskMutationFn = ApolloReactCommon.MutationFunction<UnassignTaskMutation, UnassignTaskMutationVariables>;

/**
 * __useUnassignTaskMutation__
 *
 * To run a mutation, you first call `useUnassignTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignTaskMutation, { data, loading, error }] = useUnassignTaskMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useUnassignTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnassignTaskMutation, UnassignTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<UnassignTaskMutation, UnassignTaskMutationVariables>(UnassignTaskDocument, baseOptions);
      }
export type UnassignTaskMutationHookResult = ReturnType<typeof useUnassignTaskMutation>;
export type UnassignTaskMutationResult = ApolloReactCommon.MutationResult<UnassignTaskMutation>;
export type UnassignTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<UnassignTaskMutation, UnassignTaskMutationVariables>;
export const UpdateProjectLabelDocument = gql`
    mutation updateProjectLabel($projectLabelID: UUID!, $labelColorID: UUID!, $name: String!) {
  updateProjectLabel(input: {projectLabelID: $projectLabelID, labelColorID: $labelColorID, name: $name}) {
    id
    createdDate
    labelColor {
      id
      colorHex
      name
      position
    }
    name
  }
}
    `;
export type UpdateProjectLabelMutationFn = ApolloReactCommon.MutationFunction<UpdateProjectLabelMutation, UpdateProjectLabelMutationVariables>;

/**
 * __useUpdateProjectLabelMutation__
 *
 * To run a mutation, you first call `useUpdateProjectLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectLabelMutation, { data, loading, error }] = useUpdateProjectLabelMutation({
 *   variables: {
 *      projectLabelID: // value for 'projectLabelID'
 *      labelColorID: // value for 'labelColorID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateProjectLabelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProjectLabelMutation, UpdateProjectLabelMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateProjectLabelMutation, UpdateProjectLabelMutationVariables>(UpdateProjectLabelDocument, baseOptions);
      }
export type UpdateProjectLabelMutationHookResult = ReturnType<typeof useUpdateProjectLabelMutation>;
export type UpdateProjectLabelMutationResult = ApolloReactCommon.MutationResult<UpdateProjectLabelMutation>;
export type UpdateProjectLabelMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProjectLabelMutation, UpdateProjectLabelMutationVariables>;
export const UpdateProjectNameDocument = gql`
    mutation updateProjectName($projectID: UUID!, $name: String!) {
  updateProjectName(input: {projectID: $projectID, name: $name}) {
    id
    name
  }
}
    `;
export type UpdateProjectNameMutationFn = ApolloReactCommon.MutationFunction<UpdateProjectNameMutation, UpdateProjectNameMutationVariables>;

/**
 * __useUpdateProjectNameMutation__
 *
 * To run a mutation, you first call `useUpdateProjectNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectNameMutation, { data, loading, error }] = useUpdateProjectNameMutation({
 *   variables: {
 *      projectID: // value for 'projectID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateProjectNameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProjectNameMutation, UpdateProjectNameMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateProjectNameMutation, UpdateProjectNameMutationVariables>(UpdateProjectNameDocument, baseOptions);
      }
export type UpdateProjectNameMutationHookResult = ReturnType<typeof useUpdateProjectNameMutation>;
export type UpdateProjectNameMutationResult = ApolloReactCommon.MutationResult<UpdateProjectNameMutation>;
export type UpdateProjectNameMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProjectNameMutation, UpdateProjectNameMutationVariables>;
export const UpdateTaskDescriptionDocument = gql`
    mutation updateTaskDescription($taskID: UUID!, $description: String!) {
  updateTaskDescription(input: {taskID: $taskID, description: $description}) {
    id
    description
  }
}
    `;
export type UpdateTaskDescriptionMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskDescriptionMutation, UpdateTaskDescriptionMutationVariables>;

/**
 * __useUpdateTaskDescriptionMutation__
 *
 * To run a mutation, you first call `useUpdateTaskDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskDescriptionMutation, { data, loading, error }] = useUpdateTaskDescriptionMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateTaskDescriptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskDescriptionMutation, UpdateTaskDescriptionMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskDescriptionMutation, UpdateTaskDescriptionMutationVariables>(UpdateTaskDescriptionDocument, baseOptions);
      }
export type UpdateTaskDescriptionMutationHookResult = ReturnType<typeof useUpdateTaskDescriptionMutation>;
export type UpdateTaskDescriptionMutationResult = ApolloReactCommon.MutationResult<UpdateTaskDescriptionMutation>;
export type UpdateTaskDescriptionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskDescriptionMutation, UpdateTaskDescriptionMutationVariables>;
export const UpdateTaskDueDateDocument = gql`
    mutation updateTaskDueDate($taskID: UUID!, $dueDate: Time) {
  updateTaskDueDate(input: {taskID: $taskID, dueDate: $dueDate}) {
    id
    dueDate
  }
}
    `;
export type UpdateTaskDueDateMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskDueDateMutation, UpdateTaskDueDateMutationVariables>;

/**
 * __useUpdateTaskDueDateMutation__
 *
 * To run a mutation, you first call `useUpdateTaskDueDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskDueDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskDueDateMutation, { data, loading, error }] = useUpdateTaskDueDateMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      dueDate: // value for 'dueDate'
 *   },
 * });
 */
export function useUpdateTaskDueDateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskDueDateMutation, UpdateTaskDueDateMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskDueDateMutation, UpdateTaskDueDateMutationVariables>(UpdateTaskDueDateDocument, baseOptions);
      }
export type UpdateTaskDueDateMutationHookResult = ReturnType<typeof useUpdateTaskDueDateMutation>;
export type UpdateTaskDueDateMutationResult = ApolloReactCommon.MutationResult<UpdateTaskDueDateMutation>;
export type UpdateTaskDueDateMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskDueDateMutation, UpdateTaskDueDateMutationVariables>;
export const UpdateTaskGroupLocationDocument = gql`
    mutation updateTaskGroupLocation($taskGroupID: UUID!, $position: Float!) {
  updateTaskGroupLocation(input: {taskGroupID: $taskGroupID, position: $position}) {
    id
    position
  }
}
    `;
export type UpdateTaskGroupLocationMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskGroupLocationMutation, UpdateTaskGroupLocationMutationVariables>;

/**
 * __useUpdateTaskGroupLocationMutation__
 *
 * To run a mutation, you first call `useUpdateTaskGroupLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskGroupLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskGroupLocationMutation, { data, loading, error }] = useUpdateTaskGroupLocationMutation({
 *   variables: {
 *      taskGroupID: // value for 'taskGroupID'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useUpdateTaskGroupLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskGroupLocationMutation, UpdateTaskGroupLocationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskGroupLocationMutation, UpdateTaskGroupLocationMutationVariables>(UpdateTaskGroupLocationDocument, baseOptions);
      }
export type UpdateTaskGroupLocationMutationHookResult = ReturnType<typeof useUpdateTaskGroupLocationMutation>;
export type UpdateTaskGroupLocationMutationResult = ApolloReactCommon.MutationResult<UpdateTaskGroupLocationMutation>;
export type UpdateTaskGroupLocationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskGroupLocationMutation, UpdateTaskGroupLocationMutationVariables>;
export const UpdateTaskLocationDocument = gql`
    mutation updateTaskLocation($taskID: UUID!, $taskGroupID: UUID!, $position: Float!) {
  updateTaskLocation(input: {taskID: $taskID, taskGroupID: $taskGroupID, position: $position}) {
    previousTaskGroupID
    task {
      id
      createdAt
      name
      position
      taskGroup {
        id
      }
    }
  }
}
    `;
export type UpdateTaskLocationMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskLocationMutation, UpdateTaskLocationMutationVariables>;

/**
 * __useUpdateTaskLocationMutation__
 *
 * To run a mutation, you first call `useUpdateTaskLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskLocationMutation, { data, loading, error }] = useUpdateTaskLocationMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      taskGroupID: // value for 'taskGroupID'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useUpdateTaskLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskLocationMutation, UpdateTaskLocationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskLocationMutation, UpdateTaskLocationMutationVariables>(UpdateTaskLocationDocument, baseOptions);
      }
export type UpdateTaskLocationMutationHookResult = ReturnType<typeof useUpdateTaskLocationMutation>;
export type UpdateTaskLocationMutationResult = ApolloReactCommon.MutationResult<UpdateTaskLocationMutation>;
export type UpdateTaskLocationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskLocationMutation, UpdateTaskLocationMutationVariables>;
export const UpdateTaskNameDocument = gql`
    mutation updateTaskName($taskID: String!, $name: String!) {
  updateTaskName(input: {taskID: $taskID, name: $name}) {
    id
    name
    position
  }
}
    `;
export type UpdateTaskNameMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>;

/**
 * __useUpdateTaskNameMutation__
 *
 * To run a mutation, you first call `useUpdateTaskNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskNameMutation, { data, loading, error }] = useUpdateTaskNameMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateTaskNameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>(UpdateTaskNameDocument, baseOptions);
      }
export type UpdateTaskNameMutationHookResult = ReturnType<typeof useUpdateTaskNameMutation>;
export type UpdateTaskNameMutationResult = ApolloReactCommon.MutationResult<UpdateTaskNameMutation>;
export type UpdateTaskNameMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>;
export const CreateUserAccountDocument = gql`
    mutation createUserAccount($username: String!, $roleCode: String!, $email: String!, $fullName: String!, $initials: String!, $password: String!) {
  createUserAccount(input: {roleCode: $roleCode, username: $username, email: $email, fullName: $fullName, initials: $initials, password: $password}) {
    id
    email
    fullName
    initials
    username
    profileIcon {
      url
      initials
      bgColor
    }
    role {
      code
      name
    }
    owned {
      teams {
        id
        name
      }
      projects {
        id
        name
      }
    }
    member {
      teams {
        id
        name
      }
      projects {
        id
        name
      }
    }
  }
}
    `;
export type CreateUserAccountMutationFn = ApolloReactCommon.MutationFunction<CreateUserAccountMutation, CreateUserAccountMutationVariables>;

/**
 * __useCreateUserAccountMutation__
 *
 * To run a mutation, you first call `useCreateUserAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserAccountMutation, { data, loading, error }] = useCreateUserAccountMutation({
 *   variables: {
 *      username: // value for 'username'
 *      roleCode: // value for 'roleCode'
 *      email: // value for 'email'
 *      fullName: // value for 'fullName'
 *      initials: // value for 'initials'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserAccountMutation, CreateUserAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserAccountMutation, CreateUserAccountMutationVariables>(CreateUserAccountDocument, baseOptions);
      }
export type CreateUserAccountMutationHookResult = ReturnType<typeof useCreateUserAccountMutation>;
export type CreateUserAccountMutationResult = ApolloReactCommon.MutationResult<CreateUserAccountMutation>;
export type CreateUserAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserAccountMutation, CreateUserAccountMutationVariables>;
export const DeleteUserAccountDocument = gql`
    mutation deleteUserAccount($userID: UUID!, $newOwnerID: UUID) {
  deleteUserAccount(input: {userID: $userID, newOwnerID: $newOwnerID}) {
    ok
    userAccount {
      id
    }
  }
}
    `;
export type DeleteUserAccountMutationFn = ApolloReactCommon.MutationFunction<DeleteUserAccountMutation, DeleteUserAccountMutationVariables>;

/**
 * __useDeleteUserAccountMutation__
 *
 * To run a mutation, you first call `useDeleteUserAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserAccountMutation, { data, loading, error }] = useDeleteUserAccountMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      newOwnerID: // value for 'newOwnerID'
 *   },
 * });
 */
export function useDeleteUserAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserAccountMutation, DeleteUserAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserAccountMutation, DeleteUserAccountMutationVariables>(DeleteUserAccountDocument, baseOptions);
      }
export type DeleteUserAccountMutationHookResult = ReturnType<typeof useDeleteUserAccountMutation>;
export type DeleteUserAccountMutationResult = ApolloReactCommon.MutationResult<DeleteUserAccountMutation>;
export type DeleteUserAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserAccountMutation, DeleteUserAccountMutationVariables>;
export const UpdateUserPasswordDocument = gql`
    mutation updateUserPassword($userID: UUID!, $password: String!) {
  updateUserPassword(input: {userID: $userID, password: $password}) {
    ok
  }
}
    `;
export type UpdateUserPasswordMutationFn = ApolloReactCommon.MutationFunction<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;

/**
 * __useUpdateUserPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPasswordMutation, { data, loading, error }] = useUpdateUserPasswordMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdateUserPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(UpdateUserPasswordDocument, baseOptions);
      }
export type UpdateUserPasswordMutationHookResult = ReturnType<typeof useUpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationResult = ApolloReactCommon.MutationResult<UpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const UpdateUserRoleDocument = gql`
    mutation updateUserRole($userID: UUID!, $roleCode: RoleCode!) {
  updateUserRole(input: {userID: $userID, roleCode: $roleCode}) {
    user {
      id
      role {
        code
        name
      }
    }
  }
}
    `;
export type UpdateUserRoleMutationFn = ApolloReactCommon.MutationFunction<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;

/**
 * __useUpdateUserRoleMutation__
 *
 * To run a mutation, you first call `useUpdateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRoleMutation, { data, loading, error }] = useUpdateUserRoleMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      roleCode: // value for 'roleCode'
 *   },
 * });
 */
export function useUpdateUserRoleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(UpdateUserRoleDocument, baseOptions);
      }
export type UpdateUserRoleMutationHookResult = ReturnType<typeof useUpdateUserRoleMutation>;
export type UpdateUserRoleMutationResult = ApolloReactCommon.MutationResult<UpdateUserRoleMutation>;
export type UpdateUserRoleMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;
export const UsersDocument = gql`
    query users {
  users {
    id
    email
    fullName
    username
    role {
      code
      name
    }
    profileIcon {
      url
      initials
      bgColor
    }
    owned {
      teams {
        id
        name
      }
      projects {
        id
        name
      }
    }
    member {
      teams {
        id
        name
      }
      projects {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
