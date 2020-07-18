package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jordanknott/project-citadel/api/internal/db"
	log "github.com/sirupsen/logrus"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"golang.org/x/crypto/bcrypt"
)

func (r *labelColorResolver) ID(ctx context.Context, obj *db.LabelColor) (uuid.UUID, error) {
	return obj.LabelColorID, nil
}

func (r *mutationResolver) CreateProject(ctx context.Context, input NewProject) (*db.Project, error) {
	createdAt := time.Now().UTC()
	project, err := r.Repository.CreateProject(ctx, db.CreateProjectParams{input.UserID, input.TeamID, createdAt, input.Name})
	return &project, err
}

func (r *mutationResolver) DeleteProject(ctx context.Context, input DeleteProject) (*DeleteProjectPayload, error) {
	project, err := r.Repository.GetProjectByID(ctx, input.ProjectID)
	if err != nil {
		return &DeleteProjectPayload{Ok: false}, err
	}
	err = r.Repository.DeleteProjectByID(ctx, input.ProjectID)
	if err != nil {
		return &DeleteProjectPayload{Ok: false}, err
	}
	return &DeleteProjectPayload{Project: &project, Ok: true}, err
}

func (r *mutationResolver) UpdateProjectName(ctx context.Context, input *UpdateProjectName) (*db.Project, error) {
	project, err := r.Repository.UpdateProjectNameByID(ctx, db.UpdateProjectNameByIDParams{ProjectID: input.ProjectID, Name: input.Name})
	if err != nil {
		return &db.Project{}, err
	}
	return &project, nil
}

func (r *mutationResolver) CreateProjectLabel(ctx context.Context, input NewProjectLabel) (*db.ProjectLabel, error) {
	createdAt := time.Now().UTC()

	var name sql.NullString
	if input.Name != nil {
		name = sql.NullString{
			*input.Name,
			true,
		}
	} else {
		name = sql.NullString{
			"",
			false,
		}
	}
	projectLabel, err := r.Repository.CreateProjectLabel(ctx, db.CreateProjectLabelParams{input.ProjectID, input.LabelColorID, createdAt, name})
	return &projectLabel, err
}

func (r *mutationResolver) DeleteProjectLabel(ctx context.Context, input DeleteProjectLabel) (*db.ProjectLabel, error) {
	label, err := r.Repository.GetProjectLabelByID(ctx, input.ProjectLabelID)
	if err != nil {
		return &db.ProjectLabel{}, err
	}
	err = r.Repository.DeleteProjectLabelByID(ctx, input.ProjectLabelID)
	return &label, err
}

func (r *mutationResolver) UpdateProjectLabel(ctx context.Context, input UpdateProjectLabel) (*db.ProjectLabel, error) {
	label, err := r.Repository.UpdateProjectLabel(ctx, db.UpdateProjectLabelParams{ProjectLabelID: input.ProjectLabelID, LabelColorID: input.LabelColorID, Name: sql.NullString{String: input.Name, Valid: true}})
	return &label, err
}

func (r *mutationResolver) UpdateProjectLabelName(ctx context.Context, input UpdateProjectLabelName) (*db.ProjectLabel, error) {
	label, err := r.Repository.UpdateProjectLabelName(ctx, db.UpdateProjectLabelNameParams{ProjectLabelID: input.ProjectLabelID, Name: sql.NullString{String: input.Name, Valid: true}})
	return &label, err
}

func (r *mutationResolver) UpdateProjectLabelColor(ctx context.Context, input UpdateProjectLabelColor) (*db.ProjectLabel, error) {
	label, err := r.Repository.UpdateProjectLabelColor(ctx, db.UpdateProjectLabelColorParams{ProjectLabelID: input.ProjectLabelID, LabelColorID: input.LabelColorID})
	return &label, err
}

func (r *mutationResolver) CreateProjectMember(ctx context.Context, input CreateProjectMember) (*CreateProjectMemberPayload, error) {
	addedAt := time.Now().UTC()
	_, err := r.Repository.CreateProjectMember(ctx, db.CreateProjectMemberParams{ProjectID: input.ProjectID, UserID: input.UserID, AddedAt: addedAt, RoleCode: "member"})
	if err != nil {
		return &CreateProjectMemberPayload{Ok: false}, err
	}
	user, err := r.Repository.GetUserAccountByID(ctx, input.UserID)
	if err != nil {
		return &CreateProjectMemberPayload{Ok: false}, err
	}
	var url *string
	if user.ProfileAvatarUrl.Valid {
		url = &user.ProfileAvatarUrl.String
	}
	profileIcon := &ProfileIcon{url, &user.Initials, &user.ProfileBgColor}

	role, err := r.Repository.GetRoleForProjectMemberByUserID(ctx, db.GetRoleForProjectMemberByUserIDParams{UserID: input.UserID, ProjectID: input.ProjectID})
	if err != nil {
		return &CreateProjectMemberPayload{Ok: false}, err
	}
	return &CreateProjectMemberPayload{Ok: true, Member: &Member{
		ID:          input.UserID,
		FullName:    user.FullName,
		Username:    user.Username,
		ProfileIcon: profileIcon,
		Role:        &db.Role{Code: role.Code, Name: role.Name},
	}}, nil
}

func (r *mutationResolver) DeleteProjectMember(ctx context.Context, input DeleteProjectMember) (*DeleteProjectMemberPayload, error) {
	user, err := r.Repository.GetUserAccountByID(ctx, input.UserID)
	if err != nil {
		return &DeleteProjectMemberPayload{Ok: false}, err
	}
	var url *string
	if user.ProfileAvatarUrl.Valid {
		url = &user.ProfileAvatarUrl.String
	}
	profileIcon := &ProfileIcon{url, &user.Initials, &user.ProfileBgColor}
	role, err := r.Repository.GetRoleForProjectMemberByUserID(ctx, db.GetRoleForProjectMemberByUserIDParams{UserID: input.UserID, ProjectID: input.ProjectID})
	if err != nil {
		return &DeleteProjectMemberPayload{Ok: false}, err
	}
	err = r.Repository.DeleteProjectMember(ctx, db.DeleteProjectMemberParams{UserID: input.UserID, ProjectID: input.ProjectID})
	if err != nil {
		return &DeleteProjectMemberPayload{Ok: false}, err
	}
	return &DeleteProjectMemberPayload{Ok: true, Member: &Member{
		ID:          input.UserID,
		FullName:    user.FullName,
		ProfileIcon: profileIcon,
		Role:        &db.Role{Code: role.Code, Name: role.Name},
	}, ProjectID: input.ProjectID}, nil
}

func (r *mutationResolver) UpdateProjectMemberRole(ctx context.Context, input UpdateProjectMemberRole) (*UpdateProjectMemberRolePayload, error) {
	if input.RoleCode == RoleCodeOwner {
		return &UpdateProjectMemberRolePayload{Ok: false}, errors.New("can not set project owner through this mutation")
	}
	user, err := r.Repository.GetUserAccountByID(ctx, input.UserID)
	if err != nil {
		log.WithError(err).Error("get user account")
		return &UpdateProjectMemberRolePayload{Ok: false}, err
	}
	_, err = r.Repository.UpdateProjectMemberRole(ctx, db.UpdateProjectMemberRoleParams{ProjectID: input.ProjectID,
		UserID: input.UserID, RoleCode: input.RoleCode.String()})
	if err != nil {
		log.WithError(err).Error("update project member role")
		return &UpdateProjectMemberRolePayload{Ok: false}, err
	}
	role, err := r.Repository.GetRoleForProjectMemberByUserID(ctx, db.GetRoleForProjectMemberByUserIDParams{UserID: user.UserID, ProjectID: input.ProjectID})
	if err != nil {
		log.WithError(err).Error("get role for project member")
		return &UpdateProjectMemberRolePayload{Ok: false}, err
	}
	var url *string
	if user.ProfileAvatarUrl.Valid {
		url = &user.ProfileAvatarUrl.String
	}
	profileIcon := &ProfileIcon{url, &user.Initials, &user.ProfileBgColor}
	if user.ProfileAvatarUrl.Valid {
		url = &user.ProfileAvatarUrl.String
	}
	member := Member{ID: user.UserID, FullName: user.FullName, ProfileIcon: profileIcon,
		Role: &db.Role{Code: role.Code, Name: role.Name},
	}
	return &UpdateProjectMemberRolePayload{Ok: true, Member: &member}, err
}

func (r *mutationResolver) SetProjectOwner(ctx context.Context, input SetProjectOwner) (*SetProjectOwnerPayload, error) {
	project, err := r.Repository.GetProjectByID(ctx, input.ProjectID)
	if project.Owner == input.OwnerID {
		return &SetProjectOwnerPayload{Ok: false}, errors.New("new project owner is already project owner")
	}
	_, err = r.Repository.SetProjectOwner(ctx, db.SetProjectOwnerParams{Owner: input.OwnerID, ProjectID: input.ProjectID})
	if err != nil {
		return &SetProjectOwnerPayload{Ok: false}, err
	}
	err = r.Repository.DeleteProjectMember(ctx, db.DeleteProjectMemberParams{ProjectID: input.ProjectID, UserID: input.OwnerID})
	if err != nil {
		return &SetProjectOwnerPayload{Ok: false}, err
	}

	addedAt := time.Now().UTC()
	_, err = r.Repository.CreateProjectMember(ctx, db.CreateProjectMemberParams{ProjectID: input.ProjectID,
		UserID: project.Owner, RoleCode: RoleCodeAdmin.String(), AddedAt: addedAt})
	if err != nil {
		return &SetProjectOwnerPayload{Ok: false}, err
	}

	oldUser, err := r.Repository.GetUserAccountByID(ctx, project.Owner)
	var url *string
	if oldUser.ProfileAvatarUrl.Valid {
		url = &oldUser.ProfileAvatarUrl.String
	}
	profileIcon := &ProfileIcon{url, &oldUser.Initials, &oldUser.ProfileBgColor}
	oldUserRole := db.Role{Code: "admin", Name: "Admin"}
	oldMember := &Member{
		ID:          oldUser.UserID,
		Username:    oldUser.Username,
		FullName:    oldUser.FullName,
		ProfileIcon: profileIcon,
		Role:        &oldUserRole,
	}

	newUser, err := r.Repository.GetUserAccountByID(ctx, input.OwnerID)

	if newUser.ProfileAvatarUrl.Valid {
		url = &newUser.ProfileAvatarUrl.String
	}
	profileIcon = &ProfileIcon{url, &newUser.Initials, &newUser.ProfileBgColor}
	newUserRole := db.Role{Code: "owner", Name: "Owner"}
	newMember := &Member{
		ID:          newUser.UserID,
		Username:    newUser.Username,
		FullName:    newUser.FullName,
		ProfileIcon: profileIcon,
		Role:        &newUserRole,
	}

	return &SetProjectOwnerPayload{
		Ok:        true,
		PrevOwner: oldMember,
		NewOwner:  newMember,
	}, nil
}

func (r *mutationResolver) CreateTask(ctx context.Context, input NewTask) (*db.Task, error) {
	taskGroupID, err := uuid.Parse(input.TaskGroupID)
	createdAt := time.Now().UTC()
	if err != nil {
		return &db.Task{}, err
	}

	task, err := r.Repository.CreateTask(ctx, db.CreateTaskParams{taskGroupID, createdAt, input.Name, input.Position})
	return &task, err
}

func (r *mutationResolver) DeleteTask(ctx context.Context, input DeleteTaskInput) (*DeleteTaskPayload, error) {
	taskID, err := uuid.Parse(input.TaskID)
	if err != nil {
		return &DeleteTaskPayload{}, err
	}

	log.WithFields(log.Fields{
		"taskID": taskID.String(),
	}).Info("deleting task")
	err = r.Repository.DeleteTaskByID(ctx, taskID)
	if err != nil {
		return &DeleteTaskPayload{}, err
	}
	return &DeleteTaskPayload{taskID.String()}, nil
}

func (r *mutationResolver) UpdateTaskDescription(ctx context.Context, input UpdateTaskDescriptionInput) (*db.Task, error) {
	task, err := r.Repository.UpdateTaskDescription(ctx, db.UpdateTaskDescriptionParams{input.TaskID, sql.NullString{String: input.Description, Valid: true}})
	return &task, err
}

func (r *mutationResolver) UpdateTaskLocation(ctx context.Context, input NewTaskLocation) (*UpdateTaskLocationPayload, error) {
	previousTask, err := r.Repository.GetTaskByID(ctx, input.TaskID)
	if err != nil {
		return &UpdateTaskLocationPayload{}, err
	}
	task, err := r.Repository.UpdateTaskLocation(ctx, db.UpdateTaskLocationParams{input.TaskID, input.TaskGroupID, input.Position})

	return &UpdateTaskLocationPayload{Task: &task, PreviousTaskGroupID: previousTask.TaskGroupID}, err
}

func (r *mutationResolver) UpdateTaskName(ctx context.Context, input UpdateTaskName) (*db.Task, error) {
	taskID, err := uuid.Parse(input.TaskID)
	if err != nil {
		return &db.Task{}, err
	}
	task, err := r.Repository.UpdateTaskName(ctx, db.UpdateTaskNameParams{taskID, input.Name})
	return &task, err
}

func (r *mutationResolver) SetTaskComplete(ctx context.Context, input SetTaskComplete) (*db.Task, error) {
	task, err := r.Repository.SetTaskComplete(ctx, db.SetTaskCompleteParams{TaskID: input.TaskID, Complete: input.Complete})
	if err != nil {
		return &db.Task{}, err
	}
	return &task, nil
}

func (r *mutationResolver) UpdateTaskDueDate(ctx context.Context, input UpdateTaskDueDate) (*db.Task, error) {
	var dueDate sql.NullTime
	if input.DueDate == nil {
		dueDate = sql.NullTime{Valid: false, Time: time.Now()}
	} else {
		dueDate = sql.NullTime{Valid: true, Time: *input.DueDate}
	}
	task, err := r.Repository.UpdateTaskDueDate(ctx, db.UpdateTaskDueDateParams{
		TaskID:  input.TaskID,
		DueDate: dueDate,
	})

	return &task, err
}

func (r *mutationResolver) AssignTask(ctx context.Context, input *AssignTaskInput) (*db.Task, error) {
	assignedDate := time.Now().UTC()
	assignedTask, err := r.Repository.CreateTaskAssigned(ctx, db.CreateTaskAssignedParams{input.TaskID, input.UserID, assignedDate})
	log.WithFields(log.Fields{
		"userID":         assignedTask.UserID,
		"taskID":         assignedTask.TaskID,
		"assignedTaskID": assignedTask.TaskAssignedID,
	}).Info("assigned task")
	if err != nil {
		return &db.Task{}, err
	}
	task, err := r.Repository.GetTaskByID(ctx, input.TaskID)
	return &task, err
}

func (r *mutationResolver) UnassignTask(ctx context.Context, input *UnassignTaskInput) (*db.Task, error) {
	task, err := r.Repository.GetTaskByID(ctx, input.TaskID)
	if err != nil {
		return &db.Task{}, err
	}
	_, err = r.Repository.DeleteTaskAssignedByID(ctx, db.DeleteTaskAssignedByIDParams{input.TaskID, input.UserID})
	if err != nil {
		return &db.Task{}, err
	}
	return &task, nil
}

func (r *mutationResolver) CreateTaskChecklist(ctx context.Context, input CreateTaskChecklist) (*db.TaskChecklist, error) {
	createdAt := time.Now().UTC()
	taskChecklist, err := r.Repository.CreateTaskChecklist(ctx, db.CreateTaskChecklistParams{
		TaskID:    input.TaskID,
		CreatedAt: createdAt,
		Name:      input.Name,
		Position:  input.Position,
	})
	if err != nil {
		return &db.TaskChecklist{}, err
	}

	return &taskChecklist, nil
}

func (r *mutationResolver) DeleteTaskChecklist(ctx context.Context, input DeleteTaskChecklist) (*DeleteTaskChecklistPayload, error) {
	taskChecklist, err := r.Repository.GetTaskChecklistByID(ctx, input.TaskChecklistID)
	if err != nil {
		return &DeleteTaskChecklistPayload{Ok: false}, err
	}
	err = r.Repository.DeleteTaskChecklistByID(ctx, input.TaskChecklistID)
	if err != nil {
		return &DeleteTaskChecklistPayload{Ok: false}, err
	}
	return &DeleteTaskChecklistPayload{Ok: true, TaskChecklist: &taskChecklist}, nil
}

func (r *mutationResolver) UpdateTaskChecklistName(ctx context.Context, input UpdateTaskChecklistName) (*db.TaskChecklist, error) {
	checklist, err := r.Repository.UpdateTaskChecklistName(ctx, db.UpdateTaskChecklistNameParams{TaskChecklistID: input.TaskChecklistID, Name: input.Name})
	if err != nil {
		return &db.TaskChecklist{}, err
	}
	return &checklist, nil
}

func (r *mutationResolver) CreateTaskChecklistItem(ctx context.Context, input CreateTaskChecklistItem) (*db.TaskChecklistItem, error) {
	createdAt := time.Now().UTC()
	taskChecklistItem, err := r.Repository.CreateTaskChecklistItem(ctx, db.CreateTaskChecklistItemParams{
		TaskChecklistID: input.TaskChecklistID,
		CreatedAt:       createdAt,
		Name:            input.Name,
		Position:        input.Position,
	})
	if err != nil {
		return &db.TaskChecklistItem{}, err
	}

	return &taskChecklistItem, nil
}

func (r *mutationResolver) UpdateTaskChecklistItemName(ctx context.Context, input UpdateTaskChecklistItemName) (*db.TaskChecklistItem, error) {
	task, err := r.Repository.UpdateTaskChecklistItemName(ctx, db.UpdateTaskChecklistItemNameParams{TaskChecklistItemID: input.TaskChecklistItemID,
		Name: input.Name,
	})
	if err != nil {
		return &db.TaskChecklistItem{}, err
	}
	return &task, nil
}

func (r *mutationResolver) SetTaskChecklistItemComplete(ctx context.Context, input SetTaskChecklistItemComplete) (*db.TaskChecklistItem, error) {
	item, err := r.Repository.SetTaskChecklistItemComplete(ctx, db.SetTaskChecklistItemCompleteParams{TaskChecklistItemID: input.TaskChecklistItemID, Complete: input.Complete})
	if err != nil {
		return &db.TaskChecklistItem{}, err
	}
	return &item, nil
}

func (r *mutationResolver) DeleteTaskChecklistItem(ctx context.Context, input DeleteTaskChecklistItem) (*DeleteTaskChecklistItemPayload, error) {
	item, err := r.Repository.GetTaskChecklistItemByID(ctx, input.TaskChecklistItemID)
	if err != nil {
		return &DeleteTaskChecklistItemPayload{
			Ok:                false,
			TaskChecklistItem: &db.TaskChecklistItem{},
		}, err
	}
	err = r.Repository.DeleteTaskChecklistItem(ctx, input.TaskChecklistItemID)
	if err != nil {
		return &DeleteTaskChecklistItemPayload{
			Ok:                false,
			TaskChecklistItem: &db.TaskChecklistItem{},
		}, err
	}
	return &DeleteTaskChecklistItemPayload{
		Ok:                true,
		TaskChecklistItem: &item,
	}, err
}

func (r *mutationResolver) UpdateTaskChecklistLocation(ctx context.Context, input UpdateTaskChecklistLocation) (*UpdateTaskChecklistLocationPayload, error) {
	checklist, err := r.Repository.UpdateTaskChecklistPosition(ctx, db.UpdateTaskChecklistPositionParams{Position: input.Position, TaskChecklistID: input.ChecklistID})

	if err != nil {
		return &UpdateTaskChecklistLocationPayload{}, err
	}

	return &UpdateTaskChecklistLocationPayload{Checklist: &checklist}, nil
}

func (r *mutationResolver) UpdateTaskChecklistItemLocation(ctx context.Context, input UpdateTaskChecklistItemLocation) (*UpdateTaskChecklistItemLocationPayload, error) {
	currentChecklistItem, err := r.Repository.GetTaskChecklistItemByID(ctx, input.ChecklistItemID)

	checklistItem, err := r.Repository.UpdateTaskChecklistItemLocation(ctx, db.UpdateTaskChecklistItemLocationParams{TaskChecklistID: input.ChecklistID, TaskChecklistItemID: input.ChecklistItemID, Position: input.Position})
	if err != nil {
		return &UpdateTaskChecklistItemLocationPayload{}, err
	}
	return &UpdateTaskChecklistItemLocationPayload{PrevChecklistID: currentChecklistItem.TaskChecklistID, ChecklistID: input.ChecklistID, ChecklistItem: &checklistItem}, err
}

func (r *mutationResolver) CreateTaskGroup(ctx context.Context, input NewTaskGroup) (*db.TaskGroup, error) {
	createdAt := time.Now().UTC()
	projectID, err := uuid.Parse(input.ProjectID)
	if err != nil {
		return &db.TaskGroup{}, err
	}
	project, err := r.Repository.CreateTaskGroup(ctx,
		db.CreateTaskGroupParams{projectID, createdAt, input.Name, input.Position})
	return &project, err
}

func (r *mutationResolver) UpdateTaskGroupLocation(ctx context.Context, input NewTaskGroupLocation) (*db.TaskGroup, error) {
	taskGroup, err := r.Repository.UpdateTaskGroupLocation(ctx, db.UpdateTaskGroupLocationParams{
		input.TaskGroupID,
		input.Position,
	})
	return &taskGroup, err
}

func (r *mutationResolver) UpdateTaskGroupName(ctx context.Context, input UpdateTaskGroupName) (*db.TaskGroup, error) {
	taskGroup, err := r.Repository.SetTaskGroupName(ctx, db.SetTaskGroupNameParams{TaskGroupID: input.TaskGroupID, Name: input.Name})
	if err != nil {
		return &db.TaskGroup{}, err
	}
	return &taskGroup, nil
}

func (r *mutationResolver) DeleteTaskGroup(ctx context.Context, input DeleteTaskGroupInput) (*DeleteTaskGroupPayload, error) {
	deletedTasks, err := r.Repository.DeleteTasksByTaskGroupID(ctx, input.TaskGroupID)
	if err != nil {
		return &DeleteTaskGroupPayload{}, err
	}
	taskGroup, err := r.Repository.GetTaskGroupByID(ctx, input.TaskGroupID)
	if err != nil {
		return &DeleteTaskGroupPayload{}, err
	}
	deletedTaskGroups, err := r.Repository.DeleteTaskGroupByID(ctx, input.TaskGroupID)
	if err != nil {
		return &DeleteTaskGroupPayload{}, err
	}
	return &DeleteTaskGroupPayload{true, int(deletedTasks + deletedTaskGroups), &taskGroup}, nil
}

func (r *mutationResolver) AddTaskLabel(ctx context.Context, input *AddTaskLabelInput) (*db.Task, error) {
	assignedDate := time.Now().UTC()
	_, err := r.Repository.CreateTaskLabelForTask(ctx, db.CreateTaskLabelForTaskParams{input.TaskID, input.ProjectLabelID, assignedDate})
	if err != nil {
		return &db.Task{}, err
	}
	task, err := r.Repository.GetTaskByID(ctx, input.TaskID)
	return &task, nil
}

func (r *mutationResolver) RemoveTaskLabel(ctx context.Context, input *RemoveTaskLabelInput) (*db.Task, error) {
	taskLabel, err := r.Repository.GetTaskLabelByID(ctx, input.TaskLabelID)
	if err != nil {
		return &db.Task{}, err
	}
	task, err := r.Repository.GetTaskByID(ctx, taskLabel.TaskID)
	if err != nil {
		return &db.Task{}, err
	}
	err = r.Repository.DeleteTaskLabelByID(ctx, input.TaskLabelID)
	return &task, err
}

func (r *mutationResolver) ToggleTaskLabel(ctx context.Context, input ToggleTaskLabelInput) (*ToggleTaskLabelPayload, error) {
	task, err := r.Repository.GetTaskByID(ctx, input.TaskID)
	if err != nil {
		return &ToggleTaskLabelPayload{}, err
	}

	_, err = r.Repository.GetTaskLabelForTaskByProjectLabelID(ctx, db.GetTaskLabelForTaskByProjectLabelIDParams{TaskID: input.TaskID, ProjectLabelID: input.ProjectLabelID})
	createdAt := time.Now().UTC()

	if err == sql.ErrNoRows {
		log.WithFields(log.Fields{"err": err}).Warning("no rows")
		_, err := r.Repository.CreateTaskLabelForTask(ctx, db.CreateTaskLabelForTaskParams{
			TaskID:         input.TaskID,
			ProjectLabelID: input.ProjectLabelID,
			AssignedDate:   createdAt,
		})
		if err != nil {
			return &ToggleTaskLabelPayload{}, err
		}
		payload := ToggleTaskLabelPayload{Active: true, Task: &task}
		return &payload, nil
	}

	if err != nil {
		return &ToggleTaskLabelPayload{}, err
	}

	err = r.Repository.DeleteTaskLabelForTaskByProjectLabelID(ctx, db.DeleteTaskLabelForTaskByProjectLabelIDParams{
		TaskID:         input.TaskID,
		ProjectLabelID: input.ProjectLabelID,
	})

	if err != nil {
		return &ToggleTaskLabelPayload{}, err
	}

	payload := ToggleTaskLabelPayload{Active: false, Task: &task}
	return &payload, nil
}

func (r *mutationResolver) DeleteTeam(ctx context.Context, input DeleteTeam) (*DeleteTeamPayload, error) {
	team, err := r.Repository.GetTeamByID(ctx, input.TeamID)
	if err != nil {
		log.Error(err)
		return &DeleteTeamPayload{Ok: false}, err
	}
	projects, err := r.Repository.GetAllProjectsForTeam(ctx, input.TeamID)
	if err != nil {
		log.Error(err)
		return &DeleteTeamPayload{Ok: false}, err
	}
	err = r.Repository.DeleteTeamByID(ctx, input.TeamID)
	if err != nil {
		log.Error(err)
		return &DeleteTeamPayload{Ok: false}, err
	}

	return &DeleteTeamPayload{Ok: true, Team: &team, Projects: projects}, nil
}

func (r *mutationResolver) CreateTeam(ctx context.Context, input NewTeam) (*db.Team, error) {
	userID, ok := GetUserID(ctx)
	if !ok {
		return &db.Team{}, fmt.Errorf("internal server error")
	}
	createdAt := time.Now().UTC()
	team, err := r.Repository.CreateTeam(ctx, db.CreateTeamParams{OrganizationID: input.OrganizationID, CreatedAt: createdAt, Name: input.Name, Owner: userID})
	return &team, err
}

func (r *mutationResolver) SetTeamOwner(ctx context.Context, input SetTeamOwner) (*SetTeamOwnerPayload, error) {
	team, err := r.Repository.GetTeamByID(ctx, input.TeamID)
	if team.Owner == input.UserID {
		return &SetTeamOwnerPayload{Ok: false}, errors.New("new project owner is already project owner")
	}
	_, err = r.Repository.SetTeamOwner(ctx, db.SetTeamOwnerParams{Owner: input.UserID, TeamID: input.TeamID})
	if err != nil {
		return &SetTeamOwnerPayload{Ok: false}, errors.New("new project owner is already project owner")
	}
	err = r.Repository.DeleteTeamMember(ctx, db.DeleteTeamMemberParams{TeamID: input.TeamID, UserID: input.UserID})
	if err != nil {
		return &SetTeamOwnerPayload{Ok: false}, errors.New("new project owner is already project owner")
	}

	addedAt := time.Now().UTC()
	_, err = r.Repository.CreateTeamMember(ctx, db.CreateTeamMemberParams{TeamID: input.TeamID,
		UserID: team.Owner, RoleCode: RoleCodeAdmin.String(), Addeddate: addedAt})
	if err != nil {
		return &SetTeamOwnerPayload{Ok: false}, errors.New("new project owner is already project owner")
	}

	oldUser, err := r.Repository.GetUserAccountByID(ctx, team.Owner)
	var url *string
	if oldUser.ProfileAvatarUrl.Valid {
		url = &oldUser.ProfileAvatarUrl.String
	}
	profileIcon := &ProfileIcon{url, &oldUser.Initials, &oldUser.ProfileBgColor}
	oldUserRole := db.Role{Code: "admin", Name: "Admin"}
	oldMember := &Member{
		ID:          oldUser.UserID,
		Username:    oldUser.Username,
		FullName:    oldUser.FullName,
		ProfileIcon: profileIcon,
		Role:        &oldUserRole,
	}

	newUser, err := r.Repository.GetUserAccountByID(ctx, input.UserID)

	if newUser.ProfileAvatarUrl.Valid {
		url = &newUser.ProfileAvatarUrl.String
	}
	profileIcon = &ProfileIcon{url, &newUser.Initials, &newUser.ProfileBgColor}
	newUserRole := db.Role{Code: "owner", Name: "Owner"}
	newMember := &Member{
		ID:          newUser.UserID,
		Username:    newUser.Username,
		FullName:    newUser.FullName,
		ProfileIcon: profileIcon,
		Role:        &newUserRole,
	}

	return &SetTeamOwnerPayload{
		Ok:        true,
		PrevOwner: oldMember,
		NewOwner:  newMember,
	}, nil
}

func (r *mutationResolver) CreateTeamMember(ctx context.Context, input CreateTeamMember) (*CreateTeamMemberPayload, error) {
	addedDate := time.Now().UTC()
	team, err := r.Repository.GetTeamByID(ctx, input.TeamID)
	if err != nil {
		return &CreateTeamMemberPayload{}, err
	}
	_, err = r.Repository.CreateTeamMember(ctx, db.CreateTeamMemberParams{TeamID: input.TeamID, UserID: input.UserID, Addeddate: addedDate, RoleCode: RoleCodeMember.String()})
	user, err := r.Repository.GetUserAccountByID(ctx, input.UserID)
	if err != nil {
		return &CreateTeamMemberPayload{}, err
	}
	var url *string
	if user.ProfileAvatarUrl.Valid {
		url = &user.ProfileAvatarUrl.String
	}
	profileIcon := &ProfileIcon{url, &user.Initials, &user.ProfileBgColor}
	return &CreateTeamMemberPayload{
		Team: &team,
		TeamMember: &Member{
			ID:          user.UserID,
			Username:    user.Username,
			FullName:    user.FullName,
			ProfileIcon: profileIcon,
			Role:        &db.Role{Code: "member", Name: "Member"},
		}}, nil
}

func (r *mutationResolver) UpdateTeamMemberRole(ctx context.Context, input UpdateTeamMemberRole) (*UpdateTeamMemberRolePayload, error) {
	if input.RoleCode == RoleCodeOwner || input.RoleCode == RoleCodeObserver {
		return &UpdateTeamMemberRolePayload{Ok: false}, errors.New("can not set project owner through this mutation")
	}
	user, err := r.Repository.GetUserAccountByID(ctx, input.UserID)
	if err != nil {
		log.WithError(err).Error("get user account")
		return &UpdateTeamMemberRolePayload{Ok: false}, err
	}
	_, err = r.Repository.UpdateTeamMemberRole(ctx, db.UpdateTeamMemberRoleParams{TeamID: input.TeamID,
		UserID: input.UserID, RoleCode: input.RoleCode.String()})
	if err != nil {
		log.WithError(err).Error("update project member role")
		return &UpdateTeamMemberRolePayload{Ok: false}, err
	}
	role, err := r.Repository.GetRoleForTeamMember(ctx, db.GetRoleForTeamMemberParams{UserID: user.UserID, TeamID: input.TeamID})
	if err != nil {
		log.WithError(err).Error("get role for project member")
		return &UpdateTeamMemberRolePayload{Ok: false}, err
	}
	var url *string
	if user.ProfileAvatarUrl.Valid {
		url = &user.ProfileAvatarUrl.String
	}
	profileIcon := &ProfileIcon{url, &user.Initials, &user.ProfileBgColor}
	if user.ProfileAvatarUrl.Valid {
		url = &user.ProfileAvatarUrl.String
	}
	member := Member{ID: user.UserID, FullName: user.FullName, ProfileIcon: profileIcon,
		Role: &db.Role{Code: role.Code, Name: role.Name},
	}
	return &UpdateTeamMemberRolePayload{Ok: true, Member: &member}, err
}

func (r *mutationResolver) DeleteTeamMember(ctx context.Context, input DeleteTeamMember) (*DeleteTeamMemberPayload, error) {
	ownedProjects, err := r.Repository.GetOwnedTeamProjectsForUserID(ctx, db.GetOwnedTeamProjectsForUserIDParams{TeamID: input.TeamID, Owner: input.UserID})
	if err != nil {
		return &DeleteTeamMemberPayload{}, err
	}

	_, err = r.Repository.GetTeamMemberByID(ctx, db.GetTeamMemberByIDParams{TeamID: input.TeamID, UserID: input.UserID})
	if err != nil {
		return &DeleteTeamMemberPayload{}, err
	}
	err = r.Repository.DeleteTeamMember(ctx, db.DeleteTeamMemberParams{TeamID: input.TeamID, UserID: input.UserID})
	if err != nil {
		return &DeleteTeamMemberPayload{}, err
	}
	if input.NewOwnerID != nil {
		for _, projectID := range ownedProjects {
			_, err = r.Repository.SetProjectOwner(ctx, db.SetProjectOwnerParams{ProjectID: projectID, Owner: *input.NewOwnerID})
		}
	}
	return &DeleteTeamMemberPayload{TeamID: input.TeamID, UserID: input.UserID}, nil
}

func (r *mutationResolver) CreateRefreshToken(ctx context.Context, input NewRefreshToken) (*db.RefreshToken, error) {
	userID := uuid.MustParse("0183d9ab-d0ed-4c9b-a3df-77a0cdd93dca")
	refreshCreatedAt := time.Now().UTC()
	refreshExpiresAt := refreshCreatedAt.AddDate(0, 0, 1)
	refreshToken, err := r.Repository.CreateRefreshToken(ctx, db.CreateRefreshTokenParams{userID, refreshCreatedAt, refreshExpiresAt})
	return &refreshToken, err
}

func (r *mutationResolver) CreateUserAccount(ctx context.Context, input NewUserAccount) (*db.UserAccount, error) {
	createdAt := time.Now().UTC()
	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(input.Password), 14)
	if err != nil {
		return &db.UserAccount{}, err
	}
	userAccount, err := r.Repository.CreateUserAccount(ctx, db.CreateUserAccountParams{
		FullName:     input.FullName,
		RoleCode:     input.RoleCode,
		Initials:     input.Initials,
		Email:        input.Email,
		Username:     input.Username,
		CreatedAt:    createdAt,
		PasswordHash: string(hashedPwd),
	})
	return &userAccount, err
}

func (r *mutationResolver) DeleteUserAccount(ctx context.Context, input DeleteUserAccount) (*DeleteUserAccountPayload, error) {
	user, err := r.Repository.GetUserAccountByID(ctx, input.UserID)
	if err != nil {
		return &DeleteUserAccountPayload{Ok: false}, err
	}

	err = r.Repository.DeleteUserAccountByID(ctx, input.UserID)
	if err != nil {
		return &DeleteUserAccountPayload{Ok: false}, err
	}
	return &DeleteUserAccountPayload{UserAccount: &user, Ok: true}, nil
}

func (r *mutationResolver) LogoutUser(ctx context.Context, input LogoutUser) (bool, error) {
	userID, err := uuid.Parse(input.UserID)
	if err != nil {
		return false, err
	}

	err = r.Repository.DeleteRefreshTokenByUserID(ctx, userID)
	return true, err
}

func (r *mutationResolver) ClearProfileAvatar(ctx context.Context) (*db.UserAccount, error) {
	userID, ok := GetUserID(ctx)
	if !ok {
		return &db.UserAccount{}, fmt.Errorf("internal server error")
	}
	user, err := r.Repository.UpdateUserAccountProfileAvatarURL(ctx, db.UpdateUserAccountProfileAvatarURLParams{UserID: userID, ProfileAvatarUrl: sql.NullString{Valid: false, String: ""}})
	if err != nil {
		return &db.UserAccount{}, err
	}
	return &user, nil
}

func (r *mutationResolver) UpdateUserPassword(ctx context.Context, input UpdateUserPassword) (*UpdateUserPasswordPayload, error) {
	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(input.Password), 14)
	if err != nil {
		return &UpdateUserPasswordPayload{}, err
	}
	user, err := r.Repository.SetUserPassword(ctx, db.SetUserPasswordParams{UserID: input.UserID, PasswordHash: string(hashedPwd)})
	if err != nil {
		return &UpdateUserPasswordPayload{}, err
	}
	return &UpdateUserPasswordPayload{Ok: true, User: &user}, err
}

func (r *mutationResolver) UpdateUserRole(ctx context.Context, input UpdateUserRole) (*UpdateUserRolePayload, error) {
	user, err := r.Repository.UpdateUserRole(ctx, db.UpdateUserRoleParams{RoleCode: input.RoleCode.String(), UserID: input.UserID})
	if err != nil {
		return &UpdateUserRolePayload{}, err
	}
	return &UpdateUserRolePayload{User: &user}, nil
}

func (r *organizationResolver) ID(ctx context.Context, obj *db.Organization) (uuid.UUID, error) {
	return obj.OrganizationID, nil
}

func (r *projectResolver) ID(ctx context.Context, obj *db.Project) (uuid.UUID, error) {
	return obj.ProjectID, nil
}

func (r *projectResolver) Team(ctx context.Context, obj *db.Project) (*db.Team, error) {
	team, err := r.Repository.GetTeamByID(ctx, obj.TeamID)
	return &team, err
}

func (r *projectResolver) Owner(ctx context.Context, obj *db.Project) (*Member, error) {
	user, err := r.Repository.GetUserAccountByID(ctx, obj.Owner)
	if err != nil {
		return &Member{}, err
	}
	var url *string
	if user.ProfileAvatarUrl.Valid {
		url = &user.ProfileAvatarUrl.String
	}
	profileIcon := &ProfileIcon{url, &user.Initials, &user.ProfileBgColor}
	role, err := r.Repository.GetRoleForProjectMemberByUserID(ctx, db.GetRoleForProjectMemberByUserIDParams{UserID: user.UserID, ProjectID: obj.ProjectID})
	if user.ProfileAvatarUrl.Valid {
		url = &user.ProfileAvatarUrl.String
	}
	return &Member{ID: obj.Owner, FullName: user.FullName, ProfileIcon: profileIcon,
		Role: &db.Role{Code: role.Code, Name: role.Name},
	}, nil
}

func (r *projectResolver) TaskGroups(ctx context.Context, obj *db.Project) ([]db.TaskGroup, error) {
	return r.Repository.GetTaskGroupsForProject(ctx, obj.ProjectID)
}

func (r *projectResolver) Members(ctx context.Context, obj *db.Project) ([]Member, error) {
	user, err := r.Repository.GetUserAccountByID(ctx, obj.Owner)
	members := []Member{}
	if err == sql.ErrNoRows {
		return members, nil
	}
	if err != nil {
		log.WithError(err).Error("get user account by ID")
		return members, err
	}
	var url *string
	if user.ProfileAvatarUrl.Valid {
		url = &user.ProfileAvatarUrl.String
	}
	profileIcon := &ProfileIcon{url, &user.Initials, &user.ProfileBgColor}
	members = append(members, Member{
		ID: obj.Owner, FullName: user.FullName, ProfileIcon: profileIcon, Username: user.Username,
		Role: &db.Role{Code: "owner", Name: "Owner"},
	})
	projectMembers, err := r.Repository.GetProjectMembersForProjectID(ctx, obj.ProjectID)
	if err != nil {
		log.WithError(err).Error("get project members for project id")
		return members, err
	}

	for _, projectMember := range projectMembers {
		user, err = r.Repository.GetUserAccountByID(ctx, projectMember.UserID)
		if err != nil {
			log.WithError(err).Error("get user account by ID")
			return members, err
		}
		var url *string
		if user.ProfileAvatarUrl.Valid {
			url = &user.ProfileAvatarUrl.String
		}
		role, err := r.Repository.GetRoleForProjectMemberByUserID(ctx, db.GetRoleForProjectMemberByUserIDParams{UserID: user.UserID, ProjectID: obj.ProjectID})
		if err != nil {
			log.WithError(err).Error("get role for projet member by user ID")
			return members, err
		}
		profileIcon := &ProfileIcon{url, &user.Initials, &user.ProfileBgColor}
		members = append(members, Member{ID: user.UserID, FullName: user.FullName, ProfileIcon: profileIcon,
			Username: user.Username, Role: &db.Role{Code: role.Code, Name: role.Name},
		})
	}
	return members, nil
}

func (r *projectResolver) Labels(ctx context.Context, obj *db.Project) ([]db.ProjectLabel, error) {
	labels, err := r.Repository.GetProjectLabelsForProject(ctx, obj.ProjectID)
	return labels, err
}

func (r *projectLabelResolver) ID(ctx context.Context, obj *db.ProjectLabel) (uuid.UUID, error) {
	return obj.ProjectLabelID, nil
}

func (r *projectLabelResolver) LabelColor(ctx context.Context, obj *db.ProjectLabel) (*db.LabelColor, error) {
	labelColor, err := r.Repository.GetLabelColorByID(ctx, obj.LabelColorID)
	if err != nil {
		return &db.LabelColor{}, err
	}
	return &labelColor, nil
}

func (r *projectLabelResolver) Name(ctx context.Context, obj *db.ProjectLabel) (*string, error) {
	var name *string
	if obj.Name.Valid {
		name = &obj.Name.String
	}
	return name, nil
}

func (r *queryResolver) Organizations(ctx context.Context) ([]db.Organization, error) {
	return r.Repository.GetAllOrganizations(ctx)
}

func (r *queryResolver) Users(ctx context.Context) ([]db.UserAccount, error) {
	return r.Repository.GetAllUserAccounts(ctx)
}

func (r *queryResolver) FindUser(ctx context.Context, input FindUser) (*db.UserAccount, error) {
	userId, err := uuid.Parse(input.UserID)
	if err != nil {
		return &db.UserAccount{}, err
	}
	account, err := r.Repository.GetUserAccountByID(ctx, userId)
	if err == sql.ErrNoRows {
		return &db.UserAccount{}, &gqlerror.Error{
			Message: "User not found",
			Extensions: map[string]interface{}{
				"code": "10-404",
			},
		}
	}
	return &account, err
}

func (r *queryResolver) FindProject(ctx context.Context, input FindProject) (*db.Project, error) {
	projectID, err := uuid.Parse(input.ProjectID)
	if err != nil {
		return &db.Project{}, err
	}
	project, err := r.Repository.GetProjectByID(ctx, projectID)
	if err == sql.ErrNoRows {
		return &db.Project{}, &gqlerror.Error{
			Message: "Project not found",
			Extensions: map[string]interface{}{
				"code": "11-404",
			},
		}
	}
	return &project, err
}

func (r *queryResolver) FindTask(ctx context.Context, input FindTask) (*db.Task, error) {
	task, err := r.Repository.GetTaskByID(ctx, input.TaskID)
	return &task, err
}

func (r *queryResolver) Projects(ctx context.Context, input *ProjectsFilter) ([]db.Project, error) {
	if input != nil {
		return r.Repository.GetAllProjectsForTeam(ctx, *input.TeamID)
	}
	return r.Repository.GetAllProjects(ctx)
}

func (r *queryResolver) FindTeam(ctx context.Context, input FindTeam) (*db.Team, error) {
	team, err := r.Repository.GetTeamByID(ctx, input.TeamID)
	if err != nil {
		return &db.Team{}, err
	}
	return &team, nil
}

func (r *queryResolver) Teams(ctx context.Context) ([]db.Team, error) {
	return r.Repository.GetAllTeams(ctx)
}

func (r *queryResolver) LabelColors(ctx context.Context) ([]db.LabelColor, error) {
	return r.Repository.GetLabelColors(ctx)
}

func (r *queryResolver) TaskGroups(ctx context.Context) ([]db.TaskGroup, error) {
	return r.Repository.GetAllTaskGroups(ctx)
}

func (r *queryResolver) Me(ctx context.Context) (*db.UserAccount, error) {
	userID, ok := GetUserID(ctx)
	if !ok {
		return &db.UserAccount{}, fmt.Errorf("internal server error")
	}
	user, err := r.Repository.GetUserAccountByID(ctx, userID)
	if err == sql.ErrNoRows {
		log.WithFields(log.Fields{"userID": userID}).Warning("can not find user for me query")
		return &db.UserAccount{}, nil
	} else if err != nil {
		return &db.UserAccount{}, err
	}
	return &user, err
}

func (r *refreshTokenResolver) ID(ctx context.Context, obj *db.RefreshToken) (uuid.UUID, error) {
	return obj.TokenID, nil
}

func (r *taskResolver) ID(ctx context.Context, obj *db.Task) (uuid.UUID, error) {
	return obj.TaskID, nil
}

func (r *taskResolver) TaskGroup(ctx context.Context, obj *db.Task) (*db.TaskGroup, error) {
	taskGroup, err := r.Repository.GetTaskGroupByID(ctx, obj.TaskGroupID)
	return &taskGroup, err
}

func (r *taskResolver) Description(ctx context.Context, obj *db.Task) (*string, error) {
	task, err := r.Repository.GetTaskByID(ctx, obj.TaskID)
	if err != nil {
		return nil, err
	}
	if !task.Description.Valid {
		return nil, nil
	}
	return &task.Description.String, nil
}

func (r *taskResolver) DueDate(ctx context.Context, obj *db.Task) (*time.Time, error) {
	if obj.DueDate.Valid {
		return &obj.DueDate.Time, nil
	}
	return nil, nil
}

func (r *taskResolver) Assigned(ctx context.Context, obj *db.Task) ([]Member, error) {
	taskMemberLinks, err := r.Repository.GetAssignedMembersForTask(ctx, obj.TaskID)
	taskMembers := []Member{}
	if err != nil {
		return taskMembers, err
	}
	for _, taskMemberLink := range taskMemberLinks {
		user, err := r.Repository.GetUserAccountByID(ctx, taskMemberLink.UserID)
		if err != nil {
			return taskMembers, err
		}
		var url *string
		if user.ProfileAvatarUrl.Valid {
			url = &user.ProfileAvatarUrl.String
		}
		profileIcon := &ProfileIcon{url, &user.Initials, &user.ProfileBgColor}
		projectID, err := r.Repository.GetProjectIDForTask(ctx, obj.TaskID)
		if err != nil {
			return taskMembers, err
		}
		role, err := r.Repository.GetRoleForProjectMemberByUserID(ctx, db.GetRoleForProjectMemberByUserIDParams{UserID: user.UserID, ProjectID: projectID})

		if err != nil {
			if err == sql.ErrNoRows {
				role = db.Role{Code: "owner", Name: "Owner"}
			} else {
				log.WithFields(log.Fields{"userID": user.UserID}).WithError(err).Error("get role for project member")
				return taskMembers, err
			}
		}
		taskMembers = append(taskMembers, Member{ID: taskMemberLink.UserID, FullName: user.FullName, ProfileIcon: profileIcon,
			Role: &role,
		})
	}
	return taskMembers, nil
}

func (r *taskResolver) Labels(ctx context.Context, obj *db.Task) ([]db.TaskLabel, error) {
	return r.Repository.GetTaskLabelsForTaskID(ctx, obj.TaskID)
}

func (r *taskResolver) Checklists(ctx context.Context, obj *db.Task) ([]db.TaskChecklist, error) {
	return r.Repository.GetTaskChecklistsForTask(ctx, obj.TaskID)
}

func (r *taskResolver) Badges(ctx context.Context, obj *db.Task) (*TaskBadges, error) {
	checklists, err := r.Repository.GetTaskChecklistsForTask(ctx, obj.TaskID)
	if err != nil {
		return &TaskBadges{}, err
	}
	if len(checklists) == 0 {
		return &TaskBadges{Checklist: nil}, err
	}
	complete := 0
	total := 0
	for _, checklist := range checklists {
		items, err := r.Repository.GetTaskChecklistItemsForTaskChecklist(ctx, checklist.TaskChecklistID)
		if err != nil {
			return &TaskBadges{}, err
		}
		for _, item := range items {
			total += 1
			if item.Complete {
				complete += 1
			}
		}
	}
	return &TaskBadges{Checklist: &ChecklistBadge{Total: total, Complete: complete}}, nil
}

func (r *taskChecklistResolver) ID(ctx context.Context, obj *db.TaskChecklist) (uuid.UUID, error) {
	return obj.TaskChecklistID, nil
}

func (r *taskChecklistResolver) Items(ctx context.Context, obj *db.TaskChecklist) ([]db.TaskChecklistItem, error) {
	return r.Repository.GetTaskChecklistItemsForTaskChecklist(ctx, obj.TaskChecklistID)
}

func (r *taskChecklistItemResolver) ID(ctx context.Context, obj *db.TaskChecklistItem) (uuid.UUID, error) {
	return obj.TaskChecklistItemID, nil
}

func (r *taskChecklistItemResolver) DueDate(ctx context.Context, obj *db.TaskChecklistItem) (*time.Time, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *taskGroupResolver) ID(ctx context.Context, obj *db.TaskGroup) (uuid.UUID, error) {
	return obj.TaskGroupID, nil
}

func (r *taskGroupResolver) ProjectID(ctx context.Context, obj *db.TaskGroup) (string, error) {
	return obj.ProjectID.String(), nil
}

func (r *taskGroupResolver) Tasks(ctx context.Context, obj *db.TaskGroup) ([]db.Task, error) {
	tasks, err := r.Repository.GetTasksForTaskGroupID(ctx, obj.TaskGroupID)
	return tasks, err
}

func (r *taskLabelResolver) ID(ctx context.Context, obj *db.TaskLabel) (uuid.UUID, error) {
	return obj.TaskLabelID, nil
}

func (r *taskLabelResolver) ProjectLabel(ctx context.Context, obj *db.TaskLabel) (*db.ProjectLabel, error) {
	projectLabel, err := r.Repository.GetProjectLabelByID(ctx, obj.ProjectLabelID)
	return &projectLabel, err
}

func (r *teamResolver) ID(ctx context.Context, obj *db.Team) (uuid.UUID, error) {
	return obj.TeamID, nil
}

func (r *teamResolver) Members(ctx context.Context, obj *db.Team) ([]Member, error) {
	user, err := r.Repository.GetUserAccountByID(ctx, obj.Owner)
	members := []Member{}
	log.WithFields(log.Fields{"teamID": obj.TeamID}).Info("getting members")
	if err == sql.ErrNoRows {
		return members, nil
	}
	if err != nil {
		log.WithError(err).Error("get user account by ID")
		return members, err
	}
	ownedList, err := GetOwnedList(ctx, r.Repository, user)
	if err != nil {
		return members, err
	}
	memberList, err := GetMemberList(ctx, r.Repository, user)
	if err != nil {
		return members, err
	}

	var url *string
	if user.ProfileAvatarUrl.Valid {
		url = &user.ProfileAvatarUrl.String
	}
	profileIcon := &ProfileIcon{url, &user.Initials, &user.ProfileBgColor}
	members = append(members, Member{
		ID: obj.Owner, FullName: user.FullName, ProfileIcon: profileIcon, Username: user.Username,
		Owned: ownedList, Member: memberList, Role: &db.Role{Code: "owner", Name: "Owner"},
	})
	teamMembers, err := r.Repository.GetTeamMembersForTeamID(ctx, obj.TeamID)
	if err != nil {
		log.WithError(err).Error("get project members for project id")
		return members, err
	}

	for _, teamMember := range teamMembers {
		user, err = r.Repository.GetUserAccountByID(ctx, teamMember.UserID)
		if err != nil {
			log.WithError(err).Error("get user account by ID")
			return members, err
		}
		var url *string
		if user.ProfileAvatarUrl.Valid {
			url = &user.ProfileAvatarUrl.String
		}
		role, err := r.Repository.GetRoleForTeamMember(ctx, db.GetRoleForTeamMemberParams{UserID: user.UserID, TeamID: obj.TeamID})
		if err != nil {
			log.WithError(err).Error("get role for projet member by user ID")
			return members, err
		}

		ownedList, err := GetOwnedList(ctx, r.Repository, user)
		if err != nil {
			return members, err
		}
		memberList, err := GetMemberList(ctx, r.Repository, user)
		if err != nil {
			return members, err
		}

		profileIcon := &ProfileIcon{url, &user.Initials, &user.ProfileBgColor}
		members = append(members, Member{ID: user.UserID, FullName: user.FullName, ProfileIcon: profileIcon,
			Username: user.Username, Owned: ownedList, Member: memberList, Role: &db.Role{Code: role.Code, Name: role.Name},
		})
	}
	return members, nil
}

func (r *userAccountResolver) ID(ctx context.Context, obj *db.UserAccount) (uuid.UUID, error) {
	return obj.UserID, nil
}

func (r *userAccountResolver) Role(ctx context.Context, obj *db.UserAccount) (*db.Role, error) {
	role, err := r.Repository.GetRoleForUserID(ctx, obj.UserID)
	if err != nil {
		log.Info("beep!")
		log.WithError(err).Error("get role for user id")
		return &db.Role{}, err
	}
	return &db.Role{Code: role.Code, Name: role.Name}, nil
}

func (r *userAccountResolver) ProfileIcon(ctx context.Context, obj *db.UserAccount) (*ProfileIcon, error) {
	var url *string
	if obj.ProfileAvatarUrl.Valid {
		url = &obj.ProfileAvatarUrl.String
	}
	profileIcon := &ProfileIcon{url, &obj.Initials, &obj.ProfileBgColor}
	return profileIcon, nil
}

func (r *userAccountResolver) Owned(ctx context.Context, obj *db.UserAccount) (*OwnedList, error) {
	ownedTeams, err := r.Repository.GetOwnedTeamsForUserID(ctx, obj.UserID)
	if err != sql.ErrNoRows && err != nil {
		return &OwnedList{}, err
	}
	ownedProjects, err := r.Repository.GetOwnedProjectsForUserID(ctx, obj.UserID)
	if err != sql.ErrNoRows && err != nil {
		return &OwnedList{}, err
	}
	return &OwnedList{Teams: ownedTeams, Projects: ownedProjects}, nil
}

func (r *userAccountResolver) Member(ctx context.Context, obj *db.UserAccount) (*MemberList, error) {
	projectMemberIDs, err := r.Repository.GetMemberProjectIDsForUserID(ctx, obj.UserID)
	if err != sql.ErrNoRows && err != nil {
		return &MemberList{}, err
	}
	var projects []db.Project
	for _, projectID := range projectMemberIDs {
		project, err := r.Repository.GetProjectByID(ctx, projectID)
		if err != nil {
			return &MemberList{}, err
		}
		projects = append(projects, project)
	}
	teamMemberIDs, err := r.Repository.GetMemberTeamIDsForUserID(ctx, obj.UserID)
	if err != sql.ErrNoRows && err != nil {
		return &MemberList{}, err
	}
	var teams []db.Team
	for _, teamID := range teamMemberIDs {
		team, err := r.Repository.GetTeamByID(ctx, teamID)
		if err != nil {
			return &MemberList{}, err
		}
		teams = append(teams, team)
	}

	return &MemberList{Teams: teams, Projects: projects}, err
}

// LabelColor returns LabelColorResolver implementation.
func (r *Resolver) LabelColor() LabelColorResolver { return &labelColorResolver{r} }

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Organization returns OrganizationResolver implementation.
func (r *Resolver) Organization() OrganizationResolver { return &organizationResolver{r} }

// Project returns ProjectResolver implementation.
func (r *Resolver) Project() ProjectResolver { return &projectResolver{r} }

// ProjectLabel returns ProjectLabelResolver implementation.
func (r *Resolver) ProjectLabel() ProjectLabelResolver { return &projectLabelResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

// RefreshToken returns RefreshTokenResolver implementation.
func (r *Resolver) RefreshToken() RefreshTokenResolver { return &refreshTokenResolver{r} }

// Task returns TaskResolver implementation.
func (r *Resolver) Task() TaskResolver { return &taskResolver{r} }

// TaskChecklist returns TaskChecklistResolver implementation.
func (r *Resolver) TaskChecklist() TaskChecklistResolver { return &taskChecklistResolver{r} }

// TaskChecklistItem returns TaskChecklistItemResolver implementation.
func (r *Resolver) TaskChecklistItem() TaskChecklistItemResolver {
	return &taskChecklistItemResolver{r}
}

// TaskGroup returns TaskGroupResolver implementation.
func (r *Resolver) TaskGroup() TaskGroupResolver { return &taskGroupResolver{r} }

// TaskLabel returns TaskLabelResolver implementation.
func (r *Resolver) TaskLabel() TaskLabelResolver { return &taskLabelResolver{r} }

// Team returns TeamResolver implementation.
func (r *Resolver) Team() TeamResolver { return &teamResolver{r} }

// UserAccount returns UserAccountResolver implementation.
func (r *Resolver) UserAccount() UserAccountResolver { return &userAccountResolver{r} }

type labelColorResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type organizationResolver struct{ *Resolver }
type projectResolver struct{ *Resolver }
type projectLabelResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type refreshTokenResolver struct{ *Resolver }
type taskResolver struct{ *Resolver }
type taskChecklistResolver struct{ *Resolver }
type taskChecklistItemResolver struct{ *Resolver }
type taskGroupResolver struct{ *Resolver }
type taskLabelResolver struct{ *Resolver }
type teamResolver struct{ *Resolver }
type userAccountResolver struct{ *Resolver }
