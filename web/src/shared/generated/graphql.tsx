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

export type ProjectMember = {
   __typename?: 'ProjectMember';
  id: Scalars['ID'];
  fullName: Scalars['String'];
  profileIcon: ProfileIcon;
};

export type RefreshToken = {
   __typename?: 'RefreshToken';
  id: Scalars['ID'];
  userId: Scalars['UUID'];
  expiresAt: Scalars['Time'];
  createdAt: Scalars['Time'];
};

export type UserAccount = {
   __typename?: 'UserAccount';
  id: Scalars['ID'];
  email: Scalars['String'];
  createdAt: Scalars['Time'];
  fullName: Scalars['String'];
  initials: Scalars['String'];
  username: Scalars['String'];
  profileIcon: ProfileIcon;
};

export type Team = {
   __typename?: 'Team';
  id: Scalars['ID'];
  createdAt: Scalars['Time'];
  name: Scalars['String'];
};

export type Project = {
   __typename?: 'Project';
  id: Scalars['ID'];
  createdAt: Scalars['Time'];
  name: Scalars['String'];
  team: Team;
  owner: ProjectMember;
  taskGroups: Array<TaskGroup>;
  members: Array<ProjectMember>;
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
  assigned: Array<ProjectMember>;
  labels: Array<TaskLabel>;
  checklists: Array<TaskChecklist>;
};

export type ProjectsFilter = {
  teamID?: Maybe<Scalars['String']>;
};

export type FindUser = {
  userId: Scalars['String'];
};

export type FindProject = {
  projectId: Scalars['String'];
};

export type FindTask = {
  taskID: Scalars['UUID'];
};

export type Query = {
   __typename?: 'Query';
  users: Array<UserAccount>;
  findUser: UserAccount;
  findProject: Project;
  findTask: Task;
  projects: Array<Project>;
  teams: Array<Team>;
  labelColors: Array<LabelColor>;
  taskGroups: Array<TaskGroup>;
  me: UserAccount;
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

export type NewRefreshToken = {
  userId: Scalars['String'];
};

export type NewUserAccount = {
  username: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  initials: Scalars['String'];
  password: Scalars['String'];
};

export type NewTeam = {
  name: Scalars['String'];
  organizationID: Scalars['String'];
};

export type NewProject = {
  userID: Scalars['UUID'];
  teamID: Scalars['UUID'];
  name: Scalars['String'];
};

export type NewTaskGroup = {
  projectID: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Float'];
};

export type LogoutUser = {
  userID: Scalars['String'];
};

export type NewTask = {
  taskGroupID: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Float'];
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

export type NewTaskGroupLocation = {
  taskGroupID: Scalars['UUID'];
  position: Scalars['Float'];
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

export type DeleteTaskChecklistItemPayload = {
   __typename?: 'DeleteTaskChecklistItemPayload';
  ok: Scalars['Boolean'];
  taskChecklistItem: TaskChecklistItem;
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

export type AddTaskLabelInput = {
  taskID: Scalars['UUID'];
  projectLabelID: Scalars['UUID'];
};

export type RemoveTaskLabelInput = {
  taskLabelID: Scalars['UUID'];
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

export type ToggleTaskLabelInput = {
  taskID: Scalars['UUID'];
  projectLabelID: Scalars['UUID'];
};

export type ToggleTaskLabelPayload = {
   __typename?: 'ToggleTaskLabelPayload';
  active: Scalars['Boolean'];
  task: Task;
};

export type UpdateProjectName = {
  projectID: Scalars['UUID'];
  name: Scalars['String'];
};

export type UpdateTaskLocationPayload = {
   __typename?: 'UpdateTaskLocationPayload';
  previousTaskGroupID: Scalars['UUID'];
  task: Task;
};

export type UpdateTaskGroupName = {
  taskGroupID: Scalars['UUID'];
  name: Scalars['String'];
};

export type UpdateTaskDueDate = {
  taskID: Scalars['UUID'];
  dueDate?: Maybe<Scalars['Time']>;
};

export type SetTaskComplete = {
  taskID: Scalars['UUID'];
  complete: Scalars['Boolean'];
};

export type CreateTaskChecklist = {
  taskID: Scalars['UUID'];
  name: Scalars['String'];
  position: Scalars['Float'];
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

export type Mutation = {
   __typename?: 'Mutation';
  createRefreshToken: RefreshToken;
  createUserAccount: UserAccount;
  createTeam: Team;
  clearProfileAvatar: UserAccount;
  createProject: Project;
  updateProjectName: Project;
  createProjectLabel: ProjectLabel;
  deleteProjectLabel: ProjectLabel;
  updateProjectLabel: ProjectLabel;
  updateProjectLabelName: ProjectLabel;
  updateProjectLabelColor: ProjectLabel;
  createTaskGroup: TaskGroup;
  updateTaskGroupLocation: TaskGroup;
  updateTaskGroupName: TaskGroup;
  deleteTaskGroup: DeleteTaskGroupPayload;
  addTaskLabel: Task;
  removeTaskLabel: Task;
  toggleTaskLabel: ToggleTaskLabelPayload;
  createTaskChecklist: TaskChecklist;
  createTaskChecklistItem: TaskChecklistItem;
  updateTaskChecklistItemName: TaskChecklistItem;
  setTaskChecklistItemComplete: TaskChecklistItem;
  deleteTaskChecklistItem: DeleteTaskChecklistItemPayload;
  createTask: Task;
  updateTaskDescription: Task;
  updateTaskLocation: UpdateTaskLocationPayload;
  updateTaskName: Task;
  setTaskComplete: Task;
  updateTaskDueDate: Task;
  deleteTask: DeleteTaskPayload;
  assignTask: Task;
  unassignTask: Task;
  logoutUser: Scalars['Boolean'];
};


export type MutationCreateRefreshTokenArgs = {
  input: NewRefreshToken;
};


export type MutationCreateUserAccountArgs = {
  input: NewUserAccount;
};


export type MutationCreateTeamArgs = {
  input: NewTeam;
};


export type MutationCreateProjectArgs = {
  input: NewProject;
};


export type MutationUpdateProjectNameArgs = {
  input?: Maybe<UpdateProjectName>;
};


export type MutationCreateProjectLabelArgs = {
  input: NewProjectLabel;
};


export type MutationDeleteProjectLabelArgs = {
  input: DeleteProjectLabel;
};


export type MutationUpdateProjectLabelArgs = {
  input: UpdateProjectLabel;
};


export type MutationUpdateProjectLabelNameArgs = {
  input: UpdateProjectLabelName;
};


export type MutationUpdateProjectLabelColorArgs = {
  input: UpdateProjectLabelColor;
};


export type MutationCreateTaskGroupArgs = {
  input: NewTaskGroup;
};


export type MutationUpdateTaskGroupLocationArgs = {
  input: NewTaskGroupLocation;
};


export type MutationUpdateTaskGroupNameArgs = {
  input: UpdateTaskGroupName;
};


export type MutationDeleteTaskGroupArgs = {
  input: DeleteTaskGroupInput;
};


export type MutationAddTaskLabelArgs = {
  input?: Maybe<AddTaskLabelInput>;
};


export type MutationRemoveTaskLabelArgs = {
  input?: Maybe<RemoveTaskLabelInput>;
};


export type MutationToggleTaskLabelArgs = {
  input: ToggleTaskLabelInput;
};


export type MutationCreateTaskChecklistArgs = {
  input: CreateTaskChecklist;
};


export type MutationCreateTaskChecklistItemArgs = {
  input: CreateTaskChecklistItem;
};


export type MutationUpdateTaskChecklistItemNameArgs = {
  input: UpdateTaskChecklistItemName;
};


export type MutationSetTaskChecklistItemCompleteArgs = {
  input: SetTaskChecklistItemComplete;
};


export type MutationDeleteTaskChecklistItemArgs = {
  input: DeleteTaskChecklistItem;
};


export type MutationCreateTaskArgs = {
  input: NewTask;
};


export type MutationUpdateTaskDescriptionArgs = {
  input: UpdateTaskDescriptionInput;
};


export type MutationUpdateTaskLocationArgs = {
  input: NewTaskLocation;
};


export type MutationUpdateTaskNameArgs = {
  input: UpdateTaskName;
};


export type MutationSetTaskCompleteArgs = {
  input: SetTaskComplete;
};


export type MutationUpdateTaskDueDateArgs = {
  input: UpdateTaskDueDate;
};


export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


export type MutationAssignTaskArgs = {
  input?: Maybe<AssignTaskInput>;
};


export type MutationUnassignTaskArgs = {
  input?: Maybe<UnassignTaskInput>;
};


export type MutationLogoutUserArgs = {
  input: LogoutUser;
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
      { __typename?: 'ProjectMember' }
      & Pick<ProjectMember, 'id' | 'fullName'>
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

export type CreateTaskMutationVariables = {
  taskGroupID: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Float'];
};


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'position' | 'description' | 'dueDate'>
    & { taskGroup: (
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
      { __typename?: 'ProjectMember' }
      & Pick<ProjectMember, 'id' | 'fullName'>
      & { profileIcon: (
        { __typename?: 'ProfileIcon' }
        & Pick<ProfileIcon, 'url' | 'initials' | 'bgColor'>
      ) }
    )> }
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
  projectId: Scalars['String'];
};


export type FindProjectQuery = (
  { __typename?: 'Query' }
  & { findProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'name'>
    & { members: Array<(
      { __typename?: 'ProjectMember' }
      & Pick<ProjectMember, 'id' | 'fullName'>
      & { profileIcon: (
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
  )> }
);

export type FindTaskQueryVariables = {
  taskID: Scalars['UUID'];
};


export type FindTaskQuery = (
  { __typename?: 'Query' }
  & { findTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'description' | 'dueDate' | 'position'>
    & { taskGroup: (
      { __typename?: 'TaskGroup' }
      & Pick<TaskGroup, 'id'>
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
      { __typename?: 'ProjectMember' }
      & Pick<ProjectMember, 'id' | 'fullName'>
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
  & { taskGroup: (
    { __typename?: 'TaskGroup' }
    & Pick<TaskGroup, 'id'>
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
    { __typename?: 'ProjectMember' }
    & Pick<ProjectMember, 'id' | 'fullName'>
    & { profileIcon: (
      { __typename?: 'ProfileIcon' }
      & Pick<ProfileIcon, 'url' | 'initials' | 'bgColor'>
    ) }
  )> }
);

export type GetProjectsQueryVariables = {};


export type GetProjectsQuery = (
  { __typename?: 'Query' }
  & { teams: Array<(
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
    { __typename?: 'UserAccount' }
    & Pick<UserAccount, 'id' | 'fullName'>
    & { profileIcon: (
      { __typename?: 'ProfileIcon' }
      & Pick<ProfileIcon, 'initials' | 'bgColor' | 'url'>
    ) }
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
    & Pick<TaskChecklistItem, 'id' | 'name' | 'taskChecklistID' | 'complete' | 'position'>
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
      { __typename?: 'ProjectMember' }
      & Pick<ProjectMember, 'id' | 'fullName'>
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

export const TaskFieldsFragmentDoc = gql`
    fragment TaskFields on Task {
  id
  name
  description
  dueDate
  complete
  position
  taskGroup {
    id
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
export const CreateTaskDocument = gql`
    mutation createTask($taskGroupID: String!, $name: String!, $position: Float!) {
  createTask(input: {taskGroupID: $taskGroupID, name: $name, position: $position}) {
    id
    name
    position
    description
    dueDate
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
}
    `;
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
    query findProject($projectId: String!) {
  findProject(input: {projectId: $projectId}) {
    name
    members {
      id
      fullName
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
 *      projectId: // value for 'projectId'
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
    taskGroup {
      id
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
    name
    taskChecklistID
    complete
    position
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