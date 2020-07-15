package commands

import (
	"fmt"
	"github.com/spf13/cobra"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jmoiron/sqlx"
	"github.com/jordanknott/project-citadel/api/internal/config"
	log "github.com/sirupsen/logrus"
)

type MigrateLog struct {
	verbose bool
}

func (l *MigrateLog) Printf(format string, v ...interface{}) {
	log.Printf("%s", v)
}

// Verbose shows if verbose print enabled
func (l *MigrateLog) Verbose() bool {
	return l.verbose
}

func newMigrateCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "migrate",
		Short: "Run the database schema migrations",
		Long:  "Run the database schema migrations",
		RunE: func(cmd *cobra.Command, args []string) error {
			appConfig, err := config.LoadConfig("conf/app.toml")
			if err != nil {
				return err
			}
			connection := fmt.Sprintf("user=%s password=%s host=%s dbname=%s sslmode=disable",
				appConfig.Database.User,
				appConfig.Database.Password,
				appConfig.Database.Host,
				appConfig.Database.Name,
			)
			db, err := sqlx.Connect("postgres", connection)
			if err != nil {
				return err
			}
			defer db.Close()
			driver, err := postgres.WithInstance(db.DB, &postgres.Config{})
			if err != nil {
				return err
			}
			m, err := migrate.NewWithDatabaseInstance(
				"file://migrations",
				"postgres", driver)
			if err != nil {
				return err
			}
			logger := &MigrateLog{}
			m.Log = logger
			err = m.Up()
			if err != nil {
				return err
			}
			return nil
		},
	}
}
