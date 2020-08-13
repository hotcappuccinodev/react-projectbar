package commands

import (
	"fmt"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/golang-migrate/migrate/v4/source/httpfs"
	"github.com/jmoiron/sqlx"
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
	c := &cobra.Command{
		Use:   "migrate",
		Short: "Run the database schema migrations",
		Long:  "Run the database schema migrations",
		RunE: func(cmd *cobra.Command, args []string) error {
			connection := fmt.Sprintf("user=%s password=%s host=%s dbname=%s sslmode=disable",
				viper.GetString("database.user"),
				viper.GetString("database.password"),
				viper.GetString("database.host"),
				viper.GetString("database.name"),
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

			src, err := httpfs.New(migration, "./")
			if err != nil {
				return err
			}
			m, err := migrate.NewWithInstance("httpfs", src, "postgres", driver)
			if err != nil {
				return err
			}
			logger := &MigrateLog{}
			m.Log = logger
			err = m.Up()
			if err != nil && err != migrate.ErrNoChange {
				return err
			}
			return nil
		},
	}
	viper.SetDefault("database.host", "127.0.0.1")
	viper.SetDefault("database.name", "taskcafe")
	viper.SetDefault("database.user", "taskcafe")
	viper.SetDefault("database.password", "taskcafe_test")
	return c
}
