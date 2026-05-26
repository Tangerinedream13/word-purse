-- Word Purse database schema
-- Run once to set up: psql -d word_purse -f schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS words (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    term             TEXT NOT NULL,
    definition       TEXT NOT NULL,
    example_sentence TEXT NOT NULL DEFAULT '',
    origin_story     TEXT NOT NULL DEFAULT '',
    submitted_by     TEXT NOT NULL,
    upvotes          INTEGER NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT words_term_unique UNIQUE (term)
);

CREATE INDEX IF NOT EXISTS idx_words_term       ON words (LOWER(term));
CREATE INDEX IF NOT EXISTS idx_words_created_at ON words (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_words_upvotes    ON words (upvotes DESC);
