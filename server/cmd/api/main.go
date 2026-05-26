package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"word-purse/server/internal/db"
	"word-purse/server/internal/handlers"
	"word-purse/server/internal/middleware"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("no .env file found, using environment variables")
	}

	database := db.Connect()
	defer database.Close()
	db.Migrate(database)

	r := gin.Default()
	r.Use(middleware.CORS())

	wordHandler := handlers.NewWordHandler(database)

	api := r.Group("/api")
	{
		api.GET("/words", wordHandler.ListWords)
		api.GET("/words/search", wordHandler.SearchWords)
		api.GET("/words/:id", wordHandler.GetWord)
		api.POST("/words", wordHandler.CreateWord)
		api.PUT("/words/:id/upvote", wordHandler.UpvoteWord)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Word Purse API running on :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}
