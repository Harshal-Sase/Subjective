package routes

import (
	"log"

	"github.com/Harshal-Sase/Subjective/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func StartServer() {
	router := gin.Default()

	enableCors(router)

	router.GET("/settings", handlers.RetrieveSettings)
	router.POST("/settings", handlers.SaveSettings)
	router.GET("/acquire-data", handlers.AcquireData)
	router.GET("/stop", handlers.StopData)

	if err := router.Run(":8090"); err != nil {
		log.Fatal(err)
	}
}

func enableCors(router *gin.Engine) {
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	router.Use(cors.New(config))
}
