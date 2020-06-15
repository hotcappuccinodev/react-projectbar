import React, { useState, useRef, useEffect } from 'react';
import { Bin, Cross, Plus } from 'shared/icons';
import useOnOutsideClick from 'shared/hooks/onOutsideClick';
import ReactMarkdown from 'react-markdown';
import TaskAssignee from 'shared/components/TaskAssignee';

import {
  NoDueDateLabel,
  UnassignedLabel,
  TaskDetailsAddMember,
  TaskGroupLabel,
  TaskGroupLabelName,
  TaskActions,
  TaskDetailsAddLabel,
  TaskDetailsAddLabelIcon,
  TaskAction,
  TaskMeta,
  TaskHeader,
  ProfileIcon,
  TaskDetailsContent,
  TaskDetailsWrapper,
  TaskDetailsSidebar,
  TaskDetailsTitleWrapper,
  TaskDetailsTitle,
  TaskDetailsLabel,
  TaskDetailsAddDetailsButton,
  TaskDetailsEditor,
  TaskDetailsEditorWrapper,
  TaskDetailsMarkdown,
  TaskDetailsControls,
  ConfirmSave,
  CancelEdit,
  TaskDetailSectionTitle,
  TaskDetailLabel,
  TaskDetailLabels,
  TaskDetailAssignee,
  TaskDetailAssignees,
  TaskDetailsAddMemberIcon,
} from './Styles';

import convertDivElementRefToBounds from 'shared/utils/boundingRect';

type TaskContentProps = {
  onEditContent: () => void;
  description: string;
};

const TaskContent: React.FC<TaskContentProps> = ({ description, onEditContent }) => {
  return description === '' ? (
    <TaskDetailsAddDetailsButton onClick={onEditContent}>Add a more detailed description</TaskDetailsAddDetailsButton>
  ) : (
    <TaskDetailsMarkdown onClick={onEditContent}>
      <ReactMarkdown source={description} />
    </TaskDetailsMarkdown>
  );
};

type DetailsEditorProps = {
  description: string;
  onTaskDescriptionChange: (newDescription: string) => void;
  onCancel: () => void;
};

const DetailsEditor: React.FC<DetailsEditorProps> = ({
  description: initialDescription,
  onTaskDescriptionChange,
  onCancel,
}) => {
  const [description, setDescription] = useState(initialDescription);
  const $editorWrapperRef = useRef<HTMLDivElement>(null);
  const $editorRef = useRef<HTMLTextAreaElement>(null);
  const handleOutsideClick = () => {
    onTaskDescriptionChange(description);
  };
  useEffect(() => {
    if ($editorRef && $editorRef.current) {
      $editorRef.current.focus();
      $editorRef.current.select();
    }
  }, []);

  useOnOutsideClick($editorWrapperRef, true, handleOutsideClick, null);
  return (
    <TaskDetailsEditorWrapper ref={$editorWrapperRef}>
      <TaskDetailsEditor
        ref={$editorRef}
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)}
      />
      <TaskDetailsControls>
        <ConfirmSave variant="relief" onClick={handleOutsideClick}>
          Save
        </ConfirmSave>
        <CancelEdit onClick={onCancel}>
          <Plus size={16} color="#c2c6dc" />
        </CancelEdit>
      </TaskDetailsControls>
    </TaskDetailsEditorWrapper>
  );
};

type TaskDetailsProps = {
  task: Task;
  onTaskNameChange: (task: Task, newName: string) => void;
  onTaskDescriptionChange: (task: Task, newDescription: string) => void;
  onDeleteTask: (task: Task) => void;
  onOpenAddMemberPopup: (task: Task, $targetRef: React.RefObject<HTMLElement>) => void;
  onOpenAddLabelPopup: (task: Task, $targetRef: React.RefObject<HTMLElement>) => void;
  onMemberProfile: ($targetRef: React.RefObject<HTMLElement>, memberID: string) => void;
  onCloseModal: () => void;
};

const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  onTaskNameChange,
  onTaskDescriptionChange,
  onDeleteTask,
  onCloseModal,
  onOpenAddMemberPopup,
  onOpenAddLabelPopup,
  onMemberProfile,
}) => {
  const [editorOpen, setEditorOpen] = useState(false);
  const [description, setDescription] = useState(task.description ?? '');
  const [taskName, setTaskName] = useState(task.name);
  const handleClick = () => {
    setEditorOpen(!editorOpen);
  };
  const handleDeleteTask = () => {
    onDeleteTask(task);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onTaskNameChange(task, taskName);
    }
  };
  const $unassignedRef = useRef<HTMLDivElement>(null);
  const $addMemberRef = useRef<HTMLDivElement>(null);
  const onUnassignedClick = () => {
    onOpenAddMemberPopup(task, $unassignedRef);
  };
  const onAddMember = () => {
    onOpenAddMemberPopup(task, $addMemberRef);
  };
  const $addLabelRef = useRef<HTMLDivElement>(null);
  const onAddLabel = () => {
    onOpenAddLabelPopup(task, $addLabelRef);
  };
  return (
    <>
      <TaskActions>
        <TaskAction onClick={handleDeleteTask}>
          <Bin size={20} color="#c2c6dc" />
        </TaskAction>
        <TaskAction onClick={onCloseModal}>
          <Cross size={20} color="#c2c6dc" />
        </TaskAction>
      </TaskActions>
      <TaskHeader>
        <TaskDetailsTitleWrapper>
          <TaskDetailsTitle
            value={taskName}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTaskName(e.currentTarget.value)}
            onKeyDown={onKeyDown}
          />
        </TaskDetailsTitleWrapper>
        <TaskMeta>
          {task.taskGroup.name && (
            <TaskGroupLabel>
              in list <TaskGroupLabelName>{task.taskGroup.name}</TaskGroupLabelName>
            </TaskGroupLabel>
          )}
        </TaskMeta>
      </TaskHeader>
      <TaskDetailsWrapper>
        <TaskDetailsContent>
          <TaskDetailsLabel>Description</TaskDetailsLabel>
          {editorOpen ? (
            <DetailsEditor
              description={description}
              onTaskDescriptionChange={newDescription => {
                setEditorOpen(false);
                setDescription(newDescription);
                onTaskDescriptionChange(task, newDescription);
              }}
              onCancel={() => {
                setEditorOpen(false);
              }}
            />
          ) : (
            <TaskContent description={description} onEditContent={handleClick} />
          )}
        </TaskDetailsContent>
        <TaskDetailsSidebar>
          <TaskDetailSectionTitle>Assignees</TaskDetailSectionTitle>
          <TaskDetailAssignees>
            {task.assigned && task.assigned.length === 0 ? (
              <UnassignedLabel ref={$unassignedRef} onClick={onUnassignedClick}>
                Unassigned
              </UnassignedLabel>
            ) : (
              <>
                {task.assigned &&
                  task.assigned.map(member => (
                    <TaskAssignee key={member.id} size={32} member={member} onMemberProfile={onMemberProfile} />
                  ))}
                <TaskDetailsAddMember ref={$addMemberRef} onClick={onAddMember}>
                  <TaskDetailsAddMemberIcon>
                    <Plus size={16} color="#c2c6dc" />
                  </TaskDetailsAddMemberIcon>
                </TaskDetailsAddMember>
              </>
            )}
          </TaskDetailAssignees>
          <TaskDetailSectionTitle>Labels</TaskDetailSectionTitle>
          <TaskDetailLabels>
            {task.labels.map(label => {
              return (
                <TaskDetailLabel key={label.projectLabel.id} color={label.projectLabel.labelColor.colorHex}>
                  {label.projectLabel.name}
                </TaskDetailLabel>
              );
            })}
            <TaskDetailsAddLabel ref={$addLabelRef} onClick={onAddLabel}>
              <TaskDetailsAddLabelIcon>
                <Plus size={16} color="#c2c6dc" />
              </TaskDetailsAddLabelIcon>
            </TaskDetailsAddLabel>
          </TaskDetailLabels>
          <TaskDetailSectionTitle>Due Date</TaskDetailSectionTitle>
          <NoDueDateLabel>No due date</NoDueDateLabel>
        </TaskDetailsSidebar>
      </TaskDetailsWrapper>
    </>
  );
};

export default TaskDetails;
