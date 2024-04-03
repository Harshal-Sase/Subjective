package main

import (
	"context"
	"log"

	"github.com/Harshal-Sase/Subjective/handlers"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatalln(err)
	}
	ctx := context.Background()
	defer client.Disconnect(ctx)

	router := gin.Default()

	handlers.HandlerEndpoint(router, client, ctx)

	// http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	// 	fmt.Fprintf(w, "Hello from Go Backend!")
	// })

	// fmt.Println("Server is running on port 8080...")
	// http.ListenAndServe(":8090", nil)
}
