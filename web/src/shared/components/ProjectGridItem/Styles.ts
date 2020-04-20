import styled from 'styled-components';
import { mixin } from 'shared/utils/styles';

export const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProjectTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  transition: transform 0.25s ease;
`;
export const TeamTitle = styled.span`
  margin-top: 5px;
  font-size: 14px;
  font-weight: normal;
  color: #c2c6dc;
`;

export const ProjectWrapper = styled.div<{ color: string }>`
  display: flex;
  padding: 15px 25px;
  border-radius: 20px;
  ${mixin.boxShadowCard}
  background: ${props => mixin.darken(props.color, 0.35)};
  color: #fff;
  cursor: pointer;
  margin: 0 10px;
  width: 240px;
  height: 100px;
  transition: transform 0.25s ease;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
  }
`;
