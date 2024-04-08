package handlers

import (
	"context"
	"net/http"
	"sync"

	"github.com/Harshal-Sase/Subjective/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	mutex      sync.Mutex
	stopFlag   bool
	collection *mongo.Collection
)

func SetCollection(c *mongo.Collection) {
	collection = c
}

func RetrieveSettings(c *gin.Context) {
	var setting models.Settings
	opts := options.FindOne().SetSort(bson.M{"$natural": -1})
	err := collection.FindOne(context.Background(), bson.M{}, opts).Decode(&setting)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, setting)
}

func SaveSettings(c *gin.Context) {
	var setting models.Settings
	if err := c.BindJSON(&setting); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := collection.InsertOne(context.Background(), setting)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Saved to database!"})
}
