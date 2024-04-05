package handlers

import (
	"context"
	"log"
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/Harshal-Sase/Subjective/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	mutex    sync.Mutex
	stopFlag bool
)

func HandlerEndpoint(router *gin.Engine, client *mongo.Client, ctx context.Context) {
	collection := client.Database("waves").Collection("settings")

	router.GET("/settings", func(c *gin.Context) {
		var setting models.Settings
		opts := options.FindOne().SetSort(bson.M{"$natural": -1})
		err := collection.FindOne(ctx, bson.M{}, opts).Decode(&setting)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, setting)
	})

	router.POST("/settings", func(c *gin.Context) {
		var setting models.Settings
		if err := c.BindJSON(&setting); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		_, err := collection.InsertOne(ctx, setting)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Saved to database!"})
	})

	router.GET("/acquire-data", func(c *gin.Context) {
		stopFlag = false
		wellIndex := 1

		for !stopFlag {
			var settings models.Settings
			err := collection.FindOne(ctx, bson.M{}).Decode(&settings)
			if err != nil {
				log.Println("Error retrieving settings: ", err)
				continue
			}

			wavelengthValues := make([]float64, 2)
			for i := 0; i < len(wavelengthValues); i++ {
				lm, _ := strconv.Atoi(settings.Lm[i])
				wavelengthValues[i] = float64(wellIndex) + float64(lm)*0.1
			}

			data := models.Data{
				WellIndex:        wellIndex,
				WavelengthValues: wavelengthValues,
			}
			c.JSON(http.StatusOK, data)

			wellIndex++

			time.Sleep(1 * time.Second)
		}
	})

	router.GET("/stop", func(c *gin.Context) {
		mutex.Lock()
		defer mutex.Unlock()
		stopFlag = true
		c.JSON(http.StatusOK, gin.H{"message": "Data acquisition stopped"})
	})

	if err := router.Run(":8090"); err != nil {
		log.Fatal(err)
	}
}
