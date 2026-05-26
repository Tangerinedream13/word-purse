package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func Connect() *sql.DB {
	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		connStr = fmt.Sprintf(
			"postgres://%s:%s@%s:%s/%s?sslmode=%s",
			os.Getenv("DB_USER"),
			os.Getenv("DB_PASSWORD"),
			os.Getenv("DB_HOST"),
			os.Getenv("DB_PORT"),
			os.Getenv("DB_NAME"),
			os.Getenv("DB_SSLMODE"),
		)
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("failed to open db: %v", err)
	}

	if err := db.Ping(); err != nil {
		log.Fatalf("failed to connect to db: %v", err)
	}

	log.Println("connected to database")
	return db
}

func Migrate(db *sql.DB) {
	query := `
	CREATE EXTENSION IF NOT EXISTS "pgcrypto";

	CREATE TABLE IF NOT EXISTS words (
		id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
		term            TEXT NOT NULL,
		definition      TEXT NOT NULL,
		example_sentence TEXT NOT NULL DEFAULT '',
		origin_story    TEXT NOT NULL DEFAULT '',
		submitted_by    TEXT NOT NULL,
		upvotes         INTEGER NOT NULL DEFAULT 0,
		created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
		CONSTRAINT words_term_unique UNIQUE (term)
	);

	CREATE INDEX IF NOT EXISTS idx_words_term ON words (LOWER(term));
	CREATE INDEX IF NOT EXISTS idx_words_created_at ON words (created_at DESC);
	`

	if _, err := db.Exec(query); err != nil {
		log.Fatalf("migration failed: %v", err)
	}

	log.Println("database migrated")
}
