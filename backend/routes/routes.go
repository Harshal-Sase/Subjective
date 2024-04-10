package routes

import (
	"log"

	"github.com/Harshal-Sase/Subjective/handlers"
	"github.com/Harshal-Sase/Subjective/middlewares"
	"github.com/gin-gonic/gin"
)

func StartServer() {
	router := SetupRouter()

	if err := router.Run(":8090"); err != nil {
		log.Fatal(err)
	}
}

func SetupRouter() *gin.Engine {
	router := gin.Default()
	router.GET("/settings", middlewares.CORS(), handlers.RetrieveSettings)
	router.POST("/settings", middlewares.CORS(), handlers.SaveSettings)
	return router
}
