type ProfileIcon = {
  url?: string | null;
  initials?: string | null;
  bgColor?: string | null;
};

type TaskGroup = {
  id: string;
  name: string;
  position: number;
  tasks: Task[];
};

type LabelColor = {
  id: string;
  name: string;
  colorHex: string;
  position: number;
};

type InnerTaskGroup = {
  id: string;
  name?: string;
  position?: number;
};

type TaskLabel = {
  id: string;
  assignedDate: string;
  projectLabel: ProjectLabel;
};

type TaskChecklist = {
  id: string;
  position: number;
  name: string;
  items: Array<TaskChecklistItem>;
};

type TaskChecklistItem = {
  id: string;
  complete: boolean;
  position: number;
  name: string;
  taskChecklistID: string;
  assigned?: null | TaskUser;
  dueDate?: null | string;
};

type Task = {
  id: string;
  taskGroup: InnerTaskGroup;
  name: string;
  position: number;
  dueDate?: string;
  complete?: boolean;
  labels: TaskLabel[];
  description?: string | null;
  assigned?: Array<TaskUser>;
  checklists?: Array<TaskChecklist> | null;
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
  id: string;
  name: string;
  createdAt: string;
};

type ProjectLabel = {
  id: string;
  createdDate: string;
  name?: string | null;
  labelColor: LabelColor;
};
