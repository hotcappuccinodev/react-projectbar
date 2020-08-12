-- name: GetAllProjects :many
SELECT * FROM project;

-- name: GetAllProjectsForTeam :many
SELECT * FROM project WHERE team_id = $1;

-- name: GetProjectByID :one
SELECT * FROM project WHERE project_id = $1;

-- name: CreateProject :one
INSERT INTO project(team_id, created_at, name) VALUES ($1, $2, $3) RETURNING *;

-- name: UpdateProjectNameByID :one
UPDATE project SET name = $2 WHERE project_id = $1 RETURNING *;

-- name: DeleteProjectByID :exec
DELETE FROM project WHERE project_id = $1;

-- name: GetProjectMembersForProjectID :many
SELECT * FROM project_member WHERE project_id = $1;

-- name: GetRoleForProjectMemberByUserID :one
SELECT code, role.name FROM project_member INNER JOIN role ON role.code = project_member.role_code
WHERE user_id = $1 AND project_id = $2;

-- name: CreateProjectMember :one
INSERT INTO project_member (project_id, user_id, role_code, added_at) VALUES ($1, $2, $3, $4)
  RETURNING *;

-- name: DeleteProjectMember :exec
DELETE FROM project_member WHERE user_id = $1 AND project_id = $2;

-- name: UpdateProjectMemberRole :one
UPDATE project_member SET role_code = $3 WHERE project_id = $1 AND user_id = $2
  RETURNING *;

-- name: GetProjectRolesForUserID :many
SELECT project_id, role_code FROM project_member WHERE user_id = $1;

-- name: GetMemberProjectIDsForUserID :many
SELECT project_id FROM project_member WHERE user_id = $1;

-- name: GetAllVisibleProjectsForUserID :many
SELECT project.* FROM project LEFT JOIN
 project_member ON project_member.project_id = project.project_id WHERE project_member.user_id = $1;

-- name: GetUserRolesForProject :one
SELECT p.team_id, COALESCE(tm.role_code, '') AS team_role, COALESCE(pm.role_code, '') AS project_role
  FROM project AS p
  LEFT JOIN project_member AS pm ON pm.project_id = p.project_id AND pm.user_id = $1
  LEFT JOIN team_member AS tm ON tm.team_id = p.team_id AND tm.user_id = $1
  WHERE p.project_id = $2;
