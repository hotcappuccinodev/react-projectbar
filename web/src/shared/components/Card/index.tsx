import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TaskAssignee from 'shared/components/TaskAssignee';
import { faPencilAlt, faList } from '@fortawesome/free-solid-svg-icons';
import { faClock, faCheckSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import {
  EditorTextarea,
  DescriptionBadge,
  DueDateCardBadge,
  ListCardBadges,
  ListCardBadge,
  ListCardBadgeText,
  ListCardContainer,
  ListCardInnerContainer,
  ListCardDetails,
  ClockIcon,
  ListCardLabels,
  ListCardLabel,
  ListCardOperation,
  CardTitle,
  CardMembers,
} from './Styles';

type DueDate = {
  isPastDue: boolean;
  formattedDate: string;
};

type Checklist = {
  complete: number;
  total: number;
};

type Props = {
  title: string;
  taskID: string;
  taskGroupID: string;
  onContextMenu?: (e: ContextMenuEvent) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  description?: null | string;
  dueDate?: DueDate;
  checklists?: Checklist;
  labels?: Array<ProjectLabel>;
  watched?: boolean;
  wrapperProps?: any;
  members?: Array<TaskUser> | null;
  onCardMemberClick?: OnCardMemberClick;
  editable?: boolean;
  onEditCard?: (taskGroupID: string, taskID: string, cardName: string) => void;
  onCardTitleChange?: (name: string) => void;
};

const Card = React.forwardRef(
  (
    {
      wrapperProps,
      onContextMenu,
      taskID,
      taskGroupID,
      onClick,
      labels,
      title,
      dueDate,
      description,
      checklists,
      watched,
      members,
      onCardMemberClick,
      editable,
      onEditCard,
      onCardTitleChange,
    }: Props,
    $cardRef: any,
  ) => {
    const [currentCardTitle, setCardTitle] = useState(title);
    const $editorRef: any = useRef();

    useEffect(() => {
      setCardTitle(title);
    }, [title]);

    useEffect(() => {
      if ($editorRef && $editorRef.current) {
        $editorRef.current.focus();
        $editorRef.current.select();
      }
    }, []);

    const handleKeyDown = (e: any) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (onEditCard) {
          onEditCard(taskGroupID, taskID, currentCardTitle);
        }
      }
    };
    const [isActive, setActive] = useState(false);
    const $innerCardRef: any = useRef(null);
    const onOpenComposer = () => {
      if (typeof $innerCardRef.current !== 'undefined') {
        const pos = $innerCardRef.current.getBoundingClientRect();
        if (onContextMenu) {
          onContextMenu({
            top: pos.top,
            left: pos.left,
            taskGroupID,
            taskID,
          });
        }
      }
    };
    const onTaskContext = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onOpenComposer();
    };
    const onOperationClick = (e: React.MouseEvent<HTMLOrSVGElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onOpenComposer();
    };
    return (
      <ListCardContainer
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        ref={$cardRef}
        onClick={e => {
          if (onClick) {
            onClick(e);
          }
        }}
        onContextMenu={onTaskContext}
        isActive={isActive}
        editable={editable}
        {...wrapperProps}
      >
        <ListCardInnerContainer ref={$innerCardRef}>
          {isActive && (
            <ListCardOperation>
              <FontAwesomeIcon onClick={onOperationClick} color="#c2c6dc" size="xs" icon={faPencilAlt} />
            </ListCardOperation>
          )}
          <ListCardDetails>
            <ListCardLabels>
              {labels &&
                labels.map(label => (
                  <ListCardLabel color={label.labelColor.colorHex} key={label.id}>
                    {label.name}
                  </ListCardLabel>
                ))}
            </ListCardLabels>
            {editable ? (
              <EditorTextarea
                onChange={e => {
                  setCardTitle(e.currentTarget.value);
                  if (onCardTitleChange) {
                    onCardTitleChange(e.currentTarget.value);
                  }
                }}
                onClick={e => {
                  e.stopPropagation();
                }}
                onKeyDown={handleKeyDown}
                value={currentCardTitle}
                ref={$editorRef}
              />
            ) : (
              <CardTitle>{title}</CardTitle>
            )}
            <ListCardBadges>
              {watched && (
                <ListCardBadge>
                  <FontAwesomeIcon color="#6b778c" icon={faEye} size="xs" />
                </ListCardBadge>
              )}
              {dueDate && (
                <DueDateCardBadge isPastDue={dueDate.isPastDue}>
                  <ClockIcon color={dueDate.isPastDue ? '#fff' : '#6b778c'} icon={faClock} size="xs" />
                  <ListCardBadgeText>{dueDate.formattedDate}</ListCardBadgeText>
                </DueDateCardBadge>
              )}
              {description && (
                <DescriptionBadge>
                  <FontAwesomeIcon color="#6b778c" icon={faList} size="xs" />
                </DescriptionBadge>
              )}
              {checklists && (
                <ListCardBadge>
                  <FontAwesomeIcon color="#6b778c" icon={faCheckSquare} size="xs" />
                  <ListCardBadgeText>{`${checklists.complete}/${checklists.total}`}</ListCardBadgeText>
                </ListCardBadge>
              )}
            </ListCardBadges>
            <CardMembers>
              {members &&
                members.map(member => (
                  <TaskAssignee
                    key={member.id}
                    size={28}
                    member={member}
                    onMemberProfile={$target => {
                      if (onCardMemberClick) {
                        onCardMemberClick($target, taskID, member.id);
                      }
                    }}
                  />
                ))}
            </CardMembers>
          </ListCardDetails>
        </ListCardInnerContainer>
      </ListCardContainer>
    );
  },
);

Card.displayName = 'Card';

export default Card;
