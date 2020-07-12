import React, {useState} from 'react';
import updateApolloCache from 'shared/utils/cache';
import {usePopup, Popup} from 'shared/components/PopupMenu';
import produce from 'immer';
import {
  useSetProjectOwnerMutation,
  useUpdateProjectMemberRoleMutation,
  useCreateProjectMemberMutation,
  useDeleteProjectMemberMutation,
  useSetTaskCompleteMutation,
  useToggleTaskLabelMutation,
  useUpdateProjectNameMutation,
  useFindProjectQuery,
  useUpdateTaskGroupNameMutation,
  useUpdateTaskNameMutation,
  useUpdateProjectLabelMutation,
  useCreateTaskMutation,
  useDeleteProjectLabelMutation,
  useDeleteTaskMutation,
  useUpdateTaskLocationMutation,
  useUpdateTaskGroupLocationMutation,
  useCreateTaskGroupMutation,
  useDeleteTaskGroupMutation,
  useUpdateTaskDescriptionMutation,
  useAssignTaskMutation,
  DeleteTaskDocument,
  FindProjectDocument,
  useCreateProjectLabelMutation,
  useUnassignTaskMutation,
  useUpdateTaskDueDateMutation,
  FindProjectQuery,
  useUsersQuery,
} from 'shared/generated/graphql';
import LabelManager from 'shared/components/PopupMenu/LabelManager';
import LabelEditor from 'shared/components/PopupMenu/LabelEditor';

type LabelManagerEditorProps = {
  labels: React.RefObject<Array<ProjectLabel>>;
  taskLabels: null | React.RefObject<Array<TaskLabel>>;
  projectID: string;
  labelColors: Array<LabelColor>;
  onLabelToggle?: (labelId: string) => void;
};

const LabelManagerEditor: React.FC<LabelManagerEditorProps> = ({
  labels: labelsRef,
  projectID,
  labelColors,
  onLabelToggle,
  taskLabels: taskLabelsRef,
}) => {
  const [currentLabel, setCurrentLabel] = useState('');
  const {setTab, hidePopup} = usePopup();
  const [createProjectLabel] = useCreateProjectLabelMutation({
    update: (client, newLabelData) => {
      updateApolloCache<FindProjectQuery>(
        client,
        FindProjectDocument,
        cache =>
          produce(cache, draftCache => {
            draftCache.findProject.labels.push({...newLabelData.data.createProjectLabel});
          }),
        {
          projectId: projectID,
        },
      );
    },
  });
  const [updateProjectLabel] = useUpdateProjectLabelMutation();
  const [deleteProjectLabel] = useDeleteProjectLabelMutation({
    update: (client, newLabelData) => {
      updateApolloCache<FindProjectQuery>(
        client,
        FindProjectDocument,
        cache =>
          produce(cache, draftCache => {
            draftCache.findProject.labels = cache.findProject.labels.filter(
              label => label.id !== newLabelData.data.deleteProjectLabel.id,
            );
          }),
        {projectId: projectID},
      );
    },
  });
  const labels = labelsRef.current ? labelsRef.current : [];
  const taskLabels = taskLabelsRef && taskLabelsRef.current ? taskLabelsRef.current : [];
  const [currentTaskLabels, setCurrentTaskLabels] = useState(taskLabels);
  console.log(taskLabels);
  return (
    <>
      <Popup title="Labels" tab={0} onClose={() => hidePopup()}>
        <LabelManager
          labels={labels}
          taskLabels={currentTaskLabels}
          onLabelCreate={() => {
            setTab(2);
          }}
          onLabelEdit={labelId => {
            setCurrentLabel(labelId);
            setTab(1);
          }}
          onLabelToggle={labelId => {
            if (onLabelToggle) {
              if (currentTaskLabels.find(t => t.projectLabel.id === labelId)) {
                setCurrentTaskLabels(currentTaskLabels.filter(t => t.projectLabel.id !== labelId));
              } else {
                const newProjectLabel = labels.find(l => l.id === labelId);
                if (newProjectLabel) {
                  setCurrentTaskLabels([
                    ...currentTaskLabels,
                    {id: '', assignedDate: '', projectLabel: {...newProjectLabel}},
                  ]);
                }
              }
              setCurrentLabel(labelId);
              onLabelToggle(labelId);
            } else {
              setCurrentLabel(labelId);
              setTab(1);
            }
          }}
        />
      </Popup>
      <Popup onClose={() => hidePopup()} title="Edit label" tab={1}>
        <LabelEditor
          labelColors={labelColors}
          label={labels.find(label => label.id === currentLabel) ?? null}
          onLabelEdit={(projectLabelID, name, color) => {
            if (projectLabelID) {
              updateProjectLabel({variables: {projectLabelID, labelColorID: color.id, name: name ?? ''}});
            }
            setTab(0);
          }}
          onLabelDelete={labelID => {
            deleteProjectLabel({variables: {projectLabelID: labelID}});
            setTab(0);
          }}
        />
      </Popup>
      <Popup onClose={() => hidePopup()} title="Create new label" tab={2}>
        <LabelEditor
          labelColors={labelColors}
          label={null}
          onLabelEdit={(_labelId, name, color) => {
            createProjectLabel({variables: {projectID, labelColorID: color.id, name: name ?? ''}});
            setTab(0);
          }}
        />
      </Popup>
    </>
  );
};

export default LabelManagerEditor
