package handlers

import (
	"context"
	"log"
	"net/http"

	"github.com/Harshal-Sase/Subjective/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func HandlerEndpoint(router *gin.Engine, client *mongo.Client, ctx context.Context) {
	router.POST("/save-to-db", func(c *gin.Context) {
		var setting models.Settings
		if err := c.BindJSON(&setting); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		collection := client.Database("db-name").Collection("collection-name")
		_, err := collection.InsertOne(ctx, setting)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Saved to database!"})
	})

	if err := router.Run(":8090"); err != nil {
		log.Fatal(err)
	}
}
