package route

import (
	"database/sql"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"

	"github.com/jordanknott/project-citadel/api/internal/db"
)

func (h *CitadelHandler) ProfileImageUpload(w http.ResponseWriter, r *http.Request) {
	log.Info("preparing to upload file")
	userID, ok := r.Context().Value("userID").(uuid.UUID)
	if !ok {
		log.Error("not a valid uuid")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Parse our multipart form, 10 << 20 specifies a maximum
	// upload of 10 MB files.
	r.ParseMultipartForm(10 << 20)

	file, handler, err := r.FormFile("file")
	if err != nil {
		log.WithError(err).Error("issue while uploading file")
		return
	}
	defer file.Close()
	log.WithFields(log.Fields{"filename": handler.Filename, "size": handler.Size, "header": handler.Header}).Info("file metadata")

	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		log.WithError(err).Error("while reading file")
		return
	}
	err = ioutil.WriteFile("uploads/"+handler.Filename, fileBytes, 0644)
	if err != nil {
		log.WithError(err).Error("while reading file")
		return
	}

	h.repo.UpdateUserAccountProfileAvatarURL(r.Context(), db.UpdateUserAccountProfileAvatarURLParams{UserID: userID, ProfileAvatarUrl: sql.NullString{String: "http://localhost:3333/uploads/" + handler.Filename, Valid: true}})
	// return that we have successfully uploaded our file!
	log.Info("file uploaded")
	json.NewEncoder(w).Encode(AvatarUploadResponseData{URL: "http://localhost:3333/uploads/" + handler.Filename, UserID: userID.String()})

}
