import gql from 'graphql-tag';
import TASK_FRAGMENT from './fragments/task';

const FIND_PROJECT_QUERY = gql`
query findProject($projectId: String!) {
  findProject(input: { projectId: $projectId }) {
    name
    members {
      id
      fullName
      username
      role {
        code
        name
      }
      profileIcon {
        url
        initials
        bgColor
      }
    }
    labels {
      id
      createdDate
      name
      labelColor {
        id
        name
        colorHex
        position
      }
    }
    taskGroups {
      id
      name
      position
      tasks {
        ...TaskFields
      }
    }
  }
  labelColors {
    id
    position
    colorHex
    name
  }
  users {
    id
    email
    fullName
    username
    role {
      code
      name
    }
    profileIcon {
      url
      initials
      bgColor
    }
  }
  ${TASK_FRAGMENT}
}
`;
