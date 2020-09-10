import React, { useState, useRef } from 'react';
import updateApolloCache from 'shared/utils/cache';
import styled, { css } from 'styled-components/macro';
import { Bolt, ToggleOn, Tags, CheckCircle, Sort, Filter } from 'shared/icons';
import { usePopup, Popup } from 'shared/components/PopupMenu';
import { useRouteMatch, useHistory } from 'react-router-dom';
import {
  useSetTaskCompleteMutation,
  useToggleTaskLabelMutation,
  useFindProjectQuery,
  useUpdateTaskGroupNameMutation,
  useUpdateTaskNameMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskLocationMutation,
  useUpdateTaskGroupLocationMutation,
  useCreateTaskGroupMutation,
  useDeleteTaskGroupMutation,
  useAssignTaskMutation,
  FindProjectDocument,
  useUnassignTaskMutation,
  useUpdateTaskDueDateMutation,
  FindProjectQuery,
} from 'shared/generated/graphql';

import QuickCardEditor from 'shared/components/QuickCardEditor';
import ListActions from 'shared/components/ListActions';
import MemberManager from 'shared/components/MemberManager';
import SimpleLists, {
  TaskStatus,
  TaskSince,
  TaskStatusFilter,
  TaskMeta,
  TaskMetaMatch,
  TaskMetaFilters,
  TaskSorting,
  TaskSortingType,
  TaskSortingDirection,
} from 'shared/components/Lists';
import produce from 'immer';
import MiniProfile from 'shared/components/MiniProfile';
import DueDateManager from 'shared/components/DueDateManager';
import EmptyBoard from 'shared/components/EmptyBoard';
import NOOP from 'shared/utils/noop';
import LabelManagerEditor from 'Projects/Project/LabelManagerEditor';
import Chip from 'shared/components/Chip';
import { useCurrentUser } from 'App/context';
import FilterStatus from './FilterStatus';
import FilterMeta from './FilterMeta';
import SortPopup from './SortPopup';

const FilterChip = styled(Chip)`
  margin-right: 4px;
`;

type MetaFilterCloseFn = (meta: TaskMeta, key: string) => void;

const renderTaskSortingLabel = (sorting: TaskSorting) => {
  if (sorting.type === TaskSortingType.TASK_TITLE) {
    return 'Sort: Card title';
  }
  if (sorting.type === TaskSortingType.MEMBERS) {
    return 'Sort: Members';
  }
  if (sorting.type === TaskSortingType.DUE_DATE) {
    return 'Sort: Due Date';
  }
  if (sorting.type === TaskSortingType.LABELS) {
    return 'Sort: Labels';
  }
  return 'Sort';
};

const renderMetaFilters = (filters: TaskMetaFilters, onClose: MetaFilterCloseFn) => {
  const filterChips = [];
  if (filters.taskName) {
    filterChips.push(
      <FilterChip
        key="task-name"
        label={`Title: ${filters.taskName.name}`}
        onClose={() => onClose(TaskMeta.TITLE, 'task-name')}
      />,
    );
  }

  if (filters.dueDate) {
    filterChips.push(
      <FilterChip
        key="due-date"
        label={filters.dueDate.label}
        onClose={() => onClose(TaskMeta.DUE_DATE, 'due-date')}
      />,
    );
  }
  for (const memberFilter of filters.members) {
    filterChips.push(
      <FilterChip
        key={`member-${memberFilter.id}`}
        label={`Member: ${memberFilter.username}`}
        onClose={() => onClose(TaskMeta.MEMBER, memberFilter.id)}
      />,
    );
  }
  for (const labelFilter of filters.labels) {
    filterChips.push(
      <FilterChip
        key={`label-${labelFilter.id}`}
        label={labelFilter.name === '' ? 'Label' : `Label: ${labelFilter.name}`}
        color={labelFilter.color}
        onClose={() => onClose(TaskMeta.LABEL, labelFilter.id)}
      />,
    );
  }
  return filterChips;
};

const ProjectBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 12px;
`;

const ProjectActions = styled.div`
  display: flex;
  align-items: center;
`;

const ProjectActionWrapper = styled.div<{ disabled?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 15px;
  color: rgba(${props => props.theme.colors.text.primary});

  &:not(:last-of-type) {
    margin-right: 16px;
  }

  &:hover {
    color: rgba(${props => props.theme.colors.text.secondary});
  }
  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: default;
      pointer-events: none;
    `}
`;

const ProjectActionText = styled.span`
  padding-left: 4px;
`;

type ProjectActionProps = {
  onClick?: (target: React.RefObject<HTMLElement>) => void;
  disabled?: boolean;
};

const ProjectAction: React.FC<ProjectActionProps> = ({ onClick, disabled = false, children }) => {
  const $container = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (onClick) {
      onClick($container);
    }
  };
  return (
    <ProjectActionWrapper ref={$container} onClick={handleClick} disabled={disabled}>
      {children}
    </ProjectActionWrapper>
  );
};

interface QuickCardEditorState {
  isOpen: boolean;
  target: React.RefObject<HTMLElement> | null;
  taskID: string | null;
  taskGroupID: string | null;
}

const initialQuickCardEditorState: QuickCardEditorState = {
  taskID: null,
  taskGroupID: null,
  isOpen: false,
  target: null,
};

type ProjectBoardProps = {
  onCardLabelClick?: () => void;
  cardLabelVariant?: CardLabelVariant;
  projectID: string;
};

export const BoardLoading = () => {
  return (
    <>
      <ProjectBar>
        <ProjectActions>
          <ProjectAction>
            <CheckCircle width={13} height={13} />
            <ProjectActionText>All Tasks</ProjectActionText>
          </ProjectAction>
          <ProjectAction>
            <Sort width={13} height={13} />
            <ProjectActionText>Sort</ProjectActionText>
          </ProjectAction>
          <ProjectAction>
            <Filter width={13} height={13} />
            <ProjectActionText>Filter</ProjectActionText>
          </ProjectAction>
        </ProjectActions>
        <ProjectActions>
          <ProjectAction>
            <Tags width={13} height={13} />
            <ProjectActionText>Labels</ProjectActionText>
          </ProjectAction>
          <ProjectAction disabled>
            <ToggleOn width={13} height={13} />
            <ProjectActionText>Fields</ProjectActionText>
          </ProjectAction>
          <ProjectAction disabled>
            <Bolt width={13} height={13} />
            <ProjectActionText>Rules</ProjectActionText>
          </ProjectAction>
        </ProjectActions>
      </ProjectBar>
      <EmptyBoard />
    </>
  );
};

const initTaskStatusFilter: TaskStatusFilter = {
  status: TaskStatus.ALL,
  since: TaskSince.ALL,
};

const initTaskMetaFilters: TaskMetaFilters = {
  match: TaskMetaMatch.MATCH_ANY,
  dueDate: null,
  taskName: null,
  labels: [],
  members: [],
};

const initTaskSorting: TaskSorting = {
  type: TaskSortingType.NONE,
  direction: TaskSortingDirection.ASC,
};

const ProjectBoard: React.FC<ProjectBoardProps> = ({ projectID, onCardLabelClick, cardLabelVariant }) => {
  const [assignTask] = useAssignTaskMutation();
  const [unassignTask] = useUnassignTaskMutation();
  const match = useRouteMatch();
  const labelsRef = useRef<Array<ProjectLabel>>([]);
  const membersRef = useRef<Array<TaskUser>>([]);
  const { showPopup, hidePopup } = usePopup();
  const taskLabelsRef = useRef<Array<TaskLabel>>([]);
  const [quickCardEditor, setQuickCardEditor] = useState(initialQuickCardEditorState);
  const [updateTaskGroupLocation] = useUpdateTaskGroupLocationMutation({});
  const [taskStatusFilter, setTaskStatusFilter] = useState(initTaskStatusFilter);
  const [taskMetaFilters, setTaskMetaFilters] = useState(initTaskMetaFilters);
  const [taskSorting, setTaskSorting] = useState(initTaskSorting);
  const history = useHistory();
  const [deleteTaskGroup] = useDeleteTaskGroupMutation({
    update: (client, deletedTaskGroupData) => {
      updateApolloCache<FindProjectQuery>(
        client,
        FindProjectDocument,
        cache =>
          produce(cache, draftCache => {
            draftCache.findProject.taskGroups = draftCache.findProject.taskGroups.filter(
              (taskGroup: TaskGroup) => taskGroup.id !== deletedTaskGroupData.data.deleteTaskGroup.taskGroup.id,
            );
          }),
        { projectID },
      );
    },
  });
  const [updateTaskName] = useUpdateTaskNameMutation();
  const [createTask] = useCreateTaskMutation({
    update: (client, newTaskData) => {
      updateApolloCache<FindProjectQuery>(
        client,
        FindProjectDocument,
        cache =>
          produce(cache, draftCache => {
            const { taskGroups } = cache.findProject;
            const idx = taskGroups.findIndex(taskGroup => taskGroup.id === newTaskData.data.createTask.taskGroup.id);
            if (idx !== -1) {
              draftCache.findProject.taskGroups[idx].tasks.push({ ...newTaskData.data.createTask });
            }
          }),
        { projectID },
      );
    },
  });

  const [createTaskGroup] = useCreateTaskGroupMutation({
    update: (client, newTaskGroupData) => {
      updateApolloCache<FindProjectQuery>(
        client,
        FindProjectDocument,
        cache =>
          produce(cache, draftCache => {
            draftCache.findProject.taskGroups.push({ ...newTaskGroupData.data.createTaskGroup, tasks: [] });
          }),
        { projectID },
      );
    },
  });

  const [updateTaskGroupName] = useUpdateTaskGroupNameMutation({});
  const { loading, data } = useFindProjectQuery({
    variables: { projectID },
  });

  const [updateTaskDueDate] = useUpdateTaskDueDateMutation();
  const [setTaskComplete] = useSetTaskCompleteMutation();
  const [updateTaskLocation] = useUpdateTaskLocationMutation({
    update: (client, newTask) => {
      updateApolloCache<FindProjectQuery>(
        client,
        FindProjectDocument,
        cache =>
          produce(cache, draftCache => {
            const { previousTaskGroupID, task } = newTask.data.updateTaskLocation;
            if (previousTaskGroupID !== task.taskGroup.id) {
              const { taskGroups } = cache.findProject;
              const oldTaskGroupIdx = taskGroups.findIndex((t: TaskGroup) => t.id === previousTaskGroupID);
              const newTaskGroupIdx = taskGroups.findIndex((t: TaskGroup) => t.id === task.taskGroup.id);
              if (oldTaskGroupIdx !== -1 && newTaskGroupIdx !== -1) {
                draftCache.findProject.taskGroups[oldTaskGroupIdx].tasks = taskGroups[oldTaskGroupIdx].tasks.filter(
                  (t: Task) => t.id !== task.id,
                );
                draftCache.findProject.taskGroups[newTaskGroupIdx].tasks = [
                  ...taskGroups[newTaskGroupIdx].tasks,
                  { ...task },
                ];
              }
            }
          }),
        { projectID },
      );
    },
  });
  const { user } = useCurrentUser();
  const [deleteTask] = useDeleteTaskMutation();
  const [toggleTaskLabel] = useToggleTaskLabelMutation({
    onCompleted: newTaskLabel => {
      taskLabelsRef.current = newTaskLabel.toggleTaskLabel.task.labels;
    },
  });

  const onCreateTask = (taskGroupID: string, name: string) => {
    if (data) {
      const taskGroup = data.findProject.taskGroups.find(t => t.id === taskGroupID);
      if (taskGroup) {
        let position = 65535;
        if (taskGroup.tasks.length !== 0) {
          const [lastTask] = taskGroup.tasks
            .slice()
            .sort((a: any, b: any) => a.position - b.position)
            .slice(-1);
          position = Math.ceil(lastTask.position) * 2 + 1;
        }

        createTask({
          variables: { taskGroupID, name, position },
          optimisticResponse: {
            __typename: 'Mutation',
            createTask: {
              __typename: 'Task',
              id: `${Math.round(Math.random() * -1000000)}`,
              name,
              complete: false,
              completedAt: null,
              taskGroup: {
                __typename: 'TaskGroup',
                id: taskGroup.id,
                name: taskGroup.name,
                position: taskGroup.position,
              },
              badges: {
                __typename: 'TaskBadges',
                checklist: null,
              },
              position,
              dueDate: null,
              description: null,
              labels: [],
              assigned: [],
            },
          },
        });
      }
    }
  };

  const onCreateList = (listName: string) => {
    if (data && projectID) {
      const [lastColumn] = data.findProject.taskGroups.sort((a, b) => a.position - b.position).slice(-1);
      let position = 65535;
      if (lastColumn) {
        position = lastColumn.position * 2 + 1;
      }
      createTaskGroup({ variables: { projectID, name: listName, position } });
    }
  };

  if (loading) {
    return <BoardLoading />;
  }
  const getTaskStatusFilterLabel = (filter: TaskStatusFilter) => {
    if (filter.status === TaskStatus.COMPLETE) {
      return 'Complete';
    }
    if (filter.status === TaskStatus.INCOMPLETE) {
      return 'Incomplete';
    }
    return 'All Tasks';
  };
  if (data && user) {
    labelsRef.current = data.findProject.labels;
    membersRef.current = data.findProject.members;
    const onQuickEditorOpen = ($target: React.RefObject<HTMLElement>, taskID: string, taskGroupID: string) => {
      const taskGroup = data.findProject.taskGroups.find(t => t.id === taskGroupID);
      const currentTask = taskGroup ? taskGroup.tasks.find(t => t.id === taskID) : null;
      if (currentTask) {
        setQuickCardEditor({
          target: $target,
          isOpen: true,
          taskID: currentTask.id,
          taskGroupID: currentTask.taskGroup.id,
        });
      }
    };
    let currentQuickTask = null;
    if (quickCardEditor.taskID && quickCardEditor.taskGroupID) {
      const targetGroup = data.findProject.taskGroups.find(t => t.id === quickCardEditor.taskGroupID);
      if (targetGroup) {
        currentQuickTask = targetGroup.tasks.find(t => t.id === quickCardEditor.taskID);
      }
    }
    return (
      <>
        <ProjectBar>
          <ProjectActions>
            <ProjectAction
              onClick={target => {
                showPopup(
                  target,
                  <Popup tab={0} title={null}>
                    <FilterStatus
                      filter={taskStatusFilter}
                      onChangeTaskStatusFilter={filter => {
                        setTaskStatusFilter(filter);
                        hidePopup();
                      }}
                    />
                  </Popup>,
                  { width: 185 },
                );
              }}
            >
              <CheckCircle width={13} height={13} />
              <ProjectActionText>{getTaskStatusFilterLabel(taskStatusFilter)}</ProjectActionText>
            </ProjectAction>
            <ProjectAction
              onClick={target => {
                showPopup(
                  target,
                  <Popup tab={0} title={null}>
                    <SortPopup
                      sorting={taskSorting}
                      onChangeTaskSorting={sorting => {
                        setTaskSorting(sorting);
                      }}
                    />
                  </Popup>,
                  { width: 185 },
                );
              }}
            >
              <Sort width={13} height={13} />
              <ProjectActionText>{renderTaskSortingLabel(taskSorting)}</ProjectActionText>
            </ProjectAction>
            <ProjectAction
              onClick={target => {
                showPopup(
                  target,
                  <FilterMeta
                    filters={taskMetaFilters}
                    onChangeTaskMetaFilter={filter => {
                      setTaskMetaFilters(filter);
                    }}
                    userID={user?.id}
                    labels={labelsRef}
                    members={membersRef}
                  />,
                  { width: 200 },
                );
              }}
            >
              <Filter width={13} height={13} />
              <ProjectActionText>Filter</ProjectActionText>
            </ProjectAction>
            {renderMetaFilters(taskMetaFilters, (meta, id) => {
              setTaskMetaFilters(
                produce(taskMetaFilters, draftFilters => {
                  if (meta === TaskMeta.MEMBER) {
                    draftFilters.members = draftFilters.members.filter(m => m.id !== id);
                  } else if (meta === TaskMeta.LABEL) {
                    draftFilters.labels = draftFilters.labels.filter(m => m.id !== id);
                  } else if (meta === TaskMeta.TITLE) {
                    draftFilters.taskName = null;
                  } else if (meta === TaskMeta.DUE_DATE) {
                    draftFilters.dueDate = null;
                  }
                }),
              );
            })}
          </ProjectActions>
          <ProjectActions>
            <ProjectAction
              onClick={$labelsRef => {
                showPopup(
                  $labelsRef,
                  <LabelManagerEditor
                    taskLabels={null}
                    labelColors={data.labelColors}
                    labels={labelsRef}
                    projectID={projectID ?? ''}
                  />,
                );
              }}
            >
              <Tags width={13} height={13} />
              <ProjectActionText>Labels</ProjectActionText>
            </ProjectAction>
            <ProjectAction disabled>
              <ToggleOn width={13} height={13} />
              <ProjectActionText>Fields</ProjectActionText>
            </ProjectAction>
            <ProjectAction disabled>
              <Bolt width={13} height={13} />
              <ProjectActionText>Rules</ProjectActionText>
            </ProjectAction>
          </ProjectActions>
        </ProjectBar>
        <SimpleLists
          onTaskClick={task => {
            history.push(`${match.url}/c/${task.id}`);
          }}
          onCardLabelClick={onCardLabelClick ?? NOOP}
          cardLabelVariant={cardLabelVariant ?? 'large'}
          onTaskDrop={(droppedTask, previousTaskGroupID) => {
            updateTaskLocation({
              variables: {
                taskID: droppedTask.id,
                taskGroupID: droppedTask.taskGroup.id,
                position: droppedTask.position,
              },
              optimisticResponse: {
                __typename: 'Mutation',
                updateTaskLocation: {
                  __typename: 'UpdateTaskLocationPayload',
                  previousTaskGroupID,
                  task: {
                    ...droppedTask,
                    __typename: 'Task',
                    name: droppedTask.name,
                    id: droppedTask.id,
                    position: droppedTask.position,
                    taskGroup: {
                      id: droppedTask.taskGroup.id,
                      __typename: 'TaskGroup',
                    },
                    createdAt: '',
                  },
                },
              },
            });
          }}
          onTaskGroupDrop={droppedTaskGroup => {
            updateTaskGroupLocation({
              variables: { taskGroupID: droppedTaskGroup.id, position: droppedTaskGroup.position },
              optimisticResponse: {
                __typename: 'Mutation',
                updateTaskGroupLocation: {
                  id: droppedTaskGroup.id,
                  position: droppedTaskGroup.position,
                  __typename: 'TaskGroup',
                },
              },
            });
          }}
          taskGroups={data.findProject.taskGroups}
          taskStatusFilter={taskStatusFilter}
          taskMetaFilters={taskMetaFilters}
          taskSorting={taskSorting}
          onCreateTask={onCreateTask}
          onCreateTaskGroup={onCreateList}
          onCardMemberClick={($targetRef, _taskID, memberID) => {
            const member = data.findProject.members.find(m => m.id === memberID);
            if (member) {
              showPopup(
                $targetRef,
                <MiniProfile
                  user={member}
                  bio="None"
                  onRemoveFromTask={() => {
                    /* unassignTask({ variables: { taskID: data.findTask.id, userID: userID ?? '' } }); */
                  }}
                />,
              );
            }
          }}
          onChangeTaskGroupName={(taskGroupID, name) => {
            updateTaskGroupName({ variables: { taskGroupID, name } });
          }}
          onQuickEditorOpen={onQuickEditorOpen}
          onExtraMenuOpen={(taskGroupID: string, $targetRef: any) => {
            showPopup(
              $targetRef,
              <Popup title="List actions" tab={0} onClose={() => hidePopup()}>
                <ListActions
                  taskGroupID={taskGroupID}
                  onArchiveTaskGroup={tgID => {
                    deleteTaskGroup({ variables: { taskGroupID: tgID } });
                    hidePopup();
                  }}
                />
              </Popup>,
            );
          }}
        />
        {quickCardEditor.isOpen && currentQuickTask && quickCardEditor.target && (
          <QuickCardEditor
            task={currentQuickTask}
            onCloseEditor={() => setQuickCardEditor(initialQuickCardEditorState)}
            onEditCard={(_taskGroupID: string, taskID: string, cardName: string) => {
              updateTaskName({ variables: { taskID, name: cardName } });
            }}
            onOpenMembersPopup={($targetRef, task) => {
              showPopup(
                $targetRef,
                <Popup title="Members" tab={0} onClose={() => hidePopup()}>
                  <MemberManager
                    availableMembers={data.findProject.members}
                    activeMembers={task.assigned ?? []}
                    onMemberChange={(member, isActive) => {
                      if (isActive) {
                        assignTask({ variables: { taskID: task.id, userID: member.id } });
                      } else {
                        unassignTask({ variables: { taskID: task.id, userID: member.id } });
                      }
                    }}
                  />
                </Popup>,
              );
            }}
            onCardMemberClick={($targetRef, _taskID, memberID) => {
              const member = data.findProject.members.find(m => m.id === memberID);
              if (member) {
                showPopup(
                  $targetRef,
                  <MiniProfile
                    bio="None"
                    user={member}
                    onRemoveFromTask={() => {
                      /* unassignTask({ variables: { taskID: data.findTask.id, userID: userID ?? '' } }); */
                    }}
                  />,
                );
              }
            }}
            onOpenLabelsPopup={($targetRef, task) => {
              taskLabelsRef.current = task.labels;
              showPopup(
                $targetRef,
                <LabelManagerEditor
                  onLabelToggle={labelID => {
                    toggleTaskLabel({ variables: { taskID: task.id, projectLabelID: labelID } });
                  }}
                  labelColors={data.labelColors}
                  labels={labelsRef}
                  taskLabels={taskLabelsRef}
                  projectID={projectID ?? ''}
                />,
              );
            }}
            onArchiveCard={(_listId: string, cardId: string) => {
              return deleteTask({
                variables: { taskID: cardId },
                update: client => {
                  updateApolloCache<FindProjectQuery>(
                    client,
                    FindProjectDocument,
                    cache =>
                      produce(cache, draftCache => {
                        draftCache.findProject.taskGroups = cache.findProject.taskGroups.map(taskGroup => ({
                          ...taskGroup,
                          tasks: taskGroup.tasks.filter(t => t.id !== cardId),
                        }));
                      }),
                    { projectID },
                  );
                },
              });
            }}
            onOpenDueDatePopup={($targetRef, task) => {
              showPopup(
                $targetRef,
                <Popup title="Change Due Date" tab={0} onClose={() => hidePopup()}>
                  <DueDateManager
                    task={task}
                    onRemoveDueDate={t => {
                      updateTaskDueDate({ variables: { taskID: t.id, dueDate: null } });
                      hidePopup();
                    }}
                    onDueDateChange={(t, newDueDate) => {
                      updateTaskDueDate({ variables: { taskID: t.id, dueDate: newDueDate } });
                      hidePopup();
                    }}
                    onCancel={NOOP}
                  />
                </Popup>,
              );
            }}
            onToggleComplete={task => {
              setTaskComplete({ variables: { taskID: task.id, complete: !task.complete } });
            }}
            target={quickCardEditor.target}
          />
        )}
      </>
    );
  }

  return <span>Error</span>;
};

export default ProjectBoard;
