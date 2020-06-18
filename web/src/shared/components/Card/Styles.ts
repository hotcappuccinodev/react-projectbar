import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mixin } from 'shared/utils/styles';
import TextareaAutosize from 'react-autosize-textarea';
import { CheckCircle } from 'shared/icons';
import { RefObject } from 'react';

export const ClockIcon = styled(FontAwesomeIcon)``;

export const EditorTextarea = styled(TextareaAutosize)`
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  height: 54px;
  width: 100%;

  background: none;
  border: none;
  box-shadow: none;
  margin-bottom: 4px;
  max-height: 162px;
  min-height: 54px;
  padding: 0;
  font-size: 14px;
  line-height: 16px;
  color: rgba(${props => props.theme.colors.text.primary});
  &:focus {
    border: none;
    outline: none;
  }
`;

export const ListCardBadges = styled.div`
  float: left;
  display: flex;
  max-width: 100%;
  margin-left: -2px;
`;

export const ListCardBadge = styled.div`
  color: #5e6c84;
  display: flex;
  align-items: center;
  margin: 0 6px 4px 0;
  font-size: 12px;
  max-width: 100%;
  min-height: 20px;
  overflow: hidden;
  position: relative;
  padding: 2px;
  text-decoration: none;
  text-overflow: ellipsis;
  vertical-align: top;
`;

export const DescriptionBadge = styled(ListCardBadge)`
  padding-right: 6px;
`;

export const DueDateCardBadge = styled(ListCardBadge)<{ isPastDue: boolean }>`
  font-size: 12px;
  ${props =>
    props.isPastDue &&
    css`
      padding-left: 4px;
      background-color: #ec9488;
      border-radius: 3px;
      color: #fff;
    `}
`;

export const ListCardBadgeText = styled.span`
  font-size: 12px;
  padding: 0 4px 0 6px;
  vertical-align: top;
  white-space: nowrap;
`;

export const ListCardContainer = styled.div<{ isActive: boolean; editable: boolean }>`
  max-width: 256px;
  margin-bottom: 8px;
  border-radius: 3px;
  ${mixin.boxShadowCard}
  cursor: pointer !important;
  position: relative;

  background-color: ${props =>
    props.isActive && !props.editable ? mixin.darken('#262c49', 0.1) : `rgba(${props.theme.colors.bg.secondary})`};
`;

export const ListCardInnerContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const ListCardDetails = styled.div<{ complete: boolean }>`
  overflow: hidden;
  padding: 6px 8px 2px;
  position: relative;
  z-index: 10;

  ${props => props.complete && 'opacity: 0.6;'}
`;

export const ListCardLabels = styled.div`
  overflow: auto;
  position: relative;
`;

export const ListCardLabel = styled.span`
  height: 16px;
  line-height: 16px;
  padding: 0 8px;
  max-width: 198px;
  float: left;
  font-size: 12px;
  font-weight: 700;
  margin: 0 4px 4px 0;
  width: auto;
  border-radius: 4px;
  color: #fff;
  display: block;
  position: relative;
  background-color: ${props => props.color};
`;

export const ListCardOperation = styled.span`
  display: flex;
  align-content: center;
  justify-content: center;
  border-radius: 3px;
  opacity: 0.8;
  padding: 6px;
  position: absolute;
  right: 2px;
  top: 2px;
  z-index: 10;

  &:hover {
    background-color: ${props => mixin.darken('#262c49', 0.45)};
  }
`;

export const CardTitle = styled.span`
  clear: both;
  margin: 0 0 4px;
  overflow: hidden;
  text-decoration: none;
  word-wrap: break-word;
  line-height: 16px;
  font-size: 14px;
  color: rgba(${props => props.theme.colors.text.primary});

  display: flex;
  align-items: center;
`;

export const CardMembers = styled.div`
  float: right;
  margin: 0 -2px 4px 0;
`;

export const CompleteIcon = styled(CheckCircle)`
  fill: rgba(${props => props.theme.colors.success});
  margin-right: 4px;
`;

export const EditorContent = styled.div`
  display: flex;
`;
