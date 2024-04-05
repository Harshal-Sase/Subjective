package main

import (
	"context"
	"log"

	"github.com/Harshal-Sase/Subjective/handlers"
	"github.com/Harshal-Sase/Subjective/routes"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	client := Connect()
	defer client.Disconnect(context.Background())

	handlers.SetCollection(client.Database("waves").Collection("settings"))

	routes.StartServer()
}

func Connect() *mongo.Client {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatalln(err)
	}
	return client
}
