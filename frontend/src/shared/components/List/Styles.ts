import styled, { css } from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import { mixin } from 'shared/utils/styles';

export const Container = styled.div`
  width: 272px;
  margin: 0 4px;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
`;

export const AddCardContainer = styled.div`
  min-height: 38px;
  max-height: 38px;
  display: ${props => (props.hidden ? 'none' : 'flex')};
  justify-content: space-between;
`;

export const AddCardButton = styled.a`
  border-radius: 3px;
  color: #c2c6dc;
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: 1 0 auto;
  margin: 2px 8px 8px 8px;
  padding: 4px 8px;
  position: relative;
  text-decoration: none;
  user-select: none;
  &:hover {
    color: #c2c6dc;
    text-decoration: none;
    background: rgb(115, 103, 240);
  }
`;
export const Wrapper = styled.div`
  // background-color: #ebecf0;
  // background: rgb(244, 245, 247);
  background: #10163a;
  color: #c2c6dc;

  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
`;

export const HeaderEditTarget = styled.div<{ isHidden: boolean }>`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${props => (props.isHidden ? 'none' : 'block')};
`;

export const HeaderName = styled(TextareaAutosize)`
  font-family: 'Droid Sans';
  font-size: 14px;
  border: none;
  resize: none;
  overflow: hidden;
  overflow-wrap: break-word;
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  margin: -4px 0;
  padding: 4px 8px;

  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  flex-direction: column;
  text-align: start;

  color: #c2c6dc;
`;

export const Header = styled.div<{ isEditing: boolean }>`
  flex: 0 0 auto;
  padding: 10px 8px;
  position: relative;
  min-height: 20px;
  padding-right: 36px;

  ${props =>
    props.isEditing &&
    css`
      & ${HeaderName} {
        box-shadow: rgb(115, 103, 240) 0px 0px 0px 1px;
      }
    `}
`;

export const AddCardButtonText = styled.span`
  padding-left: 5px;
  font-family: 'Droid Sans';
`;

export const ListCards = styled.div`
  margin: 0 4px;
  padding: 0 4px;
  flex: 1 1 auto;
  min-height: 45px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ListExtraMenuButtonWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 1;
  padding: 6px;
  padding-bottom: 0;
`;
