package models

import "time"

type Word struct {
	ID             string    `json:"id" db:"id"`
	Term           string    `json:"term" db:"term"`
	Definition     string    `json:"definition" db:"definition"`
	ExampleSentence string   `json:"example_sentence" db:"example_sentence"`
	OriginStory    string    `json:"origin_story" db:"origin_story"`
	SubmittedBy    string    `json:"submitted_by" db:"submitted_by"`
	Upvotes        int       `json:"upvotes" db:"upvotes"`
	CreatedAt      time.Time `json:"created_at" db:"created_at"`
}

type CreateWordRequest struct {
	Term            string `json:"term" binding:"required"`
	Definition      string `json:"definition" binding:"required"`
	ExampleSentence string `json:"example_sentence"`
	OriginStory     string `json:"origin_story"`
	SubmittedBy     string `json:"submitted_by" binding:"required"`
}
