type ContextMenuEvent = {
  left: number;
  top: number;
  taskID: string;
  taskGroupID: string;
};

type Task = {
  taskID: string;
  taskGroupID: string;
  name: string;
  position: number;
  labels: Label[];
};

type TaskGroup = {
  taskGroupID: string;
  name: string;
  position: number;
  tasks: RemoteTask[];
};

type Project = {
  projectID: string;
  name: string;
  color?: string;
  teamTitle?: string;
  taskGroups: TaskGroup[];
};

type Organization = {
  name: string;
  teams: Team[];
};

type Team = {
  name: string;
  projects: Project[];
};

type Label = {
  labelId: string;
  name: string;
  color: string;
  active: boolean;
};

type RefreshTokenResponse = {
  accessToken: string;
};

type LoginFormData = {
  username: string;
  password: string;
};

type LoginProps = {
  onSubmit: (
    data: LoginFormData,
    setComplete: (val: boolean) => void,
    setError: (field: string, eType: string, message: string) => void,
  ) => void;
};
