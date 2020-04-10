import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import { moveItemWithinArray, insertItemIntoArray } from 'shared/utils/arrays';
import List, { ListCards } from 'shared/components/List';
import Card from 'shared/components/Card';
import { Container } from './Styles';
import CardComposer from 'shared/components/CardComposer';

const getNewDraggablePosition = (afterDropDraggables: any, draggableIndex: any) => {
  const prevDraggable = afterDropDraggables[draggableIndex - 1];
  const nextDraggable = afterDropDraggables[draggableIndex + 1];
  if (!prevDraggable && !nextDraggable) {
    return 1;
  }
  if (!prevDraggable) {
    return nextDraggable.position - 1;
  }
  if (!nextDraggable) {
    return prevDraggable.position + 1;
  }
  const newPos = (prevDraggable.position + nextDraggable.position) / 2.0;
  return newPos;
};

const getSortedDraggables = (draggables: any) => {
  return draggables.sort((a: any, b: any) => a.position - b.position);
};

const isPositionChanged = (source: any, destination: any) => {
  if (!destination) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

const getAfterDropDraggableList = (
  beforeDropDraggables: any,
  droppedDraggable: any,
  isList: any,
  isSameList: any,
  destination: any,
) => {
  if (isList) {
    return moveItemWithinArray(beforeDropDraggables, droppedDraggable, destination.index);
  }
  return isSameList
    ? moveItemWithinArray(beforeDropDraggables, droppedDraggable, destination.index)
    : insertItemIntoArray(beforeDropDraggables, droppedDraggable, destination.index);
};

interface Columns {
  [key: string]: TaskGroup;
}
interface Tasks {
  [key: string]: RemoteTask;
}

type Props = {
  columns: Columns;
  tasks: Tasks;
  onCardDrop: any;
  onListDrop: any;
  onCardCreate: (taskGroupID: string, name: string) => void;
  onQuickEditorOpen: (e: ContextMenuEvent) => void;
};

type OnDragEndProps = {
  draggableId: any;
  source: any;
  destination: any;
  type: any;
};

const Lists = ({ columns, tasks, onCardDrop, onListDrop, onCardCreate, onQuickEditorOpen }: Props) => {
  const onDragEnd = ({ draggableId, source, destination, type }: DropResult) => {
    if (typeof destination === 'undefined') return;
    if (!isPositionChanged(source, destination)) return;

    const isList = type === 'column';
    const isSameList = destination.droppableId === source.droppableId;
    const droppedDraggable = isList ? columns[draggableId] : tasks[draggableId];
    const beforeDropDraggables = isList
      ? getSortedDraggables(Object.values(columns))
      : getSortedDraggables(Object.values(tasks).filter((t: any) => t.taskGroupID === destination.droppableId));

    const afterDropDraggables = getAfterDropDraggableList(
      beforeDropDraggables,
      droppedDraggable,
      isList,
      isSameList,
      destination,
    );
    const newPosition = getNewDraggablePosition(afterDropDraggables, destination.index);

    if (isList) {
      onListDrop({
        ...droppedDraggable,
        position: newPosition,
      });
    } else {
      const newCard = {
        ...droppedDraggable,
        position: newPosition,
        taskGroupID: destination.droppableId,
      };
      onCardDrop(newCard);
    }
  };

  const orderedColumns = getSortedDraggables(Object.values(columns));

  const [currentComposer, setCurrentComposer] = useState('');
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction="horizontal" type="column" droppableId="root">
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {orderedColumns.map((column: TaskGroup, index: number) => {
              const columnCards = getSortedDraggables(
                Object.values(tasks).filter((t: any) => t.taskGroupID === column.taskGroupID),
              );
              return (
                <Draggable draggableId={column.taskGroupID} key={column.taskGroupID} index={index}>
                  {columnDragProvided => (
                    <List
                      id={column.taskGroupID}
                      name={column.name}
                      key={column.taskGroupID}
                      onOpenComposer={id => setCurrentComposer(id)}
                      isComposerOpen={currentComposer === column.taskGroupID}
                      onSaveName={name => console.log(name)}
                      index={index}
                      tasks={columnCards}
                      ref={columnDragProvided.innerRef}
                      wrapperProps={columnDragProvided.draggableProps}
                      headerProps={columnDragProvided.dragHandleProps}
                    >
                      <Droppable type="tasks" droppableId={column.taskGroupID}>
                        {columnDropProvided => (
                          <ListCards ref={columnDropProvided.innerRef} {...columnDropProvided.droppableProps}>
                            {columnCards.map((task: RemoteTask, taskIndex: any) => {
                              return (
                                <Draggable key={task.taskID} draggableId={task.taskID} index={taskIndex}>
                                  {taskProvided => {
                                    return (
                                      <Card
                                        wrapperProps={{
                                          ...taskProvided.draggableProps,
                                          ...taskProvided.dragHandleProps,
                                        }}
                                        ref={taskProvided.innerRef}
                                        cardId={task.taskID}
                                        listId={column.taskGroupID}
                                        description=""
                                        title={task.name}
                                        labels={task.labels}
                                        onClick={e => console.log(e)}
                                        onContextMenu={onQuickEditorOpen}
                                      />
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {columnDropProvided.placeholder}

                            {currentComposer === column.taskGroupID && (
                              <CardComposer
                                onClose={() => {
                                  setCurrentComposer('');
                                }}
                                onCreateCard={name => {
                                  setCurrentComposer('');
                                  onCardCreate(column.taskGroupID, name);
                                }}
                                isOpen={true}
                              />
                            )}
                          </ListCards>
                        )}
                      </Droppable>
                    </List>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Lists;
