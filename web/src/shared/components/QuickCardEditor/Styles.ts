import styled, { keyframes } from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import { mixin } from 'shared/utils/styles';

export const Wrapper = styled.div<{ open: boolean }>`
  background: rgba(0, 0, 0, 0.55);
  bottom: 0;
  color: #fff;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  visibility: ${props => (props.open ? 'show' : 'hidden')};
`;

export const Container = styled.div<{ width: number; top: number; left: number }>`
  position: absolute;
  width: ${props => props.width}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`;

export const SaveButton = styled.button`
  cursor: pointer;
  background: rgb(115, 103, 240);
  box-shadow: none;
  border: none;
  color: #fff;
  font-weight: 400;
  line-height: 20px;
  margin-top: 8px;
  margin-right: 4px;
  padding: 6px 24px;
  text-align: center;
  border-radius: 3px;
`;

export const FadeInAnimation = keyframes`
from { opacity: 0; transform: translateX(-20px); }
to { opacity: 1; transform: translateX(0); }
`;

export const EditorButtons = styled.div`
  left: 100%;
  position: absolute;
  top: 0;
  width: 240px;
  z-index: 0;
  animation: ${FadeInAnimation} 85ms ease-in 1;
`;

export const EditorButton = styled.div`
  cursor: pointer;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 3px;
  clear: both;
  color: #c2c6dc;
  display: block;
  float: left;
  margin: 0 0 4px 8px;
  padding: 6px 12px 6px 8px;
  text-decoration: none;
  transition: transform 85ms ease-in;
`;

export const CloseButton = styled.div`
  padding: 9px;
  position: absolute;
  right: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  opacity: 0.8;
  z-index: 40;
  cursor: pointer;
`;
