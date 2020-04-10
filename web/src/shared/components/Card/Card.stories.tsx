import React, { useRef } from 'react';
import { action } from '@storybook/addon-actions';
import LabelColors from 'shared/constants/labelColors';
import Card from './index';

export default {
  component: Card,
  title: 'Card',
  parameters: {
    backgrounds: [
      { name: 'gray', value: '#f8f8f8', default: true },
      { name: 'white', value: '#ffffff' },
    ],
  },
};

const labelData = [
  {
    labelId: 'development',
    name: 'Development',
    color: LabelColors.BLUE,
    active: false,
  },
  {
    labelId: 'general',
    name: 'General',
    color: LabelColors.PINK,
    active: false,
  },
];

export const Default = () => {
  const $ref = useRef<HTMLDivElement>(null);
  return (
    <Card
      taskID="1"
      taskGroupID="1"
      description=""
      ref={$ref}
      title="Hello, world"
      onClick={action('on click')}
      onContextMenu={action('on context click')}
    />
  );
};

export const Labels = () => {
  const $ref = useRef<HTMLDivElement>(null);
  return (
    <Card
      taskID="1"
      taskGroupID="1"
      description=""
      ref={$ref}
      title="Hello, world"
      labels={labelData}
      onClick={action('on click')}
      onContextMenu={action('on context click')}
    />
  );
};

export const Badges = () => {
  const $ref = useRef<HTMLDivElement>(null);
  return (
    <Card
      taskID="1"
      taskGroupID="1"
      description="hello!"
      ref={$ref}
      title="Hello, world"
      onClick={action('on click')}
      onContextMenu={action('on context click')}
      watched
      checklists={{ complete: 1, total: 4 }}
      dueDate={{ isPastDue: false, formattedDate: 'Oct 26, 2020' }}
    />
  );
};

export const PastDue = () => {
  const $ref = useRef<HTMLDivElement>(null);
  return (
    <Card
      taskID="1"
      taskGroupID="1"
      description="hello!"
      ref={$ref}
      title="Hello, world"
      onClick={action('on click')}
      onContextMenu={action('on context click')}
      watched
      checklists={{ complete: 1, total: 4 }}
      dueDate={{ isPastDue: true, formattedDate: 'Oct 26, 2020' }}
    />
  );
};

export const Everything = () => {
  const $ref = useRef<HTMLDivElement>(null);
  return (
    <Card
      taskID="1"
      taskGroupID="1"
      description="hello!"
      ref={$ref}
      title="Hello, world"
      onClick={action('on click')}
      onContextMenu={action('on context click')}
      watched
      labels={labelData}
      checklists={{ complete: 1, total: 4 }}
      dueDate={{ isPastDue: false, formattedDate: 'Oct 26, 2020' }}
    />
  );
};
