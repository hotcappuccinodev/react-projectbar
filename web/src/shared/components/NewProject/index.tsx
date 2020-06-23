import React, { useState } from 'react';
import styled from 'styled-components';
import { mixin } from 'shared/utils/styles';
import Select from 'react-select';
import { ArrowLeft, Cross } from 'shared/icons';

const Overlay = styled.div`
  z-index: 10000;
  background: #262c49;
  bottom: 0;
  color: #fff;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Header = styled.div`
  height: 64px;
  padding: 0 24px;
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  transition: box-shadow 250ms;
`;

const HeaderLeft = styled.div`
  align-items: center;
  display: flex;
  cursor: pointer;
`;
const HeaderRight = styled.div`
  cursor: pointer;
  align-items: center;
  display: flex;
`;

const Container = styled.div`
  padding: 32px 0;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ContainerContent = styled.div`
  width: 520px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #c2c6dc;
  margin-bottom: 25px;
`;

const ProjectName = styled.input`
  margin: 0 0 12px;
  width: 100%;
  box-sizing: border-box;
  display: block;
  line-height: 20px;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: #262c49;
  outline: none;
  color: #c2c6dc;

  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-image: initial;
  border-color: #414561;

  font-size: 16px;
  font-weight: 400;

  &:focus {
    background: ${mixin.darken('#262c49', 0.15)};
    box-shadow: rgb(115, 103, 240) 0px 0px 0px 1px;
  }
`;
const ProjectNameLabel = styled.label`
  color: #c2c6dc;
  font-size: 12px;
  margin-bottom: 4px;
`;
const ProjectInfo = styled.div`
  display: flex;
`;

const ProjectField = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  flex-grow: 1;
`;
const ProjectTeamField = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const colourStyles = {
  control: (styles: any, data: any) => {
    return {
      ...styles,
      backgroundColor: data.isMenuOpen ? mixin.darken('#262c49', 0.15) : '#262c49',
      boxShadow: data.menuIsOpen ? 'rgb(115, 103, 240) 0px 0px 0px 1px' : 'none',
      borderRadius: '3px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderImage: 'initial',
      borderColor: '#414561',
      ':hover': {
        boxShadow: 'rgb(115, 103, 240) 0px 0px 0px 1px',
        borderRadius: '3px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderImage: 'initial',
        borderColor: '#414561',
      },
      ':active': {
        boxShadow: 'rgb(115, 103, 240) 0px 0px 0px 1px',
        borderRadius: '3px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderImage: 'initial',
        borderColor: 'rgb(115, 103, 240)',
      },
    };
  },
  menu: (styles: any) => {
    return {
      ...styles,
      backgroundColor: mixin.darken('#262c49', 0.15),
    };
  },
  dropdownIndicator: (styles: any) => ({ ...styles, color: '#c2c6dc', ':hover': { color: '#c2c6dc' } }),
  indicatorSeparator: (styles: any) => ({ ...styles, color: '#c2c6dc' }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? mixin.darken('#262c49', 0.25)
        : isFocused
        ? mixin.darken('#262c49', 0.15)
        : null,
      color: isDisabled ? '#ccc' : isSelected ? '#fff' : '#c2c6dc',
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? mixin.darken('#262c49', 0.25) : '#fff'),
      },
      ':hover': {
        ...styles[':hover'],
        backgroundColor: !isDisabled && (isSelected ? 'rgb(115, 103, 240)' : 'rgb(115, 103, 240)'),
      },
    };
  },
  placeholder: (styles: any) => ({ ...styles, color: '#c2c6dc' }),
  clearIndicator: (styles: any) => ({ ...styles, color: '#c2c6dc', ':hover': { color: '#c2c6dc' } }),
  input: (styles: any) => ({
    ...styles,
    color: '#fff',
  }),
  singleValue: (styles: any) => {
    return {
      ...styles,
      color: '#fff',
    };
  },
};
const CreateButton = styled.button`
  outline: none;
  border: none;
  width: 100%;
  line-height: 20px;
  padding: 6px 12px;
  background-color: none;
  text-align: center;
  color: #c2c6dc;
  font-size: 14px;
  cursor: pointer;

  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-image: initial;
  border-color: #414561;

  &:hover {
    color: #fff;
    background: rgb(115, 103, 240);
    border-color: rgb(115, 103, 240);
  }
`;
type NewProjectProps = {
  initialTeamID: string | null;
  teams: Array<Team>;
  onClose: () => void;
  onCreateProject: (projectName: string, teamID: string) => void;
};

const NewProject: React.FC<NewProjectProps> = ({ initialTeamID, teams, onClose, onCreateProject }) => {
  const [projectName, setProjectName] = useState('');
  const [team, setTeam] = useState<null | string>(initialTeamID);
  const options = teams.map(t => ({ label: t.name, value: t.id }));
  return (
    <Overlay>
      <Content>
        <Header>
          <HeaderLeft
            onClick={() => {
              onClose();
            }}
          >
            <ArrowLeft color="#c2c6dc" />
          </HeaderLeft>
          <HeaderRight
            onClick={() => {
              onClose();
            }}
          >
            <Cross width={16} height={16} />
          </HeaderRight>
        </Header>
        <Container>
          <ContainerContent>
            <Title>Add project details</Title>
            <ProjectInfo>
              <ProjectField>
                <ProjectNameLabel>Project name</ProjectNameLabel>
                <ProjectName
                  value={projectName}
                  onChange={(e: any) => {
                    setProjectName(e.currentTarget.value);
                  }}
                />
              </ProjectField>
              <ProjectTeamField>
                <ProjectNameLabel>Team</ProjectNameLabel>
                <Select
                  onChange={(e: any) => {
                    setTeam(e.value);
                  }}
                  value={options.filter(d => d.value === team)}
                  styles={colourStyles}
                  classNamePrefix="teamSelect"
                  options={options}
                />
              </ProjectTeamField>
            </ProjectInfo>
            <CreateButton
              onClick={() => {
                if (team && projectName !== '') {
                  onCreateProject(projectName, team);
                }
              }}
            >
              Create project
            </CreateButton>
          </ContainerContent>
        </Container>
      </Content>
    </Overlay>
  );
};

export default NewProject;
