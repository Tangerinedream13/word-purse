package handlers

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"word-purse/server/internal/models"
)

type WordHandler struct {
	db *sql.DB
}

func NewWordHandler(db *sql.DB) *WordHandler {
	return &WordHandler{db: db}
}

func (h *WordHandler) ListWords(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 20
	}
	offset := (page - 1) * limit

	rows, err := h.db.Query(`
		SELECT id, term, definition, example_sentence, origin_story, submitted_by, upvotes, created_at
		FROM words
		ORDER BY created_at DESC
		LIMIT $1 OFFSET $2
	`, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch words"})
		return
	}
	defer rows.Close()

	words := []models.Word{}
	for rows.Next() {
		var w models.Word
		if err := rows.Scan(&w.ID, &w.Term, &w.Definition, &w.ExampleSentence, &w.OriginStory, &w.SubmittedBy, &w.Upvotes, &w.CreatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "scan error"})
			return
		}
		words = append(words, w)
	}

	var total int
	h.db.QueryRow(`SELECT COUNT(*) FROM words`).Scan(&total)

	c.JSON(http.StatusOK, gin.H{"words": words, "total": total, "page": page, "limit": limit})
}

func (h *WordHandler) GetWord(c *gin.Context) {
	id := c.Param("id")
	var w models.Word
	err := h.db.QueryRow(`
		SELECT id, term, definition, example_sentence, origin_story, submitted_by, upvotes, created_at
		FROM words WHERE id = $1
	`, id).Scan(&w.ID, &w.Term, &w.Definition, &w.ExampleSentence, &w.OriginStory, &w.SubmittedBy, &w.Upvotes, &w.CreatedAt)
	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "word not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch word"})
		return
	}
	c.JSON(http.StatusOK, w)
}

func (h *WordHandler) CreateWord(c *gin.Context) {
	var req models.CreateWordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var w models.Word
	err := h.db.QueryRow(`
		INSERT INTO words (term, definition, example_sentence, origin_story, submitted_by)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id, term, definition, example_sentence, origin_story, submitted_by, upvotes, created_at
	`, req.Term, req.Definition, req.ExampleSentence, req.OriginStory, req.SubmittedBy).
		Scan(&w.ID, &w.Term, &w.Definition, &w.ExampleSentence, &w.OriginStory, &w.SubmittedBy, &w.Upvotes, &w.CreatedAt)
	if err != nil {
		if isUniqueViolation(err) {
			c.JSON(http.StatusConflict, gin.H{"error": "that word already exists in the purse"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create word"})
		return
	}
	c.JSON(http.StatusCreated, w)
}

func (h *WordHandler) UpvoteWord(c *gin.Context) {
	id := c.Param("id")
	var w models.Word
	err := h.db.QueryRow(`
		UPDATE words SET upvotes = upvotes + 1
		WHERE id = $1
		RETURNING id, term, definition, example_sentence, origin_story, submitted_by, upvotes, created_at
	`, id).Scan(&w.ID, &w.Term, &w.Definition, &w.ExampleSentence, &w.OriginStory, &w.SubmittedBy, &w.Upvotes, &w.CreatedAt)
	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "word not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to upvote"})
		return
	}
	c.JSON(http.StatusOK, w)
}

func (h *WordHandler) SearchWords(c *gin.Context) {
	q := c.Query("q")
	if q == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "query parameter q is required"})
		return
	}

	rows, err := h.db.Query(`
		SELECT id, term, definition, example_sentence, origin_story, submitted_by, upvotes, created_at
		FROM words
		WHERE LOWER(term) LIKE LOWER($1) OR LOWER(definition) LIKE LOWER($1)
		ORDER BY
			CASE WHEN LOWER(term) = LOWER($2) THEN 0
			     WHEN LOWER(term) LIKE LOWER($1) THEN 1
			     ELSE 2
			END,
			upvotes DESC
		LIMIT 50
	`, "%"+q+"%", q)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "search failed"})
		return
	}
	defer rows.Close()

	words := []models.Word{}
	for rows.Next() {
		var w models.Word
		if err := rows.Scan(&w.ID, &w.Term, &w.Definition, &w.ExampleSentence, &w.OriginStory, &w.SubmittedBy, &w.Upvotes, &w.CreatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "scan error"})
			return
		}
		words = append(words, w)
	}
	c.JSON(http.StatusOK, gin.H{"words": words})
}

func isUniqueViolation(err error) bool {
	return err != nil && len(err.Error()) > 0 &&
		(contains(err.Error(), "23505") || contains(err.Error(), "words_term_unique"))
}

func contains(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || len(s) > 0 && containsStr(s, substr))
}

func containsStr(s, substr string) bool {
	for i := 0; i <= len(s)-len(substr); i++ {
		if s[i:i+len(substr)] == substr {
			return true
		}
	}
	return false
}
